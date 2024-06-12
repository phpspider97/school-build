// let cacheData = "appV1";
// this.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(cacheData).then((cache) => {
//             return cache.addAll([])
//         })
//     )
// })
 
// this.addEventListener("fetch", (event) => { 
//     if (!navigator.onLine) { 
//         if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
//             event.waitUntil(
//                 this.registration.showNotification("Internet", {
//                     body: "internet not working",
//                 })
//             )
//         }
//         event.respondWith(
//             caches.match(event.request).then((resp) => { 
//                 if (resp) {
//                     return resp
//                 }
//                 let requestUrl = event.request.clone();
//                 fetch(requestUrl)
//             })
//         )
//     }
// }) 
 

const CACHE_NAME = 'lazy-load-cache-v12';
const DATA_URLS_TO_CACHE = [];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(DATA_URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }
    //if (!navigator.onLine) { 
        event.respondWith(
            caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                }); 
                return response;
            });
            })
        );
   // }
});