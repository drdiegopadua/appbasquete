// Service Worker - Instituto Cultural das Montanhas
// Cache-first strategy com fallback para network

const CACHE_NAME = 'icm-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-72.png',
  '/icon-96.png',
  '/icon-128.png',
  '/icon-144.png',
  '/icon-152.png',
  '/icon-180.png',
  '/icon-192.png',
  '/icon-384.png',
  '/icon-512.png'
];

// Instalação: pré-cache dos assets estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((err) => {
        console.log('[SW] Cache failed:', err);
      })
  );
});

// Ativação: limpar caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch: cache-first para assets, network-first para API/dados
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Estratégia: Cache First para assets estáticos
  if (isStaticAsset(request, url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          // Revalidar em background
          fetch(request).then((response) => {
            if (response.ok) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, response);
              });
            }
          }).catch(() => {});
          return cached;
        }
        return fetchAndCache(request);
      })
    );
    return;
  }

  // Estratégia: Network First para dados dinâmicos
  if (isAPIRequest(request, url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            return new Response(JSON.stringify({ error: 'offline' }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
    return;
  }

  // Estratégia padrão: Stale While Revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((response) => {
        if (response.ok) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
          });
        }
        return response;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});

// Helpers
function isStaticAsset(request, url) {
  const staticExtensions = ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.woff', '.woff2', '.ttf'];
  const isSameOrigin = url.origin === self.location.origin;
  const isStatic = staticExtensions.some(ext => url.pathname.endsWith(ext));
  const isGET = request.method === 'GET';
  return isSameOrigin && isStatic && isGET;
}

function isAPIRequest(request, url) {
  const apiPatterns = ['/api/', '/data/', '/json/'];
  const isAPI = apiPatterns.some(pattern => url.pathname.includes(pattern));
  const isGET = request.method === 'GET';
  return isAPI && isGET;
}

function fetchAndCache(request) {
  return fetch(request).then((response) => {
    if (response.ok) {
      const clone = response.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, clone);
      });
    }
    return response;
  }).catch(() => {
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  });
}

// Push notifications (opcional)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'Nova atualização do ICM',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    tag: data.tag || 'icm-notification',
    requireInteraction: false,
    data: data.url || '/'
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'Instituto Cultural das Montanhas',
      options
    )
  );
});

// Click na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Background sync (para formulários offline)
self.addEventListener('sync', (event) => {
  if (event.tag === 'icm-sync') {
    event.waitUntil(syncPendingData());
  }
});

async function syncPendingData() {
  // Implementar sincronização de dados pendentes
  console.log('[SW] Background sync executed');
}

// Mensagens do client
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
