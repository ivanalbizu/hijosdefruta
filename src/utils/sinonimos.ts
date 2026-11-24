/*
 * Sinónimos y siglas del buscador (/buscar/ y la herramienta WebMCP).
 *
 * Si el texto de un caso contiene un término de un grupo (como palabra entera, en singular o con -s/-es),
 * su índice recibe todos los del grupo: así «inmigración» encuentra los casos que dicen «migración».
 * Solo equivalencias claras: un término de más junta casos que no tienen que ver (por eso no está
 * «libertad sexual» con «solo sí es sí»: también sale en «delitos contra la libertad sexual»).
 * Da igual escribirlos con tildes o mayúsculas: se normalizan. Los términos de varias palabras se buscan
 * tal cual, así que el plural va aparte si cambia otra palabra que no sea la última.
 */
export const SINONIMOS: string[][] = [
  ['migración', 'inmigración', 'migrante', 'inmigrante', 'migratorio', 'migratoria'],
  ['independentismo', 'independentista'],
  ['Cataluña', 'Catalunya'],
  ['SMI', 'salario mínimo'],
  ['ERTE', 'regulación temporal de empleo'],
  ['paro', 'desempleo'],
  ['EPA', 'Encuesta de Población Activa'],
  ['hucha de las pensiones', 'Fondo de Reserva'],
  ['ICO', 'Instituto de Crédito Oficial'],
  ['alquiler', 'arrendamiento'],
  ['financiación singular', 'cupo catalán'],
  ['CGPJ', 'Consejo General del Poder Judicial'],
  ['JEC', 'Junta Electoral Central'],
  ['ley mordaza', 'ley de seguridad ciudadana', 'protección de la seguridad ciudadana'],
  ['PP', 'Partido Popular'],
  ['UE', 'Unión Europea'],
  ['covid', 'coronavirus', 'pandemia'],
  ['CSN', 'Consejo de Seguridad Nuclear'],
  ['alta velocidad', 'AVE'],
  ['Rodalies', 'Cercanías'],
  ['Nutri-Score', 'Nutriscore'],
];
