'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
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

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-12">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-[2.5rem] bg-slate-900/95 backdrop-blur-2xl border border-white/10 p-4 text-left shadow-2xl transition-all duration-300 ease-out data-closed:translate-y-4 data-closed:opacity-0 data-closed:scale-95 sm:my-8 sm:w-full"
					>
						<button
							onClick={onClose}
							className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20"
						>
							<XMarkIcon className="size-6" />
						</button>

						<div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 h-full">
							{/* Left: Image Slider */}
							<div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/40 border border-white/5 group">
								<AnimatePresence mode="wait">
									<motion.div
										key={currentIndex}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}
										className="relative w-full h-full"
									>
										<Image
											src={photos[currentIndex]}
											alt={`${project.name} photo ${currentIndex + 1}`}
											fill
											className="object-contain p-2"
										/>
									</motion.div>
								</AnimatePresence>

								{photos.length > 1 && (
									<>
										<button
											onClick={prev}
											className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<ChevronLeftIcon className="size-5" />
										</button>
										<button
											onClick={next}
											className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<ChevronRightIcon className="size-5" />
										</button>

										<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
											{photos.map((_, i) => (
												<div
													key={i}
													className={`h-1.5 rounded-full transition-all duration-300 ${
														i === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-white/20'
													}`}
												/>
											))}
										</div>
									</>
								)}
							</div>

							{/* Right: Project Details */}
							<div className="flex flex-col justify-between py-4 lg:pr-6">
								<div>
									<DialogTitle
										as="h3"
										className="text-2xl font-black text-white mb-4 uppercase tracking-tight italic glow-text-primary"
									>
										{project.name}
									</DialogTitle>
									<p className="text-slate-400 leading-relaxed text-sm mb-6 font-medium">
										{project.description}
									</p>
								</div>

								<div className="flex flex-col gap-4">
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className="w-full py-3 rounded-2xl bg-primary text-white font-bold text-center shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest italic text-xs"
									>
										Visit Live Project
									</a>
								</div>
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
