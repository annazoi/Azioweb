'use client';
import react from '@/assets/skills/react.png';
import javascript from '@/assets/skills/javascript.png';
import nextjs from '@/assets/skills/nextjs.png';
import html from '@/assets/skills/html.png';
import css from '@/assets/skills/css.png';
import firebase from '@/assets/skills/firabase.png';
import mongodb from '@/assets/skills/mongodb.png';
import mariadb from '@/assets/skills/mariadb.png';
import postgresql from '@/assets/skills/postgresql.png';
import typescript from '@/assets/skills/typescript.png';
import prisma from '@/assets/skills/prisma.png';
import nodejs from '@/assets/skills/nodejs.png';
import expressjs from '@/assets/skills/expressjs.png';
import nestjs from '@/assets/skills/nestjs.png';
import php from '@/assets/skills/php.png';
import java from '@/assets/skills/java.png';
import python from '@/assets/skills/python.png';
import c from '@/assets/skills/c.png';
import prolog from '@/assets/skills/prolog.png';
import androidStudio from '@/assets/skills/androidStudio.png';
import ionic from '@/assets/skills/ionic.png';
import materialUI from '@/assets/skills/materialUI.png';
import chakraUI from '@/assets/skills/chakraUI.png';
import git from '@/assets/skills/github.png';
import slack from '@/assets/skills/slack.png';
import asana from '@/assets/skills/asana.png';
import trello from '@/assets/skills/trello.png';
import websockets from '@/assets/skills/websockets.png';
import webrtc from '@/assets/skills/webrtc.png';
import laravel from '@/assets/skills/laravel.png';
import tailwindcss from '@/assets/skills/tailwindcss.png';
import problemSolving from '@/assets/skills/problem_solving.png';
import collaboration from '@/assets/skills/collaboration.png';
import communication from '@/assets/skills/communication.png';
import growthMindset from '@/assets/skills/growthMindset.png';
import adaptability from '@/assets/skills/adaptability.png';
import clockIcon from '@/assets/skills/clockIcon.png';

import { Skill } from '@/interfaces';

import Image from 'next/image';
import { useState } from 'react';
import Modal from '@/components/ui/modal';
import { AnimatePresence } from 'framer-motion';

const Skills = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [selectedSkill, setSelectedSkill] = useState<Skill>();

	const skills: Skill[] = [
		{
			id: '1',
			name: 'ReactJS',
			icon: react,
			description:
				'A declarative JavaScript library for building dynamic user interfaces based on reusable components and efficient state management.',
		},
		{
			id: '2',
			name: 'NextJS',
			icon: nextjs,
			description:
				'A React framework that enables features such as server-side rendering and static site generation for optimized performance and SEO.',
		},
		{
			id: '3',
			name: 'Javascript',
			icon: javascript,
			description:
				'The fundamental programming language of the web that enables complex functionality and interactivity on web pages.',
		},
		{
			id: '4',
			name: 'Typescript',
			icon: typescript,
			description:
				'A strict syntactical superset of JavaScript that adds static typing, facilitating the development and maintenance of large-scale applications.',
		},
		{
			id: '30',
			name: 'Tailwind CSS',
			icon: tailwindcss,
			description:
				'A utility-first CSS framework for rapidly building custom user interfaces directly in the markup using predefined classes.',
		},
		{
			id: '31',
			name: 'Laravel',
			icon: laravel,
			description:
				'A popular PHP web framework designed for building modern web applications with elegant syntax, built-in tools for routing, authentication, databases, and scalable backend development.',
		},

		{
			id: '5',
			name: 'HTML',
			icon: html,
			description:
				'The standard markup language for creating the structure and content of documents displayed in a web browser.',
		},
		{
			id: '6',
			name: 'CSS',
			icon: css,
			description:
				'A stylesheet language used for describing the presentation, layout, and visual formatting of web documents.',
		},
		{
			id: '7',
			name: 'Firebase',
			icon: firebase,
			description:
				'A Google platform offering cloud services such as real-time databases, authentication, and hosting without the need for manual server management.',
		},
		{
			id: '8',
			name: 'MongoDB',
			icon: mongodb,
			description:
				'A document-oriented NoSQL database that provides high scalability and flexibility in data structuring through JSON-like documents.',
		},
		{
			id: '9',
			name: 'MariaDB',
			icon: mariadb,
			description:
				'A relational database management system (RDBMS) developed as a community-led fork of MySQL, emphasizing performance and security.',
		},
		{
			id: '10',
			name: 'PostgreSQL',
			icon: postgresql,
			description:
				'An advanced object-relational database system known for its reliability, feature robustness, and data integrity.',
		},
		{
			id: '11',
			name: 'WebSockets',
			icon: websockets,
			description:
				'A communication protocol that enables persistent, full-duplex, and real-time data exchange between a client and a server.',
		},
		{
			id: '12',
			name: 'WebRTC',
			icon: webrtc,
			description:
				'An open-source project that provides browsers and mobile applications with real-time communication capabilities via peer-to-peer APIs.',
		},
		{
			id: '13',
			name: 'Prisma',
			icon: prisma,
			description:
				'A modern Object-Relational Mapper (ORM) for Node.js and TypeScript that simplifies database access and schema management.',
		},
		{
			id: '14',
			name: 'NodeJS',
			icon: nodejs,
			description:
				"A JavaScript runtime built on Chrome's V8 engine that allows the execution of JavaScript code on the server side.",
		},
		{
			id: '15',
			name: 'ExpressJS',
			icon: expressjs,
			description:
				'A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
		},
		{
			id: '16',
			name: 'NestJS',
			icon: nestjs,
			description:
				'A progressive Node.js framework for building efficient, reliable, and scalable server-side applications using modern JavaScript/TypeScript.',
		},
		{
			id: '17',
			name: 'PHP',
			icon: php,
			description:
				'A widely-used open-source general-purpose scripting language that is especially suited for web development and can be embedded into HTML.',
		},
		{
			id: '18',
			name: 'Java',
			icon: java,
			description:
				'A high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible.',
		},
		{
			id: '19',
			name: 'Python',
			icon: python,
			description:
				'An interpreted, high-level programming language known for its clear syntax, readability, and extensive support for various libraries.',
		},
		{
			id: '20',
			name: 'C',
			icon: c,
			description:
				'A general-purpose, low-level programming language that provides direct access to memory and serves as the foundation for many modern languages.',
		},
		{
			id: '21',
			name: 'Prolog',
			icon: prolog,
			description:
				'A logic programming language associated with artificial intelligence, computational linguistics, and formal logic reasoning.',
		},
		{
			id: '22',
			name: 'Android Studio',
			icon: androidStudio,
			description:
				'The official Integrated Development Environment (IDE) for Android app development, based on IntelliJ IDEA.',
		},
		{
			id: '23',
			name: 'Ionic',
			icon: ionic,
			description:
				'A complete open-source SDK for hybrid mobile app development, using web technologies like HTML, CSS, and JavaScript.',
		},
		{
			id: '24',
			name: 'Material UI',
			icon: materialUI,
			description:
				"A popular React component library that implements Google's Material Design, providing pre-built elements for consistent UI development.",
		},
		{
			id: '25',
			name: 'Chakra UI',
			icon: chakraUI,
			description:
				'A simple, modular, and accessible component library that gives the building blocks needed to build React applications with ease.',
		},
		{
			id: '26',
			name: 'Git',
			icon: git,
			description:
				'A distributed version control system used for tracking changes in source code during software development.',
		},
		{
			id: '27',
			name: 'Slack',
			icon: slack,
			description:
				'A cloud-based proprietary instant messaging platform designed for professional team collaboration and communication.',
		},
		{
			id: '28',
			name: 'Asana',
			icon: asana,
			description:
				'A web and mobile application designed to help teams organize, track, and manage their work and project workflows.',
		},
		{
			id: '29',
			name: 'Trello',
			icon: trello,
			description:
				'A visual collaboration tool that uses boards, lists, and cards to help teams organize projects and prioritize tasks efficiently.',
		},
		{
			id: 's1',
			name: 'Problem Solving',
			icon: problemSolving,
			description:
				'Expertise in identifying complex issues and implementing efficient, creative solutions through analytical thinking.',
		},
		{
			id: 's2',
			name: 'Collaboration',
			icon: collaboration,
			description:
				'Proven ability to work effectively in diverse teams, fostering a positive and productive environment.',
		},
		{
			id: 's3',
			name: 'Communication',
			icon: communication,
			description:
				'Strong verbal and written communication skills, capable of explaining technical concepts to non-technical stakeholders.',
		},
		{
			id: 's4',
			name: 'Growth Mindset',
			icon: growthMindset,
			description:
				'A mindset focused on continuous learning, improvement, and embracing challenges as opportunities for development.',
		},
		{
			id: 's5',
			name: 'Adaptability',
			icon: adaptability,
			description:
				'Quickly mastering new tools and technologies while staying productive in rapidly evolving project environments.',
		},
		{
			id: 's6',
			name: 'Time Management',
			icon: clockIcon,
			description:
				'Optimizing productivity by managing multiple priorities and consistently meeting project deadlines with high quality.',
		},
	];

	const handleSkillClick = (skill: Skill) => {
		setSelectedSkill(skill);
		setIsOpened(true);
	};

	const renderIcon = (skill: Skill) => {
		if (typeof skill.icon === 'function') {
			const IconComponent = skill.icon;
			return (
				<div className="flex items-center justify-center size-14 mx-auto rounded-xl bg-slate-800/50 border border-white/5 text-blue-400 group-hover:text-blue-300 transition-colors">
					<IconComponent className="size-8" />
				</div>
			);
		}
		return (
			<div className="relative size-14 mx-auto">
				<Image src={skill.icon} alt={skill.name} fill className="object-contain" />
			</div>
		);
	};

	return (
		<div id="skills" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 flex flex-col gap-12">
			<div className="flex flex-col items-center gap-4">
				<h3 className="header text-gradient">Technical Arsenal</h3>
				<p className="text-slate-400 text-center max-w-2xl">
					A comprehensive toolkit of modern technologies and professional soft skills I use to build robust,
					scalable applications.
				</p>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
				{skills.map((skill: Skill) => (
					<div
						key={skill.id}
						className="skill flex flex-col gap-4 cursor-pointer group"
						onClick={() => handleSkillClick(skill)}
					>
						{renderIcon(skill)}
						<h2 className="text-center font-medium text-slate-300 transition-colors group-hover:text-white">
							{skill.name}
						</h2>
					</div>
				))}
			</div>

			<AnimatePresence>
				{isOpened && selectedSkill && (
					<Modal
						onOpen={isOpened}
						onClose={() => setIsOpened(false)}
						name={selectedSkill.name}
						description={selectedSkill.description}
						icon={selectedSkill.icon}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Skills;
