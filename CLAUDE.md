# hijosdefruta

Hemeroteca de contradicciones de políticos españoles: cada caso enfrenta lo que alguien dijo o hizo
**antes** con lo que dijo o hizo **después**, con la cita literal, la fecha y la fuente de cada parte.
Sitio estático en Astro 4, desplegado en Netlify (<https://hijosdefruta.netlify.app>) desde `main`.

Comandos, formato de los casos y scripts: [README.md](README.md). Criterios públicos:
[/metodologia](src/pages/metodologia.astro).

## Reglas editoriales (lo más importante del proyecto)

Un solo error o una cita sacada de contexto desacredita toda la web.

- Toda cita literal sale de la **fuente primaria** (Diario de Sesiones, transcripciones de La
  Moncloa, BOE, vídeo institucional), nunca de un titular. Si no se puede verificar, se descarta o se
  deja en `draft: true`.
- Cada caso tiene un `tipo` (falsedad, promesa incumplida, cambio de postura, doble rasero): no todo
  es "mentira". En la interfaz se habla de **casos**.
- No se atribuyen delitos ni se publican procesos judiciales abiertos; las resoluciones se citan tal
  cual.
- Se incluye la justificación del político cuando la hay.
- Datos de perfiles (cargo, partido): solo lo que sea claro y estable. Ante la duda, se deja vacío.
- Las imágenes de personas y partidos vienen de Wikimedia Commons, siempre con autor y licencia.

## Estructura

```
src/content/
  mentira/*.mdx     casos (antes, despues, cronologia; esquema en config.ts)
  promesa/*.yaml    archivo de promesas electorales (/promesas)
  perfil/*.yaml     ficha de cada tag: persona o partido, imagen y crédito
  config.ts         esquemas Zod: el build falla si falta una fuente o una fecha no cuadra
src/assets/perfiles/  fotos y logos descargados por `npm run perfiles`
src/utils/
  mentiras.ts       consultas y formato: getMentiras, getTags, getHitos, resumenHito…
  perfiles.ts       getPerfiles (Map por slug), getPerfil(quien), nombreSinCargo
  og.ts             imagen 1200×630 para redes (satori + sharp)
src/layouts/        Base (html, skip link, header, footer) → Default (página con cabecera) y MentiraPost
src/components/     ver "Componentes"
scripts/            fuentes.mjs (comprueba enlaces), perfiles.mjs (descarga imágenes)
public/admin/       Decap CMS (aún no edita perfiles)
```

- Las URLs de los casos son `/mentira/<slug>/` y las de tags `/tags/<slug>/`, con el slug de
  `slugifyStr` (`Pedro Sánchez` → `pedro-sanchez`). El archivo del perfil se llama igual que el slug.
- Un `quien` como "Pedro Sánchez (presidente del Gobierno)" se separa en nombre y cargo con
  `nombreSinCargo`; el nombre sirve para buscar su perfil.
- `getMentiras()` ordena por la fecha de `despues` (más reciente primero) e incluye borradores solo
  en `astro dev`.

## Sistema de diseño

Todo en [src/styles/global.scss](src/styles/global.scss), con capas
`reset, tokens, theme, base, layout, components, util`. Catálogo visual en `/sistema-diseno`.

- **Los componentes solo usan tokens semánticos** (`--color-text`, `--color-surface`,
  `--color-antes`, `--color-despues`, `--tipo-<tipo>-fg/bg`, `--estado-<estado>-fg/bg`), nunca hex
  sueltos ni la paleta primitiva. El modo oscuro redefine los semánticos en `@mixin tema-oscuro`.
- Escalas: `--text-xs…4xl`, `--space-1…20` (múltiplos de 4 px), `--radius-sm/md/lg/full`,
  `--shadow-sm/md`, `--container`, `--measure`, `--target-min` (44 px).
- Azul = antes, rojo = después. Siempre acompañados del texto "Antes"/"Después": el color nunca es la
  única pista.
- Tipografías: Inter (interfaz) y Source Serif 4 cursiva solo para citas (clase `.cita`).
- Clases compartidas: `.container`, `.page`, `.section`, `.section-header`, `.grid-cards`, `.surface`,
  `.prose`, `.eyebrow`, `.lead`, `.meta`, `.btn .btn--primary/--secondary`, `.link-arrow`, `.sr-only`.
- Las imágenes OG (`og.ts`) usan su propia paleta en hex, alineada con los tokens del tema oscuro.

### Componentes

| Componente | Uso |
| --- | --- |
| `MentiraCard` | Tarjeta de caso con antes/después; `nivel` del título y `destacada` para portada. Enlace extendido desde el título. |
| `Hito` | Una declaración o hecho: fecha, avatar, cita, vídeo, contexto y fuente. |
| `Avatar` | Foto circular (persona), logo apaisado sobre blanco (partido) o iniciales. Decorativo por defecto (`alt=""`). |
| `Tags` | Chips con mini-avatar que enlazan a `/tags/<slug>/`. |
| `PerfilCard` | Persona o partido en los índices. |
| `TipoBadge`, `EstadoBadge` | Insignias de tipo de caso y de estado de promesa. |
| `ExtLink` | Enlace externo: nueva pestaña, icono y aviso para lectores de pantalla. Úsalo para toda URL externa. |
| `Cronologia`, `Fuentes`, `Fecha`, `Media`, `Logo` | Línea de tiempo, lista de fuentes, fechas con precisión variable, YouTube, marca. |

## Accesibilidad (requisitos, no extras)

- Contraste AA en claro y oscuro para todo texto; bordes de controles ≥ 3:1
  (`--color-border-control`). Al añadir un color, comprobar el contraste en los dos temas.
- Un solo `h1` por página y sin saltos de nivel; las tarjetas reciben el nivel por prop.
- Foco visible global (`:focus-visible`); no quitar `outline` sin alternativa.
- Navegación con `aria-current`, migas con `aria-label`, listas con `aria-label` cuando no hay título.
- Imágenes junto a un nombre: `alt=""`. Imagen principal de una ficha: texto alternativo y crédito.
- Respetar `prefers-reduced-motion`.

## Convenciones

- Código, comentarios, nombres y textos en español.
- Fechas en formato largo español con `formatFecha` (en UTC) y precisión de día, mes o año.
- npm es el único gestor (`package-lock.json`). Versiones exactas para fuentes, satori y sharp.
- `npm run build` ejecuta `astro check`: debe terminar con 0 errores antes de commitear.

## Mejoras previstas

1. **Renombrar la colección `mentira` a `casos`** (`src/content/casos`). Afecta a `config.ts`,
   `getCollection("mentira")`, los tipos `CollectionEntry<"mentira">`, `public/admin/config.yml`
   (`folder` y `preview_path`), `scripts/fuentes.mjs`, la RSS y el README. Decidir si la URL pasa a
   `/casos/` y, en ese caso, añadir redirecciones 301 desde `/mentira/*` (`public/_redirects` en
   Netlify) para no romper enlaces compartidos.
2. **Paginación** del listado de casos y de las páginas de tag (`paginate()` de Astro).
3. **Filtros y búsqueda**: por tipo, persona/partido y año, y búsqueda de texto en títulos y citas.
   Al ser un sitio estático, opciones: índice JSON generado en build + filtrado en cliente, o
   Pagefind. Debe funcionar con teclado y anunciar el número de resultados (`aria-live`).
