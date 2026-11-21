---
name: candidatos
description: Criba e investiga posibles casos para hijosdefruta a partir de una pista (una URL, una hemeroteca, un fact-check, un listado de otra IA, una idea o un vídeo del usuario) o de un candidato ya registrado (arch-, gem-, sup-, ras-…). Úsala cuando el usuario pase una pista, pida evaluar o investigar candidatos o retome uno. Registra cada candidato en investigacion/candidatos/ y no crea casos; eso lo hace /publicar-caso cuando el usuario da el visto bueno.
---

# Cribado e investigación de candidatos

Objetivo: convertir pistas en casos que cumplan las reglas editoriales de [CLAUDE.md](../../../CLAUDE.md),
**sin perder casos buenos por descartarlos demasiado pronto** y sin proponer nada que no se pueda probar
con fuente primaria.

Skills relacionadas: [/fuentes-primarias](../fuentes-primarias/SKILL.md) (dónde buscar y cómo descargar,
leer y archivar), [/transcribir](../transcribir/SKILL.md) (vídeos y audios), [/bandeja](../bandeja/SKILL.md)
(rastreo diario) y [/publicar-caso](../publicar-caso/SKILL.md) (crear el caso).

**Alcance:** el Gobierno actual y los partidos que lo sostienen o votaron la investidura (PSOE, Sumar,
Podemos, ERC, Junts, EH Bildu, PNV, BNG, Coalición Canaria), con sus cargos actuales o anteriores. Lo que
solo afecta a otros partidos se anota en una línea como `fuera de alcance`, sin investigar.

## Antes de empezar

El registro está partido por origen: [investigacion/candidatos.md](../../../investigacion/candidatos.md)
tiene el resumen de estados y la tabla de archivos; cada origen vive en
`investigacion/candidatos/<origen>.md` con su prefijo (`arch-`, `gem-`, `sup-`, `ras-`…). Los cerrados
(descartados, publicados, duplicados…) están en `investigacion/candidatos/cerrados/<origen>.md`.

1. Busca el tema y la persona en el registro y en los casos:
   `grep -ril <término> investigacion/candidatos/ src/content/casos/` (incluye `cerrados/`). Puede estar
   investigado, descartado o publicado ya.

**Gastar poco:** todo lo que se lee queda en el contexto hasta el final de la sesión.
- Los registros no se leen enteros: `grep -rn -A 25 '^### cac-27 ' investigacion/candidatos/` para un
  candidato, `grep -h '^\- \*\*Estado' …` para ver estados.
- Para leer una página web, el agente `web-fetch` con una pregunta concreta (devuelve la respuesta, no la
  página); Chrome solo si la web lo exige, con `get_page_text` o `find` antes que capturas.
- Varias búsquedas web sobre lo mismo: pocas y bien dirigidas; si dos no dan nada, anótalo y pregunta.
- Al cerrar una tanda, `python3 -I .claude/skills/candidatos/archivar.py` mueve los cerrados a `cerrados/`.
2. Un origen nuevo va en un archivo nuevo, con su fila en la tabla y en el resumen de `candidatos.md`.
3. Los listados de otras IA (Gemini) y las recopilaciones sin fuentes son pistas de fiabilidad baja: se
   inventan fechas, cifras y verificaciones. Nada se da por bueno hasta verlo en la fuente.

## Principios

1. **La pista nunca es la fuente.** No se cita, no se enlaza en el caso y no se copia su enfoque. Cada
   dato se vuelve a encontrar en la fuente primaria.
2. **No se descarta sin buscar.** Un candidato solo se descarta por falta de pruebas después de buscar la
   fuente primaria y anotar dónde. Los descartes por regla (punto 4) también se registran y los decide
   el usuario.
3. **Se busca también lo que debilita el caso**: la justificación del político, el contexto completo de la
   frase (la pregunta previa y lo que dice después, en el mismo acto), si la condición de la promesa se
   cumplió, si los datos se miden igual antes y después.
4. **Reglas que bloquean** (estado `bloqueado`, decide el usuario): procesos judiciales abiertos,
   atribución de delitos, vida privada o familiar, datos personales de terceros.
5. **Lo reciente se verifica en la web**: nada posterior al conocimiento del modelo se completa de memoria.

Los criterios para decidir si hay caso, con los precedentes que ha fijado el usuario, están en
[criterios.md](criterios.md). Léelo antes de dar un veredicto de `débil` o `descartado`.

## Procedimiento

### 1. Extraer
Lee la pista (con el agente `web-fetch` si no hay WebFetch; si la web bloquea, pide al usuario que pegue
el texto). Para cada entrada anota: tema, persona, «dijo» (fecha, cita o paráfrasis), «hizo» (fecha,
hecho), matiz y las fuentes que cita la pista. Si es un vídeo largo, usa /transcribir para localizar los
tramos con compromisos o cifras.

### 2. Cribar
Para cada candidato, en este orden:
- **¿Entra en el alcance?** Si no, `fuera de alcance`.
- **¿Ya existe?** Si hay un caso de la misma persona sobre lo mismo, valora si la pista aporta un hito
  nuevo a su cronología (estado `ya existe`, con el slug).
- **¿Es una contradicción limpia?** Ver [criterios.md](criterios.md).
- **¿Qué tipo sería?** `falsedad`, `promesa-incumplida`, `cambio-de-postura` o `doble-rasero`.
- **¿Toca una regla que bloquea?**

Con muchos candidatos, propón un orden de investigación (los que tienen más probabilidad de fuente
primaria primero) y espera a que el usuario elija.

### 3. Investigar (concienzudamente)
Busca el «antes» y el «después» siguiendo /fuentes-primarias y **anota cada búsqueda** en el registro,
también las que no dan nada. Para cada fuente encontrada: URL, medio, cita literal exacta tal como aparece,
página o minuto, y copia en Web Archive. Las citas de vídeo o audio quedan pendientes hasta que el usuario
las confirme (/transcribir).

### 4. Veredicto
Estados del registro:
- `por investigar`: aún sin búsqueda de fuentes primarias.
- `investigando`: búsqueda en curso, con lo encontrado hasta ahora.
- `prometedor`: antes y después con fuente verificable; listo para proponer.
- `débil`: hay pruebas, pero la contradicción no es limpia o depende de una fuente secundaria. Anota qué
  faltaría para que deje de serlo.
- `bloqueado`: choca con una regla que bloquea; decide el usuario.
- `en espera`: bloqueado y el usuario ha decidido no publicarlo de momento. Se conserva todo (fuentes,
  citas y qué haría falta para reabrirlo).
- `fuera de alcance`: no se investiga.
- `descartado`: con motivo y lista de búsquedas. Si lo decide el usuario, se dice así.
- `borrador`: caso creado con `draft: true` (/publicar-caso), pendiente de la revisión del usuario.
- `publicado` / `ya existe`: con el slug del caso.

### 5. Proponer
Informa al usuario por estados: prometedores (listos para proponer, con el antes y el después en una línea
cada uno), débiles (y qué falta), bloqueados (necesitan su decisión) y qué queda por investigar. Las
decisiones se plantean en texto, como lista numerada con una opción recomendada (el diálogo de preguntas
no le deja enviar). Con su visto bueno, sigue /publicar-caso.

## Formato del registro

Cada candidato es una sección `### <id> · <tema>` con estos campos (deja vacío lo que no aplique):

```markdown
### arch-03 · Las nucleares del apagón
- **Estado:** investigando
- **Origen:** archivopsoe.com/hemeroteca, entrada 3 (12-11-2026)
- **Persona / tipo propuesto:** Pedro Sánchez / falsedad
- **Antes:** 29-04-2025 · lo que dijo · fuente primaria (URL) o "pendiente"
- **Después:** 01-05-2025 · el hecho · fuente primaria (URL) o "pendiente"
- **Justificación del político:** …
- **Búsquedas:** dónde se buscó y qué se encontró (también lo que no se encontró)
- **Notas / veredicto:** …
```

Al cerrar una tanda, actualiza la fila de su origen en el resumen de `investigacion/candidatos.md` y
ejecuta `archivar.py` (arriba). Para cambiar el estado de un candidato archivado (reabrirlo), edítalo en
`cerrados/` y muévelo a mano al registro vivo.
