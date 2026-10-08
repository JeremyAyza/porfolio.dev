// import { TAGS } from "./skills";
import { SKILLS } from "./skills";
import type { Project } from "./types";
const { react, typescript,java, spring, mysql, threejs, tailwind, javascript, html, css, r3, vite, zustand, bootstrap, reactrouter, node, 
	express, mongo, mongoose, bun, hono, redux, stripe, postgresql, nestjs, typeorm, vercelAiSdk, zod, insforge, pgvector, mcp, gpt4oMini,
	transformersjs, orama, webWorker, ga4, playwright, claudeCode, tanstackQuery, recharts, shadcn, netlify, cloudflarePages, whisper, gemini } = SKILLS
export const CATEGORIES = {
	FRONTEND: "Frontend",
	BACKEND: "Backend",
	MOBILE: "Mobile",
	FULLSTACK: "Fullstack",
	ALGORITHMICA: "Algorítmica"
}
export const PROJECTS: Project[] = [
	// -------------------------------
	// Trabajo en CasaMarket (company + featured). Va primero y sin enlaces.
	// Orden: lo que está en producción o terminado, después lo que sigue en desarrollo.
	// No se nombran productos sin lanzar ni se dan cifras internas de la empresa.
	// -------------------------------
	{
		title: "Nuevo flujo de venta del POS: capa de dominio y pruebas de paridad",
		company: "CasaMarket",
		description:
			"El POS emite Boleta, Factura y Nota de Venta ante SUNAT para clientes que venden 24/7, así que rehacer su flujo de venta no podía fallar.",
		link: "",
		github: "",
		image: "",
		featured: true,
		skills: [react, typescript, playwright, claudeCode],
		highlights: [
			"Diseñé una capa de dominio pura y testeable (carrito, pagos, cliente, crédito, impuestos, descuentos) con la venta como caso de uso.",
			"Ideé la estrategia de paridad: una suite E2E en Playwright ejecuta la misma venta en el POS legacy y en el nuevo, captura los dos payloads y los compara campo por campo, ignorando el ruido conocido (fechas, IDs). Son 12 suites: precisión decimal, tipos de impuesto, descuentos, combos y pagos, entre otras.",
			"Documenté el límite del método: la paridad no prueba que el cálculo sea correcto. Si los dos sistemas comparten un bug, el test pasa igual.",
			"Usé Claude Code para auditar el código en paralelo y generar casos de prueba. El alcance, las reglas de negocio y la validación de los hallazgos los definí yo."
		],
		categories: [CATEGORIES.FRONTEND],
		extra: {
			date: "jun 2026 – actualidad",
			status: "En producción."
		}
	},
	{
		title: "Búsqueda de productos por voz en el POS",
		company: "CasaMarket",
		description:
			"Búsqueda de productos por voz para el flujo de venta del POS, usada con el hardware de tienda de la empresa.",
		link: "",
		github: "",
		image: "",
		featured: true,
		skills: [transformersjs, orama, webWorker, gpt4oMini, ga4],
		highlights: [
			"Flujo: audio → transcripción (gpt-4o-mini-transcribe) → búsqueda vectorial local de candidatos → elección del producto con gpt-4o-mini.",
			"La búsqueda vectorial corre en el navegador: embeddings all-MiniLM-L6 con Transformers.js en un Web Worker y un índice Orama guardado en el navegador. La transcripción y la elección del producto necesitan conexión.",
			"Admite varios productos por comando, mide su uso con GA4 y se carga solo para las empresas que lo tienen activado."
		],
		categories: [CATEGORIES.FRONTEND],
		extra: {
			date: "mar 2026 – may 2026",
			status: "Desplegada en producción, detrás de una activación por empresa."
		}
	},
	{
		title: "Netlify → Cloudflare Pages Migrator",
		company: "CasaMarket",
		description:
			"Migrar unos 20 proyectos de Netlify a Cloudflare Pages a mano era lento y riesgoso, sobre todo por la configuración de build y las variables de entorno. Automatizarlo fue idea mía.",
		link: "",
		github: "",
		image: "",
		featured: true,
		skills: [node, typescript, netlify, cloudflarePages],
		highlights: [
			"Escribí una CLI (Node.js, TypeScript) que lee de la API de Netlify los comandos de build, la carpeta de salida y las variables de producción y preview, crea el proyecto en Cloudflare Pages enlazado a su repo de GitHub y fuerza el primer deploy.",
			"Guarda el estado para retomar una ejecución interrumpida y registra cada corrida.",
			"Resultado: unos 20 proyectos migrados (POS, Admin, ACL y landings). Hoy corren ahí 25 proyectos."
		],
		categories: [CATEGORIES.BACKEND]
	},
	{
		title: "WeAreData: frontend de una plataforma de analítica retail",
		company: "CasaMarket",
		description:
			"WeAreData es una plataforma de analítica retail: un panel interno para curar los datos y dashboards de analítica. El producto, el diseño y el backend son de otros compañeros. El frontend lo creé yo desde cero.",
		link: "",
		github: "",
		image: "",
		featured: true,
		skills: [react, vite, typescript, tanstackQuery, zustand, recharts, shadcn],
		highlights: [
			"Definí la arquitectura por funcionalidad, el stack y los patrones. Autor principal: 391 de 546 commits (72%).",
			"Construí dashboards configurables con Recharts: evolución de mercado y participación por SKU en escala logarítmica, matriz competitiva, mapa interactivo y treemap por distrito, y un explorador de variables que arma consultas por mercado, periodo y producto.",
			"Rehice el lado administrador en 2026, cuando los requerimientos cambiaron hacia una plataforma configurable: cola de revisión para curar el catálogo, búsqueda de duplicados, edición masiva y categorías con atributos configurables.",
			"Dejé una regla de dónde vive cada estado: TanStack Query para datos del servidor, nuqs para filtros en la URL, Zustand para la interfaz y react-hook-form para formularios."
		],
		categories: [CATEGORIES.FRONTEND],
		extra: {
			date: "sep 2025 – actualidad",
			status: "En desarrollo."
		}
	},
	{
		title: "Copiloto conversacional para el POS",
		company: "CasaMarket",
		description:
			"Copiloto embebido en el POS. Responderá dudas operativas con RAG y consultará datos de analítica. Escribí el PRD, el SRS y el plan técnico con apoyo de IA, y tomé las decisiones de arquitectura.",
		link: "",
		github: "",
		image: "",
		featured: true,
		skills: [nestjs, typescript, postgresql, typeorm, vercelAiSdk, zod, react],
		highlights: [
			"Los permisos por rol viven en el código, nunca en el prompt: un guard valida el rol antes de cada llamada a herramientas.",
			"La analítica se consulta solo por tool calling con esquemas Zod. El proveedor de LLM se cambia por configuración.",
			"Lo construyo orquestando agentes de código con un protocolo que diseñé: un worktree por ticket, olas en paralelo solo si los tickets no tocan los mismos archivos y un documento de contratos de integración. Una corrida entregó 7 tickets en unas 3 horas con 34 tests pasando. El código lo escribieron los agentes; la planificación, la integración y la verificación fueron mías."
		],
		categories: [CATEGORIES.FULLSTACK],
		extra: {
			date: "sep 2026 – actualidad",
			status: "En desarrollo."
		}
	},
	{
		title: "RAG del conocimiento interno",
		company: "CasaMarket",
		description:
			"El conocimiento de cómo funciona el sistema estaba repartido entre personas, videos, código y documentos. Empecé por iniciativa propia un RAG para colaboradores nuevos, soporte y desarrolladores. Después dio origen a un proyecto formal: el copiloto conversacional.",
		link: "",
		github: "",
		image: "",
		featured: true,
		skills: [insforge, postgresql, pgvector, mcp, gpt4oMini],
		highlights: [
			"Lo construí sobre InsForge (Postgres, pgvector, edge functions), con agentes de IA trabajando a través de su servidor MCP.",
			"Responde en tres pasos: gpt-4o-mini decide a qué módulo de negocio pertenece la pregunta; la búsqueda por similitud (pgvector, índice HNSW) corre solo dentro de ese módulo; el umbral y la cantidad de resultados se ajustan según si detectó el módulo.",
			"Cada respuesta cita su fuente: la ruta exacta en cada plataforma o el video con su minuto."
		],
		categories: [CATEGORIES.FULLSTACK],
		extra: {
			date: "ago 2026 – actualidad",
			status: "En desarrollo."
		}
	},

	// -------------------------------
	// Proyectos personales. El destacado (featured, sin company) va con el detalle completo;
	// el resto va en tarjetas. Solo se muestran los que tienen repositorio público o enlace;
	// los demás quedan con hidden: true.
	// -------------------------------
	{
		title: "Pipeline de video con IA para YouTube",
		description:
			"Extiendo un proyecto open source (AI Content Automation Engine) que ya traía el pipeline de 7 pasos: guion, imágenes, voz, video, subtítulos, música y entrega. El guion, las imágenes, la voz y los subtítulos los hacen modelos de IA. Le sumé 74 commits míos y con él llevo mi canal de YouTube, Hackea Tu Riqueza.",
		link: "https://www.youtube.com/@Hackea_Tu_Riqueza",
		linkLabel: "Canal",
		github: "",
		image: "",
		featured: true,
		skills: [playwright, typescript, react, whisper, gemini],
		highlights: [
			"El pipeline generó los 190 videos del canal (oct 2026).",
			"El costo por video pasó de unos 2.50 USD a menos de 0.50 USD. Lo más caro eran las imágenes, que se generaban por API con muchas imágenes de referencia.",
			"Bajé ese costo en dos pasos: un solo collage de referencia por escena y, después, generación en Google Labs Flow automatizando el navegador con Playwright y una extensión de Chrome que construí (WXT, React, TypeScript), intercambiable con la API de Gemini. En Flow generar imágenes no gasta créditos.",
			"Moví Whisper de CPU a GPU (whisper.cpp con CUDA), pasé a modelos más baratos los pasos que no necesitaban un modelo pro y agregué la subida automática a YouTube, que programa cada video en la próxima fecha libre."
		],
		categories: [CATEGORIES.FULLSTACK],
		extra: {
			date: "may 2026 – sep 2026",
			status: "En uso en mi canal. Solo corre en Windows con GPU NVIDIA y no tiene tests."
		}
	},
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
    link: "",
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
    github: "!!!", // el repositorio no es público (responde 404)
    image: "!!!",
    level: "intermedio",
    hidden: true,
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
    github: "!!!", // el repositorio no es público (responde 404)
    image: "!!!",
    level: "intermedio",
    hidden: true,
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
    hidden: true,
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
    hidden: true,
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
