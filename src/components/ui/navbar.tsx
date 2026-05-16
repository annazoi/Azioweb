'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLenis } from 'lenis/react';
import { useTranslation } from 'react-i18next';
import NavbarMenuHover from '@/components/ui/navbar-menu-hover';

function classNames(...classes: (string | false | null | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}

const NAVBAR_HEIGHT = 72;

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [onLight, setOnLight] = useState(false);
	const lenis = useLenis();
	const { t } = useTranslation();
	const navigation = [
		{ name: t('navbar.links.home'), href: '/#hero', current: true },
		{ name: t('navbar.links.services'), href: '/#services', current: false },
		{ name: t('navbar.links.process'), href: '/#process', current: false },
		{ name: t('navbar.links.work'), href: '/#clients', current: false },
		{ name: t('navbar.links.contact'), href: '#', current: false, action: 'open-contact-drawer' as const },
	];

	const hoverMenuItems = useMemo(
		() => [
			{ name: t('navbar.links.home'), href: '/#hero', image: '/img/azioweb.jpg' },
			{ name: t('navbar.links.services'), href: '/#services', image: '/img/pc.jpg' },
			{ name: t('navbar.links.process'), href: '/#process', image: '/img/pc.jpg' },
			{ name: t('navbar.links.work'), href: '/#clients', image: '/img/azioweb.jpg' },
			{ name: t('navbar.links.contact'), href: '#', image: '/img/azioweb.jpg', action: 'open-contact-drawer' as const },
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
							<span className="text-base leading-none">+</span>
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
							+
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
				className="fixed inset-0 z-[60] flex h-screen w-full flex-col overflow-y-auto bg-[#0a0a0f] transition duration-300 ease-in-out data-closed:pointer-events-none data-closed:opacity-0"
			>
				<div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
					<Link href="/" className="flex items-center gap-2.5">
						<span className="size-2 rounded-full bg-white" aria-hidden />
						<span className="text-lg font-bold lowercase text-white">azioweb</span>
					</Link>
					<DisclosureButton className="rounded-full border border-white/15 p-2 text-white/90 hover:bg-white/5">
						<span className="sr-only">{t('navbar.closeMenu')}</span>
						<XMarkIcon aria-hidden className="size-6" />
					</DisclosureButton>
				</div>
				<div className="flex flex-1 flex-col gap-6 px-6 pb-8 pt-8">
					{navigation.map((item, index) =>
						'action' in item && item.action === 'open-contact-drawer' ? (
							<DisclosureButton
								key={item.name}
								type="button"
								onClick={() => window.dispatchEvent(new CustomEvent('open-contact-drawer'))}
								className="group flex items-center gap-6 text-left"
							>
								<span className="mt-1 text-[10px] font-black tracking-widest text-slate-600">0{index + 1}</span>
								<span className="text-3xl font-black tracking-tighter text-slate-500 transition-colors group-hover:text-white">
									{item.name}
								</span>
							</DisclosureButton>
						) : (
						<DisclosureButton key={item.name} as={Link} href={item.href} className="group flex items-center gap-6 text-left">
							<span className="mt-1 text-[10px] font-black tracking-widest text-slate-600">0{index + 1}</span>
							<span
								className={classNames(
									item.current ? 'text-white' : 'text-slate-500 group-hover:text-white',
									'text-3xl font-black tracking-tighter transition-colors',
								)}
							>
								{item.name}
							</span>
						</DisclosureButton>
						),
					)}
				</div>
				<div className="mt-auto flex flex-col gap-6 px-6 pb-12">
					<div className="flex flex-col gap-3">
						<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('navbar.cta.ready')}</span>
						<DisclosureButton
							as={Link}
							href="/book"
							className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#96a0ff] py-4 text-sm font-bold tracking-wide text-white transition-colors hover:bg-[#a6b0ff]"
						>
							{t('navbar.cta.getInTouch')}
							<EnvelopeIcon className="size-4" />
						</DisclosureButton>
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
							<a href="https://twitter.com/azioweb" target="_blank" rel="noreferrer" className="hover:text-white">
								Twitter
							</a>
							<a href="https://linkedin.com/company/azioweb" target="_blank" rel="noreferrer" className="hover:text-white">
								LinkedIn
							</a>
						</div>
						<div className="flex items-center gap-2 text-xs text-slate-500">
							<MapPinIcon className="size-3 shrink-0" />
							<span>{t('navbar.location')}</span>
						</div>
					</div>
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
