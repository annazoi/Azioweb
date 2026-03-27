'use client';

import { Site } from '@/interfaces';
import Image from 'next/image';
import aura from '@/assets/projects/aura/chat.png';
import habitry from '@/assets/projects/habitry/landing.png';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import aveliavilla from '@/assets/sites/aveliavilla.jpg';
import sunterra from '@/assets/sites/sunterra.jpg';
import melba from '@/assets/sites/melba.jpg';
import cretantour from '@/assets/sites/cretantour.jpg';
import diorebeauty from '@/assets/sites/diorebeauty.jpg';
import xylouris from '@/assets/sites/xylouris.jpg';
import transfersheraklion from '@/assets/sites/transfersheraklion.jpg';
import { a } from 'framer-motion/client';

const Experience = () => {
	const sites: Site[] = [
		{
			id: '1',
			name: 'Avelia Villa',
			photo: aveliavilla,
			url: 'https://aveliavilla.gr/',
			description:
				'A vacation villa website that presents photos of the villa and detailed information about its facilities. Visitors can explore activities available in the surrounding area and make a booking directly through the website.',
		},
		{
			id: '4',
			name: 'Melba',
			photo: melba,
			url: 'https://melba.gr/',
			description:
				'A website for a sweets shop, offering visitors information about the menu, products, and store details. Users can explore available treats, learn more about the brand, and easily contact the store for inquiries.',
		},
		{
			id: '2',
			name: 'Sunterra',
			photo: sunterra,
			url: 'https://sunterra.gr/',
			description:
				'A vacation rental website that allows users to browse and book holiday homes. The platform showcases available properties with detailed descriptions and photos, making it simple for visitors to find and reserve accommodations.',
		},
		{
			id: '3',
			name: 'Xylouris',
			photo: xylouris,
			url: 'https://xylouris.gr/',
			description:
				'A traditional restaurant website where visitors can view photos of dishes, explore recipes, and make a table reservation through an easy-to-use interface.',
		},
		{
			id: '5',
			name: 'Cretantour',
			photo: cretantour,
			url: 'https://cretantour.com/',
			description:
				'A tour operator website that presents the excursions organized by the company in Crete. Visitors can browse available tours, create a custom tour based on their preferences, and explore the company’s content and material.',
		},
		{
			id: '6',
			name: 'Diore Beauty',
			photo: diorebeauty,
			url: 'https://diorebeauty.gr/',
			description:
				'A booking website for a beauty salon in Heraklion, allowing customers to schedule appointments for services such as manicure, pedicure, and other beauty treatments through an online reservation system.',
		},
		{
			id: '7',
			name: 'Transfer Heraklion',
			photo: transfersheraklion,
			url: 'https://www.testdomain.gr/transfersheraklion.com/',
			description:
				'A booking website for a beauty salon in Heraklion, allowing customers to schedule appointments for services such as manicure, pedicure, and other beauty treatments through an online reservation system.',
		},
	];

	// 1. Δυναμικό itemsPerSlide (2 για desktop, 1 για mobile)
	const [itemsPerSlide, setItemsPerSlide] = useState(2);

	useEffect(() => {
		const handleResize = () => {
			// Αν το πλάτος είναι κάτω από 1024px (lg), δείχνε 1 project
			setItemsPerSlide(window.innerWidth < 1024 ? 1 : 2);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// 2. Δημιουργία extended λίστας βάσει του itemsPerSlide
	const extendedSites = [...sites.slice(-itemsPerSlide), ...sites, ...sites.slice(0, itemsPerSlide)];

	const [index, setIndex] = useState(itemsPerSlide);
	const [isAnimating, setIsAnimating] = useState(true);

	// Επαναφορά του index αν αλλάξει το itemsPerSlide κατά το resize
	useEffect(() => {
		setIndex(itemsPerSlide);
	}, [itemsPerSlide]);

	const next = () => setIndex((prev) => prev + itemsPerSlide);
	const prev = () => setIndex((prev) => prev - itemsPerSlide);

	const handleAnimationComplete = () => {
		if (index >= sites.length + itemsPerSlide) {
			setIsAnimating(false);
			setIndex(itemsPerSlide);
		} else if (index < itemsPerSlide) {
			setIsAnimating(false);
			setIndex(sites.length);
		}
		setTimeout(() => setIsAnimating(true), 50);
	};

	return (
		<div id="clients" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 flex flex-col gap-16">
			<div className="flex flex-col items-center gap-4">
				<h3 className="header text-gradient">Client Successes</h3>
				<p className="text-slate-400 text-center max-w-2xl">
					A selection of e-commerce, booking, and dynamic web portals we have delivered.
				</p>
			</div>

			{/* <div className="relative group/carousel">
				<div className="overflow-hidden p-4 -m-4">
					<motion.div
						className="flex"
						animate={{ x: `-${(index / itemsPerSlide) * 100}%` }}
						transition={isAnimating ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
						onAnimationComplete={handleAnimationComplete}
					>
						{Array.from({ length: Math.ceil(extendedSites.length / itemsPerSlide) }, (_, i) => {
							const slideItems = extendedSites.slice(i * itemsPerSlide, (i + 1) * itemsPerSlide);

							return (
								<div key={i} className="min-w-full lg:px-4 flex flex-col gap-12 lg:gap-20">
									{slideItems.map((site, idx) => {
										const originalIndex = sites.findIndex((s) => s.id === site.id);

										return (
											<a href={site.url} target="_blank" key={`${site.id}-${i}-${idx}`}>
												<div
													className={`hover:bg-primary/5 transition-all duration-300 p-8 rounded-3xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16 
                                                 ${(i * itemsPerSlide + idx) % 2 !== 0 ? 'lg:flex-row-reverse' : ''} group cursor-pointer`}
												>
													<div className="flex-1 flex flex-col gap-6 w-full">
														<div className="flex flex-col gap-2">
															<p className="text-primary font-bold tracking-wider uppercase text-xs">
																Featured Site
															</p>
															<h3 className="text-3xl font-bold text-white group-hover:text-primary transition-colors">
																{site.name}
															</h3>
														</div>
														<div className="bg-black/80 backdrop-blur-lg p-6 rounded-3xl relative z-10 border border-primary/30 group-hover:border-primary/60 transition-all shadow-[0_0_15px_rgba(79,57,246,0.2)]">
															<p className="text-slate-200 leading-relaxed font-medium">
																{site.description}
															</p>
														</div>
													</div>

													<div className="flex-1 relative aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl group-hover:border-primary/50 transition-all duration-500">
														<Image
															src={site.photo}
															alt={site.name}
															fill
															className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
														/>
													</div>
												</div>
											</a>
										);
									})}
								</div>
							);
						})}
					</motion.div>
				</div>

				<button
					onClick={prev}
					className="absolute -left-4 top-1/2 -translate-y-1/2 glass p-3 rounded-full text-white z-20 opacity-0 group-hover/carousel:opacity-100 transition-all cursor-pointer hover:bg-primary/20 hover:border-primary/40"
				>
					<ChevronLeftIcon className="h-6 w-6" />
				</button>
				<button
					onClick={next}
					className="absolute -right-4 top-1/2 -translate-y-1/2 glass p-3 rounded-full text-white z-20 opacity-0 group-hover/carousel:opacity-100 transition-all cursor-pointer hover:bg-primary/20 hover:border-primary/40"
				>
					<ChevronRightIcon className="h-6 w-6" />
				</button>
			</div> */}
		</div>
	);
};

export default Experience;
