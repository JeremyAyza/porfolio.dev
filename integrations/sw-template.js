// Service worker del portafolio. Lo genera integrations/service-worker.mjs al construir:
// reemplaza la versión y la lista de archivos del build.
const VERSION = "__VERSION__"
const PRECACHE = __PRECACHE__
const HEAVY = __HEAVY__
const HOME = "__HOME__"

// Páginas y archivos de este build. Se reemplaza en cada deploy.
const SITE_CACHE = `site-${VERSION}`
// Archivos pesados que se piden solo al usar el buscador (modelo y wasm). Sobrevive a los deploys.
const HEAVY_CACHE = "heavy-v1"
const NETWORK_TIMEOUT_MS = 4000

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SITE_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const stale = (await caches.keys()).filter((key) => key.startsWith("site-") && key !== SITE_CACHE)
      await Promise.all(stale.map((key) => caches.delete(key)))

      // Si cambió el modelo o el motor, se borran los archivos de la versión anterior.
      const heavy = await caches.open(HEAVY_CACHE)
      for (const request of await heavy.keys()) {
        if (!HEAVY.includes(new URL(request.url).pathname)) await heavy.delete(request)
      }
      await self.clients.claim()
    })(),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  event.respondWith(request.mode === "navigate" ? page(request, url) : asset(request, url))
})

/** Páginas: primero la red, para que un deploy se vea de inmediato. Sin red, la copia guardada. */
async function page(request, url) {
  const cache = await caches.open(SITE_CACHE)
  try {
    const response = await fetchWithTimeout(request)
    if (response.ok && !response.redirected) cache.put(request, response.clone())
    return response
  } catch {
    if (url.pathname === "/") return Response.redirect(HOME, 302)
    const cached = (await cache.match(request, { ignoreSearch: true })) ?? (await cache.match("/404.html"))
    return cached ?? Response.error()
  }
}

/** Archivos: primero la copia. Los que no están en la lista se guardan al pedirlos por primera vez. */
async function asset(request, url) {
  const cached = await caches.match(request)
  if (cached) return cached

  const response = await fetch(request)
  if (response.status === 200) {
    const cache = await caches.open(HEAVY.includes(url.pathname) ? HEAVY_CACHE : SITE_CACHE)
    cache.put(request, response.clone())
  }
  return response
}

function fetchWithTimeout(request) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), NETWORK_TIMEOUT_MS)
  return fetch(request, { signal: controller.signal }).finally(() => clearTimeout(timer))
}
