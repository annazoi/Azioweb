'use client';

import { motion } from 'framer-motion';

const Process = () => {
	const steps = [
		{
			id: '01',
			name: 'Discovery',
			description: 'Deep dive into your brand architecture and market positioning.',
		},
		{
			id: '02',
			name: 'Curated Design',
			description: 'Applying our signature editorial lens to your digital interface.',
		},
		{
			id: '03',
			name: 'Precision Build',
			description: 'Development using the latest high-performance tech stacks.',
		},
		{
			id: '04',
			name: 'Scale & Launch',
			description: 'Global deployment and continuous optimization for growth.',
		},
	];

	return (
		<div
			id="process"
			className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-0 flex flex-col gap-12 relative overflow-hidden"
		>
			{/* The Header */}
			{/* <div className="flex justify-center items-center mb-16"> */}
			<div className="hidden lg:block pb-2 text-right">
				<p className="text-white/20 font-black font-light tracking-wider text-xl uppercase">#The Method</p>
			</div>
			{/* </div> */}

			{/* Timeline Container */}
			<div className="relative mx-auto w-full max-w-4xl py-10">
				{/* Center Line (Hidden slightly at top and bottom to create fade illusion) */}
				<div className="absolute left-[17px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2" />

				<div className="flex flex-col gap-12 md:gap-20 relative z-10 w-full">
					{steps.map((step, index) => {
						const isEven = index % 2 === 0; // 0 (Left), 1 (Right)
						return (
							<motion.div
								key={step.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-50px' }}
								transition={{ duration: 0.6, delay: 0.1 }}
								className="relative flex w-full group"
							>
								{/* Desktop Left Box */}
								<div
									className={`hidden md:flex flex-col w-1/2 pr-12 justify-center text-right ${
										isEven ? 'opacity-100' : 'opacity-0 invisible'
									}`}
								>
									<h3 className="text-2xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-slate-300">
										{step.name}
									</h3>
									<p className="text-[#C8C4D9] text-[15px] leading-relaxed ml-auto max-w-[280px]">
										{step.description}
									</p>
								</div>

								{/* Center Bubble */}
								<div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 w-[40px] h-[40px] rounded-full bg-[#27292f] border border-white/5 flex items-center justify-center shadow-2xl shrink-0 z-20 group-hover:scale-110 group-hover:bg-[#333740] transition-all duration-500">
									<span className="text-[14px] font-bold font-bold tracking-widest text-[#C8C4D9]">
										{step.id}
									</span>
								</div>

								{/* Desktop Right Box & Mobile Box */}
								<div
									className={`pl-14 md:pl-12 w-full md:w-1/2 flex flex-col justify-center text-left ${
										isEven ? 'md:hidden' : 'md:opacity-100'
									}`}
								>
									{/* Note: this acts as the sole rendering on mobile devices so data is linearly stacked. On Desktop for even rows, the left box takes over. */}
									<h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-slate-300">
										{step.name}
									</h3>
									<p className="text-[#C8C4D9] text-[14px] md:text-[15px] leading-relaxed max-w-[280px]">
										{step.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Process;
