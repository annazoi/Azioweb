'use client';

import { motion } from 'framer-motion';

const Testimonials = () => {
	const testimonials = [
		{
			id: 1,
			content:
				'Azioweb completely transformed our product. They took our vague ideas and delivered a polished platform—with AI features we actually shipped to customers. Technical depth and communication were outstanding.',
			author: 'Sarah Jenkins',
			role: 'CTO, TechFlow Inc.',
			initials: 'SJ',
		},
		{
			id: 2,
			content:
				'Working with them was an absolute pleasure. They delivered our MVP ahead of schedule, wired in smart automation where it counted, and the codebase stayed clean. Highly recommended for AI-forward SaaS.',
			author: 'Marcus Thorne',
			role: 'Founder, SaaSify',
			initials: 'MT',
		},
		{
			id: 3,
			content:
				'Their UX/UI design capabilities are incredible. We saw a 40% increase in user retention after they redesigned our mobile application. True professionals.',
			author: 'Elena Rodriguez',
			role: 'Product Manager, Innovate AI',
			initials: 'ER',
		},
	];

	return (
		<div id="testimonials" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-25 flex flex-col gap-16">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-bold tracking-wider uppercase text-sm">Client Reviews</h3>
				<h2 className="header">
					What Our <span className="text-gradient">Partners</span> Say
				</h2>
				<p className="text-slate-400 max-w-2xl leading-relaxed text-lg mx-auto">
					Don't just take our word for it. Here's what ambitious founders and technology leaders think about
					working with us.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{testimonials.map((testimonial, index) => (
					<motion.div
						key={testimonial.id}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.2 }}
						viewport={{ once: true, amount: 0.2 }}
						className="flex flex-col gap-6 p-8 rounded-3xl glass relative border border-white/5 hover:border-primary/20 transition-all duration-300"
					>
						{/* Quote Mark */}
						<div className="text-primary/20 text-6xl font-serif absolute top-4 left-6 pointer-events-none">"</div>

						<p className="text-slate-300 italic text-lg leading-relaxed relative z-10 pt-4">
							{testimonial.content}
						</p>

						<div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10 relative z-10">
							<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary flex items-center justify-center text-white font-bold tracking-wider">
								{testimonial.initials}
							</div>
							<div className="flex flex-col">
								<h4 className="text-white font-bold">{testimonial.author}</h4>
								<span className="text-slate-400 text-sm">{testimonial.role}</span>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Testimonials;
