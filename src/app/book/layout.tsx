import type { Metadata } from 'next';
import common from '@/locales/en/common.json';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
	title: 'Book a Discovery Call',
	description: common.book.description,
	path: '/book',
});

export default function BookLayout({ children }: { children: React.ReactNode }) {
	return children;
}
