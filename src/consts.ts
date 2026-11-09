export const SITE_TITLE = 'hijosdefruta';
export const SITE_DESCRIPTION = 'Recopilación de Mentiras de nuestros políticos, para algunos denominado: Cambios de opinión';

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
