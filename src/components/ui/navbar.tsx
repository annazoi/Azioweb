'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';

function classNames(...classes: (string | false | null | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const { t } = useTranslation();
	const params = useParams<{ locale: string }>();
	const locale = params?.locale ?? 'en';
	const navigation = [
		{ name: t('navbar.links.home'), href: `/${locale}/#hero`, current: true },
		{ name: t('navbar.links.services'), href: `/${locale}/#services`, current: false },
		{ name: t('navbar.links.process'), href: `/${locale}/#process`, current: false },
		{ name: t('navbar.links.work'), href: `/${locale}/#clients`, current: false },
		{ name: t('navbar.links.contact'), href: `/${locale}/#contact`, current: false },
	];

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<Disclosure
			as="nav"
			className={classNames(
				'fixed top-0 w-full z-50 transition-all duration-500 py-4',
				scrolled ? 'backdrop-blur-xl shadow-2xl' : 'backdrop-blur-xl',
			)}
		>
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="relative flex h-10 sm:h-16 items-center justify-between transition-all duration-500">
					<a href={`/${locale}`} className="flex items-center gap-2">
						<img alt="Azioweb" src="/logo-nav.png" className="h-8 w-auto lg:hidden" />
						{/* <span className="text-xl font-bold text-white tracking-tight">azioweb</span> */}
					</a>
					<div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-none ring-1 ring-white/10">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">{t('navbar.openMenu')}</span>
							<Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
							<XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
						</DisclosureButton>
					</div>
					<div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
						<div className="flex shrink-0 items-center gap-4">
							<a
								href={`/${locale}`}
								className="hidden lg:block text-slate-400 hover:text-white transition-all duration-500"
							>
								<div className="flex items-center gap-2">
									<img alt="Azioweb" src="/logo-nav.png" className="h-10 w-auto" />
									<h2 className="text-xl font-bold uppercase">azioweb</h2>
								</div>
							</a>
						</div>
						<div className="hidden sm:ml-auto sm:block content-center">
							<div className="flex space-x-2 gap-8">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										aria-current={item.current ? 'page' : undefined}
										className={classNames(
											item.current
												? 'text-secondary font-bold'
												: 'text-slate-400 hover:text-white border-transparent',
											'transition-all duration-300',
										)}
									>
										{item.name}
									</a>
								))}
							</div>
						</div>
						<div className="hidden sm:flex sm:ml-6 items-center">
							<LanguageSwitcher />
						</div>
					</div>
				</div>
			</div>

			<DisclosurePanel
				transition
				className="sm:hidden fixed inset-0 z-[60] bg-[#0a0a0f] flex flex-col overflow-y-auto w-full h-screen transition-all duration-300 ease-in-out data-closed:opacity-0"
			>
				{/* Custom Top Header inside Menu */}
				<div className="flex items-center justify-between px-4 py-4 bg-[#14151a] shadow-2xl">
					<a href={`/${locale}`} className="flex items-center gap-2">
						<img alt="Azioweb" src="/logo-nav.png" className="h-8 w-auto" />
						{/* <span className="text-xl font-bold text-white tracking-tight">azioweb</span> */}
					</a>
					<DisclosureButton className="inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-none ring-1 ring-white/10">
						<span className="sr-only">{t('navbar.closeMenu')}</span>
						<XMarkIcon aria-hidden="true" className="size-6" />
					</DisclosureButton>
				</div>
				<div className="px-6 pt-4 flex justify-end">
					<LanguageSwitcher />
				</div>

				<div className="px-6 pt-8 pb-8 flex flex-col gap-6 flex-1">
					{navigation.map((item, index) => (
						<DisclosureButton key={item.name} as="a" href={item.href} className="flex items-center gap-6 group">
							<span className="text-[10px] font-black tracking-widest text-slate-600 mt-2">0{index + 1}</span>
							<span
								className={classNames(
									item.current ? 'text-white' : 'text-slate-500 group-hover:text-white',
									'text-4xl font-black transition-colors tracking-tighter',
								)}
							>
								{item.name}
							</span>
						</DisclosureButton>
					))}
				</div>

				<div className="px-6 pb-12 flex flex-col gap-6 mt-auto">
					<div className="flex flex-col gap-4">
						<span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
							{t('navbar.cta.ready')}
						</span>
						<div className="flex flex-col gap-3">
							<DisclosureButton
								as="a"
								href={`/${locale}/book`}
								className="w-full bg-[#96a0ff] text-white py-4 rounded-xl flex items-center justify-center font-bold text-sm tracking-wide hover:bg-[#a6b0ff] transition-colors"
							>
								{t('navbar.cta.getInTouch')}
								<EnvelopeIcon className="w-4 h-4 ml-2" />
							</DisclosureButton>
							{/* <button className="w-full bg-transparent cursor-pointer border border-white/5 text-white py-4 rounded-xl flex items-center justify-center font-bold text-sm tracking-wide hover:bg-white/5 transition-colors">
								View Showreel
							</button> */}
						</div>
					</div>

					<div className="flex flex-col gap-4 mt-2">
						<div className="flex gap-6 text-[10px] font-black tracking-widest text-slate-400 uppercase">
							<a
								href="https://twitter.com/azioweb"
								target="_blank"
								className="hover:text-white transition-colors"
							>
								Twitter
							</a>
							<a
								href="https://linkedin.com/company/azioweb"
								target="_blank"
								className="hover:text-white transition-colors"
							>
								LinkedIn
							</a>
							{/* <a
								href="https://instagram.com/azioweb"
								target="_blank"
								className="hover:text-white transition-colors"
							>
								Instagram
							</a> */}
						</div>
						<div className="flex gap-2 items-center text-xs text-slate-500/50">
							<MapPinIcon className="w-3 h-3" />
							<span>{t('navbar.location')}</span>
							<span>•</span>
							<span>10:24 EET</span>
						</div>
					</div>
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
