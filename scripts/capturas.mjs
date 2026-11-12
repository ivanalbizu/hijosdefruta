#!/usr/bin/env node
/**
 * Genera recortes de documentos oficiales (PDF) con el fragmento citado resaltado.
 *
 *   npm run capturas -- <slug> [<slug>…]   → hitos con `documento.url` sin imagen
 *   npm run capturas -- <slug> --forzar     → los regenera aunque ya existan
 *
 * En el frontmatter del caso, cada hito puede llevar:
 *
 *   documento:
 *     url: https://…/documento.pdf   # PDF oficial (BOE, Diario de Sesiones, La Moncloa, CSN…)
 *     buscar: ['fragmento literal']   # lo que se resalta; por defecto, la cita del hito
 *     incluir: ['frase de contexto']  # opcional: entra en el recorte sin resaltar
 *
 * El script descarga el PDF (o su copia en Web Archive si el original no responde),
 * localiza los fragmentos, dibuja la página, resalta el texto, recorta la zona y
 * escribe en el caso `imagen`, `pagina` y `sha256`. La búsqueda ignora espacios,
 * signos y mayúsculas, porque la extracción de texto de los PDF parte palabras.
 *
 * Solo documentos de organismos oficiales: nunca capturas de prensa.
 */
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { parseDocument } from 'yaml';
import { createCanvas } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const DIR_CASOS = 'src/content/casos';
const DIR_PRUEBAS = 'src/assets/pruebas';
const ESCALA = 2; // píxeles por punto PDF
const MARGEN_X = 14; // puntos a los lados de lo que se recorta
const MARGEN_Y = 6; // arriba y abajo cuando no hay línea vecina (si la hay, se corta a medio camino)
const RESALTE = 'rgba(255, 214, 0, 0.45)';
const UA = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36' };

const require = createRequire(import.meta.url);
const PDFJS = path.dirname(require.resolve('pdfjs-dist/package.json'));

const args = process.argv.slice(2);
const forzar = args.includes('--forzar');
const slugs = args.filter(a => !a.startsWith('--'));
if (!slugs.length) {
	console.error('Uso: npm run capturas -- <slug> [--forzar]');
	process.exit(1);
}

/** Solo letras y números, en minúscula: así "nucl ear" y "nuclear" coinciden. */
const normalizar = s => s.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

async function descargar(url) {
	const intentos = [url, `https://web.archive.org/web/2id_/${url}`];
	for (const u of intentos) {
		try {
			const res = await fetch(u, { headers: UA, redirect: 'follow' });
			const buf = Buffer.from(await res.arrayBuffer());
			if (res.ok && buf.subarray(0, 5).toString() === '%PDF-') return { buf, desde: u };
		} catch {
			// se prueba la siguiente opción
		}
	}
	throw new Error(`no se pudo descargar un PDF de ${url}`);
}

/** URL de la copia más reciente en Web Archive, si existe (índice CDX: más fiable que la API de disponibilidad). */
async function copiaArchivada(url) {
	try {
		const cdx = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(url)}&output=json&filter=statuscode:200&limit=-1&fl=timestamp,original`;
		const filas = await (await fetch(cdx, { headers: UA })).json();
		const [ts, original] = filas[1] ?? [];
		return ts ? `https://web.archive.org/web/${ts}/${original}` : undefined;
	} catch {
		return undefined;
	}
}

/**
 * Texto de la página como lista de caracteres significativos, cada uno con el
 * elemento de texto de pdf.js y su posición dentro de él.
 */
async function caracteres(pagina) {
	const { items } = await pagina.getTextContent();
	const chars = [];
	items.forEach((item, i) => {
		if (!item.str) return;
		[...item.str].forEach((c, pos) => {
			const n = normalizar(c);
			for (const ch of n) chars.push({ ch, item: i, pos });
		});
	});
	return { items, chars, texto: chars.map(c => c.ch).join('') };
}

/** Rectángulos (en puntos PDF) que ocupa un tramo de caracteres. */
function rectangulos({ items, chars }, inicio, fin) {
	const porItem = new Map();
	for (let k = inicio; k < fin; k++) {
		const { item, pos } = chars[k];
		const r = porItem.get(item) ?? { desde: pos, hasta: pos };
		r.desde = Math.min(r.desde, pos);
		r.hasta = Math.max(r.hasta, pos);
		porItem.set(item, r);
	}
	return [...porItem].map(([i, { desde, hasta }]) => {
		const it = items[i];
		const [, , c, d, e, f] = it.transform;
		const alto = Math.hypot(c, d) || it.height || 10;
		const largo = [...it.str].length || 1;
		return {
			x0: e + (it.width * desde) / largo,
			x1: e + (it.width * (hasta + 1)) / largo,
			y0: f - alto * 0.25,
			y1: f + alto * 0.9,
			base: f,
			alto,
		};
	});
}

/** Une los rectángulos de una misma línea en una sola franja (sin huecos en comas o palabras partidas). */
function unirPorLinea(rects) {
	const lineas = [];
	for (const r of rects) {
		const l = lineas.find(l => Math.abs(l.base - r.base) < Math.max(2, r.alto * 0.3));
		if (!l) lineas.push({ ...r });
		else Object.assign(l, { x0: Math.min(l.x0, r.x0), x1: Math.max(l.x1, r.x1), y0: Math.min(l.y0, r.y0), y1: Math.max(l.y1, r.y1), alto: Math.max(l.alto, r.alto) });
	}
	return lineas;
}

/** Busca todos los fragmentos; devuelve la primera página donde aparecen todos. */
async function localizar(pdf, buscar, incluir) {
	for (let n = 1; n <= pdf.numPages; n++) {
		const pagina = await pdf.getPage(n);
		const t = await caracteres(pagina);
		const encontrar = frag => {
			const aguja = normalizar(frag);
			const i = t.texto.indexOf(aguja);
			return i < 0 ? null : rectangulos(t, i, i + aguja.length);
		};
		const resaltes = buscar.map(encontrar);
		if (resaltes.some(r => !r)) continue;
		const contexto = incluir.map(encontrar).filter(Boolean);
		// Límites horizontales de la columna de texto de la página.
		const xs = t.items.filter(i => i.str.trim()).flatMap(i => [i.transform[4], i.transform[4] + i.width]);
		const lineas = t.items.filter(i => i.str.trim()).map(i => ({ base: i.transform[5], alto: Math.hypot(i.transform[2], i.transform[3]) || i.height || 10 }));
		return {
			n,
			pagina,
			resaltes: unirPorLinea(resaltes.flat()),
			contexto: contexto.flat(),
			lineas,
			xMin: Math.min(...xs),
			xMax: Math.max(...xs),
		};
	}
	return null;
}

/** Parte superior e inferior aproximadas de los glifos de una línea (coordenadas PDF, y hacia arriba). */
const techo = l => l.base + l.alto * 0.78;
const suelo = l => l.base - l.alto * 0.22;

/**
 * Límites verticales del recorte (coordenadas PDF): a medio camino entre lo que se
 * muestra y la línea vecina, para no cortar ninguna línea por la mitad.
 */
function limitesVerticales(zona, lineas) {
	const arriba = Math.max(...zona.map(techo));
	const abajo = Math.min(...zona.map(suelo));
	const baseArriba = Math.max(...zona.map(z => z.base));
	const baseAbajo = Math.min(...zona.map(z => z.base));
	const encima = lineas.filter(l => l.base > baseArriba + 1).sort((a, b) => a.base - b.base)[0];
	const debajo = lineas.filter(l => l.base < baseAbajo - 1).sort((a, b) => b.base - a.base)[0];
	return {
		top: encima ? (arriba + suelo(encima)) / 2 : arriba + MARGEN_Y,
		bottom: debajo ? (abajo + techo(debajo)) / 2 : abajo - MARGEN_Y,
	};
}

async function recortar({ pagina, resaltes, contexto, lineas, xMin, xMax }) {
	const viewport = pagina.getViewport({ scale: ESCALA });
	const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	await pagina.render({ canvasContext: ctx, viewport, canvas }).promise;

	const aPixeles = r => {
		const [a, b, c, d] = viewport.convertToViewportRectangle([r.x0, r.y0, r.x1, r.y1]);
		return { x: Math.min(a, c), y: Math.min(b, d), w: Math.abs(c - a), h: Math.abs(d - b) };
	};

	ctx.save();
	ctx.globalCompositeOperation = 'multiply';
	ctx.fillStyle = RESALTE;
	for (const r of resaltes.map(aPixeles)) ctx.fillRect(r.x - 2, r.y - 1, r.w + 4, r.h + 2);
	ctx.restore();

	const zonaPdf = [...resaltes, ...contexto];
	const zona = zonaPdf.map(aPixeles);
	const mx = MARGEN_X * ESCALA;
	const [cx0] = viewport.convertToViewportPoint(xMin, 0);
	const [cx1] = viewport.convertToViewportPoint(xMax, 0);
	const { top, bottom } = limitesVerticales(zonaPdf, lineas);
	const [, yTop] = viewport.convertToViewportPoint(0, top);
	const [, yBottom] = viewport.convertToViewportPoint(0, bottom);
	const x = Math.max(0, Math.floor(Math.min(cx0, ...zona.map(r => r.x)) - mx));
	const y = Math.max(0, Math.floor(Math.min(yTop, yBottom)));
	const x2 = Math.min(canvas.width, Math.ceil(Math.max(cx1, ...zona.map(r => r.x + r.w)) + mx));
	const y2 = Math.min(canvas.height, Math.ceil(Math.max(yTop, yBottom)));

	const salida = createCanvas(x2 - x, y2 - y);
	salida.getContext('2d').drawImage(canvas, x, y, x2 - x, y2 - y, 0, 0, x2 - x, y2 - y);
	return salida.encode('png');
}

async function procesarHito(slug, yamlDoc, nodo, etiqueta) {
	const documento = nodo.get('documento', true);
	if (!documento) return false;
	const datos = nodo.toJS(yamlDoc);
	const doc = datos.documento;
	if (doc.imagen && !forzar) {
		console.log(`· ${slug} / ${etiqueta}: ya tiene recorte (usa --forzar para regenerarlo)`);
		return false;
	}
	const buscar = doc.buscar ?? (datos.cita ? [datos.cita] : null);
	if (!buscar) throw new Error(`${etiqueta}: un hito sin cita necesita \`documento.buscar\``);

	const { buf, desde } = await descargar(doc.url);
	const pdf = await getDocument({
		data: new Uint8Array(buf),
		standardFontDataUrl: path.join(PDFJS, 'standard_fonts/'),
		cMapUrl: path.join(PDFJS, 'cmaps/'),
		cMapPacked: true,
		verbosity: 0,
	}).promise;
	const zona = await localizar(pdf, buscar, doc.incluir ?? []);
	if (!zona) throw new Error(`${etiqueta}: no se encuentra el texto en ${doc.url}`);

	const png = await recortar(zona);
	const rutaPng = path.join(DIR_PRUEBAS, slug, `${etiqueta}.png`);
	await fs.mkdir(path.dirname(rutaPng), { recursive: true });
	await fs.writeFile(rutaPng, png);

	documento.set('imagen', path.relative(DIR_CASOS, rutaPng));
	documento.set('pagina', zona.n);
	documento.set('sha256', crypto.createHash('sha256').update(buf).digest('hex'));
	const archivo = doc.archivo ?? (await copiaArchivada(doc.url));
	if (archivo) documento.set('archivo', archivo);
	else console.log(`  aviso: ${etiqueta} sin copia en Web Archive; guárdala en https://web.archive.org/save/${doc.url}`);
	const origen = desde === doc.url ? '' : ` (desde Web Archive)`;
	console.log(`✓ ${slug} / ${etiqueta}: página ${zona.n}${origen} → ${rutaPng}`);
	return true;
}

for (const slug of slugs) {
	const ruta = path.join(DIR_CASOS, `${slug}.mdx`);
	const texto = await fs.readFile(ruta, 'utf8');
	const m = texto.match(/^---\n([\s\S]*?)\n---\n/);
	if (!m) throw new Error(`${ruta}: sin frontmatter`);
	const doc = parseDocument(m[1]);

	const hitos = [
		['antes', doc.get('antes', true)],
		['despues', doc.get('despues', true)],
		...(doc.get('cronologia', true)?.items ?? []).map((n, i) => [`cronologia-${i + 1}`, n]),
	];
	let cambios = false;
	for (const [etiqueta, nodo] of hitos) {
		if (!nodo) continue;
		try {
			cambios = (await procesarHito(slug, doc, nodo, etiqueta)) || cambios;
		} catch (e) {
			console.error(`✗ ${slug} / ${e.message}`);
			process.exitCode = 1;
		}
	}
	if (cambios) {
		await fs.writeFile(ruta, `---\n${doc.toString({ lineWidth: 0 })}---\n${texto.slice(m[0].length)}`);
	}
}
