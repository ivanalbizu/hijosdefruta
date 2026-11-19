#!/usr/bin/env node
/**
 * Rastreo diario de campaña: recoge lo nuevo de los verificadores, La Moncloa y los canales de
 * YouTube de los partidos, se queda con lo que entra en el alcance y lo deja en una bandeja,
 * `investigacion/rastreo/AAAA-MM-DD.md`, para cribarla con la skill /candidatos.
 *
 * Lo que sale en la bandeja son pistas, no fuentes: cada dato se busca después en la fuente primaria.
 *
 * Uso:
 *   npm run rastreo                  # últimos 3 días, sin repetir lo ya visto
 *   npm run rastreo -- --dias 7      # ventana más amplia (p. ej. tras unos días sin ejecutarlo)
 *   npm run rastreo -- --simular     # imprime la bandeja sin escribir nada ni marcar nada como visto
 *   npm run rastreo -- --shorts      # lista también los shorts de YouTube (por defecto solo se cuentan:
 *                                    # son fragmentos de actos que ya salen completos)
 *
 * Fuentes y nombres: investigacion/rastreo/config.yaml. Lo ya visto: investigacion/rastreo/visto.json.
 */
import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const DIR = path.resolve("investigacion/rastreo");
const CONFIG = path.join(DIR, "config.yaml");
const VISTO = path.join(DIR, "visto.json");
const PERFILES = path.resolve("src/content/perfil");
const REGISTRADOS = ["investigacion/candidatos", "src/content/casos"].map(d => path.resolve(d));
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const TIMEOUT = 20_000;
const OLVIDAR_DIAS = 60; // lo visto hace más de esto se borra de visto.json
const ZONA = "Europe/Madrid";

const args = process.argv.slice(2);
const SIMULAR = args.includes("--simular");
const SHORTS = args.includes("--shorts");
const iDias = args.indexOf("--dias");
const DIAS = iDias >= 0 ? Number(args[iDias + 1]) : 3;
if (!(DIAS > 0)) {
  console.error("--dias necesita un número de días mayor que 0");
  process.exit(1);
}

/* ---------- Fechas ---------- */

const ahora = new Date();
const hoy = new Intl.DateTimeFormat("sv-SE", { timeZone: ZONA }).format(ahora); // AAAA-MM-DD
const fmtLargo = new Intl.DateTimeFormat("es-ES", { timeZone: ZONA, day: "numeric", month: "long", year: "numeric" });
const fmtCorto = new Intl.DateTimeFormat("es-ES", { timeZone: ZONA, day: "2-digit", month: "2-digit" });
const fmtHora = new Intl.DateTimeFormat("es-ES", { timeZone: ZONA, hour: "2-digit", minute: "2-digit" });
const corta = d => (isNaN(d) ? "s. f." : fmtCorto.format(d).replace("/", "-"));

/* ---------- Lectura de RSS y Atom (sin dependencias) ---------- */

const ENTIDADES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decodificar = s =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
      e[0] === "#"
        ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
        : (ENTIDADES[e.toLowerCase()] ?? m),
    );
/** Texto plano: el HTML de las descripciones llega escapado o en CDATA. */
const limpiar = s => decodificar(decodificar(s).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const campo = (xml, etiqueta) => xml.match(new RegExp(`<${etiqueta}\\b[^>]*>([\\s\\S]*?)</${etiqueta}>`))?.[1] ?? "";

function normalizarUrl(url) {
  try {
    const u = new URL(url);
    for (const k of [...u.searchParams.keys()]) if (k === "qfr" || k.startsWith("utm_")) u.searchParams.delete(k);
    return u.toString();
  } catch {
    return url;
  }
}

function parsearFeed(xml) {
  return (xml.match(/<item\b[\s\S]*?<\/item>|<entry\b[\s\S]*?<\/entry>/g) ?? []).map(entrada => {
    // El artículo completo puede traer sus propias etiquetas <link> (hojas de estilo).
    const x = entrada.replace(/<content:encoded\b[\s\S]*?<\/content:encoded>/g, "");
    const atom = x.match(/<link\b[^>]*rel="alternate"[^>]*href="([^"]+)"/)?.[1];
    const rss = x.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? campo(x, "guid");
    return {
      titulo: limpiar(campo(x, "title")),
      url: normalizarUrl(atom ? decodificar(atom) : limpiar(rss)),
      fecha: new Date(limpiar(campo(x, "pubDate") || campo(x, "published") || campo(x, "dc:date") || campo(x, "updated"))),
      resumen: limpiar(campo(x, "description") || campo(x, "summary")).replace(/^[\s"'>]+/, ""),
      video: limpiar(campo(x, "yt:videoId")),
    };
  });
}

/** Una petición a la vez por dominio (La Moncloa corta las simultáneas). */
const colas = new Map();
function descargar(url) {
  const dominio = new URL(url).hostname;
  const turno = (colas.get(dominio) ?? Promise.resolve()).then(async () => {
    const r = await fetch(url, {
      headers: { "User-Agent": UA, "Accept-Language": "es-ES,es;q=0.9" },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.text();
  });
  colas.set(dominio, turno.catch(() => {}));
  return turno;
}

/* ---------- Filtro de alcance ---------- */

const sinTildes = s => s.normalize("NFD").replace(/\p{Diacritic}/gu, "");

function patron(termino) {
  const t = sinTildes(termino)
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/[-\s]+/g, "[-\\s]+");
  return new RegExp(`(?<![\\p{L}\\p{N}])${t}(?![\\p{L}\\p{N}])`, "u");
}

async function terminos(config) {
  const lista = [];
  const añadir = (termino, clase) => termino && lista.push({ termino, clase, re: patron(termino) });
  for (const archivo of await fs.readdir(PERFILES)) {
    if (!archivo.endsWith(".yaml")) continue;
    const p = YAML.parse(await fs.readFile(path.join(PERFILES, archivo), "utf8"));
    añadir(p.nombre, p.tipo === "partido" ? "partido" : "nombre");
    if (p.nombreCompleto) añadir(p.nombreCompleto, "partido");
  }
  for (const t of config.partidos ?? []) añadir(t, "partido");
  for (const t of config.nombres ?? []) añadir(t, "nombre");
  for (const t of config.apellidos ?? []) añadir(t, "nombre");
  for (const t of config.genericos ?? []) añadir(t, "generico");
  return lista;
}

/** Términos encontrados; «Sánchez» no se muestra si ya está «Pedro Sánchez». */
function coincidencias(texto, lista) {
  const plano = sinTildes(texto);
  const hallados = lista.filter(t => t.re.test(plano));
  const unicos = [...new Map(hallados.map(t => [t.termino, t])).values()];
  return unicos.filter(
    t => !unicos.some(o => o !== t && o.termino.length > t.termino.length && t.re.test(sinTildes(o.termino))),
  );
}

const DECLARACION =
  /\b(dice|dicen|dijo|decia|decian|dio|afirma|afirmo|asegura|aseguro|sostiene|defiende|presume|atribuye|segun|declara|afea|critica|insiste|promete|prometio|anuncia|cifra|cifras|datos?|diu|diuen|afirma)\b|[“”«»"]/;
/** Maldita publica también en inglés: esas versiones duplican la española. */
const INGLES = /\b(the|and|of|is|are|with|that|this|from)\b/g;
const enIngles = titulo => (titulo.toLowerCase().match(INGLES) ?? []).length >= 2;
const BULO =
  /\b(bulo|generad[ao]s? con (ia|inteligencia artificial)|hech[ao]s? con ia|montaje|manipulad[ao]s?|no es real|suplanta\w*|cuenta falsa)\b/;

function etiqueta(titulo) {
  const t = sinTildes(titulo).toLowerCase();
  if (BULO.test(t)) return "bulo";
  if (DECLARACION.test(t)) return "declaración";
  return "";
}

/* ---------- Estado ---------- */

async function leerJson(archivo, porDefecto) {
  try {
    return JSON.parse(await fs.readFile(archivo, "utf8"));
  } catch (e) {
    if (e.code === "ENOENT") return porDefecto;
    throw e;
  }
}

/** Texto de candidatos y casos, para saltar lo que ya está registrado. */
async function textoRegistrado() {
  const partes = [];
  for (const dir of REGISTRADOS) {
    for (const archivo of await fs.readdir(dir)) {
      if (/\.(md|mdx)$/.test(archivo)) partes.push(await fs.readFile(path.join(dir, archivo), "utf8"));
    }
  }
  return partes.join("\n");
}

/* ---------- Bandeja ---------- */

/** Formato largo (verificadores): título, quién, enlace y extracto. Corto: una línea. */
function lineaPista(p, largo) {
  const quien = p.quien.length ? ` · *${p.quien.map(t => t.termino).join(", ")}*` : "";
  const marca = p.etiqueta ? ` · ${p.etiqueta}` : "";
  const url = p.video ? `https://youtu.be/${p.video}` : p.url;
  if (!largo) return `- [ ] ${p.titulo} · ${p.origen} ${corta(p.fecha)}${quien}${marca} · <${url}>`;
  let s = `- [ ] **${p.titulo}** · ${p.origen} ${corta(p.fecha)}${quien}${marca}\n  <${url}>`;
  if (p.resumen) {
    const r = p.resumen.length > 220 ? p.resumen.slice(0, 220).replace(/\s+\S*$/, "") + "…" : p.resumen;
    s += `\n  > ${r}`;
  }
  return s;
}

function seccion(titulo, pistas, largo) {
  if (!pistas.length) return "";
  return `### ${titulo} (${pistas.length})\n\n${pistas.map(p => lineaPista(p, largo)).join("\n")}\n`;
}

/* ---------- Principal ---------- */

const config = YAML.parse(await fs.readFile(CONFIG, "utf8"));
const lista = await terminos(config);
const visto = await leerJson(VISTO, {});
const registrado = await textoRegistrado();
const limite = ahora.getTime() - DIAS * 86_400_000;

const fuentes = [
  ...(config.verificadores ?? []).map(f => ({ ...f, grupo: "verificadores" })),
  ...(config.moncloa ?? []).map(f => ({ ...f, grupo: "moncloa" })),
  ...(config.youtube ?? []).map(f => ({
    ...f,
    grupo: "youtube",
    url: `https://www.youtube.com/feeds/videos.xml?channel_id=${f.canal}`,
  })),
];

const resultados = await Promise.all(
  fuentes.map(f =>
    descargar(f.url).then(
      xml => ({ fuente: f, items: parsearFeed(xml) }),
      e => ({ fuente: f, error: e.name === "TimeoutError" ? "tiempo agotado" : (e.cause?.code ?? e.message) }),
    ),
  ),
);

const errores = [];
const nuevas = { verificadores: [], genericos: [], bulos: [], moncloa: [], youtube: [] };
const cuenta = { fuera: 0, registradas: 0, shorts: 0 };
const vistasAhora = new Set();

for (const { fuente, items, error } of resultados) {
  if (error) {
    errores.push(`${fuente.nombre} (${error})`);
    continue;
  }
  if (!items.length) errores.push(`${fuente.nombre} (feed vacío)`);
  for (const item of items) {
    if (!item.url || visto[item.url] || vistasAhora.has(item.url)) continue;
    if (!isNaN(item.fecha) && item.fecha.getTime() < limite) continue;
    vistasAhora.add(item.url);
    const urlBase = item.url.split("?")[0];
    if ((item.video && registrado.includes(item.video)) || (!item.video && registrado.includes(urlBase))) {
      cuenta.registradas++;
      continue;
    }
    const pista = { ...item, origen: fuente.nombre, etiqueta: "", quien: [] };
    if (fuente.grupo === "verificadores") {
      // El título manda: un nombre que solo sale en el resumen suele ser una mención de pasada.
      const enTitulo = coincidencias(item.titulo, lista);
      const especificos = t => t.clase !== "generico";
      const enResumen = coincidencias(item.resumen, lista).filter(especificos);
      pista.quien = enTitulo.length ? enTitulo : enResumen;
      if (!pista.quien.length || enIngles(item.titulo)) {
        cuenta.fuera++;
        continue;
      }
      pista.etiqueta = etiqueta(item.titulo);
      if (pista.etiqueta === "bulo") nuevas.bulos.push(pista);
      else if (enTitulo.some(especificos)) nuevas.verificadores.push(pista);
      else nuevas.genericos.push(pista);
    } else {
      pista.quien = coincidencias(item.titulo, lista).filter(t => t.clase === "nombre");
      if (fuente.grupo === "youtube" && item.url.includes("/shorts/")) {
        cuenta.shorts++;
        if (!SHORTS) continue;
        pista.etiqueta = "short";
      }
      nuevas[fuente.grupo].push(pista);
    }
  }
}

const porFecha = (a, b) => (b.fecha || 0) - (a.fecha || 0);
const primeroDeclaraciones = (a, b) =>
  (b.etiqueta === "declaración") - (a.etiqueta === "declaración") || porFecha(a, b);
nuevas.verificadores.sort(primeroDeclaraciones);
nuevas.genericos.sort(primeroDeclaraciones);
nuevas.bulos.sort(porFecha);
nuevas.moncloa.sort(porFecha);
nuevas.youtube.sort((a, b) => a.origen.localeCompare(b.origen, "es") || porFecha(a, b));

const total = Object.values(nuevas).reduce((n, l) => n + l.length, 0);
const pie = [
  `Fuera del alcance (verificadores sin ningún nombre ni partido): ${cuenta.fuera}.`,
  `Ya registradas en candidatos o casos: ${cuenta.registradas}.`,
  cuenta.shorts && !SHORTS ? `Shorts de YouTube sin listar: ${cuenta.shorts} (\`--shorts\` para verlos).` : "",
  errores.length ? `**Fuentes con error:** ${errores.join(", ")}.` : "",
]
  .filter(Boolean)
  .join(" ");

const pasada = [
  `## Pasada de las ${fmtHora.format(ahora)} · ${total} ${total === 1 ? "pista nueva" : "pistas nuevas"}`,
  "",
  total ? "" : "Sin novedades.\n",
  seccion("Verificadores", nuevas.verificadores, true),
  seccion("Verificadores, coincidencia débil (solo en el resumen o genérica)", nuevas.genericos, false),
  seccion("Verificadores, bulos sobre el alcance (no son declaraciones)", nuevas.bulos, false),
  seccion("La Moncloa", nuevas.moncloa, false),
  seccion("Vídeos de los partidos", nuevas.youtube, false),
  pie,
  "",
]
  .filter(s => s !== "")
  .join("\n");

const BANDEJA = path.join(DIR, `${hoy}.md`);
const cabecera = `# Rastreo del ${fmtLargo.format(ahora)}

Pistas, no fuentes: cada dato se busca en la fuente primaria antes de registrarlo (skill /candidatos).
Marca con [x] lo que quieras investigar o transcribir y pide «revisa la bandeja».
`;

if (SIMULAR) {
  console.log(`${cabecera}\n${pasada}`);
} else {
  let previo = "";
  try {
    previo = await fs.readFile(BANDEJA, "utf8");
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
  }
  await fs.writeFile(BANDEJA, previo ? `${previo.trimEnd()}\n\n${pasada}` : `${cabecera}\n${pasada}`);

  for (const url of vistasAhora) visto[url] = hoy;
  const olvido = new Date(ahora.getTime() - OLVIDAR_DIAS * 86_400_000).toISOString().slice(0, 10);
  const ordenado = Object.fromEntries(Object.entries(visto).filter(([, f]) => f >= olvido).sort());
  await fs.writeFile(VISTO, JSON.stringify(ordenado, null, 1) + "\n");

  console.log(`${total} pistas nuevas en ${path.relative(process.cwd(), BANDEJA)}`);
  console.log(
    `  verificadores ${nuevas.verificadores.length} (+${nuevas.genericos.length} genéricas, ${nuevas.bulos.length} bulos)` +
      ` · Moncloa ${nuevas.moncloa.length} · vídeos ${nuevas.youtube.length}`,
  );
  console.log(`  ${pie.replace(/\*\*/g, "")}`);
}
