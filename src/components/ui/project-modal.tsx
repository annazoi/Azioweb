import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import {
	XMarkIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ShareIcon,
	ArrowDownTrayIcon,
	ChatBubbleBottomCenterTextIcon,
	BoltIcon,
	Squares2X2Icon,
	RocketLaunchIcon,
	ChartBarIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/interfaces';

interface ProjectModalProps {
	project: Project;
	onOpen: boolean;
	onClose: () => void;
}

export default function ProjectModal({ project, onOpen, onClose }: ProjectModalProps) {
	const photos = project.photos || [project.photo];
	const [currentIndex, setCurrentIndex] = useState(0);

	const next = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCurrentIndex((prev) => (prev + 1) % photos.length);
	};

	const prev = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
	};

	return (
		<Dialog open={onOpen} onClose={onClose} className="relative z-50">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 ease-out data-closed:opacity-0"
			/>

			<div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto bg-[#11131a]">
				<div className="flex min-h-full items-center justify-center p-0">
					<DialogPanel
						transition
						className="relative transform bg-[var(--background-secondary)] p-6 lg:p-12 text-left transition-all duration-300 ease-out data-closed:opacity-0 w-full min-h-screen flex items-center justify-center"
					>
						<button
							onClick={onClose}
							className="fixed top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-50 shadow-xl"
						>
							<XMarkIcon className="size-6" />
						</button>

						<div className="w-full max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center relative py-12">
							{/* Left: Image Slider */}
							<div className="relative aspect-[4/3] rounded-[1rem] bg-black/40 border border-white/5 p-2 group w-full h-full max-h-[80vh] flex flex-col">
								<div className="relative w-full h-full rounded-[.5rem] overflow-hidden bg-[#0a0a0f]">
									<AnimatePresence mode="wait">
										<motion.div
											key={currentIndex}
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											transition={{ duration: 0.3 }}
											className="relative w-full h-full"
										>
											{photos[currentIndex] && photos[currentIndex] !== '' && (
												<Image
													src={photos[currentIndex]}
													alt={`${project.name} photo ${currentIndex + 1}`}
													fill
													className="object-contain"
												/>
											)}
										</motion.div>
									</AnimatePresence>

									{/* Navigation Controls */}
									{photos.length > 1 && (
										<>
											<button
												onClick={prev}
												className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
											>
												<ChevronLeftIcon className="size-5" />
											</button>
											<button
												onClick={next}
												className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
											>
												<ChevronRightIcon className="size-5" />
											</button>
										</>
									)}

									{/* Glass Floating Card */}
									<div className="absolute bottom-4 inset-x-4 bg-gradient-to-r from-black/80 to-transparent backdrop-blur-xl rounded-2xl p-4 flex items-center justify-between">
										<div className="flex flex-col gap-1">
											<span className="text-[#646cff] text-[10px] font-black tracking-widest uppercase">
												Architecture
											</span>
											<span className="text-white font-bold text-[15px]">Neural Engine v2.0</span>
										</div>
										<div className="w-8 h-8 rounded-full bg-[#1e2336] flex items-center justify-center">
											<ChartBarIcon className="w-4 h-4 text-[#646cff]" />
										</div>
									</div>
								</div>
							</div>

							{/* Right: Content details */}
							<div className="flex flex-col gap-8 w-full max-w-xl mx-auto lg:mx-0">
								{/* Top Section */}
								<div className="flex flex-col text-left gap-4">
									<DialogTitle
										as="h3"
										className="text-4xl sm:text-[40px] font-black text-white uppercase tracking-tighter"
									>
										{project.name}
									</DialogTitle>
									<p className="text-slate-300 text-[15px] font-medium leading-relaxed">
										{project.description}
									</p>
								</div>

								{/* Primary Action */}
								<div className="flex items-center gap-4">
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className="w-full py-4 rounded-xl bg-[#646cff] text-white font-black text-center tracking-widest text-xs uppercase hover:bg-[#646cff]/90 transition-colors shadow-lg shadow-[#646cff]/20 hover:shadow-[#646cff]/40"
									>
										Visit Live Project
									</a>
									<button className="flex flex-col items-center gap-1.5 group cursor-pointer">
										<div className="w-8 h-8 rounded-full border border-white/5 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
											<ShareIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
										</div>
										<span className="text-[9px] font-bold tracking-widest uppercase text-slate-400 group-hover:text-white transition-colors">
											Share
										</span>
									</button>
								</div>
								{/* Secondary Actions */}
								{/* <div className="flex items-center justify-center gap-10 lg:justify-start lg:gap-16 mt-2">
									<button className="flex flex-col items-center gap-3 group">
										<div className="w-12 h-12 rounded-full border border-white/5 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
											<ShareIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
										</div>
										<span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 group-hover:text-white transition-colors">
											Share
										</span>
									</button>
									<button className="flex flex-col items-center gap-3 group">
										<div className="w-12 h-12 rounded-full border border-white/5 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
											<ArrowDownTrayIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
										</div>
										<span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 group-hover:text-white transition-colors">
											Report
										</span>
									</button>
								</div> */}

								{/* Bento Cards */}
								<div className="grid grid-cols-2 gap-4 mt-2">
									<div className="bg-[#14151a] rounded-[1.5rem] p-6 flex flex-col gap-4 hover:border-white/10 transition-colors">
										<div className="w-8 h-8 rounded-full bg-[#1e2540] flex items-center justify-center">
											<ChatBubbleBottomCenterTextIcon className="w-4 h-4 text-[#646cff]" />
										</div>
										<div className="flex flex-col gap-1.5 mt-2">
											<span className="text-slate-400 text-[9px] font-black tracking-[0.2em] uppercase">
												Core Engine
											</span>
											<span className="text-white font-bold text-lg tracking-tight">Sentiment AI</span>
										</div>
									</div>
									<div className="bg-[#14151a] rounded-[1.5rem] p-6 flex flex-col gap-4 hover:border-white/10 transition-colors">
										<div className="w-8 h-8 rounded-full bg-[#1e2540] flex items-center justify-center">
											<BoltIcon className="w-4 h-4 text-[#646cff]" />
										</div>
										<div className="flex flex-col gap-1.5 mt-2">
											<span className="text-slate-400 text-[9px] font-black tracking-[0.2em] uppercase">
												Performance
											</span>
											<span className="text-white font-bold text-lg tracking-tight">Real-time</span>
										</div>
									</div>
								</div>

								{/* Bottom Tab Bar */}
								<div className="flex lg:justify-start justify-center mt-4">
									<div className="bg-[#14151a] rounded-full p-1.5 flex items-center">
										<button className="px-6 py-2.5 rounded-full flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors">
											<Squares2X2Icon className="w-3.5 h-3.5" />
											Overview
										</button>
										<button className="px-6 py-2.5 rounded-full bg-[#646cff] flex items-center justify-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-[#646cff]/20">
											<RocketLaunchIcon className="w-3.5 h-3.5" />
											Project
										</button>
									</div>
								</div>
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
