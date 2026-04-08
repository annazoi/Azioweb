'use client';

import { Site, Project } from '@/interfaces';
import ProjectModal from '@/components/ui/project-modal';
import Image from 'next/image';
import { ArrowUpRightIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
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

	// --- Infinite Slider Logic ---
	const getChunkedSites = (items: Project[], size: number) => {
		if (items.length === 0) return [];
		const chunks = [];
		for (let i = 0; i < items.length; i += size) {
			const chunk = items.slice(i, i + size);
			// Pad with items from start if the last chunk is not full
			if (chunk.length < size) {
				const remaining = size - chunk.length;
				chunk.push(...items.slice(0, remaining));
			}
			chunks.push(chunk);
		}
		return chunks;
	};

	const [chunkSize, setChunkSize] = useState(4);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		const handleResize = () => {
			setChunkSize(window.innerWidth < 768 ? 1 : 4);
		};
		// Set initial value
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const activeChunkSize = isClient ? chunkSize : 4;
	const slides = getChunkedSites(sites, activeChunkSize);

	// Create an array with cloned start/end slides for seamless looping
	const displaySlides = slides.length > 0 ? [slides[slides.length - 1], ...slides, slides[0]] : [];

	const [currentIndex, setCurrentIndex] = useState(1);
	const [transitionEnabled, setTransitionEnabled] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(false);

	// Touch handlers for manual swipe
	const [touchStartX, setTouchStartX] = useState<number | null>(null);

	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStartX(e.touches[0].clientX);
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX === null) return;
		const touchEndX = e.changedTouches[0].clientX;
		const diff = touchStartX - touchEndX;

		// Swipe threshold
		if (Math.abs(diff) > 50) {
			if (diff > 0) {
				nextSlide();
			} else {
				prevSlide();
			}
		}
		setTouchStartX(null);
	};

	const nextSlide = () => {
		if (isTransitioning || displaySlides.length === 0) return;
		setIsTransitioning(true);
		setTransitionEnabled(true);
		setCurrentIndex((prev) => prev + 1);
	};

	const prevSlide = () => {
		if (isTransitioning || displaySlides.length === 0) return;
		setIsTransitioning(true);
		setTransitionEnabled(true);
		setCurrentIndex((prev) => prev - 1);
	};

	// Reset index when transitioning between mobile/desktop to prevent out of bounds
	useEffect(() => {
		setCurrentIndex(1);
		setTransitionEnabled(false);
	}, [activeChunkSize]);

	// Handle boundaries for seamless infinite scroll
	useEffect(() => {
		if (displaySlides.length === 0) return;
		let timeout: NodeJS.Timeout;

		if (currentIndex === displaySlides.length - 1) {
			timeout = setTimeout(() => {
				setTransitionEnabled(false);
				setCurrentIndex(1);
				setIsTransitioning(false);
			}, 500); // Wait for transition duration
		} else if (currentIndex === 0) {
			timeout = setTimeout(() => {
				setTransitionEnabled(false);
				setCurrentIndex(displaySlides.length - 2);
				setIsTransitioning(false);
			}, 500);
		} else {
			timeout = setTimeout(() => {
				setIsTransitioning(false);
			}, 500);
		}

		return () => clearTimeout(timeout);
	}, [currentIndex, displaySlides.length]);

	// Auto-play interval
	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 6000);
		return () => clearInterval(interval);
	}, [isTransitioning]);

	return (
		<div
			id="clients"
			className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:pt-20 pt-10 flex flex-col md:gap-16 gap-5"
		>
			{/* New Header */}

			<div className="flex justify-between items-end md:border-b md:border-white/5 border-transparent px-2 md:px-0 md:pb-8 pb-4 shrink-0">
				<h2 className="header font-black text-white uppercase tracking-tighter">
					The Showcase<span className="text-primary">.</span>
				</h2>
				<div className="hidden lg:block pb-2 text-right">
					<p className="text-white/20 font-black font-light tracking-wider text-xl uppercase">#Selected Works</p>
				</div>
			</div>

			{/* Slider Wrapper */}
			<div className="w-full relative group" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
				{/* Left Arrow */}
				<button
					onClick={prevSlide}
					className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-all shadow-xl"
					aria-label="Previous slide"
				>
					<ArrowLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
				</button>
				{/* Right Arrow */}
				<button
					onClick={nextSlide}
					className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-all shadow-xl"
					aria-label="Next slide"
				>
					<ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
				</button>

				<div className="w-full overflow-hidden px-1 md:px-0">
					{/* Track Container */}
					<div
						className="flex w-full will-change-transform items-start"
						style={{
							transform: `translateX(-${currentIndex * 100}%)`,
							transition: transitionEnabled ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
						}}
					>
						{/* Slide Items */}
						{displaySlides.map((slide, slideIndex) => (
							<div key={slideIndex} className="w-full flex-shrink-0 flex-grow-0 basis-full">
								{/* Highly Reusable Slide Layout Base */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-2 px-1">
									{slide.map((site, index) => (
										<div
											key={`${site.id}-${slideIndex}-${index}`}
											onClick={() => handleProjectClick(site)}
											className={`group cursor-pointer flex flex-col gap-5 ${index % 2 !== 0 ? 'md:mt-30' : ''}`}
										>
											{/* Image Card Container */}
											<div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
												<Image
													src={site.photo}
													alt={site.name}
													fill
													className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
												/>

												{/* Premium Dark Overlay with subtle blur to merge with the whole project */}
												<div className="hidden md:block absolute inset-0 z-0 bg-gray-950/40 backdrop-blur-[2px] transition-all duration-500 group-hover:bg-gray-950/20 group-hover:backdrop-blur-none pointer-events-none" />

												{/* Subtle darkness gradient at the bottom for image consistency */}
												<div className="hidden md:block absolute inset-x-0 bottom-0 p-2 z-10 transition-all backdrop-blur-xl bg-black/40 duration-500 text-slate-400 text-[10px] p-4 font-black uppercase tracking-[0.2em] mt-1.5 text-white glass">
													{site.description}
												</div>
											</div>

											{/* Minimal Text Details */}
											<div className="flex flex-col gap-4 ml-2">
												<div className="flex items-center justify-between">
													<div className="flex flex-col">
														<h3 className="text-2xl font-bold text-white">{site.name}</h3>
														<p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5">
															{site.tag || 'Featured Site'}
														</p>
													</div>
													<div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-2">
														<ArrowUpRightIcon className="w-6 h-6 text-secondary" strokeWidth={2.5} />
													</div>
												</div>

												{/* Description on Mobile */}
												<p className="md:hidden text-slate-400 text-[13px] leading-relaxed mr-2">
													{site.description}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Existing Project Modal Core */}
			{selectedProject && (
				<ProjectModal project={selectedProject} onOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			)}
		</div>
	);
};

export default Experience;
