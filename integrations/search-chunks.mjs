import { parse } from "node-html-parser"

const clean = (text) => text.replace(/\s+/g, " ").trim()

/** Texto de un bloque. Si el bloque marca partes con `data-chunk-text`, solo cuenta esas. */
function textOf(node) {
  const copy = parse(node.outerHTML)
  for (const skipped of copy.querySelectorAll("svg title, style, script")) skipped.remove()
  const marked = copy.querySelectorAll("[data-chunk-text]")
  return clean(marked.length > 0 ? marked.map((part) => part.textContent).join(" ") : copy.textContent)
}

/**
 * Parte una página ya construida en fragmentos buscables. Solo lee el HTML publicado,
 * así el índice nunca contiene algo que el sitio no muestre.
 * @param {string} html
 * @param {string} url Ruta de la página, por ejemplo `/es/`.
 * @returns {{ title: string, text: string, url: string }[]}
 */
export function extractChunks(html, url) {
  const root = parse(html)
  const chunks = []

  // Bloques marcados en el inicio: titular, cifras, experiencia y entradas cortas.
  for (const node of root.querySelectorAll("[data-chunk]")) {
    const id = node.closest("[id]")?.getAttribute("id")
    chunks.push({ title: node.getAttribute("data-chunk"), text: textOf(node), url: id ? `${url}#${id}` : url })
  }

  // Casos: un fragmento con el resumen y uno por cada sección.
  const body = root.querySelector("[data-case-body]")
  if (body) {
    const caseTitle = clean(root.querySelector("h1").textContent)
    chunks.push({ title: caseTitle, text: clean(root.querySelector("article header").textContent), url })

    let current = null
    for (const node of body.childNodes) {
      if (node.nodeType !== 1) continue
      if (node.tagName === "H2") {
        current = { title: `${caseTitle}: ${clean(node.textContent)}`, text: "", url: `${url}#${node.getAttribute("id")}` }
        chunks.push(current)
      } else if (current) {
        current.text = clean(`${current.text} ${textOf(node)}`)
      }
    }
  }

  return chunks.filter((chunk) => chunk.text.length > 0)
}
