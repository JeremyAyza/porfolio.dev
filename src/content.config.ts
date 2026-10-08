import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { CASE_IDS, LOCALES } from "./i18n/routes"

const cases = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/cases" }),
  schema: z.object({
    /** Clave común de un caso en todos los idiomas. */
    caseId: z.enum(CASE_IDS),
    lang: z.enum(LOCALES),
    order: z.number(),
    kind: z.enum(["work", "personal"]),
    title: z.string(),
    summary: z.string(),
    /** Las tres líneas de la tarjeta del inicio. */
    card: z.object({
      problem: z.string(),
      decision: z.string(),
      result: z.string(),
    }),
    period: z.string(),
    status: z.string(),
    stack: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
  }),
})

export const collections = { cases }
