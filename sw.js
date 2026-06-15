const CACHE_NAME = 'offline-v1';
const ASSETS = [
  '/index.html',
  '/offline.html',
  '/tap192.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request).then((response) => {
        return response || caches.match('/offline.html');
      });
    })
  );
});
