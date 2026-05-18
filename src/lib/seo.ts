import type { Metadata } from 'next';
import common from '@/locales/en/common.json';
import { getBlogArticle, type BlogSlug } from '@/lib/blog';
import { SERVICE_CARD_IDS, type ServiceSlug } from '@/lib/services';
import { absoluteUrl, siteConfig } from '@/lib/site';

type PageMetadataOptions = {
	title: string;
	description: string;
	path: string;
	ogImage?: string;
	ogType?: 'website' | 'article';
	noIndex?: boolean;
	absoluteTitle?: boolean;
};

export function createPageMetadata({
	title,
	description,
	path,
	ogImage = siteConfig.defaultOgImage,
	ogType = 'website',
	noIndex = false,
	absoluteTitle = false,
}: PageMetadataOptions): Metadata {
	const url = absoluteUrl(path);
	const imageUrl = absoluteUrl(ogImage);

	return {
		title: absoluteTitle ? { absolute: title } : title,
		description,
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			url,
			siteName: siteConfig.name,
			locale: siteConfig.locale,
			type: ogType,
			images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [imageUrl],
		},
		...(noIndex ? { robots: { index: false, follow: false } } : {}),
	};
}

export function organizationSchema() {
	return {
		'@type': 'Organization',
		'@id': `${siteConfig.url}/#organization`,
		name: siteConfig.name,
		url: siteConfig.url,
		email: siteConfig.email,
		logo: {
			'@type': 'ImageObject',
			url: absoluteUrl('/img/azioweb.png'),
		},
		sameAs: siteConfig.sameAs,
	};
}

export function webSiteSchema() {
	return {
		'@type': 'WebSite',
		'@id': `${siteConfig.url}/#website`,
		url: siteConfig.url,
		name: siteConfig.name,
		publisher: { '@id': `${siteConfig.url}/#organization` },
		inLanguage: siteConfig.locale,
	};
}

export function webPageSchema(path: string, name: string, description: string) {
	return {
		'@type': 'WebPage',
		'@id': `${absoluteUrl(path)}#webpage`,
		url: absoluteUrl(path),
		name,
		description,
		isPartOf: { '@id': `${siteConfig.url}/#website` },
		about: { '@id': `${siteConfig.url}/#organization` },
		inLanguage: siteConfig.locale,
	};
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path),
		})),
	};
}

export function articleSchema(slug: BlogSlug) {
	const article = getBlogArticle(slug);
	const url = absoluteUrl(`/blog/${slug}`);

	return {
		'@type': 'Article',
		'@id': `${url}#article`,
		headline: article.title,
		description: article.metaDescription,
		image: absoluteUrl(article.image),
		datePublished: article.date,
		dateModified: article.date,
		inLanguage: siteConfig.locale,
		author: { '@id': `${siteConfig.url}/#organization` },
		publisher: { '@id': `${siteConfig.url}/#organization` },
		mainEntityOfPage: { '@id': `${url}#webpage` },
	};
}

export function serviceSchema(slug: ServiceSlug) {
	const data = common.servicePages.items[slug];
	const cardId = SERVICE_CARD_IDS[slug];
	const name = common.services.cards[cardId as keyof typeof common.services.cards].title;
	const url = absoluteUrl(`/services/${slug}`);

	return {
		'@type': 'Service',
		'@id': `${url}#service`,
		name,
		description: data.metaDescription,
		url,
		provider: { '@id': `${siteConfig.url}/#organization` },
		areaServed: 'Worldwide',
	};
}

export function blogListingSchema() {
	return {
		'@type': 'Blog',
		'@id': `${absoluteUrl('/blog')}#blog`,
		url: absoluteUrl('/blog'),
		name: `Blog | ${siteConfig.name}`,
		description: common.blog.description,
		publisher: { '@id': `${siteConfig.url}/#organization` },
		inLanguage: siteConfig.locale,
	};
}

export function buildGraph(...nodes: Record<string, unknown>[]) {
	return {
		'@context': 'https://schema.org',
		'@graph': nodes,
	};
}
