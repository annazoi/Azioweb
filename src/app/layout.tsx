import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import AdaptiveFaviconSync from '@/components/adaptive-favicon-sync';
import ContactDrawer from '@/components/ui/contact-drawer';
import SmoothScroll from '@/components/ui/smooth-scroll';
import ViewportBottomBlur from '@/components/ui/viewport-bottom-blur';

const dmSans = DM_Sans({
	subsets: ['latin'],
	variable: '--font-dm-sans',
});

export const metadata: Metadata = {
	title: 'Azioweb',
	description: 'Azioweb builds web and mobile products with practical AI—discovery through launch.',
	keywords: 'web development, mobile apps, Next.js, React, AI integration, product studio',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${dmSans.className} ${dmSans.variable} antialiased selection:bg-primary/30 selection:text-white`}>
				<AdaptiveFaviconSync />
				<SmoothScroll>
					{/* <ViewportBottomBlur /> */}
					<ContactDrawer />
					{children}
				</SmoothScroll>
			</body>
		</html>
	);
}

