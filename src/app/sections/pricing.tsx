'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

const Pricing = () => {
	const tiers = [
		{
			id: 'essential',
			name: 'MVP / Startup',
			price: 'From $15k',
			description: 'Perfect for early-stage startups needing a quick, robust Minimum Viable Product to prove market fit.',
			features: [
				'High-conversion landing page',
				'Core application features',
				'Responsive web design',
				'Basic UI/UX design',
				'Standard security protocols',
				'4-8 weeks delivery'
			],
			popular: false
		},
		{
			id: 'growth',
			name: 'Enterprise App',
			price: 'From $40k',
			description: 'Ideal for growing businesses requiring scalable applications, complex APIs, and premium UX.',
			features: [
				'Full-stack custom development',
				'Advanced UI/UX & Prototyping',
				'3rd-party API integrations',
				'Cloud architecture (AWS/GCP)',
				'Automated CI/CD pipelines',
				'3-6 months delivery'
			],
			popular: true
		},
		{
			id: 'dedicated',
			name: 'Dedicated Team',
			price: 'Retainer',
			description: 'For organizations needing ongoing development, maintenance, and a dedicated engineering squad.',
			features: [
				'Dedicated full-stack developers',
				'Agile sprint management',
				'Continuous development & scaling',
				'Regular code reviews & audits',
				'24/7 Priority support',
				'Month-to-month commitment'
			],
			popular: false
		}
	];

	return (
		<div id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 flex flex-col gap-16">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-bold tracking-wider uppercase text-sm">Flexible Plans</h3>
				<h2 className="header text-gradient">Transparent Pricing</h2>
				<p className="text-slate-400 max-w-2xl leading-relaxed text-lg mx-auto">
					No hidden fees, no surprises. We offer structured engagements tailored to the size and scale of your digital ambition.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
				{tiers.map((tier, index) => (
					<motion.div
						key={tier.id}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.15 }}
						viewport={{ once: true }}
						className={`relative p-8 rounded-[2.5rem] glass flex flex-col gap-8 transition-transform duration-300 hover:-translate-y-2
							${tier.popular ? 'border-primary/50 bg-gradient-to-b from-primary/10 to-transparent shadow-2xl shadow-primary/20 scale-105 z-10' : 'border-white/10'}
						`}
					>
						{tier.popular && (
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
								<span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-primary/40">
									Most Popular
								</span>
							</div>
						)}
						
						<div className="flex flex-col gap-4 text-center border-b border-white/10 pb-8">
							<h3 className="text-2xl font-bold text-white">{tier.name}</h3>
							<p className="text-slate-400 text-sm h-12 flex items-center justify-center pt-2">
								{tier.description}
							</p>
							<div className="mt-4 flex items-baseline justify-center gap-x-2">
								<span className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">{tier.price}</span>
							</div>
						</div>

						<ul className="flex flex-col gap-4">
							{tier.features.map((feature, fIndex) => (
								<li key={fIndex} className="flex items-start gap-3 text-slate-300">
									<CheckIcon className="size-5 text-primary flex-shrink-0 mt-0.5" />
									<span className="text-sm font-medium">{feature}</span>
								</li>
							))}
						</ul>

						<div className="mt-8">
							<a 
								href="#contact" 
								className={`block w-full text-center py-4 rounded-full font-bold transition-all duration-300
									${tier.popular 
										? 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/20' 
										: 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
									}
								`}
							>
								Get Started
							</a>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Pricing;
