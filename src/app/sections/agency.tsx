'use client';

import { motion } from 'framer-motion';

const Agency = () => {
	const values = [
		{
			title: 'Quality First',
			description: 'We never compromise on code quality or user experience. Every detail matters.',
		},
		{
			title: 'Client-Centric',
			description: 'Your success is our success. We build long-term partnerships, not just projects.',
		},
		{
			title: 'Agile & Adaptive',
			description: 'We iterate rapidly, stay flexible to changes, and deliver value consistently.',
		},
	];

	return (
		<div id="agency" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 flex flex-col gap-12">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-bold tracking-wider uppercase text-sm">Who We Are</h3>
				<h2 className="header text-gradient">The Azioweb Story</h2>
				<p className="text-slate-400 text-center max-w-2xl leading-relaxed text-lg">
					We are a boutique software development agency, forged by a passion for cutting-edge technology and
					impactful design.
				</p>
			</div>

			<div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 glass rounded-[3rem] px-8 py-16 relative overflow-hidden group/agency border border-white/5">
				{/* Background Element */}
				<div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/agency:opacity-100 transition-opacity duration-500 pointer-events-none" />
				<div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

				<div className="relative z-10 lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
					<h3 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
						Small Team. <br />
						<span className="text-gradient">Massive Impact.</span>
					</h3>
					<p className="text-slate-300 text-lg leading-relaxed">
						Unlike large agencies where you get lost in the shuffle, we operate as a tight-knit unit of elite
						developers and designers. We become an extension of your own team.
					</p>
					<p className="text-slate-400 leading-relaxed">
						We were founded with a simple goal: build software that stands out. Whether it's a high-converting
						landing page, a complex SaaS platform, or a native mobile app, our expert team brings decades of
						combined experience to ensure your product isn't just functional—it's phenomenal.
					</p>
				</div>

				<div className="relative z-10 lg:w-1/2 flex flex-col gap-6 w-full">
					{values.map((val, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.2 }}
							viewport={{ once: true }}
							className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
						>
							<h4 className="text-xl font-bold text-white mb-2">{val.title}</h4>
							<p className="text-slate-400 text-sm leading-relaxed">{val.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Agency;
