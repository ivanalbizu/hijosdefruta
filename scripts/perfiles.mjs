#!/usr/bin/env node
/**
 * Descarga la foto (personas) o el logo (partidos) de cada perfil desde Wikimedia Commons
 * y guarda en el YAML el autor y la licencia, que se muestran junto a la imagen.
 *
 *   npm run perfiles                 → solo los perfiles que aún no tienen imagen
 *   npm run perfiles -- pedro-sanchez → uno concreto (aunque ya tenga imagen)
 *   npm run perfiles -- --todos       → vuelve a descargarlas todas
 *
 * La imagen sale de la propiedad P18 (imagen) o P154 (logo) del elemento de Wikidata
 * indicado en `wikidata:`. Si prefieres otra, pon su nombre en `imagen.commons` y vuelve
 * a ejecutar el script con ese perfil.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseDocument } from 'yaml';

const DIR_PERFILES = 'src/content/perfil';
const DIR_IMAGENES = 'src/assets/perfiles';
const ANCHO = 480;
const UA = { 'User-Agent': 'astro-static-site-build/1.0 (perfiles script)' };

const args = process.argv.slice(2);
const todos = args.includes('--todos');
const elegidos = args.filter(a => !a.startsWith('--'));

const esperar = ms => new Promise(r => setTimeout(r, ms));

/** Wikimedia limita las peticiones: reintenta con espera si responde 429. */
async function pedir(url, tipo = 'json') {
	for (let intento = 1; ; intento++) {
		const res = await fetch(url, { headers: UA });
		if (res.status === 429 && intento < 5) {
			await esperar(5000 * intento);
			continue;
		}
		if (!res.ok) throw new Error(`${res.status} ${url}`);
		return tipo === 'json' ? res.json() : Buffer.from(await res.arrayBuffer());
	}
}

/** Primer valor de una propiedad, dando prioridad al de rango "preferred". */
function valorPreferido(claims = []) {
	const c = claims.find(c => c.rank === 'preferred') ?? claims.find(c => c.rank !== 'deprecated');
	return c?.mainsnak?.datavalue?.value;
}

const sinHtml = s =>
	(s ?? '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/^Unknown author( Unknown author)?$/i, 'Autor desconocido');

async function procesar(archivo) {
	const ruta = path.join(DIR_PERFILES, archivo);
	const slug = path.basename(archivo, '.yaml');
	const doc = parseDocument(await fs.readFile(ruta, 'utf8'));
	const datos = doc.toJS();

	let fichero = datos.imagen?.commons;
	if (!fichero) {
		if (!datos.wikidata) return console.log(`· ${slug}: sin wikidata, se omite`);
		const wd = await pedir(
			`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${datos.wikidata}&props=claims&format=json`
		);
		const claims = wd.entities[datos.wikidata].claims;
		fichero = valorPreferido(datos.tipo === 'partido' ? claims.P154 ?? claims.P18 : claims.P18);
		if (!fichero) return console.log(`✗ ${slug}: Wikidata no tiene imagen`);
	}

	const info = await pedir(
		`https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(`File:${fichero}`)}` +
			`&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=${ANCHO}&format=json`
	);
	const pagina = Object.values(info.query.pages)[0];
	const ii = pagina.imageinfo?.[0];
	if (!ii) return console.log(`✗ ${slug}: no existe File:${fichero} en Commons`);
	const meta = ii.extmetadata ?? {};

	// Los SVG se guardan como el PNG que genera Commons.
	const ext = path.extname(new URL(ii.thumburl).pathname).toLowerCase() || '.jpg';
	const destino = path.join(DIR_IMAGENES, `${slug}${ext}`);
	await fs.mkdir(DIR_IMAGENES, { recursive: true });
	await fs.writeFile(destino, await pedir(ii.thumburl, 'binario'));

	// Si la imagen anterior tenía otra extensión, se borra para no dejar archivos huérfanos.
	const anterior = datos.imagen?.archivo && path.resolve(DIR_PERFILES, datos.imagen.archivo);
	if (anterior && anterior !== path.resolve(destino)) await fs.rm(anterior, { force: true });

	doc.set('imagen', {
		archivo: path.relative(DIR_PERFILES, destino),
		commons: fichero,
		autor: sinHtml(meta.Artist?.value) || 'Autor desconocido',
		licencia: sinHtml(meta.LicenseShortName?.value) || 'Ver en Commons',
		...(meta.LicenseUrl?.value ? { licenciaUrl: meta.LicenseUrl.value } : {}),
		url: ii.descriptionurl,
	});
	await fs.writeFile(ruta, doc.toString({ lineWidth: 0 }));
	console.log(`✓ ${slug}: ${fichero} (${sinHtml(meta.LicenseShortName?.value)})`);
}

const archivos = (await fs.readdir(DIR_PERFILES)).filter(f => f.endsWith('.yaml'));
for (const archivo of archivos) {
	const slug = path.basename(archivo, '.yaml');
	if (elegidos.length && !elegidos.includes(slug)) continue;
	if (!todos && !elegidos.length) {
		const { imagen } = parseDocument(await fs.readFile(path.join(DIR_PERFILES, archivo), 'utf8')).toJS();
		if (imagen?.archivo) continue;
	}
	try {
		await procesar(archivo);
	} catch (e) {
		console.log(`✗ ${slug}: ${e.message}`);
		process.exitCode = 1;
	}
	await esperar(1500);
}
