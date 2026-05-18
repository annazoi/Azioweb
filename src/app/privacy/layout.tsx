import type { Metadata } from 'next';
import common from '@/locales/en/common.json';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
	title: 'Privacy Policy',
	description: common.privacy.intro,
	path: '/privacy',
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
	return children;
}
