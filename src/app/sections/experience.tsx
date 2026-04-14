'use client';

import { Project } from '@/interfaces';
import ProjectModal from '@/components/ui/project-modal';
import Image from 'next/image';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import latherlab from '@/assets/projects/latherlab.png';
import relay from '@/assets/projects/relay.png';

import aura from '@/assets/projects/aura/aura.jpg';
import auraLogin from '@/assets/projects/aura/login.jpg';
import auraChats from '@/assets/projects/aura/chats.jpg';
import auraChat from '@/assets/projects/aura/chat.jpg';
import auraAi from '@/assets/projects/aura/ai.jpg';
import auraAiProgressing from '@/assets/projects/aura/ai-1.jpg';
import auraSummary from '@/assets/projects/aura/ai-2.jpg';
import auraSentimentAnlysis from '@/assets/projects/aura/ai-3.jpg';
import auraCall from '@/assets/projects/aura/call.jpg';
import auraCreateChat from '@/assets/projects/aura/create-chat.jpg';
import habitry from '@/assets/projects/habitry/habitry.png';
import habitryLanding from '@/assets/projects/habitry/landing.jpg';
import habitryDashboard from '@/assets/projects/habitry/dashboard.jpg';
import habitryAddActivity from '@/assets/projects/habitry/addActivity.jpg';
import habitryCalendar from '@/assets/projects/habitry/calendar.jpg';
import habitryLogin from '@/assets/projects/habitry/login.jpg';
import drobe from '@/assets/projects/drobe/drobe.png';
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
			id: 'site-2',
			name: 'Aura Platform',
			photo: aura,
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
			description: 'Next-Gen collaboration and secure messaging system with AI-powered features.',
			url: 'https://aura.annazoi.dev/',
			tag: 'AI/ML',
			highlights: [
				'AI-driven sentiment analysis of real-time chats',
				'Secure peer-to-peer encrypted messaging',
				'Dynamic dashboard with actionable analytics',
			],
			details:
				"The platform's core is designed for high-performance teams, integrating seamlessly with existing workflows while providing unique AI insights into project health.",
		},
		{
			id: 'site-1',
			name: 'Lather Lab',
			photo: latherlab,
			photos: [latherlab],
			url: 'https://latherlab.azioweb.com/',
			description: 'Handmade soap e-commerce platform with product browsing and secure checkout.',
			highlights: [
				'Clean, minimalist product catalog',
				'Secure integrated payment gateway',
				'Customer review and rating system',
			],
			details:
				'Built with a focus on artisanal presentation, Lather Lab ensures a smooth customer journey from ingredient discovery to final purchase.',
		},
		{
			id: 'site-4',
			name: 'Drobe App',
			photo: drobe,
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
			highlights: [
				'AI-powered clothing background removal',
				'Daily outfit suggestions based on weather',
				'Virtual wardrobe inventory tracking',
			],
			details:
				'Drobe helps users make the most of their existing wardrobe by digitizing their clothing items and providing smart coordination suggestions.',
		},
		{
			id: 'site-3',
			name: 'Habitry App',
			photo: habitry,
			photos: [habitryLanding, habitryLogin, habitryDashboard, habitryAddActivity, habitryCalendar],
			description: 'AI-driven lifestyle and habit tracking application focusing on user retention and health data.',
			url: 'https://habitry.annazoi.dev/',
			tag: 'MOBILE APP',
			highlights: [
				'Gamified habit progression tracking',
				'AI behavioral analysis for habit optimization',
				'Comprehensive wellness reporting',
			],
			details:
				'Habitry goes beyond simple streaks, using advanced analytics to help users identify patterns and successfully adopt long-term positive behaviors.',
		},
		{
			id: 'site-5',
			name: 'Relay Platform',
			photo: relay,
			photos: [relay],
			description: 'Advanced AI analysis for real-time customer sentiment and social trends.',
			url: 'https://relay.annazoi.dev/',
			tag: 'DASHBOARD',
			highlights: [
				'Real-time social media data ingestion',
				'Natural Language Processing (NLP) sentiment scoring',
				'Automated alert triggers for negative sentiment',
			],
			details:
				'Derived from the Aura platform, this standalone dashboard specializes in brand monitoring and provides deep dives into public perception.',
		},
		{
			id: 'site-6',
			name: 'Aura Call',
			photo: auraCall,
			photos: [auraCall],
			description: 'Secure, low-latency video and voice calling for modern teams.',
			url: 'https://aura.annazoi.dev/',
			tag: 'COMMUNICATION',
			highlights: [
				'WebRTC-based low-latency architecture',
				'End-to-end encrypted voice and video streams',
				'Integrated screen sharing and collaboration tools',
			],
			details:
				'Aura Call prioritizes stability and security, ensuring teams can connect reliably from any location without compromising on privacy.',
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
		<div id="clients" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:pt-32 pt-20">
			<div className="flex flex-col items-center text-center gap-4 mb-24">
				<span className="text-white/40 text-[10px] font-bold tracking-[0.5em] uppercase">The Showcase</span>
				<h2 className="header font-black text-white tracking-tighter">Built with Precision.</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Left Column */}
				<div className="flex flex-col gap-8">
					{[sites[1], sites[3]].map((site) => (
						<ProjectCard key={site.id} site={site} aspect="aspect-square" onProjectClick={handleProjectClick} />
					))}
				</div>

				{/* Middle Column - Offset */}
				<div className="flex flex-col gap-8 md:mt-24">
					{[sites[0], sites[4]].map((site) => (
						<ProjectCard key={site.id} site={site} aspect="aspect-[3/4]" onProjectClick={handleProjectClick} />
					))}
				</div>

				{/* Right Column */}
				<div className="flex flex-col gap-8">
					{[sites[2], sites[5]].map((site) => (
						<ProjectCard key={site.id} site={site} aspect="aspect-square" onProjectClick={handleProjectClick} />
					))}
				</div>
			</div>

			{selectedProject && (
				<ProjectModal project={selectedProject} onOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			)}
		</div>
	);
};

const ProjectCard = ({
	site,
	aspect,
	onProjectClick,
}: {
	site: any;
	aspect: string;
	onProjectClick: (site: any) => void;
}) => {
	return (
		<div
			onClick={() => onProjectClick(site)}
			className="group relative cursor-pointer overflow-hidden rounded-[.8rem] bg-zinc-900 transition-all duration-500"
		>
			<div className={`relative w-full overflow-hidden ${aspect}`}>
				{site.photo && (
					<Image
						src={site.photo}
						alt={site.name}
						fill
						className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
					/>
				)}

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

				{/* Content */}
				<div className="absolute inset-0 p-8 flex flex-col justify-end">
					<div className="flex justify-between items-end gap-4">
						<div className="flex flex-col gap-1.5">
							<h3 className="text-2xl font-bold text-white leading-none">{site.name}</h3>
							<p className="text-white/50 text-[13px] leading-relaxed font-medium line-clamp-2 pr-4">
								{site.description}
							</p>
						</div>
						<div className="shrink-0">
							<ArrowsPointingOutIcon className="w-6 h-6 text-white opacity-60 group-hover:opacity-100 transition-opacity" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Experience;
