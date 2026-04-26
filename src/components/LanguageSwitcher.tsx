'use client';

import { i18nConfig } from '../../i18nConfig';
import { useRouter, usePathname, useParams } from 'next/navigation';

export default function LanguageSwitcher() {
	const params = useParams<{ locale: string }>();
	const currentLocale = params?.locale ?? i18nConfig.defaultLocale;
	const router = useRouter();
	const currentPathname = usePathname();

	const switchLocale = (newLocale: string) => {
		if (newLocale === currentLocale) return;

		// set cookie for next-i18n-router
		const days = 30;
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = '; expires=' + date.toUTCString();
		document.cookie = `${i18nConfig.localeCookie}=${newLocale};expires=${expires};path=/`;

		const pathWithoutLocale = currentPathname.replace(new RegExp(`^/(${i18nConfig.locales.join('|')})`), '');
		const normalizedPath = pathWithoutLocale || '/';
		router.push(`/${newLocale}${normalizedPath}`);

		router.refresh();
	};

	return (
		<div className="flex items-center gap-2 text-sm">
			<button
				type="button"
				onClick={() => switchLocale('en')}
				className={currentLocale === 'en' ? 'text-secondary font-semibold' : 'text-white'}
				aria-pressed={currentLocale === 'en'}
			>
				EN
			</button>
			<span className="text-white/60">|</span>
			<button
				type="button"
				onClick={() => switchLocale('el')}
				className={currentLocale === 'el' ? 'text-secondary font-semibold' : 'text-white'}
				aria-pressed={currentLocale === 'el'}
			>
				EL
			</button>
		</div>
	);
}
