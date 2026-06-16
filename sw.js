// 芒果出行 PWA · Service Worker
const CACHE = 'mango-trip-v7';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // 网络优先，避免缓存错乱
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
