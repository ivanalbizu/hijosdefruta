# Tuits de Pedro Sánchez en la oposición (prueba del usuario, 25-11-2026)

Petición del usuario: leer @sanchezcastejon antes de llegar al Gobierno (26-07-2014 a 01-06-2018) en busca de
promesas incumplidas y críticas a gobiernos anteriores por lo que después hizo él. Prueba piloto.

Método: búsqueda avanzada de X en Claude in Chrome (`from:sanchezcastejon since:<desde> until:<hasta> <palabras>`,
pestaña «Más reciente»), desplazando la lista y volcando fecha, texto e id de cada tuit; el volcado se mete en el
`body` de la página y se lee con `get_page_text` (la salida de `javascript_tool` se corta hacia los 1000 caracteres).

> Cerrados (descartados, publicados, duplicados…): [cerrados/twitter-sanchez.md](cerrados/twitter-sanchez.md). Búsqueda: `grep -r` sobre `investigacion/candidatos/`.

## Estado de los candidatos (las dos tandas)

| Id | Tanda | Tema | Tipo | Estado | Siguiente paso |
| --- | --- | --- | --- | --- | --- |
| tw-01 | 1.ª | Blindar pensiones y sanidad en la Constitución (2018, programas de 2023 y 2026) | promesa incumplida | **prometedor** | confirmar en el Congreso que nunca se presentó; propuesta de Navarra (2018) |
| tw-09 | 2.ª | «Los que decían que iba a pactar con los independentistas […] ahora callan» (15-04-2016) | hito → `sanchez-gobernabilidad-partidos-independentistas` | hito añadido | revisión del usuario en `/casos/sanchez-gobernabilidad-partidos-independentistas/` |
| tw-08 | 2.ª | Puigdemont: «fuerza moral», «peores hojas», «no es un candidato constitucional» (2017-2018) | hitos → `sanchez-traera-a-puigdemont-a-espana` / amnistía | hito añadido | revisión del usuario en `/casos/no-aministia-para-politicos-e-independentistas-catalanes/` |
| tw-10 | 2.ª | Podemos: «jueces y fiscales a sueldo de Iglesias» (2016) | hitos → populismo / «no dormiría» | **débil** | — (los casos ya tienen ese «antes»; lo decide el usuario) |
| tw-04 | 1.ª | Consejo de Ministros en funciones «para hacer publicidad y propaganda» (Lastra, 2016) | hito → `psoe-junta-electoral-neutralidad-ruedas-de-prensa` | **débil** | — (sin fuente original; lo decide el usuario) |
| tw-02 | 1.ª | «La banca pagará parte de las pensiones» (2018) | promesa incumplida | **débil** | — (caja única: no se puede probar que el ITF no pagara pensiones; lo decide el usuario) |
| tw-05 | 1.ª | El «plasma» y las comparecencias de Rajoy (2014-2015) | doble rasero | **débil** | — (sin recuento comparable; riesgo de causas abiertas; lo decide el usuario) |
| tw-06 | 1.ª | Educación: +35 % de gasto, 300 000 becas, 106 000 plazas de 0-3 (2018) | promesa incumplida | **débil** | — (gasto +40,8 % y becas superados; 0-3, «más de 60 000»; lo decide el usuario) |
| tw-03 | 1.ª | El recibo de la luz «casi el doble» (2018) | doble rasero | **débil** | — (el IPC solo medía el PVPC hasta 2023; queja, no compromiso) |
| tw-07 | 1.ª | Rajoy y los 17 000 refugiados (2017) | doble rasero | descartado | — (decisión del usuario) |

Sin caso: sanidad universal y pensiones con el IPC (cumplido), IVA cultural (lo bajó Rajoy), Rajoy y la corrupción
(regla de causas abiertas), «la primera llamada a Puigdemont» (2016, coherente con 2023), Artur Mas y Convergència
(Junts no es CDC; toca corrupción), indulto de María Salmerón (lo pidió él).

## Búsquedas hechas (no repetir)

El rango pedido es el de la consulta; el **cubierto** va del tuit más antiguo al más reciente que se llegó a leer. Si
el cubierto es más corto que el pedido, el resto del rango queda **pendiente** con esas mismas palabras.

| Fecha | Palabras | Rango pedido | Rango cubierto | Tuits | Pendiente |
| --- | --- | --- | --- | --- | --- |
| 25-11-2026 | `compromiso OR derogaremos OR prometo` | 26-07-2014 – 31-05-2018 | 08-05-2017 – 31-05-2018 | 54 | 26-07-2014 – 07-05-2017 |
| 25-11-2026 | `asesores OR ministerios OR plasma OR "ruedas de prensa" OR comparecer OR comparecencia OR dedazo OR enchufes` | 26-07-2014 – 31-05-2018 | 11-08-2014 – 27-04-2018 | 73 | — (completo) |
| 25-11-2026 | `luz OR eléctricas OR IVA OR impuestos OR "presión fiscal" OR gasolina OR recibo OR vivienda OR alquiler` | 26-07-2014 – 31-05-2018 | 24-02-2016 – 05-05-2018 | 60 | 26-07-2014 – 23-02-2016 |
| 25-11-2026 | `independentistas OR Puigdemont OR indulto OR amnistía OR referéndum OR Bildu` | 26-07-2014 – 31-05-2018 | — | 0 | todo: X respondió «Algo salió mal» (límite de búsquedas) |
| 25-11-2026 (2.ª tanda) | `independentistas OR Puigdemont OR indulto OR amnistía OR referéndum OR Bildu OR sedición OR rebelión` | 01-01-2017 – 31-05-2018 | 08-06-2017 – 23-05-2018 | 42 | — (completo: antes del 08-06-2017 no salió ninguno) |
| 25-11-2026 (2.ª tanda) | `independentistas OR secesionistas OR Puigdemont OR Mas OR indulto OR referéndum OR Bildu OR autodeterminación OR Podemos` | 26-07-2014 – 31-12-2016 | 08-08-2014 – 17-09-2016 | 266 (80 con las palabras; «Mas» recoge cualquier «más») | — (completo) |
| 25-11-2026 (2.ª tanda) | `Venezuela OR Maduro OR CIS OR Fiscalía OR "Fiscal General" OR RTVE OR TVE OR manipulación OR Tezanos` | 26-07-2014 – 31-05-2018 | — | 0 | todo: «Algo salió mal» otra vez |

Temas aún sin buscar: Venezuela y Maduro, CIS, Fiscalía, RTVE, financiación
autonómica, decretos-ley (ya hay caso), presupuestos prorrogados (ya hay caso). X limita las búsquedas por sesión:
tres seguidas funcionaron, la cuarta no; en la 2.ª tanda, dos y una recarga, la tercera no; hacerlas en tandas espaciadas (dos o tres por tanda) y con rangos de un año para que el
desplazamiento llegue al final. `javascript_tool` corta a los 45 s: guardar lo leído en `window.__T` y desplazar en tramos de unas 16 vueltas.

Ojo: la cuenta publica también citas de otros entre comillas o con su usuario (Lastra, Isabel Rodríguez, Ábalos,
Robles…). Esas frases son del citado, no de Sánchez. Los tuits se citan con su URL
(`https://x.com/sanchezcastejon/status/<id>`) y su copia en Web Archive.

Ya cumplido, no da caso: derogar el RD-ley 16/2012 y recuperar la sanidad universal (tuits 984502698212028416 y
1002118942599495680; RDL 7/2018), revalorizar las pensiones con el IPC (973914730657132545; Ley 21/2021). IVA
cultural al 10 % (743419923305795584 y otros): lo bajó el Gobierno de Rajoy (espectáculos en 2017, cine en los PGE
de 2018). Comparecencias de Rajoy por corrupción (855759971061043202 y otros): bloqueado por regla si se cruza con
causas abiertas.

### tw-02 · «La banca pagará parte de las pensiones»
- **Estado:** débil (decisión del usuario, 25-11-2026, tras la 2.ª pasada)
- **Origen:** tuits 953351032129679360 (16-01-2018) y 951538248899317760 (11-01-2018)
- **Persona / tipo propuesto:** Pedro Sánchez / promesa incumplida
- **Antes:** 16-01-2018 · «Mi compromiso es firme: cuando lleguemos al gobierno, la banca pagará parte de las
  pensiones de este país»; 11-01-2018 · impuestos a la banca y a las transacciones financieras «para sostener el
  Sistema público de pensiones»
- **Después:** pendiente: Ley 5/2020 (impuesto sobre transacciones financieras) y Ley 38/2022 (gravamen temporal a la
  banca), ¿con destino a pensiones? La financiación que se aprobó fue el MEI sobre cotizaciones
- **Justificación del político:** pendiente
- **Búsquedas:** tuits (copia en Web Archive del 953351032129679360, 21-05-2020; el 951538248899317760 sin copia).
  25-11-2026: textos consolidados del BOE (eli/es/l/2020/10/15/5, l/2022/12/27/38, l/2024/12/20/7): ninguno
  destina la recaudación a la Seguridad Social ni a las pensiones; la Ley 38/2022 solo cita la revalorización de las
  pensiones como gasto que justifica el gravamen. La Moncloa, rueda de prensa del Consejo de Ministros del 19-10-2018
  (enlacetranscripciones2018/19102018_intermontero.aspx), Montero sobre el anteproyecto del ITF: «los ingresos generados
  por este impuesto aportarán unos 850 millones que estarán destinados a financiar el sistema público de pensiones»; el
  15-10-2018 (151018-transmontero.aspx): «la recaudación del Impuesto sobre Transacciones Financieras se derivará a
  Seguridad Social». 2.ª pasada (25-11-2026, a petición del usuario): Memoria de la Administración Tributaria 2024,
  cap. V (hacienda.gob.es/ig/memorias/memoria-tributaria-2024/05-mat-2024.pdf, p. 46): recaudación del ITF de 296 (2021),
  196 (2022), 198 (2023) y 249 millones (2024); en el texto, 248 en 2024. PGE de 2021 (Ley 11/2020) y de 2023 (Ley
  31/2022), textos consolidados: no mencionan el ITF; las transferencias del Estado a la Seguridad Social son las de la
  recomendación primera del Pacto de Toledo (gastos impropios), sin ligarlas a ningún impuesto.
- **Notas / veredicto:** débil por decisión del usuario. (1) Con la caja única no se puede probar que la recaudación del
  ITF no financiara pensiones (el Estado transfiere cada año muchos miles de millones a la Seguridad Social). (2) El ITF
  lo paga quien compra acciones, no la banca; los gravámenes a la banca (2022, 2024) nunca se anunciaron para
  pensiones. (3) Recaudar menos de lo previsto (196–296 millones frente a 850) es un error de previsión, no un
  incumplimiento. Se reabre si aparece una declaración del Gobierno de que el ITF «no irá» a las pensiones o de que se
  destina a otra cosa. Antes: el ITF no lo paga la banca, sino quien compra acciones. Riesgo de contradicción no limpia: hubo impuestos a la banca; falta ver si alguno se afectó a
  las pensiones (los impuestos van a la caja común). Posible débil.

### tw-03 · El recibo de la luz «casi el doble»
- **Estado:** débil (propuesta)
- **Origen:** tuits 956203035939819522 (24-01-2018) y 945671053472423936 (26-12-2017, cita de Hugo Morán)
- **Persona / tipo propuesto:** Pedro Sánchez / doble rasero
- **Antes:** 24-01-2018 · «En la última década no se había registrado un precio tan alto de la electricidad en España.
  El recibo ha pasado de 46 euros a 88, casi el doble. ¿Qué tiene que decir el Gobierno?» (archivo
  https://web.archive.org/web/20200521075007/https://twitter.com/sanchezcastejon/status/956203035939819522)
- **Después:** IPC del INE, subclase Electricidad (serie IPC252170, tabla 50904, base 2021 = 100), media anual: 2016 77,3 ·
  2017 84,8 · **2018 86,9** · 2019 81,0 · 2020 73,8 · **2021 100,0** · **2022 126,8** · 2023 80,2. IPC general (IPC251852):
  2018 96,6 · 2021 100,0 · 2022 108,4. Con Sánchez, la electricidad estuvo un 15 % más cara que en 2018 en 2021 (un 11 % en
  términos reales) y un 46 % más cara en 2022.
- **Hito relacionado (otro posible caso):** entrevista en El País, 05-09-2021 (transcripción de La Moncloa,
  https://www.lamoncloa.gob.es/presidente/intervenciones/paginas/2021/prar20210906.aspx): que los consumidores con un
  consumo medio paguen al final de 2021 «una cuantía semejante y similar a la que pagaron en 2018, lógicamente con el IPC
  descontado». El Gobierno lo dio por cumplido (Senado, 21-12-2021: 613 € frente a 639 €, datos de Eurostat) y reconoció que
  el 30 % con PVPC pagaría más.
- **Justificación del político:** crisis del gas y guerra de Ucrania; rebajas del IVA y del impuesto eléctrico, excepción
  ibérica.
- **Búsquedas (25-11-2026):** API del INE (SERIES_TABLA 50902 y 50904, DATOS_SERIE 2016-2023); web «Sánchez factura de la
  luz 2021 lo mismo que en 2018»; CDX de los tuits.
- **Notas / veredicto:** débil. (1) El tuit es una queja con pregunta, no un compromiso, y como presidente sí tomó
  medidas: chocar con «¿qué tiene que decir el Gobierno?» es opinión. (2) Hasta enero de 2023 el IPC solo medía la
  electricidad con la tarifa regulada (PVPC), así que no desmiente el promedio de 2021 del Gobierno, que incluye el mercado
  libre: datos que no se miden igual (wild-14). (3) El 46 → 88 € del tuit no tiene fuente (enlaza a @psoesostenible). Lo
  único sólido es la serie del INE, que mide igual 2018 y 2022 (las dos con PVPC); serviría como contexto si se reabre.

### tw-04 · Consejo de Ministros en funciones «para hacer publicidad y propaganda»
- **Estado:** débil
- **Origen:** tuit 692672081901797376 (28-01-2016), frase atribuida a Adriana Lastra
- **Persona / tipo propuesto:** PSOE (Lastra) / doble rasero · hito para `psoe-junta-electoral-neutralidad-ruedas-de-prensa`
- **Antes:** 28-01-2016 · «El gobierno en funciones utiliza el #CMin para hacer publicidad y propaganda. Que vengan al
  #Congreso a comparecer»
- **Después:** las multas de la JEC al presidente y a los ministros por ruedas de prensa en la campaña del 29N (ya en
  el caso)
- **Búsquedas:** el tuit no tiene copia en Web Archive (CDX de twitter.com y x.com). Web 25-11-2026 («Lastra»
  «publicidad y propaganda» «Consejo de Ministros» 2016): nada; CDX de psoe.es/actualidad/ del 27 al 31-01-2016: ninguna
  nota de Lastra; YouTube: nada.
- **Estado (25-11-2026):** débil por decisión del usuario: sin fuente original ni copia del tuit; además, es una queja fuera de campaña, no una denuncia ante la Junta Electoral. Se reabre si aparece el vídeo de la rueda de
  prensa o el tuit de la propia Lastra.
- **Notas / veredicto:** la frase es de Lastra citada por la cuenta de Sánchez; como hito iría a nombre de Lastra.

### tw-05 · «Un presidente del Gobierno no puede esconderse tras un plasma» y el Gobierno que más se niega a comparecer
- **Estado:** débil (decisión del usuario, 25-11-2026, sin hacer el recuento)
- **Origen:** tuits 669241902911373313 (24-11-2015), 590787862901219328 (22-04-2015), 560137784309346304 (27-01-2015),
  504373454834241536 (26-08-2014)
- **Persona / tipo propuesto:** Pedro Sánchez / doble rasero
- **Antes:** «Rajoy es el Presidente que más se ha negado a comparecer en la Cámara, usa y abusa de su mayoría absoluta
  para no acudir al Congreso» (22-04-2015); «El PP tumba las 26 solicitudes de comparecencia de Rajoy y sus ministros»
  (26-08-2014)
- **Después:** pendiente: solicitudes de comparecencia de Sánchez rechazadas con los votos del PSOE y sus socios
  (Congreso, buscador de iniciativas) y ruedas de prensa sin preguntas
- **Búsquedas (25-11-2026):** ninguno de los cuatro tuits tiene copia en Web Archive (CDX de twitter.com y x.com). Datos
  abiertos del Congreso (congreso.es/es/opendata/iniciativas): solo iniciativas legislativas, no comparecencias; el
  recuento habría que hacerlo a mano en congreso.es/busqueda-de-iniciativas (tipo «Solicitud de comparecencia del
  Gobierno», compareciente el presidente, por legislatura y resultado).
- **Notas / veredicto:** débil por decisión del usuario. (1) Muchas solicitudes de la XV legislatura tienen que ver con
  causas judiciales abiertas (regla: habría que excluirlas). (2) No se mide igual: Rajoy tenía mayoría absoluta y Sánchez
  no; las solicitudes se rechazan en la Mesa o en el Pleno con mayorías distintas. (3) Las declaraciones sin preguntas son
  habituales en todos los presidentes: compararlas con el «plasma» sería opinión. Se reabre si alguien publica un
  recuento oficial por legislatura.

### tw-06 · Educación: 35 % más de gasto, 300 000 becas y 106 000 plazas de 0 a 3 años
- **Estado:** débil (decisión del usuario, 25-11-2026)
- **Origen:** tuit 984052176531148800 (11-04-2018)
- **Persona / tipo propuesto:** Pedro Sánchez / promesa incumplida
- **Antes:** 11-04-2018 · «Queremos aumentar el gasto en un 35%, que el número de becas llegue a los 300.000
  estudiantes y crear 106.000 nuevas plazas para niños y niñas de 0 a 3 años»
- **Después:** pendiente: estadística de gasto público en educación y de becas (Ministerio de Educación) y plazas de
  0-3 creadas con el Plan de Recuperación
- **Búsquedas (25-11-2026):** La Moncloa, nota del 18-03-2026 (gasto público en educación de 2024, provisional):
  71 348,8 millones. 2.ª pasada (a petición del usuario): Sistema Estatal de Indicadores de la Educación 2021, F1.2
  (INEE, educacionfpydeportes.gob.es/inee/dam/jcr:551c2cd3-f9c7-43d4-bfc0-7845882b635e/2021-f1-2.pdf): «El gasto público en
  educación se eleva a 50.660,3 millones de euros para el año 2018». Subida 2018-2024: un 40,8 % en euros corrientes (el
  tuit no dice si es en términos reales; descontando la inflación sería bastante menor). Ministerio, balance del
  09-09-2025 (educacionfpydeportes.gob.es/prensa/actualidad/2025/09/20250909-balanceeducativo.html): beneficiarios de
  becas de 784 422 (2017-2018) a 1 115 334 (2025-2026); con el Plan de Recuperación, «más de 60 000 plazas de 0 a 3 años»;
  escolarización de 0 a 3 años del 55,8 %. El tuit no tiene copia en Web Archive.
- **Notas / veredicto:** débil. «Queremos», sin plazo; las becas se superaron de largo y el gasto, con toda
  probabilidad, también. Solo las plazas de 0 a 3 años se quedan por debajo (más de 60 000 frente a 106 000), y son
  competencia de las comunidades: se cumplen dos de tres objetivos.

### tw-10 · Hitos sobre Podemos e Iglesias (2016)
- **Estado:** débil (decisión del usuario, 25-11-2026: no se añade ningún hito; los casos ya cubren ese «antes» con hitos de 2014 y 2016)
- **Origen:** 2.ª tanda de búsquedas (25-11-2026)
- **Persona / tipo propuesto:** Pedro Sánchez / hitos para `sanchez-no-pactara-con-el-populismo` o
  `pedro-sanchez-seria-un-presidente-del-gobierno-que-no-dormiria`
- **Antes:**
  - 23-06-2016 · «Me puedo entender con Podemos para aprobar un Ingreso Mínimo Vital pero no para que jueces y fiscales
    estén a sueldo de Iglesias y Monedero.» (745888963274117120)
  - 24-06-2016 · «Iglesias antepone el derecho a la autodeterminación y la instrumentalización del poder judicial y la
    policía.» (746257738339094528, entrevista en la SER)
  - 07-03-2016 · «Debajo de todo subyace la apuesta por el derecho de autodeterminación de Cataluña. Es lo que quiere
    Podemos.» (706771245929521152, entrevista en El País)
- **Búsquedas (25-11-2026):** CDX: los tres tuits tienen copia del 21-05-2020 (745888963274117120 también en x.com, 2025).
  YouTube («Pedro Sánchez entrevista Cadena SER junio 2016», «jueces y fiscales a sueldo de Iglesias y Monedero»): no
  aparece la entrevista de la SER; la de El País no se buscó.
- **Notas / veredicto:** el del 23-06-2016 es el más concreto. Ojo: los casos ya tienen hitos de 2014 y 2016 sobre el
  populismo; valorar si aportan algo.

Vistos y sin caso en la 2.ª tanda: la primera llamada «será a Puigdemont para tender puentes» (31-05-2016, coherente con
2023); los tuits sobre Artur Mas y la corrupción de Convergència (2015; Junts no es CDC y el contraste toca corrupción);
el indulto de María Salmerón (2016, lo pidió él).
