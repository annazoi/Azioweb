'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useLocalTime } from '@/hooks/use-local-time';
import InfinityOrbsAnimation from '@/components/ui/infinity-orbs-animation';

const watermarkMask = {
	WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)',
	maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)',
};

const Footer = () => {
	const { t } = useTranslation();
	const year = new Date().getFullYear();
	const { time, hour, theme } = useLocalTime('Europe/Athens');

	return (
		<footer className="relative overflow-hidden bg-black">
			<div className="relative z-10 mx-auto px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24 h-170">
				<div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:gap-12">
					<div className="max-w-xl shrink-0 lg:max-w-[min(100%,28rem)] lg:pr-8">
						<p className="flex items-center gap-1.5 text-sm font-medium text-neutral-400">
							<InfinityOrbsAnimation theme={theme} hour={hour} />
							<span>
								{time} {t('footer.locationLabel')}
							</span>
						</p>
						<h2 className="mt-6 text-balance text-2xl font-semibold leading-[1] tracking-tight text-white sm:text-3xl md:text-[24px] md:leading-snug">
							{t('footer.headline')}
						</h2>
						<Link
							href="/book"
							className="mt-8 inline-flex items-center justify-center gap-1 rounded-[16px] bg-white px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
						>
							<span className="text-base font-bold leading-none">+</span>
							{t('footer.getInTouch')}
						</Link>
					</div>

					<div className="flex flex-wrap gap-16 sm:gap-20 lg:mt-1 lg:shrink-0 lg:gap-24">
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">{t('footer.exploreHeading')}</p>
							<ul className="mt-4 flex flex-col gap-0.2 text-[15px] font-medium text-white">
								<li className='hover:translate-x-2 transition-all duration-500'>
									<Link href="/" className="transition-opacity hover:opacity-70 hover:translate-x-10">
										{t('footer.linkHome')}
									</Link>
								</li>
							
								<li className='hover:translate-x-2 transition-all duration-500'>
									<Link href="/#process" className="transition-opacity hover:opacity-70">
										{t('footer.linkHowWeWork')}
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">{t('footer.socialsHeading')}</p>
							<ul className="mt-4 flex flex-col text-[15px] font-medium text-white">
								<li className='hover:translate-x-2 transition-all duration-500'>
									<a
										href="https://www.linkedin.com/company/azioweb"
										target="_blank"
										rel="noopener noreferrer"
										className="transition-opacity hover:opacity-70"
									>
										{t('footer.linkLinkedIn')}
									</a>
								</li>
								<li className='hover:translate-x-2 transition-all duration-500'>
									<a
										href="https://x.com/azioweb"
										target="_blank"
										rel="noopener noreferrer"
										className="transition-opacity hover:opacity-70"
									>
										{t('footer.linkX')}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-20 flex w-full flex-col gap-8 sm:mt-24 lg:mt-28 lg:flex-row lg:items-start lg:justify-between">
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
							{t('footer.copyrightCaps', { year })}
						</p>
						<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">{t('footer.copyrightLine2')}</p>
					</div>
					<div className="flex flex-col self-end text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
						<Link href="/terms" className="transition-colors hover:text-neutral-300">
							{t('footer.terms')}
						</Link>
						<Link href="/privacy" className="transition-colors hover:text-neutral-300">
							{t('footer.privacy')}
						</Link>
					</div>
				</div>
			</div>

			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden"
				style={{ height: 'min(52vh, 420px)' }}
				aria-hidden
			>
				<p
					className="text-gradient-watermark absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[22%] select-none text-center text-[clamp(4.5rem,24vw,30rem)] font-black uppercase leading-[0.85] tracking-[-0.04em]"
					style={{
						...watermarkMask,
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
