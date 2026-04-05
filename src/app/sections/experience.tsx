'use client';

import { Site, Project } from '@/interfaces';
import ProjectModal from '@/components/ui/project-modal';
import Image from 'next/image';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { a } from 'framer-motion/client';
import latherlab from '@/assets/sites/latherlab.jpg';

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

const Experience = () => {
	const sites: Project[] = [
		{
			id: 'site-1',
			name: 'Lather Lab',
			photo: latherlab,
			photos: [latherlab],
			url: 'https://latherlab.azioweb.com/',
			description:
				'A handmade soap e-commerce website featuring natural soap products with ingredient details and images. Customers can browse, add to cart, and purchase securely via integrated payments. Includes a client interface and an admin dashboard for managing products, orders, and inventory.',
		},
		{
			id: 'site-2',
			name: 'Lather Lab',
			photo: latherlab,
			photos: [latherlab],
			url: 'https://latherlab.azioweb.com/',
			description:
				'A handmade soap e-commerce website featuring natural soap products with ingredient details and images. Customers can browse, add to cart, and purchase securely via integrated payments. Includes a client interface and an admin dashboard for managing products, orders, and inventory.',
		},

		{
			id: '1',
			name: 'Aura Platform',
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
			description: 'Next-Gen collaboration and secure messaging system with AI-powered task management.',
			url: 'https://aura.annazoi.dev/',
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
			name: 'Aura Analytics',
			photo: auraSummary,
			photos: [auraSummary, auraSentimentAnlysis, auraLogin],
			description: 'Comprehensive data visualization, sentiment analysis, and reporting dashboard.',
			url: 'https://aura.annazoi.dev/',
			tag: 'DASHBOARD',
		},
	];

	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleProjectClick = (site: Project) => {
		if (site.photos && site.photos.length > 0) {
			setSelectedProject(site);
			setIsModalOpen(true);
		} else {
			window.open(site.url, '_blank');
		}
	};

	return (
		<div id="clients" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 flex flex-col gap-16">
			{/* New Header */}
			<div className="flex justify-between items-end mb-12 border-b border-white/5 pb-8">
				<h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter">
					The Showcase<span className="text-primary">.</span>
				</h2>
				<p className="text-primary font-bold tracking-widest uppercase text-xs hidden sm:block">
					Selected Works 2024
				</p>
			</div>

			{/* Masonry Grid Layout */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
				{sites.map((site, index) => (
					<motion.div
						key={site.id}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.6, delay: 0.1 }}
						onClick={() => handleProjectClick(site)}
						className={`group cursor-pointer flex flex-col gap-5 ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
					>
						{/* Image Card Container */}
						<div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
							<Image
								src={site.photo}
								alt={site.name}
								fill
								className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
							/>
							{/* Subtle darkness gradient at the bottom for image consistency */}
							<div className="absolute inset-x-0 bottom-0 p-2 transition-all backdrop-blur-xl bg-black/40 duration-500 text-slate-400 text-[10px] p-4 font-black uppercase tracking-[0.2em] mt-1.5 text-white glass">
								{site.description}
							</div>
						</div>

						{/* Minimal Text Details */}
						<div className="flex items-center justify-between ml-2">
							<div className="flex flex-col">
								<h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-secondary">
									{site.name}
								</h3>
								<p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5">
									{site.tag || 'Featured Site'}
								</p>
							</div>
							<div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-2">
								<ArrowUpRightIcon className="w-6 h-6 text-secondary" strokeWidth={2.5} />
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Existing Project Modal Core */}
			{selectedProject && (
				<ProjectModal project={selectedProject} onOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			)}
		</div>
	);
};

export default Experience;
