import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_Mono, Inter } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
	title: 'Azioweb | Book a Call',
	description:
		'Book a call with AzioWeb to discuss your software development needs. We partner with ambitious brands to transform complex ideas into robust, enterprise-grade web and mobile applications.',
	keywords: 'book a call, software development, agency, web development, web design, Next.js, React, mobile apps',
};

import { CustomCursor } from '@/components/ui/CustomCursor';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} ${notoSansMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 selection:text-white`}
			>
				<CustomCursor />
				{children}
			</body>
		</html>
	);
}
