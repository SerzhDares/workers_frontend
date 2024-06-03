const FETCH_PRIORITY_URLS = ['/', '/index.html', '/css/style.css'];

self.addEventListener('install', event => {
    console.log('Установлен');

    event.waitUntil(
        caches.open('my-cache')
        .then(cache => {
            cache.addAll([
                './',
                './index.html',
                './index.js',
                './css/style.css'
            ])
        })
    )
})

self.addEventListener('activate', event => {
    console.log('Активирован');
})

async function cachePriorityThanFetch(event) {
    const cacheResponse = await caches.match(event.request);

    if(cacheResponse) {
        return cacheResponse;
    }

    let response;

    try {
        response = await fetch(event.request);
    } catch(error) {
        return;
    }

    const cache = caches.open('my-cash');
    cache.put(event.request, response.clone());

    return response;
}

async function fetchPriorityThanCache(event) {
    let response;

    try {
        response = await fetch(event.request);
    } catch(error) {
        const cacheResponse = await caches.match(event.request);

        if(cacheResponse) {
            return cacheResponse;
        }

        return new Response('Нет соединения');
    }

    const cache = caches.open('my-cash');
    cache.put(event.request, response.clone());

    return response;
}


self.addEventListener('fetch', event => {
    console.log('Происходит запрос на сервер');

    const url = new URL(event.request.url);

    if(FETCH_PRIORITY_URLS.includes(url.pathname)) {
        event.respondWith(fetchPriorityThanCache(event));

        return;
    }

    event.respondWith(cachePriorityThanFetch(event));
})