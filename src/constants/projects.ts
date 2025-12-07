// import { TAGS } from "./skills";
import { SKILLS } from "./skills";
import type { Project } from "./types";
const { react, typescript,java, spring, mysql, threejs, tailwind, javascript, html, css, r3, vite, zustand, bootstrap, reactrouter, node, 
	express, mongo, mongoose, bun, hono, redux, stripe, nextjs, vue } = SKILLS
export const CATEGORIES = {
	FRONTEND: "Frontend",
	BACKEND: "Backend",
	MOBILE: "Mobile",
	FULLSTACK: "Fullstack",
	ALGORITHMICA: "Algorítmica"
}
export const PROJECTS: Project[] = [
	{
    title: "Minecraft Clone – 3D World Builder con React Three Fiber",
    description:
      "Clon funcional de Minecraft construido desde cero con React, Three.js y r3. Renderizado 3D en tiempo real, física con Cannon.js, controles de primera persona y sistema de construcción interactivo.",
    link: "https://minecraft-react-iuff.onrender.com/",
    github: "https://github.com/JeremyAyza/minecraft-react",
    image: "/projects/react-minecraft.webp",
    level: "avanzado",
    hidden: false,
    skills: [react, typescript, threejs, r3, vite, zustand],
    features: [
      "Construcción en tiempo real con texturas dinámicas",
      "Controles FPS completos (WASD + mouse)",
      "Física realista con Cannon.js",
      "Rendimiento optimizado con useFrame",
      "Gestión global con Zustand"
    ],
    highlights: [
      "Proyecto avanzado de gráficos 3D",
      "Control manual de render loops y física",
      "Integración eficiente entre r3 y Cannon.js"
    ],
    categories: [CATEGORIES.FRONTEND],
    extra: {
      date: "!!!",
      status: "online",
      demoVideo: "!!!"
    }
  },
	{
  title: "InsightOS – AI Ethics & Data Dashboard",
  description:
    "Dashboard interactivo de monitoreo de métricas éticas de IA y análisis de datos globales. Interfaz futurista con diseño cyber-tech, gráficos en tiempo real y navegación modular.",
  link: "https://dashboard-insight-os.onrender.com/",
  github: "https://github.com/JeremyAyza/dashboard-insight-os",
  image: "/projects/insightos-dashboard.webp",
  level: "avanzado",
  hidden: false,
  skills: [react, typescript, vite, tailwind],
  features: [
    "Dashboard con múltiples vistas: métricas éticas, actividad de IA, huella global",
    "Gráficos interactivos con Recharts",
    "Explorador de datos con filtros avanzados",
    "Autenticación y sistema de login",
    "Diseño futurista con estética cyber-tech"
  ],
  highlights: [
    "Arquitectura modular por features",
    "UI/UX premium con animaciones y efectos glassmorphism",
    "Sistema de navegación fluido con React Router"
  ],
  categories: [CATEGORIES.FRONTEND],
  extra: {
    date: "2025",
    status: "development",
    demoVideo: "!!!"
  }
},
 {
    title: "Instagram Follow Manager PRO",
    description:
      "Extensión de Chrome profesional para la gestión de seguidores. Analiza conexiones, detecta 'non-followers' y automatiza tareas con seguridad avanzada y privacidad local.",
    link: "!!!",
    github: "https://github.com/JeremyAyza/instagram-tool",
    image: "/projects/ig-tools.webp",
    level: "avanzado",
    hidden: false,
    skills: [javascript, html, css],
    features: [
      "Análisis en tiempo real de seguidores vs seguidos",
      "Intercepción de tráfico de red para sincronización automática",
      "Automatización con delays y 'jitter' para evitar bloqueos",
      "Exportación e importación masiva de CSV",
      "Privacidad total: ejecución 100% client-side"
    ],
    highlights: [
      "Manipulación avanzada de Chrome Extensions API",
      "Ingeniería inversa de endpoints de Instagram",
      "Manejo robusto de headers de seguridad (Sec-Fetch-Site)"
    ],
    categories: [CATEGORIES.FRONTEND],
    extra: {
      date: "2025",
      status: "development",
      demoVideo: "!!!"
    }
  },
	{
		title: "SVGL - A beautiful library with SVG logos",
		description:
			"Biblioteca de logos SVG de las marcas más populares. +10k visitas al mes. +2K svgs descargados. Creado desde cero con Next.js, React y Tailwind CSS.",
		link: "https://svgl.vercel.app/",
		github: "https://github.com/pheralb/svgl",
		image: "/projects/landing-infojobs.webp",
		skills: [
			react, nextjs, vue
		],
		categories: [CATEGORIES.FRONTEND]

	},
	{
		title: "AdventJS - Retos de programación con JavaScript y TypeScript",
		description:
			"Plataforma gratuita con retos de programación. Más de 1 millón de visitas en un mes. +50K retos completados. Creada desde cero con Next.js, React y Tailwind CSS.",
		link: "https://adventjs.dev",
		image: "/projects/adventjs.webp",
		categories: [CATEGORIES.FRONTEND],
		github: "https://github.com/JeremyAyza/adventjs",
		skills: [react, nextjs, vue]
	},
  // -------------------------------
  // 1. Minecraft Clone (React Three Fiber)
  // -------------------------------
  

  // -------------------------------
  // 2. Sales Management Dashboard (React + Bootstrap)
  // -------------------------------
  {
    title: "Sales Management Dashboard",
    description:
      "Dashboard administrativo con múltiples módulos: usuarios, clientes, productos, proveedores, ventas y autenticación. UI moderna construida con React y Bootstrap.",
    link: "!!!",
    github: "https://github.com/JeremyAyza/sales-management-dashboard",
    image: "!!!",
    level: "intermedio",
    hidden: false,
    skills: [react, typescript, bootstrap, reactrouter],
    features: [
      "Módulo completo de ventas, productos y clientes",
      "CRUDs con validaciones",
      "Autenticación básica",
      "Navegación con React Router",
      "Tablas dinámicas y componentes reutilizables"
    ],
    highlights: [
      "Arquitectura modular por dominios",
      "UI profesional completamente responsive"
    ],
    categories: [CATEGORIES.FULLSTACK],
    extra: {
      date: "!!!",
      status: "development",
      demoVideo: "!!!"
    }
  },

  // -------------------------------
  // 3. Todo App – Vanilla JS
  // -------------------------------
  {
    title: "Todo App – Vanilla JavaScript",
    description:
      "Aplicación de gestión de tareas con localStorage, manipulación manual del DOM y diseño responsive sin librerías externas.",
    link: "!!!",
    github: "https://github.com/JeremyAyza/vanilla-js-todo-list",
    image: "!!!",
    level: "básico",
    hidden: true,
    skills: [javascript, html, css],
    features: [
      "CRUD de tareas con almacenamiento persistente",
      "UI moderna con CSS puro",
      "Delegación de eventos",
      "Renderizado eficiente sin frameworks"
    ],
    highlights: [
      "Excelente demostración de fundamentos del DOM",
      "Ideal para mostrar evolución técnica"
    ],
    categories: [CATEGORIES.FULLSTACK],
    extra: {
      date: "!!!",
      status: "online",
      demoVideo: "!!!"
    }
  },

  // -------------------------------
  // 4. Inventory Management API (Node + Express + MongoDB)
  // -------------------------------
  {
    title: "Inventory Management API",
    description:
      "API REST completa para gestionar inventario, clientes, productos, ventas y usuarios. Construida con Express y MongoDB.",
    link: "!!!",
    github: "https://github.com/JeremyAyza/inventory-management-api",
    image: "!!!",
    level: "intermedio",
    hidden: false,
    skills: [node, express, mongo, mongoose],
    features: [
      "CRUD completo para productos, clientes y ventas",
      "Relaciones entre colecciones",
      "Validación con Mongoose",
      "Autenticación básica de usuarios",
      "Arquitectura modular por responsabilidades"
    ],
    highlights: [
      "Perfecto para demostrar backend sólido",
      "Mongoose ODM profesionalmente configurado"
    ],
    categories: [CATEGORIES.BACKEND],
    extra: {
      date: "!!!",
      status: "development",
      demoVideo: "!!!"
    }
  },

  // -------------------------------
  // 5. AdventJS 2021 – Retos de JavaScript
  // -------------------------------
  {
    title: "AdventJS 2021 – Soluciones a Retos de JavaScript",
    description:
      "Colección de soluciones a los 25 retos oficiales de AdventJS 2021. Enfoque en optimización, lógica y estructuras de datos.",
    link: "https://2021.adventjs.dev",
    github: "https://github.com/JeremyAyza/AdventJS-2021",
    image: "!!!",
    level: "intermedio",
    hidden: false,
    skills: [javascript],
    features: [
      "25 retos completados",
      "Enfoque en algoritmos y estructuras de datos",
      "Soluciones limpias y comentadas"
    ],
    highlights: [
      "Refuerzo sólido de lógica y optimización",
      "Demuestra consistencia y disciplina"
    ],
    categories: [CATEGORIES.FULLSTACK],
    extra: {
      date: "2021",
      status: "completed",
      demoVideo: "!!!"
    }
  },

  // -------------------------------
  // 6. Scrap Images API (Bun + Hono)
  // -------------------------------
  {
    title: "Scrap Images API – Hono + Bun",
    description:
      "API ultrarrápida capaz de obtener miniaturas de imágenes mediante scraping liviano a DuckDuckGo. Documentada con OpenAPI.",
    link: "!!!",
    github: "!!!",
    image: "!!!",
    level: "avanzado",
    hidden: false,
    skills: [bun, hono, typescript],
    features: [
      "Scraping sin puppeteer (solo Fetch + HTML parsing)",
      "Endpoints GET/POST optimizados",
      "Validación tipada con Valibot",
      "Documentación automática con Scalar + OpenAPI"
    ],
    highlights: [
      "Arquitectura backend moderna, ligera y veloz",
      "Uso avanzado del runtime Bun"
    ],
    categories: [CATEGORIES.BACKEND],
    extra: {
      date: "!!!",
      status: "online",
      demoVideo: "!!!"
    }
  },

  // -------------------------------
  // 7. Pokédex React
  // -------------------------------
  {
    title: "Pokédex React",
    description:
      "Aplicación interactiva para explorar Pokémon, buscar por nombre/ID y guardar favoritos. Construida con React y Tailwind.",
    link: "!!!",
    github: "!!!",
    image: "!!!",
    level: "básico",
    hidden: true,
    skills: [react, tailwind, reactrouter, javascript],
    features: [
      "Búsqueda por nombre o ID",
      "Listado con paginación",
      "Favoritos con estado local",
      "Consumo de PokeAPI"
    ],
    highlights: [
      "Proyecto ideal para mostrar fundamentos de React",
      "Buen ejemplo de UI responsive con Tailwind"
    ],
    categories: [CATEGORIES.FRONTEND],
    extra: {
      date: "!!!",
      status: "development",
      demoVideo: "!!!"
    }
  },

  // -------------------------------
  // 8. Fullstack E-commerce (React + Node + Stripe)
  // -------------------------------
  {
    title: "E-commerce Fullstack – React + Node + Stripe",
    description:
      "Aplicación completa de e-commerce con catálogo, órdenes, pagos, CRUDs administrativos y autenticación JWT.",
    link: "!!!",
    github: "!!!",
    image: "!!!",
    level: "avanzado",
    hidden: false,
    skills: [react, redux, node, express, mongo, stripe],
    features: [
      "Autenticación JWT + roles",
      "Integración completa de Stripe Checkout",
      "Dashboard administrativo",
      "Manejo global de estado con Redux",
      "CRUDs completos de productos, órdenes y categorías"
    ],
    highlights: [
      "Arquitectura fullstack realista",
      "Flujos complejos de negocio integrados"
    ],
    categories: [CATEGORIES.FULLSTACK],
    extra: {
      date: "!!!",
      status: "development",
      demoVideo: "!!!"
    }
  },

  // -------------------------------
  // 9. API REST Enter (Java + Spring Boot)
  // -------------------------------
  {
    title: "API REST Enter – Spring Boot + MySQL",
    description:
      "API REST para gestionar entidades comerciales como clientes, empleados, productos, roles y boletas.",
    link: "!!!",
    github: "!!!",
    image: "!!!",
    level: "básico",
    hidden: true,
    skills: [java, spring, mysql],
    features: [
      "CRUD completo",
      "Conexión a MySQL",
      "Estructura clásica con capas",
      "Uso de Spring Data JPA"
    ],
    highlights: [
      "Demuestra versatilidad en backend con Java",
      "Ideal como proyecto temprano de aprendizaje"
    ],
    categories: [CATEGORIES.BACKEND],
    extra: {
      date: "!!!",
      status: "completed",
      demoVideo: "!!!"
    }
  }
];
