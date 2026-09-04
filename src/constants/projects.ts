// import { TAGS } from "./skills";
import { SKILLS } from "./skills";
import type { Project } from "./types";
const { react, typescript,java, spring, mysql, threejs, tailwind, javascript, html, css, r3, vite, zustand, bootstrap, reactrouter, node,
	express, mongo, mongoose, bun, hono, redux, stripe, nextjs, vue, python, openai, gemini, whisper, agentic } = SKILLS
export const CATEGORIES = {
	FRONTEND: "Frontend",
	BACKEND: "Backend",
	MOBILE: "Mobile",
	FULLSTACK: "Fullstack",
	ALGORITHMICA: "Algorítmica",
	IA: "IA & Automatización"
}
export const PROJECTS: Project[] = [
	// -------------------------------------------------------------
	// FLAGSHIP — las 3 primeras entradas son las "featured" (con
	// imagen grande) en Projects.astro. Curadas a propósito: son las
	// que mejor demuestran integración real de IA en producto.
	// -------------------------------------------------------------
	{
		title: "Video Automation Engine — Pipeline de Generación de Video con IA",
		description:
			"Crear y editar videos para YouTube (guion, locución, recursos visuales, ensamblaje) es un proceso manual que consume horas por episodio. Diseñé un orquestador en Python de 7 etapas (guion → imágenes → voz → stitching con FFmpeg → subtítulos vía Whisper.cpp → música → entrega final) que usa la API de Gemini para texto e imágenes, con una arquitectura de 'Prompt Managers' intercambiables por nicho (modelos Pydantic que autogeneran su propio JSON schema) y reintentos con backoff ante fallos de la API. Impulsa un canal de YouTube automatizado cuyos Shorts ya superan 1,000 vistas orgánicas sin intervención humana en postproducción.",
		link: "!!!",
		github: "https://github.com/JeremyAyza/AI-Content-Automation-Engine-main",
		image: "/projects/video-automation-engine.svg",
		level: "avanzado",
		hidden: false,
		skills: [python, gemini, whisper],
		features: [
			"Pipeline de 7 etapas orquestadas con tracking de estado persistente",
			"Prompt Managers intercambiables por nicho (Pydantic + JSON schema autogenerado)",
			"Reintentos con backoff ante errores de la API (tenacity)",
			"Ensamblaje de video automatizado con FFmpeg",
			"Subtitulado automático vía Whisper.cpp"
		],
		highlights: [
			"Arquitectura 'Tools & Pipelines' pensada para escalar a nuevos nichos sin tocar el orquestador",
			"En producción real: impulsa un canal de YouTube activo"
		],
		categories: [CATEGORIES.IA],
		extra: {
			date: "2025",
			status: "online"
		}
	},
	{
		title: "Flow Image Automator",
		description:
			"Generar imágenes en herramientas de IA generativa a mano, prompt por prompt, no escala. Construí una extensión de Chrome que automatiza una herramienta generativa de Google a partir de una lista de prompts. La pieza más interesante: un script inyectado en el MAIN world del navegador intercepta fetch/XMLHttpRequest para leer directamente las respuestas de la API interna y extraer los IDs de los assets generados, reenviándolos por postMessage a través de tres capas (inyector, content script y background). Cola de trabajos con p-queue y pausa automática ante rate-limiting.",
		link: "!!!",
		github: "https://github.com/JeremyAyza/flow-image-generator-main",
		image: "/projects/flow-image-automator.svg",
		level: "avanzado",
		hidden: false,
		skills: [react, typescript, zustand],
		features: [
			"Interceptación de fetch/XMLHttpRequest inyectada en el MAIN world",
			"Arquitectura de 3 capas: inyector → content script → background",
			"Cola de trabajos con p-queue y manejo automático de rate-limiting",
			"Extracción de IDs de assets desde la API interna, sin scraping del DOM"
		],
		highlights: [
			"La pieza técnica más avanzada de mis extensiones de automatización",
			"Patrón reutilizable para automatizar cualquier herramienta web de generación de IA"
		],
		categories: [CATEGORIES.IA, CATEGORIES.FRONTEND],
		extra: {
			date: "2025",
			status: "online"
		}
	},
	{
		title: "Moon Style — Catalog Auto-Publisher",
		description:
			"Empresarios que recién empiezan pierden horas subiendo catálogos completos a sus canales de venta a mano. Desarrollé un publicador que usa GPT-4o Vision para estructurar comercialmente productos crudos (fotos + datos sueltos) y Playwright para publicarlos en Facebook Marketplace, Instagram y catálogo de WhatsApp Business, reutilizando sesión de navegador persistente. Diseñado deliberadamente human-in-the-loop: no promete automatización 100% desatendida donde no la hay, con reordenamiento de imágenes específico por plataforma y pausa manual antes de publicar.",
		link: "!!!",
		github: "https://github.com/JeremyAyza/auto-content-and-publish",
		image: "/projects/moon-style.svg",
		level: "avanzado",
		hidden: false,
		skills: [node, openai],
		features: [
			"Estructuración comercial de productos con GPT-4o Vision",
			"Publicación automatizada en 3 plataformas con Playwright",
			"Sesión de navegador persistente reutilizada entre corridas",
			"Reordenamiento de imágenes específico por plataforma (portada distinta en FB vs. IG)"
		],
		highlights: [
			"Diseño human-in-the-loop honesto: no oculta dónde interviene una persona",
			"Deduplicación real entre corridas del dataset"
		],
		categories: [CATEGORIES.IA, CATEGORIES.BACKEND],
		extra: {
			date: "2025",
			status: "online"
		}
	},

	// -------------------------------------------------------------
	// A partir de aquí: grilla secundaria (Projects.astro no muestra
	// imagen ni botones en estas tarjetas, solo título/descripción/skills).
	// -------------------------------------------------------------
	{
		title: "Cómo reconstruí mi CV y portafolio orquestando agentes de IA",
		description:
			"Actualizar mi CV y portafolio significaba investigar ofertas reales, auditar más de 10 repos propios y mantener consistencia entre varias versiones de CV — trabajo manual de días. En vez de eso, orquesté todo el proceso con Claude Code: un subagente investigó y auditó el código real de mis proyectos personales (verificando el stack técnico contra el código, no contra lo que yo recordaba), integré Notion vía MCP para leer mi base de datos de ofertas laborales y cruzarla con mi perfil, y usé el resultado para tomar decisiones de posicionamiento basadas en datos reales. Este mismo proceso documentado es la evidencia.",
		link: "!!!",
		github: "!!!",
		image: "!!!",
		level: "avanzado",
		hidden: false,
		skills: [typescript, agentic],
		categories: [CATEGORIES.IA],
		extra: {
			date: "2026",
			status: "documentado"
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
			date: "2024",
			status: "online"
		}
	},
	{
		title: "Netlify → Cloudflare Pages Migrator",
		description:
			"Migrar docenas de repositorios, configuraciones de CI/CD y variables de entorno de un proveedor de nube a otro manualmente es lento y propenso a errores. Desarrollé un orquestador CLI en Node.js que migra infraestructuras completas vía API REST (Netlify y Cloudflare), con un gestor de estado que permite pausar y reanudar migraciones interrumpidas.",
		link: "!!!",
		github: "https://github.com/JeremyAyza/netlify-to-cloudflare-migrator",
		image: "!!!",
		level: "intermedio",
		hidden: false,
		skills: [node, typescript],
		categories: [CATEGORIES.BACKEND],
		extra: {
			date: "2025",
			status: "online"
		}
	},
	{
		title: "Instagram Follow Manager PRO",
		description:
			"Extensión de Chrome profesional para la gestión de seguidores. Reconstruye llamadas a la API interna de Instagram (headers replicados desde DevTools, paginación real) para comparar seguidores vs. seguidos sin pedir contraseñas, con automatización de 'unfollow' con delays aleatorios para evitar bloqueos.",
		link: "",
		github: "https://github.com/JeremyAyza/instagram-tool-main",
		image: "/projects/ig-tools.webp",
		level: "avanzado",
		hidden: false,
		skills: [javascript, html, css],
		features: [
			"Análisis en tiempo real de seguidores vs seguidos",
			"Reconstrucción de llamadas a la API interna con paginación real",
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
			status: "online"
		}
	},
	{
		title: "AdventJS - Retos de programación con JavaScript y TypeScript",
		description:
			"Plataforma gratuita con retos de programación. Más de 1 millón de visitas en un mes. +50K retos completados. Creada desde cero con Next.js, React y Tailwind CSS.",
		link: "https://adventjs.dev",
		image: "/projects/adventjs.webp",
		categories: [CATEGORIES.FRONTEND],
		github: "https://github.com/JeremyAyza/adventjs",
		hidden: false,
		skills: [react, nextjs, vue]
	},

	// -------------------------------------------------------------
	// OCULTOS (hidden: true) — proyectos genéricos de bootcamp o sin
	// verificar, no aportan a la narrativa de Fullstack senior / IA.
	// El flag ahora sí se respeta en Projects.astro (antes no se
	// filtraba, era metadata muerta).
	// -------------------------------------------------------------
	{
		title: "InsightOS – AI Ethics & Data Dashboard",
		description:
			"Dashboard interactivo de monitoreo de métricas éticas de IA y análisis de datos globales. Interfaz futurista con diseño cyber-tech, gráficos en tiempo real y navegación modular.",
		link: "https://dashboard-insight-os.onrender.com/",
		github: "https://github.com/JeremyAyza/dashboard-insight-os",
		image: "/projects/insightos-dashboard.webp",
		level: "avanzado",
		// Oculto a propósito: no formó parte de la auditoría de repos que hicimos,
		// no pude verificar qué tan real/terminado está. Confírmame su estado
		// antes de mostrarlo junto a los proyectos de IA ya verificados.
		hidden: true,
		skills: [react, typescript, vite, tailwind],
		categories: [CATEGORIES.FRONTEND],
		extra: {
			date: "2025",
			status: "development"
		}
	},
	{
		title: "Sales Management Dashboard",
		description:
			"Dashboard administrativo con múltiples módulos: usuarios, clientes, productos, proveedores, ventas y autenticación. UI moderna construida con React y Bootstrap.",
		link: "!!!",
		github: "https://github.com/JeremyAyza/sales-management-dashboard",
		image: "!!!",
		level: "intermedio",
		hidden: true,
		skills: [react, typescript, bootstrap, reactrouter],
		categories: [CATEGORIES.FULLSTACK],
		extra: {
			date: "!!!",
			status: "development"
		}
	},
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
		categories: [CATEGORIES.FULLSTACK],
		extra: {
			date: "!!!",
			status: "online"
		}
	},
	{
		title: "Inventory Management API",
		description:
			"API REST completa para gestionar inventario, clientes, productos, ventas y usuarios. Construida con Express y MongoDB.",
		link: "!!!",
		github: "https://github.com/JeremyAyza/inventory-management-api",
		image: "!!!",
		level: "intermedio",
		hidden: true,
		skills: [node, express, mongo, mongoose],
		categories: [CATEGORIES.BACKEND],
		extra: {
			date: "!!!",
			status: "development"
		}
	},
	{
		title: "AdventJS 2021 – Soluciones a Retos de JavaScript",
		description:
			"Colección de soluciones a los 25 retos oficiales de AdventJS 2021. Enfoque en optimización, lógica y estructuras de datos.",
		link: "https://2021.adventjs.dev",
		github: "https://github.com/JeremyAyza/AdventJS-2021",
		image: "!!!",
		level: "intermedio",
		// Oculto: redundante con la entrada principal de AdventJS de arriba.
		hidden: true,
		skills: [javascript],
		categories: [CATEGORIES.FULLSTACK],
		extra: {
			date: "2021",
			status: "completed"
		}
	},
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
		categories: [CATEGORIES.BACKEND],
		extra: {
			date: "!!!",
			status: "online"
		}
	},
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
		categories: [CATEGORIES.FRONTEND],
		extra: {
			date: "!!!",
			status: "development"
		}
	},
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
		categories: [CATEGORIES.FULLSTACK],
		extra: {
			date: "!!!",
			status: "development"
		}
	},
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
		categories: [CATEGORIES.BACKEND],
		extra: {
			date: "!!!",
			status: "completed"
		}
	}
];
