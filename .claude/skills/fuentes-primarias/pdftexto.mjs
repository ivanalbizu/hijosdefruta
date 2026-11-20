#!/usr/bin/env node
/**
 * Lee un PDF local con el pdfjs-dist del proyecto (no hay pdftotext en el equipo).
 *
 *   node .claude/skills/fuentes-primarias/pdftexto.mjs <archivo.pdf>
 *       → páginas, tamaño, SHA-256 y si termina en %%EOF (Web Archive corta a veces los PDF en 1 MiB)
 *   node .claude/skills/fuentes-primarias/pdftexto.mjs <archivo.pdf> "fragmento" ["otro"…] [--contexto 300]
 *       → página y contexto de cada aparición (sin distinguir mayúsculas, tildes, comillas
 *         ni guiones de fin de línea)
 *   node .claude/skills/fuentes-primarias/pdftexto.mjs <archivo.pdf> --pagina 14 [--pagina 15]
 *       → texto completo de esas páginas
 *   node .claude/skills/fuentes-primarias/pdftexto.mjs <archivo.pdf> --todo
 *       → texto de todas las páginas (para PDF cortos)
 *
 * Solo lee archivos locales: descarga antes el PDF (curl, copia `id_` de Web Archive o el usuario
 * desde el navegador) a investigacion/material/<caso>/ o al scratchpad.
 */
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const args = process.argv.slice(2);
const opcion = nombre => {
	const valores = [];
	for (let i = 0; i < args.length; i++) if (args[i] === nombre) valores.push(args.splice(i--, 2)[1]);
	return valores;
};
const paginas = opcion('--pagina').map(Number);
const contexto = Number(opcion('--contexto')[0] ?? 300);
const todo = args.includes('--todo');
const [archivo, ...terminos] = args.filter(a => a !== '--todo');

if (!archivo) {
	console.error('Uso: node pdftexto.mjs <archivo.pdf> ["fragmento"…] [--pagina N] [--todo] [--contexto 300]');
	process.exit(1);
}

const bytes = await readFile(archivo);
const cola = bytes.subarray(-1024).toString('latin1');
console.log(
	`${archivo}\n  ${bytes.length} bytes · SHA-256 ${createHash('sha256').update(bytes).digest('hex')}` +
		` · ${cola.includes('%%EOF') ? 'termina en %%EOF' : 'NO termina en %%EOF (¿copia truncada?)'}`,
);

const pdf = await getDocument({ data: new Uint8Array(bytes), useSystemFonts: true, verbosity: 0 }).promise;
console.log(`  ${pdf.numPages} páginas\n`);

/** Texto de una página, con saltos de línea donde los pone el PDF. */
async function textoPagina(n) {
	const contenido = await (await pdf.getPage(n)).getTextContent();
	return contenido.items.map(i => (i.str ?? '') + (i.hasEOL ? '\n' : '')).join('');
}

/**
 * Versión normalizada para buscar (minúsculas, sin tildes, comillas rectas, espacios simples,
 * sin guiones de partición) y, para cada carácter, su posición en el texto original.
 */
function normalizar(texto) {
	let norm = '';
	const mapa = [];
	for (let i = 0; i < texto.length; i++) {
		const c = texto[i];
		if (c === '­') continue;
		// «pro-\npuesta» → «propuesta»: guion entre letra y minúscula con un salto o espacios en medio
		if (c === '-' && /\p{L}/u.test(texto[i - 1] ?? '')) {
			let j = i + 1;
			while (j < texto.length && /\s/.test(texto[j])) j++;
			if (j > i + 1 && /\p{Ll}/u.test(texto[j] ?? '')) {
				i = j - 1;
				continue;
			}
		}
		if (/\s/.test(c)) {
			if (norm && !norm.endsWith(' ')) {
				norm += ' ';
				mapa.push(i);
			}
			continue;
		}
		const base = c
			.normalize('NFD')
			.replace(/\p{M}/gu, '')
			.replace(/[«»“”„]/g, '"')
			.replace(/[‘’]/g, "'")
			.toLowerCase();
		for (const b of base) {
			norm += b;
			mapa.push(i);
		}
	}
	return { norm, mapa };
}

const limpio = s => s.replace(/\s+/g, ' ').trim();

if (paginas.length || todo) {
	const lista = todo ? Array.from({ length: pdf.numPages }, (_, i) => i + 1) : paginas;
	for (const n of lista) console.log(`--- página ${n} ---\n${await textoPagina(n)}\n`);
} else if (terminos.length) {
	const textos = [];
	for (let n = 1; n <= pdf.numPages; n++) textos.push(await textoPagina(n));
	for (const termino of terminos) {
		const buscado = normalizar(termino).norm.trim();
		let total = 0;
		console.log(`«${termino}»`);
		textos.forEach((texto, i) => {
			const { norm, mapa } = normalizar(texto);
			for (let p = norm.indexOf(buscado); p !== -1; p = norm.indexOf(buscado, p + 1)) {
				total++;
				const ini = mapa[p];
				const fin = mapa[p + buscado.length - 1] + 1;
				const antes = limpio(texto.slice(Math.max(0, ini - contexto), ini));
				const despues = limpio(texto.slice(fin, fin + contexto));
				console.log(`  pág. ${i + 1}: …${antes} [[${limpio(texto.slice(ini, fin))}]] ${despues}…\n`);
			}
		});
		if (!total) console.log('  sin resultados (prueba con un fragmento más corto: el PDF puede partir o cambiar palabras)\n');
	}
}
