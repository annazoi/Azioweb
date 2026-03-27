'use client';

import './style.css';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Hero = () => {
	const stats = [
		{ value: 50, label: 'Successful Projects', suffix: '+' },
		{ value: 100, label: 'Client Satisfaction', suffix: '%' },
		{ value: 5, label: 'Years of Excellence', suffix: '+' },
		{ value: 10, label: 'Expert Developers', suffix: '+' },
	];

	return (
		<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-20 hero flex flex-col gap-20 relative" id="hero">
			{/* Decorative background elements */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1000px] pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
				<div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
			</div>

			<div className="flex flex-col items-center text-center m-auto gap-8 lg:gap-10 relative z-10 pt-10">
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col gap-6 items-center"
				>
					<div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
						<span className="relative flex h-3 w-3">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
							<span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
						</span>
						<span className="text-sm font-medium text-slate-300">Available for new projects</span>
					</div>

					<h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
						We build scalable, high-performance <br className="hidden lg:block" />
						<span className="text-gradient">Digital Products.</span>
					</h1>
					
					<p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
						AzioWeb is a premium software development agency. We partner with ambitious brands to transform complex ideas into robust, enterprise-grade web and mobile applications.
					</p>
					
					<div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto justify-center">
						<Link href="/book" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(79,57,246,0.4)]">
							<span>Book a Discovery Call</span>
							<CalendarDaysIcon className="size-5" />
						</Link>
						<a href="#services" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-md">
							<span>Explore Our Services</span>
							<ArrowRightIcon className="size-5" />
						</a>
					</div>
				</motion.div>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 mt-10 p-8 glass rounded-3xl">
				{stats.map((item, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						viewport={{ once: true, amount: 0.5 }}
						className="text-center flex flex-col items-center justify-center"
					>
						<p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
							<CountUp end={item.value} duration={2.5} enableScrollSpy />
							{item.suffix}
						</p>
						<span className="text-sm font-medium text-slate-400 uppercase tracking-widest">{item.label}</span>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Hero;
