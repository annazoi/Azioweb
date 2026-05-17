'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import InfinityOrbsAnimation from '@/components/ui/infinity-orbs-animation';
import { useLocalTime } from '@/hooks/use-local-time';
import common from '@/locales/en/common.json';
import {
	SERVICE_SLUGS,
	SERVICE_CARD_IDS,
	type ServiceSlug,
} from '@/lib/services';

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

type ServicePageData = (typeof common.servicePages.items)[ServiceSlug];

function getServiceData(slug: ServiceSlug): ServicePageData {
	return common.servicePages.items[slug];
}

function getRelatedSlugs(current: ServiceSlug): ServiceSlug[] {
	return SERVICE_SLUGS.filter((s) => s !== current).slice(0, 3);
}

export default function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
	const { t } = useTranslation();
	const data = getServiceData(slug);
	const { time, hour, theme } = useLocalTime('Europe/Athens');
	const related = getRelatedSlugs(slug);
	const index = SERVICE_SLUGS.indexOf(slug) + 1;

	return (
		<div className="min-h-screen bg-black text-white">
			<Navbar />

			<header className="relative z-10 overflow-hidden">
				<div
					className="pointer-events-none absolute inset-0 bg-gradient-brand-glow opacity-80"
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute -right-20 top-32 size-[28rem] rounded-full bg-[#6968b1]/20 blur-[100px]"
					aria-hidden
				/>
				<div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
					<motion.div {...fadeUp}>
						<Link
							href="/#services"
							className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-white"
						>
							<ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2} />
							{t('servicePages.backToServices')}
						</Link>
					</motion.div>

					<div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-3xl">
							<motion.p
								{...fadeUp}
								transition={{ ...fadeUp.transition, delay: 0.04 }}
								className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500"
							>
								{data.tag}
							</motion.p>
							<motion.h1
								{...fadeUp}
								transition={{ ...fadeUp.transition, delay: 0.08 }}
								className="mt-4 font-semibold tracking-tight text-white"
								style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.02 }}
							>
								{data.title}{' '}
								<span className="text-gradient">{data.titleAccent}</span>
							</motion.h1>
							<motion.p
								{...fadeUp}
								transition={{ ...fadeUp.transition, delay: 0.12 }}
								className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg"
							>
								{data.subtitle}
							</motion.p>
						</div>

						<motion.div
							{...fadeUp}
							transition={{ ...fadeUp.transition, delay: 0.16 }}
							className="flex shrink-0 flex-col items-start gap-3 lg:items-end"
						>
							<span
								className="select-none text-[clamp(5rem,12vw,9rem)] font-black leading-none tracking-tighter text-white/[0.06]"
								aria-hidden
							>
								{String(index).padStart(2, '0')}
							</span>
							<span className="flex items-center gap-1.5 text-sm font-medium text-neutral-500">
								<InfinityOrbsAnimation theme={theme} hour={hour} />
								{time} {t('hero.locationLabel')}
							</span>
						</motion.div>
					</div>
				</div>
			</header>

			<div className="relative z-10 rounded-t-[2rem] bg-[#F2F2F2] text-black md:rounded-t-[2.5rem]">
				<div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-80px' }}
						transition={{ duration: 0.5 }}
						className="max-w-3xl text-lg leading-relaxed text-black/85 md:text-xl md:leading-[1.65]"
					>
						{data.overview}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-60px' }}
						transition={{ duration: 0.5, delay: 0.05 }}
						className="mt-20 md:mt-28"
					>
						<h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#AAAAAA]">
							{t('servicePages.deliverablesHeading')}
						</h2>
						<div className="mt-8 grid gap-5 sm:grid-cols-2">
							{data.deliverables.map((item, i) => (
								<motion.article
									key={item.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-40px' }}
									transition={{ duration: 0.45, delay: i * 0.06 }}
									className="group flex min-h-[200px] flex-col rounded-[1.75rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-transform duration-500 hover:scale-[0.98]"
								>
									<span className="text-sm font-semibold text-[#AAAAAA]">
										{String(i + 1).padStart(2, '0')}
									</span>
									<h3 className="mt-4 text-xl font-bold tracking-tight text-black sm:text-2xl">
										{item.title}
									</h3>
									<div className="mt-4 h-px w-full bg-[#E0E0E0]" />
									<p className="mt-4 flex-1 text-[15px] leading-relaxed text-black/80">
										{item.description}
									</p>
								</motion.article>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-60px' }}
						transition={{ duration: 0.5 }}
						className="mt-20 md:mt-28"
					>
						<h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#AAAAAA]">
							{t('servicePages.processHeading')}
						</h2>
						<div className="relative mt-10 flex flex-col gap-0 md:flex-row md:gap-0">
							<div
								className="absolute left-[1.35rem] top-8 hidden h-[calc(100%-4rem)] w-px bg-[#E0E0E0] md:left-1/2 md:top-12 md:block md:h-px md:w-[calc(100%-8rem)] md:-translate-x-1/2"
								aria-hidden
							/>
							{data.process.map((step, i) => (
								<motion.div
									key={step.step}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.45, delay: i * 0.1 }}
									className="relative flex flex-1 flex-col gap-4 border-l border-[#E0E0E0] py-8 pl-8 md:border-l-0 md:border-t md:py-0 md:pl-0 md:pt-12"
								>
									<span className="absolute -left-[1.35rem] top-8 flex size-[2.7rem] items-center justify-center rounded-full bg-black text-xs font-bold text-white md:-top-5 md:left-1/2 md:-translate-x-1/2">
										{step.step}
									</span>
									<div className="md:px-6">
										<h3 className="text-lg font-bold tracking-tight text-black md:text-xl">
											{step.title}
										</h3>
										<p className="mt-2 text-[15px] leading-relaxed text-black/75">
											{step.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-60px' }}
						transition={{ duration: 0.5 }}
						className="mt-20 md:mt-28"
					>
						<h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#AAAAAA]">
							{t('servicePages.toolsHeading')}
						</h2>
						<div className="mt-6 flex flex-wrap gap-2.5">
							{data.tools.map((tool) => (
								<span
									key={tool}
									className="rounded-full border border-[#E0E0E0] bg-white px-4 py-2 text-sm font-medium text-black/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
								>
									{tool}
								</span>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-60px' }}
						transition={{ duration: 0.5 }}
						className="mt-20 md:mt-28"
					>
						<h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#AAAAAA]">
							{t('servicePages.relatedHeading')}
						</h2>
						<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
							{related.map((relatedSlug) => {
								const cardId = SERVICE_CARD_IDS[relatedSlug];
								const title = t(`services.cards.${cardId}.title`);
								return (
									<Link
										key={relatedSlug}
										href={`/services/${relatedSlug}`}
										className="group inline-flex items-center gap-2 rounded-[16px] bg-white px-5 py-3 text-[15px] font-semibold text-black shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:bg-[#E8E8E8]"
									>
										{title}
										<ArrowUpRightIcon
											className="size-3.5 transition-transform duration-300 group-hover:rotate-45"
											strokeWidth={2}
										/>
									</Link>
								);
							})}
						</div>
					</motion.div>
				</div>

				<div className="border-t border-[#E0E0E0] bg-white">
					<div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-14 md:flex-row md:items-center md:px-10 md:py-16">
						<div className="max-w-xl">
							<h2 className="text-2xl font-bold tracking-tight text-black md:text-3xl">
								{t('servicePages.ctaTitle')}
							</h2>
							<p className="mt-3 text-[15px] leading-relaxed text-black/70 md:text-base">
								{t('servicePages.ctaDescription')}
							</p>
						</div>
						<Link
							href="/book"
							className="group inline-flex shrink-0 items-center gap-2 rounded-[16px] bg-black px-6 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
						>
							{t('servicePages.ctaButton')}
							<ArrowUpRightIcon
								className="size-3.5 transition-transform duration-300 group-hover:rotate-45"
								strokeWidth={2}
							/>
						</Link>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
