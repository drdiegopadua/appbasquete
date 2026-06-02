const CACHE = 'supercopa-v2';
const ASSETS = [
  'index.html',
  'logo.png',
  'manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Para o Google Sheets, sempre busca na rede
  if (e.request.url.includes('script.google.com')) {
    e.respondWith(
      fetch(e.request).catch(() => new Response('{"jogos":[],"classificacao":[]}', {
        headers: { 'Content-Type': 'application/json' }
      }))
    );
    return;
  }
  // Para demais recursos: cache first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
