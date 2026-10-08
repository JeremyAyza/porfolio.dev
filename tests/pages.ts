export const LANGS = ["es", "en"] as const
export type Lang = (typeof LANGS)[number]

export const HOME: Record<Lang, string> = { es: "/es/", en: "/en/" }

export const CASES: Record<Lang, string>[] = [
  { es: "/es/casos/pruebas-de-paridad/", en: "/en/cases/parity-tests/" },
  { es: "/es/casos/busqueda-por-voz/", en: "/en/cases/voice-search/" },
  { es: "/es/casos/pipeline-de-video/", en: "/en/cases/video-pipeline/" },
]

export const ALL_PAGES: Record<Lang, string>[] = [HOME, ...CASES]

export const SECTIONS: Record<Lang, string[]> = {
  es: ["Problema", "Decisión", "Resultado", "Límite"],
  en: ["Problem", "Decision", "Result", "Limit"],
}
