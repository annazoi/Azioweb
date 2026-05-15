'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type NavItem =
	| { name: string; href: string; image: string; action?: never }
	| { name: string; href: string; image: string; action: 'open-contact-drawer' };

function MenuGridIcon() {
	return (
		<span className="grid size-3.5 shrink-0 grid-cols-2 gap-0.1 items-center" aria-hidden>
			{Array.from({ length: 4 }).map((_, i) => (
				<span key={i} className="size-1 rounded-[1px] bg-white" />
			))}
		</span>
	);
}

const widthTransition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const };
const heightTransition = { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const };
const fadeTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

export default function NavbarMenuHover({ items }: { items: NavItem[] }) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const [isCard, setIsCard] = useState(false);
	const openRef = useRef(false);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		openRef.current = open;
	}, [open]);

	const handleEnter = () => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		setIsCard(true);
		setOpen(true);
	};

	const handleLeave = () => {
		closeTimer.current = setTimeout(() => setOpen(false), 160);
	};

	const handleBodyExitComplete = () => {
		if (!openRef.current) setIsCard(false);
	};

	return (
		<div
			className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-5 sm:block"
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
		>
			<motion.div
				initial={false}
				animate={{ width: open ? 400 : 120 }}
				transition={widthTransition}
				className={`pointer-events-auto relative z-[60] overflow-hidden bg-[#1a1a1a] shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[16px]`}
				style={{
					boxShadow: open ? '0 20px 60px rgba(0,0,0,0.5)' : 'none',
				}}
			>
				<div className="flex h-13 w-full shrink-0 items-center gap-2.5 px-4">
					<MenuGridIcon />
					<div className="relative min-h-[22px] min-w-0 flex-1">
						<AnimatePresence mode="popLayout" initial={false}>
							<motion.span
								key={open ? 'brand' : 'menu'}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={fadeTransition}
								className="block truncate text-center text-[18px] font-semibold tracking-tight text-white"
							>
								{open ? 'Azioweb' : t('navbar.menuLabel')}
							</motion.span>
						</AnimatePresence>
					</div>
				</div>

				<AnimatePresence initial={false} onExitComplete={handleBodyExitComplete}>
					{open && (
						<motion.div
							key="menu-body"
							initial={{ height: 0 }}
							animate={{ height: 'auto' }}
							exit={{ height: 0 }}
							transition={heightTransition}
							className="overflow-hidden"
						>
							<div className="border-t border-white/8">
								<ul>
									{items.map((item, index) => {
										const rowClass =
											'group flex items-center justify-between gap-4 border-b border-white/8 px-4 py-3.5 transition-colors hover:bg-white/[0.03]';

										const rowContent = (
											<>
												<span className="text-[17px] font-semibold tracking-tight text-white">{item.name}</span>
												<div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
													<Image src={item.image} alt="" fill className="object-cover" sizes="40px" />
												</div>
											</>
										);

										return (
											<motion.li
												key={item.name}
												initial={{ opacity: 0, y: 6 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ ...fadeTransition, delay: 0.04 + index * 0.035 }}
											>
												{'action' in item && item.action === 'open-contact-drawer' ? (
													<button
														type="button"
														onClick={() => window.dispatchEvent(new CustomEvent('open-contact-drawer'))}
														className={`${rowClass} w-full text-left`}
													>
														{rowContent}
													</button>
												) : (
													<Link href={item.href} className={rowClass}>
														{rowContent}
													</Link>
												)}
											</motion.li>
										);
									})}
								</ul>

								<div className="relative px-4 pb-4 pt-3">
									<p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/30">{t('navbar.socialLabel')}</p>
									<div className="mt-2.5 flex flex-col gap-1.5">
										<a
											href="https://twitter.com/azioweb"
											target="_blank"
											rel="noreferrer"
											className="text-[13px] font-medium text-white/75 transition-colors hover:text-white"
										>
											Twitter
										</a>
										<a
											href="https://linkedin.com/company/azioweb"
											target="_blank"
											rel="noreferrer"
											className="text-[13px] font-medium text-white/75 transition-colors hover:text-white"
										>
											LinkedIn
										</a>
									</div>
									<div
										aria-hidden
										className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#1a1a1a] to-transparent"
									/>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
