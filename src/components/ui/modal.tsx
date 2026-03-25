'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalOptions {
	onOpen: boolean;
	onClose: (value: boolean) => void;
	description: string;
	icon: any;
	name: string;
}

export default function Modal({ onOpen, onClose, name, description, icon }: ModalOptions) {
	return (
		<AnimatePresence>
			{onOpen && (
				<Dialog open={onOpen} onClose={() => onClose(false)} className="relative z-50">
					<DialogBackdrop
						as={motion.div}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity"
					/>

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
							<DialogPanel
								as={motion.div}
								initial={{ opacity: 0, scale: 0.95, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: 20 }}
								className="relative transform overflow-hidden rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 text-left shadow-2xl sm:my-8 sm:w-full sm:max-w-md"
							>
								{/* Close Button */}
								<button
									onClick={() => onClose(false)}
									className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
								>
									<XMarkIcon className="size-5" />
								</button>

								<div className="flex flex-col items-center gap-6 mt-4">
									<div className="relative size-20 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner flex items-center justify-center">
										{typeof icon === 'function' ? (
											(() => {
												const IconComponent = icon;
												return <IconComponent className="size-10 text-blue-400" />;
											})()
										) : icon ? (
											<Image src={icon} alt={name} fill className="object-contain p-4" />
										) : null}
									</div>

									<div className="text-center">
										<DialogTitle as="h3" className="text-2xl font-bold text-white mb-3">
											{name}
										</DialogTitle>
										<p className="text-slate-400 leading-relaxed">
											{description}
										</p>
									</div>
								</div>

								<div className="mt-8 flex justify-center">
									<button
										type="button"
										onClick={() => onClose(false)}
										className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all"
									>
										Got it!
									</button>
								</div>
							</DialogPanel>
						</div>
					</div>
				</Dialog>
			)}
		</AnimatePresence>
	);
}
