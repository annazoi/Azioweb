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
} from '@heroicons/react/24/outline';

const Services = () => {
	const services = [
		{
			id: 'web',
			name: 'Enterprise Web Development',
			icon: ComputerDesktopIcon,
			description:
				'We build scalable, high-performance web applications using modern frameworks like React and Next.js.',
			technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
			// Scattered Top Left
			gridArea: 'col-start-1 row-start-1 justify-self-center self-center -ml-8 mt-12',
		},
		{
			id: 'cloud',
			name: 'Cloud Infrastructure',
			icon: ServerStackIcon,
			description:
				'We design, migrate, and manage scalable cloud infrastructures ensuring high availability and maximum security.',
			technologies: ['AWS', 'Kubernetes', 'Terraform'],
			// Scattered Top Center
			gridArea: 'col-start-2 row-start-1 justify-self-end self-end mr-2 xl:mr-8 mb-6',
		},
		{
			id: 'mobile',
			name: 'Mobile App Development',
			icon: DevicePhoneMobileIcon,
			description: 'Cross-platform native-feeling applications that engage users on both iOS and Android platforms.',
			technologies: ['React Native', 'Ionic', 'TypeScript'],
			// Scattered Top Right
			gridArea: 'col-start-3 row-start-1 justify-self-end self-start mt-6 xl:mt-12 mr-8',
		},
		{
			id: 'saas',
			name: 'SaaS Platform Development',
			icon: CloudIcon,
			description:
				'From MVPs to complex cloud architectures. We architect robust systems designed for massive scale.',
			technologies: ['Microservices', 'Docker', 'NestJS'],
			// Scattered Middle Left
			gridArea: 'col-start-1 row-start-2 justify-self-start self-start -mt-8 xl:-mt-12 ml-6',
		},
		{
			id: 'uiux',
			name: 'UI/UX & Product Design',
			icon: PaintBrushIcon,
			description:
				'Data-driven design that prioritizes user experience and conversion to align with business goals.',
			technologies: ['Figma', 'Prototyping', 'Tailwind'],
			// Scattered Middle Right
			gridArea: 'col-start-3 row-start-2 justify-self-center self-end mb-12 ml-12 xl:ml-20',
		},
		{
			id: 'api',
			name: 'Custom API Integrations',
			icon: CodeBracketIcon,
			description: 'Connect disparate systems and automate workflows. We build secure APIs for your ecosystem.',
			technologies: ['REST', 'GraphQL', 'WebSockets'],
			// Scattered Bottom Left
			gridArea: 'col-start-1 row-start-3 justify-self-center self-end mb-8 xl:mb-16 -ml-12',
		},
		{
			id: 'ai',
			name: 'AI & Machine Learning',
			icon: CpuChipIcon,
			description:
				'Empowering enterprises with intelligent automation, data pipelines, and intelligent AI model integrations.',
			technologies: ['Python', 'LLMs', 'OpenAI'],
			// Scattered Bottom Center
			gridArea: 'col-start-2 row-start-3 justify-self-start self-start mt-8 xl:mt-12 -ml-6',
		},
		{
			id: 'seo',
			name: 'Performance & SEO',
			icon: ChartBarIcon,
			description:
				'We optimize your applications for maximum speed and search engine visibility for organic growth.',
			technologies: ['Core Web Vitals', 'SSR/SSG'],
			// Scattered Bottom Right
			gridArea: 'col-start-3 row-start-3 justify-self-end self-center mr-6 xl:mr-12 mt-12',
		},
	];

	// Larger, more dramatic chaotic floating animations based on deterministic indices
	const floatingVariants = {
		animate: (i: number) => {
			// Generate deterministic pseudo-random values based on index to prevent hydration mismatch
			const randomY = -25 + (i % 4) * 15; // Range between -25 and 20
			const randomX = -20 + (i % 3) * 20; // Range between -20 and 20
			return {
				y: [0, randomY, 0],
				x: [0, randomX, 0],
				transition: {
					duration: 6 + (i % 4) * 1.5,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: i * 0.4,
				},
			};
		},
	};

	const DesktopServiceCard = ({ service }: { service: any }) => {
		const Icon = service.icon;
		return (
			<div
				className="group w-[240px] h-[240px] xl:w-[280px] xl:h-[280px] cursor-pointer"
				style={{ perspective: '1000px' }}
			>
				<div
					className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateY(180deg)]"
					style={{ transformStyle: 'preserve-3d' }}
				>
					{/* FRONT SIDE */}
					<div
						className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 rounded-full glass border border-white/5 bg-slate-900/80 shadow-xl"
						style={{ backfaceVisibility: 'hidden' }}
					>
						<div className="w-12 h-12 mb-3 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5 transition-transform duration-300 group-hover:scale-110">
							<Icon className="w-6 h-6 text-primary" />
						</div>

						<h3 className="text-sm xl:text-base font-bold text-white mb-2 leading-tight px-2">{service.name}</h3>
						<p className="text-slate-400 leading-relaxed text-[11px] xl:text-xs line-clamp-3 px-4">
							{service.description}
						</p>
					</div>

					{/* BACK SIDE */}
					<div
						className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 rounded-full glass border border-primary/30 bg-primary/20 shadow-xl shadow-primary/10"
						style={{
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
						}}
					>
						<h4 className="text-white font-black mb-4 uppercase tracking-widest text-[9px] xl:text-[10px] italic">
							Technologies
						</h4>
						<div className="flex flex-wrap justify-center gap-1.5">
							{service.technologies.map((tech: string) => (
								<span
									key={tech}
									className="text-[9px] xl:text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-slate-200 border border-primary/20"
								>
									{tech}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	};

	const MobileServiceCard = ({ service }: { service: any }) => {
		const Icon = service.icon;
		return (
			<div className="group relative flex flex-col gap-5 p-6 rounded-3xl glass hover:bg-white/[0.05] transition-all duration-300 border border-white/5 hover:border-primary/30 w-full h-full">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />

				<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/5">
					<Icon className="w-7 h-7 text-primary" />
				</div>

				<div className="flex flex-col gap-2 relative z-10 w-full">
					<h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
						{service.name}
					</h3>
					<p className="text-slate-400 leading-relaxed text-sm line-clamp-3">{service.description}</p>
				</div>

				<div className="mt-auto pt-4 border-t border-white/5 relative z-10 w-full">
					<div className="flex flex-wrap gap-2">
						{service.technologies.map((tech: string) => (
							<span
								key={tech}
								className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-slate-800/50 text-slate-300 border border-white/5"
							>
								{tech}
							</span>
						))}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32 relative">
			{/* DESKTOP LAYOUT (Grid Orbit with floating animations) */}
			<div className="hidden lg:grid grid-cols-[1fr_auto_1fr] grid-rows-3 relative w-full h-[950px] xl:h-[1050px] gap-2 xl:gap-4">
				{/* Center Title Area - Locked in Row 2, Col 2 strictly */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="col-start-2 row-start-2 self-center place-self-center z-20 w-fit max-w-[320px] xl:max-w-[400px] text-center flex flex-col items-center gap-3 xl:gap-4 p-6 xl:p-8 rounded-[2rem] xl:rounded-[3rem] backdrop-blur-md shadow-2xl"
				>
					<h3 className="text-primary font-black tracking-[0.2em] uppercase text-[10px] xl:text-xs italic">
						Our Expertise
					</h3>
					<h2 className="text-3xl xl:text-5xl font-black text-white leading-tight">
						Services We <br />
						<span className="text-gradient">Offer</span>
					</h2>
					<p className="text-slate-300 leading-relaxed text-xs xl:text-sm italic">
						We provide full-cycle software development services tailored to your specific business needs. From
						initial concept to deployment and scaling.
					</p>
				</motion.div>

				{/* Safe Grid Boundaries for Scattered Cards */}
				{services.map((service, index) => (
					<motion.div
						key={service.id}
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						className={`z-10 ${service.gridArea}`}
					>
						<motion.div custom={index} variants={floatingVariants} animate="animate" className="h-full">
							<DesktopServiceCard service={service} />
						</motion.div>
					</motion.div>
				))}
			</div>

			{/* MOBILE & TABLET LAYOUT (Standard Grid) */}
			<div className="flex lg:hidden flex-col gap-12">
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-stretch w-full">
					{services.map((service, index) => (
						<motion.div
							key={service.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="w-full flex"
						>
							<MobileServiceCard service={service} />
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Services;
