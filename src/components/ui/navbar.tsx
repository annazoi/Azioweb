'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const navigation = [
	{ name: 'Home', href: '/#hero', current: true },
	{ name: 'Services', href: '/#services', current: false },
	{ name: 'Process', href: '/#process', current: false },
	{ name: 'Work', href: '/#clients', current: false },
	{ name: 'Contact', href: '/#contact', current: false },
];

function classNames(...classes: (string | false | null | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);

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
				<div className="relative flex h-16 items-center justify-between transition-all duration-500">
					<div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-none ring-1 ring-white/10">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
							<XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
						</DisclosureButton>
					</div>
					<div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
						<div className="flex shrink-0 items-center gap-4">
							<a
								href="/"
								className="hidden lg:block text-slate-400 hover:text-white transition-all duration-500"
							>
								<div className="flex items-center gap-2">
									<img alt="Azioweb" src="/logo-nav.png" className="h-10 w-auto" />
									<h2 className="text-xl font-bold">azioweb.com</h2>
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
					</div>
				</div>
			</div>

			<DisclosurePanel className="sm:hidden relative z-10 glass mx-4 rounded-3xl mt-2 overflow-hidden border border-white/10">
				<div className="space-y-1 px-4 pt-2 pb-6 border-t border-white/10 mt-2">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as="a"
							href={item.href}
							aria-current={item.current ? 'page' : undefined}
							className={classNames(
								item.current
									? 'bg-primary/20 text-primary-foreground border-primary/30'
									: 'text-slate-300 hover:bg-white/5 hover:text-white border-transparent',
								'block rounded-xl px-4 py-2 text-base font-medium transition-all border ring-1 ring-white/5',
							)}
						>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
