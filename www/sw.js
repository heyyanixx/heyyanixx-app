/* HEYYANIXX PWA service worker — app shell + local posters precached, works offline */
const CACHE = 'heyyanixx-v10';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './favicon.svg', './fonts/outfit.woff2',
  './assets/ad-v1.jpg',
  './offline/arcade/fonts/anton.woff2',
  './offline/arcade/fonts/inter-tight.woff2',
  './offline/arcade/fonts/inter.woff2',
  './offline/arcade/games/arcade.css',
  './offline/arcade/games/arcade.js',
  './offline/arcade/',
  './offline/learn/about',
  './offline/learn/contact',
  './offline/learn/favicon.svg',
  './offline/learn/fonts/anton.woff2',
  './offline/learn/fonts/inter.woff2',
  './offline/learn/icon-512.png',
  './offline/learn/',
  './offline/learn/js/ads-config.js',
  './offline/learn/js/boot.js',
  './offline/learn/js/core.js',
  './offline/learn/js/data-com.js',
  './offline/learn/js/data-vid.js',
  './offline/learn/js/data.js',
  './offline/learn/js/games.js',
  './offline/learn/js/games2.js',
  './offline/learn/js/games3.js',
  './offline/learn/js/games4.js',
  './offline/learn/js/page.js',
  './offline/learn/manifest.webmanifest',
  './offline/learn/og.png',
  './offline/learn/privacy',
  './offline/learn/styles.css',
  './offline/learn/sw.js',
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
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(FILES.map((f) => c.add(f).catch(() => null)))).then(() => self.skipWaiting()));
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
    // network first for pages, so updates show up; the cached copy of that same page when offline
    const isApp = url.pathname.endsWith('/') || url.pathname.endsWith('/index.html') && !url.pathname.includes('/offline/');
    e.respondWith(fetch(req).then((res) => {
      const copy = res.clone(); if (res.ok) caches.open(CACHE).then((c) => c.put(isApp && !url.pathname.includes('/offline/') ? './index.html' : req, copy)); return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((m) => m || (url.pathname.includes('/offline/') ? caches.match(url.pathname.replace(/\/$/, '/index.html'), { ignoreSearch: true }) : caches.match('./index.html')))));
    return;
  }
  e.respondWith(caches.match(req).then((cached) => cached || fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }).then((m) => m || Response.error()))));
});
