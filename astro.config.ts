import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import serviceWorker from "./integrations/service-worker.mjs"
import { DEFAULT_LANG, LOCALES, alternatesFor, homePath } from "./src/i18n/routes"

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
    // Siempre al final: su lista incluye lo que escriben las demás integraciones.
    serviceWorker({ home: homePath(DEFAULT_LANG) }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
