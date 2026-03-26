'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, PencilSquareIcon, CommandLineIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const Process = () => {
	const steps = [
		{
			id: '01',
			name: 'Discovery',
			icon: MagnifyingGlassIcon,
			description:
				'We dive deep into your business requirements, target audience, and market to define the strategy and project scope.',
		},
		{
			id: '02',
			name: 'Design',
			icon: PencilSquareIcon,
			description:
				'We create intuitive wireframes and stunning high-fidelity prototypes, focusing on UX/UI that converts.',
		},
		{
			id: '03',
			name: 'Development',
			icon: CommandLineIcon,
			description:
				'Our engineers build robust, scalable architecture using modern technologies, with regular iterations and testing.',
		},
		{
			id: '04',
			name: 'Launch & Scale',
			icon: RocketLaunchIcon,
			description:
				'We deploy securely, monitor performance, and provide ongoing maintenance to help your product grow.',
		},
	];

	return (
		<div id="process" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 flex flex-col gap-16">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-bold tracking-wider uppercase text-sm">How We Work</h3>
				<h2 className="header text-gradient">Our Development Process</h2>
				<p className="text-slate-400 max-w-2xl leading-relaxed text-lg mx-auto">
					A transparent, proven methodology that ensures we deliver high-quality software on time and within
					budget.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
				{/* Connecting lines for desktop */}
				<div className="hidden lg:none absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-12"></div>

				{steps.map((step, index) => {
					const Icon = step.icon;
					return (
						<motion.div
							key={step.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.15 }}
							viewport={{ once: true, amount: 0.5 }}
							className="relative flex flex-col items-center text-center gap-6"
						>
							<div className="w-24 h-24 rounded-full glass bg-background flex items-center justify-center relative z-10 border-2 border-primary/30 group hover:border-primary transition-colors duration-300">
								<div className="absolute inset-0 bg-primary/5 rounded-full z-0 group-hover:bg-primary/20 transition-colors duration-300"></div>
								<Icon className="w-10 h-10 text-primary relative z-10" />
								<div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-primary/40">
									{step.id}
								</div>
							</div>

							<div className="flex flex-col gap-3">
								<h3 className="text-xl font-bold text-white">{step.name}</h3>
								<p className="text-slate-400 text-sm leading-relaxed px-4">{step.description}</p>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default Process;
