import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// SITE_URL permite sobrescribirlo; Netlify expone la URL principal en `URL`.
const site = process.env.SITE_URL || process.env.URL || 'https://hijosdefruta.netlify.app';

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [mdx(), sitemap({ filter: page => !page.includes('/sistema-diseno') })],
});
