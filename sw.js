const CACHE_ELEMENTS = [
    './',
    './src/App',
    './src/main.jsx',
    './src/styles/App.css',
    './src/styles/index.css'
]

const CACHE_NAME = 'v1_cache_contador'

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then( cache => {
            cache.addAll(CACHE_ELEMENTS).then( () =>{
                self.skipWaiting();
            }).catch(console.log);
        })
    );
})

self.addEventListener('activate', (e) => {
    const cacheWhiteList = [CACHE_NAME];
    
    e.waitUntil(
        caches.keys().then( cachesNames => {
            return Promise.all(cachesNames.map( cacheName => {
                return cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName);
            }))
        }).then( () => self.clients.claim())
    );
})

self.addEventListener("fetch", (e) => {
    e.respondWith(
      caches.match(e.request).then((res) => {
        if (res) {
          return res;
        }
        return fetch(e.request);
      })
    );
  });