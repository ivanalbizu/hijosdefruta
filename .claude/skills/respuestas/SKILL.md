---
name: respuestas
description: Lee en X (con Claude in Chrome y la sesión del usuario) los tuits de las últimas horas del PSOE y de las personas con perfil (cuentas en investigacion/respuestas/config.yaml), los cruza con los casos publicados y propone respuestas serias con el enlace al caso. Úsala cuando el usuario diga «mira X», «busca respuestas», «/respuestas» o similar. Nunca publica nada.
---

# Respuestas en X

Lo publica el usuario a mano. **Nunca escribas, respondas ni des «me gusta» en X**: las respuestas
automáticas van contra las normas de X y la cuenta se juega la suspensión. Solo se lee.

## Pasos

1. **Ventana:** por defecto, 8 horas (el usuario puede pedir otra; usa la que diga). Genera las URL de
   búsqueda (X no acepta consultas largas, así que las cuentas se reparten en varias, una por línea): `npm run respuestas -- url` (8 h; `--horas N` para otra ventana, `--cuenta
   Pilar_Alegria,PSOE` para solo esas cuentas). Las pasadas se solapan, pero el cruce se salta los
   tuits que ya están en la bandeja de hoy o de ayer (cada pasada guarda los leídos en un comentario
   `<!-- leídos: … -->`; no lo borres). Con `--repetir`, los cruza todos.
2. **Lectura:** abre la primera URL en una pestaña nueva (las siguientes, en la misma pestaña, repitiendo este paso) con Claude in Chrome (sesión del usuario; si pide
   iniciar sesión, para y avisa). Ejecuta con `javascript_tool`, en una sola llamada, la línea que
   imprime `npm run respuestas -- vistos` (los ids ya revisados) seguida del contenido de
   [extraer.js](extraer.js): deja los tuits nuevos en `window.__tsv` (una línea por tuit, sin URL) y
   devuelve el recuento y la longitud. La herramienta corta cada resultado hacia los 900 caracteres y
   bloquea los que llevan la URL de la página (no devuelvas nunca `location.href`), así que léelo por
   trozos con `window.__tsv.slice(0, 850)`, `slice(850, 1700)`…, todos en paralelo en la misma
   respuesta. Únelos tal cual (un trozo puede cortar una línea; los tabuladores van entre campos) y
   guárdalos en `investigacion/material/respuestas/tuits-AAAA-MM-DD-HHMM.tsv` (las líneas de todas las
   búsquedas, en un solo archivo). No leas la página con
   capturas ni con get_page_text: gasta mucho más. Si en la ventana solo hay reposts, la pasada queda
   en 0 tuits: no amplíes la ventana salvo que el usuario lo pida.
3. **Cruce:** `npm run respuestas -- cruzar <ese tsv>` (también acepta el JSON de `window.__tuits`). Deja la pasada en
   `investigacion/respuestas/AAAA-MM-DD.md`.
4. **Criba:** lee solo la pasada nueva. Todo tuit que comparta tema con un caso lleva borrador (lo
   decidió el usuario el 24-11-2026: él elige cuáles publica). Para cada uno, elige el caso que más se
   acerque a lo que dice el tuit (no tiene por qué ser el primero de la lista; vale uno del mismo tema que
   no salga en ella) y clasifícalo:
   - **Directo:** el caso trata de lo mismo que el tuit o es del mismo autor.
   - **Tangencial:** solo comparten tema, o el caso es de otra persona. Fíjate en quién habla (no es lo
     mismo María Jesús Montero que Irene Montero).
   Sin borrador, aunque comparta tema, si responder parecería aprovechar una desgracia: necrológicas,
   ataques o pintadas contra el partido, víctimas de un accidente. Dilo en la bandeja. Abre el caso
   (`src/content/casos/<slug>.mdx`, solo el frontmatter) para cada borrador.
5. **Borradores**, debajo del tuit en la bandeja (con una línea que diga si es directo o tangencial y
   por qué) y también en la respuesta al usuario, primero los directos y luego los tangenciales, cada uno
   con el enlace al tuit:
   - Une el tuit y el caso: la primera frase recoge lo que dice el tuit (su propuesta, cifra o
     crítica; mejor con sus palabras entre «» o en pocas palabras, sin valorarlo) y lo que sigue cuenta
     lo que prueba el caso enlazado. Quien lea la respuesta debe entender la relación sin abrir el
     enlace ni el tuit original. Si el caso es de otra persona, nómbrala.
   - Contraste y seriedad: qué dijo o hizo antes y después, con fechas, y el enlace. Sin adjetivos,
     insultos, ironía ni «mentira». El caso habla solo.
   - Citas literales tal como están en el caso, entre «». No añadas nada que el caso no pruebe.
   - Máximo 280 caracteres; el enlace cuenta como 23 y algunos signos (€, espacio fino U+202F) cuentan
     doble.
   - Una o dos variantes por tuit, como mucho. Si un caso ya se usó ese día en otra respuesta, cambia
     la redacción.
   - Ejemplos: `«Revalorizar y blindar las pensiones», dice el PSOE de Aragón. El 20-05-2010, el Gobierno
     de Zapatero aprobó un real decreto-ley que «suspende la revalorización de las pensiones públicas para
     el año 2011», salvo las mínimas y las no contributivas. Fuentes: https://hijoputismo.com/casos/…/`
     · `El PSPV propone limitar los aforamientos en el Estatut. El 17-09-2018, Sánchez propuso en el
     Congreso «suprimir los aforamientos, con una reforma constitucional». El proyecto, que ya solo los
     limitaba, caducó en 2019 y no se ha vuelto a presentar. Fuentes: https://hijoputismo.com/casos/…/`
6. Al final de la pasada: `Revisada el DD-MM: N borradores (D directos, T tangenciales); sin
   respuesta: …` (los que se dejaron sin borrador por delicados, si los hay).
7. Muchas respuestas seguidas con el mismo dominio parecen spam para X: si salen más de diez, recuerda
   al usuario que las publique espaciadas y empezando por las directas.

Un caso solo sale como candidato si comparte **tema** con el tuit (`temas` en
`investigacion/respuestas/config.yaml`); las palabras en común solo ordenan. Si se pierde un caso claro,
falta una palabra clave en su tema; si un tema mete ruido, sobra una genérica. `npm run respuestas -- temas`
lista los casos por tema y los que no tienen ninguno: tras publicar un caso, comprueba que tiene tema. Las
palabras vacías (`VACIAS`, en `scripts/respuestas.mjs`) solo afectan al orden. Di al usuario lo que cambies.
