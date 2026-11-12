---
name: candidatos
description: Criba e investiga posibles casos para hijosdefruta a partir de una URL o un tema. Úsala cuando el usuario pase una web, una hemeroteca o una noticia con posibles contradicciones de políticos, o pida evaluar candidatos. Registra cada candidato en investigacion/candidatos.md y solo crea casos (como borrador) cuando el usuario elige.
---

# Cribado e investigación de candidatos

Objetivo: convertir pistas (webs ajenas, noticias, hilos) en casos que cumplan las reglas editoriales
de [CLAUDE.md](../../../CLAUDE.md), **sin perder casos buenos por descartarlos demasiado pronto** y sin
publicar nada que no se pueda probar con fuente primaria.

El registro vive en [investigacion/candidatos.md](../../../investigacion/candidatos.md). Léelo antes de
empezar: puede que el candidato ya esté investigado o descartado.

## Principios

1. **La URL de origen es una pista, nunca una fuente.** No se cita, no se enlaza en el caso y no se
   copian sus textos ni su enfoque. Cada dato se vuelve a encontrar en la fuente primaria.
2. **No se descarta sin buscar.** Un candidato solo se descarta por falta de pruebas después de haber
   buscado la fuente primaria y haber dejado constancia de dónde se buscó. Las únicas excepciones son
   los descartes por regla (punto 4), y aun así se registran y se consultan con el usuario.
3. **Se busca también lo que debilita el caso**: la justificación del político, el contexto completo
   de la frase, si la condición de la promesa se cumplió, si los datos se miden igual antes y después.
4. **Reglas que bloquean** (se marcan `bloqueado` y decide el usuario): procesos judiciales abiertos,
   atribución de delitos, vida privada o familiar, datos personales de terceros.
5. **Fechas posteriores al conocimiento del modelo**: todo hecho reciente se verifica en la web; nunca
   se completa de memoria.

## Procedimiento

### 1. Extraer
Lee la URL (con el agente `web-fetch` si no hay WebFetch). Para cada entrada anota: tema, persona,
«dijo» (fecha, cita o paráfrasis), «hizo» (fecha, hecho), matiz y las fuentes que cita la pista.

Si la pista es un vídeo largo (debate, entrevista, mitin), trabaja con su transcripción en
`investigacion/material/transcripciones/` (carpeta fuera de git): busca compromisos con forma de
promesa («vamos a», «me comprometo», «nunca», «derogar»…), deduce quién habla por el contexto y anota
el minuto. La transcripción automática no tiene puntuación ni hablantes: **toda frase se confirma
viendo el vídeo** y el vídeo del caso empieza unos 4 segundos antes de la frase.

### 2. Cribar
Para cada candidato, en este orden:
- **¿Ya existe?** Busca en `src/content/casos/*.mdx` por persona, tema y cita. Si existe, valora si la
  pista aporta un hito nuevo a la cronología del caso existente.
- **¿Es una contradicción limpia?** Dos afirmaciones o una afirmación y un hecho que no pueden ser
  ciertas a la vez, sobre lo mismo y sin que cambien los hechos de fondo. Una frase condicional
  («en este momento no…») o una opinión no es una promesa.
- **¿Qué tipo sería?** `falsedad`, `promesa-incumplida`, `cambio-de-postura` o `doble-rasero`.
- **¿Toca una regla que bloquea?** (principio 4).

### 3. Investigar (concienzudamente)
Para el «antes» y el «después», busca en este orden y **anota cada búsqueda** en el registro:

| Tipo de prueba | Dónde buscar |
| --- | --- |
| Intervención parlamentaria | Diario de Sesiones del Congreso (congreso.es → Publicaciones → Diario de Sesiones; buscador de intervenciones) y del Senado (senado.es) |
| Discurso, rueda de prensa, entrevista del presidente o ministros | La Moncloa → Transcripciones (lamoncloa.gob.es/presidente/intervenciones), Prensa → Consejo de Ministros |
| Normas, decretos, nombramientos, contratos | BOE (boe.es), Plataforma de Contratación del Sector Público |
| Datos | INE, CSN, Red Eléctrica (REE), Banco de España, Portal de Transparencia, Consejo de Transparencia |
| Programa electoral, documentos de partido | Web del partido, archivo en web.archive.org |
| Entrevistas de televisión o radio | RTVE Play / RNE a la carta, canal oficial de YouTube del medio o del partido; buscar el minuto exacto |
| Si no hay primaria | Agencias (Europa Press, EFE), verificadores (Maldita, Newtral, EFE Verifica) y prensa, citando la que reproduce la frase literal |

Para cada fuente encontrada: URL, medio, cita literal exacta tal como aparece en ella, y una copia en
Web Archive (`https://web.archive.org/save/<url>` o la más reciente). Para vídeos: ID de YouTube y el
segundo en que empieza la cita (YouTube bloquea la descarga de subtítulos; si no se puede ver, deja
`start` pendiente y dilo).

### 4. Veredicto
Estados posibles en el registro:
- `por investigar`: aún sin búsqueda de fuentes primarias.
- `investigando`: búsqueda en curso, con lo encontrado hasta ahora.
- `prometedor`: antes y después con fuente verificable; listo para proponer.
- `débil`: hay pruebas pero la contradicción no es limpia o depende de una sola fuente secundaria.
- `bloqueado`: choca con una regla (principio 4); decide el usuario.
- `en espera`: bloqueado y el usuario ha decidido no publicarlo de momento. Se conserva toda la
  información (fuentes, citas y qué haría falta para reabrirlo); no se borra ni se descarta.
- `descartado`: con motivo y lista de búsquedas hechas.
- `publicado` / `ya existe`: con el slug del caso.

### 5. Crear el caso (solo con el visto bueno del usuario)
- Archivo `src/content/casos/<slug>.mdx` con `draft: true`, siguiendo el formato del README.
- `quien` con el cargo que tenía en ese momento; `contexto` con dónde y cuándo.
- `cronologia` con la justificación del político si la hay.
- `npm run build` (valida el esquema y el orden de fechas) y `npm run fuentes -- --rapido`.
- Si la prueba es un PDF de un organismo oficial (Diario de Sesiones, BOE, La Moncloa, CSN…) o un
  documento público de un partido (programa electoral, ponencia, código ético), añade al hito
  `documento: { url, buscar?, incluir? }` y ejecuta `npm run capturas -- <slug>`. Revisa el recorte
  generado (que se lea y que el resalte caiga donde debe). Nunca recortes de prensa.
- Si aparece una persona o partido nuevo en `tags`, crea su `src/content/perfil/<slug>.yaml` y ejecuta
  `npm run perfiles -- <slug>`.
- Actualiza el estado en el registro con el slug. No se pasa a `draft: false` sin que el usuario lo
  revise en `npm run dev`.

## Formato del registro

Cada candidato es una sección `### <id> · <tema>` con estos campos (deja vacío lo que no aplique):

```markdown
### arch-03 · Las nucleares del apagón
- **Estado:** investigando
- **Origen:** archivopsoe.com/hemeroteca, entrada 3 (12-11-2026)
- **Persona / tipo propuesto:** Pedro Sánchez / falsedad
- **Antes:** 29-04-2025 · lo que dijo · fuente primaria (URL) o "pendiente"
- **Después:** 01-05-2025 · el hecho · fuente primaria (URL) o "pendiente"
- **Justificación del político:** …
- **Búsquedas:** dónde se buscó y qué se encontró (también lo que no se encontró)
- **Notas / veredicto:** …
```

Al terminar una tanda, actualiza la tabla de resumen de la cabecera del registro e informa al usuario
con: prometedores (listos para proponer), débiles, bloqueados (necesitan su decisión) y qué queda.
