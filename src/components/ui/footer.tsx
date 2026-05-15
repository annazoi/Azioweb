'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Footer = () => {
	const { t } = useTranslation();
	const params = useParams<{ locale: string }>();
	const locale = params?.locale ?? 'en';
	const year = new Date().getFullYear();
	const [timeLondon, setTimeLondon] = useState('');

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

	const base = `/${locale}`;

	return (
		<footer className="relative overflow-hidden bg-black px-4 pt-16 pb-28 text-white sm:px-6 md:pt-24 md:pb-36 lg:px-10">
			<div className="relative z-10 mx-auto max-w-7xl">
				<div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-16">
					<div className="flex max-w-xl flex-col gap-8 lg:col-span-6">
						<div className="flex items-center gap-2.5 text-sm text-white/85">
							<span className="size-2 shrink-0 rounded-full bg-primary ring-2 ring-primary/40" aria-hidden />
							<span>
								{timeLondon} {t('footer.location_line')}
							</span>
						</div>
						<h2 className="text-[clamp(1.5rem,4vw,2.35rem)] font-medium leading-[1.25] tracking-[-0.02em] text-white">
							{t('footer.headline')}
						</h2>
						<Link
							href={`${base}/book`}
							className="inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium tracking-tight text-black transition-opacity hover:opacity-90"
						>
							{t('hero.get_in_touch')}
						</Link>
					</div>

					<div className="flex flex-wrap gap-14 sm:gap-20 lg:col-span-5 lg:col-start-8 lg:justify-end">
						<div className="flex min-w-[8rem] flex-col gap-4">
							<p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--secondary-foreground)]">
								{t('footer.explore_label')}
							</p>
							<nav className="flex flex-col gap-3 text-sm text-white/95">
								<Link href={base} className="w-fit transition-colors hover:text-primary">
									{t('footer.link_home')}
								</Link>
								<Link href={`${base}#pricing`} className="w-fit transition-colors hover:text-primary">
									{t('footer.link_pricing')}
								</Link>
								<Link href={`${base}#process`} className="w-fit transition-colors hover:text-primary">
									{t('footer.link_how')}
								</Link>
							</nav>
						</div>
						<div className="flex min-w-[8rem] flex-col gap-4">
							<p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--secondary-foreground)]">
								{t('footer.socials_label')}
							</p>
							<nav className="flex flex-col gap-3 text-sm text-white/95">
								<a
									href="https://www.behance.net"
									target="_blank"
									rel="noopener noreferrer"
									className="w-fit transition-colors hover:text-primary"
								>
									{t('footer.link_behance')}
								</a>
								<a
									href="https://www.linkedin.com/company/azioweb"
									target="_blank"
									rel="noopener noreferrer"
									className="w-fit transition-colors hover:text-primary"
								>
									{t('footer.link_linkedin')}
								</a>
								<a
									href="https://x.com/azioweb"
									target="_blank"
									rel="noopener noreferrer"
									className="w-fit transition-colors hover:text-primary"
								>
									{t('footer.link_x')}
								</a>
							</nav>
						</div>
					</div>
				</div>

				<div className="mt-20 flex flex-col gap-6 border-t border-white/[0.06] pt-10 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--secondary-foreground)] sm:mt-24 sm:flex-row sm:items-end sm:justify-between md:mt-28 md:pt-12">
					<p className="max-w-md text-white/50">{t('footer.copyright_caps', { year })}</p>
					<div className="flex flex-col gap-3 sm:items-end">
						<Link href={`${base}#contact`} className="w-fit text-white/50 transition-colors hover:text-primary">
							{t('footer.legal_terms')}
						</Link>
						<Link href={`${base}#contact`} className="w-fit text-white/50 transition-colors hover:text-primary">
							{t('footer.legal_privacy')}
						</Link>
					</div>
				</div>
			</div>

			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden select-none"
				aria-hidden
			>
				<span className="translate-y-[24%] bg-gradient-to-b from-primary via-[#818cf8] to-accent bg-clip-text text-[clamp(3.25rem,17vw,11rem)] font-semibold leading-none tracking-[-0.04em] text-transparent sm:translate-y-[20%]">
					{t('hero.watermark')}
				</span>
			</div>
		</footer>
	);
};

export default Footer;
