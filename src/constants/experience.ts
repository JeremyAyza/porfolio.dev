import { SKILLS } from "./skills"

const { react, typescript, javascript, node, vue, php, nextjs, pwa, express, vuetify, postgresql, nestjs, playwright } = SKILLS

export const EXPERIENCE = [
  {
    date: "Septiembre 2023 - Actualidad",
    title: "Frontend Lead · Full Stack Developer",
    company: "CasaMarket",
    description:
      "Entré cuando la empresa no tenía otro desarrollador frontend interno y asumí tres frontends en producción: el POS web (React) y el Admin y el ACL (Vue 2). <strong>Miles de empresas usan el POS 24/7</strong> para vender y emitir comprobantes ante SUNAT.",
    highlights: [
      "<strong>Liderazgo del frontend:</strong> asigné y di seguimiento al trabajo de un desarrollador junior y uno semi-senior, les enseñé el negocio, capacité al junior en Vue y JavaScript y escribí los estándares del equipo.",
      "<strong>Principal contribuidor del POS:</strong> 1862 de 4127 commits (45%), oct 2023–sep 2026.",
      "<strong>PWA offline-first:</strong> 52 de 55 commits del service worker. Agregué actualización automática, servicios de IndexedDB y sincronización de catálogo, clientes y ventas pendientes.",
      "<strong>Rediseño del flujo de venta:</strong> saqué la lógica de un helper de 1500 líneas sin tests a una capa de dominio testeable, verificada con 12 suites E2E de Playwright que comparan los payloads del POS legacy y del nuevo.",
      "<strong>WeAreData:</strong> creé desde cero el frontend de la plataforma de analítica retail (391 de 546 commits, 72%).",
      "<strong>IA en el producto:</strong> búsqueda de productos por voz con embeddings en el navegador, en producción y todavía sin uso comercial. En desarrollo: un RAG del conocimiento interno (pgvector) y un copiloto conversacional (NestJS, Vercel AI SDK) con permisos por rol validados en código.",
      "<strong>Hardware de tienda:</strong> integré por Web Serial API una lectora-balanza con protocolo propietario y un dispositivo ESP32.",
      "<strong>Entrega:</strong> bajé el build del Admin legacy de unos 18 a unos 4 minutos (−77%) al migrar de Node 8 a Node 14, y escribí una CLI que migró unos 20 proyectos de Netlify a Cloudflare Pages.",
    ],
    skills: [react, typescript, vue, node, nestjs, postgresql, pwa, playwright],
  },
  {
    date: "Febrero 2023 - Septiembre 2023",
    title: "Full Stack Developer",
    company: "Inteligenio",
    description:
      "Desarrollo full stack de una <strong>plataforma educativa</strong> que se adapta a distintas instituciones y de <strong>plataformas SaaS B2B</strong>.",
    highlights: [
      "Construí aulas virtuales, exámenes interactivos, control de asistencia, calendarios dinámicos y filtros de búsqueda avanzados.",
      "Optimicé el rendimiento de listados pesados con renderizado en servidor (SSR) de Next.js y React.",
      "Diseñé endpoints, lógica de negocio y APIs REST con Node.js y Express, y modelé datos relacionales en PostgreSQL con Sequelize.",
      "Di mantenimiento y soporte ocasional a monolitos legacy en PHP y CodeIgniter, para que los flujos críticos del negocio B2B no se interrumpieran.",
    ],
    skills: [javascript, vue, vuetify, react, nextjs, node, express, postgresql, php],
  },
]
