// Lee los tuits de una búsqueda de X (pestaña «Más reciente») con Claude in Chrome.
// Uso: navegar a
//   https://x.com/search?q=from%3A<cuenta>%20since%3AAAAA-MM-DD%20until%3AAAAA-MM-DD%20(<palabra>%20OR%20<palabra>)&f=live
// y ejecutar este archivo con javascript_tool tantas veces como haga falta: cada llamada desplaza unas 16 vueltas
// (menos de 45 s, el límite de javascript_tool) y guarda lo leído en window.__T. Termina cuando quietos=4.
// Para volcar el resultado, cambiar VOLCAR a true en la última llamada y leer la página con get_page_text
// (la salida de javascript_tool se corta hacia los 1000 caracteres).
const CUENTA = 'sanchezcastejon';
const VOLCAR = false;
const FILTRO = null; // p. ej. /Puigdemont|indult/ para volcar solo los que contienen de verdad las palabras

for (let w = 0; w < 15 && !document.querySelector('article'); w++) await new Promise(r => setTimeout(r, 1000));
window.__T = window.__T || {};
window.__q = window.__q || 0;
let prev = Object.keys(window.__T).length;
for (let i = 0; i < 16 && window.__q < 4 && !VOLCAR; i++) {
  document.querySelectorAll('article').forEach(a => {
    const t = a.querySelector('time');
    const l = t && t.closest('a');
    const tx = a.querySelector('[data-testid="tweetText"]');
    if (l && tx && l.href.includes('/' + CUENTA + '/'))
      window.__T[l.href] = t.getAttribute('datetime').slice(0, 10) + ' | ' +
        tx.innerText.replace(/\n/g, ' ').replace(/https?:\/\/\S+( \S+)?/g, '').slice(0, 280);
  });
  window.scrollBy(0, 2500);
  await new Promise(r => setTimeout(r, 1800));
  const n = Object.keys(window.__T).length;
  window.__q = n === prev ? window.__q + 1 : 0;
  prev = n;
}
const error = document.body.innerText.includes('Algo salió mal');
if (VOLCAR) {
  const e = Object.entries(window.__T).filter(([, v]) => !FILTRO || FILTRO.test(v)).sort((a, b) => (a[1] < b[1] ? 1 : -1));
  const pre = document.createElement('article');
  pre.innerText = e.length + '\n' + e.map(([k, v]) => v + ' |' + k.split('/status/')[1]).join('\n');
  document.body.innerHTML = '';
  document.body.appendChild(pre);
}
const fechas = Object.values(window.__T).map(x => x.slice(0, 10)).sort();
`${fechas.length} tuits · quietos=${window.__q} · de ${fechas[0]} a ${fechas.at(-1)} · error=${error}`;
