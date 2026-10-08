import { expect, test, type Page } from "@playwright/test"
import { CASES, HOME, SECTIONS } from "./pages"

async function waitForOfflineCopy(page: Page) {
  await expect(page.locator("[data-offline-status]").first()).toHaveAttribute("data-state", "ready")
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null)
}

test("después de la primera visita el sitio carga sin red", async ({ page, context }) => {
  await page.goto(HOME.es)
  await waitForOfflineCopy(page)

  await context.setOffline(true)
  await page.reload()

  await expect(page.getByRole("heading", { level: 1 })).toContainText("sin internet")
  await expect(page.locator("[data-offline-status]").first()).toHaveAttribute("data-state", "offline")
  await expect(page.locator("[data-offline-status]").first()).toContainText("Sin conexión")

  // Estilos y fuentes también salen de la copia guardada.
  const fontsLoaded = await page.evaluate(async () => {
    await document.fonts.ready
    return document.fonts.check('700 16px "Space Grotesk"') && document.fonts.check('400 16px "Inter"')
  })
  expect(fontsLoaded).toBe(true)
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)")
})

test("sin red se puede abrir una página que nunca se visitó", async ({ page, context }) => {
  await page.goto(HOME.es)
  await waitForOfflineCopy(page)
  await context.setOffline(true)

  await page.locator("[data-case-card]").nth(1).click()
  await expect(page).toHaveURL(new RegExp(`${CASES[1].es}$`))
  await expect(page.locator("[data-case-body] h2")).toHaveText(SECTIONS.es)
  await expect(page.locator("[data-case-body] svg[role=img]")).toBeVisible()

  await page.locator('header a[hreflang="en"]').click()
  await expect(page).toHaveURL(new RegExp(`${CASES[1].en}$`))
  await expect(page.locator("[data-case-body] h2")).toHaveText(SECTIONS.en)
})

test("sin red, la raíz sigue llevando al inicio y una ruta desconocida muestra el 404", async ({ page, context }) => {
  await page.goto(HOME.es)
  await waitForOfflineCopy(page)
  await context.setOffline(true)

  await page.goto("/")
  await expect(page).toHaveURL(/\/es\/$/)
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()

  await page.goto("/no-existe/")
  await expect(page.getByRole("heading", { name: "Página no encontrada" })).toBeVisible()
})

test("al volver la red, el estado vuelve a guardado", async ({ page, context }) => {
  await page.goto(HOME.es)
  await waitForOfflineCopy(page)
  const status = page.locator("[data-offline-status]").first()

  await context.setOffline(true)
  await expect(status).toHaveAttribute("data-state", "offline")
  await context.setOffline(false)
  await expect(status).toHaveAttribute("data-state", "ready")
})
