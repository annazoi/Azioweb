'use client';

import { motion } from 'framer-motion';

const Agency = () => {
	const values = [
		{
			title: 'Quality First',
			description:
				'Solid engineering and UX—even more important when AI is in the loop. We test, observe, and harden integrations before users depend on them.',
		},
		{
			title: 'Client-Centric',
			description: 'Your success is our success. We ship alongside you—from discovery to models in production—with clear milestones and measurable outcomes.',
		},
		{
			title: 'Agile & Adaptive',
			description:
				'Models, APIs, and product needs move fast. We iterate in short loops so your AI capabilities improve continuously without compromising stability.',
		},
	];

	return (
		<div id="agency" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-25 flex flex-col gap-16">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-black tracking-[0.2em] uppercase text-[10px] italic">Who We Are</h3>
				<h2 className="header">
					The Azioweb <span className="text-gradient">Story</span>
				</h2>
				<p className="text-slate-400 max-w-2xl leading-relaxed text-sm italic mx-auto">
					We are an AI-focused product studio—pairing sharp product craft with practical ML and LLM integrations
					that belong in your app, not slide decks.
				</p>
			</div>

			<div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 bg-slate-900/40 rounded-[2.5rem] px-10 py-16 relative overflow-hidden group/agency border border-white/5">
				<div className="relative z-10 lg:w-1/2 flex flex-col gap-8">
					<div className="flex flex-col gap-2">
						<h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
							Small Team. <br />
							<span className="text-gradient">Massive Impact.</span>
						</h3>
					</div>
					<div className="flex flex-col gap-4">
						<p className="text-slate-300 text-xs font-black uppercase tracking-widest italic">
							Unlike large agencies where you get lost in the shuffle, we operate as a tight-knit unit of elite
							developers and designers.
						</p>
						<p className="text-slate-400 text-xs leading-relaxed italic">
							We were founded to build software that stands out—including intelligent features where they save
							time, boost retention, or unlock new workflows. From SaaS and marketplaces to native mobile, we ship
							AI integrations you can run, monitor, and trust.
						</p>
					</div>
				</div>

				<div className="relative z-10 lg:w-1/2 flex flex-col gap-4 w-full">
					{values.map((val, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.2 }}
							viewport={{ once: true }}
							className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 hover:bg-primary/5 transition-colors"
						>
							<h4 className="text-sm font-black text-white mb-2 uppercase tracking-widest">{val.title}</h4>
							<p className="text-slate-400 text-[12px] leading-relaxed italic">{val.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Agency;
