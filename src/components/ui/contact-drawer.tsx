'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StatusMessage from '@/components/ui/StatusMessage';

type Status = 'idle' | 'sending' | 'success' | 'error';
type EngagementType = 'project' | 'retainer';

const BUILD_OPTIONS = ['website', 'mobileApp', 'branding', 'corporate', 'other'] as const;
const BUDGET_OPTIONS = ['3-5k', '5-10k', '10k+', 'other'] as const;

const panelVariants = {
	initial: { scale: 0.06, opacity: 0, borderRadius: 28 },
	animate: {
		scale: 1,
		opacity: 1,
		borderRadius: '2rem 0 0 2rem',
		transition: { type: 'spring' as const, damping: 28, stiffness: 260, mass: 0.9 },
	},
	exit: {
		scale: 0.06,
		opacity: 0,
		borderRadius: 28,
		transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
	},
};

const confirmMotion = {
	initial: { scale: 0.88, opacity: 0 },
	animate: {
		scale: 1,
		opacity: 1,
		transition: { type: 'spring' as const, damping: 26, stiffness: 320 },
	},
};

const CONFIRM_WIDTH = 448;
const CONFIRM_HEIGHT = 220;

function clampConfirmPosition(x: number, y: number) {
	const margin = 16;
	const halfW = CONFIRM_WIDTH / 2;
	const halfH = CONFIRM_HEIGHT / 2;
	return {
		x: Math.min(Math.max(x, margin + halfW), window.innerWidth - margin - halfW),
		y: Math.min(Math.max(y, margin + halfH), window.innerHeight - margin - halfH),
	};
}

function Pill({
	active,
	children,
	onClick,
}: {
	active: boolean;
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
				active
					? 'bg-white text-black'
					: 'bg-white/10 text-neutral-300 hover:bg-white/15'
			}`}
		>
			{children}
		</button>
	);
}

export default function ContactDrawer() {
	const { t } = useTranslation();
	const lenis = useLenis();
	const [open, setOpen] = useState(false);
	const [engagementType, setEngagementType] = useState<EngagementType>('project');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [buildTypes, setBuildTypes] = useState<string[]>([]);
	const [budget, setBudget] = useState('');
	const [details, setDetails] = useState('');
	const [status, setStatus] = useState<Status>('idle');
	const [backdropHover, setBackdropHover] = useState(false);
	const [cursor, setCursor] = useState({ x: 0, y: 0 });
	const [showCloseConfirm, setShowCloseConfirm] = useState(false);
	const [confirmAnchor, setConfirmAnchor] = useState({ x: 0, y: 0 });

	useEffect(() => {
		if (!open) {
			setBackdropHover(false);
			setShowCloseConfirm(false);
		}
	}, [open]);

	useEffect(() => {
		if (!lenis) return;
		if (open) lenis.stop();
		else lenis.start();
	}, [open, lenis]);

	useEffect(() => {
		const openDrawer = () => setOpen(true);
		window.addEventListener('open-contact-drawer', openDrawer);
		return () => window.removeEventListener('open-contact-drawer', openDrawer);
	}, []);

	const toggleBuildType = (key: string) => {
		setBuildTypes((prev) =>
			prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
		);
	};

	const resetForm = () => {
		setEngagementType('project');
		setName('');
		setEmail('');
		setBuildTypes([]);
		setBudget('');
		setDetails('');
		setStatus('idle');
	};

	const forceClose = useCallback(() => {
		setShowCloseConfirm(false);
		setBackdropHover(false);
		setOpen(false);
		window.setTimeout(resetForm, 450);
	}, []);

	const promptClose = useCallback((e: React.MouseEvent) => {
		setConfirmAnchor(clampConfirmPosition(e.clientX, e.clientY));
		setShowCloseConfirm(true);
	}, []);

	const dismissConfirm = useCallback(() => {
		setShowCloseConfirm(false);
	}, []);

	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') return;
			e.preventDefault();
			if (showCloseConfirm) dismissConfirm();
		};
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [open, showCloseConfirm, dismissConfirm]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus('sending');

		const nameParts = name.trim().split(/\s+/);
		const firstName = nameParts[0] ?? '';
		const lastName = nameParts.slice(1).join(' ') || '—';
		const buildLabels = buildTypes.map((k) => t(`contactDrawer.buildOptions.${k}`)).join(', ');
		const message = [
			`Engagement: ${t(`contactDrawer.${engagementType === 'project' ? 'projectBased' : 'retainerModel'}`)}`,
			buildLabels ? `What we build: ${buildLabels}` : null,
			budget ? `Budget: ${t(`contactDrawer.budgetOptions.${budget}`)}` : null,
			'',
			details.trim(),
		]
			.filter(Boolean)
			.join('\n');

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ firstName, lastName, email, message }),
			});
			if (res.ok) {
				setStatus('success');
				window.setTimeout(forceClose, 2000);
			} else {
				setStatus('error');
			}
		} catch {
			setStatus('error');
		}
	};

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				aria-label={t('contactDrawer.openLabel')}
				className={`fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm text-2xl font-bold leading-none text-white shadow-lg shadow-black/30 transition-all hover:scale-105 active:scale-95 ${open ? 'pointer-events-none scale-0 opacity-0' : 'scale-100 opacity-100'}`}
			>
				<svg className="size-10" viewBox="0 0 24 24" fill="none" aria-hidden>
					<path
						d="M10 15L6.92474 18.1137C6.49579 18.548 6.28131 18.7652 6.09695 18.7805C5.93701 18.7938 5.78042 18.7295 5.67596 18.6076C5.55556 18.4672 5.55556 18.162 5.55556 17.5515V15.9916C5.55556 15.444 5.10707 15.0477 4.5652 14.9683V14.9683C3.25374 14.7762 2.22378 13.7463 2.03168 12.4348C2 12.2186 2 11.9605 2 11.4444V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H14.2C15.8802 2 16.7202 2 17.362 2.32698C17.9265 2.6146 18.3854 3.07354 18.673 3.63803C19 4.27976 19 5.11984 19 6.8V11M19 22L16.8236 20.4869C16.5177 20.2742 16.3647 20.1678 16.1982 20.0924C16.0504 20.0255 15.8951 19.9768 15.7356 19.9474C15.5558 19.9143 15.3695 19.9143 14.9969 19.9143H13.2C12.0799 19.9143 11.5198 19.9143 11.092 19.6963C10.7157 19.5046 10.4097 19.1986 10.218 18.8223C10 18.3944 10 17.8344 10 16.7143V14.2C10 13.0799 10 12.5198 10.218 12.092C10.4097 11.7157 10.7157 11.4097 11.092 11.218C11.5198 11 12.0799 11 13.2 11H18.8C19.9201 11 20.4802 11 20.908 11.218C21.2843 11.4097 21.5903 11.7157 21.782 12.092C22 12.5198 22 13.0799 22 14.2V16.9143C22 17.8462 22 18.3121 21.8478 18.6797C21.6448 19.1697 21.2554 19.5591 20.7654 19.762C20.3978 19.9143 19.9319 19.9143 19 19.9143V22Z"
						stroke="currentColor"
						strokeWidth={1.44}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			<Dialog open={open} onClose={() => {}} className="relative z-[100]">
				<DialogBackdrop
					transition
					onClick={promptClose}
					onMouseMove={(e) => {
						setCursor({ x: e.clientX, y: e.clientY });
						setBackdropHover(true);
					}}
					onMouseLeave={() => setBackdropHover(false)}
					className="fixed inset-0 cursor-none bg-black/70 backdrop-blur-sm transition-opacity duration-500 ease-out data-closed:opacity-0"
				/>

				{open && backdropHover && !showCloseConfirm && (
					<span
						aria-hidden
						className="pointer-events-none fixed z-[101] rounded-full bg-[#2c2c2c] px-5 py-2.5 text-sm font-medium text-white"
						style={{
							left: cursor.x,
							top: cursor.y,
							transform: 'translate(-50%, -50%)',
						}}
					>
						{t('contactDrawer.close')}
					</span>
				)}

				<DialogPanel
					transition
					className="fixed inset-y-0 right-0 z-10 flex h-full w-full max-w-md sm:max-w-lg"
				>
					<motion.div
						variants={panelVariants}
						initial="initial"
						animate={open ? 'animate' : 'exit'}
						style={{ transformOrigin: '100% 100%' }}
						className="flex h-full w-full flex-col overflow-hidden bg-[#1a1a1a] shadow-2xl will-change-transform"
					>
					<div className="border-b border-white/5 px-6 pb-4 pt-6 sm:px-8 sm:pt-8">
						<DialogTitle className="text-balance text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
							{t('contactDrawer.title')}
						</DialogTitle>
					</div>

					<form
						onSubmit={handleSubmit}
						data-lenis-prevent
						className="flex flex-1 flex-col overflow-y-auto px-6 py-6 sm:px-8"
					>
						<div className="space-y-8">
							<div>
								<p className="text-xs font-medium text-neutral-500">{t('contactDrawer.selectType')}</p>
								<div className="mt-3 flex flex-wrap gap-2">
									<Pill active={engagementType === 'project'} onClick={() => setEngagementType('project')}>
										{t('contactDrawer.projectBased')}
									</Pill>
									<Pill active={engagementType === 'retainer'} onClick={() => setEngagementType('retainer')}>
										{t('contactDrawer.retainerModel')}
									</Pill>
								</div>
							</div>

							<div>
								<p className="text-xs font-medium text-neutral-500">{t('contactDrawer.personalInfo')}</p>
								<div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
									<input
										type="text"
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder={t('contactDrawer.namePlaceholder')}
										className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/20 focus:outline-none"
									/>
									<input
										type="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder={t('contactDrawer.emailPlaceholder')}
										className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/20 focus:outline-none"
									/>
								</div>
							</div>

							<div>
								<p className="text-xs font-medium text-neutral-500">{t('contactDrawer.whatWeBuild')}</p>
								<div className="mt-3 flex flex-wrap gap-2">
									{BUILD_OPTIONS.map((key) => (
										<Pill
											key={key}
											active={buildTypes.includes(key)}
											onClick={() => toggleBuildType(key)}
										>
											{t(`contactDrawer.buildOptions.${key}`)}
										</Pill>
									))}
								</div>
							</div>

							<div>
								<p className="text-xs font-medium text-neutral-500">{t('contactDrawer.budgetLabel')}</p>
								<div className="mt-3 flex flex-wrap gap-2">
									{BUDGET_OPTIONS.map((key) => (
										<Pill key={key} active={budget === key} onClick={() => setBudget(key)}>
											{t(`contactDrawer.budgetOptions.${key}`)}
										</Pill>
									))}
								</div>
							</div>

							<div>
								<p className="text-xs font-medium text-neutral-500">{t('contactDrawer.detailsLabel')}</p>
								<textarea
									required
									value={details}
									onChange={(e) => setDetails(e.target.value)}
									placeholder={t('contactDrawer.detailsPlaceholder')}
									rows={5}
									className="mt-3 w-full resize-none rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/20 focus:outline-none"
								/>
							</div>

							{status === 'success' && (
								<StatusMessage type="success" message={t('contact.form.success')} />
							)}
							{status === 'error' && (
								<StatusMessage type="error" message={t('contact.form.error')} />
							)}
						</div>

						<div className="mt-auto space-y-4 pt-8">
							<button
								type="submit"
								disabled={status === 'sending'}
								className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
							>
								{status === 'sending' ? t('contact.form.sending') : t('contactDrawer.submit')}
							</button>
							<p className="text-center text-xs text-neutral-500">{t('contactDrawer.privacy')}</p>
						</div>
					</form>
					</motion.div>
				</DialogPanel>

				{showCloseConfirm && (
					<div
						className="fixed z-[110]"
						style={{
							left: confirmAnchor.x,
							top: confirmAnchor.y,
							transform: 'translate(-50%, -50%)',
						}}
					>
						<motion.div
							{...confirmMotion}
							onClick={(e) => e.stopPropagation()}
							onMouseDown={(e) => e.stopPropagation()}
							className="w-[min(100vw-2rem,28rem)] rounded-[2rem] bg-[#1a1a1a] px-8 py-10 shadow-2xl"
						>
							<p className="text-center text-xl font-medium leading-snug text-white sm:text-2xl">
								{t('contactDrawer.confirmClose.title')}
							</p>
							<div className="mt-10 flex gap-3">
								<button
									type="button"
									onClick={forceClose}
									className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#2c2c2c] px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#363636]"
								>
									<XMarkIcon className="size-4 shrink-0" />
									{t('contactDrawer.confirmClose.closeAnyway')}
								</button>
								<button
									type="button"
									onClick={dismissConfirm}
									className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#2c2c2c] px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#363636]"
								>
									<ArrowUpRightIcon className="size-4 shrink-0" />
									{t('contactDrawer.confirmClose.backToForm')}
								</button>
							</div>
						</motion.div>
					</div>
				)}
			</Dialog>
		</>
	);
}
