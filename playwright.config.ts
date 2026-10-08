import { defineConfig, devices } from "@playwright/test"

// Las pruebas corren contra el sitio construido: `npm run build` antes de `npm test`.
const PORT = 4322

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // En local se usa el Chrome instalado; en CI, el Chromium de Playwright.
    channel: process.env.PW_CHANNEL ?? (process.env.CI ? undefined : "chrome"),
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `node scripts/serve.mjs ${PORT}`,
    url: `http://localhost:${PORT}/es/`,
    reuseExistingServer: !process.env.CI,
  },
})
