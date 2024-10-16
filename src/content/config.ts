import { defineCollection, z } from 'astro:content';

const mentira = defineCollection({
	schema: z.object({
		title: z.string(),
		postSlug: z.string().optional(),
		description: z.string(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		lieDateDigo: z.date(),
		lieDate: z.date(),
		author: z.string().optional(),
		featured: z.boolean().optional(),
		draft: z.boolean().optional(),
		tags: z.array(z.string()).default(["others"]),
		youtubeId: z.string().optional(),
		youtubeTitle: z.string().optional()
	})
});

export const collections = { mentira };
