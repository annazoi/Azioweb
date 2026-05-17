'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import common from '@/locales/en/common.json';
import { useLegalSectionNav } from '@/hooks/use-legal-section-nav';

function sectionId(index: number) {
	return `privacy-section-${index}`;
}

export default function PrivacyPage() {
	const { t } = useTranslation();
	const sections = common.privacy.sections;
	const { activeIndex, scrollToSection } = useLegalSectionNav('privacy-section', sections.length);

	return (
		<div className="min-h-screen bg-black text-white">
			<Navbar />

			<header className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
				<h1
					className="max-w-3xl font-semibold tracking-tight text-white"
					style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
				>
					{t('privacy.title')}
				</h1>
				<p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">{t('privacy.intro')}</p>
				<p className="mt-4 text-sm text-neutral-500">{t('privacy.lastUpdated')}</p>
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
						<h2 className="text-2xl font-semibold tracking-tight text-white md:text-[1.75rem]">{t('privacy.brandName')}</h2>

						<div className="mt-12 flex flex-col gap-16 md:mt-14 md:gap-20">
							{sections.map((section, index) => (
								<section key={section.title} id={sectionId(index)} className="scroll-mt-32">
									<h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{section.title}</h3>
									<p className="mt-5 text-[15px] leading-[1.7] text-neutral-400 md:text-base">{section.body}</p>
								</section>
							))}
						</div>

						<p className="mt-20 text-[15px] leading-relaxed text-neutral-500">
							{t('privacy.contactPrefix')}{' '}
							<Link href="/book" className="text-neutral-300 underline-offset-4 transition-colors hover:text-white hover:underline">
								{t('privacy.contactLink')}
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
