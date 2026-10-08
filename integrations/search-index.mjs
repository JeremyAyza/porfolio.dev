import { copyFile, mkdir, readFile, rename, stat, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { extractChunks } from "./search-chunks.mjs"

const MODEL_FILES = ["config.json", "tokenizer.json", "tokenizer_config.json", "onnx/model_quantized.onnx"]
// Cloudflare Pages no acepta archivos de más de 25 MiB.
const MAX_FILE_BYTES = 25 * 1024 * 1024

const exists = (path) => stat(path).then(() => true, () => false)

/** Descarga el modelo una vez y lo reutiliza en los siguientes builds. */
async function ensureModel(modelId, cacheDir, logger) {
  for (const file of MODEL_FILES) {
    const target = join(cacheDir, file)
    if (await exists(target)) continue
    const url = `https://huggingface.co/${modelId}/resolve/main/${file}`
    logger.info(`Descargando ${url}`)
    const response = await fetch(url)
    if (!response.ok) throw new Error(`No se pudo descargar ${url}: ${response.status}`)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(`${target}.part`, Buffer.from(await response.arrayBuffer()))
    await rename(`${target}.part`, target)
  }
}

async function copyInto(source, target) {
  const { size } = await stat(source)
  if (size > MAX_FILE_BYTES) throw new Error(`${source} pesa ${size} bytes y supera el límite de ${MAX_FILE_BYTES}`)
  await mkdir(dirname(target), { recursive: true })
  await copyFile(source, target)
  return size
}

/**
 * Prepara el buscador: un índice de texto por idioma, sacado del HTML ya construido,
 * y los archivos del modelo y del motor wasm servidos desde el propio sitio.
 * Los embeddings se calculan en el navegador.
 * @param {{ modelId: string, pages: Record<string, string[]>, ortFiles: string[] }} options
 * @returns {import("astro").AstroIntegration}
 */
export default function searchIndex({ modelId, pages, ortFiles }) {
  return {
    name: "search-index",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const out = fileURLToPath(dir)
        const project = fileURLToPath(new URL("../", import.meta.url))
        const cacheDir = join(project, "node_modules/.cache/search-model", modelId)

        await ensureModel(modelId, cacheDir, logger)

        let downloadBytes = 0
        for (const file of MODEL_FILES) {
          downloadBytes += await copyInto(join(cacheDir, file), join(out, "models", modelId, file))
        }
        for (const file of ortFiles) {
          downloadBytes += await copyInto(join(project, "node_modules/onnxruntime-web/dist", file), join(out, "ort", file))
        }

        for (const [lang, urls] of Object.entries(pages)) {
          const chunks = []
          for (const url of urls) {
            chunks.push(...extractChunks(await readFile(join(out, url, "index.html"), "utf8"), url))
          }
          await mkdir(join(out, "search"), { recursive: true })
          await writeFile(join(out, "search", `index-${lang}.json`), JSON.stringify({ downloadBytes, chunks }))
          logger.info(`search/index-${lang}.json: ${chunks.length} fragmentos`)
        }
        logger.info(`Descarga del buscador en el navegador: ${(downloadBytes / 1e6).toFixed(1)} MB`)
      },
    },
  }
}
