import { expect, test, type Page } from "@playwright/test"
import { CASES, HOME, type Lang } from "./pages"

// El modelo se descarga y se inicia dentro de la prueba.
test.describe.configure({ timeout: 120_000, mode: "serial" })

async function openSearch(page: Page, lang: Lang) {
  await page.goto(HOME[lang])
  await page.locator("header [data-search-open]").click()
  const dialog = page.locator("#search-dialog")
  await expect(dialog).toBeVisible()
  await dialog.locator("[data-search-load]").click()
  await expect(dialog.locator("#search-input")).toBeVisible({ timeout: 90_000 })
  return dialog
}

async function ask(page: Page, query: string) {
  const dialog = page.locator("#search-dialog")
  await dialog.locator("#search-input").fill(query)
  await expect(dialog.locator("[data-search-status]")).toContainText(/ms|Sin resultados|No results/)
  await page.waitForTimeout(350)
  return dialog.locator("[data-search-results] a .block:first-child").allTextContents()
}

test("el buscador pide un clic antes de descargar y luego responde", async ({ page }) => {
  const heavy: string[] = []
  page.on("request", (request) => {
    if (/\/(models|ort)\//.test(request.url())) heavy.push(request.url())
  })

  await page.goto(HOME.es)
  await page.locator("header [data-search-open]").click()
  const dialog = page.locator("#search-dialog")
  await expect(dialog.locator("[data-search-load]")).toContainText(/38 MB/)
  expect(heavy, "no descarga el modelo antes del clic").toEqual([])

  await dialog.locator("[data-search-load]").click()
  await expect(dialog.locator("#search-input")).toBeVisible({ timeout: 90_000 })
  await expect(dialog.locator("[data-search-status]")).toContainText("fragmentos indexados")

  const titles = await ask(page, "comprobar que dos sistemas calculan igual")
  expect(titles.length).toBeGreaterThan(0)
  expect(titles.slice(0, 3).join(" | ")).toContain("paridad")

  // Todo sale del propio sitio.
  expect(heavy.length).toBeGreaterThan(0)
  expect(heavy.every((url) => url.startsWith(new URL(page.url()).origin))).toBe(true)
})

test("un resultado lleva a la sección y cierra el panel", async ({ page }) => {
  const dialog = await openSearch(page, "es")
  await ask(page, "transcripción de audio")
  await dialog.locator("[data-search-results] a").first().click()
  await expect(dialog).toBeHidden()
  await expect(page).toHaveURL(new RegExp(CASES[1].es))
})

test("un ejemplo del inicio abre el buscador con la consulta y la responde", async ({ page }) => {
  await page.goto(HOME.es)
  await page.locator("main [data-search-query]").nth(1).click()

  const dialog = page.locator("#search-dialog")
  await expect(dialog.locator("#search-input")).toHaveValue("cuánto cuesta producir un video")
  await dialog.locator("[data-search-load]").click()
  await expect(dialog.locator("[data-search-results] a").first()).toContainText(/video/i, { timeout: 90_000 })
})

test("la tecla / abre el buscador y Escape lo cierra", async ({ page, isMobile }) => {
  test.skip(isMobile, "Atajo de teclado")
  await page.goto(HOME.es)
  await page.keyboard.press("/")
  await expect(page.locator("#search-dialog")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.locator("#search-dialog")).toBeHidden()
})

test("después del primer uso, el buscador funciona sin red", async ({ page, context, isMobile }) => {
  test.skip(isMobile, "Basta con comprobarlo en un tamaño")
  await page.goto(HOME.es)
  await expect(page.locator("[data-offline-status]").first()).toHaveAttribute("data-state", "ready")
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null)
  await page.reload()

  await openSearch(page, "es")
  await context.setOffline(true)
  await page.reload()

  // Ya se cargó una vez: al abrirlo arranca solo, sin pedir el clic.
  await page.locator("header [data-search-open]").click()
  await expect(page.locator("#search-input")).toBeVisible({ timeout: 90_000 })
  const titles = await ask(page, "cuánto cuesta producir un video")
  expect(titles.slice(0, 3).join(" | ")).toMatch(/video/i)
})

// Calidad: preguntas escritas con otras palabras que el contenido. La respuesta esperada
// tiene que estar entre los tres primeros resultados.
const QUESTIONS: Record<Lang, [string, RegExp][]> = {
  es: [
    ["cómo sabes que el sistema nuevo calcula igual que el viejo", /paridad/i],
    ["vender cuando se cae la conexión", /CasaMarket|Jeremy|voz/i],
    ["reconocimiento de voz", /voz/i],
    ["cuánto cuesta producir un video", /video/i],
    ["seguridad contra inyección de prompt", /Copiloto/i],
    ["gráficos y tableros de datos", /WeAreData|InsightOS/i],
    ["experiencia liderando un equipo", /CasaMarket/i],
    ["balanza y dispositivos de tienda", /Hardware/i],
    ["juego en tres dimensiones", /Minecraft/i],
    ["programar con agentes de inteligencia artificial", /Agentes/i],
    ["qué no cubren las pruebas", /Límite|paridad/i],
    ["mover sitios de un hosting a otro", /CLI/i],
    ["preguntas sobre documentación interna", /RAG/i],
    ["subtítulos automáticos", /video/i],
    ["empleo anterior en educación", /Inteligenio/i],
  ],
  en: [
    ["how do you know the new system calculates the same as the old one", /parity/i],
    ["selling when the connection drops", /CasaMarket|Jeremy|voice/i],
    ["speech recognition", /voice/i],
    ["how much does it cost to make a video", /video/i],
    ["security against prompt injection", /copilot/i],
    ["charts and data dashboards", /WeAreData|InsightOS/i],
    ["experience leading a team", /CasaMarket/i],
    ["scale and store devices", /hardware/i],
    ["three dimensional game", /Minecraft/i],
    ["writing code with AI agents", /agents/i],
    ["what the tests do not cover", /Limit|parity/i],
    ["moving sites from one host to another", /CLI/i],
    ["questions about internal documentation", /RAG/i],
    ["automatic subtitles", /video/i],
    ["previous job in education", /Inteligenio/i],
  ],
}

for (const lang of ["es", "en"] as const) {
  test(`calidad de búsqueda (${lang})`, async ({ page, isMobile }) => {
    test.skip(isMobile, "La calidad no depende del tamaño de pantalla")
    await openSearch(page, lang)

    const misses: string[] = []
    for (const [question, expected] of QUESTIONS[lang]) {
      const top = (await ask(page, question)).slice(0, 3)
      if (!top.some((title) => expected.test(title))) misses.push(`"${question}" → ${top.join(" | ")}`)
    }

    const found = QUESTIONS[lang].length - misses.length
    console.log(`calidad ${lang}: ${found}/${QUESTIONS[lang].length} entre los tres primeros\n${misses.join("\n")}`)
    expect(found, misses.join("\n")).toBeGreaterThanOrEqual(12)
  })
}
