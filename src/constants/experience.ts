import { SKILLS } from "./skills"

const { react, typescript, javascript, sass, tailwind, node, vue, php, nextjs, pwa, express, vuetify, github, gitlab } = SKILLS

export const EXPERIENCE = [
  {
    date: "Septiembre 2023 - Actualidad",
    title: "Tech Lead & Web Developer",
    company: "CasaMarket",
    description:
      "Lidero el equipo de frontend y la calidad técnica. Logré una <strong>reducción del 77% en tiempos de deployment</strong> migrando legacy code. Diseñé la solución <strong>Offline-First (PWA)</strong> para el POS garantizando continuidad operativa. Actúo como mentor técnico y mantengo la estabilidad integral (Node.js/Vue/React) de 4 sistemas críticos.",
    link: "https://casamarket.com", // Agrega el link real si lo tienes
    skills: [vue, react, typescript, node, pwa, tailwind, github],
  },
  {
    date: "Abril 2023 - Septiembre 2023",
    title: "Frontend Developer",
    company: "Inteligenio",
    description:
      "Desarrollo de plataforma educativa <strong>SaaS</strong>. Implementé módulos interactivos para clases virtuales y exámenes, optimizando la experiencia de usuario con <strong>Vue y Vuetify</strong>. Participé en la creación de soluciones escalables para la comercialización del producto.",
    skills: [vue, vuetify, javascript, express, node, github],
  },
  {
    date: "Junio 2023 - Julio 2023",
    title: "Frontend Developer (Consultoría)",
    company: "Viajiry",
    description:
      "Consultoría especializada en UI. Desarrollé <strong>calendarios dinámicos</strong> y paneles de filtros avanzados. Aproveché <strong>Next.js (SSR)</strong> para garantizar un alto rendimiento en interfaces de búsqueda complejas.",
    skills: [nextjs, react, typescript, sass, gitlab],
  },
  {
    date: "Febrero 2023 - Abril 2023",
    title: "Analista Frontend Developer",
    company: "Paqari Software",
    description:
      "Mantenimiento <strong>Fullstack</strong> de una aplicación SaaS B2B. Implementé nuevos módulos en el frontend (React/Next.js) y aseguré la estabilidad del backend (PHP/CodeIgniter), colaborando directamente con el equipo comercial.",
    skills: [react, nextjs, php, javascript, node, github],
  },
]