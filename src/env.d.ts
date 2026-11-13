/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/** Atributos declarativos de WebMCP (propuesta en evolución; los navegadores sin soporte los ignoran). */
declare namespace astroHTML.JSX {
	interface FormHTMLAttributes {
		toolname?: string;
		tooldescription?: string;
	}
	interface InputHTMLAttributes {
		toolparamdescription?: string;
	}
	interface SelectHTMLAttributes {
		toolparamdescription?: string;
	}
}
