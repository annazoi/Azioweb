'use client';

import { motion } from 'framer-motion';
import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	CloudIcon,
	PaintBrushIcon,
	CodeBracketIcon,
	ChartBarIcon,
} from '@heroicons/react/24/outline';

const Services = () => {
	const services = [
		{
			id: 'web',
			name: 'Enterprise Web Development',
			icon: ComputerDesktopIcon,
			description:
				'We build scalable, high-performance web applications using modern frameworks like React and Next.js, tailored to solve complex business challenges.',
			technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
		},
		{
			id: 'mobile',
			name: 'Mobile App Development',
			icon: DevicePhoneMobileIcon,
			description:
				'Cross-platform native-feeling applications that engage users on both iOS and Android. Seamless performance and beautiful interfaces.',
			technologies: ['React Native', 'Ionic', 'TypeScript', 'Firebase'],
		},
		{
			id: 'saas',
			name: 'SaaS Platform Development',
			icon: CloudIcon,
			description:
				'From MVPs to complex cloud architectures. We architect robust multi-tenant systems designed for massive scale and reliability.',
			technologies: ['Microservices', 'AWS', 'Docker', 'NestJS'],
		},
		{
			id: 'uiux',
			name: 'UI/UX & Product Design',
			icon: PaintBrushIcon,
			description:
				'Data-driven design that prioritizes user experience and conversion. We create stunning visual identities that align with your business goals.',
			technologies: ['Figma', 'Prototyping', 'User Research', 'Tailwind'],
		},
		{
			id: 'api',
			name: 'Custom API Integrations',
			icon: CodeBracketIcon,
			description:
				'Connect disparate systems and automate workflows. We build stable, secure, and well-documented APIs for your ecosystem.',
			technologies: ['REST', 'GraphQL', 'WebSockets', 'OAuth'],
		},
		{
			id: 'seo',
			name: 'Performance & SEO Optimization',
			icon: ChartBarIcon,
			description:
				'We optimize your applications for maximum speed and search engine visibility to drive organic growth and better conversions.',
			technologies: ['Core Web Vitals', 'SSR/SSG', 'Lighthouse', 'Analytics'],
		},
	];

	return (
		<div id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 flex flex-col gap-16">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-black tracking-[0.2em] uppercase text-[10px] italic">Our Expertise</h3>
				<h2 className="header">
					Services We <span className="text-gradient">Offer</span>
				</h2>
				<p className="text-slate-400 max-w-2xl leading-relaxed text-sm italic mx-auto">
					We provide full-cycle software development services tailored to your specific business needs. From
					initial concept to deployment and scaling.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{services.map((service, index) => {
					const Icon = service.icon;
					return (
						<motion.div
							key={service.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true, amount: 0.2 }}
							className="group relative flex flex-col gap-6 p-8 rounded-3xl glass hover:bg-white/[0.05] transition-all duration-300 border border-white/5 hover:border-primary/30"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />

							<div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/5">
								<Icon className="w-8 h-8 text-primary" />
							</div>

							<div className="flex flex-col gap-3 relative z-10">
								<h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
									{service.name}
								</h3>
								<p className="text-slate-400 leading-relaxed text-[15px]">{service.description}</p>
							</div>

							<div className="mt-auto pt-6 border-t border-white/5 relative z-10">
								<div className="flex flex-wrap gap-2">
									{service.technologies.map((tech) => (
										<span
											key={tech}
											className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800/50 text-slate-300 border border-white/5"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default Services;
