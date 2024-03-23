import { slugifyAll } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";

const getPostsByTag = (posts: CollectionEntry<"mentira">[], tag: string) =>
  posts.filter(post => slugifyAll(post.data.tags).includes(tag));

export default getPostsByTag;
