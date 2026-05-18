import type { MetadataRoute } from 'next';
import common from '@/locales/en/common.json';
import { BLOG_SLUGS } from '@/lib/blog';
import { SERVICE_SLUGS } from '@/lib/services';
import { absoluteUrl, siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: siteConfig.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
		{ url: absoluteUrl('/blog'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
		{ url: absoluteUrl('/book'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
		{ url: absoluteUrl('/privacy'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
		{ url: absoluteUrl('/terms'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
	];

	const blogRoutes: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
		url: absoluteUrl(`/blog/${slug}`),
		lastModified: new Date(common.blog.articles[slug].date),
		changeFrequency: 'monthly',
		priority: 0.7,
	}));

	const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
		url: absoluteUrl(`/services/${slug}`),
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.8,
	}));

	return [...staticRoutes, ...blogRoutes, ...serviceRoutes];
}
