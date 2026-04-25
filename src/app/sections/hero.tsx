'use client';

import './style.css';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';

const Hero = () => {
	const { t } = useTranslation();
	const params = useParams<{ locale: string }>();
	const locale = params?.locale ?? 'en';
	const stats = [
		{ value: 10, label: t('hero.stats.projects'), suffix: '+' },
		{ value: 100, label: t('hero.stats.satisfaction'), suffix: '%' },
		{ value: 5, label: t('hero.stats.years'), suffix: '+' },
		{ value: 10, label: t('hero.stats.developers'), suffix: '+' },
	];

	return (
		<div
			className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:mt-34 mt-20 hero flex flex-col md:gap-20 gap-10 relative"
			id="hero"
		>
			<div className="flex flex-col items-center text-center m-auto gap-8 lg:gap-10 relative z-10 pt-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col gap-6 items-center"
				>
					<h1 className="header lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
						{t('hero.title_part1')} <br className="hidden lg:block" />
						<span className="text-gradient">{t('hero.title_part2')}</span>
					</h1>

					<p className="text-sm lg:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
						{t('hero.description')}
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto justify-center">
						<Link
							href={`/${locale}/book`}
							className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary hover:bg-primary text-white px-8 py-4 rounded-xl md:rounded-lg font-semibold transition-all duration-300"
						>
							<span>{t('hero.book_call')}</span>
							<CalendarDaysIcon className="size-5" />
						</Link>
						<a
							href="#services"
							className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl md:rounded-lg font-semibold transition-all duration-300 backdrop-blur-md"
						>
							<span>{t('hero.explore_services')}</span>
							<ArrowRightIcon className="size-5" />
						</a>
					</div>
				</motion.div>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 md:mt-10 mt-0 p-8 glass rounded-lg">
				{stats.map((item, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						viewport={{ once: true, amount: 0.5 }}
						className="text-center flex flex-col items-center justify-center"
					>
						<p className="md:text-4xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary mb-2">
							<CountUp end={item.value} duration={2.5} enableScrollSpy />
							{item.suffix}
						</p>
						<span className="md:text-sm text-xs font-medium text-slate-300 uppercase tracking-widest">
							{item.label}
						</span>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Hero;
