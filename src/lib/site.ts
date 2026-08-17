export const siteConfig = {
	name: 'Azioweb',
	url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://azioweb.com').replace(/\/$/, ''),
	defaultOgImage: '/img/azioweb.jpg',
	locale: 'en',
	email: 'info@azioweb.com',
	sameAs: [
		'https://www.linkedin.com/company/azioweb',
		'https://x.com/azioweb',
	],
} as const;s

export function absoluteUrl(path: string): string {
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return `${siteConfig.url}${normalized}`;
}
