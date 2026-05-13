import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_Mono, Inter } from 'next/font/google';
import '../globals.css';
import { i18nConfig } from '../../../i18nConfig';
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { notFound } from 'next/navigation';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

const notoSansMono = Noto_Sans_Mono({
	variable: '--font-noto-sans-mono',
	subsets: ['latin'],
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const languageAlternates = Object.fromEntries(i18nConfig.locales.map((lng) => [lng, `/${lng}`]));

	return {
		title: 'Azioweb | Book a Call',
		description:
			'Book a call with Azioweb—an AI-focused product studio. Discuss web and mobile roadmaps with practical AI integrations, from first prototype to scalable production releases.',
		keywords:
			'book a call, AI product development, AI integration, LLM consulting, web development, mobile apps, Next.js, React',
		icons: {
			icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
			shortcut: ['/favicon.ico'],
			apple: [{ url: '/favicon.ico' }],
		},
		alternates: {
			canonical: `/${locale}`,
			languages: languageAlternates,
		},
	};
}

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!i18nConfig.locales.includes(locale)) {
		notFound();
	}
	const { resources } = await initTranslations(locale, ['common']);

	return (
		<html lang={locale}>
			<body
				className={`${inter.className} ${notoSansMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 selection:text-white`}
			>
				<CustomCursor />
				<TranslationsProvider namespaces={['common']} locale={locale} resources={resources}>
					{children}
				</TranslationsProvider>
			</body>
		</html>
	);
}
