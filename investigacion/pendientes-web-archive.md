# Copias pendientes en Web Archive

Fuentes de casos publicados que aún no tienen copia en Web Archive. Para guardar una, abre en el navegador `https://web.archive.org/save/<URL>`. Cuando esté, Claude lo comprueba con el índice CDX, añade `archivo:` en el caso y la quita de esta lista.

Última revisión: 19-11-2026. Ese día se añadieron 81 copias a 29 casos y 3 promesas (búsqueda en el CDX y, si no había copia, guardado con `web.archive.org/save`). De las copias de PDF se comprobó que estuvieran completas (terminan en `%%EOF`) y, cuando el caso guarda la SHA-256 del recorte, que la huella coincida. Ojo: Web Archive guarda a veces los PDF grandes cortados en 1 MiB (1 048 576 bytes): pasó con DSCD-14-PL-59, cuyas copias de 2021-01, 2021-06 y 2023-10 están truncadas; vale la del 15-12-2021.

- [ ] https://www.interior.gob.es/opencms/export/sites/default/.galleries/galeria-de-prensa/documentos-y-multimedia/balances-e-informes/2026/21_informe_quincenal_acumulado_01-01_al_15-11-2026.pdf
  - casos: sanchez-migracion-irregular-21-por-ciento-donde-lo-dejo-rajoy (fuente y recorte)
  - el guardado con curl da 520 (Cloudflare). Copia local descargada por el usuario el 20-11-2026 en `investigacion/material/cac-27/`, SHA-256 bba22fcb3af0ef16b2db4a65d5d9e88792c2aa80593209416637fb724fcebec6. Al guardarla desde el navegador, comprobar que la copia no es la página de Cloudflare y que la huella coincide.
- [ ] https://www.psoe.es/media-content/2023/10/Intervenci%C3%B3n-inicial-de-Pedro-S%C3%A1nchez-en-el-Comit%C3%A9-Federal-del-28-de-octubre-de-2023.pdf
  - casos: no-aministia-para-politicos-e-independentistas-catalanes (fuente y recorte)
  - la copia guardada el 19-11-2026 es una página vacía de psoe.es (909 bytes), no el PDF: no sirve. Hay una copia antigua de El Independiente (en revision-fuentes.md), pero es otro archivo. Probar a guardarla desde el navegador cuando psoe.es cargue.
- [ ] https://infocuria.curia.europa.eu/tabs/document/C/2024/C-0666-24-00000000RP-01-P-01/ARRET/323833-ES-1-html
  - casos: no-aministia-para-politicos-e-independentistas-catalanes
  - InfoCuria es una aplicación JavaScript: la copia guarda la página sin el texto de la sentencia. El recorte del fallo ya tiene copia (PDF de EUR-Lex).
- [ ] https://www.poderjudicial.es/portal/site/cgpj/viewDocument?ECLI=ECLI:ES:TS:2023:1019
  - casos: marlaska-cese-perez-de-los-cobos-perdida-de-confianza
  - el CENDOJ redirige a un visor con código de verificación: la copia solo guarda el buscador. No se puede archivar.
- [ ] https://www.poderjudicial.es/portal/site/cgpj/viewDocument?ECLI=ECLI:ES:TS:2022:4489
  - casos: solo-si-es-si-jueces-no-cumplen-la-ley
  - igual que la anterior (CENDOJ).
- [ ] https://twitter.com/HoyPorHoy/status/1121678663739564037
  - casos: sanchez-gobernabilidad-partidos-independentistas
  - Web Archive no llega a X (error 523, dos intentos el 19-11-2026). Probar desde el navegador.
  - guardar: https://web.archive.org/save/https://twitter.com/HoyPorHoy/status/1121678663739564037
- [ ] https://www.europapress.tv/politica/1127314/1/urtasun-pregunta-feijoo-lado-insultar-milei-sanchez
  - casos: urtasun-smi-66-por-ciento-desde-que-diaz-es-ministra
  - Web Archive no llega a europapress.tv (error 520, dos intentos el 19-11-2026). Probar desde el navegador.
  - guardar: https://web.archive.org/save/https://www.europapress.tv/politica/1127314/1/urtasun-pregunta-feijoo-lado-insultar-milei-sanchez
- [ ] https://www.adifaltavelocidad.es/documents/34745/45147417/Informe_de_Gestion_2019.pdf/01ec91e8-b31c-88f9-10c5-e4bc9184bbc5
  - casos: sanchez-mantenimiento-alta-velocidad-700-millones
  - adifaltavelocidad.es no envía la cadena de certificados completa; Web Archive da 520 (24-11-2026). Copia local en investigacion/material/ras-07/ (SHA-256 en el caso). Probar desde el navegador.
  - guardar: https://web.archive.org/save/https://www.adifaltavelocidad.es/documents/34745/45147417/Informe_de_Gestion_2019.pdf/01ec91e8-b31c-88f9-10c5-e4bc9184bbc5
- [ ] https://www.adifaltavelocidad.es/documents/d/adif-av/2025_estado_sostenib_adif_av_esp
  - casos: sanchez-mantenimiento-alta-velocidad-700-millones
  - igual que la anterior (Adif AV, 24-11-2026).
  - guardar: https://web.archive.org/save/https://www.adifaltavelocidad.es/documents/d/adif-av/2025_estado_sostenib_adif_av_esp
- [ ] https://www.congreso.es/l15p/e10/e_0109652_n_000.pdf
  - casos: sanchez-mantenimiento-alta-velocidad-700-millones
  - congreso.es da 520 a web.archive.org/save; al usuario le funciona en Chrome en incógnito.
  - guardar: https://web.archive.org/save/https://www.congreso.es/l15p/e10/e_0109652_n_000.pdf
