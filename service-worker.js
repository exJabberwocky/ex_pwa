const CACHE_NAME = "ex-library-cache-v2"; // Обновил версию кеша
const urlsToCache = [
    "/",
    "/aando"
    "/aando/song"
    "/soe"
    "/soe/a1-ch1"
    "/soe/a1-ch2"
    "/soe/a1-ch3"
    "/soe/a1-ch4"
    "/soe/a1-ch5"
    "/soe/a1-ch6"
    "/offline.html", // Добавляем оффлайн-страницу
    "https://static.tildacdn.com/tild3532-3338-4239-a535-653264653734/books-01.png",
    "https://static.tildacdn.com/tild3531-3364-4439-b231-313065313463/books-010.png"
];

// Устанавливаем Service Worker и кешируем файлы
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Перехватываем запросы и обслуживаем из кеша или сети
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Если запрос успешный, добавляем в кеш (динамическое кеширование)
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
            .catch(() => {
                // Если сети нет, пытаемся взять из кеша
                return caches.match(event.request).then((cachedResponse) => {
                    return cachedResponse || caches.match("/offline.html");
                });
            })
    );
});

// Обновляем кеш, удаляя старые версии
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
