'use client';

import './style.css';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import auraLogin from '@/assets/projects/aura/login.jpg';
import auraChats from '@/assets/projects/aura/chats.jpg';
import auraChat from '@/assets/projects/aura/chat.jpg';
import auraAi from '@/assets/projects/aura/ai.jpg';
import auraAiProgressing from '@/assets/projects/aura/ai-1.jpg';
import auraSummary from '@/assets/projects/aura/ai-2.jpg';
import auraSentimentAnlysis from '@/assets/projects/aura/ai-3.jpg';
import auraCall from '@/assets/projects/aura/call.jpg';
import auraCreateChat from '@/assets/projects/aura/create-chat.jpg';
import habitryLanding from '@/assets/projects/habitry/landing.jpg';
import habitryDashboard from '@/assets/projects/habitry/dashboard.jpg';
import habitryAddActivity from '@/assets/projects/habitry/addActivity.jpg';
import habitryCalendar from '@/assets/projects/habitry/calendar.jpg';
import habitryLogin from '@/assets/projects/habitry/login.jpg';
import drobeLogin from '@/assets/projects/drobe/login.jpg';
import drobeHome from '@/assets/projects/drobe/home.jpg';
import drobeStudio from '@/assets/projects/drobe/studio.jpg';
import drobeOutfits from '@/assets/projects/drobe/outfits.jpg';
import drobeAddPhoto from '@/assets/projects/drobe/add_photo.jpg';
import drobeClothingCutout from '@/assets/projects/drobe/clothing_cutout.jpg';
import drobeSaveClothingItem from '@/assets/projects/drobe/save_clothing_item.jpg';
import drobeArchives from '@/assets/projects/drobe/archives.jpg';
import drobeClothingOverview from '@/assets/projects/drobe/clothing_overview.jpg';
import drobeCreatedClothingItem from '@/assets/projects/drobe/created_clothing_item.jpg';

import { Project } from '../../interfaces';
import ProjectModal from '@/components/ui/project-modal';

const Projects = () => {
	const projects: Project[] = [
		{
			id: '1',
			name: 'Aura',
			photo: auraChat,
			photos: [
				auraLogin,
				auraChats,
				auraChat,
				auraAi,
				auraAiProgressing,
				auraSummary,
				auraSentimentAnlysis,
				auraCall,
				auraCreateChat,
			],
			description: 'Focused on real-time collaboration, secure messaging, and smart AI assistants.',
			url: 'https://aura.annazoi.dev/',
		},
		{
			id: '2',
			name: 'Habitry',
			photo: habitryLanding,
			photos: [habitryLanding, habitryLogin, habitryDashboard, habitryAddActivity, habitryCalendar],
			description:
				'A modern, AI-powered habit tracking application designed to help users build positive habits and achieve their goals through intelligent insights and personalized guidance.',
			url: 'https://habitry.annazoi.dev/',
		},
		{
			id: '3',
			name: 'Drobe',
			photo: drobeHome,
			photos: [
				drobeHome,
				drobeLogin,
				drobeStudio,
				drobeOutfits,
				drobeAddPhoto,
				drobeClothingCutout,
				drobeCreatedClothingItem,
				drobeSaveClothingItem,
				drobeArchives,
				drobeClothingOverview,
			],
			description:
				'A modern digital wardrobe app that lets users organize their clothes with smart background removal for clean, ready-to-use photos. Users can mix and match items on an easy-to-use canvas to plan outfits and share their style with others. Built with React and NestJS, Drobe combines AI-powered image processing with a fast, scalable, and cross-platform-ready design.',
			url: 'https://drobe.annazoi.dev/',
		},
		{
			id: '4',
			name: 'Relay',
			photo: '',
			photos: [],
			description: 'Fourth project description.',
			url: 'https://relay.annazoi.dev/',
		},
	];

	const [visible, setVisible] = useState(2);
	const [index, setIndex] = useState(2);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setVisible(1);
			} else if (window.innerWidth < 1024) {
				setVisible(2);
			} else {
				setVisible(2);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const extendedProjects = [...projects.slice(-visible), ...projects, ...projects.slice(0, visible)];

	const next = () => setIndex((prev) => prev + 1);
	const prev = () => setIndex((prev) => prev - 1);

	const handleProjectClick = (project: Project) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	return (
		<div className="mx-auto mt-32 px-4 relative overflow-hidden max-w-7xl" id="work">
			<div className="flex flex-col items-center gap-4 mb-16">
				<h3 className="header text-gradient">Case Studies</h3>
				<p className="text-slate-400 text-center max-w-2xl">
					A selection of our recent enterprise-grade solutions, ranging from scalable web apps to modern AI-driven platforms.
				</p>
			</div>

			<div className="relative group/carousel">
				<motion.div
					className="flex"
					animate={{
						x: `-${index * (100 / visible)}%`,
					}}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					onAnimationComplete={() => {
						if (index >= projects.length + visible) {
							setIndex(visible);
						}
						if (index < visible) {
							setIndex(projects.length + visible - 1);
						}
					}}
				>
					{extendedProjects.map((project, i) => (
						<div
							key={i}
							className="flex-shrink-0 px-4 relative project group"
							style={{ width: `${100 / visible}%` }}
						>
							<div onClick={() => handleProjectClick(project)} className="block relative h-full cursor-pointer">
								{/* Animated Border Wrapper */}
								<div className="relative p-[1px] rounded-[2rem] overflow-hidden bg-white/10 group-hover:bg-transparent transition-colors duration-500">
									<div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-border-flow transition-opacity duration-500" />

									<div className="relative overflow-hidden rounded-[calc(2rem-1px)] aspect-[16/10] bg-slate-900 border border-white/5 shadow-2xl flex items-center justify-center">
										<Image
											src={project.photo}
											alt={project.name}
											// fill
											className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-40 group-hover:opacity-60 rounded-2xl scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-95" />

										{/* Cyber Tag */}
										<div className="absolute top-6 left-6 flex items-center gap-2 scale-90 opacity-100 group-hover:opacity-0 group-hover:scale-75 transition-all duration-500 origin-top-left">
											<div className="bg-primary cyber-clip px-6 py-2 shadow-[0_0_20px_rgba(79,57,246,0.6)]">
												<p className="text-[10px] font-black tracking-[0.2em] text-white uppercase glow-text-primary italic">
													{project.name}
												</p>
											</div>
										</div>

										{/* Immersive Reveal */}
										<div className="absolute inset-0 flex flex-col justify-center p-6 scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
											<div className="bg-black/60 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col gap-4">
												<div className="flex justify-between items-start">
													<h4 className="text-2xl font-bold text-white tracking-tight">{project.name}</h4>
													<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse border border-primary/30">
														<div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(79,57,246,1)]" />
													</div>
												</div>
												<p className="text-sm text-slate-200 leading-relaxed font-medium line-clamp-3">
													{project.description}
												</p>
												<div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mt-2 group/btn cursor-pointer">
													<span>View Details</span>
													<div className="w-8 h-px bg-primary/30 group-hover/btn:w-12 transition-all duration-300" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</motion.div>

				<button
					onClick={prev}
					className="absolute -left-2 top-1/2 -translate-y-1/2 glass p-3 rounded-full text-white z-10 opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0 transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 ring-1 ring-white/10 cursor-pointer"
					aria-label="Previous project"
				>
					<ChevronLeftIcon className="h-6 w-6 " />
				</button>

				<button
					onClick={next}
					className="absolute -right-2 top-1/2 -translate-y-1/2 glass p-3 rounded-full text-white z-10 opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0 transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 ring-1 ring-white/10 cursor-pointer"
					aria-label="Next project"
				>
					<ChevronRightIcon className="h-6 w-6 " />
				</button>
			</div>

			{selectedProject && (
				<ProjectModal project={selectedProject} onOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			)}
		</div>
	);
};

export default Projects;
