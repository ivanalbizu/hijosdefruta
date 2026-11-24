export const SITE_TITLE = 'hijoputismo';
export const SITE_DESCRIPTION =
	'Lo que dijeron los políticos españoles frente a lo que dijeron o hicieron después, con la cita literal, la fecha y la fuente de cada declaración.';

/**
 * Tipos de contradicción. Llamar "mentira" a todo resta credibilidad:
 * cada caso se clasifica según lo que las pruebas permiten afirmar.
 * Las descripciones se muestran en /metodologia.
 */
export const TIPOS = {
	'falsedad': {
		nombre: 'Falsedad',
		descripcion: 'Afirmó algo que los hechos documentados desmienten.',
	},
	'promesa-incumplida': {
		nombre: 'Promesa incumplida',
		descripcion: 'Se comprometió públicamente a hacer (o no hacer) algo y después hizo lo contrario.',
	},
	'cambio-de-postura': {
		nombre: 'Cambio de postura',
		descripcion: 'Defendió una posición y después la contraria, sin que cambiaran los hechos de fondo.',
	},
	'doble-rasero': {
		nombre: 'Doble rasero',
		descripcion: 'Exigió o criticó en otros lo que después no se aplicó a sí mismo.',
	},
} as const;

/**
 * Temas de los casos, para filtrar en /buscar/ (`?tema=`). Cada caso lleva uno o dos (el principal
 * primero) o ninguno si no encaja en ninguno. Nombres neutros: describen el asunto, no lo califican
 * (no hay «Corrupción»). La descripción es el criterio para clasificar.
 */
export const TEMAS = {
	'cargos-publicos': {
		nombre: 'Cargos públicos',
		descripcion: 'Conducta, sueldos, dimisiones, incompatibilidades y trayectoria de quienes ocupan cargos.',
	},
	'cataluna': {
		nombre: 'Cataluña y el procés',
		descripcion: 'Procés, amnistía, sedición, indultos, Puigdemont y acuerdos con los partidos catalanes.',
	},
	'economia': {
		nombre: 'Economía y presupuestos',
		descripcion: 'Presupuestos, financiación autonómica, banca pública y gasto de los ministerios.',
	},
	'educacion': {
		nombre: 'Educación y cultura',
		descripcion: 'Leyes educativas, universidad, investigación y cultura.',
	},
	'empleo': {
		nombre: 'Empleo y salarios',
		descripcion: 'Paro, contratos, salario mínimo, jornada, reforma laboral y ERTE.',
	},
	'igualdad': {
		nombre: 'Igualdad',
		descripcion: 'Violencia de género, trata, prostitución y libertad sexual.',
	},
	'justicia': {
		nombre: 'Justicia e instituciones',
		descripcion: 'Reformas judiciales, aforamientos, indultos, decretos-ley, RTVE, secretos oficiales y órganos de control.',
	},
	'migracion': {
		nombre: 'Migración y fronteras',
		descripcion: 'Llegadas irregulares, retornos, devoluciones en caliente y menores migrantes.',
	},
	'pactos': {
		nombre: 'Pactos y elecciones',
		descripcion: 'Pactos e investiduras, convocatoria de elecciones, candidaturas y Junta Electoral.',
	},
	'pensiones': {
		nombre: 'Pensiones',
		descripcion: 'Revalorización, Fondo de Reserva y sistema de pensiones.',
	},
	'exterior': {
		nombre: 'Política exterior',
		descripcion: 'Relaciones con otros países, exportación de armas y Sáhara.',
	},
	'sanidad': {
		nombre: 'Sanidad y consumo',
		descripcion: 'Pandemia, vacunas, estado de alarma y etiquetado de alimentos.',
	},
	'seguridad': {
		nombre: 'Seguridad y protestas',
		descripcion: 'Criminalidad, Guardia Civil, ley de seguridad ciudadana, manifestaciones y escraches.',
	},
	'transporte': {
		nombre: 'Transporte y energía',
		descripcion: 'Ferrocarril, alta velocidad, Rodalies, accidentes, energía y apagón.',
	},
	'vivienda': {
		nombre: 'Vivienda',
		descripcion: 'Alquiler, compra y expropiación de viviendas y ley de vivienda.',
	},
} as const;

/** Estados de una promesa del archivo (/promesas). */
export const ESTADOS = {
	pendiente: 'Pendiente',
	cumplida: 'Cumplida',
	incumplida: 'Incumplida',
	parcial: 'Cumplida en parte',
} as const;
