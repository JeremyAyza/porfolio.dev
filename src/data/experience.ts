import type { Lang } from "@/i18n/routes"

export interface Job {
  period: string
  company: string
  role: string
  points: string[]
}

export const EXPERIENCE: Record<Lang, Job[]> = {
  es: [
    {
      period: "sep 2023 – actualidad",
      company: "CasaMarket",
      role: "Frontend Lead · Full Stack Developer",
      points: [
        "Asumí tres frontends en producción: el POS web (React) y el Admin y el ACL (Vue 2).",
        "Lideré el frontend: asigné y di seguimiento al trabajo de un desarrollador junior y uno semi-senior, y escribí los estándares del equipo.",
        "PWA offline-first: service worker, IndexedDB y sincronización de catálogo, clientes y ventas pendientes.",
        "IA en el producto: búsqueda por voz con embeddings en el navegador. En desarrollo, un RAG y un copiloto con permisos por rol validados en código.",
      ],
    },
    {
      period: "feb 2023 – sep 2023",
      company: "Inteligenio",
      role: "Full Stack Developer",
      points: [
        "Desarrollo full stack de una plataforma educativa y de plataformas SaaS B2B, con Vue, React, Next.js, Node.js y PostgreSQL.",
      ],
    },
  ],
  en: [
    {
      period: "Sep 2023 – Present",
      company: "CasaMarket",
      role: "Frontend Lead · Full Stack Developer",
      points: [
        "Took over three production frontends: the web POS (React) and the Admin and ACL (Vue 2).",
        "Led the frontend: assigned and tracked work for a junior and a semi-senior developer, and wrote the team standards.",
        "Offline-first PWA: service worker, IndexedDB and sync for catalog, customers and pending sales.",
        "AI in the product: voice search with embeddings in the browser. In development, a RAG and a copilot with role permissions enforced in code.",
      ],
    },
    {
      period: "Feb 2023 – Sep 2023",
      company: "Inteligenio",
      role: "Full Stack Developer",
      points: [
        "Full stack development on an education platform and on B2B SaaS platforms, with Vue, React, Next.js, Node.js and PostgreSQL.",
      ],
    },
  ],
}
