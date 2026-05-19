'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getServiceHref } from '@/lib/services';

const brandLogos: { key: string; src: string; alt: string }[] = [
	{ key: 'photoshop', src: '/img/brands/adobe_photoshop.png', alt: 'Photoshop' },
	{ key: 'aistudio', src: '/img/brands/aistudio.png', alt: 'AI Studio' },
	{ key: 'canva', src: '/img/brands/canva.png', alt: 'Canva' },
	{ key: 'claude', src: '/img/brands/claude_ai.png', alt: 'Claude' },
	{ key: 'cursor', src: '/img/brands/cursor_ai.png', alt: 'Cursor' },
	{ key: 'lovable', src: '/img/brands/lovable_ai.png', alt: 'Lovable' },
	{ key: 'n8n', src: '/img/brands/n8n.png', alt: 'n8n' },
	{ key: 'openai', src: '/img/brands/openai.png', alt: 'OpenAI' },
];

const dockSpring = { type: 'spring' as const, stiffness: 460, damping: 80, mass: 0.8 };

function getDockTransform(index: number, hoveredIndex: number | null) {
	if (hoveredIndex === null) {
		return { scale: 1, y: 0 };
	}
	const distance = Math.abs(index - hoveredIndex);
	const influence = Math.exp(-(distance * distance) / 1.35);
	return {
		scale: 1 + 0.015 * influence,
		y: -18 * influence,
	};
}

function getDockZIndex(index: number, hoveredIndex: number | null) {
	if (hoveredIndex === null) return 1;
	return 30 - Math.abs(index - hoveredIndex) * 2;
}

function ToolBadgeRow({ className }: { className: string }) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={`flex items-end justify-center gap-3 sm:gap-10 ${className}`}
			onMouseLeave={() => setHoveredIndex(null)}
			aria-hidden
		>
			{brandLogos.map((brand, index) => {
				const dock = getDockTransform(index, hoveredIndex);
				const isHovered = hoveredIndex === index;

				return (
					<div
						key={brand.key}
						className="relative flex flex-col items-center justify-end pb-11"
						style={{ zIndex: getDockZIndex(index, hoveredIndex) }}
						onMouseEnter={() => setHoveredIndex(index)}
					>
						<motion.div
							className="relative size-20 shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.08)] rounded-[1.3rem]"
							style={{ transformOrigin: 'bottom center' }}
							animate={dock}
							transition={dockSpring}
						>
							<div className="size-full overflow-hidden rounded-[1.3rem]">
								<Image
									src={brand.src}
									alt={brand.alt}
									width={80}
									height={80}
									sizes="80px"
									priority
									unoptimized
									className="h-full w-full object-contain"
								/>
							</div>
							<AnimatePresence>
								{isHovered && (
									<motion.span
										initial={{ opacity: 0, y: 0, scaleY: 0 }}
										animate={{ opacity: 1, y: 10, scaleY: 1 }}
										exit={{ opacity: 0, y: 4, scaleY: 0 }}
										transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
										style={{ transformOrigin: 'top center' }}
										className="pointer-events-none absolute left-1/2 top-full z-20 -translate-x-1/2 overflow-hidden whitespace-nowrap rounded-xl bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-600 shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
									>
										{brand.alt}
									</motion.span>
								)}
							</AnimatePresence>
						</motion.div>
					</div>
				);
			})}
		</div>
	);
}

function ServiceCard({
	card,
	infoLabel,
	learnMore,
}: {
	card: { id: string; title: string; description: string };
	infoLabel: string;
	learnMore: string;
}) {
	return (
		<Link
			href={getServiceHref(card.id)}
			className="group flex min-h-[260px] flex-col rounded-[2rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:min-h-[280px] sm:p-10 hover:scale-95 transition-all duration-500"
		>
			<h3 className="text-2xl font-bold tracking-tight text-black sm:text-[1.65rem]">{card.title}</h3>
			<div className="mt-5 h-px w-full bg-[#E0E0E0]" />
			<p className="mt-5 text-sm font-medium text-[#AAAAAA]">{infoLabel}</p>
			<p className="mt-2 flex-1 text-base leading-relaxed text-black/90">{card.description}</p>
			<div className="mt-8 flex items-center justify-between">
				<span className="text-sm font-semibold text-black/60 transition-colors group-hover:text-black">
					{learnMore}
				</span>
				<span className="flex size-10 items-center justify-center rounded-[16px] bg-[#E8E8E8] text-black transition-colors group-hover:bg-[#DDDDDD] sm:size-11">
					<ArrowUpRightIcon className="size-3 transition-all duration-300 group-hover:rotate-45" strokeWidth={2} />
				</span>
			</div>
		</Link>
	);
}

const Services = () => {
	const { t } = useTranslation();
	const cards = [
		{
			id: 'uxui',
			title: t('services.cards.uxui.title'),
			description: t('services.cards.uxui.description'),
		},
		{
			id: 'nocode',
			title: t('services.cards.nocode.title'),
			description: t('services.cards.nocode.description'),
		},
		{
			id: 'corporate',
			title: t('services.cards.corporate.title'),
			description: t('services.cards.corporate.description'),
		},
		{
			id: 'threeD',
			title: t('services.cards.threeD.title'),
			description: t('services.cards.threeD.description'),
		},
	];

	const leftCards = cards.filter((_, i) => i % 2 === 0);
	const rightCards = cards.filter((_, i) => i % 2 === 1);

	return (
		<section
			id="services"
			className="mx-auto max-w-5xl px-4 pb-16 pt-12 text-black sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20"
		>
			<div className="m-auto flex w-full max-w-4xl flex-col items-start gap-10 md:items-center lg:gap-x-16 lg:gap-y-10">
				<div className="flex w-full flex-col gap-5 lg:gap-6">
					<h2 className="text-left text-[clamp(2rem,5vw,5rem)] font-black leading-[1.05] tracking-tight text-black font-medium">
						{t('services.headlineLine1')}
					</h2>
					<ToolBadgeRow className="hidden w-full lg:flex" />
					<h2 className="text-left text-[clamp(2rem,5vw,5rem)] font-black leading-[1.05] tracking-tight text-black font-medium md:text-right lg:w-full">
						{t('services.headlineLine2')}
					</h2>
				</div>
				<div className="z-100 group flex w-full max-w-none flex-col items-start gap-5 md:mr-auto md:max-w-[20rem]">
					<p className="max-w-lg text-[18px] leading-6 text-black/90">{t('services.intro')}</p>
					<Link
						href="/#process"
						className="inline-flex w-fit items-center gap-2 rounded-[16px] bg-[#D6D6D6] px-5 py-2.5 text-[16px] font-semibold text-black transition-colors"
					>
						<ArrowUpRightIcon className="size-3 shrink-0 text-black group-hover:text-neutral-600 group-hover:scale-105 group-hover:rotate-45 transition-all duration-500" strokeWidth={2} />
						{t('services.ctaWork')}
					</Link>
				</div>
			</div>

			<div className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-6 sm:mt-16 md:hidden lg:mt-20">
				{cards.map((card) => (
					<ServiceCard
						key={card.id}
						card={card}
						infoLabel={t('services.infoLabel')}
						learnMore={t('services.learnMore')}
					/>
				))}
			</div>

			<div className="mx-auto mt-14 hidden w-full max-w-5xl flex-row items-start gap-8 sm:mt-16 md:flex lg:-mt-5 lg:gap-10">
				<div className="flex flex-1 flex-col gap-8 pt-28 lg:gap-10 lg:pt-36">
					{leftCards.map((card) => (
						<ServiceCard
							key={card.id}
							card={card}
							infoLabel={t('services.infoLabel')}
							learnMore={t('services.learnMore')}
						/>
					))}
				</div>
				<div className="flex flex-1 flex-col gap-6 md:gap-8 lg:gap-10">
					{rightCards.map((card) => (
						<ServiceCard
							key={card.id}
							card={card}
							infoLabel={t('services.infoLabel')}
							learnMore={t('services.learnMore')}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
