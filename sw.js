// Service worker do Painel Spinning: deixa o app abrir sem internet.
// Ao mudar qualquer arquivo do app, aumente o número da versão abaixo.
const VERSAO = 'spinning-v2';
const ARQUIVOS = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
const HOSTS_FONTES = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fontes: usa o que já está guardado e atualiza em segundo plano.
  if (HOSTS_FONTES.includes(url.hostname)) {
    e.respondWith(
      caches.open(VERSAO).then(async c => {
        const guardado = await c.match(req);
        const rede = fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => guardado);
        return guardado || rede;
      })
    );
    return;
  }

  // Arquivos do app: tenta a internet primeiro (pega atualizações) e cai no guardado se estiver offline.
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req)
        .then(r => { const copia = r.clone(); caches.open(VERSAO).then(c => c.put(req, copia)); return r; })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
  }
});
