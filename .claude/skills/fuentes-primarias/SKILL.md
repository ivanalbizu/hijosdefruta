---
name: fuentes-primarias
description: Localiza, descarga, lee y archiva fuentes primarias para hijosdefruta (Diarios de Sesiones del Congreso y del Senado, votaciones, La Moncloa, BOE, INE y otros datos oficiales, resoluciones judiciales de CENDOJ, el Supremo, InfoCuria o EUR-Lex, documentos de partidos y copias de Web Archive). Úsala al buscar la fuente de una cita o un dato, al descargar o leer un PDF oficial, al guardar o comprobar copias en Web Archive, cuando una web bloquee la descarga, al sustituir una fuente de prensa por la oficial o cuando npm run fuentes avise de un cambio.
---

# Fuentes primarias

Reglas de fondo en [CLAUDE.md](../../../CLAUDE.md): cita literal de la fuente primaria, nunca de un
titular; recortes solo de documentos oficiales o públicos de los partidos.

## Orden de preferencia

1. Diario de Sesiones (Congreso o Senado). Si la misma frase está en el DS y en La Moncloa, se cita el DS.
2. Transcripción o vídeo institucional (La Moncloa, canal oficial del Congreso, del partido o del medio).
3. BOE, BOCG, resoluciones judiciales y datos de organismos públicos.
4. Documentos públicos de los partidos (programas, ponencias, códigos éticos, acuerdos).
5. Solo si no hay primaria: agencias (Europa Press, EFE) o la prensa que reproduce la frase literal. Se
   deja constancia de que no se encontró la primaria. Los verificadores son pistas, no fuentes.

**Gastar poco:** lo leído se queda en el contexto toda la sesión. Un PDF se pasa a texto y se busca con
`grep` (no se vuelca entero); una web se lee con curl o con el agente `web-fetch` y una pregunta concreta;
Chrome, solo si la web lo exige, con `get_page_text` o `find` antes que capturas de pantalla.

## Dónde y cómo, por organismo

| Fuente | Dónde | Cómo descargar y notas |
| --- | --- | --- |
| Congreso, Diario de Sesiones | congreso.es → Publicaciones → Diario de Sesiones; buscador de intervenciones. Pleno `DSCD-<leg>-PL-<n>`, comisiones `-CO-`; la Diputación Permanente va en la serie PL | congreso.es da 403 a curl y rechaza descargas en bloque: no cambies el agente. Usa la copia de Web Archive con `id_` (abajo) o pide al usuario que lo descargue. Las versiones corregidas llevan sufijo `-C1`: cita la vigente |
| Congreso, votaciones | Open data: `congreso.es/es/opendata/votaciones?…&targetLegislatura=XIV&targetDate=dd/mm/aaaa`; legislaturas antiguas: `congreso.es/votoplenoh/L<n>/AAAAMMDDNNN.pdf` | Los votos se recogen tal como constan, sin suponer errores |
| Congreso, respuestas del Gobierno y BOCG | Iniciativa en congreso.es (p. ej. `congreso.es/l15p/e5/e_0057825_n_000.pdf`) | Igual que el DS |
| Congreso, declaraciones de bienes | Ficha del diputado (`/docbienes/legNN/…pdf`); el código del diputado cambia por legislatura (buscador `searchDiputados`) | Escaneadas: recorte con `documento.escaneado` (README) |
| Senado | senado.es, Diario de Sesiones (`DS_C_15_nnn.PDF`) | Descarga automática sin problemas |
| La Moncloa | lamoncloa.gob.es/presidente/intervenciones (transcripciones), Consejo de Ministros (referencias y ruedas de prensa) | Las transcripciones tienen PDF para el recorte. Si no hay DS de lo mismo, es la fuente preferente para el presidente y los ministros |
| BOE | boe.es/buscar/doc.php?id=BOE-A-AAAA-NNNNN | Enlaza la ficha del BOE; el PDF, para el recorte |
| Datos | INE (tablas por número, p. ej. EPA 65109), Interior (balances e informes quincenales), Ministerio de Vivienda (apps.fomento.gob.es/BoletinOnline2), DataComex, Banco de España, REE, CSN, Portal de Transparencia | interior.gob.es está tras Cloudflare: usa copias de Web Archive (CDX) y comprueba que no sean la página de Cloudflare. Los Excel se leen con `xlrd`/`openpyxl` en un venv del scratchpad |
| Tribunal Supremo y CGPJ | CENDOJ (por ECLI); notas de prensa en poderjudicial.es | CENDOJ pide código de verificación: no lo automatices; el usuario copia el párrafo y se enlaza por ECLI, sin recorte ni copia archivada. Las notas de prensa se descargan con curl. Las resoluciones se citan tal cual |
| TJUE | InfoCuria (`infocuria.curia.europa.eu/tabs/document/…-ES-1-html`, ábrelo en Chrome: es una aplicación JavaScript), EUR-Lex (PDF por CELEX) | EUR-Lex descarga con curl y sirve para el recorte; curia.europa.eu bloquea la descarga automática |
| Ayuntamientos | Repositorios municipales (bcnroc.ajuntament.barcelona.cat para Barcelona) | bcnroc falla por la cadena de certificados: que lo descargue el usuario |
| Partidos | Webs oficiales (esquerra.cat, podemos.info…), programas en `investigacion/material/` (PSOE 2015, 2016, 2019 y 2023) | psoe.es a menudo no carga ni en Chrome (cuerpo vacío): pide al usuario que lo busque y descargue. podemos.info da 403 de Cloudflare a `npm run fuentes`: aviso falso |
| Prensa y verificadores | — | newtral.es, elpais.com y elcomercio.es no se leen con las herramientas: no lo sortees; pide al usuario que pegue el texto. Los clips de TikTok o Instagram de cuentas oficiales son pistas para llegar al vídeo completo |

Vídeos y audios (YouTube, RTVE Play, Telecinco, Onda Cero, 3Cat): /transcribir.

## Cuando una web bloquea

No se fuerzan los bloqueos (agentes falsos, saltar Cloudflare o códigos de verificación). En orden:

1. Copia de Web Archive con `id_`, que sirve los bytes originales con curl:
   `https://web.archive.org/web/<timestamp>id_/<url>`, con el timestamp de una copia buena del CDX
   (abajo) y comprobada.
2. Pedir al usuario que lo descargue en el navegador a `investigacion/material/<caso>/` con **el mismo
   nombre de archivo** que en la URL: `npm run capturas` usa esa copia local como último recurso.
3. Si es texto (prensa, CENDOJ), que lo pegue el usuario. El texto pegado no se guarda en el repo.

## Leer un PDF

No hay `pdftotext`. Usa el script de esta skill, que usa el `pdfjs-dist` del proyecto:

```bash
node .claude/skills/fuentes-primarias/pdftexto.mjs doc.pdf                        # páginas, SHA-256, ¿%%EOF?
node .claude/skills/fuentes-primarias/pdftexto.mjs doc.pdf "fragmento" "otro"     # página y contexto
node .claude/skills/fuentes-primarias/pdftexto.mjs doc.pdf --pagina 14            # texto de una página
```

La búsqueda no distingue mayúsculas, tildes, comillas ni guiones de partición, pero el contexto se muestra
con el texto original: la cita se copia de ahí, no del fragmento buscado.

## Web Archive

- **Buscar copias:** `https://web.archive.org/cdx/search/cdx?url=<url>&output=json&filter=statuscode:200&fl=timestamp,original`.
- **Guardar:** `https://web.archive.org/save/<url>` (funciona con curl; con congreso.es da 520 y al
  usuario le funciona en Chrome en incógnito). Lo que no se pueda guardar va a
  [investigacion/pendientes-web-archive.md](../../../investigacion/pendientes-web-archive.md) y lo
  intenta el usuario más tarde.
- **Comprobar las copias de PDF antes de usarlas:** Web Archive corta a veces los PDF en 1 MiB
  (1 048 576 bytes). La copia debe terminar en `%%EOF` y, si el caso guarda la SHA-256 del recorte,
  coincidir con ella (`pdftexto.mjs` muestra ambas cosas).
- No sirven las copias de aplicaciones JavaScript (InfoCuria guarda la página sin la sentencia) ni las que
  guardan una página de error o de Cloudflare. archive.ph es la alternativa cuando existe una copia allí.
- Si la SHA-256 de un recorte sale de la copia de Web Archive y no del original, se pone a mano; tras
  `npm run capturas -- --forzar` hay que reponerla.

## Sustituir fuentes de prensa por oficiales

El inventario está en [investigacion/revision-fuentes.md](../../../investigacion/revision-fuentes.md).
Propón la fuente oficial y aplícala cuando el usuario lo diga; no elimines una fuente débil sin su
aprobación.

## Cuando una fuente publicada cambia

Si `npm run fuentes` (o una revisión) detecta que un documento citado ha cambiado, se ha movido o ha
desaparecido:

1. Compara el original (copia archivada, SHA-256 guardada) con la versión vigente y anota solo hechos: qué
   cambia y si afecta a la cita.
2. Actualiza los enlaces a la versión vigente y regenera el recorte (`npm run capturas -- <slug> --forzar`).
3. Añade la entrada en `cambiosFuentes` del caso con la fecha de detección (formato en el README). Sale en
   el caso y en `/cambios-en-fuentes/`.

Los avisos de `npm run fuentes` por 403 o 429 son a menudo bloqueos a bots (podemos.info, interior.gob.es):
compruébalos a mano antes de tratarlos como un cambio.
