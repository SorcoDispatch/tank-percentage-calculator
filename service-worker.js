
const CACHE_NAME = "tank-calc-cache-v2";

// Determine the base path dynamically based on the current script location
const BASE_PATH = new URL('./', import.meta.url).pathname;

const URLS_TO_CACHE = [
  BASE_PATH + "index.html",
  BASE_PATH + "company_logo.png",
  BASE_PATH + "manifest.json",
  BASE_PATH + "service-worker.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
