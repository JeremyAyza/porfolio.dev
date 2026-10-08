/// <reference lib="webworker" />
import { env, pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers"
import { create, insertMultiple, search, type AnyOrama } from "@orama/orama"
import { stemmer as englishStemmer } from "@orama/stemmers/english"
import { stemmer as spanishStemmer } from "@orama/stemmers/spanish"
import { stopwords as englishStopwords } from "@orama/stopwords/english"
import { stopwords as spanishStopwords } from "@orama/stopwords/spanish"
import {
  MODEL_ID,
  MODEL_PATH,
  ORT_FILES,
  ORT_PATH,
  indexUrl,
  type SearchIndex,
  type WorkerRequest,
  type WorkerResponse,
} from "./config"

// Todo se sirve desde el propio sitio. El service worker se encarga de guardarlo.
env.allowRemoteModels = false
env.allowLocalModels = true
env.localModelPath = MODEL_PATH
env.useBrowserCache = false
env.useWasmCache = false
if (env.backends.onnx.wasm) {
  env.backends.onnx.wasm.wasmPaths = { mjs: ORT_PATH + ORT_FILES.mjs, wasm: ORT_PATH + ORT_FILES.wasm }
  env.backends.onnx.wasm.numThreads = 1
}

const LIMIT = 5
const EXCERPT_LENGTH = 150
// El modelo solo mira el principio de un texto largo; cortar antes ahorra tiempo sin cambiar el resultado.
const EMBED_MAX_CHARS = 800

// La búsqueda es híbrida: palabras (con lematización) y significado (embeddings).
// El modelo se entrenó sobre todo con inglés, así que en español pesan más las palabras.
const LANGUAGES = {
  es: {
    tokenizer: { language: "spanish", stemming: true, stemmer: spanishStemmer, stopWords: spanishStopwords },
    weights: { text: 0.5, vector: 0.5 },
  },
  en: {
    tokenizer: { language: "english", stemming: true, stemmer: englishStemmer, stopWords: englishStopwords },
    weights: { text: 0.3, vector: 0.7 },
  },
} as const

type IndexLang = keyof typeof LANGUAGES

let extractor: FeatureExtractionPipeline | null = null
let db: AnyOrama | null = null
let weights: { text: number; vector: number } = LANGUAGES.es.weights

const send = (message: WorkerResponse) => postMessage(message)

/** Un texto por llamada: en lote, todos se rellenan hasta el largo del más extenso y tarda mucho más. */
async function embed(text: string): Promise<number[]> {
  if (!extractor) throw new Error("El modelo no está cargado")
  const output = await extractor(text.slice(0, EMBED_MAX_CHARS), { pooling: "mean", normalize: true })
  return (output.tolist() as number[][])[0]
}

async function init(lang: string) {
  const started = performance.now()
  const index: SearchIndex = await (await fetch(indexUrl(lang))).json()

  extractor = await pipeline("feature-extraction", MODEL_ID, {
    device: "wasm",
    dtype: "q8",
    progress_callback: (event) => {
      if (event.status === "progress" && event.file.endsWith(".onnx")) send({ type: "progress", percent: event.progress })
    },
  })

  const vectors: number[][] = []
  for (const chunk of index.chunks) vectors.push(await embed(`${chunk.title}. ${chunk.text}`))
  const language = LANGUAGES[(lang in LANGUAGES ? lang : "es") as IndexLang]
  weights = language.weights
  const orama = create({
    schema: { title: "string", text: "string", url: "string", embedding: `vector[${vectors[0].length}]` },
    components: { tokenizer: language.tokenizer },
  })
  await insertMultiple(orama, index.chunks.map((chunk, i) => ({ ...chunk, embedding: vectors[i] })))
  db = orama

  send({ type: "ready", ms: Math.round(performance.now() - started), chunks: index.chunks.length })
}

async function query(id: number, text: string) {
  if (!db) throw new Error("El índice no está listo")
  const started = performance.now()
  const vector = await embed(text)
  const result = await search(db, {
    mode: "hybrid",
    term: text,
    vector: { value: vector, property: "embedding" },
    similarity: 0,
    hybridWeights: weights,
    limit: LIMIT,
  })
  const hits = result.hits.map((hit) => {
    const { title, url, text: body } = hit.document as unknown as { title: string; url: string; text: string }
    const cut = body.lastIndexOf(" ", EXCERPT_LENGTH)
    const excerpt = body.length > EXCERPT_LENGTH ? `${body.slice(0, cut > 0 ? cut : EXCERPT_LENGTH)}…` : body
    return { title, url, excerpt, score: hit.score }
  })
  send({ type: "results", id, hits, ms: Math.round(performance.now() - started) })
}

addEventListener("message", (event: MessageEvent<WorkerRequest>) => {
  const request = event.data
  const task = request.type === "init" ? init(request.lang) : query(request.id, request.text)
  task.catch((error: unknown) => send({ type: "error", message: error instanceof Error ? error.message : String(error) }))
})
