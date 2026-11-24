---
name: publicar-caso
description: Crea o modifica un caso de hijosdefruta (src/content/casos/*.mdx) a partir de un candidato que el usuario ha aprobado, o añade un hito a un caso existente, y lo lleva de borrador a publicado - frontmatter, etiquetas y perfiles, recortes de documentos, vídeo, tabla de datos, comprobaciones, registro de candidatos y commit. Úsala cuando el usuario diga «créalo», «pásalo a borrador», «publícalo», «añade el hito» o similar.
---

# Crear y publicar un caso

Solo con el visto bueno del usuario a un candidato investigado con /candidatos. Formato de los campos:
[README](../../../README.md) («Añadir un caso», «Recortes», «Perfiles»); esquema:
[src/content/config.ts](../../../src/content/config.ts). Reglas editoriales y de cifras:
[CLAUDE.md](../../../CLAUDE.md).

## 1. Borrador

`src/content/casos/<slug>.mdx` con `draft: true`. El slug resume la frase y la persona
(`diaz-smi-75-por-ciento-desde-que-llego-al-gobierno`). Toma como modelo un caso reciente del mismo tipo.

- **`title`:** persona, la frase entre «» y, si cabe, el dato que la contradice. **`description`:** el
  antes y el después en dos o tres frases, sin adjetivos.
- **`tags`:** la persona y el partido al que pertenecía **en la fecha de los hechos** (Díaz en 2021 →
  Unidas Podemos, no Sumar). Si encaja con varias siglas o coaliciones, pregúntalo.
- **`temas`:** uno o dos de `TEMAS` (`src/consts.ts`), el principal primero, según la `descripcion` de
  cada tema y mirando cómo están clasificados casos parecidos. Si ninguno encaja de verdad, se omite (el
  caso sigue saliendo en la búsqueda por texto); no fuerces uno ni crees un tema nuevo sin preguntar.
- **`quien`:** nombre y cargo de entonces, «Yolanda Díaz (vicepresidenta segunda del Gobierno y ministra de
  Trabajo y Economía Social)». **`contexto`:** dónde, cuándo y lo necesario para entender la frase (la
  pregunta a la que responde, si la repite).
- **`cita`:** literal de la fuente, con sus cifras tal como aparecen. **`hecho`:** texto propio, con las
  cifras según la norma de la RAE (CLAUDE.md, «Cifras»). **`destacado`:** solo trozos literales unidos con
  `[...]`; si no, el build falla.
- **`fuente`:** `url`, `medio` y `archivo` (Web Archive; /fuentes-primarias). **`video`:** `id`, `titulo`,
  `start` y `end` (/transcribir). Vídeos que no están en YouTube: se enlaza la página con el minuto en
  `fuente`, sin `video`.
- **`cronologia`:** en orden, con la justificación del político si la hay y los datos intermedios.
- **Cuerpo (opcional):** `**Matiz:**` con lo que debilita el caso o lo explica; tabla de cifras con
  `.tabla-datos` (`caption`, `scope`, fila `.destacada` y `.nota` con las fuentes); enlaces externos con
  `<ExtLink href>`. Si hay un caso relacionado, «Caso relacionado: [título](/casos/<slug>/).» y el enlace de
  vuelta en el otro caso.

Para **añadir un hito** a un caso existente: mismas reglas, en su sitio de la cronología, y actualiza
`revisado`.

## 2. Perfiles, recortes y vídeo

- **Persona o partido nuevo en `tags`:** `src/content/perfil/<slug>.yaml` (`nombre` igual que el tag,
  `tipo`, `wikidata`; `partido` solo si la afiliación es clara y estable) y `npm run perfiles -- <slug>`.
  Comprueba que la imagen y el crédito de Commons tienen sentido.
- **Recorte:** si la prueba es un PDF oficial o un documento público de un partido, añade
  `documento: { url, buscar?, incluir? }` al hito y ejecuta `npm run capturas -- <slug>`. **Mira el PNG
  generado** (que se lea y que el resalte caiga en la cita) una sola vez; si lo regeneras, mira solo el
  nuevo. La imagen OG de `dist/` no hace falta mirarla. Si la web bloquea, la copia local en
  `investigacion/material/<caso>/` con el mismo nombre de archivo. Nunca recortes de prensa.
- **Citas de vídeo o audio:** confirmadas por el usuario con el bloque de /transcribir.

## 3. Comprobaciones

- `npm run build`: ejecuta `astro check` y `astro build`; **solo el build valida el esquema** (fuentes,
  fechas, orden de la cronología, `destacado`). Debe terminar sin errores.
- `npm run fuentes -- --rapido`: los 403 de podemos.info o interior.gob.es son avisos falsos conocidos.
- Relee el caso entero frente a [criterios](../candidatos/criterios.md): ¿se entiende sin la pista? ¿está
  la justificación? ¿hay alguna palabra que valore en lugar de describir?

## 4. Registro y revisión del usuario

- En `investigacion/candidatos/<origen>.md`: estado y slug (`borrador` mientras tanto, `publicado` al
  final), y su fila del resumen en `investigacion/candidatos.md`. Localiza la línea con
  `grep -n '^### <id> '`, sin leer el registro entero. Al publicar, `archivar.py` (/candidatos) lo pasa a
  `cerrados/`.
- Pide al usuario que lo revise en `npm run dev` (`/casos/<slug>/`) con la lista de lo pendiente de
  confirmar. **Solo pasa a `draft: false` cuando lo diga el usuario.**

## 5. Al publicar

- Borra el material del caso en `investigacion/material/` (audios, transcripciones, PDF descargados); se
  conservan los programas del PSOE y el debate de 2014.
- Fuentes sin copia en Web Archive: guárdalas o anótalas en `investigacion/pendientes-web-archive.md`.
- **Commit solo si el usuario lo pide**, con las rutas de este trabajo (`git add <rutas>`, no `-A`) y
  mensajes como los del historial: «Publicado: Iglesias, los escraches como «jarabe democrático» (2013) y
  su querella contra un manifestante ante su casa (2020) (sup-19)». **Nunca push sin su permiso.**
