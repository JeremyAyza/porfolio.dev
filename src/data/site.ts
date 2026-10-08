import type { Lang } from "@/i18n/routes"

// TODO: el CV de Drive es de febrero de 2026. Reemplazar el archivo por la versión actualizada.
const CV_FILE_ID = "1q8Ai1v2Kd4aO1NignUlboNOcETkCgMBX"

export const SITE = {
  name: "Jeremy Ayza",
  role: "Frontend & Full Stack Developer",
  email: "jeremy.ayza@gmail.com",
  links: {
    github: "https://github.com/JeremyAyza",
    linkedin: "https://www.linkedin.com/in/jeremyayza",
    youtube: "https://www.youtube.com/@Hackea_Tu_Riqueza",
    repo: "https://github.com/JeremyAyza/porfolio.dev",
    cv: `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`,
  },
} as const

export const LOCATION: Record<Lang, string> = {
  es: "Lima, Perú",
  en: "Lima, Peru",
}

/** El titular va en partes para poder resaltar dos frases. */
export const HEADLINE: Record<Lang, { text: string; accent?: boolean }[]> = {
  es: [
    { text: "Construyo productos en React y TypeScript que " },
    { text: "siguen funcionando sin internet", accent: true },
    { text: ", y las " },
    { text: "funciones con LLM", accent: true },
    { text: " que llevan dentro." },
  ],
  en: [
    { text: "I build React and TypeScript products that " },
    { text: "keep working offline", accent: true },
    { text: ", and the " },
    { text: "LLM features", accent: true },
    { text: " inside them." },
  ],
}

export interface Figure {
  value: string
  label: string
  note: string
}

export const FIGURES: Record<Lang, Figure[]> = {
  es: [
    {
      value: "45%",
      label: "de los commits de un POS web que miles de empresas usan 24/7",
      note: "1862 de 4127 commits, oct 2023 – sep 2026",
    },
    {
      value: "12",
      label: "suites de Playwright que comparan el POS legacy y el nuevo campo por campo",
      note: "Nuevo flujo de venta, en producción",
    },
    {
      value: "190",
      label: "videos generados con mi pipeline de IA, a menos de 0.50 USD cada uno",
      note: "Proyecto personal",
    },
  ],
  en: [
    {
      value: "45%",
      label: "of the commits in a web POS that thousands of businesses use 24/7",
      note: "1,862 of 4,127 commits, Oct 2023 – Sep 2026",
    },
    {
      value: "12",
      label: "Playwright suites that compare the old POS and the new one, field by field",
      note: "New checkout, in production",
    },
    {
      value: "190",
      label: "videos made with my AI pipeline, for less than 0.50 USD each",
      note: "Personal project",
    },
  ],
}
