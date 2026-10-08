// Sirve dist/ tal como lo haría un hosting estático. Lo usan las pruebas.
// Uso: node scripts/serve.mjs [puerto]
import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import { createServer } from "node:http"
import { extname, join, normalize, sep } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("../dist", import.meta.url))
const port = Number(process.argv[2] ?? 4322)

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
  ".onnx": "application/octet-stream",
}

async function resolve(pathname) {
  const path = normalize(join(root, decodeURIComponent(pathname)))
  if (path !== root && !path.startsWith(root + sep)) return null
  const info = await stat(path).catch(() => null)
  if (info?.isFile()) return path
  if (info?.isDirectory()) {
    const index = join(path, "index.html")
    if ((await stat(index).catch(() => null))?.isFile()) return index
  }
  return null
}

createServer(async (request, response) => {
  const { pathname } = new URL(request.url ?? "/", "http://localhost")
  const file = await resolve(pathname)
  const path = file ?? join(root, "404.html")
  response.writeHead(file ? 200 : 404, {
    "Content-Type": TYPES[extname(path)] ?? "application/octet-stream",
    "Content-Length": (await stat(path)).size,
    "Cache-Control": "no-cache",
  })
  createReadStream(path).pipe(response)
}).listen(port, () => console.log(`dist/ en http://localhost:${port}`))
