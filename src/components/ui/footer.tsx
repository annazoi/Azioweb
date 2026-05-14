'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const watermarkMask = {
	WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)',
	maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)',
};

const Footer = () => {
	const { t } = useTranslation();
	const year = new Date().getFullYear();
	const [time, setTime] = useState('');

	useEffect(() => {
		const tick = () => {
			setTime(
				new Date().toLocaleTimeString('en-GB', {
					hour: 'numeric',
					minute: '2-digit',
					hour12: true,
					timeZone: 'Europe/London',
				}),
			);
		};
		tick();
		const id = window.setInterval(tick, 30000);
		return () => window.clearInterval(id);
	}, []);

	return (
		<footer className="relative overflow-hidden bg-black">
			<div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">
				<div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:gap-12">
					<div className="max-w-xl shrink-0 lg:max-w-[min(100%,28rem)] lg:pr-8">
						<p className="text-sm font-medium text-neutral-400">
							<span aria-hidden>☀️ </span>
							{time} {t('footer.locationLabel')}
						</p>
						<h2 className="mt-6 text-balance text-2xl font-semibold leading-[1.2] tracking-tight text-white sm:text-3xl md:text-[1.85rem] md:leading-snug">
							{t('footer.headline')}
						</h2>
						<Link
							href="/book"
							className="mt-8 inline-flex items-center justify-center gap-1 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
						>
							<span className="text-base font-bold leading-none">+</span>
							{t('footer.getInTouch')}
						</Link>
					</div>

					<div className="flex flex-wrap gap-16 sm:gap-20 lg:mt-1 lg:shrink-0 lg:gap-24">
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">{t('footer.exploreHeading')}</p>
							<ul className="mt-5 flex flex-col gap-3.5 text-[15px] font-medium text-white">
								<li>
									<Link href="/" className="transition-opacity hover:opacity-80">
										{t('footer.linkHome')}
									</Link>
								</li>
								<li>
									<Link href="/#pricing" className="transition-opacity hover:opacity-80">
										{t('footer.linkPricing')}
									</Link>
								</li>
								<li>
									<Link href="/#process" className="transition-opacity hover:opacity-80">
										{t('footer.linkHowWeWork')}
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">{t('footer.socialsHeading')}</p>
							<ul className="mt-5 flex flex-col gap-3.5 text-[15px] font-medium text-white">
								<li>
									<a
										href="https://www.behance.net"
										target="_blank"
										rel="noopener noreferrer"
										className="transition-opacity hover:opacity-80"
									>
										{t('footer.linkBehance')}
									</a>
								</li>
								<li>
									<a
										href="https://www.linkedin.com/company/azioweb"
										target="_blank"
										rel="noopener noreferrer"
										className="transition-opacity hover:opacity-80"
									>
										{t('footer.linkLinkedIn')}
									</a>
								</li>
								<li>
									<a
										href="https://x.com/azioweb"
										target="_blank"
										rel="noopener noreferrer"
										className="transition-opacity hover:opacity-80"
									>
										{t('footer.linkX')}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-20 flex w-full flex-col gap-8 sm:mt-24 lg:mt-28 lg:flex-row lg:items-start lg:justify-between">
					<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
						{t('footer.copyrightCaps', { year })}
					</p>
					<div className="flex flex-col gap-3 self-end text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
						<a href="#" className="transition-colors hover:text-neutral-300">
							{t('footer.terms')}
						</a>
						<a href="#" className="transition-colors hover:text-neutral-300">
							{t('footer.privacy')}
						</a>
					</div>
				</div>
			</div>

			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden"
				style={{ height: 'min(52vh, 420px)' }}
				aria-hidden
			>
				<p
					className="absolute bottom-0 left-1/2 w-[max(100%,28rem)] -translate-x-1/2 translate-y-[38%] select-none text-center text-[clamp(4.5rem,20vw,14rem)] font-black uppercase leading-[0.85] tracking-[-0.04em]"
					style={{
						...watermarkMask,
						backgroundImage: 'linear-gradient(to bottom, rgba(80, 10, 10, 0.15) 0%, rgba(185, 28, 28, 0.55) 42%, rgb(249, 115, 22) 78%, rgb(234, 88, 12) 100%)',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						color: 'transparent',
					}}
				>
					{t('footer.watermark')}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
