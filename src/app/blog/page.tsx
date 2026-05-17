import type { Metadata } from 'next';
import BlogPage from '@/components/blog/blog-page';
import common from '@/locales/en/common.json';

export const metadata: Metadata = {
	title: `Blog | Azioweb`,
	description: common.blog.description,
};

export default function Page() {
	return <BlogPage />;
}
