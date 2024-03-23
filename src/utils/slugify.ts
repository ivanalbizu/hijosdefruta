import slug from "slugify";
import type { CollectionEntry } from "astro:content";

export const slugifyStr = (str: string) => slug(str, {
  lower: true
});

const slugify = (post: CollectionEntry<"mentira">["data"]) =>
  post.postSlug ? slug(post.postSlug) : slug(post.title);

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;
