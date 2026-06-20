const CACHE = "aba-v1";
const ASSETS = [
  "./", "./index.html", "./qiymetlendirmeler.html", "./proqram.html", "./manifest.json",
  "./icon-192.png", "./icon-512.png",
  "./assets/style.css", "./assets/i18n.js", "./assets/tools-data.js",
  "./assets/program-data.js", "./assets/core.js",
  "./tools/vb-mapp.html", "./tools/ablls-r.html", "./tools/afls.html",
  "./tools/fba.html", "./tools/vineland.html", "./tools/peak.html"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

// Network-first: həmişə təzə yüklə, yalnız oflayn olduqda keşdən ver.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {}); return res; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
