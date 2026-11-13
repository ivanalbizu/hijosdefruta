import type { APIRoute } from 'astro';
import { getCasos, isoFecha, type Hito } from '@utils/casos';
import { slugifyStr } from '@utils/slugify';
import { SITE_DESCRIPTION, SITE_TITLE, TIPOS } from '../consts';

/*
 * Todos los casos publicados en JSON, para agentes, WebMCP y cualquiera que quiera reutilizarlos.
 * Solo campos tal cual están en el contenido: citas literales, fechas con su precisión y fuentes.
 * Nada resumido ni reinterpretado.
 */

const hito = (h: Hito, site: URL) => ({
	fecha: isoFecha(h.fecha),
	precision: h.fecha.precision,
	quien: h.quien,
	cita: h.cita ?? null,
	hecho: h.hecho ?? null,
	contexto: h.contexto,
	fuente: { url: h.fuente.url, medio: h.fuente.medio, archivo: h.fuente.archivo ?? null },
	video: h.video ? `https://www.youtube.com/watch?v=${h.video.id}${h.video.start ? `&t=${h.video.start}` : ''}` : null,
	documento: h.documento
		? {
				url: h.documento.url,
				pagina: h.documento.pagina ?? null,
				sha256: h.documento.sha256 ?? null,
				archivo: h.documento.archivo ?? null,
				recorte: h.documento.imagen ? new URL(h.documento.imagen.src, site).href : null,
			}
		: null,
});

export const GET: APIRoute = async ({ site }) => {
	const base = site ?? new URL('https://hijosdefruta.netlify.app');
	const casos = await getCasos();
	const datos = {
		sitio: SITE_TITLE,
		descripcion: SITE_DESCRIPTION,
		metodologia: new URL('/metodologia/', base).href,
		tipos: Object.fromEntries(Object.entries(TIPOS).map(([k, v]) => [k, v.descripcion])),
		casos: casos.map(({ slug, data }) => ({
			slug,
			url: new URL(`/casos/${slug}/`, base).href,
			titulo: data.title,
			descripcion: data.description,
			tipo: data.tipo,
			tags: data.tags.map(nombre => ({ nombre, slug: slugifyStr(nombre) })),
			publicado: data.pubDate.toISOString().slice(0, 10),
			revisado: data.revisado.toISOString().slice(0, 10),
			antes: hito(data.antes, base),
			despues: hito(data.despues, base),
			cronologia: data.cronologia.map(h => hito(h, base)),
		})),
	};
	return new Response(JSON.stringify(datos, null, '\t'), {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
};
