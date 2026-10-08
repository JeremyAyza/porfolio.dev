import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import searchIndex from "./integrations/search-index.mjs"
import serviceWorker from "./integrations/service-worker.mjs"
import { DEFAULT_LANG, LOCALES, PAGES, alternatesFor, homePath } from "./src/i18n/routes"
import { MODEL_ID, ORT_FILES } from "./src/scripts/search/config"

// La dirección pública vive en un solo lugar. Se cambia con la variable SITE_URL.
const site = process.env.SITE_URL ?? "https://jeremy-ayza.onrender.com"

export default defineConfig({
  site,
  trailingSlash: "always",
  compressHTML: true,
  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LANG,
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => alternatesFor(new URL(page).pathname) !== null,
      serialize(item) {
        const alternates = alternatesFor(new URL(item.url).pathname)
        if (!alternates) return item
        return {
          ...item,
          links: [
            ...LOCALES.map((lang) => ({ lang, url: new URL(alternates[lang], site).href })),
            { lang: "x-default", url: new URL(alternates[DEFAULT_LANG], site).href },
          ],
        }
      },
    }),
    searchIndex({
      modelId: MODEL_ID,
      pages: Object.fromEntries(LOCALES.map((lang) => [lang, PAGES.map((page) => page[lang])])),
      ortFiles: Object.values(ORT_FILES),
    }),
    // Siempre al final: su lista incluye lo que escriben las demás integraciones.
    serviceWorker({ home: homePath(DEFAULT_LANG) }),
  ],
  vite: {
    plugins: [tailwindcss()],
    worker: { format: "es" },
    resolve: {
      alias: {
        // El buscador solo usa el motor wasm en CPU. Esta variante no trae WebGPU y carga
        // el archivo .wasm desde /ort/ en lugar de meter una copia de 27 MB en el bundle.
        "onnxruntime-web/webgpu": fileURLToPath(
          new URL("./node_modules/onnxruntime-web/dist/ort.wasm.min.mjs", import.meta.url),
        ),
      },
    },
  },
})
