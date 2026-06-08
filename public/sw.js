var CACHE_VERSION = 'maysan-v1';
var STATIC_CACHE = CACHE_VERSION + '-static';
var DYNAMIC_CACHE = CACHE_VERSION + '-dynamic';
var OFFLINE_URL = '/offline.html';

var APP_SHELL_URLS = [
  '/',
  '/services',
  '/tools',
  '/blog',
  '/contact',
  '/about',
  '/pricing',
  '/case-studies',
  '/insights',
  '/start',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function(cache) {
      return cache.addAll(APP_SHELL_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== STATIC_CACHE && name !== DYNAMIC_CACHE; })
          .map(function(name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  var request = event.request;
  var url = new URL(request.url);

  if (request.method !== 'GET' || !url.protocol.startsWith('http')) return;

  if (isStaticAsset(request)) {
    event.respondWith(cacheFirstThenNetwork(request));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  event.respondWith(networkFirstWithFallback(request));
});

function isStaticAsset(request) {
  var url = new URL(request.url);
  var ext = url.pathname.split('.').pop().toLowerCase();
  return ['css','js','png','jpg','jpeg','gif','svg','webp','ico','woff','woff2','ttf','eot'].indexOf(ext) !== -1;
}

function cacheFirstThenNetwork(request) {
  return caches.match(request).then(function(cached) {
    if (cached) return cached;
    return fetch(request).then(function(response) {
      if (response.ok) {
        caches.open(DYNAMIC_CACHE).then(function(cache) { cache.put(request, response.clone()); });
      }
      return response;
    }).catch(function() {
      return new Response('Offline', { status: 503 });
    });
  });
}

function networkFirstWithFallback(request) {
  return fetch(request).then(function(response) {
    if (response.ok) {
      caches.open(DYNAMIC_CACHE).then(function(cache) { cache.put(request, response.clone()); });
    }
    return response;
  }).catch(function() {
    return caches.match(request).then(function(cached) {
      if (cached) return cached;
      return caches.match(OFFLINE_URL).then(function(fallback) {
        if (fallback) return fallback;
        return new Response('Offline', { status: 503 });
      });
    });
  });
}
