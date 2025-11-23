export interface Skill {
	color: string;
	label: string;
	icon?: any
}

export interface Project {
	title: string;
	description: string;
	link: string;
	github: string;
	image: string;
	level?: string;
	hidden?: boolean;
	skills: Skill[];
	features?: string[];
	highlights?: string[];
	categories: string[];
	extra?: {
		date?: string;
		status?: string;
		demoVideo?: string;
	}
}