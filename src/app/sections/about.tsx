'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const About = () => {
	const { t } = useTranslation();

	return (
		<section id="about" className="bg-black px-4 py-20 sm:px-6 sm:py-24 md:py-28 lg:px-8 lg:py-32">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-start">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-80px' }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-4xl text-left text-[clamp(2rem,5.2vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white m-auto"
				>
					<span className="block pl-[clamp(3.25rem,2vw,6.75rem)]">{t('about.headlineLine1')}</span>
					<span className="block">{t('about.headlineLine2')}</span>
					<span className="block">{t('about.headlineLine3')}</span>
				</motion.h2>

				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-60px' }}
					transition={{ duration: 0.5, delay: 0.08 }}
					className="m-auto mt-14 grid w-full max-w-4xl grid-cols-1 gap-10 text-left md:mt-16 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-x-14 lg:mt-20 lg:gap-x-20"
				>
					<div className="flex flex-col gap-18">
						<p className="text-[15px] leading-[1.6] text-neutral-400 md:text-[18px]">
							<span className="block pl-[clamp(3.25rem,11vw,6.75rem)]">
								<span className="font-bold text-neutral-100">{t('about.col1BoldOpen')}</span>{' '}
								{t('about.col1Line2')}
							</span>
							<span className="block">{t('about.col1Line3')}</span>
							<span className="block">{t('about.col1Line4')} <span className="font-bold text-neutral-100">{t('about.col1Line5')}</span></span>
							<span className="block font-bold text-neutral-100">{t('about.col1BoldClose')}</span>
						</p>
						<Link
							href="/#process"
							className="group inline-flex w-fit items-center gap-2 rounded-[16px] bg-[#1E1E1E] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#373737]"
						>
							<ArrowUpRightIcon className="size-3 shrink-0 text-white group-hover:text-neutral-100 transition-all duration-500 group-hover:rotate-45" strokeWidth={2} />
							<span className="group-hover:translate-x-2 transition-all duration-500 group-hover:pr-1">{t('about.cta')}</span>
						</Link>
					</div>
					<p className="text-[15px] leading-relaxed text-neutral-400 md:text-[18px]">
						{t('about.col2')}
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default About;
