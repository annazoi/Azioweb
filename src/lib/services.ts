export const SERVICE_SLUGS = [
	'web-app-development',
	'ai-automation',
	'ux-ui-design',
	'performance-seo',
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const SERVICE_CARD_IDS: Record<ServiceSlug, string> = {
	'web-app-development': 'uxui',
	'ai-automation': 'nocode',
	'ux-ui-design': 'corporate',
	'performance-seo': 'threeD',
};

export const CARD_ID_TO_SLUG: Record<string, ServiceSlug> = {
	uxui: 'web-app-development',
	nocode: 'ai-automation',
	corporate: 'ux-ui-design',
	threeD: 'performance-seo',
};

export function isServiceSlug(slug: string): slug is ServiceSlug {
	return SERVICE_SLUGS.includes(slug as ServiceSlug);
}

export function getServiceHref(cardId: string): string {
	const slug = CARD_ID_TO_SLUG[cardId];
	return slug ? `/services/${slug}` : '/book';
}
