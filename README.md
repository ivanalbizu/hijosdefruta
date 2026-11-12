# hijosdefruta

Recopilación de mentiras y cambios de opinión de políticos, con fuentes enlazadas.
Sitio estático hecho con [Astro](https://astro.build), publicado en <https://hijosdefruta.netlify.app>.

## Comandos

El proyecto usa **npm**: el único lockfile es `package-lock.json`.

| Comando           | Acción                                                  |
| :---------------- | :------------------------------------------------------ |
| `npm install`     | Instala dependencias                                    |
| `npm run dev`     | Servidor local en `localhost:4321` (muestra borradores) |
| `npm run build`   | Valida el contenido y genera el sitio en `./dist/`      |
| `npm run preview` | Sirve el build localmente                               |
| `npm run fuentes` | Comprueba que fuentes, copias archivadas y vídeos siguen vivos |
| `npm run perfiles` | Descarga de Wikimedia Commons la foto o el logo de los perfiles que no la tienen |

## Añadir un caso

Cada caso es un archivo en `src/content/mentira/*.mdx`. Las pruebas van en el frontmatter y el
esquema de [`src/content/config.ts`](src/content/config.ts) las valida: **si falta una fuente, una
fecha está mal o la cronología está desordenada, el build falla**.

```yaml
title: 'Titular'
description: 'Resumen del antes y el después'
tipo: promesa-incumplida # falsedad | promesa-incumplida | cambio-de-postura | doble-rasero
pubDate: 2026-11-09
revisado: 2026-11-09 # última comprobación de citas y enlaces
draft: true # no se publica hasta ponerlo a false
tags: [PSOE, Pedro Sánchez]
antes: # lo que dijo o hizo primero
  fecha: 2019-11-04 # o 2019-11 / 2019 si no se conoce el día
  quien: Pedro Sánchez (candidato del PSOE)
  cita: 'Palabras literales' # o `hecho:` si no es una declaración
  destacado: 'Palabras [...] literales' # opcional: lo que sale en la imagen para redes
  contexto: 'Debate electoral en RTVE'
  fuente:
    url: https://…
    medio: Diario de Sesiones del Congreso
    archivo: https://web.archive.org/… # copia por si el original desaparece
  video: # opcional
    id: XXXXXXXXXXX
    start: 57 # segundo en que empieza la cita
despues: # lo que lo contradice (mismos campos)
cronologia: [] # hitos intermedios (mismos campos), en orden
```

El cuerpo del `.mdx` es opcional y sirve para matices o contexto.

## Archivo de promesas

`src/content/promesa/*.yaml` guarda promesas electorales en el momento en que se hacen, con su
fuente, y se publican en `/promesas`. Campos: `fecha`, `quien`, `partido`, `compromiso` (lo prometido,
tal como lo recoge la fuente), `cita` opcional (literal), `contexto`, `tema`, `campana`, `fuente`,
`video` opcional, `estado` (`pendiente`, `cumplida`, `incumplida`, `parcial`) y `caso` (el slug de la
ficha que la contrasta, cuando la haya).

## Perfiles de políticos y partidos

Cada tag puede tener una ficha en `src/content/perfil/<slug-del-tag>.yaml` (`Pedro Sánchez` →
`pedro-sanchez.yaml`) con su foto o logo, que se muestra en `/tags/<slug>/`, en los tags de las
tarjetas y junto a cada cita. Sin ficha se muestran las iniciales.

```yaml
nombre: Pedro Sánchez # igual que el tag
tipo: persona # persona | partido
partido: psoe # opcional: slug del partido, solo si la afiliación es clara y estable
wikidata: Q6070218 # elemento de Wikidata del que sale la imagen
# nombreCompleto y color (#rrggbb, decorativo) para partidos
```

`npm run perfiles` busca la imagen en Wikidata (P18 para personas, P154 para partidos), la guarda en
`src/assets/perfiles/` y añade al YAML el bloque `imagen` con el archivo de Commons, el autor y la
licencia, que se muestran en la ficha y en `/creditos`. Para usar otra imagen, cambia
`imagen.commons` por el nombre del archivo en Commons y ejecuta `npm run perfiles -- <slug>`.

## Sistema de diseño

Los tokens (color, tipografía, espaciado, radios, sombras) están en
[`src/styles/global.scss`](src/styles/global.scss). Los componentes solo usan los tokens semánticos
(`--color-text`, `--color-antes`…), así que el modo oscuro y los cambios de marca se hacen allí. El
catálogo visual está en `/sistema-diseno` (no se indexa ni sale en el sitemap).

## Imagen para redes

Al compilar se genera `/og/<slug>.png` (1200×630) para cada caso, con el antes y el después
enfrentados ([`src/utils/og.ts`](src/utils/og.ts)). Muestra el campo `destacado` o, si no existe, la
cita recortada. `destacado` solo admite trozos literales de la cita o del hecho unidos con `[...]`:
si contiene algo que no está en el original, el build falla.

## Comprobar las fuentes

`npm run fuentes` revisa todas las URLs de las fuentes, sus copias en Web Archive y los vídeos de
YouTube, y termina con error si alguna prueba ha desaparecido (404, dominio caído, vídeo eliminado).
Los fallos que pueden ser puntuales (timeouts, bloqueos anti-bots) se marcan como aviso. Web Archive
limita las peticiones, así que la comprobación completa tarda unos minutos;
`npm run fuentes -- --rapido` se salta las copias archivadas.

Criterios de clasificación y de fuentes: página [/metodologia](src/pages/metodologia.astro).

## CMS

`/admin` carga Decap CMS ([`public/admin/config.yml`](public/admin/config.yml)) con formularios para
los mismos campos. Los casos nuevos se crean como borrador.
