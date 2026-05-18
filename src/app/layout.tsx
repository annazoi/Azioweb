import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import AdaptiveFaviconSync from '@/components/adaptive-favicon-sync';
import ContactDrawer from '@/components/ui/contact-drawer';
import SmoothScroll from '@/components/ui/smooth-scroll';
import JsonLd from '@/components/seo/json-ld';
import { buildGraph, organizationSchema, webSiteSchema } from '@/lib/seo';
import { absoluteUrl, siteConfig } from '@/lib/site';

const dmSans = DM_Sans({
	subsets: ['latin'],
	variable: '--font-dm-sans',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: 'Azioweb | AI-First Product Studio',
		template: '%s | Azioweb',
	},
	description:
		'Azioweb is an AI-focused product studio. We build web and mobile applications with production-ready AI integrations—copilots, automation, retrieval, and custom models tailored to your product.',
	keywords: [
		'AI software development',
		'AI integration',
		'LLM apps',
		'web development',
		'mobile apps',
		'Next.js',
		'React',
		'product studio',
	],
	alternates: {
		canonical: siteConfig.url,
	},
	openGraph: {
		type: 'website',
		locale: siteConfig.locale,
		url: siteConfig.url,
		siteName: siteConfig.name,
		title: 'Azioweb | AI-First Product Studio',
		description:
			'Azioweb is an AI-focused product studio. We build web and mobile applications with production-ready AI integrations.',
		images: [
			{
				url: absoluteUrl(siteConfig.defaultOgImage),
				width: 1200,
				height: 630,
				alt: 'Azioweb',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Azioweb | AI-First Product Studio',
		description:
			'Azioweb is an AI-focused product studio. We build web and mobile applications with production-ready AI integrations.',
		images: [absoluteUrl(siteConfig.defaultOgImage)],
	},
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', type: 'image/x-icon' },
			{
				url: '/favicon-light.png',
				type: 'image/png',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: '/favicon-dark.png',
				type: 'image/png',
				media: '(prefers-color-scheme: dark)',
			},
		],
		shortcut: ['/favicon.ico'],
		apple: [{ url: '/favicon-light.png', type: 'image/png' }],
	},
};

const siteJsonLd = buildGraph(organizationSchema(), webSiteSchema());

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${dmSans.className} ${dmSans.variable} antialiased selection:bg-primary/30 selection:text-white`}>
				<JsonLd data={siteJsonLd} />
				<AdaptiveFaviconSync />
				<SmoothScroll>
					<ContactDrawer />
					{children}
				</SmoothScroll>
			</body>
		</html>
	);
}
