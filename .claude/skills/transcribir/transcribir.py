"""
Transcribe un audio o vídeo con faster-whisper para localizar el minuto de una frase.

    <venv>/bin/python -P .claude/skills/transcribir/transcribir.py <audio> [opciones]

Opciones:
    --desde 24:45 --hasta 28:30   solo ese tramo (los tiempos de salida son los del archivo completo)
    --idioma es                   es (por defecto), ca, eu, gl…
    --palabras                    marca de tiempo de cada palabra (para fijar inicio y fin exactos)
    --buscar salario 75 "nunca"   solo los segmentos que contienen alguno de los términos
    --salida archivo.txt          además de imprimirla, guarda la transcripción

La transcripción no tiene puntuación fiable ni hablantes: sirve para localizar el tramo.
La cita literal la confirma el usuario escuchándolo (ver SKILL.md).

El audio se decodifica con ffmpeg a PCM de 16 kHz y se pasa como array: pasar el archivo
directamente falla con el PyAV antiguo del sistema. Ejecutar con -P (no -I, que ignora el venv).
"""

import argparse
import subprocess
import sys
import unicodedata

import numpy as np
from faster_whisper import WhisperModel


def segundos(valor: str) -> float:
    partes = [float(p) for p in valor.split(":")]
    total = 0.0
    for p in partes:
        total = total * 60 + p
    return total


def mmss(t: float) -> str:
    t = int(round(t))
    h, resto = divmod(t, 3600)
    m, s = divmod(resto, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def normalizar(texto: str) -> str:
    sin_tildes = unicodedata.normalize("NFD", texto)
    return "".join(c for c in sin_tildes if unicodedata.category(c) != "Mn").lower()


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("audio")
    p.add_argument("--desde")
    p.add_argument("--hasta")
    p.add_argument("--idioma", default="es")
    p.add_argument("--palabras", action="store_true")
    p.add_argument("--buscar", nargs="+", default=[])
    p.add_argument("--salida")
    p.add_argument("--modelo", default="large-v3-turbo")
    a = p.parse_args()

    inicio = segundos(a.desde) if a.desde else 0.0
    cmd = ["ffmpeg", "-nostdin", "-loglevel", "error"]
    if a.desde:
        cmd += ["-ss", str(inicio)]
    if a.hasta:
        cmd += ["-to", str(segundos(a.hasta))]
    cmd += ["-i", a.audio, "-ac", "1", "-ar", "16000", "-f", "f32le", "pipe:1"]
    pcm = subprocess.run(cmd, check=True, capture_output=True).stdout
    audio = np.frombuffer(pcm, dtype=np.float32)
    if not audio.size:
        sys.exit("ffmpeg no ha devuelto audio: revisa el archivo y el tramo")

    modelo = WhisperModel(a.modelo, device="cpu", compute_type="int8")
    segmentos, _ = modelo.transcribe(
        audio, language=a.idioma, vad_filter=True, word_timestamps=a.palabras, beam_size=5
    )

    buscados = [normalizar(b) for b in a.buscar]
    lineas = []
    for s in segmentos:
        texto = s.text.strip()
        if buscados and not any(b in normalizar(texto) for b in buscados):
            continue
        linea = f"[{mmss(inicio + s.start)}–{mmss(inicio + s.end)}] {texto}"
        if a.palabras and s.words:
            linea += "\n    " + " ".join(f"{w.word.strip()}@{inicio + w.start:.1f}" for w in s.words)
        print(linea, flush=True)
        lineas.append(linea)

    if a.salida:
        with open(a.salida, "w", encoding="utf-8") as f:
            f.write("\n".join(lineas) + "\n")


if __name__ == "__main__":
    main()
