#!/usr/bin/env node
/**
 * Comprueba que las pruebas de cada caso siguen accesibles:
 *   - las URL de las fuentes,
 *   - sus copias archivadas (`archivo`),
 *   - los vídeos de YouTube.
 *
 * Uso:
 *   npm run fuentes                 # todo
 *   npm run fuentes -- --rapido     # sin las copias archivadas (Web Archive admite
 *                                   # ~15 peticiones/minuto, así que es lo más lento)
 *
 * Termina con código 1 si algo está roto, para poder usarlo en CI.
 */
import fs from "node:fs/promises";
import path from "node:path";

const DIRS = ["src/content/mentira", "src/content/promesa"].map(d => path.resolve(d));
const RAPIDO = process.argv.includes("--rapido");
const CONCURRENCIA = 6;
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

const valor = s => s.trim().replace(/^(['"])(.*)\1$/, "$2");

/** Extrae fuentes y vídeos del frontmatter sin depender de un parser YAML. */
function extraer(texto) {
  // .mdx: frontmatter entre "---"; .yaml: el archivo entero.
  const frontmatter = texto.startsWith("---") ? (texto.split(/^---\s*$/m)[1] ?? "") : texto;
  const fuentes = [];
  const videos = [];
  for (const linea of frontmatter.split("\n")) {
    let m;
    if ((m = linea.match(/^\s*url:\s*(.+)$/))) fuentes.push({ url: valor(m[1]) });
    else if ((m = linea.match(/^\s*archivo:\s*(.+)$/)) && fuentes.length) fuentes.at(-1).archivo = valor(m[1]);
    else if ((m = linea.match(/^\s*id:\s*(.+)$/))) videos.push(valor(m[1]));
  }
  const draft = /^draft:\s*true\s*$/m.test(frontmatter);
  return { fuentes, videos, draft };
}

/** Algunos servidores (p. ej. La Moncloa) cortan peticiones simultáneas: una a la vez por dominio. */
const colasPorDominio = new Map();
function pedir(url, timeout) {
  const dominio = new URL(url).hostname;
  const turno = (colasPorDominio.get(dominio) ?? Promise.resolve()).then(() => pedirYa(url, timeout));
  colasPorDominio.set(dominio, turno.catch(() => {}));
  return turno;
}

async function pedirYa(url, timeout) {
  try {
    const r = await fetch(url, {
      headers: { "User-Agent": UA, "Accept-Language": "es-ES,es;q=0.9" },
      redirect: "follow",
      signal: AbortSignal.timeout(timeout),
    });
    await r.body?.cancel();
    return r.status;
  } catch (e) {
    return e.name === "TimeoutError" ? "tiempo agotado" : (e.cause?.code ?? e.message);
  }
}

/**
 * Devuelve [nivel, mensaje]; nivel: "ok" | "aviso" | "error".
 * Solo es "error" lo que demuestra que la prueba ya no está: 404/410, otros 4xx
 * o un dominio que ha dejado de existir. Timeouts, cortes y 5xx pueden ser
 * puntuales (o una protección anti-bots), así que se reintentan y quedan en aviso.
 */
async function comprobarEnlace(url, timeout = 20_000) {
  let s = await pedir(url, timeout);
  if (typeof s !== "number" || s >= 500) {
    await new Promise(r => setTimeout(r, 10_000));
    s = await pedir(url, timeout);
  }
  if (typeof s === "number") {
    if (s < 400) return ["ok"];
    if (s === 403 || s === 429) return ["aviso", `HTTP ${s} (posible bloqueo a bots, revisar a mano)`];
    if (s >= 500) return ["aviso", `HTTP ${s} (error del servidor, volver a probar)`];
    return ["error", s === 404 || s === 410 ? `HTTP ${s}: la página ya no existe` : `HTTP ${s}`];
  }
  if (s === "ENOTFOUND") return ["error", "el dominio ya no existe"];
  return ["aviso", `no responde ahora mismo (${s}); volver a probar`];
}

async function comprobarVideo(id) {
  const oembed = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`;
  const s = await pedir(oembed, 15_000);
  if (s === 200) return ["ok"];
  if (s === 401 || s === 403) return ["aviso", "el vídeo existe pero no permite incrustarse"];
  if (s === 400 || s === 404) return ["error", "vídeo eliminado o privado"];
  return ["error", typeof s === "number" ? `HTTP ${s}` : s];
}

const espera = ms => new Promise(r => setTimeout(r, ms));

/**
 * Web Archive corta la conexión si recibe más de ~15 peticiones por minuto,
 * así que sus comprobaciones van en fila, espaciadas y con un reintento.
 */
let colaArchivo = Promise.resolve();
const INTERVALO_ARCHIVO = 4_500;
function comprobarCopia(url) {
  const turno = colaArchivo.then(async () => {
    const limitado = ([nivel, mensaje]) => nivel !== "ok" && /ECONNREFUSED|ECONNRESET|HTTP 429/.test(mensaje);
    let resultado = await comprobarEnlace(url, 45_000);
    if (limitado(resultado)) {
      await espera(70_000);
      resultado = await comprobarEnlace(url, 45_000);
      if (limitado(resultado)) {
        resultado = ["aviso", "Web Archive no responde (límite de peticiones); vuelve a probar más tarde"];
      }
    }
    await espera(INTERVALO_ARCHIVO);
    return resultado;
  });
  colaArchivo = turno.catch(() => {});
  return turno;
}

/** Cada recurso se comprueba una sola vez aunque lo usen varios casos. */
const cache = new Map();
const una = (clave, fn) => {
  if (!cache.has(clave)) cache.set(clave, fn());
  return cache.get(clave);
};

/** Ejecuta las tareas con un número máximo de peticiones simultáneas. */
async function enParalelo(tareas, limite) {
  const resultados = [];
  let i = 0;
  const trabajador = async () => {
    while (i < tareas.length) {
      const n = i++;
      resultados[n] = await tareas[n]();
    }
  };
  await Promise.all(Array.from({ length: limite }, trabajador));
  return resultados;
}

const archivos = (
  await Promise.all(
    DIRS.map(async dir => (await fs.readdir(dir)).filter(f => /\.(mdx|ya?ml)$/.test(f)).map(f => path.join(dir, f)))
  )
).flat().sort();
const tareas = [];
for (const archivo of archivos) {
  const { fuentes, videos, draft } = extraer(await fs.readFile(archivo, "utf8"));
  const nombre = path.relative("src/content", archivo);
  const caso = draft ? `${nombre} (borrador)` : nombre;
  for (const { url, archivo: copia } of fuentes) {
    tareas.push(async () => [caso, "fuente", url, await una(url, () => comprobarEnlace(url))]);
    if (copia) {
      if (!RAPIDO) tareas.push(async () => [caso, "copia", copia, await una(copia, () => comprobarCopia(copia))]);
    } else if (!/youtube\.com|youtu\.be/.test(url)) {
      // Los vídeos de YouTube no se pueden archivar; ya se comprueban como vídeo.
      tareas.push(async () => [caso, "sin copia", url, ["aviso", `archivar en https://web.archive.org/save/${url}`]]);
    }
  }
  for (const id of videos) {
    tareas.push(async () => [caso, "vídeo", id, await una(`yt:${id}`, () => comprobarVideo(id))]);
  }
}

console.log(
  `Comprobando ${tareas.length} recursos de ${archivos.length} casos` +
    (RAPIDO ? " (sin copias archivadas)…\n" : "…\nLas copias de Web Archive van de una en una: tarda unos minutos.\n")
);
const resultados = await enParalelo(tareas, CONCURRENCIA);

const problemas = resultados.filter(([, , , [nivel]]) => nivel !== "ok");
let casoActual;
for (const [caso, tipo, recurso, [nivel, mensaje]] of problemas.sort((a, b) => a[0].localeCompare(b[0]))) {
  if (caso !== casoActual) console.log(`\n${(casoActual = caso)}`);
  console.log(`  ${nivel === "error" ? "✗ ERROR" : "! aviso"}  ${tipo}: ${recurso}\n             ${mensaje}`);
}

const errores = problemas.filter(([, , , [nivel]]) => nivel === "error").length;
const avisos = problemas.length - errores;
console.log(`\n${resultados.length - problemas.length} correctos · ${avisos} avisos · ${errores} errores`);
process.exitCode = errores ? 1 : 0;
