// Genera las imágenes de vista previa (PNG de 1200x630) en public/og/.
// Uso: npm run og
import { mkdir, readFile, readdir } from "node:fs/promises"
import { fileURLToPath, pathToFileURL } from "node:url"
import { chromium } from "@playwright/test"
import { HEADLINE, LOCATION, SITE, SUBHEAD } from "../src/data/site.ts"

const root = new URL("../", import.meta.url)
const out = new URL("public/og/", root)
const font = (file) => new URL(`src/assets/fonts/${file}`, root).href
const photo = `data:image/jpeg;base64,${(await readFile(new URL("src/assets/jeremy-ayza.jpg", root))).toString("base64")}`

const KIND = {
  es: { work: "Caso · Trabajo en CasaMarket", personal: "Caso · Proyecto personal" },
  en: { work: "Case · Work at CasaMarket", personal: "Case · Personal project" },
}

const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;")

function page({ eyebrow, headline, sub = "", size }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Grotesk; src: url("${font("space-grotesk-latin-wght-normal.woff2")}"); font-weight: 300 700; }
@font-face { font-family: Mono; src: url("${font("geist-mono-latin-wght-normal.woff2")}"); font-weight: 100 900; }
@font-face { font-family: Sans; src: url("${font("geist-latin-wght-normal.woff2")}"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between;
  background: #0b1220 radial-gradient(#1a2640 1.5px, transparent 1.5px) 0 0 / 28px 28px; color: #e8eef8; font-family: Grotesk; }
.eyebrow { font-family: Mono; font-size: 24px; color: #9fb0cc; }
h1 { margin-top: 28px; padding-left: 32px; border-left: 8px solid #3ddc97; font-size: ${size}px; line-height: 1.1; font-weight: 700; letter-spacing: -0.02em; }
h1 span { color: #3ddc97; }
.sub { margin: 24px 0 0 40px; font-family: Sans; font-size: 34px; line-height: 1.3; color: #9fb0cc; max-width: 900px; }
footer { display: flex; align-items: center; gap: 20px; }
img { width: 72px; height: 72px; border-radius: 50%; border: 2px solid #24324d; }
.name { font-size: 30px; font-weight: 700; }
.role { font-family: Mono; font-size: 20px; color: #9fb0cc; }
</style></head><body>
<div><p class="eyebrow">${escape(eyebrow)}</p><h1>${headline}</h1>${sub && `<p class="sub">${escape(sub)}</p>`}</div>
<footer><img src="${photo}" alt=""><div><p class="name">${SITE.name}</p><p class="role">${escape(SITE.role)}</p></div></footer>
</body></html>`
}

const jobs = []

for (const lang of ["es", "en"]) {
  jobs.push({
    file: `home-${lang}.png`,
    html: page({
      eyebrow: `${SITE.role} · ${LOCATION[lang]}`,
      headline: HEADLINE[lang].map((part) => (part.accent ? `<span>${escape(part.text)}</span>` : escape(part.text))).join(""),
      sub: SUBHEAD[lang],
      size: 74,
    }),
  })

  const dir = new URL(`src/content/cases/${lang}/`, root)
  for (const name of await readdir(dir)) {
    const source = await readFile(new URL(name, dir), "utf8")
    const field = (key) => source.match(new RegExp(`^${key}: (.*)$`, "m"))?.[1].trim()
    jobs.push({
      file: `${field("caseId")}-${lang}.png`,
      html: page({ eyebrow: KIND[lang][field("kind")], headline: escape(field("title")), size: 72 }),
    })
  }
}

await mkdir(out, { recursive: true })
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? (process.env.CI ? undefined : "chrome") })
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })

for (const job of jobs) {
  // Las fuentes se cargan desde archivos locales, así que la página necesita un origen file://.
  await tab.goto(pathToFileURL(fileURLToPath(new URL("package.json", root))).href)
  await tab.setContent(job.html, { waitUntil: "load" })
  await tab.evaluate(() => document.fonts.ready)
  await tab.screenshot({ path: fileURLToPath(new URL(job.file, out)), type: "png" })
  console.log(`og/${job.file}`)
}

await browser.close()
