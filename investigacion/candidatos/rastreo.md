# Candidatos · Rastreo de campaña

Parte del registro de candidatos: resumen y criterios en [../candidatos.md](../candidatos.md).

> Cerrados (descartados, publicados, duplicados…): [cerrados/rastreo.md](cerrados/rastreo.md). Búsqueda: `grep -r` sobre `investigacion/candidatos/`.

## Origen: bandejas de `npm run rastreo` (desde el 19-11-2026)

Pistas de verificadores, La Moncloa y canales de YouTube de los partidos durante la campaña de las
generales del 29-11-2026. Cada bandeja está en `investigacion/rastreo/AAAA-MM-DD.md`; el origen de cada
candidato indica la bandeja y la entrada.

### ras-04 · Sánchez y las mafias en la entrada de Ceuta: «Yo no he dicho que fueran, dije que podrían ser»
- **Estado:** débil (confirmado por el usuario, 19-11-2026)
- **Origen:** bandeja del 19-11-2026, pasada de las 18:03, Maldita 18-11 («Cuando Sánchez y Marlaska decían que "las mafias" se aprovecharon de la sentencia del Supremo para la entrada de migrantes a Ceuta»)
- **Persona / tipo propuesto:** Pedro Sánchez / falsedad («nunca dije»)
- **Antes:** 31-07-2026 · Cadena SER, *Hoy por hoy* (YouTube `A_fyLE5ibhA`, ~6:22): «un bulo que es propagado por unas redes sociales, por mafias y organizaciones criminales». 31-07-2026 · declaración en Ceuta (YouTube `dSo4x_WeBj0`, ~3:45): «Parece que esta lectura de la sentencia del Tribunal Supremo ha corrido como la pólvora» … «redes de mafia que trafican con seres humanos y ha producido una avalancha». 03-08-2026 · comparecencia en el Congreso (YouTube `5RNELQ2W6co`, ~47:37; buscar en el Diario de Sesiones): «Lo que sí parece evidente es que hubo mafias y comerciantes que aprovecharon y alimentaron la situación». (Citas tal como las da Maldita.)
- **Después:** 16-11-2026 · Informativos Telecinco: «Yo no he dicho que fueran, dije que podrían ser» y «Que las mafias aprovecharon precisamente ese bulo y esa desinformación, sin duda».
- **Justificación del político:** la del propio 16-11: las mafias aprovecharon el bulo.
- **Búsquedas:** Maldita (leído). Sin buscar aún la transcripción de La Moncloa del 31-07 ni el Diario de Sesiones del 03-08.
- **Notas / veredicto:** no es limpia: en julio y agosto Sánchez habla con cautela («parece», «parece evidente») y lo que afirma es que las mafias propagaron el bulo o aprovecharon la situación, que es lo mismo que dice en noviembre. La frase tajante («evidentemente, orquestada por el conjunto de mafias», 04-08-2026) es de Marlaska, no de Sánchez, y Marlaska no se ha desdicho. Solo sería caso si en alguna de las tres intervenciones Sánchez afirma sin matices que las mafias organizaron la entrada; habría que escuchar los tres tramos completos. Propuesta: dejarlo como débil.
- **Revisión 23-11-2026:** siguen pendientes los tres tramos completos de julio y agosto (/transcribir). No se ha hecho en esta tanda.

### ras-07 · Sánchez en *Salvados*: «el presupuesto que había en inversión y mantenimiento de la alta velocidad representaba 700 millones de euros»
- **Estado:** prometedor (24-11-2026), pendiente de transcribir y de la fuente oficial de Adif
- **Origen:** bandeja del 24-11-2026, pasada de las 08:10, Verificat 23-11 («El pressupost en manteniment de l'alta velocitat no és el que ha dit Sánchez a 'Salvados'»; versión en castellano: <https://www.verificat.cat/es/presupuesto-mantenimiento-alta-velocidad-sanchez-salvados/>, veredicto «engañoso»)
- **Persona / tipo propuesto:** Pedro Sánchez / falsedad (dato)
- **Declaración:** 22-11-2026 · *Salvados* (laSexta), entrevista · <https://www.atresplayer.com/lasexta/programas/salvados/temporada-23/pedro-sanchez_6b001911e9f5b4000745b791/> · ~34:36. Según Verificat (reconstrucción en tres fragmentos, sin confirmar con el audio): «En 2018 el presupuesto que había en inversión y mantenimiento de la alta velocidad representaban 700 millones de euros.» / «En 2011 representaban 700 millones de euros.» / «En 2026 representan más de 1.100 millones de euros.»
- **Dato (según Verificat, sin fuente primaria todavía):** mantenimiento de alta velocidad (Adif AV): 212 millones en 2011, 255 en 2018 y 437 en 2025. Los 700 y 1100 millones son el mantenimiento de toda la red (Adif + Adif AV). Previsión de 2026 para toda la red: 1375 millones (Adif, vía Transportes). Fuente citada: informe del Gobierno «El accidente de Adamuz y el estado de las infraestructuras ferroviarias en España», sin fecha ni URL en el artículo.
- **Justificación:** Ministerio de Transportes a Verificat: Sánchez «se expresó de forma imprecisa»; en alta velocidad el gasto pasó de 255 a 437 millones entre 2018 y 2025.
- **Relación con cac-29:** es el mismo patrón (una cifra de toda la red atribuida a la alta velocidad) y aquí la frase no tiene la doble lectura del debate: «de la alta velocidad» va con «inversión y mantenimiento». Es lo que pedía cac-29 para proponerse; los dos podrían ir en un solo caso (dos hitos) o ras-07 solo.
- **Pendiente:** (1) /transcribir el tramo de Atresplayer (yt-dlp; si no baja, pedir al usuario el texto exacto) con URL y minutos; (2) /fuentes-primarias: localizar el informe del Gobierno (La Moncloa o Transportes) o las cuentas anuales/informes de Adif AV con el gasto de mantenimiento de 2011, 2018 y 2025; (3) cuidado con Adamuz: hay una causa abierta (Juzgado de Montoro). Del informe solo se usarían las cifras de mantenimiento, sin nada del accidente; si el dato está en otra fuente oficial (cuentas de Adif AV, PGE), mejor esa.
- **Búsquedas (24-11-2026):** Verificat en catalán y en castellano (web-fetch). `grep` de «Salvados», «manteniment», «alta velocidad» en candidatos y casos: solo cac-29.
