'use client';

import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import common from '@/locales/en/common.json';

function sectionId(index: number) {
	return `terms-section-${index}`;
}

export default function TermsPage() {
	const { t } = useTranslation();
	const lenis = useLenis();
	const sections = common.terms.sections;
	const [activeIndex, setActiveIndex] = useState(0);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const scrollLockRef = useRef(false);

	const scrollToSection = useCallback(
		(index: number) => {
			const el = document.getElementById(sectionId(index));
			if (!el) return;

			scrollLockRef.current = true;
			setActiveIndex(index);

			const unlock = () => {
				scrollLockRef.current = false;
			};

			if (lenis) {
				lenis.scrollTo(el, { offset: -120, duration: 1.1, onComplete: unlock });
				return;
			}

			const top = el.getBoundingClientRect().top + window.scrollY - 120;
			window.scrollTo({ top, behavior: 'smooth' });
			window.setTimeout(unlock, 900);
		},
		[lenis],
	);

	useEffect(() => {
		const elements = sections.map((_, index) => document.getElementById(sectionId(index))).filter(Boolean) as HTMLElement[];

		observerRef.current?.disconnect();
		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (scrollLockRef.current) return;
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible.length === 0) return;
				const id = visible[0].target.id;
				const index = Number(id.replace('terms-section-', ''));
				if (!Number.isNaN(index)) setActiveIndex(index);
			},
			{ rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
		);

		elements.forEach((el) => observerRef.current?.observe(el));
		return () => observerRef.current?.disconnect();
	}, [sections]);

	return (
		<div className="min-h-screen bg-black text-white">
			<Navbar />

			<header className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
				<h1
					className="max-w-3xl font-semibold tracking-tight text-white"
					style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
				>
					{t('terms.title')}
				</h1>
				<p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">{t('terms.intro')}</p>
				<p className="mt-4 text-sm text-neutral-500">{t('terms.lastUpdated')}</p>
			</header>

			<div className="relative z-10 rounded-t-[2rem] bg-[#0a0a0c] md:rounded-t-[2.5rem]">
				<div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-14 md:px-10 md:py-20 lg:flex-row lg:gap-20">
					<aside className="lg:w-[min(100%,17rem)] lg:shrink-0">
						<nav className="lg:sticky lg:top-28">
							<ul className="flex flex-col gap-3">
								{sections.map((section, index) => (
									<li key={section.title}>
										<button
											type="button"
											onClick={() => scrollToSection(index)}
											className={`w-full text-left text-[13px] font-medium leading-snug transition-colors ${
												activeIndex === index ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
											}`}
										>
											{section.title}
										</button>
									</li>
								))}
							</ul>
						</nav>
					</aside>

					<div className="min-w-0 flex-1">
						<h2 className="text-2xl font-semibold tracking-tight text-white md:text-[1.75rem]">{t('terms.brandName')}</h2>

						<div className="mt-12 flex flex-col gap-16 md:mt-14 md:gap-20">
							{sections.map((section, index) => (
								<section key={section.title} id={sectionId(index)} className="scroll-mt-32">
									<h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{section.title}</h3>
									<p className="mt-5 text-[15px] leading-[1.7] text-neutral-400 md:text-base">{section.body}</p>
								</section>
							))}
						</div>

						<p className="mt-20 text-[15px] leading-relaxed text-neutral-500">
							{t('terms.contactPrefix')}{' '}
							<Link href="/book" className="text-neutral-300 underline-offset-4 transition-colors hover:text-white hover:underline">
								{t('terms.contactLink')}
							</Link>
							.
						</p>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
