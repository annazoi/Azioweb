import type { Metadata } from 'next';
import BlogPage from '@/components/blog/blog-page';
import JsonLd from '@/components/seo/json-ld';
import common from '@/locales/en/common.json';
import { blogListingSchema, buildGraph, createPageMetadata } from '@/lib/seo';

const title = 'Blog';
const description = common.blog.description;

export const metadata: Metadata = createPageMetadata({
	title,
	description,
	path: '/blog',
});

const blogJsonLd = buildGraph(blogListingSchema());

export default function Page() {
	return (
		<>
			<JsonLd data={blogJsonLd} />
			<BlogPage />
		</>
	);
}
