'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import InfinityOrbsAnimation from '@/components/ui/infinity-orbs-animation';
import { useLocalTime } from '@/hooks/use-local-time';

const HERO_BG = '/img/azioweb.jpg';
const HERO_MARK = '/img/azioweb.png';

const SIGNAL_RINGS = [
	{ size: '62%', delay: 0 },
	{ size: '82%', delay: 0.55 },
	{ size: '100%', delay: 1.1 },
] as const;

const Hero = () => {
	const { t } = useTranslation();
	const sectionRef = useRef<HTMLElement>(null);
	const reduceMotion = useReducedMotion();
	const { time, hour, theme } = useLocalTime('Europe/Athens');

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end start'],
	});
	const bgY = useTransform(scrollYProgress, [0, 1], [0, 180]);
	const markRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

	return (
		<section
			ref={sectionRef}
			id="hero"
			className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-black"
		>
			<motion.div
				className="absolute inset-0 z-0 will-change-transform"
				style={{ y: bgY }}
			>
				<div className="absolute inset-0 scale-100 min-[1500px]:scale-[1.12]">
					<Image
						src={HERO_BG}
						alt=""
						fill
						priority
						sizes="100vw"
						className="object-contain object-bottom min-[1500px]:object-cover"
					/>
				</div>
			</motion.div>
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

				<motion.div
					initial={{ opacity: 0, scale: 0.92 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
					className="relative flex min-h-0 flex-1 flex-col items-center justify-center py-6 lg:hidden"
				>
					<div
						className="relative flex aspect-square w-[min(58vw,13.5rem)] items-center justify-center"
						aria-hidden
					>
						{SIGNAL_RINGS.map((ring) => (
							<motion.span
								key={ring.size}
								className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.12]"
								style={{ width: ring.size, height: ring.size }}
								animate={
									reduceMotion
										? { opacity: 0.35 }
										: {
												opacity: [0.12, 0.38, 0.12],
												scale: [0.96, 1.02, 0.96],
											}
								}
								transition={
									reduceMotion
										? { duration: 0 }
										: {
												duration: 5.5,
												repeat: Infinity,
												ease: 'easeInOut',
												delay: ring.delay,
											}
								}
							/>
						))}
						<motion.div
							className="relative z-10 size-[46%] shrink-0 will-change-transform"
							style={reduceMotion ? undefined : { rotate: markRotate }}
							animate={reduceMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.82, 1, 0.82] }}
							transition={
								reduceMotion
									? undefined
									: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }
							}
						>
							<Image
								src={HERO_MARK}
								alt=""
								fill
								sizes="120px"
								className="object-contain"
								priority
							/>
						</motion.div>
					</div>
					<p className="mt-7 max-w-[16rem] text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">
						{t('hero.mobileCraft')}
					</p>
				</motion.div>

				<div className="relative mt-auto flex w-full max-w-none flex-col justify-between gap-6 pb-[18vh] text-xs font-medium text-white/90 sm:flex-row sm:items-center sm:text-sm lg:absolute lg:bottom-100 lg:left-10 lg:right-auto lg:mt-0 lg:max-w-[100rem] lg:pb-0">
					<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
						<span>{t('hero.studioTag')}</span>
						<InfinityOrbsAnimation theme={theme} hour={hour} />
						<span>
							{time} {t('hero.locationLabel')}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
