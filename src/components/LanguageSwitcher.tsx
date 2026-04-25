'use client';

import { i18nConfig } from '../../i18nConfig';
import { useRouter, usePathname, useParams } from 'next/navigation';

export default function LanguageSwitcher() {
	const params = useParams<{ locale: string }>();
	const currentLocale = params?.locale ?? i18nConfig.defaultLocale;
	const router = useRouter();
	const currentPathname = usePathname();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newLocale = e.target.value;

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
		<select
			onChange={handleChange}
			value={currentLocale}
			className="bg-transparent text-white border border-gray-600 rounded-md px-2 py-1 text-sm outline-none focus:border-secondary transition-colors"
		>
			<option value="en" className="text-black">
				EN
			</option>
			<option value="el" className="text-black">
				EL
			</option>
		</select>
	);
}
