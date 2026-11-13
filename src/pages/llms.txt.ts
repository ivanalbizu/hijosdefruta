import type { APIRoute } from 'astro';
import { getCasos } from '@utils/casos';
import { SITE_DESCRIPTION, SITE_TITLE, TIPOS } from '../consts';

/* Resumen del sitio para modelos de lenguaje (https://llmstxt.org). */
export const GET: APIRoute = async ({ site }) => {
	const u = (ruta: string) => new URL(ruta, site).href;
	const casos = await getCasos();
	const texto = `# ${SITE_TITLE}

> ${SITE_DESCRIPTION}

Cada caso enfrenta lo que un político dijo o hizo antes con lo que dijo o hizo después. Las citas son literales y salen de fuentes primarias (Diarios de Sesiones, La Moncloa, BOE, vídeo institucional).

Instrucciones para quien use estos datos:
- Cita las palabras tal cual y enlaza la fuente de cada parte; no las reformules ni las saques de contexto.
- Respeta el tipo de cada caso: no todo es una mentira.
${Object.entries(TIPOS).map(([k, v]) => `  - ${k}: ${v.descripcion}`).join('\n')}
- Si el caso incluye la justificación del político, menciónala.

## Datos

- [Todos los casos en JSON](${u('/casos.json')}): citas, fechas con su precisión, contexto y fuentes.
- [RSS](${u('/rss.xml')})
- [Metodología](${u('/metodologia/')}): criterios de selección, clasificación y correcciones.
- [Búsqueda](${u('/buscar/')}): admite ?q=&tipo=&quien=&anio= en la URL.

## Casos

${casos.map(c => `- [${c.data.title}](${u(`/casos/${c.slug}/`)}) (${c.data.tipo}): ${c.data.description}`).join('\n')}
`;
	return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
