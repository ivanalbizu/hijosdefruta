import { getCollection, type CollectionEntry } from "astro:content";
import { slugifyStr } from "@utils/slugify";

export type Caso = CollectionEntry<"casos">;
export type Hito = Caso["data"]["antes"];
export type Fecha = Hito["fecha"];

const FORMATOS: Record<Fecha["precision"], Intl.DateTimeFormatOptions> = {
  dia: { year: "numeric", month: "long", day: "numeric" },
  mes: { year: "numeric", month: "long" },
  anio: { year: "numeric" },
};

/**
 * "4 de noviembre de 2019", "marzo de 2015" o "2015" según la precisión.
 * En UTC para que la fecha no cambie con la zona horaria de la máquina que compila.
 */
export const formatFecha = ({ valor, precision }: Fecha) =>
  valor.toLocaleDateString("es-ES", { ...FORMATOS[precision], timeZone: "UTC" });

/** Fecha ISO recortada a la precisión conocida, para el atributo `datetime`. */
export const isoFecha = ({ valor, precision }: Fecha) =>
  valor.toISOString().slice(0, { dia: 10, mes: 7, anio: 4 }[precision]);

export interface TagInfo {
  slug: string;
  name: string;
  count: number;
}

/**
 * Todos los casos publicables, ordenados por la fecha de la contradicción
 * (`despues`), del más reciente al más antiguo.
 * Los borradores se ven en `astro dev` pero nunca en el build de producción.
 */
export async function getCasos(): Promise<Caso[]> {
  const casos = await getCollection(
    "casos",
    ({ data }) => import.meta.env.DEV || !data.draft
  );
  return casos.sort(
    (a, b) => b.data.despues.fecha.valor.valueOf() - a.data.despues.fecha.valor.valueOf()
  );
}

/** Antes, cronología y después, en orden cronológico. */
export const getHitos = ({ data }: Caso): Hito[] =>
  [data.antes, ...data.cronologia, data.despues].sort(
    (a, b) => a.fecha.valor.valueOf() - b.fecha.valor.valueOf()
  );

/**
 * Vídeo que mejor resume el caso: lo que dijo primero; si no hay, la
 * contradicción; si tampoco, el último vídeo de la cronología.
 */
export const getVideoPrincipal = ({ data }: Caso) =>
  data.antes.video ??
  data.despues.video ??
  data.cronologia.findLast(hito => hito.video)?.video;

/** El destacado (`featured`); si no hay ninguno, el más reciente. */
export const getFeatured = (casos: Caso[]): Caso | undefined =>
  casos.find(({ data }) => data.featured) ?? casos[0];

/** Tags únicos por slug, conservando el nombre legible, ordenados por uso. */
export function getTags(casos: Caso[]): TagInfo[] {
  const tags = new Map<string, TagInfo>();
  for (const { data } of casos) {
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

export const getCasosByTag = (casos: Caso[], slug: string) =>
  casos.filter(({ data }) => data.tags.some(tag => slugifyStr(tag) === slug));

/** Recorta en el último espacio antes de `max` caracteres y añade "…". */
export function recortar(texto: string, max: number) {
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max);
  return corte.slice(0, corte.lastIndexOf(" ")).replace(/[\s,.;:]+$/, "") + "…";
}

/**
 * Lo esencial de un hito para tarjetas e imágenes: el `destacado` o la cita (o el
 * hecho) recortada. Las citas van entre comillas latinas; los hechos, sin ellas.
 */
export function resumenHito(hito: Hito, max: number) {
  const fragmento = recortar(hito.destacado ?? hito.cita ?? hito.hecho ?? "", max);
  return hito.cita ? `«${fragmento}»` : fragmento;
}

/** Número de fuentes distintas (por URL) de un caso. */
export const contarFuentes = (caso: Caso) =>
  new Set(getHitos(caso).map(h => h.fuente.url)).size;

/** Minúsculas y sin tildes, para buscar «camara» y encontrar «Cámara». */
export const normalizar = (texto: string) =>
  texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/** Años que abarca un caso: de la primera declaración a la última. */
export function aniosCaso(caso: Caso): number[] {
  const anios = getHitos(caso).map(h => h.fecha.valor.getUTCFullYear());
  const [min, max] = [Math.min(...anios), Math.max(...anios)];
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

/** Texto en el que se busca: título, resumen, personas, citas y hechos de todos los hitos. */
export const textoBusqueda = (caso: Caso) =>
  normalizar(
    [
      caso.data.title,
      caso.data.description,
      ...caso.data.tags,
      ...getHitos(caso).flatMap(h => [h.quien, h.cita ?? "", h.hecho ?? ""]),
    ].join(" ")
  );
