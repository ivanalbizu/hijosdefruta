// Se ejecuta en la pestaña de la búsqueda de X (javascript_tool). Baja por la página hasta que no
// carga nada nuevo y deja los tuits en `window.__tuits` (usuario, id, fecha ISO, texto y `citado`: texto
// del tuit citado y de la tarjeta del enlace) y en `window.__tsv`, una línea por tuit. Devuelve solo el
// recuento: la herramienta corta los resultados hacia los 900 caracteres, así que el TSV se lee después
// por trozos (ver SKILL.md). Los retuits y anuncios se saltan.
(async () => {
  const vistos = new Map();
  const limpio = el => (el?.innerText ?? "").replace(/\s*\n\s*/g, " ").trim();
  const leer = () => {
    for (const art of document.querySelectorAll('article[data-testid="tweet"]')) {
      if (art.querySelector('[data-testid="socialContext"]')) continue; // retuit
      const tiempo = art.querySelector("time");
      const enlace = tiempo?.closest("a")?.getAttribute("href");
      if (!enlace || vistos.has(enlace)) continue;
      // El primer tweetText es el propio; el siguiente, el del tuit citado.
      const textos = art.querySelectorAll('[data-testid="tweetText"]');
      const citado = [limpio(textos[1]), limpio(art.querySelector('[data-testid="card.wrapper"]'))]
        .filter(Boolean)
        .join(" · ");
      const [, usuario, , id] = enlace.split("/");
      vistos.set(enlace, {
        usuario,
        id,
        fecha: tiempo.getAttribute("datetime"),
        texto: textos[0]?.innerText ?? "",
        ...(citado && { citado }),
      });
    }
  };
  let quietas = 0;
  for (let i = 0; i < 40 && quietas < 3; i++) {
    const antes = vistos.size;
    leer();
    window.scrollBy(0, window.innerHeight * 2);
    await new Promise(r => setTimeout(r, 1500));
    quietas = vistos.size === antes ? quietas + 1 : 0;
  }
  leer();
  window.__tuits = [...vistos.values()];
  // TSV compacto para sacarlo por trozos: sin URL (X las parte en líneas), sin saltos ni tabuladores.
  const c = s =>
    (s ?? "")
      .replace(/https?:\/\/\S*/g, " ")
      .replace(/\S*\w\.\w{2,}\/\S*/g, " ")
      .replace(/(^|\s)\S*\/\S*/g, " ")
      .replace(/…/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  // Si antes se ejecutó la salida de `npm run respuestas -- vistos`, fuera los ya revisados.
  const nuevos = window.__tuits.filter(t => !window.__ya?.has(t.id));
  window.__tsv = nuevos
    .map(t => [t.usuario, t.id, t.fecha.slice(0, 16), c(t.texto), c(t.citado)].join("\t"))
    .join("\n");
  return `${window.__tuits.length} tuits, ${nuevos.length} nuevos, ${window.__tsv.length} caracteres`;
})();
