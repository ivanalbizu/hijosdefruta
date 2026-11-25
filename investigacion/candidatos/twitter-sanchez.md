# Tuits de Pedro Sánchez en la oposición (prueba del usuario, 25-11-2026)

Petición del usuario: leer @sanchezcastejon antes de llegar al Gobierno (26-07-2014 a 01-06-2018) en busca de
promesas incumplidas y críticas a gobiernos anteriores por lo que después hizo él. Prueba piloto.

Método: búsqueda avanzada de X en Claude in Chrome (`from:sanchezcastejon since:<desde> until:<hasta> <palabras>`,
pestaña «Más reciente»), desplazando la lista y volcando fecha, texto e id de cada tuit; el volcado se mete en el
`body` de la página y se lee con `get_page_text` (la salida de `javascript_tool` se corta hacia los 1000 caracteres).

## Estado de los candidatos (las dos tandas)

| Id | Tanda | Tema | Tipo | Estado | Siguiente paso |
| --- | --- | --- | --- | --- | --- |
| tw-01 | 1.ª | Blindar pensiones y sanidad en la Constitución (2018, programas de 2023 y 2026) | promesa incumplida | **prometedor** | confirmar en el Congreso que nunca se presentó; propuesta de Navarra (2018) |
| tw-09 | 2.ª | «Los que decían que iba a pactar con los independentistas […] ahora callan» (15-04-2016) | hito → `sanchez-gobernabilidad-partidos-independentistas` | por investigar | vídeo o nota del acto de Córdoba; copia en Web Archive |
| tw-08 | 2.ª | Puigdemont: «fuerza moral», «peores hojas», «no es un candidato constitucional» (2017-2018) | hitos → `sanchez-traera-a-puigdemont-a-espana` / amnistía | por investigar | actos de Granada y Fórum Europa; elegir uno o dos |
| tw-10 | 2.ª | Podemos: «jueces y fiscales a sueldo de Iglesias» (2016) | hitos → populismo / «no dormiría» | por investigar | valorar si aporta frente a los hitos de 2014 y 2016 |
| tw-04 | 1.ª | Consejo de Ministros en funciones «para hacer publicidad y propaganda» (Lastra, 2016) | hito → `psoe-junta-electoral-neutralidad-ruedas-de-prensa` | por investigar | fuente original de Lastra |
| tw-02 | 1.ª | «La banca pagará parte de las pensiones» (2018) | promesa incumplida | por investigar | ¿algún impuesto a la banca afectado a pensiones? |
| tw-05 | 1.ª | El «plasma» y las comparecencias de Rajoy (2014-2015) | doble rasero | por investigar | recuento comparable en el Congreso; si no, débil |
| tw-06 | 1.ª | Educación: +35 % de gasto, 300 000 becas, 106 000 plazas de 0-3 (2018) | promesa incumplida | por investigar | datos del Ministerio; probablemente cumplido en becas |
| tw-03 | 1.ª | El recibo de la luz «casi el doble» (2018) | doble rasero | **débil** | — (el IPC solo medía el PVPC hasta 2023; queja, no compromiso) |
| tw-07 | 1.ª | Rajoy y los 17 000 refugiados (2017) | doble rasero | por investigar (baja) | — |

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

### tw-01 · Blindar las pensiones y la sanidad en la Constitución
- **Estado:** prometedor (pendiente: confirmar en el buscador del Congreso que no hubo ningún proyecto ni proposición de
  reforma del art. 50 ni del 43 sobre la sanidad entre la XII y la XV; y qué hizo el PSOE con la propuesta de Navarra)
- **Origen:** tuits 985496713015197696 (15-04-2018), 984502698212028416 (12-04-2018) y 976533324410904576 (21-03-2018)
- **Persona / tipo propuesto:** Pedro Sánchez / promesa incumplida
- **Antes:**
  - 12-04-2018 · tuit: «Nuestro compromiso con la sanidad pública es firme. En cuanto lleguemos al Gobierno la vamos a
    blindar en nuestra Constitución como un derecho fundamental.» https://x.com/sanchezcastejon/status/984502698212028416 ·
    archivo https://web.archive.org/web/20200521074622/https://twitter.com/sanchezcastejon/status/984502698212028416
  - 15-04-2018 · tuit: «Tenéis mi compromiso: vamos a blindar las pensiones en nuestra Constitución, porque blindar las
    pensiones, es blindar la dignidad de nuestros jubilados y jubiladas.» https://x.com/sanchezcastejon/status/985496713015197696 ·
    archivo https://web.archive.org/web/20200521074611/https://twitter.com/sanchezcastejon/status/985496713015197696
  - 21-03-2018 · tuit con su frase en la Asamblea Abierta de Oviedo («blindar constitucionalmente la sanidad, la
    educación, la dependencia y las pensiones»): sin copia en Web Archive; guardarla si se usa.
- **Hitos (la promesa se repite):**
  - Programa del PSOE de 2023 (23J), pág. 170: «Blindaremos el poder adquisitivo de las pensiones con un cambio
    constitucional. Garantizaremos ante cualquier circunstancia el poder adquisitivo de todas las pensiones con arreglo al
    IPC.» https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf (psoe.es devuelve HTML a curl;
    copia https://web.archive.org/web/20230709064011/…; 272 págs., SHA-256
    `02d4972a848250fec9b8b2cffc5aaa78733acb0ac010e79ce1787161f91a42f2`, en `investigacion/material/tw-01/`).
  - Programa del PSOE de 2026 (29N), compromisos 100 (pág. 40) y 365 (pág. 89): «Blindar constitucionalmente el sistema
    público de pensiones y su revalorización conforme al IPC»; el 366: «avanzando en la protección efectiva como derechos
    fundamentales de la salud y la vivienda» (el mismo PDF de cac-29, SHA-256 `e9c83413…`).
  - Mitin de Gijón, octubre de 2026: «En la próxima legislatura reformaremos la Constitución para blindar las pensiones y
    su revalorización conforme al IPC» (solo en ESdiario, 26-10-2026; buscar vídeo del PSOE o nota de psoe.es).
- **Después:** ocho años de Gobierno sin llevar al Congreso ninguna reforma constitucional sobre pensiones ni sanidad
  (pendiente de confirmar, arriba). En cambio, sí impulsó otras: art. 49 (aprobada en 2024), art. 69.3 (Formentera,
  aprobada por el Congreso el 26-03-2026 y el Senado el 22-04-2026, BOCG-15-B-6) y el proyecto del art. 43 sobre el aborto
  (Consejo de Ministros del 07-04-2026, BOCG-15-A-92), este último sin la mayoría de tres quintos asegurada.
- **Justificación del político:** previsible: hace falta mayoría de tres quintos y el PP no la daría. Lo debilita el art.
  43: el Gobierno presentó esa reforma sabiendo que no tenía la mayoría. La revalorización con el IPC sí la aprobó por
  ley (Ley 21/2021): matiz obligatorio en el caso.
- **Búsquedas (25-11-2026):** web («PSOE registra reforma constitucional blindar pensiones artículo 50», «Proyecto de
  reforma constitucional 2026 artículo 43», «reforma del artículo 69», site:congreso.es «artículo 50 de la Constitución»);
  ESdiario 26-10-2026 y Forbes 07-07-2023 leídos con web-fetch (pistas); programas de 2023 y 2026 leídos con pdftexto;
  datos abiertos del Congreso (XV, proyectos y proposiciones de ley: no incluyen las reformas constitucionales, tipos
  100/102); BOCG-12-B-259-1 y 264-1 (copias de Web Archive en `material/tw-01/`): leyes de pensiones, no reformas
  constitucionales. Pista: el Parlamento de Navarra aprobó el 07-06-2018 una proposición de reforma del art. 50 para el
  Congreso (parlamentodenavarra.es/eu/tramite-documento/1136035); falta su número de expediente y qué votó el PSOE.
- **Notas / veredicto:** promesa sin plazo, pero con «en cuanto lleguemos al Gobierno» (sanidad) y repetida en 2023 y
  2026. El paso que le tocaba al Gobierno (aprobar y enviar el proyecto) no se dio, como en mor-04. Precedente:
  `sanchez-suprimir-aforamientos` (allí sí lo presentó). El compromiso de 2026 puede ir también a `/promesas`.

### tw-02 · «La banca pagará parte de las pensiones»
- **Estado:** por investigar
- **Origen:** tuits 953351032129679360 (16-01-2018) y 951538248899317760 (11-01-2018)
- **Persona / tipo propuesto:** Pedro Sánchez / promesa incumplida
- **Antes:** 16-01-2018 · «Mi compromiso es firme: cuando lleguemos al gobierno, la banca pagará parte de las
  pensiones de este país»; 11-01-2018 · impuestos a la banca y a las transacciones financieras «para sostener el
  Sistema público de pensiones»
- **Después:** pendiente: Ley 5/2020 (impuesto sobre transacciones financieras) y Ley 38/2022 (gravamen temporal a la
  banca), ¿con destino a pensiones? La financiación que se aprobó fue el MEI sobre cotizaciones
- **Justificación del político:** pendiente
- **Búsquedas:** solo los tuits
- **Notas / veredicto:** riesgo de contradicción no limpia: hubo impuestos a la banca; falta ver si alguno se afectó a
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
- **Estado:** por investigar (posible hito)
- **Origen:** tuit 692672081901797376 (28-01-2016), frase atribuida a Adriana Lastra
- **Persona / tipo propuesto:** PSOE (Lastra) / doble rasero · hito para `psoe-junta-electoral-neutralidad-ruedas-de-prensa`
- **Antes:** 28-01-2016 · «El gobierno en funciones utiliza el #CMin para hacer publicidad y propaganda. Que vengan al
  #Congreso a comparecer»
- **Después:** las multas de la JEC al presidente y a los ministros por ruedas de prensa en la campaña del 29N (ya en
  el caso)
- **Búsquedas:** solo el tuit; buscar la frase en la fuente original de Lastra (rueda de prensa o Congreso)
- **Notas / veredicto:** la frase es de Lastra citada por la cuenta de Sánchez; como hito iría a nombre de Lastra.

### tw-05 · «Un presidente del Gobierno no puede esconderse tras un plasma» y el Gobierno que más se niega a comparecer
- **Estado:** por investigar
- **Origen:** tuits 669241902911373313 (24-11-2015), 590787862901219328 (22-04-2015), 560137784309346304 (27-01-2015),
  504373454834241536 (26-08-2014)
- **Persona / tipo propuesto:** Pedro Sánchez / doble rasero
- **Antes:** «Rajoy es el Presidente que más se ha negado a comparecer en la Cámara, usa y abusa de su mayoría absoluta
  para no acudir al Congreso» (22-04-2015); «El PP tumba las 26 solicitudes de comparecencia de Rajoy y sus ministros»
  (26-08-2014)
- **Después:** pendiente: solicitudes de comparecencia de Sánchez rechazadas con los votos del PSOE y sus socios
  (Congreso, buscador de iniciativas) y ruedas de prensa sin preguntas
- **Búsquedas:** solo los tuits
- **Notas / veredicto:** necesita recuento comparable en el Congreso; si no, débil.

### tw-06 · Educación: 35 % más de gasto, 300 000 becas y 106 000 plazas de 0 a 3 años
- **Estado:** por investigar
- **Origen:** tuit 984052176531148800 (11-04-2018)
- **Persona / tipo propuesto:** Pedro Sánchez / promesa incumplida
- **Antes:** 11-04-2018 · «Queremos aumentar el gasto en un 35%, que el número de becas llegue a los 300.000
  estudiantes y crear 106.000 nuevas plazas para niños y niñas de 0 a 3 años»
- **Después:** pendiente: estadística de gasto público en educación y de becas (Ministerio de Educación) y plazas de
  0-3 creadas con el Plan de Recuperación
- **Búsquedas:** solo el tuit
- **Notas / veredicto:** «queremos», sin plazo; las becas probablemente se superaron. Comprobar antes de seguir.

### tw-07 · Rajoy y los 17 000 refugiados
- **Estado:** por investigar (baja prioridad)
- **Origen:** tuit 868772463072694273 (28-05-2017)
- **Persona / tipo propuesto:** Pedro Sánchez / doble rasero
- **Antes:** «@marianorajoy : cumple tu compromiso de acoger 17.000 refugiados»
- **Después:** pendiente: reasentamientos y reubicaciones con el Gobierno de Sánchez
- **Notas / veredicto:** el compromiso de 2015 era un cupo europeo con plazo de 2017; sin un compromiso propio
  comparable, débil.

### tw-08 · Hitos sobre Puigdemont y los independentistas (2017-2018)
- **Estado:** por investigar (posibles hitos)
- **Origen:** 2.ª tanda de búsquedas (25-11-2026)
- **Persona / tipo propuesto:** Pedro Sánchez / hitos para `sanchez-traera-a-puigdemont-a-espana` o
  `no-aministia-para-politicos-e-independentistas-catalanes` (los dos casos culminan en la negociación con Junts de 2023)
- **Antes (tuits, sin copia comprobada en Web Archive):**
  - 11-01-2018 · «Un presidente de la Generalitat debe vivir en Cataluña. ¿Con qué fuerza moral va a exigir Puigdemont el
    cumplimiento de las leyes si es incapaz de asumir en primera persona las consecuencias de sus actos políticos?»
    (951537867288973313, en la Asamblea Abierta de Granada)
  - 20-01-2018 · «Puigdemont, si representa algo, es una de las peores hojas de la historia de Cataluña y ya va siendo hora
    de pasar página.» (954705405778759680)
  - 30-01-2018 · «Exigimos a la mayoría parlamentaria independentista que se emancipe del Sr. Puigdemont […] Deben proponer
    un candidato viable, un candidato constitucional para una legislatura constitucional. Y Puigdemont no lo es.»
    (958317643819372544)
  - 31-01-2018 · «Si la única salida que plantea el independentismo se llama Puigdemont, es que no quieren una salida.»
    (958636457903689728, Fórum Europa)
  - 27-10-2017 · «Puigdemont y Junqueras, principales responsables de la fractura y el desgarro de la sociedad catalana.»
    (923940544853790725)
  - 01-12-2017 · «Quien más ha hecho por romper la convivencia y por fracturar la cohesión social ha sido el
    independentismo.» (936675092976807942)
- **Búsquedas:** solo los tuits. Varios llevan etiqueta de un acto (#AsambleaAbiertaGranada, #ForumEuropa): buscar el vídeo
  o la transcripción del acto, que es mejor fuente que el tuit.
- **Notas / veredicto:** opiniones sobre Puigdemont; como caso propio serían débiles, pero como hitos muestran el «antes» de
  la negociación de 2023. El de la «fuerza moral» y las «consecuencias de sus actos» es el que mejor choca con la amnistía.

### tw-09 · Hito: «Aquellos que decían que iba a pactar con los independentistas […] ahora callan»
- **Estado:** por investigar (posible hito)
- **Origen:** 2.ª tanda de búsquedas (25-11-2026)
- **Persona / tipo propuesto:** Pedro Sánchez / hito para `sanchez-gobernabilidad-partidos-independentistas`
- **Antes:** 15-04-2016 · «Aquellos que decían que iba a pactar con los independentistas con tal de ser presidente, ahora
  callan. #Córdoba» (720957364397084672). Encaja entre el hito del 02-03-2016 (investidura) y los de 2019.
- **Búsquedas:** solo el tuit; buscar el vídeo del acto de Córdoba.
- **Notas / veredicto:** es el más limpio de la tanda como hito.

### tw-10 · Hitos sobre Podemos e Iglesias (2016)
- **Estado:** por investigar (posibles hitos)
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
- **Búsquedas:** solo los tuits; las entrevistas (SER, El País) darían la cita completa.
- **Notas / veredicto:** el del 23-06-2016 es el más concreto. Ojo: los casos ya tienen hitos de 2014 y 2016 sobre el
  populismo; valorar si aportan algo.

Vistos y sin caso en la 2.ª tanda: la primera llamada «será a Puigdemont para tender puentes» (31-05-2016, coherente con
2023); los tuits sobre Artur Mas y la corrupción de Convergència (2015; Junts no es CDC y el contraste toca corrupción);
el indulto de María Salmerón (2016, lo pidió él).
