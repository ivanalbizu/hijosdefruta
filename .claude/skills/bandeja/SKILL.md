---
name: bandeja
description: Revisa la bandeja diaria del rastreo de campaña de hijosdefruta (investigacion/rastreo/AAAA-MM-DD.md, que genera npm run rastreo con verificadores, La Moncloa y canales de YouTube de los partidos). Úsala cuando el usuario diga «revisa la bandeja», «mira el rastreo» o similar. Criba gastando poco, registra lo que pase como ras-NN y marca la pasada como revisada.
---

# Revisar la bandeja del rastreo

La bandeja son pistas, no fuentes. La genera el usuario a mano con `npm run rastreo` (README, «Rastreo
diario»); no programes ejecuciones (cron, `claude -p`) sin que lo pida. Hay que gastar poco: no se abre
todo.

## Qué se lee

- Solo la bandeja más reciente de `investigacion/rastreo/` y, dentro de ella, las pasadas («## Pasada de
  las HH:MM») que no tengan la línea «Revisada».
- **Verificadores:** se decide por el título y el extracto. El artículo solo se abre cuando es una
  declaración de alguien del alcance con una afirmación comprobable (una cifra, «nunca», «más que nunca»,
  «el primero», «mínimos históricos»…) que no esté ya en casos ni en candidatos
  (`grep -ril <término> investigacion/candidatos/ src/content/casos/`). Los bulos, timos y coincidencias
  débiles se saltan salvo que el usuario los marque.
- **Lo marcado con `[x]`** se mira siempre. La Moncloa y los vídeos, solo si están marcados.
- **Newtral** da 403: no lo sortees (ni curl con otro agente ni Web Archive); pide al usuario que pegue el
  texto. El resto se lee con el agente `web-fetch`.
- Las exageraciones de mitin y las opiniones no son casos ([criterios](../candidatos/criterios.md)).

## Vídeos marcados

Sigue /transcribir. Para no leer la transcripción entera, filtra los tramos con cifras o absolutos:

```bash
<venv>/bin/python -P .claude/skills/transcribir/transcribir.py audio.mp3 \
  --buscar % millones "nunca" "más que" "el primer" "histórico" "récord" "jamás" --salida tramos.txt
```

Y lee solo esos tramos; los minutos que interesen se transcriben luego con `--desde/--hasta --palabras`.

## Qué se hace con lo que pasa la criba

1. El verificador es la pista: la fuente es la declaración original (vídeo, transcripción, Diario de
   Sesiones) y el dato oficial. Investiga con /candidatos y /fuentes-primarias.
2. Registra cada candidato como `ras-NN` (el siguiente número libre) en
   [investigacion/candidatos/rastreo.md](../../../investigacion/candidatos/rastreo.md), con el formato de
   /candidatos y el origen «bandeja del DD-MM-AAAA, pasada de las HH:MM, <verificador> DD-MM («titular»)».
   El siguiente número, con `grep -ho '^### ras-[0-9]*' -r investigacion/candidatos/ | sort -V | tail -1`;
   no leas el registro entero.
3. Al terminar, añade al final de la pasada revisada:
   `Revisada el DD-MM: ras-06 y ras-07 registrados (ras-06 prometedor; ras-07 débil); el resto, sin interés.`
4. Actualiza la fila «Rastreo de campaña» del resumen de `investigacion/candidatos.md`.
5. Informa al usuario por estados, como en /candidatos, y espera su visto bueno para /publicar-caso.
