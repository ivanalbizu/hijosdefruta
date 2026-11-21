#!/usr/bin/env python3
"""Mueve los candidatos cerrados de investigacion/candidatos/<origen>.md a
investigacion/candidatos/cerrados/<origen>.md, para que el registro vivo sea corto.

Cerrado = el estado empieza por descartado, publicado, duplicado, fusionado, sin indicio,
hito añadido, añadido, caso nuevo descartado o «en `/promesas`». Se quedan en el vivo los
débiles, por investigar, en espera, borrador, prometedor y «ya existe» (puede faltar un hito).

Uso: python3 .claude/skills/candidatos/archivar.py [origen.md …]   (sin argumentos, todos)
Es idempotente: lo que ya está archivado no se toca y lo nuevo se añade al final.
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3] / "investigacion" / "candidatos"
CERRADOS = RAIZ / "cerrados"
ESTADO = re.compile(r"^- \*\*Estado:\*\* *(.*)", re.M)
CERRADO = re.compile(
    r"^(descartad|publicad|duplicad|fusionad|sin indicio|hito añadido|añadido|caso nuevo descartado|en `/promesas`)",
    re.I,
)
AVISO = "> Cerrados (descartados, publicados, duplicados…): [cerrados/{n}](cerrados/{n}). Búsqueda: `grep -r` sobre `investigacion/candidatos/`.\n"


def bloques(texto):
    """Parte en bloques que empiezan por '## ' o '### '. El primero es la cabecera."""
    partes = re.split(r"(?m)^(?=#{2,3} )", texto)
    return partes[0], partes[1:]


def rebasar(b):
    # Los enlaces relativos ganan un nivel al bajar a cerrados/.
    return re.sub(r"\]\((?!https?:|#|/)", "](../", b)


def archivar(origen: Path):
    cabecera, partes = bloques(origen.read_text())
    vivos, movidos, seccion = [], [], None
    for b in partes:
        if b.startswith("## "):
            seccion = b.splitlines()[0]
            vivos.append(b)
            continue
        m = ESTADO.search(b)
        if m and CERRADO.match(m.group(1)):
            movidos.append((seccion, b))
        else:
            vivos.append(b)
    if not movidos:
        return 0
    destino = CERRADOS / origen.name
    previo = destino.read_text() if destino.exists() else (
        f"# Cerrados · {cabecera.splitlines()[0].lstrip('# ').strip()}\n\n"
        f"Candidatos cerrados de [{origen.name}](../{origen.name}), en el orden original. "
        "Se consultan con `grep`, no se leen enteros.\n\n"
    )
    ultima = [l for l in previo.splitlines() if l.startswith("## ")]
    ultima = ultima[-1] if ultima else None
    salida = [previo.rstrip("\n") + "\n\n"]
    for seccion, b in movidos:
        if seccion and seccion != ultima:
            salida.append(seccion + "\n\n")
            ultima = seccion
        salida.append(rebasar(b).rstrip("\n") + "\n\n")
    CERRADOS.mkdir(exist_ok=True)
    destino.write_text("".join(salida).rstrip("\n") + "\n")
    aviso = AVISO.format(n=origen.name)
    if aviso not in cabecera:
        cabecera = cabecera.rstrip("\n") + "\n\n" + aviso + "\n"
    origen.write_text(cabecera + "".join(vivos).rstrip("\n") + "\n")
    return len(movidos)


if __name__ == "__main__":
    nombres = sys.argv[1:] or sorted(p.name for p in RAIZ.glob("*.md") if p.name != "criterios.md")
    for n in nombres:
        p = RAIZ / Path(n).name
        antes = p.stat().st_size
        k = archivar(p)
        print(f"{p.name:24} {k:3d} archivados  {antes // 1000:4d} KB → {p.stat().st_size // 1000:4d} KB")
