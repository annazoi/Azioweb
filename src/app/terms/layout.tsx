import type { Metadata } from 'next';
import common from '@/locales/en/common.json';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
	title: 'Terms of Service',
	description: common.terms.intro,
	path: '/terms',
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
	return children;
}
