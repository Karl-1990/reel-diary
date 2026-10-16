/* Reel Diary Stage 91: theme-aware glow and confetti effects. */
const CACHE = 'reel-diary-stage91-theme-aware-effects';
const CACHE_PREFIX = 'reel-diary-';
const APP_ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png', './icon-maskable-192.png', './icon-maskable-512.png'];
const SHELL_URL = new URL('./index.html', self.registration.scope).href;
const ASSET_URLS = new Set(APP_ASSETS.map(path => new URL(path, self.registration.scope).href));
self.addEventListener('install', event => {
  event.waitUntil((async () => { const cache = await caches.open(CACHE); await cache.addAll(APP_ASSETS); await self.skipWaiting(); })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => { const keys = await caches.keys(); await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE).map(key => caches.delete(key))); await self.clients.claim(); })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try { const response = await fetch(request); if (response.ok && response.type === 'basic') { const cache = await caches.open(CACHE); await cache.put(SHELL_URL, response.clone()); } return response; }
      catch (_) { return (await caches.match(SHELL_URL)) || Response.error(); }
    })());
    return;
  }
  const key = new URL(url.pathname, url.origin).href;
  if (!ASSET_URLS.has(key)) return;
  event.respondWith((async () => { const cached = await caches.match(key); if (cached) return cached; const response = await fetch(request); if (response.ok && response.type === 'basic') { const cache = await caches.open(CACHE); await cache.put(key, response.clone()); } return response; })());
});
