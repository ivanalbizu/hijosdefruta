# Candidatos · Rastreo de campaña

Parte del registro de candidatos: resumen y criterios en [../candidatos.md](../candidatos.md).

## Origen: bandejas de `npm run rastreo` (desde el 19-11-2026)

Pistas de verificadores, La Moncloa y canales de YouTube de los partidos durante la campaña de las
generales del 29-11-2026. Cada bandeja está en `investigacion/rastreo/AAAA-MM-DD.md`; el origen de cada
candidato indica la bandeja y la entrada.

### ras-01 · Sánchez: la migración irregular «ha bajado» un 38 % este año (y más de un 70 % en Canarias)
- **Estado:** borrador (19-11-2026) — `src/content/casos/sanchez-migracion-irregular-ha-bajado-un-38-por-ciento.mdx`, `draft: true`; falta que el usuario confirme la cita (el 19-11 el vídeo de Telecinco no le cargaba)
- **Origen:** bandeja del 19-11-2026, pasada de las 18:03, Verificat 18-11 («La migració irregular ha augmentat aquest any, malgrat que Sánchez afirmi el contrari», veredicto: enganyós)
- **Persona / tipo propuesto:** Pedro Sánchez (presidente del Gobierno y candidato del PSOE) / falsedad
- **Antes (el dato publicado):** Interior, informe quincenal acumulado del 1-1 al 31-10-2026, el último publicado antes de la entrevista (primera copia en Web Archive: 05-11-2026; las tres copias, del 05-11 y del 17-11, tienen la misma SHA-256, 9c421d4d…). Total por mar y tierra: 32 942 en 2026 frente a 30 263 en 2025 (+2679, +8,9 %), sin contar las entradas por tierra en Ceuta del 30 y 31 de julio, que el informe deja fuera (mar 28 155 + tierra 4787). Canarias: 13 327 frente a 14 099 (−5,5 %). Península y Baleares: +15 %. Recorte de la pág. 2 generado.
- **Después:** 16-11-2026 · Informativos Telecinco, entrevista con Carlos Franganillo (vídeo de 35:56 en la página de Telecinco), de 26:19 a 26:42 (whisper): «Mire, yo cuando llegué al Gobierno sufrí una crisis muy semejante a la que estamos sufriendo ahora, que además hay que contextualizar, Carlos, si me permite, porque durante este año los datos, los agregados, nos indican que ha bajado la llegada de migración irregular en torno a un 38%. En la costa atlántica, es decir, ahora mismo que están llegando estos cayucos a la isla del Hierro, ha caído en más de un 70%». Lo repitió en Espejo Público (18-11-2026, ~48:59) y en La Séptima (YouTube `FRUJEx999YM`, ~44:25), sin transcribir.
- **Justificación del político:** sus cifras son las del informe de Interior al 15-05-2026: 9047 frente a 14 857 (−39,1 %) en total y 3018 frente a 10 822 (−72,1 %) en Canarias. Interior se lo dijo así a Verificat, pero el caso no cita a Verificat: el informe del 15-05 va en la cronología, y la explicación, en el matiz.
- **Evolución (Interior, acumulado frente al mismo periodo de 2025):** 15-05: −39,1 % total, −72,1 % Canarias; 15-07: 14 479 frente a 19 222 (−24,7 %), Canarias 4440 frente a 11 454 (−61,2 %); 31-08: 20 417 frente a 23 931 (−14,7 %), Canarias 5163 frente a 12 126 (−57,4 %); 31-10: +8,9 %, Canarias −5,5 %. Según Verificat, al 15-11: 44 238 (+39,4 %), Canarias +66 %; ese informe aún no está en Web Archive y no se ha leído.
- **Búsquedas:** Verificat (leído); CDX de Web Archive de los informes de Interior de 2026 (el del 15-10 está capturado con la página de Cloudflare; el del 15-11, sin copia); informes del 15-05, 15-07, 31-08 y 31-10 leídos; audio del tramo 24:45-28:30 de Telecinco transcrito con whisper. La Moncloa (RSS de intervenciones del presidente): no devolvió nada. interior.gob.es da 403 de Cloudflare a `npm run fuentes`: aviso falso, como en el caso de Albares.
- **Notas / veredicto:** publicado como borrador con el informe del 31-10 como «antes» y los del 15-05 y 31-08 en la cronología. Enlaza al caso de Albares; falta el enlace de vuelta desde Albares cuando se publique.

### ras-02 · Díaz: «llevo subiendo el salario mínimo desde que he llegado al Gobierno […] un 75 %»
- **Estado:** publicado (19-11-2026, cita confirmada por el usuario, sin commit) — `/casos/diaz-smi-75-por-ciento-desde-que-llego-al-gobierno/`, con tabla de cuantías del BOE
- **Origen:** bandeja del 19-11-2026, pasada de las 18:03, Newtral 18-11 («El SMI ha subido un 42,8% desde que Yolanda Díaz es ministra, 32 puntos menos de lo que dice»; texto pegado por el usuario, no se guarda)
- **Persona / tipo propuesto:** Yolanda Díaz (vicepresidenta segunda y ministra de Trabajo y Economía Social) / falsedad. Tags: Sumar y Yolanda Díaz (como en sus otros casos).
- **Antes:** SMI vigente al llegar Díaz (13-01-2020): 900 euros (Real Decreto 1462/2018, BOE-A-2018-17773).
- **Después:** 17-11-2026 · «La Última Hora», La Séptima (canal oficial de YouTube, `KLl7Lj8PxSA`), de 3:08 a 3:23 (whisper con marcas por palabra): «Perdón, si me permite, yo no me voy a presentar a las elecciones y soy la ministra de Trabajo y llevo subiendo el salario mínimo desde que he llegado al Gobierno de España el 13 de enero del año 20, lo llevo subiendo hasta ahora un 75%». De 3:48 a 3:55: «desde el año 20 hasta hoy, en la que hemos subido el salario mínimo el 75%». Pregunta previa (2:59-3:04): si la subida se hace para atraer el voto de jóvenes y mujeres.
- **Cifras (BOE):** SMI 2027 = 1286 euros (Real Decreto 1013/2026, de 18-11, aprobado en el Consejo de Ministros del 17-11, BOE del 19-11, BOE-A-2026-24189; copia guardada en Web Archive el 19-11). 900 → 1286: +42,9 %; 950 (Real Decreto 231/2020, su primera subida) → 1286: +35,4 %; 735,9 (2018) → 1286: +74,8 % (Newtral dice 74,7 %; el cálculo da 74,75); 900 → 1221 (SMI vigente al hablar): +35,7 %.
- **Justificación del político:** ninguna publicada (según Newtral, Trabajo remitió la pregunta al Ministerio de Inclusión).
- **Notas / veredicto:** caso propio y no hito del de Urtasun: es la propia ministra y fija ella la fecha de partida. Enlaza al caso de Urtasun, y el de Urtasun enlaza de vuelta.

### ras-03 · Colau: el SMI ha subido «de 735 euros» a 1286 «en todo este tiempo»
- **Estado:** débil
- **Origen:** bandeja del 19-11-2026, pasada de las 18:03, Newtral 18-11 («Cuando Yolanda Díaz entró en el Gobierno el SMI era de 900 euros, 165 euros más de lo que dice Colau»; texto pegado por el usuario)
- **Persona / tipo propuesto:** Ada Colau (candidata de Frente Amplio a la Presidencia del Gobierno) / falsedad
- **Después:** 17-11-2026 · desayuno informativo de Europa Press (canal Europa Press Catalunya, YouTube `HY7vA5REgDw`), de 15:05 a 15:33 (whisper con marcas por palabra): «Quiero empezar por aquí por reivindicar que efectivamente llevamos dos mandatos de gobierno progresista y que hay cosas que han mejorado y han mejorado mucho. No nos cansaremos de reivindicar el gran trabajo que ha hecho la ministra de Trabajo, Yolanda Díaz. En todo este tiempo se ha conseguido subir el salario mínimo interprofesional de 735 euros a hoy mismo, en el Consejo de Ministros, a 1.286».
- **Búsquedas:** Newtral (pegado por el usuario); tramo 14:00-16:15 transcrito.
- **Notas / veredicto:** no es limpia. Justo antes dice «llevamos dos mandatos de gobierno progresista», así que «en todo este tiempo» puede referirse a todo el periodo de gobierno progresista, desde 2018, y entonces la cifra es correcta. A diferencia de Díaz, no fija la fecha de llegada de la ministra. No se usa en el caso de Díaz.

### ras-04 · Sánchez y las mafias en la entrada de Ceuta: «Yo no he dicho que fueran, dije que podrían ser»
- **Estado:** débil (confirmado por el usuario, 19-11-2026)
- **Origen:** bandeja del 19-11-2026, pasada de las 18:03, Maldita 18-11 («Cuando Sánchez y Marlaska decían que "las mafias" se aprovecharon de la sentencia del Supremo para la entrada de migrantes a Ceuta»)
- **Persona / tipo propuesto:** Pedro Sánchez / falsedad («nunca dije»)
- **Antes:** 31-07-2026 · Cadena SER, *Hoy por hoy* (YouTube `A_fyLE5ibhA`, ~6:22): «un bulo que es propagado por unas redes sociales, por mafias y organizaciones criminales». 31-07-2026 · declaración en Ceuta (YouTube `dSo4x_WeBj0`, ~3:45): «Parece que esta lectura de la sentencia del Tribunal Supremo ha corrido como la pólvora» … «redes de mafia que trafican con seres humanos y ha producido una avalancha». 03-08-2026 · comparecencia en el Congreso (YouTube `5RNELQ2W6co`, ~47:37; buscar en el Diario de Sesiones): «Lo que sí parece evidente es que hubo mafias y comerciantes que aprovecharon y alimentaron la situación». (Citas tal como las da Maldita.)
- **Después:** 16-11-2026 · Informativos Telecinco: «Yo no he dicho que fueran, dije que podrían ser» y «Que las mafias aprovecharon precisamente ese bulo y esa desinformación, sin duda».
- **Justificación del político:** la del propio 16-11: las mafias aprovecharon el bulo.
- **Búsquedas:** Maldita (leído). Sin buscar aún la transcripción de La Moncloa del 31-07 ni el Diario de Sesiones del 03-08.
- **Notas / veredicto:** no es limpia: en julio y agosto Sánchez habla con cautela («parece», «parece evidente») y lo que afirma es que las mafias propagaron el bulo o aprovecharon la situación, que es lo mismo que dice en noviembre. La frase tajante («evidentemente, orquestada por el conjunto de mafias», 04-08-2026) es de Marlaska, no de Sánchez, y Marlaska no se ha desdicho. Solo sería caso si en alguna de las tres intervenciones Sánchez afirma sin matices que las mafias organizaron la entrada; habría que escuchar los tres tramos completos. Propuesta: dejarlo como débil.

### ras-05 · Bustinduy: PP y Vox quieren 50 000 millones «para comprar armas a Donald Trump»
- **Estado:** descartado (decisión del usuario, 19-11-2026)
- **Origen:** bandeja del 19-11-2026, pasada de las 18:03, Newtral 19-11 («De dónde salen los 50.000 millones…»; texto pegado por el usuario)
- **Persona / tipo propuesto:** Pablo Bustinduy (ministro de Derechos Sociales, Sumar) / falsedad
- **Búsquedas:** Newtral (pegado por el usuario): la frase es de un tuit (x.com/pbustinduy/status/2122336386598539394) y del debate a cuatro de laSexta (13-11-2026). Newtral da por buenos los datos: 3 % del PIB de 2025 (1 690 012 M€, INE) ≈ 50 700 M€; el PP se comprometió a llegar al 5 %.
- **Notas / veredicto:** la cifra es correcta y el PP sí asumió el 5 %: no hay falsedad. Matiz de Newtral (posible doble rasero, no limpio): Bustinduy era ministro cuando el Gobierno se declaró «satisfecho» con la declaración de la cumbre de Ankara (07-2026, compras conjuntas por 50 000 M$) y cuando el Consejo de Ministros del 10-11-2026 aprobó contratos de armamento por 11 860 M€, pero esos son para el 2 %, no para el 5 % que critica.
