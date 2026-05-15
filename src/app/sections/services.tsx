'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	CloudIcon,
	PaintBrushIcon,
	CodeBracketIcon,
	CpuChipIcon,
	ServerStackIcon,
	ChartBarIcon,
	ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

const featuredIds = ['uiux', 'ai', 'web', 'mobile'] as const;

const stackIconConfig: { Icon: typeof CodeBracketIcon; className: string }[] = [
	{ Icon: CodeBracketIcon, className: 'text-violet-600' },
	{ Icon: CpuChipIcon, className: 'text-emerald-600' },
	{ Icon: CloudIcon, className: 'text-sky-600' },
	{ Icon: PaintBrushIcon, className: 'text-rose-600' },
	{ Icon: DevicePhoneMobileIcon, className: 'text-amber-600' },
	{ Icon: ComputerDesktopIcon, className: 'text-indigo-600' },
	{ Icon: ServerStackIcon, className: 'text-slate-600' },
	{ Icon: ChartBarIcon, className: 'text-teal-600' },
];

const Services = () => {
	const { t } = useTranslation();
	const params = useParams<{ locale: string }>();
	const locale = params?.locale ?? 'en';
	const bookHref = `/${locale}/book`;
	const processHref = `/${locale}/#process`;

	const staggerClass = ['', 'md:-translate-y-7', 'md:translate-y-5', 'md:-translate-y-3'] as const;

	return (
		<section id="services" className="relative w-full text-zinc-900">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 md:pt-24 pt-14 md:pb-28 pb-16">
				<div className="flex flex-col gap-12 md:gap-16">
					<div className="flex flex-col gap-8 md:gap-10">
						<h2 className="max-w-5xl font-semibold tracking-tight text-[clamp(2rem,6vw,4.25rem)] leading-[1.08] text-zinc-950">
							<span className="block">{t('services.showcaseLine1')}</span>
							<div className="my-5 flex flex-wrap items-center gap-2.5 sm:gap-3 md:my-6">
								{stackIconConfig.map(({ Icon, className }, i) => (
									<div
										key={i}
										className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/90 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.18)] sm:h-12 sm:w-12"
									>
										<Icon className={`h-5 w-5 sm:h-5 sm:w-5 ${className}`} strokeWidth={1.75} />
									</div>
								))}
							</div>
							<span className="block text-right">{t('services.showcaseLine2')}</span>
						</h2>

						<div className="flex max-w-xl flex-col gap-6">
							<p className="text-[15px] leading-relaxed text-zinc-600 sm:text-base">{t('services.showcaseIntro')}</p>
							<Link
								href={processHref}
								className="group inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:border-zinc-300 hover:bg-zinc-50"
							>
								<span>{t('services.workCta')}</span>
								<ArrowTopRightOnSquareIcon className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
							</Link>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-7">
						{featuredIds.map((id, index) => (
							<motion.article
								key={id}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-40px' }}
								transition={{ duration: 0.45, delay: index * 0.06 }}
								className={`relative flex flex-col rounded-[1.35rem] border border-zinc-200/80 bg-white p-7 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.35)] sm:p-8 ${staggerClass[index]}`}
							>
								<h3 className="text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">
									{t(`services.cards.${id}.name`)}
								</h3>
								<div className="my-5 h-px w-full bg-zinc-100" />
								<span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
									{t('services.infoLabel')}
								</span>
								<p className="mt-2 flex-1 text-[14px] leading-relaxed text-zinc-600 sm:text-[15px]">
									{t(`services.cards.${id}.description`)}
								</p>
								<div className="mt-8 flex justify-end">
									<Link
										href={bookHref}
										className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/90 bg-zinc-50 text-zinc-500 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-900"
										aria-label={t('services.cta.action')}
									>
										<ArrowTopRightOnSquareIcon className="h-4 w-4" strokeWidth={2} />
									</Link>
								</div>
							</motion.article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services;
