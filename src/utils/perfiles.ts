import { getCollection, type CollectionEntry } from "astro:content";
import { slugifyStr } from "@utils/slugify";

export type Perfil = CollectionEntry<"perfil">;

let cache: Promise<Map<string, Perfil>> | undefined;

const cargar = () => getCollection("perfil").then(perfiles => new Map(perfiles.map(p => [p.id, p])));

/**
 * Perfiles indexados por slug (el nombre del archivo, igual que el slug del tag).
 * En el build se leen una vez; en `astro dev`, en cada petición, para ver los cambios.
 */
export const getPerfiles = () => (import.meta.env.DEV ? cargar() : (cache ??= cargar()));

/** "Pedro Sánchez (candidato del PSOE)" → "Pedro Sánchez". */
export const nombreSinCargo = (quien: string) => quien.split(" (")[0].trim();

/** Perfil de un tag o de un `quien` ("Pedro Sánchez (presidente…)"), si existe. */
export async function getPerfil(nombre: string): Promise<Perfil | undefined> {
  return (await getPerfiles()).get(slugifyStr(nombreSinCargo(nombre)));
}

/** "Pedro Sánchez" → "PS"; "PSOE" → "PS". */
export const iniciales = (nombre: string) => {
  const palabras = nombre.split(/\s+/).filter(Boolean);
  return (palabras.length > 1 ? palabras.map(p => p[0]).join("") : nombre).slice(0, 2).toUpperCase();
};
