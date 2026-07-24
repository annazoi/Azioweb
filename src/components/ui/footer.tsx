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
			<div className="relative z-10 mx-auto flex h-auto min-h-0 flex-col px-4 pb-28 pt-16 sm:px-6 sm:pb-32 sm:pt-20 lg:h-170 lg:min-h-0 lg:px-8 lg:pb-16 lg:pt-24">
				<div className="flex flex-col gap-10 sm:gap-12 lg:flex-row lg:justify-between lg:gap-12">
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
							className="max-w-fit mt-8 inline-flex w-full items-center justify-center gap-1 rounded-[16px] bg-white px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:w-auto"
						>
							<svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
								<path
									d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3001 21.7706 18 21.8985"
									stroke="currentColor"
									strokeWidth={1.5}
									strokeLinecap="round"
								/>
								<path d="M7 4V2.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
								<path d="M17 4V2.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
								<path d="M21.5 9H16.625H10.75M2 9H5.875" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
								<path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="currentColor" />
								<path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="currentColor" />
								<path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="currentColor" />
								<path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="currentColor" />
								<path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="currentColor" />
								<path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="currentColor" />
							</svg>
							{t('footer.getInTouch')}
						</Link>
						<div className='mt-4'>
						<Link href="mailto:info@azioweb.com" className="mt-4 text-lg text-neutral-400 hover:text-white">info@azioweb.com</Link>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:gap-x-14 lg:mt-1 lg:flex lg:shrink-0 lg:gap-24">
						<div>
							<p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-neutral-500">{t('footer.exploreHeading')}</p>
							<ul className="mt-4 flex flex-col gap-4 text-[18px] font-medium text-white lg:gap-0.2">
								<li className='hover:translate-x-2 transition-all duration-500'>
									<Link href="/" className="transition-opacity hover:opacity-70 hover:translate-x-10">
										{t('footer.linkHome')}
									</Link>
								</li>
							
								<li className='hover:translate-x-2 transition-all duration-500'>
									<Link href="/#services" className="transition-opacity hover:opacity-70">
										{t('footer.linkHowWeWork')}
									</Link>
								</li>
								<li className='hover:translate-x-2 transition-all duration-500'>
									<Link href="/blog" className="transition-opacity hover:opacity-70">
										{t('footer.linkBlog')}
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-neutral-500">{t('footer.socialsHeading')}</p>
							<ul className="mt-4 flex flex-col text-[18px] font-medium text-white lg:gap-0.2 gap-4">
								<li className='hover:translate-x-2 transition-all duration-500 '>
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

				<div className="mt-auto flex w-full flex-col gap-6 pt-14 sm:gap-8 sm:pt-16 lg:mt-18 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:pt-0">
					<div className="min-w-0">
						<p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
							{t('footer.copyrightCaps', { year })}
						</p>
						<p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-500">{t('footer.copyrightLine2')}</p>
					</div>
					<div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 self-start text-[14px] font-semibold uppercase tracking-[0.14em] text-neutral-500 sm:gap-x-8 lg:flex-col lg:self-end lg:text-right">
						<Link href="/terms" className="transition-colors hover:text-neutral-300">
							{t('footer.terms')}
						</Link>
						<Link href="/privacy" className="transition-colors hover:text-neutral-300">
							{t('footer.privacy')}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
