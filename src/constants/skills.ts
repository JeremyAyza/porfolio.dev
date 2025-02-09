import react from "@/components/simple-icons/react.icon.astro";
import typescript from "@/components/simple-icons/typescript.icon.astro"
import javascript from "@/components/simple-icons/javascript.icon.astro"
import html from "@/components/simple-icons/html.icon.astro"
import css from "@/components/simple-icons/css.icon.astro"
import sass from "@/components/simple-icons/sass.icon.astro"
import tailwind from "@/components/simple-icons/tailwind.icon.astro"
import nodejs from "@/components/simple-icons/nodejs.icon.astro"
import express from "@/components/simple-icons/express.icon.astro"
import nextjs from "@/components/simple-icons/nextjs.icon.astro"
import vue from "@/components/simple-icons/vue.icon.astro"
import vuetify from "@/components/simple-icons/vuetify.icon.astro"
import firebase from "@/components/simple-icons/firebase.icon.astro"
import mongodb from "@/components/simple-icons/mongodb.icon.astro"
import mysql from "@/components/simple-icons/mysql.icon.astro"
import postgresql from "@/components/simple-icons/postgresql.icon.astro"
import git from "@/components/simple-icons/git.icon.astro"
import github from "@/components/simple-icons/github.icon.astro"
import gitlab from "@/components/simple-icons/gitlab.icon.astro"
// import webpack from "@/components/simple-icons/webpack.icon.astro"
import vite from "@/components/simple-icons/vite.icon.astro"
import pwa from "@/components/simple-icons/pwa.icon.astro"
import python from "@/components/simple-icons/python.icon.astro"
// import java from "@/components/simple-icons/java.icon.astro"
import php from "@/components/simple-icons/php.icon.astro"
import figma from "@/components/simple-icons/figma.icon.astro"
import type { Skill } from "./types";


export const SKILLS: Record<any, Skill> = {
	react: {
		color: "#61DAFB",
		label: "React",
		icon: react,
	},
	typescript: {
		color: "#007ACC",
		label: "TypeScript",
		icon: typescript,
	},
	javascript: {
		color: "#fbc02d",
		label: "JavaScript",
		icon: javascript,
	},
	html: {
		color: "#E34F26",
		label: "HTML",
		icon: html,
	},
	css: {
		color: "#1572B6",
		label: "CSS",
		icon: css,
	},
	sass: {
		color: "#CC6699",
		label: "SASS",
		icon: sass,
	},
	tailwind: {
		color: "#06B6D4",
		label: "Tailwind",
		icon: tailwind,
	},
	nodejs: {
		color: "#339933",
		label: "Node.js",
		icon: nodejs,
	},
	express: {
		color: "#000000",
		label: "Express.js",
		icon: express,
	},
	nextjs: {
		color: "currentColor",
		label: "Next.js",
		icon: nextjs,
	},
	vue: {
		color: "#4FC08D",
		label: "Vue.js",
		icon: vue,
	},
	vuetify: {
		color: "#1867C0",
		label: "Vuetify",
		icon: vuetify,
	},
	// angular: {
	// 	color: "#DD0031",
	// 	label: "Angular",
	// 	icon: import("@/components/simple-icons/angular.icon.astro"),
	// },


	// redux: {
	// 	color: "#764ABC",
	// 	label: "Redux",
	// 	icon: import("@/components/simple-icons/redux.icon.astro"),
	// },
	firebase: {
		color: "#FFCA28",
		label: "Firebase",
		icon: firebase,
	},
	mongodb: {
		color: "#47A248",
		label: "MongoDB",
		icon: mongodb,
	},
	mysql: {
		color: "#4479A1",
		label: "MySQL",
		icon: mysql,
	},
	postgresql: {
		color: "#336791",
		label: "PostgreSQL",
		icon: postgresql,
	},
	git: {
		color: "#F05032",
		label: "Git",
		icon: git,
	},
	github: {
		color: "#181717",
		label: "GitHub",
		icon: github,
	},
	gitlab: {
		color: "#FCA121",
		label: "GitLab",
		icon: gitlab,
	},
	webpack: {
		color: "#8DD6F9",
		label: "Webpack",
		// icon: ,
	},
	vite: {
		color: "#646CFF",
		label: "Vite",
		icon: vite,
	},
	pwa: {
		color: "#5A0FC8",
		label: "PWA",
		icon: pwa,
	},
	python: {
		color: "#3776AB",
		label: "Python",
		icon: python,
	},
	java: {
		color: "#007396",
		label: "Java",
		// icon: ,
	},
	php: {
		color: "#777BB4",
		label: "PHP",
		icon: php,
	},
	figma: {
		color: "#F24E1E",
		label: "Figma",
		icon: figma,
	},

};


// export const TAGS = {
// 	NEXT: {
// 		name: "Next.js",
// 		class: "bg-black text-white",
// 		icon: NextJS,
// 	},
// 	TAILWIND: {
// 		name: "Tailwind CSS",
// 		class: "bg-[#003159] text-white",
// 		icon: Tailwind,
// 	},
// }