import slug from "slugify";

export const slugifyStr = (str: string) => slug(str, { lower: true });
