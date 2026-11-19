import type { APIRoute } from 'astro';

/* Todo indexable; el sitemap se declara aquí para que lo encuentren todos los buscadores. */
export const GET: APIRoute = ({ site }) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
