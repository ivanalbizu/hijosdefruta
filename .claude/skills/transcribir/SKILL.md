---
name: transcribir
description: Localiza en un vídeo o audio (YouTube, RTVE Play, Telecinco o mitele, Onda Cero, 3Cat, canal del Congreso…) el minuto exacto de una frase con yt-dlp y faster-whisper, fija video.start y end y prepara la petición de confirmación al usuario. Úsala cuando haya que transcribir una entrevista, un debate, un mitin o una rueda de prensa, buscar en ella compromisos o cifras, o comprobar que una cita coincide con el audio.
---

# Transcribir y localizar citas

La transcripción automática solo sirve para **localizar** el tramo: no tiene puntuación fiable ni
hablantes. **Toda cita sale de escuchar el tramo**, y la confirma el usuario antes de publicarla.

## Entorno

yt-dlp y faster-whisper no son dependencias del proyecto. Se instalan en un venv del scratchpad (se
borra al reiniciar; si ya existe, reutilízalo). El modelo `large-v3-turbo` ya está en la caché de Hugging
Face del equipo.

```bash
V=<scratchpad>/venv-whisper
[ -x $V/bin/python ] || { uv venv $V --python /usr/bin/python3 -q && uv pip install -q --python $V/bin/python faster-whisper yt-dlp; }
```

Ejecuta siempre con `python -P` (no `-I`, que ignora el venv). Guarda audios y transcripciones en
`investigacion/material/transcripciones/` (fuera de git) o en el scratchpad.

## Descargar

| Origen | Cómo |
| --- | --- |
| YouTube | `$V/bin/python -P -m yt_dlp --js-runtimes "node:$(which node)" -f bestaudio -x --audio-format mp3 -o 'nombre.%(ext)s' <url>`. En vídeos largos prueba antes los subtítulos (`--skip-download --write-subs --write-auto-subs --sub-langs "es.*"`); los directos no suelen tenerlos |
| RTVE Play (audio) | yt-dlp sin `-f bestaudio` (ya da mp3) |
| Onda Cero y otras radios | MP3 directo de la página del programa |
| Telecinco / mitele | Vídeo de la página; en el caso se enlaza la página con el minuto y no se incrusta (el campo `video` solo admite YouTube y el reproductor de mitele carga scripts de terceros) |
| TikTok, Instagram, X | Solo como pista: busca el vídeo completo del medio o del partido |

Si la plataforma no deja descargar, pide al usuario el archivo o el minuto aproximado.

**Tramos de vídeos largos** (`--download-sections "*3:35:00-3:47:00"`): el archivo puede empezar unos
segundos antes de lo pedido (en el especial de RTVE del debate de 2026, 10 s). Mide la duración con
`ffprobe -v error -show_entries format=duration -of csv=p=0 <archivo>` y resta el sobrante al inicio
pedido antes de convertir los tiempos de whisper en tiempos del vídeo. Si el mismo acto está en dos
vídeos, comprueba que el desfase entre ellos sale igual en todas las citas.

## Transcribir

```bash
T=.claude/skills/transcribir/transcribir.py
$V/bin/python -P $T audio.mp3 --salida transcripcion.txt                 # todo (15 min de audio ≈ unos minutos)
$V/bin/python -P $T audio.mp3 --buscar salario 75 --salida tramos.txt    # solo segmentos con esos términos
$V/bin/python -P $T audio.mp3 --desde 3:00 --hasta 3:30 --palabras       # tramo con tiempo por palabra
$V/bin/python -P $T audio.mp3 --idioma ca                               # catalán (también eu, gl)
```

Los tiempos de salida son siempre los del archivo completo, aunque se transcriba un tramo.

En vídeos largos (debates, entrevistas, mitines) busca compromisos y absolutos («vamos a», «me comprometo»,
«nunca», «derogar», cifras, «más que nunca», «el primero») y lee solo esos tramos. Deduce quién habla por
el contexto y compruébalo: una frase del entrevistador no es del político.

## Fijar los tiempos del caso

Con `--palabras`: `video.start` unos 4 s antes de la primera palabra de la cita y `video.end` unos 2 s
después de la última. Ejemplo: la cita de Díaz en La Séptima (`KLl7Lj8PxSA`) empieza en 188,1 s y acaba en
203,1 s → `start: 184`, `end: 205`.

## Pedir la confirmación al usuario

Un bloque por cita, siempre con las tres cosas:

- URL: `https://www.youtube.com/watch?v=ID&t=184s` (con el inicio del tramo si la plataforma lo admite)
- Tramo: de 3:04 a 3:25 (minutos:segundos, inicio y fin)
- Texto: «…transcripción literal, tal como iría en la `cita`…» (marca las palabras dudosas)

Hasta que el usuario lo confirme, la cita queda como pendiente en el registro y el caso, en borrador.

## Reglas

- La cita va literal, tal como se oye. Si se omite un trozo, se marca con `[…]` y lo omitido no puede
  cambiar el sentido; el usuario confirma también el tramo omitido.
- Si el audio y el Diario de Sesiones difieren, manda el Diario de Sesiones ([criterios](../candidatos/criterios.md)).
- Las citas en catalán, euskera o gallego van literales y la traducción, en `contexto`.
- Al publicar o descartar el caso, borra el audio y la transcripción.
