# Candidatos · revisión de los políticos con caso (22-11-2026)

Parte del registro de candidatos: resumen y criterios en [../candidatos.md](../candidatos.md).

> Cerrados (descartados, publicados, duplicados…): [cerrados/revision-personas.md](cerrados/revision-personas.md). Búsqueda: `grep -r` sobre `investigacion/candidatos/`.

## Origen: petición del usuario (22-11-2026)

Repasar a todos los políticos que ya tienen al menos un caso (32 personas) con dos objetivos:

1. **Vida personal** ([../vida-personal.md](../vida-personal.md)): si comentaron la vida personal o
   familiar de otros políticos (A) o pidieron respeto para la suya (B). Los cruces A × B de una misma
   persona se registran aquí como candidatos; lo demás se anota solo en vida-personal.md.
2. **Indicios generales** de cada persona que no estuvieran ya en el registro (Morant, Puente, Bolaños,
   Saiz y Marlaska ya tenían búsqueda propia y no se repiten).

El usuario no pudo revisar esta tanda en la misma sesión: todo está por decidir. Casi todos los cruces de
vida personal chocan con las reglas que bloquean (vida familiar y causas abiertas: la de la pareja de
Ayuso y la de Begoña Gómez), así que van como `bloqueado` y los decide el usuario.

**Material revisado (22-11-2026)** — en el scratchpad de la sesión, no en el repositorio:
- Transcripciones de las ruedas de prensa del Consejo de Ministros en La Moncloa, 2018-2026 (lista de URL
  sacada del índice CDX de Web Archive: 359 páginas).
- Intervenciones del presidente en La Moncloa, 2018-2026 (994 páginas, mismo método).
- Diarios de Sesiones del Pleno del Senado de la XIV y la XV legislatura (`DS_P_14_1` a `_135`, `DS_P_15_1` a `_139`, descargados de senado.es).
- Diarios de Sesiones del Pleno del Congreso de la XV (copias de Web Archive con `id_`, 218 en el índice CDX; algunas fallaron). **La XIV del Congreso (2019-2023) quedó a medias** al cerrar la sesión: falta, por ejemplo, la sesión de control de febrero de 2022 (el hermano de Ayuso).
- Cómo repetirlo: lista de URL con el CDX de Web Archive (`web.archive.org/cdx/search/cdx?url=<prefijo>&matchType=prefix&collapse=urlkey&filter=statuscode:200`), descarga con curl y texto con `pdftexto.mjs --todo`; búsqueda por expresiones regulares atribuyendo cada coincidencia al último orador («El señor/La señora … :»).
- Búsquedas web (solo como pistas) por persona.

## Vida personal: cruces A × B de una misma persona

Contexto común de rp-01 a rp-06: entre 2024 y 2026 varios ministros hablan en el Senado y en La Moncloa del
hermano, la pareja o la hermana de dirigentes del PP (Ayuso, Feijóo) y, en las mismas fechas o después,
piden respeto para la familia del presidente (Begoña Gómez, David Sánchez) o para la suya. Lo que dicen de
la pareja de Ayuso gira en torno a su causa por fraude fiscal (abierta; procesado en 2025, según el propio
Marlaska en el Senado el 10-06-2025) y lo que dicen de Begoña Gómez, en torno a la suya (abierta, con
jurado popular). El hermano de Ayuso tuvo dos investigaciones archivadas (Anticorrupción y Fiscalía
Europea, según prensa: comprobar). La hermana de Feijóo no está investigada: es el único «A» sin causa.

**Matiz que debilita todos los cruces:** casi siempre el «A» no habla de la vida privada del familiar sino de
sus negocios con una Administración del PP (contratos, comisiones, fraude fiscal), y el «B» defiende que no
se persiga a alguien *por ser* familiar. La justificación previsible es esa: «no es por ser familiar, es por
lo que hizo». El contraste más limpio es el de quien pide responsabilidades a la dirigente *por los hechos de
sus familiares* (Puente, rp-01) frente a quien luego dice que los familiares no deben ser «perseguidos».

Precedente: usr-01 (Mínguez, en espera) y arch-16. Criterio de «vida familiar»: `en espera` o `bloqueado`.

### rp-01 · Puente: «toda la familia de la señora Ayuso» y «ni sus familiares, sean perturbados»
- **Estado:** bloqueado (vida familiar y dos causas abiertas); el más limpio de la serie
- **Origen:** revisión del usuario de los políticos con caso (22-11-2026); sustituye al tuit del «testaferro con derecho a roce» (14-03-2024, solo prensa) que constaba en vida-personal.md
- **Persona / tipo propuesto:** Óscar Puente / doble rasero
- **Antes (A):** 12-03-2024 · Senado, Pleno, pregunta de Serrano Sánchez-Capuchino (PP) sobre Koldo García: «Mire, patrón de conducta, el que se observa en toda la familia de la señora Ayuso. […] aprovechamiento de la relación familiar de parentesco con la presidenta de la Comunidad de Madrid para la obtención de contratos y, lo último, lo último, señor Serrano, una persona con la que convive que hoy ha sido acusada de fraude fiscal y que ha pagado con el producto de ese dinero el piso en el que reside la señora Ayuso» (p. 59) y «vaya usted a la Asamblea de Madrid y pregúntele a la mujer que tiene usted delante […] cuál es su responsabilidad en los hechos cometidos por sus familiares» (p. 60) · DS del Senado, XV, núm. 20 (https://www.senado.es/legis15/publicaciones/pdf/senado/ds/DS_P_15_20.PDF, SHA-256 e6070287cbe9fe7e03d64eb20913aa59bc357e2bc3121c9fc040cb9524c99044). También 19-03-2024 (DS_P_15_21, p. 26): Ayuso, «partícipe a título lucrativo del producto del delito cometido por su pareja»; 17-09-2024 (DS_P_15_45, p. 30): «el novio defraudador de la señora Ayuso». Congreso, 20-03-2024 (DSCD-15-PL-34, p. 79, copia de Web Archive del 11-04-2024 `https://web.archive.org/web/20240411151529id_/https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-34.PDF`, SHA-256 638c6cc66312f579bf894b4355877a2150a655b6f7f7d16297424d4903c65e37): reconoce el tuit, «yo utilizo una expresión sarcástica refiriéndome al novio —no sé si ya exnovio— o pareja de la señora Ayuso, llamándole testaferro con derecho a roce», y añade sobre Ayuso que «ella se mete en la cama con quien quiere»; en la misma sesión (p. 71), «La pareja de la señora Ayuso fue denunciada […] por fraude fiscal»
- **B propio:** 10-09-2024 · Senado (DS_P_15_44, p. 103), a un senador del PP: «los ejemplos que usted ha puesto de mi vida privada. Tres casos falsos, publicados por tres panfletos, de los que usted se hace eco. Algún día les tocará a ustedes sufrir en sus carnes exactamente lo mismo»
- **Después (B):** 14-04-2026 · rueda de prensa del Consejo de Ministros, sobre Begoña Gómez: «ni los cargos públicos, ni sus familiares, sean perturbados o perseguidos, como consecuencia de ser cargos públicos, o de ser familiares de cargos públicos» · transcripción de La Moncloa (ya en vida-personal.md)
- **Justificación del político:** previsible: a los familiares de Ayuso se les señala por sus contratos y por un fraude reconocido por su abogado, no por ser familiares. El 20-03-2024, en una entrevista (solo prensa), explicó que usaba «testaferro» en sentido figurado
- **Búsquedas (22-11-2026):** Senado, Plenos de la XV (`DS_P_15_1` a `_150` aprox.) con «familia de la señora», «su pareja», «novio», «hermano de la señora», «sus familiares», «vida privada»; ruedas de prensa de La Moncloa 2018-2026; web (Vozpópuli, El Español, The Objective) para el tuit
- **Notas / veredicto:** las tres partes tienen fuente primaria. Falta: el Congreso (descarga de Web Archive en curso al cerrar la sesión) y comprobar que en la rueda del 14-04-2026 no matiza en el mismo acto. Decide el usuario (regla de causas abiertas: solo se citarían sus palabras, sin resumir ninguna de las dos causas).

### rp-02 · Alegría: «en política no cabe todo» (Begoña Gómez) y «el novio actual» de Ayuso, una semana después
- **Estado:** bloqueado (vida familiar y causas abiertas)
- **Origen:** revisión por persona (22-11-2026)
- **Persona / tipo propuesto:** Pilar Alegría (ministra de Educación y portavoz del Gobierno) / doble rasero
- **B:** 02-04-2024 · rueda de prensa del Consejo de Ministros, preguntada por una carta de recomendación de Begoña Gómez: «el procedimiento fue impecable […] en política no cabe todo, en política no cabe todo y digo esto porque estamos viendo cómo el Partido Popular está empeñado en embarrar la política» · La Moncloa (`consejodeministros/ruedas/Paginas/2024/rpcm02042024.aspx`). 30-09-2025 · rueda de prensa: «se demostrará lo que ya sabíamos, que Begoña Gómez es inocente […] asistentes, las parejas de los presidentes del Gobierno han tenido siempre» (`…/2025/20250930-transcripcion-rueda-prensa-ministros.aspx`)
- **A:** 09-04-2024 · Senado (DS_P_15_25, p. 45, SHA-256 d9739aa4bfbf36e5585adf801afe50cddddc8f04e3703b68af8b381e7a402f1b): «una nunca se puede encontrar con su ex. Oiga, curiosidades de la vida, la semana pasada, un compañero suyo, el senador de la Coca-Cola, precisamente se encuentra casualmente […] no con el ex, sino con el novio actual. Y en esa conversación seguro que hablarían de eso de que Hacienda somos todos». 11-02-2025 · Senado (DS_P_15_66, p. 19): «La luna se llama Alberto González Amador, también conocido como… […] Alberto Quirón, un presunto defraudador». Ruedas de prensa: 28-11-2024 («Alberto González Amador, pareja de la señora Ayuso», «tenía reconocido dos delitos fiscales»), 07-01-2025 («la pareja de la presidenta Ayuso, que reconoce haber cometido dos delitos») y 14-01-2025 («el origen del delito está donde está y está en la pareja de la señora Ayuso»)
- **Justificación del político:** el contexto del fiscal general (todas las frases de 2024-2025 sobre la pareja de Ayuso salen al hilo de su imputación)
- **Búsquedas:** como rp-01
- **Notas / veredicto:** el contraste más vistoso por la cercanía (02-04 y 09-04-2024), pero las dos partes dependen de causas abiertas. Comprobar en el vídeo del Senado a quién se refiere «su ex».

### rp-03 · Saiz: «dañar al presidente […] a través de su entorno familiar» y la pareja de Ayuso, «delincuente confeso»
- **Estado:** bloqueado (vida familiar y causas abiertas). Reabre en parte sai-05 (descartado por el usuario por falta de frases de Saiz sobre familiares del PP: había una en el Senado)
- **Origen:** revisión por persona (22-11-2026)
- **Persona / tipo propuesto:** Elma Saiz / doble rasero
- **A:** 16-12-2025 · Senado (DS_P_15_108, p. 73, SHA-256 6c7a95f052e70bcdbb6827df7d1934d637a83056934cb1e576099bbc3887871e): «como hace la señora Ayuso justificando lo injustificable de su pareja, pese a que él mismo dijo en sede judicial ser el delincuente confeso del Reino de España»
- **B:** 14-07-2026 · rueda de prensa, sobre la condena del hermano del presidente: «esta causa tiene un único origen, que es dañar al presidente del Gobierno a través de su entorno familiar»; mismo día, Begoña Gómez: «la obsesión, de la persecución, del acoso político» (ya en vida-personal.md). 22-09-2026 · rueda de prensa: «el escarnio público que está sufriendo Begoña Gómez […] simplemente por ser la mujer de un presidente progresista, por ser la mujer de Pedro Sánchez» (`…/2026/20260922-transcripcion-rueda-de-prensa-ministros.aspx`)
- **Notas / veredicto:** la frase del Senado se le escapó a la revisión de sai-05, que solo miró ruedas de prensa. Actualizar sai-05 si el usuario lo reabre. La causa de David Sánchez tiene sentencia de la Audiencia (julio de 2026, según la propia rueda de prensa): comprobar si es firme.

### rp-04 · Bolaños: la pareja de Ayuso, «ciudadano ejemplar» y «delincuente confeso», y las querellas a «familiares de progresistas»
- **Estado:** bloqueado (vida familiar y causas abiertas; además, González Amador demandó a Sánchez y a Bolaños por «delincuente confeso»: no se informa de esa demanda)
- **Origen:** revisión por persona (22-11-2026); vida-personal.md tenía su «B» y el «A» sin buscar
- **Persona / tipo propuesto:** Félix Bolaños / doble rasero
- **A:** 22-10-2024 · Senado, interpelación sobre el fiscal general (DS_P_15_51, p. 45, SHA-256 4f35854c6d5b4a88cd8caa3d811a47c90785dd9df828204145acca7238fe0acb): «Hay un ciudadano ejemplar que defrauda 350 000 euros a la Hacienda Pública […] Este ciudadano ejemplar —o su entorno político, mejor dicho, el jefe de gabinete de su pareja— difunde un bulo». Solo prensa, pendientes de fuente primaria: «delincuente confeso» (octubre de 2024) y que Ayuso, «su pareja» y Miguel Ángel Rodríguez van a ir «pa'casa» (01-02-2025, Noticias de Navarra)
- **B:** 07-07-2026 · rueda de prensa (pp. 17-18): querellas «contra personas simplemente por ser progresistas, o ser familiares de progresistas» (ya en vida-personal.md). 24-09-2025 · Congreso (DSCD-15-PL-139, p. 16, SHA-256 dd76a6fd3da82190d73cc3b68336fb8c187d8b6c2b7378e42932fb3221be42a9): «el Partido Popular haya traspasado todas las líneas rojas en la persecución de personas honestas solo por ser familiares del presidente del Gobierno»
- **Notas / veredicto:** débil incluso sin la regla: el «A» habla de un fraude reconocido por el abogado de la pareja, no de su vida privada.

### rp-05 · Sánchez: «pareja de un delincuente confeso» frente a «no es mi mujer, es Begoña Gómez»
- **Estado:** bloqueado (vida familiar y causas abiertas; González Amador demandó a Sánchez por «delincuente confeso»: no se informa de esa demanda)
- **Origen:** revisión por persona (22-11-2026), intervenciones del presidente en La Moncloa
- **Persona / tipo propuesto:** Pedro Sánchez / doble rasero
- **A (todo en `lamoncloa.gob.es/presidente/intervenciones/Paginas/…`):**
  - 21-02-2024 · rueda de prensa tras el viaje a Marruecos (`2024/202240221-sanchez-marruecos.aspx`): Feijóo «se aupó a la presidencia del Partido Popular después de una denuncia del anterior líder […] sobre un caso de corrupción de la presidenta de la Comunidad de Madrid, de su hermano, en concreto, que no ha sido sin duda alguna ni investigado ni tampoco recriminado por parte de la actual dirección del Partido Popular»
  - 13-03-2024 · sesión de control del Congreso (`2024/20240313-sanchez-sesion-control-congreso.aspx`): recuerda que el PP pidió la dimisión de María Gámez «por un caso que afectaba a su pareja» y «Le exijo, señoría, que pida la dimisión de la señora Ayuso»
  - 17-10-2024 · rueda de prensa tras el Consejo Europeo (`2024/20241017-sanchez-rueda-prensa-consejo-europeo.aspx`): «el jefe de Gabinete de la presidenta de la Comunidad de Madrid, a la sazón pareja de este delincuente confeso»; «la presidenta de la Comunidad de Madrid, que es pareja de un delincuente confeso»; «un delincuente confeso que es la pareja de la señora Ayuso»
  - 23-12-2024 · balance del año: Ayuso no ha asumido «ninguna responsabilidad política, por el caso de su novio, de su pareja»; 18-06-2025 · sesión de control: «el gobierno de la señora Ayuso siendo investigado por el novio, por el hermano»; 18-06-2026 · tras el Consejo Europeo: «las noticias que acabamos de conocer, por ejemplo, de la pareja de la señora Ayuso»
- **B:**
  - 29-04-2024 · declaración institucional (`2024/20240429-declaracion-institucional.aspx`): «si merecía la pena soportar el acoso que desde hace diez años sufre mi familia»
  - 22-05-2024 · Congreso: «soy muy consciente de por qué me atacan a mí y a mi familia»; 29-10-2024, 14-10-2025 (SER) y 07-11-2025: la inocencia de «mi hermano» y «mi mujer»
  - 24-06-2026 · Congreso, comparecencia (DSCD-15-PL-196, copia de Web Archive del 13-10-2026 `https://web.archive.org/web/20261013140422id_/https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-196.PDF`, SHA-256 e08f5c74d0b8e6d385a4bd0638f57d1f82d4e653afe23a0270da9e179e112062): **A y B en la misma sesión.** B: «yo no hago lo que otros sí me hicieron a mí, sí hicieron a mi familia» (p. 9); «los casos abiertos contra mi familia, contra mi esposa y contra mi hermano. Podrán comprender, señorías, que para mí no es fácil hablar de ellos, porque afectan a personas…» (p. 10). A, en la réplica: «el señor González Amador, la actual pareja de la señora Ayuso; ese, según el Partido Popular, ciudadano particular» (p. 54) y «Está el caso del novio de la señora Ayuso, quien consiguió a Quirón contratos con la Comunidad de Madrid por valor de 4 millones y medio de euros y que lo facturó a través de una empresa de estética. Eso, señor Feijóo, sí que es amor» (p. 56)
  - 28-07-2026 · balance del curso (`2026/20260728-sanchez-rdp-balance-curso-cumpliendo.aspx`): «Begoña Gómez es mi mujer y David Sánchez es mi hermano, pero son Begoña Gómez y David Sánchez […] no es mi mujer, es Begoña Gómez. Lo digo porque en muchas ocasiones con ese tipo de estrategia […] lo que se hace es deshumanizar a personas que tienen un pasado, de integridad, de profesionalidad […] simplemente porque yo soy presidente del Gobierno»
- **Justificación del político:** el 17-10-2024 lo dice al hilo de la imputación del fiscal general; «delincuente confeso» se apoya en el escrito del abogado de González Amador que reconocía dos delitos fiscales (según el propio Sánchez y prensa)
- **Notas / veredicto:** la sesión del 24-06-2026 es la pieza más fuerte: en la misma comparecencia pide comprensión porque los casos de su mujer y su hermano «afectan a personas» y, en la réplica, ironiza sobre la pareja de Ayuso («Eso, señor Feijóo, sí que es amor»). Además, el contraste de forma: durante dos años presenta a González Amador como «la pareja de la señora Ayuso» y le pide responsabilidades a ella, y en 2026 reprocha que a Begoña Gómez se la nombre como «mi mujer» porque eso «deshumaniza». Sobre la frase del 21-02-2024 (el hermano de Ayuso «ni investigado»): no sirve como falsedad, porque «por parte de la actual dirección del Partido Popular» puede referirse a los dos verbos; Anticorrupción archivó en 06-2022 y la Fiscalía Europea en 03-2023 (prensa; las notas oficiales están por buscar).

### rp-06 · Montero (María Jesús): el hermano de Ayuso y la hermana de Feijóo frente a «todos tenemos derecho a nuestra intimidad»
- **Estado:** débil (el «B» es sobre acoso en los domicilios, no sobre hablar de familiares) y bloqueado (vida familiar)
- **Origen:** revisión por persona (22-11-2026)
- **Persona / tipo propuesto:** María Jesús Montero / doble rasero
- **B:** 22-05-2020 · rueda de prensa del Consejo de Ministros, como portavoz, tras el ataque a la vivienda de Idoia Mendia: «que no se moleste en su entorno más íntimo, en su entorno familiar se llame señora Mendía, se llame señor Avalos, o se llame señor Iglesias. Todos tenemos derecho a nuestra intimidad» (`…/2020/rpcm22052020.aspx`)
- **A:** Senado, XV: 05-03-2024 (DS_P_15_18, p. 13, SHA-256 6359d219cb0e40cf434c77139b46917b15dc477e602c0605730ddcec6e50865b): «¿Va a pedirle usted la dimisión a la señora Ayuso, después de que su hermano se enriqueció en el peor momento de la pandemia?» y p. 16, «el hermano de Ayuso, según sus palabras, ¿es una persona de mal vivir?»; 19-03-2024 (DS_P_15_21, pp. 10 y 12), la pareja de Ayuso; 09-04-2024 (DS_P_15_25, p. 14): «¿Conocía el señor Feijóo que, mientras él era presidente, la empresa de la que era directiva su hermana contrató con la Junta de Galicia un montante de 37 millones de euros?»; 24-09-2024 (DS_P_15_47, pp. 15-16): «el único que ha confesado un delito fiscal […] el novio de la señora Ayuso». La frase de prensa «tenga un hermano y ahora un novio» (12-03-2024) **no está** en el DS del Senado de ese día: buscar en otro acto
- **Notas / veredicto:** la hermana de Feijóo no tiene causa abierta, así que esa parte se podría citar; pero el «B» de 2020 condena el acoso físico en las casas, no hablar de los negocios de los familiares. Sin un «B» de Montero sobre Begoña Gómez (buscar), no hay contraste limpio.

### rp-07 · Irene Montero: el cámara de Canal Red en casa del hermano de Ayuso y «el acoso que mi familia ha sufrido»
- **Estado:** débil (solo prensa) y bloqueado (vida familiar)
- **Origen:** revisión por persona (22-11-2026)
- **Persona / tipo propuesto:** Irene Montero (ministra de Igualdad) / doble rasero
- **Antes / después (mismo acto):** 20-05-2023 · Rivas-Vaciamadrid, a los medios (Onda Vasca, sin vídeo ni agencia citada): «ojalá nadie más tenga que sufrir nunca el tipo de acoso» que su familia «ha sufrido»; preguntada por Canal Red y el cámara enviado al domicilio de Tomás Díaz Ayuso, no lo condena: «Creo que el problema es que, en este país, a la derecha y a la extrema derecha les preocupa más una lona o una camiseta que la corrupción»
- **Notas / veredicto:** falta el vídeo (Europa Press, canal de Podemos). Matiz: Canal Red no es de Montero (lo dirige Iglesias, su pareja) y ella no dice nada del cámara, solo esquiva. Si apareciera el vídeo con la pregunta completa, el silencio ante lo mismo que denunció podría ser un doble rasero por hechos (precedente sup-19, Iglesias y los escraches).

### rp-08 · PSOE: la familia de Feijóo (Eulen) frente a la familia del presidente
- **Estado:** bloqueado (vida familiar; la parte de Begoña Gómez, causa abierta)
- **Origen:** revisión por persona (22-11-2026)
- **Persona / tipo propuesto:** PSOE / doble rasero del partido (precedente usr-07)
- **A:** agosto-octubre de 2024 · ofensiva del PSOE sobre los contratos de la Xunta con Eulen, de la que es directiva en Galicia Micaela Núñez Feijóo, hermana de Feijóo, y sobre una prima de Feijóo que adjudicó contratos (vídeo del PSOE con Esther Peña, «muchos millones de dinero público circulando en la familia»; anuncio de Ferraz del 16-08-2024; Peña en Ferraz, octubre de 2024, llevar a Feijóo a los tribunales). Diana Morant, en Xàtiva (agosto de 2024, prensa): el PSOE hará «todo lo posible» para que se investiguen «los casos que afectan al entorno de Feijóo y Ayuso». Montero en el Senado, 09-04-2024 (rp-06). Todo solo prensa salvo el Senado: buscar los vídeos en el canal de YouTube del PSOE
- **B:** Puente (14-04-2026), Bolaños (07-07-2026), Saiz (14-07 y 22-09-2026): ver rp-01, rp-03 y rp-04
- **Notas / veredicto:** la hermana de Feijóo no está investigada, así que el «A» no choca con la regla de causas abiertas; el «B» sí.

### rp-15 · Redondo: «el fraude del novio de la señora Ayuso» y «el acoso y derribo […] a toda la familia del presidente»
- **Estado:** bloqueado (vida familiar y causas abiertas)
- **Origen:** revisión por persona (22-11-2026), Senado
- **Persona / tipo propuesto:** Ana Redondo / doble rasero
- **A:** 11-02-2025 · Senado (DS_P_15_66, p. 32, SHA-256 8c1604f7e65672fe2a834f91b659de2a0fde21ae70f048a40ffc0d9b74bfaf38): «en medio del fraude del novio de la señora Ayuso, con 350 000 euros defraudados a todos los españoles y a todas las españolas». 17-06-2025 (DS_P_15_86, p. 28, SHA-256 eeed47daaf948c9897e2fa0a2f4c0a074c51b96feda5e1001e3f2078e2a36e2d): «el novio de Ayuso, a ese presunto delincuente»
- **B:** 11-06-2024 · Senado (DS_P_15_37, p. 54, SHA-256 701064a07457269f7394842eb8c60e84bbc78aa7cf7d446376198ff45ecd8899): «inventando un caso que no existe contra su mujer y, por extensión, contra toda su familia». 25-02-2025 (DS_P_15_68, p. 30, SHA-256 f3c55551361ecd6701bbfa30954466a35105d936b922d3b64dc86e66c94422da): «Rectificaré cuando ustedes rectifiquen el acoso y derribo al Gobierno de España, y especialmente a la mujer del presidente del Gobierno, a la mujer del presidente y a toda la familia del presidente del Gobierno»
- **Notas / veredicto:** el orden es A (11-02-2025) → B (25-02-2025), dos semanas, el mismo foro y la misma ministra. Mismo matiz que el resto de la serie (el «A» es sobre un fraude fiscal, no sobre vida privada) y las dos causas abiertas.

## Indicios generales por persona

### rp-09 · Puigdemont: dejar la «política activa» si no es investido
- **Estado:** por investigar
- **Origen:** revisión por persona (22-11-2026)
- **Persona / tipo propuesto:** Carles Puigdemont / promesa incumplida
- **Antes:** 09-04-2024 · acto de precampaña (según prensa: Ara, 3Cat, NacióDigital, El Independiente): dejará la política activa si no es investido president; volverá a Cataluña para el debate de investidura «guanyi o no»; no será jefe de la oposición. Matiz en la misma intervención: «Faré política tota la vida» (NacióDigital). Fuente primaria pendiente: vídeo del acto en el canal de Junts
- **Después:** 12-05-2024, no es investido (Illa, 08-08-2024); 27-10-2024, reelegido presidente de Junts en el congreso de Calella con el 90,18 % (prensa; buscar el acta o la nota de Junts)
- **Justificación del político:** Comín: la promesa se refería a los cargos institucionales («no vol dir que es retiri de la política»). Volvió a Barcelona el 08-08-2024, pero no entró en el Parlament
- **Notas / veredicto:** depende de qué entendía por «política activa» en el mismo acto: hay que oírlo entero antes de proponer (criterio «se precisa en el mismo acto»).

### rp-10 · Calvo: la exhumación de Franco, «antes de final de año con toda seguridad» (2018)
- **Estado:** débil
- **Origen:** revisión por persona (22-11-2026), ruedas de prensa de La Moncloa
- **Persona / tipo propuesto:** Carmen Calvo (vicepresidenta) / promesa incumplida
- **Antes:** 24-08-2018 · rueda de prensa del Consejo de Ministros: «antes de final de año habremos culminado todo el procedimiento administrativo que nos permite la exhumación de los restos de Franco, como decía desde el principio, antes de final de año con toda seguridad» (`…/2018/cmrp20180824.aspx`)
- **Después:** 15-03-2019 · el Consejo de Ministros «ha concluido el procedimiento» y fija la reinhumación para el 10-06-2019 (`…/2019/cpr15032019.aspx`); el Supremo la suspende y la exhumación es el 24-10-2019
- **Justificación del político:** plazos de alegaciones de la familia y autorizaciones de otras Administraciones (ella misma los cita el 24-08-2018)
- **Notas / veredicto:** el retraso es de dos meses y medio y en parte ajeno (alegaciones). Poco valor; se anota para no volver a buscarlo.

### rp-11 · Díaz: la jornada de 37,5 horas «en 2025»
- **Estado:** por investigar
- **Origen:** revisión por persona (22-11-2026)
- **Persona / tipo propuesto:** Yolanda Díaz / promesa incumplida (precedente bol-01: reformas prometidas para la legislatura que no salen)
- **Antes:** 30-04-2024 · rueda de prensa del Consejo de Ministros: una modificación del artículo 34 del Estatuto de los Trabajadores «con el alcance de la reducción de la jornada el año que viene a 37 horas y media» (`consejodeministros/ruedas/Paginas/2024/RPCM20240430.aspx`). 04-02-2025 · rueda de prensa tras aprobar el anteproyecto: «pasamos de tener una jornada máxima legal de 40 horas a 37 horas y media» (`…/2025/04022025-RdP-consejo-ministros.aspx`). Otras frases por buscar (acuerdo PSOE-Sumar de octubre de 2023; comparecencia en el Congreso del 22-01-2024, nota de La Moncloa `serviciosdeprensa/notasprensa/trabajo14/Paginas/2024/220124-diaz-legislatura-reduccion-jornada.aspx`; ruedas de prensa de 2024-2025)
- **Después:** 10-09-2025 · el Congreso aprueba las enmiendas a la totalidad de PP, Vox y Junts y el proyecto decae (DS del Congreso, pendiente); Díaz: «Será ley». En las ruedas de prensa posteriores (hasta el 17-11-2026) no hay un segundo proyecto: el 28-04-2026 Díaz habla de la reducción de jornada como batalla perdida en las Cortes («hay batallas que se pierden en las Cortes Generales, pero están ganadas en la calle»)
- **Justificación del político:** la mayoría parlamentaria (Junts) se lo tumbó; el Gobierno sí lo aprobó y lo llevó al Congreso
- **Notas / veredicto:** como en bol-01, la promesa es de la ministra y el resultado lo decide el Congreso: el matiz debe recogerlo.

### rp-12 · Albares: Edmundo González y la residencia del embajador
- **Estado:** débil
- **Origen:** revisión por persona (22-11-2026)
- **Persona / tipo propuesto:** José Manuel Albares / falsedad
- **Antes:** 09-2024 · Exteriores: «El Gobierno de España no tiene nada que ver con cualquier documento o negociación entre Edmundo González y el Gobierno de Venezuela»; el embajador «no se inmiscuyó en nada» (prensa)
- **Después:** González dice que Jorge y Delcy Rodríguez le presentaron en la residencia del embajador un documento que debía firmar para salir; Delcy Rodríguez habla de «amplias conversaciones»
- **Notas / veredicto:** el «después» es la palabra de González y del Gobierno venezolano, no un hecho documentado. Sin fuente oficial que contradiga a Albares, no hay caso. En el Senado (09-09-2025, DS_P_15_90, p. 19) vuelve a citar a González.

### rp-13 · Darias: «no hemos tenido que volver sobre nuestros pasos» y la mascarilla en exteriores
- **Estado:** débil (cambiaron los hechos: ómicron)
- **Origen:** revisión por persona (22-11-2026), ruedas de prensa
- **Persona / tipo propuesto:** Carolina Darias / cambio de postura
- **Antes:** 03-12-2021 · rueda de prensa: «España es el país que ha mantenido la mascarilla obligatoria en interiores y en exteriores, si no se guarda la distancia. No hemos tenido que volver sobre nuestros pasos porque es que nunca le hemos dejado de ser obligatoria» (`…/2021/rpcm20211203.aspx`)
- **Después:** 23-12-2021 · el Consejo de Ministros aprueba el real decreto-ley que hace obligatoria la mascarilla al aire libre: «para volver a retomar la obligatoriedad de las mascarillas en el exterior» (`…/2021/rpcm23122021.aspx`)
- **Notas / veredicto:** criterio «sin que hayan cambiado los hechos de fondo»: aquí cambiaron (ómicron). Se anota para no volver a buscarlo.

### rp-14 · Isabel Rodríguez: la Ley del Suelo
- **Estado:** débil
- **Origen:** revisión por persona (22-11-2026)
- **Persona / tipo propuesto:** Isabel Rodríguez (ministra de Vivienda) / promesa incumplida
- **Antes:** 22-02-2024 · anuncia que llevará la modificación al Consejo de Ministros en marzo (nota de La Moncloa `serviciosdeprensa/notasprensa/vivienda-agenda-urbana/Paginas/2024/220224-rodriguez-modificacion-ley-suelo.aspx`); 02-07-2024, otra nota
- **Después:** mayo de 2024, el Gobierno no la lleva al Pleno por falta de apoyos (Sumar, según ella, «absoluta ignorancia»); en enero de 2026, sigue bloqueada (prensa)
- **Notas / veredicto:** depende de la mayoría parlamentaria y el propio Gobierno sí la aprobó. Solo valdría una frase con plazo de aprobación en las Cortes.

### rp-16 · Promesas con plazo menores en las ruedas de prensa (Calvo, Raquel Sánchez)
- **Estado:** débil (plazos de trámites del Gobierno, retrasos cortos o sin comprobar)
- **Origen:** revisión por persona (22-11-2026): búsqueda en las ruedas de prensa de 2018-2026 de «antes de final de año», «antes del verano», «en esta legislatura» y variantes (88 fragmentos; casi todos balances o plazos cumplidos)
- **Calvo:** 08-09-2020 · al presentar el Plan Anual Normativo: «Habrá una ley de formación profesional antes de final de año» (`…/2020/rpcm08092020.aspx`). Comprobar cuándo pasó el anteproyecto por el Consejo de Ministros; la Ley Orgánica 3/2022 es del 31-03-2022
- **Raquel Sánchez:** 10-12-2021 · Ley de Vivienda: «llevarlo a Consejo de Ministros, la segunda lectura antes de que finalice el año» (`…/2021/rpcm10122021.aspx`); el proyecto se aprobó el 01-02-2022 (de memoria: comprobar en el BOCG). Retraso de un mes
- **Notas / veredicto:** se anotan para no repetir la búsqueda; ninguno parece caso. Lista completa de fragmentos: regenerable con `buscar.py` sobre las transcripciones (ver «Material revisado»).

