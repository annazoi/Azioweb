export interface Skill {
	id: string;
	name: string;
	icon: any;
	description: string;
}

export interface Project {
	id: string;
	name: string;
	photo: any;
	photos?: any[];
	description: string;
	url: string;
	tag?: string;
	highlights?: string[];
	details?: string;
}

export interface Site {
	id: string;
	name: string;
	photo: any;
	url: string;
	description: string;
}
