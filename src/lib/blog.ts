import common from '@/locales/en/common.json';

export const BLOG_SLUGS = [
	'ai-in-production',
	'designing-for-trust',
	'shipping-mvps-faster',
	'performance-as-product',
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

export type BlogArticle = (typeof common.blog.articles)[BlogSlug];

export function isBlogSlug(slug: string): slug is BlogSlug {
	return BLOG_SLUGS.includes(slug as BlogSlug);
}

export function getBlogArticle(slug: BlogSlug): BlogArticle {
	return common.blog.articles[slug];
}

export function getOrderedBlogSlugs(): BlogSlug[] {
	return [...BLOG_SLUGS].sort((a, b) => {
		const dateA = common.blog.articles[a].date;
		const dateB = common.blog.articles[b].date;
		return dateB.localeCompare(dateA);
	});
}
