'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const Hero = () => {
	const { t } = useTranslation();
	const params = useParams<{ locale: string }>();
	const locale = params?.locale ?? 'en';
	const [timeLondon, setTimeLondon] = useState('');

	const monthName = useMemo(
		() =>
			new Date().toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-GB', {
				month: 'long',
			}),
		[locale],
	);

	useEffect(() => {
		const tick = () => {
			setTimeLondon(
				new Intl.DateTimeFormat(locale === 'el' ? 'el-GR' : 'en-GB', {
					hour: 'numeric',
					minute: '2-digit',
					hour12: true,
					timeZone: 'Europe/London',
				}).format(new Date()),
			);
		};
		tick();
		const id = window.setInterval(tick, 60_000);
		return () => window.clearInterval(id);
	}, [locale]);

	const navigation = [
		{ name: t('navbar.links.home'), href: `/${locale}/#hero` },
		{ name: t('navbar.links.services'), href: `/${locale}/#services` },
		{ name: t('navbar.links.process'), href: `/${locale}/#process` },
		{ name: t('navbar.links.work'), href: `/${locale}/#clients` },
		{ name: t('navbar.links.contact'), href: `/${locale}/#contact` },
	];

	return (
		<section
			className="relative flex min-h-[100dvh] flex-col bg-black px-4 pb-5 pt-5 text-white sm:px-6 sm:pb-6 sm:pt-6 lg:px-10 lg:pb-8 lg:pt-8"
			id="hero"
		>
			<div className="relative z-20 flex flex-col gap-4 sm:min-h-[44px] sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center justify-between gap-4">
					<Link href={`/${locale}`} className="flex shrink-0 items-center gap-2.5">
						<svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden className="shrink-0">
							<path
								d="M6 22V6L14 14L22 6V22"
								stroke="currentColor"
								strokeWidth="2.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span className="text-[15px] font-medium tracking-tight lowercase">azioweb</span>
					</Link>
					<Link
						href={`/${locale}/book`}
						className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-4 py-2.5 text-[13px] font-medium tracking-tight text-black transition-opacity hover:opacity-90 sm:hidden"
					>
						{t('hero.get_in_touch')}
					</Link>
				</div>

				<div className="flex justify-center sm:absolute sm:inset-x-0 sm:top-1/2 sm:-translate-y-1/2 sm:pointer-events-none">
					<div className="sm:pointer-events-auto">
						<Disclosure as="div" className="relative">
							<div className="inline-flex max-w-full items-center rounded-full bg-[#252525] px-1 py-1.5 pl-4 ring-1 ring-white/[0.06]">
								<DisclosureButton className="cursor-pointer shrink-0 rounded-full px-2 py-1 text-[13px] font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
									{t('hero.menu_label')}
								</DisclosureButton>
								<span className="mx-2.5 hidden h-4 w-px shrink-0 bg-white/15 sm:block" aria-hidden />
								<span className="truncate pr-3 text-[12px] text-zinc-500 sm:text-[13px]">
									{t('hero.slots', { month: monthName })}
								</span>
							</div>
							<DisclosurePanel className="absolute left-1/2 top-[calc(100%+10px)] z-30 w-[min(100vw-2rem,280px)] -translate-x-1/2 rounded-2xl border border-white/[0.08] bg-[#141414] p-2 shadow-2xl sm:left-1/2 sm:-translate-x-1/2">
								<div className="flex flex-col gap-0.5">
									{navigation.map((item) => (
										<DisclosureButton
											key={item.name}
											as={Link}
											href={item.href}
											className="cursor-pointer rounded-xl px-4 py-3 text-left text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
										>
											{item.name}
										</DisclosureButton>
									))}
								</div>
							</DisclosurePanel>
						</Disclosure>
					</div>
				</div>

				<div className="hidden shrink-0 sm:block">
					<Link
						href={`/${locale}/book`}
						className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-[13px] font-medium tracking-tight text-black transition-opacity hover:opacity-90"
					>
						{t('hero.get_in_touch')}
					</Link>
				</div>
			</div>

			<div className="relative z-20 flex min-h-0 flex-1 flex-col justify-center py-16 sm:py-20 lg:py-24">
				<div className="ml-0 w-full max-w-[22rem] text-left sm:ml-auto sm:max-w-lg lg:max-w-xl">
					<h1 className="text-[clamp(1.35rem,4.2vw,2.75rem)] font-medium leading-[1.35] tracking-[-0.02em] text-white">
						<span className="block">{t('hero.headline_line1')}</span>
						<span className="block">{t('hero.headline_line2')}</span>
						<span className="block">{t('hero.headline_line3')}</span>
					</h1>
				</div>
			</div>

			<div className="relative z-20 mt-auto flex flex-col gap-3 text-[11px] text-white/90 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:text-[12px]">
				<p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/80">
					<span>{t('hero.footer_tagline')}</span>
					<span className="text-white/40" aria-hidden>
						·
					</span>
					<span>
						{timeLondon} {t('hero.footer_location')}
					</span>
				</p>
				<a
					href="#services"
					className="inline-flex cursor-pointer items-center gap-2 text-white/80 transition-colors hover:text-white"
				>
					<span>{t('hero.scroll_hint')}</span>
					<ChevronDownIcon className="size-3.5 stroke-[2]" aria-hidden />
				</a>
			</div>

			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center overflow-hidden select-none"
				aria-hidden
			>
				<span
					className="translate-y-[22%] text-[clamp(2.75rem,19vw,30rem)] font-semibold leading-none tracking-[-0.04em] text-[#161514] sm:translate-y-[18%]"
				>
					{t('hero.watermark')}
				</span>
			</div>
		</section>
	);
};

export default Hero;
