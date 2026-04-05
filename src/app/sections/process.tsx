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
		<div id="process" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-25 flex flex-col gap-16">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-black tracking-[0.2em] uppercase text-[10px] italic">How We Work</h3>
				<h2 className="header">
					Our Development <span className="text-gradient">Process</span>
				</h2>
				<p className="text-slate-400 max-w-2xl leading-relaxed text-sm italic mx-auto">
					A transparent, proven methodology that ensures we deliver high-quality software on time and within
					budget.
				</p>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-8">
				{steps.map((step, index) => {
					const Icon = step.icon;
					return (
						<motion.div
							key={step.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.15 }}
							viewport={{ once: true, amount: 0.5 }}
							className="relative flex flex-col items-center text-center gap-8 group"
						>
							<div className="relative">
								<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 flex items-center justify-center bg-slate-900/40 relative z-10 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-slate-950">
									<Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
								</div>
								{/* Numbered Bubble */}
								<div className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center text-[8px] sm:text-[10px] font-black text-white border-2 border-background z-20">
									{step.id}
								</div>
							</div>

							<div className="flex flex-col gap-3">
								<h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-widest">
									{step.name}
								</h3>
								<p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed italic px-2 sm:px-4">
									{step.description}
								</p>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default Process;
