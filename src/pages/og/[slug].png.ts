import type { APIRoute, GetStaticPaths } from "astro";
import { getCasos, type Caso } from "@utils/casos";
import { renderOg } from "@utils/og";

/** Una imagen por caso en /og/<slug>.png, generada al compilar. */
export const getStaticPaths = (async () => {
  const casos = await getCasos();
  return casos.map(caso => ({ params: { slug: caso.slug }, props: { caso } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ caso: Caso }> = async ({ props }) =>
  new Response(await renderOg(props.caso), {
    headers: { "Content-Type": "image/png" },
  });
