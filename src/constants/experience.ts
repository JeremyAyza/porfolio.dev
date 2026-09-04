import { SKILLS } from "./skills"

const { react, typescript, javascript, tailwind, node, vue, php, nextjs, pwa, express, vuetify, github, postgresql, openai, whisper, huggingface } = SKILLS

export const EXPERIENCE = [
  {
    date: "Septiembre 2023 - Actualidad",
    title: "Tech Lead & Fullstack Developer",
    company: "CasaMarket",
    description:
      "Lidero el equipo de frontend y la calidad técnica de 4 sistemas en producción. Reduje un <strong>77% el tiempo de deployment</strong> liderando una migración técnica de infraestructura legacy. Diseñé la arquitectura <strong>Offline-First (PWA)</strong> del punto de venta y llevé IA generativa a producto real: <strong>RAG interno</strong>, búsqueda semántica vectorial y comandos de voz para flujos de venta desatendidos. También diseño el <strong>workflow de desarrollo del equipo</strong> con agentes de código (Skills, MCP) para automatizar releases y research.",
    link: "https://casamarket.com", // Agrega el link real si lo tienes
    skills: [vue, react, typescript, node, pwa, tailwind, openai, whisper, huggingface, github],
  },
  {
    date: "Febrero 2023 - Septiembre 2023",
    title: "Fullstack Developer",
    company: "Inteligenio",
    description:
      "Desarrollo y mantenimiento de plataformas <strong>SaaS B2B</strong> y de una plataforma educativa (aulas virtuales, exámenes interactivos). Optimicé listados pesados con <strong>Next.js (SSR)</strong>, diseñé endpoints con <strong>Node.js/Express</strong> y modelé datos en <strong>PostgreSQL</strong>, además de dar soporte a arquitectura legacy en PHP/CodeIgniter sin interrumpir un negocio B2B activo.",
    skills: [nextjs, react, vue, vuetify, javascript, express, node, postgresql, php, github],
  },
]
