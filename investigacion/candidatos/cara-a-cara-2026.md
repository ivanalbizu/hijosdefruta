# Candidatos · Cara a cara Sánchez–Feijóo (19-11-2026)

Parte del registro de candidatos: resumen y criterios en [../candidatos.md](../candidatos.md).

> Cerrados (descartados, publicados, duplicados…): [cerrados/cara-a-cara-2026.md](cerrados/cara-a-cara-2026.md). Búsqueda: `grep -r` sobre `investigacion/candidatos/`.

## Origen

Debate de la Academia de la Televisión del 19-11-2026, moderado por María Casado, emitido por RTVE,
Atresmedia, Mediaset, FORTA y otros. Cinco bloques: vivienda, economía y fiscalidad, política social y
servicios públicos, corrupción y regeneración, migración y política exterior. Por sorteo abrió Feijóo y
cerró Sánchez.

- **Vídeo usado para localizar:** ABC, «Así ha sido el debate COMPLETO» (YouTube `0ge5WDh_fho`, 1:39:11;
  el debate va de 0:00:24 a 1:36:10, con pausas en 0:39:14–0:42:49 y 1:13:57–1:17:37). Los minutos de
  este registro son de ese vídeo (subtítulos automáticos para localizar y whisper en los tramos citados;
  **nada confirmado todavía por el usuario**). Para el caso conviene el vídeo de RTVE Noticias
  (`f8qUA829xVY`, especial de 6:14:11): RTVE = ABC + 8013 s, constante en todo el debate.
- **Material (fuera de git):** `investigacion/material/transcripciones/debate-19n/`: `abc.mp3` (audio),
  `abc.es-orig.vtt` (subtítulos automáticos), `abc.subs.txt` (texto con marcas cada ~30 s, hecho con
  `vtt2txt.py`) y `documentos/` (programa del PP de 2026 y nota del Consejo de Transparencia del
  23-12-2025, con la misma SHA-256 que la descarga). Whisper: el venv del scratchpad se borra al reiniciar;
  se reinstala como dice /transcribir.
- **Leer solo el tramo:** `abc.subs.txt` tiene una línea cada ~30 s y ocupa unos 30 000 tokens; no se lee
  entero. Por ejemplo, de 0:47 a 0:50: `awk '/^\[0:47:/,/^\[0:50:/' abc.subs.txt`.

- **Pista:** <https://sanchezmiente.com/>, web del PP con 30 «desmentidos» en directo (22:07–23:48,
  hora peninsular; leída el 20-11-2026, sin aviso legal ni firma). Es una pista de parte: sus fuentes son a
  menudo prensa (Idealista, 20minutos, Libertad Digital) y algunas frases que atribuye a Sánchez son
  paráfrasis o no están en el audio (la n.º 22, «No bajé las penas por malversación»; la n.º 30, Frontex,
  es de las 23:48, después del debate). Nada se toma de ella sin la fuente primaria.

**Fuera de alcance:** las afirmaciones de Feijóo (PP) no se investigan.

## Para retomar (21-11-2026)

El usuario da el debate por agotado (cac-17, cac-19 y cac-24, descartados el 21-11). cac-06 y cac-29 siguen débiles: no se reabren salvo que lo pida.
Cada cita nueva se confirma con el usuario (URL, tramo y texto) antes de publicar. El historial de las
tandas anteriores está en [cerrados/cara-a-cara-2026.md](cerrados/cara-a-cara-2026.md).

### cac-06 · «Desde la aprobación de la Ley estatal de Vivienda han sido 480.000 pisos más en alquiler»
- **Estado:** débil (20-11-2026, decisión del usuario) — cifra sin fuente localizada; las series oficiales dan menos, con el mismo signo y medidas distintas
- **Repetida (26-11-2026):** en el debate a cuatro, 35:32, «aumentó la oferta de alquiler en 476,000 viviendas» desde la ley (subtítulos; d4-11). Otra cifra, igual de sin fuente.
- **Persona / tipo propuesto:** Pedro Sánchez (presidente del Gobierno y candidato del PSOE) / falsedad
- **Después:** 19-11-2026 (whisper por palabras, sin confirmar; `investigacion/material/cac-06/whisper-17m55-19m50.txt`). De 18:15 a 18:30 en ABC (RTVE 2:31:48–2:32:03): «nosotros hemos aumentado la prolongación, la duración de esos alquileres y por eso, precisamente, ha bajado la oferta, no porque haya menos viviendas en alquiler, sino porque los contratos son mucho más estables». **La cifra**, de 19:07 a 19:16 en ABC (RTVE 2:32:40–2:32:49, `start: 9160`, `end: 9170`): «Bueno, pues desde la aprobación de la ley, le doy el dato, de la ley estatal de vivienda han sido 480.000 pisos más en alquiler. Ese es el dato, señor Feijó». Feijóo: «Ha caído la oferta, 400.000 viviendas han caído la oferta». De 19:25 a 19:40 en ABC (RTVE 2:32:59–2:33:14): «No, no, si le estoy dando la razón en parte. Al haber una prolongación y una estabilidad en los contratos de alquiler, evidentemente hay menos oferta de alquiler. Pero eso no significa que no esté funcionando la ley estatal». Cuenta el parque de pisos en alquiler (distingue la oferta) desde la Ley 12/2023 (24-05-2023, en vigor el 26-05-2023).
- **De dónde sale la cifra:** sin localizar. No está en las transcripciones de La Moncloa de vivienda de 2025–2026 (07-09-2026: solo «más de 120.000 viviendas de alquiler asequible»), ni en notas del Ministerio, ni en el Real Decreto 326/2026 (Plan Estatal), ni en la referencia del Consejo de Ministros del 10-11-2026. Ningún verificador la ubica (Newtral en directo, papeleta.es).
- **Datos oficiales:**
  - INE, Encuesta de Condiciones de Vida, tabla 9996 (hogares por régimen de tenencia; ECV 2025, la última, actualizada el 05-02-2026): total en alquiler, 2022: 18,1 %; 2023: 18,7 %; 2024: 20,4 %; 2025: 20,2 % (a precio de mercado: 15,1 / 15,4 / 17,0 / 16,7 %). <https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/9996?nult=8> · copia `20261120150123` (comprobada).
  - INE, Estadística Continua de Población, tabla 60131 (hogares a 1 de julio): 2023: 19 197 142; 2025: 19 639 045. <https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/60131?nult=30> · copia `20261120150129` (comprobada).
  - Ministerio de Vivienda, «Sistema Estatal de Referencia del Precio del Alquiler de Vivienda. Metodología» (18-03-2026), págs. 4–5, tablas A1 y A2 (inmuebles arrendados para vivienda habitual declarados en el IRPF por personas físicas): colectiva, 2022: 2 042 979; 2023: 2 147 789; 2024: 2 271 987 (2024 incluye por primera vez Álava y Bizkaia). <https://cdn.mivau.gob.es/portal-web-mivau/vivienda/serpavi/2026-03-18_Metodologia_SERPAVI.pdf> · copia `20261010041908` (misma SHA-256 9757658e…, 19 págs.).
- **Cálculos propios** (`cac-06/calculos.txt`): ECV × hogares de la ECP (el INE no publica la cifra absoluta): 3 589 866 hogares en alquiler en 2023 y 3 967 087 en 2025, **+377 000** (a precio de mercado, +323 000); de 2024 a 2025, +10 000; desde 2022, +535 000; el redondeo del porcentaje mueve unos ±10 000 por año. SERPAVI: +133 961 de 2023 a 2024 (+85 585 homogéneo, sin Álava y Bizkaia); solo se acerca a 480 000 entre 2020 y 2024 sin homogeneizar (+485 651), un periodo que empieza tres años antes de la ley y sin nada que indique que la cifra salga de ahí.
- **Justificación del político:** ninguna publicada. En el mismo acto separa el parque de la oferta.
- **Lo que lo debilita:** las dos series oficiales dicen que el parque en alquiler ha crecido desde la ley («no porque haya menos viviendas en alquiler» está respaldado). No hay cifra oficial absoluta: la ECV da porcentajes con error de muestreo (la conversión es nuestra) y el SERPAVI solo cubre lo declarado por personas físicas. Es una diferencia de magnitud, no de signo, con medidas distintas (wild-14). La pista del PP (n.º 2, Idealista) mide la oferta: no se usa.
- **Búsquedas (20-11-2026):** whisper de ABC (17:55–19:50); web («480.000 viviendas/pisos/hogares alquiler», «Ley de Vivienda balance», SERPAVI 2024, ECV y EPF por tenencia; búsqueda en lamoncloa.gob.es, mivau.gob.es, psoe.es y congreso.es); La Moncloa (07-09-2026, 12-01-2026, Consejo de Ministros del 10-11-2026); BOE (Real Decreto 326/2026); nota de Consumo del 22-04-2026; API del INE (ECP, EPF, Censo anual, ECV). Sin leer: el Excel del SERPAVI 2011–2024 (71 MB), la publicación del SERPAVI 2026 (la descarga falla) y las verificaciones de El País y VerificaRTVE.
- **Material:** `investigacion/material/cac-06/` (unos 7 MB).
- **Notas / veredicto:** débil. La referencia la fija él («desde la aprobación de la ley»), pero no hay una cifra oficial del parque con la que compararla de forma limpia; las estimaciones con datos oficiales dan menos (+377 000 con la ECV; +134 000 en 2024 con el IRPF). Se reabre si el Gobierno o el PSOE publican de dónde sale el 480 000: si fuera una serie que arranca antes de la ley (como el SERPAVI 2020–2024), sería caso con el criterio de ras-02.

### cac-14 · «Ustedes cuando han gobernado han congelado las pensiones a 0,25 %»
- **Estado:** ya existe — `sanchez-zapatero-no-congelo-las-pensiones`; los dos hitos, publicados en la cronología (20-11-2026)
- **Hito 1 · 27-05-2010, el voto de Sánchez:** votación nominal del Pleno del Congreso, sesión 160, votación 1, «CONVALIDACIÓN REAL DECRETO LEY REAL DECRETO-LEY 8/2010, de 20 de mayo, por el que se adoptan medidas extraordinarias para la reducción del déficit público»: «SI 169 […] NO 168 […] ABSTENCIONES 13» (pág. 1); el listado «SI» del G.P. Socialista va de la pág. 2 a la 4 y en la pág. 4 figura «Sánchez Pérez-Castejón, Pedro» (escaño 1805); el «NO» empieza en la pág. 5. <https://www.congreso.es/votoplenoh/L9/20100527001.pdf> · copia `20230807115022` (también `20211114070354`) · SHA-256 2b014bfb…dbce4d9c4 · 10 págs., termina en `%%EOF`. Diario de Sesiones del Congreso, IX legislatura, núm. 169 (27-05-2010), pág. 3: «se aprueba por 169 votos a favor, 168 en contra y 13 abstenciones» · <https://www.congreso.es/public_oficiales/L9/CONG/DS/PL/PL_169.PDF> · copia `20240520022741` · SHA-256 c3733dcf… · 34 págs. Copias locales en `investigacion/material/transcripciones/debate-19n/documentos/`. Contexto neutro: el voto es al decreto entero (también recortaba el sueldo de los empleados públicos); la suspensión de la revalorización para 2011 es su art. 4, que ya cita el caso. Pista: Maldita, 13-11-2026 (no se cita).
- **Hito 2 · 19-11-2026:** de 49:34 a 49:40 (whisper): «Y en segundo lugar, ustedes cuando han gobernado, han congelado las pensiones a 0,25%, señor Feijó». Feijóo, encima: «El diputado que congeló las pensiones fue usted». Sin confirmar por el usuario.
  - **En el vídeo de RTVE (`f8qUA829xVY`, 20-11-2026):** tramo confirmado por el usuario, de 3:03:05 a 3:03:15, «al 0,25%» → `start: 10985`, `end: 10995`. (Los tiempos que di primero, 3:03:13–3:03:25, iban 10 s tarde: `--download-sections` empezó 10 s antes de lo pedido. Corregido, el desfase con ABC es +8013 s, el mismo que en cac-02.)
- **Notas:** en el cara a cara de 2023 negó que Zapatero las congelara (el caso); ahora llama «congelar» a revalorizarlas un 0,25 % (2014-2017), y en 2010 votó a favor del decreto que suspendió la revalorización de 2011. Es la misma persona sobre lo mismo: hitos, no caso propio. Para el recorte del hito 1 vale el PDF de la votación (documento oficial del Congreso), con `buscar` en «Sánchez Pérez-Castejón».

### Otras frases de Sánchez sin indicio de contradicción (no se registran como candidatos)
- Préstamos «a tipo cero de interés de 50.000 €» del Real Decreto-ley «de Mari Carmen» (≈8:02, ≈12:37): medida aprobada.
- «Se estarían ahorrando 500 € al mes» en Madrid o Valencia con la ley estatal (≈12:07) y el ejemplo del alquiler de 1320 € (≈19:46): estimaciones, no datos.
- «Seis de cada 10 € de los planes regionales de vivienda provienen de la Administración General del Estado» (≈17:12): sin fuente clara; se puede mirar si hace falta.
- «Sacar de las plataformas digitales a 110.000 pisos turísticos que eran ilegales» (≈18:44): dato del Ministerio de Consumo; lo que afirma es el voto del PP.
- 22,6 millones de afiliados, «más de 10 millones de mujeres», 3,5 millones de autónomos (≈25:23): afiliación de octubre de 2026, previsiblemente exacta.
- «Crecer y reducir las emisiones» (25:52): las emisiones de 2025 están por debajo de las de 2018 (la pista del PP, n.º 12, lo admite).
- «Hemos bajado el IVA de la luz, del gas, de los alimentos» (≈33:37): rebajas temporales que existieron. Escudo de 12 000 millones por la guerra de Irán y rebaja del IRPF a 10 millones de contribuyentes (≈33:06–33:37): cifras del Gobierno; la falta de deflactación (pista del PP, n.º 10) mide otra cosa.
- Aumento del mantenimiento ferroviario (≈48:53): precedente wild-14 (La Moncloa, 21-01-2026: de 726,5 a 1119,8 millones); la pista del PP (CNMC, por unidad de tráfico) mide otra cosa. Los 19 000 millones de la misma frase, en cac-29.
- 75 000 millones de exportaciones agroalimentarias en 2025 y «la renta agraria más alta de la UE» (≈38:40): sin indicio.
- Tratado de Amistad con Francia y acuerdo UE–Marruecos (≈1:23:43): Feijóo admite el voto y lo justifica.
- «El 25 %» del crecimiento por la aportación de los migrantes (≈1:29:10), regularización con la colombiana como primera nacionalidad (≈1:29:56) y plan de integración de 500 millones (≈1:32:30): sin indicio; se pueden mirar si hace falta.
- Petición de perdón por Adamuz y Urda (≈47:20): Feijóo dice que nunca lo ha pedido; no es una contradicción de Sánchez.
