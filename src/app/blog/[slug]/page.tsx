import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogArticlePage from '@/components/blog/blog-article-page';
import JsonLd from '@/components/seo/json-ld';
import common from '@/locales/en/common.json';
import { BLOG_SLUGS, isBlogSlug } from '@/lib/blog';
import {
	articleSchema,
	breadcrumbSchema,
	buildGraph,
	createPageMetadata,
	webPageSchema,
} from '@/lib/seo';

type PageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	if (!isBlogSlug(slug)) return { title: 'Article' };

	const article = common.blog.articles[slug];
	return createPageMetadata({
		title: article.title,
		description: article.metaDescription,
		path: `/blog/${slug}`,
		ogImage: article.image,
		ogType: 'article',
	});
}

export default async function ArticlePage({ params }: PageProps) {
	const { slug } = await params;
	if (!isBlogSlug(slug)) notFound();

	const article = common.blog.articles[slug];
	const articleJsonLd = buildGraph(
		webPageSchema(`/blog/${slug}`, article.title, article.metaDescription),
		articleSchema(slug),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Blog', path: '/blog' },
			{ name: article.title, path: `/blog/${slug}` },
		]),
	);

	return (
		<>
			<JsonLd data={articleJsonLd} />
			<BlogArticlePage slug={slug} />
		</>
	);
}
