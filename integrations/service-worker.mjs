import { createHash } from "node:crypto"
import { readFile, readdir, stat, writeFile } from "node:fs/promises"
import { join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"

// No se guardan por adelantado: se sirven desde la red o se guardan al usarlos.
const SKIP = [/^sw\.js$/, /^index\.html$/, /^sitemap-/, /^robots\.txt$/, /^_headers$/, /^_redirects$/, /^og\//, /^models\//, /^ort\//]
const MAX_BYTES = 300 * 1024

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)])),
  )
  return files.flat()
}

/** `es/index.html` se pide como `/es/`. */
function toUrl(path) {
  if (path.endsWith("/index.html")) return `/${path.slice(0, -"index.html".length)}`
  return `/${path}`
}

/**
 * Genera `sw.js` con la lista de archivos del build. Va al final de las integraciones
 * para que vea todo lo que las demás escriben en la carpeta de salida.
 * @param {{ home: string }} options Página a la que se redirige `/` cuando no hay red.
 * @returns {import("astro").AstroIntegration}
 */
export default function serviceWorker({ home }) {
  return {
    name: "service-worker",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir)
        const hash = createHash("sha256")
        const urls = []

        for (const file of (await walk(root)).sort()) {
          const path = relative(root, file).split(sep).join("/")
          if (SKIP.some((pattern) => pattern.test(path))) continue
          if ((await stat(file)).size > MAX_BYTES) continue
          hash.update(path).update(await readFile(file))
          urls.push(toUrl(path))
        }

        const template = await readFile(new URL("./sw-template.js", import.meta.url), "utf8")
        const version = hash.digest("hex").slice(0, 10)
        await writeFile(
          join(root, "sw.js"),
          template
            .replace('"__VERSION__"', JSON.stringify(version))
            .replace("__PRECACHE__", JSON.stringify(urls))
            .replace('"__HOME__"', JSON.stringify(home)),
        )
        logger.info(`sw.js: ${urls.length} archivos, versión ${version}`)
      },
    },
  }
}
