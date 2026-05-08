'use client';

import './style.css';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import svyaz from '@/assets/projects/svyaz/svyaz.jpg';
import svyazLogin from '@/assets/projects/svyaz/login.jpg';
import svyazChats from '@/assets/projects/svyaz/chats.jpg';
import svyazChat from '@/assets/projects/svyaz/chat.jpg';
import svyazAi from '@/assets/projects/svyaz/ai.jpg';
import svyazAiProgressing from '@/assets/projects/svyaz/ai-1.jpg';
import svyazSummary from '@/assets/projects/svyaz/ai-2.jpg';
import svyazSentimentAnlysis from '@/assets/projects/svyaz/ai-3.jpg';
import svyazCall from '@/assets/projects/svyaz/call.jpg';
import svyazCreateChat from '@/assets/projects/svyaz/create-chat.jpg';
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
			name: 'Svyaz',
			photo: svyaz,
			photos: [
				svyazLogin,
				svyazChats,
				svyazChat,
				svyazAi,
				svyazAiProgressing,
				svyazSummary,
				svyazSentimentAnlysis,
				svyazCall,
				svyazCreateChat,
			],
			description: 'Next-Gen collaboration and secure messaging system with AI-powered task management.',
			url: 'https://svyaz.annazoi.dev/',
			tag: 'AI/ML',
		},
		{
			id: '2',
			name: 'Habitry App',
			photo: habitryDashboard,
			photos: [habitryLanding, habitryLogin, habitryDashboard, habitryAddActivity, habitryCalendar],
			description: 'AI-driven lifestyle and habit tracking application focusing on user retention and health data.',
			url: 'https://habitry.annazoi.dev/',
			tag: 'MOBILE APP',
		},
		{
			id: '3',
			name: 'Drobe App',
			photo: drobeHome,
			photos: [
				drobeLogin,
				drobeHome,
				drobeStudio,
				drobeOutfits,
				drobeAddPhoto,
				drobeClothingCutout,
				drobeSaveClothingItem,
				drobeArchives,
				drobeClothingOverview,
				drobeCreatedClothingItem,
			],
			description: 'AI-driven lifestyle and wardrobe management application focusing on user outfit tracking.',
			url: 'https://drobe.annazoi.dev/',
			tag: 'MOBILE APP',
		},
		{
			id: '4',
			name: 'Svyaz Analytics',
			photo: svyazSummary,
			photos: [svyazSummary, svyazSentimentAnlysis, svyazLogin],
			description: 'Comprehensive data visualization, sentiment analysis, and reporting dashboard.',
			url: 'https://svyaz.annazoi.dev/',
			tag: 'DASHBOARD',
		},
	];

	const [itemsPerSlide, setItemsPerSlide] = useState(3);
	const [currentIndex, setCurrentIndex] = useState(3);
	const [isAnimating, setIsAnimating] = useState(true);
	const [canNavigate, setCanNavigate] = useState(true);
	const [isPaused, setIsPaused] = useState(false);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			let newItemsPerSlide = 3;
			if (window.innerWidth < 640) newItemsPerSlide = 1;
			else if (window.innerWidth < 1024) newItemsPerSlide = 2;

			setItemsPerSlide(newItemsPerSlide);
			setCurrentIndex(newItemsPerSlide); // Reset to base safe index on resize
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Create duplicated array padded with clones for infinite sliding
	const duplicatedProjects = [...projects.slice(-itemsPerSlide), ...projects, ...projects.slice(0, itemsPerSlide)];

	const next = () => {
		if (!canNavigate) return;
		setCanNavigate(false);
		setCurrentIndex((prev) => prev + 1);
	};

	const prev = () => {
		if (!canNavigate) return;
		setCanNavigate(false);
		setCurrentIndex((prev) => prev - 1);
	};

	const handleDotClick = (dotIndex: number) => {
		if (!canNavigate) return;
		setCanNavigate(false);
		setCurrentIndex(itemsPerSlide + dotIndex);
	};

	const handleAnimationComplete = () => {
		setCanNavigate(true);
		if (currentIndex >= projects.length + itemsPerSlide) {
			setIsAnimating(false);
			setCurrentIndex(currentIndex - projects.length);
		} else if (currentIndex <= 0) {
			setIsAnimating(false);
			setCurrentIndex(currentIndex + projects.length);
		}
	};

	// Restores the animation flag cleanly after a silent jump
	useEffect(() => {
		if (!isAnimating) {
			const timer = setTimeout(() => setIsAnimating(true), 50);
			return () => clearTimeout(timer);
		}
	}, [isAnimating]);

	// Auto-play interval
	useEffect(() => {
		const timer = setInterval(() => {
			if (!isPaused && isAnimating) {
				setCurrentIndex((prev) => prev + 1);
			}
		}, 5000);
		return () => clearInterval(timer);
	}, [isPaused, isAnimating]);

	const handleProjectClick = (project: Project) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	let activeDotIndex = (currentIndex - itemsPerSlide) % projects.length;
	if (activeDotIndex < 0) activeDotIndex += projects.length;

	return (
		<div className="mx-auto mt-32 px-4 relative max-w-7xl" id="work">
			<div className="flex justify-between items-end pb-8 shrink-0 mb-16">
				<h2 className="header font-black text-white uppercase tracking-tighter">
					Case <span className="text-primary">Studies</span>
					<span className="text-primary">.</span>
				</h2>
				<div className="hidden lg:block pb-2 text-right">
					<p className="text-white/20 font-black tracking-wider text-xl uppercase">#Selected Works</p>
				</div>
			</div>

			<div
				className="relative group/carousel -mx-4 px-4"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
			>
				<div className="relative overflow-hidden w-full rounded-3xl">
					<motion.div
						className="flex"
						animate={{ x: `-${currentIndex * (100 / itemsPerSlide)}%` }}
						transition={isAnimating ? { duration: 0.5, ease: [0.32, 0.72, 0, 1] } : { duration: 0 }}
						onAnimationComplete={handleAnimationComplete}
					>
						{duplicatedProjects.map((project, idx) => (
							<div
								key={`${project.id}-${idx}`}
								className="p-3 relative"
								style={{ minWidth: `${100 / itemsPerSlide}%` }}
							>
								<div
									onClick={() => handleProjectClick(project)}
									className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-slate-900/50 p-1 transition-all h-full"
								>
									<div className="relative aspect-[4/3] overflow-hidden rounded-[2.3rem] bg-slate-800 h-full">
										<Image
											src={project.photo}
											alt={project.name}
											className="h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

										{/* Top Tag */}
										<div className="absolute top-6 left-6 z-10">
											<span className="bg-primary/80 backdrop-blur-md text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-lg border border-white/10 italic">
												{project.tag}
											</span>
										</div>

										{/* Content Overlay */}
										<div className="absolute -bottom-4 left-0 right-0 p-8 transition-all group-hover:bottom-0 duration-500 z-10">
											<div className="glass p-4 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl transition-all">
												<h4 className="text-lg font-bold text-white mb-1">{project.name}</h4>
												<p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
													{project.description}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</motion.div>
				</div>

				<button
					onClick={prev}
					className="absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-primary/60 hover:border-primary/30"
				>
					<ChevronLeftIcon className="size-5" />
				</button>

				<button
					onClick={next}
					className="absolute right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-primary/60 hover:border-primary/30"
				>
					<ChevronRightIcon className="size-5" />
				</button>
			</div>

			<div className="flex justify-center gap-2 mt-8">
				{projects.map((_, i) => (
					<button
						key={i}
						onClick={() => handleDotClick(i)}
						className={`h-2 rounded-full transition-all duration-300 ${
							i === activeDotIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
						}`}
					/>
				))}
			</div>

			{selectedProject && (
				<ProjectModal project={selectedProject} onOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			)}
		</div>
	);
};

export default Projects;
