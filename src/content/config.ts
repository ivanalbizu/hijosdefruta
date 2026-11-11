import { defineCollection, z } from 'astro:content';
import { TIPOS } from '../consts';

type Tipo = keyof typeof TIPOS;
const tipos = Object.keys(TIPOS) as [Tipo, ...Tipo[]];

/**
 * Fecha con la precisión que realmente se conoce:
 *   2019-11-04  → día
 *   "2015-03"   → mes
 *   2015        → año
 */
const fecha = z
	.union([
		z.date(),
		z.number().int().min(1900).max(2100),
		z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'Usa AAAA-MM-DD, AAAA-MM o AAAA'),
	])
	.transform(v => {
		if (v instanceof Date) return { valor: v, precision: 'dia' as const };
		const s = String(v);
		const [y, m = '01', d = '01'] = s.split('-');
		const precision = s.length === 4 ? ('anio' as const) : s.length === 7 ? ('mes' as const) : ('dia' as const);
		return { valor: new Date(`${y}-${m}-${d}T00:00:00Z`), precision };
	});

type Fecha = z.output<typeof fecha>;
const NIVEL = { dia: 3, mes: 2, anio: 1 } as const;

/** ¿`a` es posterior a `b`? Compara solo hasta la precisión que ambas conocen. */
function esPosterior(a: Fecha, b: Fecha) {
	const nivel = Math.min(NIVEL[a.precision], NIVEL[b.precision]);
	const clave = (d: Date) => d.toISOString().slice(0, { 1: 4, 2: 7, 3: 10 }[nivel]);
	return clave(a.valor) > clave(b.valor);
}

/** ¿Cada trozo de `fragmento` (separados por "[...]") aparece literalmente en `texto`? */
function esFragmentoDe(fragmento: string, texto: string) {
	const norma = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
	const completo = norma(texto);
	return fragmento
		.split('[...]')
		.map(norma)
		.filter(Boolean)
		.every(trozo => completo.includes(trozo.replace(/^[.,;:]+|[.,;:]+$/g, '').trim()));
}

/** Opcional que además acepta los "" y null que escribe Decap CMS en campos vacíos. */
const opcional = <T extends z.ZodTypeAny>(schema: T) =>
	z.preprocess(v => (v === '' || v === null ? undefined : v), schema.optional());

const fuente = z.object({
	/** Dónde se puede comprobar: Diario de Sesiones, La Moncloa, RTVE, agencia, prensa... */
	url: z.string().url(),
	medio: z.string().min(1),
	/** Copia en web.archive.org o archive.today, por si el original desaparece. */
	archivo: opcional(z.string().url()),
});

const video = z
	.object({
		id: z.string().regex(/^[\w-]{11}$/, 'ID de YouTube de 11 caracteres'),
		titulo: opcional(z.string()),
		/** Segundos en los que empieza y termina la cita dentro del vídeo. */
		start: opcional(z.number().int().nonnegative()),
		end: opcional(z.number().int().positive()),
	})
	.refine(v => v.start === undefined || v.end === undefined || v.end > v.start, {
		message: '`end` debe ser mayor que `start`',
	});

const hito = z
	.object({
		fecha,
		quien: z.string().min(1),
		/** Palabras literales, sin comillas. */
		cita: opcional(z.string()),
		/** Lo que ocurrió, cuando el hito no es una declaración. */
		hecho: opcional(z.string()),
		/**
		 * Fragmento corto para la imagen de redes. Solo puede contener trozos literales
		 * de `cita` (o de `hecho`), unidos con "[...]".
		 */
		destacado: opcional(z.string()),
		/** Dónde y en qué situación: "Debate electoral en RTVE", "Pleno del Senado"... */
		contexto: z.string().min(1),
		fuente,
		// Un vídeo sin ID (bloque vacío en el CMS) cuenta como ausente.
		video: z.preprocess(v => (v && typeof v === 'object' && !('id' in v && v.id) ? undefined : v), video.optional()),
	})
	.refine(h => h.cita || h.hecho, { message: 'Cada hito necesita `cita` o `hecho`' })
	.refine(h => !h.destacado || esFragmentoDe(h.destacado, h.cita ?? h.hecho ?? ''), {
		message: '`destacado` solo puede contener trozos literales de `cita` (o `hecho`) separados por "[...]"',
		path: ['destacado'],
	});

const mentira = defineCollection({
	type: 'content',
	schema: z
		.object({
			title: z.string(),
			description: z.string().min(20),
			tipo: z.enum(tipos),
			pubDate: z.coerce.date(),
			/** Última vez que se comprobaron fechas, citas y enlaces. */
			revisado: z.coerce.date(),
			featured: z.boolean().default(false),
			draft: z.boolean().default(false),
			tags: z.array(z.string()).min(1),
			/** Lo que dijo o hizo primero. */
			antes: hito,
			/** Lo que lo contradice. */
			despues: hito,
			/** Contexto adicional, en orden cronológico. */
			cronologia: z.array(hito).default([]),
		})
		.superRefine((data, ctx) => {
			if (esPosterior(data.antes.fecha, data.despues.fecha)) {
				ctx.addIssue({ code: 'custom', path: ['despues', 'fecha'], message: '`despues` no puede ser anterior a `antes`' });
			}
			data.cronologia.forEach((h, i) => {
				const prev = data.cronologia[i - 1];
				if (prev && esPosterior(prev.fecha, h.fecha)) {
					ctx.addIssue({ code: 'custom', path: ['cronologia', i, 'fecha'], message: 'La cronología debe ir en orden' });
				}
			});
		}),
});

/**
 * Archivo de promesas electorales: se guardan cuando se hacen, con su fuente,
 * para poder contrastarlas en el futuro (y convertirlas en un caso si se incumplen).
 */
const promesa = defineCollection({
	type: 'data',
	schema: z.object({
		fecha,
		quien: z.string().min(1),
		partido: z.string().min(1),
		/** Qué se prometió, tal como lo recoge la fuente. */
		compromiso: z.string().min(10),
		/** Palabras literales, si la fuente las recoge. */
		cita: opcional(z.string()),
		contexto: z.string().min(1),
		tema: z.string().min(1),
		/** Campaña o convocatoria a la que pertenece, p. ej. "Generales 29N 2026". */
		campana: z.string().min(1),
		fuente,
		video: z.preprocess(v => (v && typeof v === 'object' && !('id' in v && v.id) ? undefined : v), video.optional()),
		estado: z.enum(['pendiente', 'cumplida', 'incumplida', 'parcial']).default('pendiente'),
		/** Slug de la ficha de /mentira que la contrasta, si existe. */
		caso: opcional(z.string()),
	}),
});

export const collections = { mentira, promesa };
