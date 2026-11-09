import { getCollection, type CollectionEntry } from "astro:content";
import { slugifyStr } from "@utils/slugify";

export type Mentira = CollectionEntry<"mentira">;
export type Hito = Mentira["data"]["antes"];
export type Fecha = Hito["fecha"];

export interface TagInfo {
  slug: string;
  name: string;
  count: number;
}

/**
 * Todas las mentiras publicables, ordenadas por la fecha de la contradicción
 * (`despues`), de la más reciente a la más antigua.
 * Los borradores se ven en `astro dev` pero nunca en el build de producción.
 */
export async function getMentiras(): Promise<Mentira[]> {
  const mentiras = await getCollection(
    "mentira",
    ({ data }) => import.meta.env.DEV || !data.draft
  );
  return mentiras.sort(
    (a, b) => b.data.despues.fecha.valor.valueOf() - a.data.despues.fecha.valor.valueOf()
  );
}

/** Antes, cronología y después, en orden cronológico. */
export const getHitos = ({ data }: Mentira): Hito[] =>
  [data.antes, ...data.cronologia, data.despues].sort(
    (a, b) => a.fecha.valor.valueOf() - b.fecha.valor.valueOf()
  );

/**
 * Vídeo que mejor resume el caso: lo que dijo primero; si no hay, la
 * contradicción; si tampoco, el último vídeo de la cronología.
 */
export const getVideoPrincipal = ({ data }: Mentira) =>
  data.antes.video ??
  data.despues.video ??
  data.cronologia.findLast(hito => hito.video)?.video;

/** La destacada; si no hay ninguna, la más reciente. */
export const getFeatured = (mentiras: Mentira[]): Mentira | undefined =>
  mentiras.find(({ data }) => data.featured) ?? mentiras[0];

/** Tags únicos por slug, conservando el nombre legible, ordenados por uso. */
export function getTags(mentiras: Mentira[]): TagInfo[] {
  const tags = new Map<string, TagInfo>();
  for (const { data } of mentiras) {
    for (const name of data.tags) {
      const slug = slugifyStr(name);
      const tag = tags.get(slug) ?? { slug, name, count: 0 };
      tag.count++;
      tags.set(slug, tag);
    }
  }
  return [...tags.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name, "es")
  );
}

export const getMentirasByTag = (mentiras: Mentira[], slug: string) =>
  mentiras.filter(({ data }) => data.tags.some(tag => slugifyStr(tag) === slug));
