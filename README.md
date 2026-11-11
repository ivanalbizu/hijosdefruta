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
