import type { Lang } from "@/i18n/routes"

export interface WorkEntry {
  id: string
  title: string
  summary: string
  stack: string[]
  status?: string
  demo?: string
  code?: string
}

interface WorkGroups {
  company: WorkEntry[]
  personal: WorkEntry[]
}

const MINECRAFT = {
  demo: "https://minecraft-react-iuff.onrender.com/",
  code: "https://github.com/JeremyAyza/minecraft-react",
}

const INSIGHTOS = {
  demo: "https://dashboard-insight-os.onrender.com/",
  code: "https://github.com/JeremyAyza/dashboard-insight-os",
}

export const WORK: Record<Lang, WorkGroups> = {
  es: {
    company: [
      {
        id: "wearedata",
        title: "WeAreData: frontend de una plataforma de analítica retail",
        summary:
          "Creé el frontend desde cero: arquitectura, stack y dashboards configurables. 391 de 546 commits (72%).",
        stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Recharts"],
        status: "En desarrollo",
      },
      {
        id: "copilot",
        title: "Copiloto conversacional para el POS",
        summary:
          "Los permisos por rol viven en el código, nunca en el prompt: un guard valida el rol antes de cada llamada a herramientas.",
        stack: ["NestJS", "Vercel AI SDK", "Zod", "PostgreSQL"],
        status: "En desarrollo",
      },
      {
        id: "rag",
        title: "RAG del conocimiento interno",
        summary:
          "Responde en tres pasos: un modelo decide el módulo de negocio, la búsqueda por similitud corre solo dentro de ese módulo y cada respuesta cita su fuente.",
        stack: ["PostgreSQL", "pgvector", "MCP"],
        status: "En desarrollo",
      },
      {
        id: "agents",
        title: "Agentes de código en paralelo",
        summary:
          "Planifico el trabajo, lo divido en tickets y corro agentes de código en worktrees paralelos, con contratos de integración que escribo yo. Una corrida entregó 7 tickets en unas 3 horas con 34 tests pasando. El código lo escribieron los agentes. La planificación, la integración y la verificación fueron mías.",
        stack: ["Claude Code", "Cursor", "Git worktrees"],
      },
      {
        id: "migrator",
        title: "CLI de migración de Netlify a Cloudflare Pages",
        summary:
          "Lee de la API de Netlify los comandos de build, la carpeta de salida y las variables de entorno, crea cada proyecto en Cloudflare Pages y fuerza el primer deploy. Unos 20 proyectos migrados.",
        stack: ["Node.js", "TypeScript"],
      },
      {
        id: "hardware",
        title: "Hardware de tienda por Web Serial API",
        summary: "Integré una lectora-balanza con protocolo propietario y un dispositivo ESP32.",
        stack: ["Web Serial API", "ESP32"],
      },
      {
        id: "admin-build",
        title: "Build del Admin legacy",
        summary: "De unos 18 a unos 4 minutos (−77%) al migrar de Node 8 a Node 14.",
        stack: ["Vue 2", "Node.js"],
      },
    ],
    personal: [
      {
        id: "minecraft",
        title: "Clon de Minecraft",
        summary: "Construcción de bloques en 3D en tiempo real, con física y controles en primera persona.",
        stack: ["React", "Three.js", "React Three Fiber", "Zustand"],
        ...MINECRAFT,
      },
      {
        id: "insightos",
        title: "InsightOS",
        summary: "Dashboard con varias vistas, gráficos con Recharts y un explorador de datos con filtros.",
        stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
        ...INSIGHTOS,
      },
    ],
  },
  en: {
    company: [
      {
        id: "wearedata",
        title: "WeAreData: frontend for a retail analytics platform",
        summary:
          "Built the frontend from scratch: architecture, stack and configurable dashboards. 391 of 546 commits (72%).",
        stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Recharts"],
        status: "In development",
      },
      {
        id: "copilot",
        title: "Conversational copilot for the POS",
        summary:
          "Role permissions live in code, never in the prompt: a guard checks the role before every tool call.",
        stack: ["NestJS", "Vercel AI SDK", "Zod", "PostgreSQL"],
        status: "In development",
      },
      {
        id: "rag",
        title: "RAG over internal knowledge",
        summary:
          "It answers in three steps: a model picks the business module, similarity search runs only inside that module, and every answer cites its source.",
        stack: ["PostgreSQL", "pgvector", "MCP"],
        status: "In development",
      },
      {
        id: "agents",
        title: "Coding agents in parallel",
        summary:
          "I plan the work, split it into tickets and run coding agents in parallel worktrees, under integration contracts I write. One run delivered 7 tickets in about 3 hours with 34 passing tests. The agents wrote the code. The planning, integration and verification were mine.",
        stack: ["Claude Code", "Cursor", "Git worktrees"],
      },
      {
        id: "migrator",
        title: "Netlify to Cloudflare Pages migration CLI",
        summary:
          "It reads build commands, output folders and environment variables from the Netlify API, creates each project on Cloudflare Pages and forces the first deploy. About 20 projects migrated.",
        stack: ["Node.js", "TypeScript"],
      },
      {
        id: "hardware",
        title: "Store hardware over the Web Serial API",
        summary: "Integrated a scanner-scale with a proprietary protocol and an ESP32 device.",
        stack: ["Web Serial API", "ESP32"],
      },
      {
        id: "admin-build",
        title: "Legacy Admin build",
        summary: "From about 18 to about 4 minutes (−77%) by migrating from Node 8 to Node 14.",
        stack: ["Vue 2", "Node.js"],
      },
    ],
    personal: [
      {
        id: "minecraft",
        title: "Minecraft clone",
        summary: "Real-time 3D block building, with physics and first-person controls.",
        stack: ["React", "Three.js", "React Three Fiber", "Zustand"],
        ...MINECRAFT,
      },
      {
        id: "insightos",
        title: "InsightOS",
        summary: "A dashboard with several views, Recharts charts and a data explorer with filters.",
        stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
        ...INSIGHTOS,
      },
    ],
  },
}
