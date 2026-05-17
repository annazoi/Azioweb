'use client';

import { InlineWidget } from 'react-calendly';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import InfinityOrbsAnimation from '@/components/ui/infinity-orbs-animation';
import { useLocalTime } from '@/hooks/use-local-time';

const fadeUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const calendlyPageSettings = {
	backgroundColor: '000000',
	textColor: 'e8e8ed',
	primaryColor: '9886ff',
	hideEventTypeDetails: false,
	hideLandingPageDetails: false,
	hideGdprBanner: true,
} as const;

export default function BookPage() {
	const { t } = useTranslation();
	const { time, hour, theme } = useLocalTime('Europe/Athens');

	return (
		<div className="min-h-screen bg-black text-white">
			<Navbar />

			<header className="relative z-10 mx-auto max-w-6xl overflow-hidden px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
				<div
					className="pointer-events-none absolute -bottom-8 left-1/2 h-[min(28rem,55vh)] w-[min(100%,52rem)] -translate-x-1/2 bg-gradient-brand-glow opacity-90"
					aria-hidden
				/>
				<motion.p
					{...fadeUp}
					className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500"
				>
					{t('book.tag')}
				</motion.p>
				<motion.h1
					{...fadeUp}
					transition={{ ...fadeUp.transition, delay: 0.05 }}
					className="mt-4 max-w-3xl font-semibold tracking-tight text-white"
					style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1.05 }}
				>
					{t('book.titlePrefix')}{' '}
					<span className="text-gradient">{t('book.titleAccent')}</span>
				</motion.h1>
				<motion.p
					{...fadeUp}
					transition={{ ...fadeUp.transition, delay: 0.1 }}
					className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg"
				>
					{t('book.description')}
				</motion.p>
				<motion.div
					{...fadeUp}
					transition={{ ...fadeUp.transition, delay: 0.14 }}
					className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-neutral-500"
				>
					<span className="flex items-center gap-1.5 text-neutral-400">
						<InfinityOrbsAnimation theme={theme} hour={hour} />
						{time} {t('hero.locationLabel')}
					</span>
					<span className="hidden text-neutral-700 sm:inline" aria-hidden>
						·
					</span>
					<span>{t('book.duration')}</span>
					<span className="text-neutral-700" aria-hidden>
						·
					</span>
					<span>{t('book.format')}</span>
					<span className="text-neutral-700" aria-hidden>
						·
					</span>
					<span>{t('book.commitment')}</span>
				</motion.div>
			</header>

			<motion.div
				initial={{ opacity: 0, y: 28 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
				className="relative z-10 overflow-hidden rounded-t-[2rem] bg-[#0a0a0c] md:rounded-t-[2.5rem]"
			>
			
				<div className="relative mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
					<div className="calendly-dark overflow-hidden rounded-2xl border border-white/[0.06] bg-black">
						<InlineWidget
							url="https://calendly.com/anna-zoi"
							className="calendly-inline-widget min-w-0 bg-black"
							styles={{
								height: 'min(780px, 85vh)',
								minHeight: '680px',
								width: '100%',
							}}
							pageSettings={calendlyPageSettings}
						/>
					</div>
				</div>
			</motion.div>

			<Footer />
		</div>
	);
}
