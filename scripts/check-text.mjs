// Revisa que al sitio construido no llegue texto de relleno ni marcadores de plantilla.
// Admite una lista adicional de términos, una entrada por línea:
//   - TEXT_CHECK_FILE: ruta a un archivo de texto (se puede definir en .env)
//   - TEXT_CHECK_TERMS: los términos, separados por saltos de línea
// Una entrada que empieza con "=" distingue mayúsculas; el resto no distingue mayúsculas ni tildes.
// Uso: npm run check:text (después de npm run build)
import { readFile, readdir } from "node:fs/promises"
import { extname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

try {
  process.loadEnvFile(fileURLToPath(new URL("../.env", import.meta.url)))
} catch {
  // Sin .env se usan las variables del entorno.
}

const dist = fileURLToPath(new URL("../dist", import.meta.url))
const BASE_TERMS = ["!!!", "lorem ipsum", "TODO", "FIXME", "[object Object]", "undefined", "NaN"]
// El texto que escribe el sitio. Los scripts solo se revisan contra la lista adicional.
const CONTENT = new Set([".html", ".json", ".xml", ".txt", ".svg"])
const SCRIPTS = new Set([".js", ".mjs"])
// Archivos de terceros: vocabulario del modelo y motor wasm.
const THIRD_PARTY = /^(models|ort)\//

const plain = (text) => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/** Coincidencia de palabra completa, para que un término corto no salte dentro de otra palabra. */
function matcher(entry) {
  const exact = entry.startsWith("=")
  const term = exact ? entry.slice(1) : plain(entry)
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${escape(term)}(?![\\p{L}\\p{N}])`, "gu")
  return { entry: exact ? term : entry, find: (text) => [...(exact ? text : plain(text)).matchAll(pattern)] }
}

async function extraTerms() {
  const sources = [process.env.TEXT_CHECK_TERMS ?? ""]
  if (process.env.TEXT_CHECK_FILE) {
    sources.push(await readFile(fileURLToPath(new URL(process.env.TEXT_CHECK_FILE, new URL("../", import.meta.url))), "utf8"))
  }
  return sources
    .join("\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)])),
  )
  return files.flat()
}

const extra = (await extraTerms()).map(matcher)
const base = BASE_TERMS.map((term) => matcher(`=${term}`))
const problems = []
let scanned = 0

for (const file of await walk(dist)) {
  const path = relative(dist, file).split("\\").join("/")
  const type = extname(file)
  if (THIRD_PARTY.test(path) || !(CONTENT.has(type) || SCRIPTS.has(type))) continue

  const text = await readFile(file, "utf8")
  scanned += 1
  for (const { entry, find } of CONTENT.has(type) ? [...base, ...extra] : extra) {
    for (const match of find(text)) {
      const context = text.slice(Math.max(0, match.index - 40), match.index + entry.length + 40).replace(/\s+/g, " ")
      problems.push(`${path}: "${entry}" en «${context}»`)
    }
  }
}

console.log(`${scanned} archivos revisados, ${base.length + extra.length} términos (${extra.length} de la lista adicional).`)
if (problems.length > 0) {
  console.error(problems.join("\n"))
  process.exit(1)
}
