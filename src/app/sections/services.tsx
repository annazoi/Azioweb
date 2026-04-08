'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	CloudIcon,
	PaintBrushIcon,
	CodeBracketIcon,
	ChartBarIcon,
	ServerStackIcon,
	CpuChipIcon,
	ArrowRightIcon,
	ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const Services = () => {
	const services = [
		{
			id: 'web',
			name: 'Web Development',
			icon: ComputerDesktopIcon,
			description:
				'High-performance React & Next.js applications optimized for speed, SEO, and seamless user experiences.',
		},
		{
			id: 'mobile',
			name: 'Mobile Development',
			icon: DevicePhoneMobileIcon,
			description: 'Native-feel cross-platform apps using React Native and Flutter for iOS and Android deployment.',
		},
		{
			id: 'saas',
			name: 'Fast MVP',
			icon: CloudIcon,
			description:
				'Rapid prototyping and launch strategies for startups looking to validate ideas in weeks, not months.',
		},
		{
			id: 'ai',
			name: 'AI Integration',
			icon: CpuChipIcon,
			description:
				'Custom LLM implementations and machine learning workflows to automate your core business processes.',
		},
		{
			id: 'api',
			name: 'Integrations',
			icon: CodeBracketIcon,
			description:
				'Connecting disparate systems with robust API architectures and microservices that work in harmony.',
		},
		{
			id: 'uiux',
			name: 'UI/UX Design',
			icon: PaintBrushIcon,
			description:
				'Data-driven product design that prioritizes user experience, aesthetics, and optimal conversion rates.',
		},
		{
			id: 'cloud',
			name: 'Cloud Infrastructure',
			icon: ServerStackIcon,
			description:
				'We design, migrate, and manage scalable cloud infrastructures ensuring high availability and maximum security.',
		},
		{
			id: 'seo',
			name: 'Performance & SEO',
			icon: ChartBarIcon,
			description:
				'We optimize your applications for maximum speed and search engine visibility to drive massive organic growth.',
		},
	];

	// --- Mobile Infinite Slider Logic ---
	const displayServices = services.length > 0 ? [services[services.length - 1], ...services, services[0]] : [];
	const [currentIndex, setCurrentIndex] = useState(1);
	const [transitionEnabled, setTransitionEnabled] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [touchStartX, setTouchStartX] = useState<number | null>(null);

	const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
	const handleTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX === null) return;
		const diff = touchStartX - e.changedTouches[0].clientX;
		if (Math.abs(diff) > 50) {
			if (diff > 0) nextSlide();
			else prevSlide();
		}
		setTouchStartX(null);
	};

	const nextSlide = () => {
		if (isTransitioning || displayServices.length === 0) return;
		setIsTransitioning(true);
		setTransitionEnabled(true);
		setCurrentIndex((prev) => prev + 1);
	};

	const prevSlide = () => {
		if (isTransitioning || displayServices.length === 0) return;
		setIsTransitioning(true);
		setTransitionEnabled(true);
		setCurrentIndex((prev) => prev - 1);
	};

	useEffect(() => {
		if (displayServices.length === 0) return;
		let timeout: NodeJS.Timeout;

		if (currentIndex === displayServices.length - 1) {
			timeout = setTimeout(() => {
				setTransitionEnabled(false);
				setCurrentIndex(1);
				setIsTransitioning(false);
			}, 500);
		} else if (currentIndex === 0) {
			timeout = setTimeout(() => {
				setTransitionEnabled(false);
				setCurrentIndex(displayServices.length - 2);
				setIsTransitioning(false);
			}, 500);
		} else {
			timeout = setTimeout(() => {
				setIsTransitioning(false);
			}, 500);
		}

		return () => clearTimeout(timeout);
	}, [currentIndex, displayServices.length]);

	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 4000); // 4 seconds auto-play
		return () => clearInterval(interval);
	}, [isTransitioning]);

	return (
		<div id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 flex flex-col gap-12 relative ">
			{/* Mastered Crafts Header */}
			<div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-4 pb-8">
				<div className="flex flex-col gap-4 max-w-2xl">
					<h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
						Services We Offer<span className="text-primary">.</span>
					</h2>
					<p className="text-slate-400 text-[15px] leading-relaxed max-w-lg">
						We don't just build features, we architect ecosystems that grow with your user base.
					</p>
				</div>
				<div className="hidden lg:block pb-2">
					<p className="text-white/20 font-black font-light tracking-wider text-xl uppercase">#Services</p>
				</div>
			</div>

			{/* Mobile Header Text */}
			<div className="md:hidden -mt-4 mb-2 shrink-0">
				<p className="text-primary font-bold tracking-widest uppercase text-xs block">Explore Services</p>
			</div>

			{/* DESKTOP: Bento 3x3 Grid (Hidden on Mobile) */}
			<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-1 overflow-hidden shadow-2xl relative z-10 w-full">
				{services.map((service, index) => {
					const Icon = service.icon;
					return (
						<motion.div
							key={`desktop-${service.id}`}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
							className="bg-[#0c0e12] p-10 flex flex-col gap-6 group text-left hover:bg-[#13161c] transition-all duration-500 min-h-[320px] hover:-translate-y-2"
						>
							<div className="w-12 h-12 bg-[#181b22] flex items-center justify-center mb-1 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/20">
								<Icon className="w-6 h-6 text-[#9ba1ac] group-hover:text-primary transition-all duration-500" />
							</div>
							<div className="flex flex-col gap-3 relative z-10">
								<h3 className="text-[22px] font-bold text-white tracking-tight">{service.name}</h3>
								<p className="text-[#848c9b] text-[14px] leading-relaxed max-w-[95%]">{service.description}</p>
							</div>
						</motion.div>
					);
				})}
				{/* Desktop CTA Tile (Fills the 9th slot seamlessly) */}
				<Link
					href="/book"
					className="bg-[#ced4ff] p-10 flex flex-col justify-between group hover:bg-[#b0bcff] transition-all duration-500 min-h-[320px] relative overflow-hidden"
				>
					<h3 className="text-[32px] font-bold text-[#140b49] leading-tight max-w-[200px] z-10 tracking-tight">
						Ready to start building?
					</h3>
					<div className="flex items-center gap-2 text-[#4c1d95] font-bold text-sm z-10 mt-auto group-hover:translate-x-2 transition-transform duration-300">
						<span>Book a consultation</span>
						<ArrowRightIcon className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
					</div>
					<div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
				</Link>
			</div>

			{/* MOBILE: Infinite Slider (Hidden on Desktop) */}
			<div className="md:hidden flex flex-col gap-2 relative z-10 w-full overflow-hidden">
				<div
					className="w-full relative overflow-hidden -mx-2"
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
				>
					<div
						className="flex w-full will-change-transform items-start pb-4"
						style={{
							transform: `translateX(-${currentIndex * 100}%)`,
							transition: transitionEnabled ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
						}}
					>
						{displayServices.map((service, index) => {
							const Icon = service.icon;
							return (
								<div
									key={`mobile-${service.id}-${index}`}
									className="w-full flex-shrink-0 flex-grow-0 basis-full px-2"
								>
									<div className="bg-[#0c0e12] p-8 flex flex-col gap-6 group text-center hover:bg-[#13161c] transition-all duration-500 min-h-[240px] rounded-3xl border border-white/5">
										<div className="w-12 h-12 bg-[#181b22] flex items-center justify-center m-auto rounded-xl">
											<Icon className="w-6 h-6 text-[#9ba1ac] transition-all duration-500" />
										</div>
										<div className="flex flex-col gap-3 relative z-10">
											<h3 className="text-[22px] font-bold text-white tracking-tight">{service.name}</h3>
											<p className="text-[#848c9b] text-[14px] leading-relaxed max-w-[95%] mx-auto">
												{service.description}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Mobile navigation controls */}
				<div className="flex justify-end items-center py-1 shrink-0 pb-4">
					<div className="flex items-center gap-3">
						<button
							onClick={prevSlide}
							className="p-2 border border-white/10 rounded-full hover:bg-white/10 transition-colors w-12 h-12"
							aria-label="Previous slide"
						>
							<ArrowLeftIcon className="w-5 h-5 text-white m-auto" />
						</button>
						<button
							onClick={nextSlide}
							className="p-2 border border-white/10 rounded-full hover:bg-white/10 transition-colors w-12 h-12"
							aria-label="Next slide"
						>
							<ArrowRightIcon className="w-5 h-5 text-white m-auto" />
						</button>
					</div>
				</div>

				{/* Mobile CTA Tile */}
				<Link
					href="/book"
					className="bg-[#ced4ff] p-10 flex flex-col justify-between group hover:bg-[#b0bcff] transition-all duration-500 min-h-[240px] relative overflow-hidden rounded-3xl"
				>
					<h3 className="text-[32px] font-bold text-[#140b49] leading-tight max-w-[200px] z-10 tracking-tight">
						Ready to start building?
					</h3>
					<div className="flex items-center gap-2 text-[#4c1d95] font-bold text-sm z-10 mt-auto group-hover:translate-x-2 transition-transform duration-300">
						<span>Book a consultation</span>
						<ArrowRightIcon className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
					</div>
					<div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
				</Link>
			</div>
		</div>
	);
};

export default Services;
