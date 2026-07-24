'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLenis } from 'lenis/react';
import { useTranslation } from 'react-i18next';
import NavbarMenuHover from '@/components/ui/navbar-menu-hover';

function classNames(...classes: (string | false | null | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}

function CalendarIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
			<path
				d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3001 21.7706 18 21.8985"
				stroke="currentColor"
				strokeWidth={1.5}
				strokeLinecap="round"
			/>
			<path d="M7 4V2.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
			<path d="M17 4V2.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
			<path d="M21.5 9H16.625H10.75M2 9H5.875" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
			<path
				d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
				fill="currentColor"
			/>
			<path
				d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
				fill="currentColor"
			/>
			<path
				d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
				fill="currentColor"
			/>
			<path
				d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
				fill="currentColor"
			/>
			<path
				d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
				fill="currentColor"
			/>
			<path
				d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
				fill="currentColor"
			/>
		</svg>
	);
}

const NAVBAR_HEIGHT = 72;

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [onLight, setOnLight] = useState(false);
	const lenis = useLenis();
	const { t } = useTranslation();

	const hoverMenuItems = useMemo(
		() => [
			{ name: t('navbar.links.home'), href: '/#hero', image: '/favicon_io/android-chrome-512x512.png' },
			{ name: t('navbar.links.services'), href: '/#services', image: '/favicon_io/android-chrome-512x512.png' },
			// { name: t('navbar.links.process'), href: '/#process', image: '/favicon_io/android-chrome-512x512.png' },
			{ name: t('navbar.links.work'), href: '/#clients', image: '/favicon_io/android-chrome-512x512.png' },
			{ name: t('navbar.links.blog'), href: '/blog', image: '/favicon_io/android-chrome-512x512.png' },
			{
				name: t('navbar.links.contact'),
				href: '#',
				image: '/favicon_io/android-chrome-512x512.png',
				action: 'open-contact-drawer' as const,
			},
		],
		[t],
	);

	const updateNavbarTheme = useCallback(() => {
		const scrollY = lenis?.scroll ?? window.scrollY;
		setScrolled(scrollY > 20);
		const lightSection = document.querySelector('[data-navbar-light]');
		if (!lightSection) {
			setOnLight(false);
			return;
		}
		const rect = lightSection.getBoundingClientRect();
		setOnLight(rect.top < NAVBAR_HEIGHT && rect.bottom > 0);
	}, [lenis]);

	useEffect(() => {
		updateNavbarTheme();
		window.addEventListener('resize', updateNavbarTheme, { passive: true });
		return () => window.removeEventListener('resize', updateNavbarTheme);
	}, [updateNavbarTheme]);

	useEffect(() => {
		if (!lenis) {
			const onScroll = () => updateNavbarTheme();
			window.addEventListener('scroll', onScroll, { passive: true });
			return () => window.removeEventListener('scroll', onScroll);
		}
		lenis.on('scroll', updateNavbarTheme);
		return () => lenis.off('scroll', updateNavbarTheme);
	}, [lenis, updateNavbarTheme]);

	return (
		<Disclosure
			as="nav"
			className={classNames(
				'fixed top-0 z-50 w-full overflow-visible transition-all duration-500',
				scrolled ? 'bg-transparent py-3' : 'bg-transparent py-4 sm:py-5',
			)}
		>
			<div className="relative z-10 mx-auto overflow-visible px-4 sm:px-6 lg:px-8">
				<div className="relative flex h-11 items-center justify-between overflow-visible sm:h-12">
					<Link href="/" className="flex shrink-0 items-center gap-2.5">
						<Image
							src={onLight ? '/img/azioweb_black.png' : '/img/azioweb.png'}
							alt="azioweb"
							width={32}
							height={32}
						/>
						<span
							className={classNames(
								'text-lg font-bold lowercase tracking-tight sm:text-xl transition-colors duration-300',
								onLight ? 'text-black' : 'text-white',
							)}
						>
							azioweb
						</span>
					</Link>

					<NavbarMenuHover items={hoverMenuItems} />

					<div className="flex shrink-0 items-center gap-2 sm:gap-3">
						<Link
							href="/book"
							className={classNames(
								'hidden items-center gap-1 rounded-[16px] px-4 py-3 text-sm font-semibold transition-colors duration-300 sm:inline-flex',
								onLight ? 'bg-black text-white' : 'bg-white text-black',
							)}
						>
							<CalendarIcon className="size-5 shrink-0" />
							{t('navbar.cta.getInTouch')}
						</Link>
						<Link
							href="/book"
							className={classNames(
								'inline-flex size-10 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 sm:hidden',
								onLight ? 'bg-black text-white' : 'bg-white text-black',
							)}
							aria-label={t('navbar.cta.getInTouch')}
						>
							<CalendarIcon className="size-5 shrink-0" />
						</Link>
						<DisclosureButton
							className={classNames(
								'inline-flex items-center justify-center rounded-full border p-2.5 transition-colors duration-300 sm:hidden',
								onLight
									? 'border-black/15 bg-black/5 text-black/90 hover:bg-black/10'
									: 'border-white/15 bg-white/5 text-white/90 hover:bg-white/10',
							)}
						>
							<span className="sr-only">{t('navbar.openMenu')}</span>
							<Bars3Icon aria-hidden className="size-5" />
						</DisclosureButton>
					</div>
				</div>
			</div>

			<DisclosurePanel
				transition
				data-lenis-prevent
				className="fixed inset-0 z-[60] flex h-dvh w-full flex-col overflow-hidden bg-black transition duration-300 ease-out data-closed:pointer-events-none data-closed:opacity-0 data-closed:translate-y-2 sm:hidden"
			>
				<div className="flex shrink-0 items-center justify-between px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
					<Link href="/" className="flex items-center gap-2.5">
						<Image src="/img/azioweb.png" alt="azioweb" width={32} height={32} />
						<span className="text-lg font-bold lowercase tracking-tight text-white">azioweb</span>
					</Link>
					<DisclosureButton className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10">
						<span className="sr-only">{t('navbar.closeMenu')}</span>
						<XMarkIcon aria-hidden className="size-5" />
					</DisclosureButton>
				</div>

				<nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4">
					<ul className="mt-2 overflow-hidden rounded-[16px] border border-white/10 bg-[#1a1a1a]/80 backdrop-blur-xl">
						{hoverMenuItems.map((item, index) => {
							const rowClass =
								'group flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors active:bg-white/[0.06]';
							const rowContent = (
								<>
									<span className="text-[18px] font-semibold tracking-tight text-white">{item.name}</span>
									<span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-white p-1.5">
										<Image src={item.image} alt="" fill className="object-contain p-1.5" sizes="44px" />
									</span>
								</>
							);

							return (
								<li
									key={item.name}
									className={classNames(index < hoverMenuItems.length - 1 && 'border-b border-white/8')}
								>
									{'action' in item && item.action === 'open-contact-drawer' ? (
										<DisclosureButton
											type="button"
											onClick={() => window.dispatchEvent(new CustomEvent('open-contact-drawer'))}
											className={rowClass}
										>
											{rowContent}
										</DisclosureButton>
									) : (
										<DisclosureButton as={Link} href={item.href} className={rowClass}>
											{rowContent}
										</DisclosureButton>
									)}
								</li>
							);
						})}
					</ul>

					<div className="mt-auto flex flex-col gap-5 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
						<div>
							<p className="text-[18px] font-medium uppercase tracking-[0.14em] text-white/35">{t('navbar.cta.ready')}</p>
							<DisclosureButton
								as={Link}
								href="/book"
								className="mt-3 flex w-full items-center justify-center gap-2 rounded-[16px] bg-white py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
							>
								<CalendarIcon className="size-5 shrink-0" />
								{t('navbar.cta.getInTouch')}
							</DisclosureButton>
						</div>

						<div className="flex items-end justify-between gap-4 border-t border-white/10 pt-5">
							<div>
								<p className="text-[18px] font-medium uppercase tracking-[0.14em] text-white/35">{t('navbar.socialLabel')}</p>
								<div className="mt-2.5 flex gap-5">
									<a
										href="https://twitter.com/azioweb"
										target="_blank"
										rel="noreferrer"
										className="text-[18px] font-medium text-white/75 transition-colors hover:text-white"
									>
										Twitter
									</a>
									<a
										href="https://linkedin.com/company/azioweb"
										target="_blank"
										rel="noreferrer"
										className="text-[18px] font-medium text-white/75 transition-colors hover:text-white"
									>
										LinkedIn
									</a>
								</div>
							</div>
							<p className="text-right text-xs text-white/40">{t('navbar.location')}</p>
						</div>
					</div>
				</nav>
			</DisclosurePanel>
		</Disclosure>
	);
}
