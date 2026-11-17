const V='adcb-v1';
const SHELL=['./','index.html','supabase.js','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='adcb-midia').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  if(u.pathname.includes('/storage/v1/object/public/midia/')){
    if(e.request.headers.get('range'))return;
    e.respondWith(caches.open('adcb-midia').then(async c=>{const hit=await c.match(e.request);if(hit)return hit;const r=await fetch(e.request);if(r.ok&&r.status===200)c.put(e.request,r.clone());return r}));return}
  if(u.origin===location.origin){e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))))}
});
