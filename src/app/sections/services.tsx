'use client';

import { motion } from 'framer-motion';
import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	CloudIcon,
	PaintBrushIcon,
	CodeBracketIcon,
	ChartBarIcon,
	ServerStackIcon,
	CpuChipIcon,
	ArrowRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const Services = () => {
	const services = [
		{
			id: 'web',
			name: 'Web Development',
			icon: ComputerDesktopIcon,
			description:
				'High-performance React & Next.js applications optimized for speed, SEO, and seamless user experiences.',
		},
		{
			id: 'mobile',
			name: 'Mobile Development',
			icon: DevicePhoneMobileIcon,
			description: 'Native-feel cross-platform apps using React Native and Flutter for iOS and Android deployment.',
		},
		{
			id: 'saas',
			name: 'Fast MVP',
			icon: CloudIcon,
			description:
				'Rapid prototyping and launch strategies for startups looking to validate ideas in weeks, not months.',
		},
		{
			id: 'ai',
			name: 'AI Integration',
			icon: CpuChipIcon,
			description:
				'Custom LLM implementations and machine learning workflows to automate your core business processes.',
		},
		{
			id: 'api',
			name: 'Integrations',
			icon: CodeBracketIcon,
			description:
				'Connecting disparate systems with robust API architectures and microservices that work in harmony.',
		},
		{
			id: 'uiux',
			name: 'UI/UX Design',
			icon: PaintBrushIcon,
			description:
				'Data-driven product design that prioritizes user experience, aesthetics, and optimal conversion rates.',
		},
		{
			id: 'cloud',
			name: 'Cloud Infrastructure',
			icon: ServerStackIcon,
			description:
				'We design, migrate, and manage scalable cloud infrastructures ensuring high availability and maximum security.',
		},
		{
			id: 'seo',
			name: 'Performance & SEO',
			icon: ChartBarIcon,
			description:
				'We optimize your applications for maximum speed and search engine visibility to drive massive organic growth.',
		},
	];

	return (
		<div id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-12 relative ">
			{/* Mastered Crafts Header */}
			<div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-4 pb-8">
				<div className="flex flex-col gap-4 max-w-2xl">
					<h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
						Services We Offer<span className="text-primary">.</span>
					</h2>
					<p className="text-slate-400 text-[15px] leading-relaxed max-w-lg">
						We don't just build features; we architect ecosystems that grow with your user base.
					</p>
				</div>
				<div className="hidden lg:block pb-2">
					<p className="text-white/20 font-black font-light tracking-wider text-xl uppercase">#Services</p>
				</div>
			</div>

			{/* Bento 3x3 Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 overflow-hidden shadow-2xl relative z-10">
				{services.map((service, index) => {
					const Icon = service.icon;
					return (
						<motion.div
							key={service.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
							className="bg-[#0c0e12] p-10 flex flex-col gap-6 group hover:bg-[#13161c] transition-all duration-500 min-h-[320px] hover:-translate-y-2"
						>
							<div className="w-12 h-12 bg-[#181b22] flex items-center justify-center mb-1 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/20">
								<Icon className="w-6 h-6 text-[#9ba1ac] group-hover:text-primary transition-all duration-500" />
							</div>
							<div className="flex flex-col gap-3 relative z-10">
								<h3 className="text-[22px] font-bold text-white tracking-tight">{service.name}</h3>
								<p className="text-[#848c9b] text-[14px] leading-relaxed max-w-[95%]">{service.description}</p>
							</div>
						</motion.div>
					);
				})}

				{/* CTA Tile (Fills the 9th slot in a 3x3 grid seamlessly) */}
				<Link
					href="/book"
					className="bg-[#ced4ff] p-10 flex flex-col justify-between group hover:bg-[#b0bcff] transition-all duration-500 min-h-[320px] relative overflow-hidden"
				>
					<h3 className="text-[32px] font-bold text-[#140b49] leading-tight max-w-[200px] z-10 tracking-tight">
						Ready to start building?
					</h3>

					{/* Interactive Button */}
					<div className="flex items-center gap-2 text-[#4c1d95] font-bold text-sm z-10 mt-auto group-hover:translate-x-2 transition-transform duration-300">
						<span>Book a consultation</span>
						<ArrowRightIcon className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
					</div>

					{/* Subtle glow effect behind */}
					<div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
				</Link>
			</div>
		</div>
	);
};

export default Services;
