/**
 * Genera los iconos de la web a partir de public/favicon.svg:
 *   favicon.ico (16, 32 y 48 px), apple-touch-icon.png (180 px, fondo opaco y sin esquinas: iOS las redondea),
 *   icon-192.png e icon-512.png (manifest) e icon-maskable-512.png (con margen de seguridad para Android).
 * Ejecutar tras cambiar el SVG: `npm run favicons`.
 */
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const PUBLIC = new URL('../public/', import.meta.url);
const svg = await readFile(new URL('favicon.svg', PUBLIC), 'utf8');

/** Mismo dibujo sin el rectángulo redondeado: las burbujas sobre un cuadrado lleno, reducidas a `escala`. */
const cuadrado = escala => {
	const dibujo = svg.replace(/<rect[^>]*\/>/, '').replace(/<\/?svg[^>]*>/g, '');
	const fondo = svg.match(/<rect[^>]*fill="([^"]+)"/)?.[1] ?? '#151923';
	const margen = (32 * (1 - escala)) / 2;
	return Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${fondo}"/>` +
			`<g transform="translate(${margen} ${margen}) scale(${escala})">${dibujo}</g></svg>`,
	);
};

const png = (fuente, lado) => sharp(fuente, { density: 1200 }).resize(lado, lado).png().toBuffer();

/** ICO con entradas PNG (admitido desde Windows Vista y en todos los navegadores actuales). */
const ico = imagenes => {
	const cabecera = Buffer.alloc(6);
	cabecera.writeUInt16LE(0, 0);
	cabecera.writeUInt16LE(1, 2);
	cabecera.writeUInt16LE(imagenes.length, 4);
	let desplazamiento = 6 + 16 * imagenes.length;
	const entradas = imagenes.map(({ lado, datos }) => {
		const e = Buffer.alloc(16);
		e.writeUInt8(lado >= 256 ? 0 : lado, 0);
		e.writeUInt8(lado >= 256 ? 0 : lado, 1);
		e.writeUInt16LE(1, 4); // planos
		e.writeUInt16LE(32, 6); // bits por píxel
		e.writeUInt32LE(datos.length, 8);
		e.writeUInt32LE(desplazamiento, 12);
		desplazamiento += datos.length;
		return e;
	});
	return Buffer.concat([cabecera, ...entradas, ...imagenes.map(i => i.datos)]);
};

const original = Buffer.from(svg);
const tamIco = [16, 32, 48];
const icoDatos = ico(await Promise.all(tamIco.map(async lado => ({ lado, datos: await png(original, lado) }))));

const salidas = {
	'favicon.ico': icoDatos,
	'apple-touch-icon.png': await png(cuadrado(0.8), 180),
	'icon-192.png': await png(original, 192),
	'icon-512.png': await png(original, 512),
	// La zona segura de un icono «maskable» es el círculo central del 80 %.
	'icon-maskable-512.png': await png(cuadrado(0.7), 512),
};

for (const [nombre, datos] of Object.entries(salidas)) {
	await writeFile(new URL(nombre, PUBLIC), datos);
	console.log(`public/${nombre} (${datos.length} bytes)`);
}
