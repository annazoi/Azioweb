'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import InfinityOrbsAnimation from '@/components/ui/infinity-orbs-animation';
import { useLocalTime } from '@/hooks/use-local-time';

const HERO_BG = '/img/azioweb.jpg';

const Hero = () => {
	const { t } = useTranslation();
	const sectionRef = useRef<HTMLElement>(null);
	const { time, hour, theme } = useLocalTime('Europe/Athens');

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
			<div className="relative z-10 mx-auto flex w-full flex-1 flex-col px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
					className="relative w-full max-w-none text-left text-2xl font-medium leading-snug tracking-tight text-white sm:max-w-lg sm:text-3xl md:max-w-xl md:text-4xl lg:absolute lg:top-40 lg:right-80 lg:ml-auto lg:max-w-[340px] lg:text-[30px] lg:leading-[1.15]"
				>
					{t('hero.statement')}
				</motion.p>
				<div className="min-h-[4rem] flex-1" aria-hidden />
				<div className="mt-auto flex flex-col gap-6 sm:gap-10">
					<div className="relative flex w-full max-w-none flex-col justify-between gap-6 text-xs font-medium text-white/90 sm:flex-row sm:items-center sm:text-sm lg:absolute lg:left-10 lg:bottom-100 lg:max-w-[100rem]">
						<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
							<span>{t('hero.studioTag')}</span>
							<InfinityOrbsAnimation theme={theme} hour={hour} />
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
				</div>
			</div>
		</section>
	);
};

export default Hero;
