import { indexUrl, type SearchHit, type SearchIndex, type WorkerRequest, type WorkerResponse } from "./config"

const LOADED_KEY = "search:loaded"
const DEBOUNCE_MS = 200

const dialog = document.querySelector<HTMLDialogElement>("#search-dialog")
if (dialog) setup(dialog)

function setup(dialog: HTMLDialogElement) {
  const find = <T extends HTMLElement>(selector: string) => dialog.querySelector<T>(selector)!
  const strings: Record<string, string> = JSON.parse(dialog.dataset.strings ?? "{}")
  const lang = dialog.dataset.lang ?? "es"
  const text = (key: string, vars: Record<string, string | number> = {}) =>
    Object.entries(vars).reduce((out, [name, value]) => out.replace(`{${name}}`, String(value)), strings[`search.${key}`] ?? "")

  const start = find("[data-search-start]")
  const loadButton = find<HTMLButtonElement>("[data-search-load]")
  const progress = find("[data-search-progress]")
  const bar = find("[data-search-bar]")
  const main = find("[data-search-main]")
  const input = find<HTMLInputElement>("#search-input")
  const results = find<HTMLOListElement>("[data-search-results]")
  const status = find("[data-search-status]")

  let state: "idle" | "available" | "loading" | "ready" | "failed" = "idle"
  let worker: Worker | null = null
  let lastQuery = 0
  let timer = 0

  function fail(message: string) {
    state = "failed"
    start.hidden = true
    main.hidden = true
    results.replaceChildren()
    status.textContent = message
  }

  /** Lee el índice para saber si el buscador existe en este build y cuánto pesa la descarga. */
  async function prepare() {
    if (state !== "idle") return
    if (typeof Worker === "undefined" || typeof WebAssembly === "undefined") return fail(text("error"))
    try {
      const response = await fetch(indexUrl(lang))
      if (!response.ok) return fail(text("unavailable"))
      const index: SearchIndex = await response.json()
      loadButton.textContent = text("load", { mb: Math.round(index.downloadBytes / 1e6) })
      loadButton.disabled = false
      state = "available"
      if (remembered()) load()
    } catch {
      fail(text("unavailable"))
    }
  }

  function load() {
    if (state !== "available") return
    state = "loading"
    loadButton.disabled = true
    progress.hidden = false
    status.textContent = text("loading")

    worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" })
    worker.addEventListener("message", (event: MessageEvent<WorkerResponse>) => onMessage(event.data))
    worker.addEventListener("error", () => fail(text("error")))
    post({ type: "init", lang })
  }

  const post = (message: WorkerRequest) => worker?.postMessage(message)

  function onMessage(message: WorkerResponse) {
    if (message.type === "progress") {
      const percent = Math.round(message.percent)
      bar.style.width = `${percent}%`
      progress.setAttribute("aria-valuenow", String(percent))
      if (percent >= 100) status.textContent = text("indexing")
    } else if (message.type === "ready") {
      state = "ready"
      remember()
      start.hidden = true
      main.hidden = false
      status.textContent = text("ready", { chunks: message.chunks, ms: message.ms })
      input.focus()
      if (input.value.trim()) query()
    } else if (message.type === "results") {
      if (message.id !== lastQuery) return
      render(message.hits)
      status.textContent = message.hits.length ? text("timing", { ms: message.ms }) : text("empty")
    } else {
      fail(text("error"))
    }
  }

  function query() {
    const value = input.value.trim()
    if (state !== "ready") return
    if (!value) {
      results.replaceChildren()
      status.textContent = ""
      return
    }
    lastQuery += 1
    post({ type: "query", id: lastQuery, text: value })
  }

  function render(hits: SearchHit[]) {
    results.replaceChildren(
      ...hits.map((hit) => {
        const item = document.createElement("li")
        const link = document.createElement("a")
        link.href = hit.url
        link.className = "group block py-3"
        link.addEventListener("click", () => dialog.close())

        const title = document.createElement("span")
        title.className = "block font-medium group-hover:text-accent"
        title.textContent = hit.title

        const excerpt = document.createElement("span")
        excerpt.className = "mt-0.5 block text-sm text-muted"
        excerpt.textContent = hit.excerpt

        link.append(title, excerpt)
        item.append(link)
        return item
      }),
    )
  }

  function remembered() {
    try {
      return localStorage.getItem(LOADED_KEY) === "1"
    } catch {
      return false
    }
  }

  function remember() {
    try {
      localStorage.setItem(LOADED_KEY, "1")
    } catch {
      // Sin almacenamiento, la próxima vez se vuelve a pedir el clic.
    }
  }

  function open() {
    if (dialog.open) return
    dialog.showModal()
    if (state === "ready") input.focus()
    void prepare()
  }

  loadButton.addEventListener("click", load)

  input.addEventListener("input", () => {
    clearTimeout(timer)
    timer = window.setTimeout(query, DEBOUNCE_MS)
  })

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return
    results.querySelector<HTMLAnchorElement>("a")?.click()
  })

  for (const example of dialog.querySelectorAll<HTMLButtonElement>("[data-search-example]")) {
    example.addEventListener("click", () => {
      input.value = example.textContent?.trim() ?? ""
      input.focus()
      query()
    })
  }

  for (const button of document.querySelectorAll("[data-search-open]")) button.addEventListener("click", open)

  // Clic en el fondo: cierra.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close()
  })

  document.addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement | null
    const typing = target?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")
    if (event.key !== "/" || typing || event.metaKey || event.ctrlKey || event.altKey) return
    event.preventDefault()
    open()
  })
}
