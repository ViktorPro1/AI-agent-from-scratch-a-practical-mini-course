const CACHE_NAME = "ai-agent-cache-avtomat";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js"
];

// Встановлення SW і кешування
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
    self.skipWaiting(); // активує новий SW одразу
});

// Активація SW і видалення старих кешів
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            )
        )
    );
    self.clients.claim();
});

// Fetch: network-first + автоматичне оновлення кешу
self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            try {
                const networkResponse = await fetch(event.request);
                if (networkResponse && networkResponse.status === 200) {
                    const cache = await caches.open(CACHE_NAME);
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse.clone();
            } catch {
                const cachedResponse = await caches.match(event.request);
                return cachedResponse;
            }
        })()
    );
});
