import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getMentiras } from '@utils/mentiras';

export async function GET(context) {
	const mentiras = await getMentiras();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: '<language>es-es</language>',
		items: mentiras.map(({ slug, data }) => ({
			title: data.title,
			description: data.description,
			pubDate: data.pubDate,
			categories: data.tags,
			link: `/mentira/${slug}/`,
		})),
	});
}
