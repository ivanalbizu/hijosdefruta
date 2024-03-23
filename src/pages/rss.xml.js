import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const mentiras = await getCollection('mentira');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: mentiras.map((mentira) => ({
			...mentira.data,
			link: `/mentira/${mentira.slug}/`,
		})),
	});
}
