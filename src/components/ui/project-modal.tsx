'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Project } from '@/interfaces';
import { useTranslation } from 'react-i18next';

interface ProjectModalProps {
	project: Project;
	onOpen: boolean;
	onClose: () => void;
}

export default function ProjectModal({ project, onOpen, onClose }: ProjectModalProps) {
	const { t } = useTranslation();

	return (
		<Dialog open={onOpen} onClose={onClose} className="relative z-[100]">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ease-out data-closed:opacity-0"
			/>

			<div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-[2rem] bg-[#1a1a1a] text-left transition-all duration-300 ease-out data-closed:opacity-0 w-full max-w-2xl shadow-2xl border border-white/5"
					>
						{/* Close Button */}
						<button
							onClick={onClose}
							className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-all z-50 backdrop-blur-md"
						>
							<XMarkIcon className="size-5" />
						</button>

						{/* Hero Image */}
						<div className="relative aspect-video w-full overflow-hidden">
							<Image
								src={project.photo}
								alt={project.name || 'Project image'}
								fill
								className="object-cover"
							/>
							<div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
						</div>

						{/* Content */}
						<div className="p-8 md:p-12 -mt-12 relative z-10">
							<div className="flex flex-col gap-8">
								{/* Header */}
								<div className="space-y-4">
									<DialogTitle
										as="h3"
										className="text-4xl font-bold text-white tracking-tight"
									>
										{project.name}
									</DialogTitle>
									<p className="text-white/50 text-base font-medium leading-relaxed max-w-xl">
										{project.description}
									</p>
								</div>

								{/* Highlights */}
								{project.highlights && project.highlights.length > 0 && (
									<div className="space-y-6">
										<p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t('projectModal.highlights')}</p>
										<ul className="space-y-4">
											{project.highlights.map((highlight, i) => (
												<li key={i} className="flex items-start gap-3">
													<div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
													<span className="text-white/80 text-sm font-medium leading-relaxed">{highlight}</span>
												</li>
											))}
										</ul>
									</div>
								)}

								{/* Project Details */}
								{project.details && (
									<div className="space-y-4">
										<p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t('projectModal.details')}</p>
										<p className="text-white/80 text-sm font-medium leading-relaxed">
											{project.details}
										</p>
									</div>
								)}

								{/* Actions */}
								<div className="pt-4">
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-br from-primary to-[#8A5CF5] text-white font-bold text-sm transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 active:scale-95 group"
									>
										{t('projectModal.visitSite')}
										<ArrowTopRightOnSquareIcon className="size-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
