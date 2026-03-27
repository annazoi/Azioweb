'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const navigation = [
	{ name: 'Home', href: '#hero', current: true },
	{ name: 'Services', href: '#services', current: false },
	{ name: 'Agency', href: '#agency', current: false },
	{ name: 'Work', href: '#work', current: false },
	{ name: 'Pricing', href: '#pricing', current: false },
	{ name: 'Contact', href: '#contact', current: false },
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
				'sticky top-0 z-50 transition-all duration-500',
				scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 py-2' : 'bg-transparent py-4',
			)}
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
							<a href="/" className="hover:opacity-80 transition-opacity">
								<img alt="Azioweb" src="/logo-nav.png" className="h-10 w-auto" />
							</a>
							<a
								href="mailto:hello@azioweb.com"
								className="hidden lg:block text-slate-400 hover:text-white transition-colors text-sm font-medium"
							>
								<span>hello@azioweb.com</span>
							</a>
						</div>
						<div className="hidden sm:ml-auto sm:block">
							<div className="flex space-x-2">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										aria-current={item.current ? 'page' : undefined}
										className={classNames(
											item.current
												? 'bg-primary/20 text-primary-foreground border-primary/30'
												: 'text-slate-300 hover:bg-white/5 hover:text-white border-transparent',
											'rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 border ring-1 ring-white/5',
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

			<DisclosurePanel className="sm:hidden glass mx-4 rounded-3xl mt-2 overflow-hidden border border-white/10">
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
