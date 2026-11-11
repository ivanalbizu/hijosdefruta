import fs from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";
import { TIPOS } from "../consts";
import { formatFecha, type Hito, type Mentira } from "@utils/mentiras";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const COLORES = {
  fondo: "#0f1219",
  texto: "#ffffff",
  secundario: "#8f99b8",
  antes: "#7c8cff",
  despues: "#ff6b6b",
  barra: "#2337ff",
};

/** Mismos colores que TipoBadge.astro. */
const COLOR_TIPO: Record<Mentira["data"]["tipo"], string> = {
  "falsedad": "#8a1c1c",
  "promesa-incumplida": "#8a4b00",
  "cambio-de-postura": "#4a3a8a",
  "doble-rasero": "#005f5f",
};

// Las fuentes se leen una sola vez por build. Satori admite woff, no woff2.
let fuentes: Promise<Parameters<typeof satori>[1]["fonts"]> | undefined;
const cargarFuentes = () =>
  (fuentes ??= Promise.all(
    ([400, 700] as const).map(async weight => ({
      name: "Inter",
      weight,
      style: "normal" as const,
      data: await fs.readFile(
        path.resolve(`node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`)
      ),
    }))
  ));

/** Recorta en el último espacio antes de `max` caracteres y añade "…". */
function recortar(texto: string, max: number) {
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max);
  return corte.slice(0, corte.lastIndexOf(" ")).replace(/[\s,.;:]+$/, "") + "…";
}

/** "Pedro Sánchez (candidato del PSOE)" → "Pedro Sánchez". */
const nombre = (quien: string) => quien.split(" (")[0];

type Nodo = { type: string; props: { style?: Record<string, unknown>; children?: unknown } };
const div = (style: Record<string, unknown>, children?: unknown): Nodo => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});

function columna(etiqueta: string, color: string, hito: Hito): Nodo {
  const fragmento = recortar(hito.destacado ?? hito.cita ?? hito.hecho ?? "", 185);
  const texto = hito.cita ? `«${fragmento}»` : fragmento;
  return div({ flex: 1, flexDirection: "column", borderTop: `6px solid ${color}`, paddingTop: 18 }, [
    div({ fontSize: 20, fontWeight: 700, letterSpacing: 2, color }, `${etiqueta} · ${formatFecha(hito.fecha).toUpperCase()}`),
    div({ fontSize: 29, lineHeight: 1.3, marginTop: 14, color: COLORES.texto }, texto),
    div({ fontSize: 22, marginTop: "auto", color: COLORES.secundario }, `— ${nombre(hito.quien)}`),
  ]);
}

/** Imagen 1200×630 para redes sociales con el antes y el después del caso. */
export async function renderOg(mentira: Mentira): Promise<Buffer> {
  const { title, tipo, antes, despues } = mentira.data;

  const arbol = div(
    { width: OG_WIDTH, height: OG_HEIGHT, flexDirection: "column", background: COLORES.fondo, fontFamily: "Inter" },
    [
      div({ flex: 1, flexDirection: "column", padding: "44px 56px 36px" }, [
        div({ justifyContent: "space-between", alignItems: "center" }, [
          div(
            {
              background: COLOR_TIPO[tipo],
              color: COLORES.texto,
              padding: "6px 14px",
              borderRadius: 4,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 1,
            },
            TIPOS[tipo].nombre.toUpperCase()
          ),
          div({ fontSize: 24, fontWeight: 700, color: COLORES.secundario }, "hijosdefruta"),
        ]),
        div({ fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginTop: 22, color: COLORES.texto }, recortar(title, 105)),
        div({ flex: 1, gap: 48, marginTop: 30 }, [
          columna("ANTES", COLORES.antes, antes),
          columna("DESPUÉS", COLORES.despues, despues),
        ]),
      ]),
      div({ height: 12, background: COLORES.barra }),
    ]
  );

  // `satori` espera elementos tipo React; el árbol de objetos planos es equivalente.
  const svg = await satori(arbol as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: await cargarFuentes(),
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
