import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

/* Datos estructurados schema.org compartidos por varias páginas. */

/** Editor del sitio, con el logo cuadrado que Google admite (mínimo 112 px). */
export const organizacion = (site: URL | undefined) => ({
	'@type': 'Organization',
	name: SITE_TITLE,
	url: site?.href,
	logo: new URL('/icon-512.png', site).href,
});

/** El sitio: Google toma de aquí el nombre que muestra sobre el resultado. */
export const sitioWeb = (site: URL | undefined) => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: SITE_TITLE,
	url: site?.href,
	description: SITE_DESCRIPTION,
	inLanguage: 'es',
	publisher: organizacion(site),
});
