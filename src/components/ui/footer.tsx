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
							<svg className='size-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3001 21.7706 18 21.8985" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7 4V2.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 4V2.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M21.5 9H16.625H10.75M2 9H5.875" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#000000"></path> <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#000000"></path> <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#000000"></path> <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#000000"></path> <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#000000"></path> <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#000000"></path> </g></svg>
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
