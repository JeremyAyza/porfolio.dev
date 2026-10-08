import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { ALL_PAGES, HOME, LANGS } from "./pages"

const THEMES = ["dark", "light"] as const

/** La entrada del hero baja la opacidad un instante; el contraste se mide con la página ya quieta. */
const settled = (page: import("@playwright/test").Page) =>
  page.waitForFunction(() => document.getAnimations().every((animation) => animation.playState === "finished"))

for (const theme of THEMES) {
  for (const item of ALL_PAGES) {
    for (const lang of LANGS) {
      test(`accesibilidad AA en ${item[lang]} (tema ${theme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: theme })
        await page.goto(item[lang])
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme)
        await settled(page)

        const { violations, passes } = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze()
        expect(passes.map((rule) => rule.id), "axe revisó el contraste").toContain("color-contrast")
        const summary = violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)
        expect(summary).toEqual([])
      })
    }
  }

  test(`accesibilidad AA del buscador abierto (tema ${theme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme })
    await page.goto(HOME.es)
    await page.locator("header [data-search-open]").click()
    await expect(page.locator("#search-dialog [data-search-load]")).toBeEnabled()
    await settled(page)

    const { violations } = await new AxeBuilder({ page })
      .include("#search-dialog")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([])
  })
}

test("los controles táctiles miden al menos 44 px", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Solo en pantalla táctil")
  await page.goto(HOME.es)
  const small = await page.locator("header a, header button, main .btn").evaluateAll((nodes) =>
    nodes
      .map((node) => ({ label: node.textContent?.trim().slice(0, 30), box: node.getBoundingClientRect() }))
      .filter(({ box }) => box.width > 0 && box.height < 44)
      .map(({ label, box }) => `${label}: ${Math.round(box.width)}x${Math.round(box.height)}`),
  )
  expect(small).toEqual([])
})
