// Capturas de página completa en escritorio y móvil, tema claro y oscuro.
// Uso: node scripts/screenshots.mjs <baseUrl> <outDir> [ruta...]
import { chromium } from "@playwright/test"

const [base, out, ...paths] = process.argv.slice(2)
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "chrome" })
const sizes = { desktop: { width: 1280, height: 800 }, mobile: { width: 375, height: 812 } }

for (const [device, viewport] of Object.entries(sizes)) {
  for (const theme of ["dark", "light"]) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1, colorScheme: theme })
    const page = await context.newPage()
    for (const path of paths) {
      await page.goto(base + path, { waitUntil: "networkidle" })
      await page.evaluate(() => document.querySelector("astro-dev-toolbar")?.remove())
      const name = path.replace(/\W+/g, "_").replace(/^_|_$/g, "") || "root"
      await page.screenshot({ path: `${out}/${name}-${device}-${theme}.png`, fullPage: true })
    }
    await context.close()
  }
}
await browser.close()
