import type { APIRoute, GetStaticPaths } from "astro";
import { getMentiras, type Mentira } from "@utils/mentiras";
import { renderOg } from "@utils/og";

/** Una imagen por caso en /og/<slug>.png, generada al compilar. */
export const getStaticPaths = (async () => {
  const mentiras = await getMentiras();
  return mentiras.map(mentira => ({ params: { slug: mentira.slug }, props: { mentira } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ mentira: Mentira }> = async ({ props }) =>
  new Response(await renderOg(props.mentira), {
    headers: { "Content-Type": "image/png" },
  });
