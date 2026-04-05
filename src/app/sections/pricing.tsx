'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Pricing = () => {
	const tiers = [
		{
			id: 'essential',
			name: 'MVP / Startup',
			price: 'From $15k',
			description: 'Perfect for early-stage startups needing a quick, robust MVP.',
			features: ['High-conversion landing page', 'Core application features', '4-8 weeks delivery'],
			popular: false,
		},
		{
			id: 'growth',
			name: 'Enterprise App',
			price: 'From $40k',
			description: 'Ideal for growing businesses requiring scalable applications.',
			features: ['Full-stack custom development', 'Advanced UI/UX & Prototyping', '3-6 months delivery'],
			popular: true,
		},
		{
			id: 'dedicated',
			name: 'Dedicated Team',
			price: 'Retainer',
			description: 'Ongoing development, maintenance, and expert support.',
			features: ['Dedicated full-stack squad', 'Agile sprint management', '24/7 Priority support'],
			popular: false,
		},
	];

	return (
		<div id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-25 flex flex-col gap-16">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-black tracking-[0.2em] uppercase text-[10px] italic">Flexible Plans</h3>
				<h2 className="header">
					Transparent <span className="text-gradient">Pricing</span>
				</h2>
				<p className="text-slate-400 max-w-2xl leading-relaxed text-sm italic mx-auto">
					No hidden fees, no surprises. We offer structured engagements tailored to your scale.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
				{tiers.map((tier, index) => (
					<motion.div
						key={tier.id}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.15 }}
						viewport={{ once: true }}
						className={`relative p-8 rounded-[2.5rem] flex flex-col gap-8 transition-all duration-300 hover:-translate-y-2 border
							${
								tier.popular
									? 'border-primary bg-gradient-to-b from-primary/20 via-slate-900/40 to-slate-950/40 shadow-2xl shadow-primary/20 scale-105 z-10'
									: 'border-white/10 bg-slate-900/40'
							}
						`}
					>
						{tier.popular && (
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
								<span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-lg shadow-lg shadow-primary/40 italic">
									Most Popular
								</span>
							</div>
						)}

						<div className="flex flex-col gap-4 text-center border-b border-white/5 pb-8">
							<h3 className="text-lg font-bold text-white">{tier.name}</h3>
							<p className="text-slate-400 text-xs italic line-clamp-2">{tier.description}</p>
							<div className="mt-4">
								<span className="text-3xl lg:text-4xl font-black text-white tracking-tight">{tier.price}</span>
							</div>
						</div>

						<ul className="flex flex-col gap-4 flex-grow">
							{tier.features.map((feature, fIndex) => (
								<li key={fIndex} className="flex items-center gap-3 text-slate-300">
									<CheckIcon className="size-4 text-primary flex-shrink-0" />
									<span className="text-xs font-medium">{feature}</span>
								</li>
							))}
						</ul>

						<div className="mt-auto pt-4">
							<Link
								href="/book"
								className={`block w-full text-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300
									${
										tier.popular
											? 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/20'
											: 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
									}
								`}
							>
								Get Started
							</Link>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Pricing;
