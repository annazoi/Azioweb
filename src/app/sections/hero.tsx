'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowDownIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const HERO_BG = '/img/azioweb.jpg';

const Hero = () => {
	const { t } = useTranslation();
	const sectionRef = useRef<HTMLElement>(null);
	const [time, setTime] = useState('');

	useEffect(() => {
		const tick = () => {
			setTime(
				new Date().toLocaleTimeString('en-GB', {
					hour: 'numeric',
					minute: '2-digit',
					hour12: true,
					timeZone: 'Europe/London',
				}),
			);
		};
		tick();
		const id = window.setInterval(tick, 30000);
		return () => window.clearInterval(id);
	}, []);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end start'],
	});
	const bgY = useTransform(scrollYProgress, [0, 1], [0, 180]);

	return (
		<section
			ref={sectionRef}
			id="hero"
			className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-black"
		>
			<motion.div
				className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
				style={{
					backgroundImage: `url('${HERO_BG}')`,
					y: bgY,
					scale: 1.12,
				}}
			/>
			<div className="absolute inset-0 z-[1] bg-black/55" aria-hidden />
			<div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
					className="ml-auto w-full max-w-[22rem] text-left text-2xl font-medium leading-snug tracking-tight text-white sm:max-w-lg sm:text-3xl md:max-w-xl md:text-4xl lg:max-w-2xl lg:text-[2.65rem] lg:leading-[1.15]"
				>
					{t('hero.statement')}
				</motion.p>
				<div className="min-h-[4rem] flex-1" aria-hidden />
				<div className="mt-auto flex flex-col gap-6 sm:gap-10">
					<div className="flex flex-col justify-between gap-6 text-xs font-medium text-white/90 sm:flex-row sm:items-center sm:text-sm">
						<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
							<span>{t('hero.studioTag')}</span>
							<ClockIcon className="size-4 shrink-0 opacity-80" strokeWidth={1.5} />
							<span>
								{time} {t('hero.locationLabel')}
							</span>
						</div>
						<Link
							href="#services"
							className="flex items-center gap-2 self-start transition-opacity hover:opacity-70 sm:self-auto"
						>
							<span>{t('hero.scrollExplore')}</span>
							<ArrowDownIcon className="size-4" strokeWidth={2} />
						</Link>
					</div>
					<div className="overflow-hidden pb-2">
						
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
