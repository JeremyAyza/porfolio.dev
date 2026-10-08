/** Lo que comparten el build, el worker y la interfaz del buscador. */
export const MODEL_ID = "Xenova/all-MiniLM-L6-v2"
export const MODEL_PATH = "/models/"
export const ORT_FILES = { mjs: "ort-wasm-simd-threaded.mjs", wasm: "ort-wasm-simd-threaded.wasm" }
export const indexUrl = (lang: string) => `/search/index-${lang}.json`

export interface SearchChunk {
  title: string
  text: string
  url: string
}

export interface SearchIndex {
  /** Bytes que el navegador descarga la primera vez: modelo, tokenizador y motor wasm. */
  downloadBytes: number
  /** Carpeta del motor wasm. Lleva la versión para que un deploy nunca mezcle archivos de dos versiones. */
  ortPath: string
  chunks: SearchChunk[]
}

export interface SearchHit {
  title: string
  url: string
  excerpt: string
  score: number
}

export type WorkerRequest = { type: "init"; lang: string } | { type: "query"; id: number; text: string }

export type WorkerResponse =
  | { type: "progress"; percent: number }
  | { type: "ready"; ms: number; chunks: number }
  | { type: "results"; id: number; hits: SearchHit[]; ms: number }
  | { type: "error"; message: string }
