/** Casos por página en los listados (múltiplo de 2 y 3 para que la rejilla quede completa). */
export const POR_PAGINA = 12;

export interface Pagina<T> {
	items: T[];
	/** Número de página, desde 1. */
	actual: number;
	total: number;
	/** Número total de elementos en todas las páginas. */
	elementos: number;
	/** Índice (desde 1) del primer y último elemento de la página. */
	desde: number;
	hasta: number;
}

/** Trocea una lista en páginas. Siempre devuelve al menos una (vacía si no hay elementos). */
export function paginar<T>(items: T[], porPagina = POR_PAGINA): Pagina<T>[] {
	const total = Math.max(1, Math.ceil(items.length / porPagina));
	return Array.from({ length: total }, (_, i) => {
		const desde = i * porPagina;
		const trozo = items.slice(desde, desde + porPagina);
		return {
			items: trozo,
			actual: i + 1,
			total,
			elementos: items.length,
			desde: trozo.length ? desde + 1 : 0,
			hasta: desde + trozo.length,
		};
	});
}

/** URL de la página `n` de un listado: la 1 es la base; el resto, `<base>pagina/<n>/`. */
export function urlPagina(base: string, n: number): string {
	return n <= 1 ? base : `${base}pagina/${n}/`;
}
