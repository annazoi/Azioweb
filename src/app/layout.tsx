import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import ContactDrawer from '@/components/ui/contact-drawer';

const dmSans = DM_Sans({
	subsets: ['latin'],
	variable: '--font-dm-sans',
});

export const metadata: Metadata = {
	title: 'Azioweb',
	description: 'Azioweb builds web and mobile products with practical AI—discovery through launch.',
	keywords: 'web development, mobile apps, Next.js, React, AI integration, product studio',
	icons: {
		icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
		shortcut: ['/favicon.ico'],
		apple: [{ url: '/favicon.ico' }],
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${dmSans.className} ${dmSans.variable} antialiased selection:bg-primary/30 selection:text-white`}>
				<ContactDrawer />
				{children}
			</body>
		</html>
	);
}

