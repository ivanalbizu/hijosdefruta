import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// SITE_URL permite sobrescribirlo; Netlify expone la URL principal en `URL`.
const site = process.env.SITE_URL || process.env.URL || 'https://hijoputismo.com';

// https://astro.build/config
export default defineConfig({
	site,
	// El CSS va dentro de cada página: es pequeño (unos 3,6 KB comprimido) y así no bloquea la
	// primera visualización con una petición aparte. Casi todas las visitas entran por un enlace.
	build: { inlineStylesheets: 'always' },
	integrations: [mdx(), sitemap({ filter: page => !page.includes('/sistema-diseno') && !page.endsWith('/404/') })],
});
