import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogArticlePage from '@/components/blog/blog-article-page';
import common from '@/locales/en/common.json';
import { BLOG_SLUGS, isBlogSlug } from '@/lib/blog';

type PageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	if (!isBlogSlug(slug)) return { title: 'Article | Azioweb' };

	const article = common.blog.articles[slug];
	return {
		title: `${article.title} | Azioweb Blog`,
		description: article.metaDescription,
	};
}

export default async function ArticlePage({ params }: PageProps) {
	const { slug } = await params;
	if (!isBlogSlug(slug)) notFound();
	return <BlogArticlePage slug={slug} />;
}
