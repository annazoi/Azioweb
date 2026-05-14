'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const toolBadges = [
	{ key: 'wf', abbr: 'Wf', className: 'bg-[#4353FF] text-white' },
	{ key: 'fg', abbr: 'Fg', className: 'bg-[#F24E1E] text-white' },
	{ key: 'c4', abbr: 'C4', className: 'bg-[#4A4A4A] text-white' },
	{ key: 'fr', abbr: 'Fr', className: 'bg-[#0055FF] text-white' },
	{ key: 'sp', abbr: 'Sp', className: 'bg-[#FF6B9D] text-white' },
	{ key: 'ae', abbr: 'Ae', className: 'bg-[#9999FF] text-white' },
	{ key: 'ps', abbr: 'Ps', className: 'bg-[#31A8FF] text-white' },
	{ key: 'pp', abbr: 'Pp', className: 'bg-[#D24726] text-white' },
	{ key: 'st', abbr: '', className: 'bg-[#E8E8E8] text-neutral-700', icon: SparklesIcon },
	{ key: 'ai', abbr: 'Ai', className: 'bg-[#FF9A00] text-white' },
] as const;

function ToolBadgeRow({ className }: { className: string }) {
	return (
		<div className={className} aria-hidden>
			{toolBadges.map((tool) => {
				const Icon = 'icon' in tool ? tool.icon : null;
				return (
					<div
						key={tool.key}
						className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold sm:size-11 sm:text-xs ${tool.className}`}
					>
						{Icon ? <Icon className="size-5" strokeWidth={1.8} /> : tool.abbr}
					</div>
				);
			})}
		</div>
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

	return (
		<section
			id="services"
			className="mx-auto max-w-7xl px-4 pb-16 pt-12 text-black sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20"
		>
			<div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-0">
				<div className="flex flex-col gap-5 lg:gap-6">
					<h2 className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1.05] tracking-tight text-black">
						{t('services.headlineLine1')}
					</h2>
					<ToolBadgeRow className="-mx-1 flex flex-wrap gap-2 px-1 pb-1 sm:gap-2.5 lg:hidden" />
					<p className="max-w-lg text-[15px] leading-relaxed text-black/90">{t('services.intro')}</p>
					<Link
						href="/#process"
						className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8E8E8] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#DDDDDD]"
					>
						<ArrowUpRightIcon className="size-4 shrink-0 text-neutral-600" strokeWidth={2} />
						{t('services.ctaWork')}
					</Link>
				</div>
				<div className="flex flex-col gap-5 lg:items-end">
					<ToolBadgeRow className="hidden flex-wrap justify-end gap-2 sm:gap-2.5 lg:flex" />
					<h2 className="text-right text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1.05] tracking-tight text-black lg:w-full">
						{t('services.headlineLine2')}
					</h2>
				</div>
			</div>

			<div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 md:gap-8 lg:mt-20">
				{cards.map((card, index) => (
					<motion.article
						key={card.id}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-40px' }}
						transition={{ duration: 0.45, delay: index * 0.06 }}
						className={`relative flex flex-col rounded-[1.75rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:p-9 md:p-10 ${index % 2 === 1 ? 'md:mt-12 lg:mt-16' : ''}`}
					>
						<h3 className="text-xl font-bold tracking-tight text-black sm:text-[22px]">{card.title}</h3>
						<div className="my-5 h-px w-full bg-[#E0E0E0]" />
						<p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AAAAAA]">
							{t('services.infoLabel')}
						</p>
						<p className="max-w-none pb-14 text-[15px] leading-relaxed text-black/90 sm:pr-4">{card.description}</p>
						<Link
							href="/book"
							className="absolute bottom-8 right-8 flex size-10 items-center justify-center rounded-full border border-[#E0E0E0] bg-white text-neutral-600 transition-colors hover:border-[#CCCCCC] hover:bg-[#FAFAFA] sm:bottom-9 sm:right-9"
							aria-label={t('services.cardCtaAria')}
						>
							<ArrowUpRightIcon className="size-4" strokeWidth={2} />
						</Link>
					</motion.article>
				))}
			</div>
		</section>
	);
};

export default Services;
