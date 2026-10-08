import { expect, test } from "@playwright/test"
import { ALL_PAGES, HOME, LANGS } from "./pages"

test.describe.configure({ mode: "parallel" })
test.skip(({ isMobile }) => isMobile, "Los metadatos no dependen del tamaño de pantalla")

for (const item of ALL_PAGES) {
  for (const lang of LANGS) {
    test(`metadatos de ${item[lang]}`, async ({ page, request }) => {
      await page.goto(item[lang])
      const attr = (selector: string, name: string) => page.locator(selector).getAttribute(name)

      expect((await page.title()).length).toBeGreaterThan(10)
      expect((await attr('meta[name="description"]', "content"))?.length).toBeGreaterThan(50)

      const canonical = new URL((await attr('link[rel="canonical"]', "href")) ?? "")
      expect(canonical.pathname).toBe(item[lang])

      for (const code of LANGS) {
        const alternate = new URL((await attr(`link[rel="alternate"][hreflang="${code}"]`, "href")) ?? "")
        expect(alternate.pathname).toBe(item[code])
      }
      const fallback = new URL((await attr('link[rel="alternate"][hreflang="x-default"]', "href")) ?? "")
      expect(fallback.pathname).toBe(item.es)

      // La imagen de vista previa es un PNG de 1200x630.
      const image = new URL((await attr('meta[property="og:image"]', "content")) ?? "")
      expect(image.pathname).toMatch(/\.png$/)
      const png = await (await request.get(image.pathname)).body()
      expect(png.subarray(1, 4).toString()).toBe("PNG")
      expect(png.readUInt32BE(16)).toBe(1200)
      expect(png.readUInt32BE(20)).toBe(630)
    })
  }
}

for (const lang of LANGS) {
  test(`datos estructurados de persona en ${HOME[lang]}`, async ({ page }) => {
    await page.goto(HOME[lang])
    const person = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}")
    expect(person["@type"]).toBe("Person")
    expect(person.name).toBe("Jeremy Ayza")
    expect(person.sameAs).toContain("https://github.com/JeremyAyza")
    expect(new URL(person.url).pathname).toBe(HOME[lang])
  })
}

test("el sitemap lista solo las páginas reales, con sus alternativas", async ({ request }) => {
  const index = await (await request.get("/sitemap-index.xml")).text()
  expect(index).toContain("sitemap-0.xml")

  const xml = await (await request.get("/sitemap-0.xml")).text()
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname).sort()
  expect(paths).toEqual(ALL_PAGES.flatMap((item) => [item.es, item.en]).sort())
  expect(xml).toContain('hreflang="x-default"')
})

test("robots.txt apunta al sitemap", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text()
  expect(robots).toMatch(/^Sitemap: https?:\/\/.+\/sitemap-index\.xml$/m)
})

test("sin identificador no se carga ninguna analítica", async ({ page, baseURL }) => {
  const origin = new URL(baseURL ?? "").origin
  const thirdParty: string[] = []
  page.on("request", (req) => {
    const url = new URL(req.url())
    if (url.protocol.startsWith("http") && url.origin !== origin) thirdParty.push(req.url())
  })
  await page.goto(HOME.es)
  await page.waitForLoadState("networkidle")
  expect(await page.locator("script[data-cf-beacon]").count()).toBe(0)
  expect(thirdParty).toEqual([])
})
