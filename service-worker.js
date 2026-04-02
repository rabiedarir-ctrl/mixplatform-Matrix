// service-worker.js - Mix Platform PWA

const CACHE_NAME = "mix-platform-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/frontend/index.html",
  "/frontend/static/style.css",
  "/frontend/static/main.js",
  "/frontend/manifest.json",
  "/frontend/world.html",
  // الصفحات الخاصة بالوحدات
  "/frontend/pages/dashboard.css",
  "/frontend/pages/home.css",
  "/frontend/pages/metaverse.css",
  "/frontend/pages/media.css",
  "/frontend/pages/manager.css",
  "/frontend/pages/bitcoin.css",
  "/frontend/pages/gps.css",
  "/frontend/pages/matrix.css",
  "/frontend/pages/social.css",
  "/frontend/pages/games.css"
];

// تثبيت Service Worker وتخزين الملفات الأساسية
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching assets...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تفعيل Service Worker
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// اعتراض الطلبات (Fetch) واستخدام الكاش أو الإنترنت
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          // تخزين نسخة جديدة في الكاش
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // في حال عدم الاتصال بالإنترنت
          if (event.request.destination === "document") {
            return caches.match("/frontend/index.html");
          }
        });
    })
  );
});
