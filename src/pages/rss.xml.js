import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getCasos } from '@utils/casos';

export async function GET(context) {
	const casos = await getCasos();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: '<language>es-es</language>',
		items: casos.map(({ slug, data }) => ({
			title: data.title,
			description: data.description,
			pubDate: data.pubDate,
			categories: data.tags,
			link: `/casos/${slug}/`,
		})),
	});
}
