'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
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
	const tags = project.showcaseTags ?? [];
	const category = project.categoryLine ?? project.tag ?? '';
	const hasLiveUrl = Boolean(project.url && project.url !== '#');

	return (
		<Dialog open={onOpen} onClose={onClose} className="relative z-[100]">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out data-closed:opacity-0"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-6 lg:p-8">
					<DialogPanel
						transition
						className="relative w-full max-w-5xl transform overflow-hidden rounded-t-[2rem] bg-[#101010] text-left shadow-[0_40px_120px_rgba(0,0,0,0.65)] transition-all duration-300 ease-out data-closed:translate-y-8 data-closed:opacity-0 sm:rounded-[2rem] sm:data-closed:translate-y-4 sm:data-closed:scale-[0.98]"
					>
						<button
							type="button"
							onClick={onClose}
							aria-label={t('contactDrawer.close')}
							className="absolute right-4 top-4 z-30 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:right-5 sm:top-5"
						>
							<XMarkIcon className="size-5" strokeWidth={2} />
						</button>

						<div className="grid grid-cols-1 lg:grid-cols-2">
							<div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[32rem]">
								<Image
									src={project.photo}
									alt={project.name || 'Project image'}
									fill
									className="object-cover object-center"
									sizes="(max-width: 1024px) 100vw, 50vw"
									priority
								/>
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#101010]/90" />
								{tags.length > 0 && (
									<div className="absolute left-4 top-4 z-10 flex max-w-[75%] flex-wrap gap-2 sm:left-5 sm:top-5">
										{tags.map((tag) => (
											<span
												key={tag}
												className="rounded-full bg-white/10 px-3 py-1 text-[18px] font-semibold tracking-tight text-white backdrop-blur-md sm:text-xs"
											>
												{tag}
											</span>
										))}
									</div>
								)}
							</div>

							<div className="flex flex-col justify-between gap-8 px-6 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8 lg:px-10 lg:py-10">
								<div className="space-y-6">
									<div className="space-y-3 pr-10">
										{category && (
											<p className="text-sm font-medium text-white/45">{category}</p>
										)}
										<DialogTitle
											as="h3"
											className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl"
										>
											{project.name}
										</DialogTitle>
										<p className="max-w-md text-[18px] font-medium leading-relaxed text-neutral-400 sm:text-base">
											{project.description}
										</p>
									</div>

									{project.highlights && project.highlights.length > 0 && (
										<div className="space-y-3">
											<p className="text-xs font-medium text-neutral-500">
												{t('projectModal.highlights')}
											</p>
											<ul className="flex flex-col gap-2.5">
												{project.highlights.map((highlight, i) => (
													<li
														key={i}
														className="rounded-2xl bg-white/[0.04] px-4 py-3.5 text-sm font-medium leading-relaxed text-white/80 ring-1 ring-white/[0.04]"
													>
														{highlight}
													</li>
												))}
											</ul>
										</div>
									)}

									{project.details && (
										<div className="space-y-3 border-t border-white/5 pt-6">
											<p className="text-xs font-medium text-neutral-500">
												{t('projectModal.details')}
											</p>
											<p className="text-sm font-medium leading-relaxed text-neutral-400">
												{project.details}
											</p>
										</div>
									)}
								</div>

								{hasLiveUrl && (
									<div className="pt-2">
										<a
											href={project.url}
											target="_blank"
											rel="noopener noreferrer"
											className="group inline-flex w-full items-center justify-center gap-2 rounded-[16px] bg-white px-6 py-3.5 text-[18px] font-semibold text-black transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto"
										>
											{t('projectModal.visitSite')}
											<ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
										</a>
									</div>
								)}
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
