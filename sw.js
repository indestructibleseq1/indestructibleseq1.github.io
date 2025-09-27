// Nombre de la caché. Es crucial cambiar la versión (por ejemplo, v2, v3) 
// cada vez que quieras forzar a los usuarios a actualizar los archivos estáticos.
const CACHE_NAME = 'pwa-formulario-cache-v1';

// Lista de todos los archivos que deben ser cacheados al instalar la PWA.
const urlsToCache = [
  '/', // Cacha el root del sitio
  '/index.html',
  '/ayuda.html',
  '/estilos.css',
  '/script.js',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
  // IMPORTANTE: Asegúrate de incluir todos los archivos y recursos que uses.
];

// 1. INSTALACIÓN: Cacha los recursos necesarios.
self.addEventListener('install', (event) => {
  // Asegura que el service worker no pase al estado 'activo' hasta que todos 
  // los archivos críticos estén cacheados.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierta, precacheando recursos.');
        return cache.addAll(urlsToCache);
      })
  );
  // Fuerza al Service Worker a tomar el control inmediatamente.
  self.skipWaiting(); 
});

// 2. ACTIVACIÓN: Limpia las cachés antiguas para ahorrar espacio.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Si el nombre de caché no está en la lista blanca (CACHE_NAME), bórralo.
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Reclama el control de la página a clientes nuevos o existentes.
  return self.clients.claim(); 
});

// 3. RECUPERACIÓN (FETCH): Estrategia de red primero, volviendo a la caché.
self.addEventListener('fetch', (event) => {
  // Ignorar solicitudes que no son GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    // Intenta buscar el recurso en la red primero
    fetch(event.request)
      .then((response) => {
        // Clonamos la respuesta porque la corriente de la respuesta solo puede ser leída una vez
        const responseClone = response.clone();
        
        // Si la respuesta es válida, la guardamos en la caché para usos futuros
        if (response && response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              // No cachear solicitudes CORS a menos que estén pre-cacheadas
              if (responseClone.type === 'opaque' || event.request.url.startsWith('chrome-extension')) {
                 return response; 
              }
              cache.put(event.request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intenta servir el recurso desde la caché
        return caches.match(event.request);
      })
  );

});
