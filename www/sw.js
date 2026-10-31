/* HEYYANIXX PWA service worker — app shell + local posters precached, works offline */
const CACHE = 'heyyanixx-v5';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './favicon.svg', './fonts/outfit.woff2',
  './assets/ad-v1.jpg',
  './assets/ad-v2.jpg',
  './assets/ai-bhool.jpg',
  './assets/ai-gemini.jpg',
  './assets/ai-identity.jpg',
  './assets/aroma.jpg',
  './assets/cover-ff-india.jpg',
  './assets/ff-avatar.jpg',
  './assets/ff-india-short.jpg',
  './assets/ff-ingame.jpg',
  './assets/ig-edit.jpg',
  './assets/ig-newyear.jpg',
  './assets/ig-style.jpg',
  './assets/ig-switch.jpg',
  './assets/ig-travel.jpg',
  './assets/portrait.jpg',
  './assets/thumb-ff-india.jpg',
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // videos + links load from the network
  if (req.mode === 'navigate') {
    // network first for the page, so updates show up; cached copy when offline
    e.respondWith(fetch(req).then((res) => {
      const copy = res.clone(); if (res.ok) caches.open(CACHE).then((c) => c.put('./index.html', copy)); return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then((cached) => cached || fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  })));
});
