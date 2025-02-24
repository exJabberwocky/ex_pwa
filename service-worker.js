const CACHE_NAME = "ex-library-cache-v1";
const urlsToCache = [
    "/",
    "https://static.tildacdn.com/tild3532-3338-4239-a535-653264653734/books-01.png",
    "https://static.tildacdn.com/tild3861-3633-4363-a165-393835303463/books-010.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
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
