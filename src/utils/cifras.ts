/*
 * Norma de cifras (RAE, ver CLAUDE.md): en los textos que se ven, los grupos de miles van con espacio fino
 * que no se parte (U+202F), no con un espacio normal, para que «51 000» no se corte al final de una línea.
 * Lo comprueban el esquema (frontmatter de casos y promesas, en content/config.ts) y getCasos (cuerpo de
 * los casos). No se aplica a `buscar` e `incluir` de los recortes, que deben coincidir con el texto del PDF.
 * Si salta en falso («en 2019 300 personas»), reescribe la frase.
 */

/** Primera cifra con un espacio normal entre los grupos de miles («51 000»), si la hay. */
export const cifraPartida = (texto: string) => /\d+(?: \d{3})+(?!\d)/.exec(texto)?.[0];

export const avisoCifraPartida = (cifra: string) =>
  `La cifra «${cifra}» separa los miles con un espacio normal: usa el espacio fino que no se parte (U+202F)`;
