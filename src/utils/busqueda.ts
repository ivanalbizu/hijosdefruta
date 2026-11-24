import { SINONIMOS } from './sinonimos';

/*
 * Búsqueda de texto de los casos, compartida por /buscar/ (índice en el build, filtro en el navegador)
 * y por la herramienta WebMCP. Sin dependencias de Astro: también la importan los scripts del cliente.
 *
 * - Sin tildes ni mayúsculas: «camara» encuentra «Cámara».
 * - Cifras sin separador de miles: «1600», «1.600» y «1 600» son lo mismo.
 * - Cada palabra de la consulta debe estar al principio de una palabra del texto: «pension» encuentra
 *   «pensiones», pero no «suspensiones»; «ico» no encuentra «político».
 * - El índice lleva los sinónimos de `sinonimos.ts`: «inmigración» encuentra «migración».
 */

const LETRA_O_CIFRA = '\\p{L}\\p{N}';
const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Minúsculas, sin tildes y con las cifras sin separador de miles (punto, espacio o espacio fino). */
export const normalizarBusqueda = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/(\d)[ .  ](?=\d{3}(?!\d))/g, '$1');

const GRUPOS = SINONIMOS.map(terminos => {
  const grupo = terminos.map(normalizarBusqueda);
  return {
    grupo,
    // Término como palabra entera, con -s o -es opcional.
    patron: new RegExp(
      `(?:^|[^${LETRA_O_CIFRA}])(?:${grupo.map(escapar).join('|')})(?:e?s)?(?![${LETRA_O_CIFRA}])`,
      'u'
    ),
  };
});

/** Texto del índice de un caso: las partes normalizadas y, al final, los sinónimos de lo que aparece. */
export function indiceBusqueda(partes: string[]) {
  const texto = normalizarBusqueda(partes.join(' '));
  const sinonimos = GRUPOS.filter(g => g.patron.test(texto)).flatMap(g => g.grupo);
  return sinonimos.length ? `${texto} ${sinonimos.join(' ')}` : texto;
}

/** Palabras de la consulta, normalizadas y sin comillas ni signos en los extremos. */
export const palabrasBusqueda = (consulta: string) =>
  normalizarBusqueda(consulta)
    .split(/\s+/)
    .map(p => p.replace(new RegExp(`^[^${LETRA_O_CIFRA}]+|[^${LETRA_O_CIFRA}]+$`, 'gu'), ''))
    .filter(Boolean);

/**
 * Singular aproximado de una palabra de la consulta, para que «inmigrantes» encuentre «inmigrante» y
 * «presupuestos», «presupuesto». Solo si quedan cuatro letras o más («tres», «mas» se quedan igual).
 */
const singular = (p: string) =>
  [/^(.+[^aeiou\d])es$/, /^(.+[aeiou])s$/].map(re => re.exec(p)?.[1]).find(r => r && r.length >= 4) ?? p;

/**
 * Comprobación de una consulta contra un índice: todas sus palabras, cada una al principio de una
 * palabra del texto. Las cifras, enteras: «60000» no encuentra «600000».
 */
export function filtroTexto(consulta: string) {
  const patrones = palabrasBusqueda(consulta).map(
    p => new RegExp(`(?:^|[^${LETRA_O_CIFRA}])${escapar(singular(p))}${/\d$/.test(p) ? '(?!\\d)' : ''}`, 'u')
  );
  return (indice: string) => patrones.every(p => p.test(indice));
}
