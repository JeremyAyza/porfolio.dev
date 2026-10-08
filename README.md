# Portafolio de Jeremy Ayza

Sitio estático en [Astro](https://astro.build) con dos idiomas (`/es` y `/en`), tema claro y oscuro, tres casos con página propia y dos demos que corren en el navegador:

- **Funciona sin internet.** Un service worker propio guarda las páginas en la primera visita.
- **Buscador semántico.** Transformers.js calcula los embeddings en un Web Worker y Orama hace una búsqueda híbrida (palabras y significado). No hay servidor: el modelo y el motor wasm se sirven desde el propio sitio y solo se descargan cuando alguien abre el buscador.

## Requisitos

Node 22.12 o superior (ver `.nvmrc`).

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo. El modo sin internet y el buscador no están activos aquí: los genera el build. |
| `npm run build` | Revisa tipos y construye el sitio en `dist/`. La primera vez descarga el modelo del buscador (23 MB). |
| `npm run serve` | Sirve `dist/` en `http://localhost:4322`, como lo haría el hosting. |
| `npm test` | Pruebas con Playwright sobre `dist/`. Hay que construir antes. |
| `npm run check:text` | Busca texto de relleno o marcadores de plantilla en `dist/`. |
| `npm run og` | Regenera las imágenes de vista previa de `public/og/`. |
| `npm run screenshots -- <url> <carpeta> <ruta...>` | Capturas de página completa en escritorio y móvil, en los dos temas. |

En local las pruebas usan el Chrome instalado. Para usar el Chromium de Playwright: `PW_CHANNEL=chromium npm test`.

## Estructura

```
astro.config.ts          sitio, idiomas, sitemap e integraciones propias
integrations/            service worker e índice del buscador (corren al terminar el build)
scripts/                 servidor estático, imágenes de vista previa, capturas y revisión de texto
src/content/cases/       los casos en MDX, uno por idioma
src/components/diagrams/ los diagramas de cada caso, en SVG
src/data/                textos del inicio: titular, cifras, experiencia y más trabajo
src/i18n/                rutas por idioma y textos de la interfaz
src/scripts/search/      worker y cliente del buscador
tests/                   pruebas: páginas, metadatos, accesibilidad, sin internet y buscador
```

### Agregar un caso

1. Agrega su clave y sus direcciones en `src/i18n/routes.ts`.
2. Crea `src/content/cases/es/<clave>.mdx` y `src/content/cases/en/<clave>.mdx` con las secciones Problema, Decisión, Resultado y Límite.
3. Dibuja su diagrama en `src/components/diagrams/`.
4. Corre `npm run og` para generar su imagen de vista previa y agrega sus rutas en `tests/pages.ts`.

## Variables de entorno

| Variable | Para qué |
|---|---|
| `SITE_URL` | Dirección pública del sitio. Se usa en las direcciones canónicas, el sitemap y las imágenes de vista previa. Por defecto, `https://jeremy-ayza.onrender.com`. |
| `PUBLIC_CF_BEACON_TOKEN` | Identificador de Cloudflare Web Analytics (sin cookies). Si no está definido, el sitio no carga ninguna analítica. |

## Publicar

El sitio es una carpeta estática, así que sirve cualquier hosting.

- **Render (Static Site).** Build: `npm ci && npm run build`. Carpeta: `dist`. Variables: `NODE_VERSION=22`, y `SITE_URL` si cambia la dirección.
- **Cloudflare Pages.** Build: `npm run build`. Carpeta: `dist`. Toma la versión de Node de `.nvmrc`. Los archivos `_headers` y `_redirects` de `public/` ya están en su formato.

La analítica funciona igual en los dos: crea el sitio en Cloudflare Web Analytics y define `PUBLIC_CF_BEACON_TOKEN` antes de construir.

## Fuentes

Space Grotesk, Inter y JetBrains Mono (SIL Open Font License 1.1), servidas desde el propio sitio.
