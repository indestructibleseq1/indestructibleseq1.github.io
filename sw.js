/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 * 
 * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 * 
 * El número a la izquierda del punto (.), en este caso <q>1</q>, se
 * conoce como número mayor y se cambia cuando se realizan
 * modificaciones grandes o importantes.
 * 
 * El número a la derecha del punto (.), en este caso <q>00</q>, se
 * conoce como número menor y se cambia cuando se realizan
 * modificaciones menores.
 */
const VERSION = "1.6"

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "PWAMD-Los Indestructibles"

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
 "ayuda.html",
 "favicon.ico",
 "index.html",
 "site.webmanifest",
 "dark-hc.css",
 "dark-mc.css",
 "dark.css",
 "estilos.css",
 "light-hc.css",
 "light-mc.css",
 "light.css",
 "transicion_completa.css",
 "transicion_pestanas.css",
 "icono2048.png",
 "maskable_icon.png",
 "maskable_icon_x128.png",
 "maskable_icon_x192.png",
 "maskable_icon_x384.png",
 "maskable_icon_x48.png",
 "maskable_icon_x512.png",
 "maskable_icon_x72.png",
 "maskable_icon_x96.png",
 "screenshot_horizontal.png",
 "screenshot_vertical.png",
 "configura.js",
 "nav-bar.js",
 "nav-drw.js",
 "nav-tab-fixed.js",
 "nav-tab-scrollable.js",
 "registraServiceWorker.js",
 "material-symbols-outlined.css",
 "md-cards.css",
 "md-fab-primary.css",
 "md-filled-button.css",
 "md-filled-text-field.css",
 "md-list.css",
 "md-menu.css",
 "md-navigation-bar.css",
 "md-outline-button.css",
 "md-ripple.css",
 "md-segmented-button.css",
 "md-slider-field.css",
 "md-standard-icon-button.css",
 "md-switch.css",
 "md-tab.css",
 "md-top-app-bar.css",
 "roboto.css",
 "MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
 "MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
 "MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
 "roboto-v32-latin-regular.woff2",
 "abreElementoHtml.js",
 "cierraElementoHtmo.js",
 "exportaAHtml.js",
 "getAttribute.js",
 "htmlentities.js",
 "muestraError.js",
 "muestraTextoDeAyuda.js",
 "ProblemDetails.js",
 "querySelector.js",
 "resaltaSiEstasEn.js",
 "ES_APPLE.js",
 "md-menu-button.js",
 "md-options-menu.js",
 "md-overflow-button.js",
 "md-overflow-menu.js",
 "md-select-menu.js",
 "md-slider-field.js",
 "md-top-app-bar.js",
 "MdNavigationDrawer.js",
 "baseline.css",
 "colors.css",
 "elevation.css",
 "motion.css",
 "palette.css",
 "shape.css",
 "state.css",
 "typography.css",
 "dark_dup1.css",
 "light1.css",
 "custom-elements.js",
 "/"
]

// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope) {
 // Evento al empezar a instalar el servide worker,
 self.addEventListener("install",
  (/** @type {ExtendableEvent} */ evt) => {
   console.log("El service worker se está instalando.")
   evt.waitUntil(llenaElCache())
  })

 // Evento al solicitar información a la red.
 self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
  if (evt.request.method === "GET") {
   evt.respondWith(buscaLaRespuestaEnElCache(evt))
  }
 })

 // Evento cuando el service worker se vuelve activo.
 self.addEventListener("activate",
  () => console.log("El service worker está activo."))
}

async function llenaElCache() {
 console.log("Intentando cargar caché:", CACHE)
 // Borra todos los cachés.
 const keys = await caches.keys()
 for (const key of keys) {
  await caches.delete(key)
 }
 // Abre el caché de este service worker.
 const cache = await caches.open(CACHE)
 // Carga el listado de ARCHIVOS.
 await cache.addAll(ARCHIVOS)
 console.log("Cache cargado:", CACHE)
 console.log("Versión:", VERSION)
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
 // Abre el caché.
 const cache = await caches.open(CACHE)
 const request = evt.request
 /* Busca la respuesta a la solicitud en el contenido del caché, sin
  * tomar en cuenta la parte después del símbolo "?" en la URL. */
 const response = await cache.match(request, { ignoreSearch: true })
 if (response === undefined) {
  /* Si no la encuentra, empieza a descargar de la red y devuelve
   * la promesa. */
  return fetch(request)
 } else {
  // Si la encuentra, devuelve la respuesta encontrada en el caché.
  return response
 }
}