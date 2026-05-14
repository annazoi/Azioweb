'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const About = () => {
	const { t } = useTranslation();

	return (
		<section id="about" className="bg-black px-4 py-20 sm:px-6 sm:py-24 md:py-28 lg:px-8 lg:py-32">
			<div className="mx-auto flex max-w-6xl flex-col items-center">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-80px' }}
					transition={{ duration: 0.5 }}
					className="max-w-5xl text-balance text-center text-[clamp(1.75rem,4.5vw,3.75rem)] font-bold leading-[1.12] tracking-tight text-white"
				>
					{t('about.headline')}
				</motion.h2>

				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-60px' }}
					transition={{ duration: 0.5, delay: 0.08 }}
					className="mt-14 grid w-full max-w-6xl grid-cols-1 gap-10 text-left md:mt-16 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-x-14 lg:mt-20 lg:gap-x-20"
				>
					<div className="flex flex-col gap-8">
						<p className="text-[15px] leading-relaxed text-neutral-400 md:text-base">
							<span className="font-bold text-neutral-100">{t('about.col1BoldOpen')}</span>{' '}
							{t('about.col1Rest')}{' '}
							<span className="font-bold text-neutral-100">{t('about.col1BoldClose')}</span>
						</p>
						<Link
							href="/#process"
							className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#141414] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1c1c1c]"
						>
							<ArrowUpRightIcon className="size-4 shrink-0 text-white" strokeWidth={2} />
							{t('about.cta')}
						</Link>
					</div>
					<p className="text-[15px] leading-relaxed text-neutral-400 md:text-[0.95rem]">
						{t('about.col2')}
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default About;
