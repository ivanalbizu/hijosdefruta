#!/usr/bin/env node
/**
 * Respuestas en X: cruza los tuits recientes de las cuentas de investigacion/respuestas/config.yaml con
 * los casos publicados y deja una bandeja, `investigacion/respuestas/AAAA-MM-DD.md`, con los posibles
 * casos para responder a cada tuit. La lectura de X la hace Claude in Chrome (skill /respuestas); este
 * script no se conecta a X ni publica nada.
 *
 * Uso:
 *   npm run respuestas -- url [--horas 8]     # URL de las búsquedas de X (varias si hay muchas cuentas)
 *   npm run respuestas -- url --cuenta Pilar_Alegria,PSOE   # solo esas cuentas (de config.yaml)
 *   npm run respuestas -- url --virales       # tuits de cualquiera, con muchos «me gusta», que nombran a alguien del alcance
 *   npm run respuestas -- url --virales --horas 1 --megusta 100   # durante un debate: ventana corta y umbral bajo
 *   npm run respuestas -- cruzar tuits.tsv    # cruza los tuits extraídos (TSV o JSON) y escribe la bandeja
 *   npm run respuestas -- cruzar tuits.json --simular   # la imprime sin escribirla
 *   npm run respuestas -- cruzar tuits.tsv --repetir    # sin saltar los tuits que ya están en la bandeja
 *   npm run respuestas -- vistos              # JS para la pestaña con los tuits ya revisados (los salta extraer.js)
 *   npm run respuestas -- temas               # casos por tema y casos que no tienen ninguno
 *
 * Un caso solo es candidato si comparte algún tema con el tuit (`temas` de config.yaml, buscados en el
 * título y la descripción del caso y en el texto del tuit y de lo que cita). Dentro de eso se ordena por
 * palabras en común: de 4 letras o más, sin las vacías, recortadas a 6 letras («viviendas» = «vivienda»)
 * y ponderadas por rareza (una palabra que sale en pocos casos pesa más). Que el autor del tuit esté en
 * las etiquetas del caso suma.
 */
import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const DIR = path.resolve("investigacion/respuestas");
const CONFIG = path.join(DIR, "config.yaml");
const CASOS = path.resolve("src/content/casos");
const WEB = "https://hijoputismo.com";
const ZONA = "Europe/Madrid";
const MAX_CASOS = 3; // por tuit
const MAX_ETIQUETA = 0.25; // el autor suma solo si su etiqueta está en una cuarta parte de los casos o menos

const args = process.argv.slice(2);
const orden = args[0];
const opcion = (nombre, defecto) => {
  const i = args.indexOf(nombre);
  return i >= 0 ? args[i + 1] : defecto;
};

const config = YAML.parse(await fs.readFile(CONFIG, "utf8"));
const cuentas = config.cuentas;

/* ---------- url ---------- */

if (orden === "url") {
  const horas = Number(opcion("--horas", 8));
  if (!(horas > 0)) salir("--horas necesita un número mayor que 0");
  const desde = Math.floor(Date.now() / 1000 - horas * 3600);
  let elegidas = cuentas;
  const filtro = opcion("--cuenta");
  if (filtro) {
    const pedidas = filtro.split(",").map(s => s.trim().replace(/^@/, "").toLowerCase());
    elegidas = cuentas.filter(c => pedidas.includes(c.usuario.toLowerCase()));
    const faltan = pedidas.filter(p => !elegidas.some(c => c.usuario.toLowerCase() === p));
    if (faltan.length) salir(`No están en config.yaml: ${faltan.join(", ")}`);
  }
  // X no acepta consultas largas (unos 500 caracteres): las cuentas se reparten en varias búsquedas.
  const MAX = 400;
  // Con --virales, en lugar de las cuentas, los términos de `virales` en tuits de cualquiera con muchos «me gusta»
  // y los tuits de `virales.cuentas`, con su propio umbral (sin respuestas: se busca el tuit que abre el hilo).
  // --megusta cambia el umbral de los términos y, si es más bajo, también el de las cuentas.
  const virales = args.includes("--virales");
  const megusta = Number(opcion("--megusta", config.virales.min_megusta));
  const minimo = n => (n > 0 ? ` min_faves:${n}` : "");
  const busquedas = virales
    ? [
        { partes: config.virales.terminos, cola: `${minimo(megusta)} lang:es -filter:replies since_time:${desde}` },
        {
          partes: (config.virales.cuentas ?? []).map(u => `from:${u}`),
          cola: `${minimo(Math.min(megusta, Number(config.virales.min_megusta_cuentas ?? 0)))} -filter:replies since_time:${desde}`,
        },
      ]
    : [{ partes: elegidas.map(c => `from:${c.usuario}`), cola: ` since_time:${desde}` }];
  for (const { partes, cola } of busquedas) {
    const lotes = [[]];
    for (const p of partes) {
      const l = lotes.at(-1);
      if (l.length && [...l, p].join(" OR ").length > MAX) lotes.push([p]);
      else l.push(p);
    }
    for (const l of lotes.filter(l => l.length)) {
      const q = `(${l.join(" OR ")})${cola}`;
      console.log(`https://x.com/search?q=${encodeURIComponent(q)}&src=typed_query&f=live`);
    }
  }
  console.log(`desde=${desde}`);
  process.exit(0);
}

/* ---------- vistos ---------- */

// Línea de JS que se ejecuta en la pestaña antes de extraer.js para no sacar los tuits ya revisados.
if (orden === "vistos") {
  const dia = d => new Intl.DateTimeFormat("sv-SE", { timeZone: ZONA }).format(d);
  const ids = new Set();
  for (const d of [new Date(), new Date(Date.now() - 864e5)]) {
    const previo = await fs.readFile(path.join(DIR, `${dia(d)}.md`), "utf8").catch(() => "");
    for (const [, id] of previo.matchAll(/status\/(\d+)/g)) ids.add(id);
  }
  console.log(`window.__ya = new Set(${JSON.stringify([...ids])});`);
  process.exit(0);
}

if (!(orden === "temas" || (orden === "cruzar" && args[1])))
  salir("Uso: respuestas.mjs url [--horas N] [--cuenta a,b] [--virales [--megusta N]] | vistos | cruzar tuits.tsv [--simular] [--repetir] | temas");

/* ---------- Texto ---------- */

const VACIAS = new Set(
  `para como pero porque cuando donde desde hasta entre sobre tras ante bajo contra durante mediante según
  este esta estos estas ese esa esos esas aquel aquella esto eso cual cuales quien quienes cuyo cuya
  todo toda todos todas otro otra otros otras mismo misma mismos mismas tanto tanta tantos tantas
  mucho mucha muchos muchas poco poca pocos pocas cada algo nada algun alguna algunos algunas ningun ninguna
  muy más mas menos solo sólo tambien también ademas además aunque mientras luego despues después antes
  ahora hoy ayer mañana manana siempre nunca entonces asi así bien aquí aqui allí alli
  sido será sera eran fueron haber habia había han hemos hace hacer hecho hizo tiene tienen tener tenia
  puede pueden poder dijo dice decir dicho dicen afirmó afirmo aseguró aseguro según segun
  años año anos ano días dias vez veces parte frente casi cifra cifras
  gobierno españa espana español española españoles país pais presidente presidenta ministro ministra
  ministerio psoe socialista socialistas partido sánchez sanchez pedro
  campaña campana vamos derecho derechos gran pueblo próximo proximo próximos proximos`.split(/\s+/).filter(Boolean),
);

const normalizar = s =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/** Texto para buscar temas: sin tildes, en minúsculas y con todo lo que no es letra o cifra como espacio. */
const plano = s => ` ${normalizar(s).replace(/[^a-z0-9ñ]+/g, " ")}`;
const TEMAS = Object.entries(config.temas ?? {}).map(([tema, claves]) => [
  tema,
  claves.map(k => ` ${plano(String(k)).trim()}`),
]);
/** Temas cuyo alguna palabra clave empieza palabra en el texto. */
const temasDe = texto => {
  const p = plano(texto);
  return new Set(TEMAS.filter(([, claves]) => claves.some(k => p.includes(k))).map(([t]) => t));
};

/** Raíces (6 letras) → una forma de muestra, para enseñar las palabras en común. */
function raices(texto) {
  const m = new Map();
  // X parte las URL en varias líneas («https://\nx.com/la_ser/status/…»): fuera todo lo que parezca dominio o ruta.
  const limpio = texto
    .replace(/https?:\/\/\S*/g, " ")
    .replace(/\S*\w\.\w{2,}\/\S*/g, " ")
    .replace(/\S*\/status\/\S*/g, " ")
    .replace(/[@#]\w+/g, " ");
  for (const palabra of limpio.match(/[\p{L}]+/gu) ?? []) {
    const n = normalizar(palabra);
    if (n.length < 4 || VACIAS.has(n)) continue;
    const r = n.slice(0, 6);
    if (!m.has(r)) m.set(r, palabra.toLowerCase());
  }
  return m;
}

/* ---------- Casos ---------- */

const casos = [];
for (const archivo of (await fs.readdir(CASOS)).filter(f => f.endsWith(".mdx")).sort()) {
  const fm = (await fs.readFile(path.join(CASOS, archivo), "utf8")).split(/^---\s*$/m)[1];
  const d = YAML.parse(fm);
  if (d.draft) continue;
  const slug = archivo.replace(/\.mdx$/, "");
  casos.push({
    slug,
    title: d.title,
    tipo: d.tipo,
    tags: d.tags ?? [],
    url: `${WEB}/casos/${slug}/`,
    raices: raices(`${d.title} ${d.description}`),
    temas: temasDe(`${d.title} ${d.description}`),
  });
}

if (orden === "temas") {
  for (const [tema] of TEMAS) {
    const de = casos.filter(c => c.temas.has(tema));
    console.log(`${tema} (${de.length}): ${de.map(c => c.slug).join(", ") || "—"}`);
  }
  const sin = casos.filter(c => !c.temas.size);
  console.log(`\nSin tema (${sin.length}): ${sin.map(c => c.slug).join(", ") || "—"}`);
  process.exit(0);
}
const df = new Map();
for (const c of casos) for (const r of c.raices.keys()) df.set(r, (df.get(r) ?? 0) + 1);
const peso = r => Math.log(casos.length / (df.get(r) ?? casos.length));

/* ---------- Cruce ---------- */

// JSON (array de objetos) o TSV de extraer.js: usuario, id, fecha (UTC), texto, citado y visualizaciones, uno por línea.
const bruto = await fs.readFile(args[1], "utf8");
const tuits = args[1].endsWith(".tsv")
  ? bruto
      .split("\n")
      .filter(l => l.trim())
      .map(l => {
        const [usuario, id, fecha, texto, citado, vis] = l.split("\t");
        return { usuario, id, fecha: `${fecha}Z`, texto, ...(citado?.trim() && { citado }), ...(vis?.trim() && { vis: Number(vis) }) };
      })
  : JSON.parse(bruto);
for (const t of tuits) {
  t.url ??= `https://x.com/${t.usuario}/status/${t.id}`;
  t.id ??= t.url.match(/status\/(\d+)/)?.[1];
}
// Un tuit puede salir en dos búsquedas de la misma pasada (el de un político con muchos «me gusta», en la suya y en
// la de virales; el de una cuenta de `virales.cuentas`, en las dos de virales): se queda uno, el de más visualizaciones.
{
  const porId = new Map();
  for (const t of tuits) if ((t.vis ?? 0) >= (porId.get(t.id)?.vis ?? -1)) porId.set(t.id, t);
  tuits.splice(0, tuits.length, ...porId.values());
}

// Con ventanas largas las pasadas se solapan: fuera los tuits que ya están en la bandeja de hoy o de
// ayer (la ventana puede cruzar la medianoche). Con --repetir se cruzan todos.
const dia = d => new Intl.DateTimeFormat("sv-SE", { timeZone: ZONA }).format(d);
const yaVistos = new Set();
if (!args.includes("--repetir")) {
  for (const d of [new Date(), new Date(Date.now() - 864e5)]) {
    const previo = await fs.readFile(path.join(DIR, `${dia(d)}.md`), "utf8").catch(() => "");
    for (const [, id] of previo.matchAll(/status\/(\d+)/g)) yaVistos.add(id);
  }
}
const leidos = tuits.length;
tuits.splice(0, tuits.length, ...tuits.filter(t => !yaVistos.has(t.id)));
const repetidos = leidos - tuits.length;
const etiquetaDe = new Map(cuentas.map(c => [c.usuario.toLowerCase(), c.etiqueta]));
const frecuenciaEtiqueta = e => casos.filter(c => c.tags.includes(e)).length / casos.length;

const resultados = [];
for (const t of tuits) {
  const propias = raices(`${t.texto ?? ""} ${t.citado ?? ""}`);
  const temasTuit = temasDe(`${t.texto ?? ""} ${t.citado ?? ""}`);
  const etiqueta = etiquetaDe.get((t.usuario ?? "").toLowerCase());
  const candidatos = [];
  for (const c of casos) {
    const temas = [...temasTuit].filter(x => c.temas.has(x));
    if (!temas.length) continue;
    const comunes = [...propias.keys()].filter(r => c.raices.has(r));
    // Una etiqueta que llevan casi todos los casos (PSOE) no distingue nada: sin bonus.
    const autor = etiqueta && c.tags.includes(etiqueta) && frecuenciaEtiqueta(etiqueta) <= MAX_ETIQUETA;
    const puntos = (temas.length * 5 + comunes.reduce((s, r) => s + peso(r), 0)) * (autor ? 1.5 : 1);
    comunes.sort((a, b) => peso(b) - peso(a));
    candidatos.push({ c, autor, puntos, temas, palabras: comunes.map(r => c.raices.get(r)) });
  }
  candidatos.sort((a, b) => b.puntos - a.puntos);
  resultados.push({ t, candidatos: candidatos.slice(0, MAX_CASOS) });
}

/* ---------- Bandeja ---------- */

const ahora = new Date();
const hoy = dia(ahora);
const hora = d => new Intl.DateTimeFormat("es-ES", { timeZone: ZONA, hour: "2-digit", minute: "2-digit" }).format(d);
// Primero los de más alcance: es donde una respuesta se ve.
const conCaso = resultados.filter(r => r.candidatos.length).sort((a, b) => (b.t.vis ?? 0) - (a.t.vis ?? 0));

let md = `## Pasada de las ${hora(ahora)}\n\n`;
md += `${tuits.length} tuits nuevos${repetidos ? ` (${repetidos} ya estaban en la bandeja)` : ""}; ${conCaso.length} con algún caso posible.\n\n`;
for (const { t, candidatos } of conCaso) {
  const cuando = t.fecha ? hora(new Date(t.fecha)) : "s. h.";
  const alcance = t.vis ? `, ${t.vis.toLocaleString("es-ES")} visualizaciones` : "";
  md += `### @${t.usuario}, ${cuando}${alcance}\n\n${t.url}\n\n> ${(t.texto ?? "").replace(/\n+/g, "\n> ")}\n\n`;
  if (t.citado) md += `Cita o enlaza: ${t.citado}\n\n`;
  for (const { c, autor, puntos, temas, palabras } of candidatos) {
    const pistas = [`tema: ${temas.join(", ")}`, ...(palabras.length ? [palabras.join(", ")] : [])];
    md += `- [ ] [${c.title}](${c.url}) — ${c.tipo}${autor ? ", mismo autor" : ""} — ${pistas.join("; ")} (${puntos.toFixed(1)})\n`;
  }
  md += "\n";
}
// Todos los leídos, también los que no tienen caso, para que la pasada siguiente se los salte.
if (tuits.length) md += `<!-- leídos: ${tuits.map(t => `status/${t.id}`).join(" ")} -->\n`;

if (args.includes("--simular")) {
  console.log(md);
} else {
  const destino = path.join(DIR, `${hoy}.md`);
  const previo = await fs.readFile(destino, "utf8").catch(() => `# Respuestas en X del ${hoy}\n\n`);
  await fs.writeFile(destino, `${previo.trimEnd()}\n\n${md}`.trimStart());
  console.log(`${path.relative(process.cwd(), destino)}: ${tuits.length} tuits, ${conCaso.length} con caso posible`);
}

function salir(msg) {
  console.error(msg);
  process.exit(1);
}
