/* offline cache — HEYYANIXX Learn Arcade */
const V='hxla-v4';
const FILES=['./','index.html','styles.css','js/ads-config.js','js/data.js','js/core.js','js/games.js','js/games2.js','js/data-com.js','js/games3.js','js/data-vid.js','js/games4.js','js/boot.js','fonts/anton.woff2','fonts/inter.woff2','favicon.svg','about','privacy','contact'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&!r.redirected&&r.type==='basic'){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp));}return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));});
