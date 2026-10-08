import { expect, test } from "@playwright/test"
import { ALL_PAGES, CASES, HOME, LANGS, SECTIONS } from "./pages"

test("la raíz lleva al inicio en español", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveURL(/\/es\/$/)
  await expect(page.locator("html")).toHaveAttribute("lang", "es")
})

for (const lang of LANGS) {
  test.describe(`inicio (${lang})`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(HOME[lang])
    })

    test("muestra titular, tres cifras y tres casos", async ({ page }) => {
      await expect(page.locator("html")).toHaveAttribute("lang", lang)
      await expect(page.getByRole("heading", { level: 1 })).toContainText(lang === "es" ? "sin internet" : "offline")
      await expect(page.locator("[data-figures] > div")).toHaveCount(3)
      await expect(page.locator("[data-figures]")).toContainText("45%")
      await expect(page.locator("[data-figures]")).toContainText("190")
      await expect(page.locator("[data-case-card]")).toHaveCount(3)
    })

    test("cada tarjeta abre su caso", async ({ page }) => {
      const hrefs = await page.locator("[data-case-card] h3 a").evaluateAll((links) => links.map((a) => a.getAttribute("href")))
      expect(hrefs).toEqual(CASES.map((item) => item[lang]))
      await page.locator("[data-case-card]").first().click()
      await expect(page).toHaveURL(new RegExp(`${CASES[0][lang]}$`))
    })

    test("los enlaces externos y de contacto son los esperados", async ({ page }) => {
      const hrefs = await page.locator("main a[href]").evaluateAll((links) => links.map((a) => a.getAttribute("href")))
      expect(hrefs).toContain("https://github.com/JeremyAyza")
      expect(hrefs).toContain("https://www.linkedin.com/in/jeremyayza")
      expect(hrefs).toContain("mailto:jeremy.ayza@gmail.com")
      expect(hrefs).toContain("https://www.youtube.com/@Hackea_Tu_Riqueza")
    })
  })

  for (const item of CASES) {
    test(`caso ${item[lang]}: cuatro secciones y un diagrama`, async ({ page }) => {
      await page.goto(item[lang])
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
      await expect(page.locator("[data-case-body] h2")).toHaveText(SECTIONS[lang])

      const diagram = page.locator("[data-case-body] svg[role=img]")
      await expect(diagram).toHaveCount(1)
      await expect(diagram).toBeVisible()
      expect(await diagram.locator("title").textContent()).not.toBe("")
      expect(await diagram.locator("desc").textContent()).not.toBe("")
    })
  }
}

for (const item of ALL_PAGES) {
  test(`el selector de idioma lleva a la página equivalente: ${item.es}`, async ({ page }) => {
    await page.goto(item.es)
    await page.locator('header a[hreflang="en"]').click()
    await expect(page).toHaveURL(new RegExp(`${item.en}$`))
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await page.locator('header a[hreflang="es"]').click()
    await expect(page).toHaveURL(new RegExp(`${item.es}$`))
  })

  test(`sin desbordamiento horizontal: ${item.es}`, async ({ page }) => {
    for (const lang of LANGS) {
      await page.goto(item[lang])
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, `${item[lang]} se desborda ${overflow}px`).toBeLessThanOrEqual(0)
    }
  })
}

for (const lang of LANGS) {
  test(`el titular del inicio ocupa dos líneas como máximo en escritorio (${lang})`, async ({ page, isMobile }) => {
    test.skip(isMobile, "La regla es para escritorio")
    await page.goto(HOME[lang])
    const lines = await page.getByRole("heading", { level: 1 }).evaluate((h1) => {
      const style = getComputedStyle(h1)
      return Math.round(h1.getBoundingClientRect().height / parseFloat(style.lineHeight))
    })
    expect(lines).toBeLessThanOrEqual(2)
  })

  test(`el botón principal y el buscador del inicio se ven sin hacer scroll (${lang})`, async ({ page, isMobile }) => {
    test.skip(isMobile, "La regla es para escritorio")
    await page.goto(HOME[lang])
    await expect(page.locator("main .btn-primary")).toBeInViewport({ ratio: 1 })
    await expect(page.locator("main [data-search-open]").first()).toBeInViewport({ ratio: 1 })
  })
}

test("el menú marca la sección que se está leyendo", async ({ page, isMobile }) => {
  test.skip(isMobile, "En móvil el menú de secciones no se muestra")
  await page.goto(HOME.es)
  await page.locator("#experiencia").scrollIntoViewIfNeeded()
  await page.evaluate(() => document.querySelector("#experiencia")?.scrollIntoView({ block: "start" }))
  await expect(page.locator('header [data-nav="experiencia"]')).toHaveAttribute("aria-current", "true")
  await expect(page.locator('header [data-nav="casos"]')).not.toHaveAttribute("aria-current", "true")

  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }))
  await expect(page.locator("header [aria-current]:not([hreflang])")).toHaveCount(0)

  await page.goto(CASES[0].es)
  await expect(page.locator('header [data-nav="casos"]')).toHaveAttribute("aria-current", "true")
})

test("el tema cambia y se recuerda al recargar", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" })
  await page.goto(HOME.es)
  const html = page.locator("html")
  await expect(html).toHaveAttribute("data-theme", "dark")

  await page.locator("[data-theme-toggle]").click()
  await expect(html).toHaveAttribute("data-theme", "light")

  await page.reload()
  await expect(html).toHaveAttribute("data-theme", "light")
})

test("sin preferencia guardada sigue al sistema", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" })
  await page.goto(HOME.es)
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light")
})

test("una dirección que no existe responde 404 en los dos idiomas", async ({ page }) => {
  const response = await page.goto("/no-existe/")
  expect(response?.status()).toBe(404)
  await expect(page.getByRole("heading", { name: "Página no encontrada" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible()
})

test("la página de plantilla /components ya no existe", async ({ request }) => {
  expect((await request.get("/components/")).status()).toBe(404)
})
