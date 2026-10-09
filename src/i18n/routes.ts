export const LOCALES = ["es", "en"] as const
export type Lang = (typeof LOCALES)[number]
export const DEFAULT_LANG: Lang = "es"

export const CASE_IDS = ["parity-tests", "voice-search", "video-pipeline"] as const
export type CaseId = (typeof CASE_IDS)[number]

const CASE_SEGMENT: Record<Lang, string> = { es: "casos", en: "cases" }

const CASE_SLUG: Record<CaseId, Record<Lang, string>> = {
  "parity-tests": { es: "pruebas-de-paridad", en: "parity-tests" },
  "voice-search": { es: "busqueda-por-voz", en: "voice-search" },
  "video-pipeline": { es: "pipeline-de-video", en: "video-pipeline" },
}

export const SECTION_IDS: Record<Lang, { cases: string; experience: string; work: string; contact: string }> = {
  es: { cases: "casos", experience: "experiencia", work: "mas-trabajo", contact: "contacto" },
  en: { cases: "cases", experience: "experience", work: "more-work", contact: "contact" },
}

export function isLang(value: string | undefined): value is Lang {
  return LOCALES.includes(value as Lang)
}

export function homePath(lang: Lang): string {
  return `/${lang}/`
}

export function caseSlug(lang: Lang, id: CaseId): string {
  return CASE_SLUG[id][lang]
}

export function casePath(lang: Lang, id: CaseId): string {
  return `/${lang}/${CASE_SEGMENT[lang]}/${CASE_SLUG[id][lang]}/`
}

/** Cada página con su ruta en los dos idiomas. */
export const PAGES: Record<Lang, string>[] = [
  { es: homePath("es"), en: homePath("en") },
  ...CASE_IDS.map((id) => ({ es: casePath("es", id), en: casePath("en", id) })),
]

/** Rutas equivalentes de una página en cada idioma, o `null` si no tiene traducción. */
export function alternatesFor(pathname: string): Record<Lang, string> | null {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`
  return PAGES.find((page) => LOCALES.some((lang) => page[lang] === normalized)) ?? null
}
