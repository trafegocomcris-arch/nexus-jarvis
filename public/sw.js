const CACHE = 'nexus-v4';
const ASSETS = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.delete('nexus-v1').then(()=>caches.delete('nexus-v2')).then(()=>caches.delete('nexus-v3'))
    .then(()=>caches.open(CACHE).then(c=>c.addAll(ASSETS)))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(()=>caches.match(e.request))
  );
});
