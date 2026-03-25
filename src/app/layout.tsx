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
	title: 'Anna Zoi | Full-Stack Developer',
	description: 'Personal portfolio of Anna Zoi, a Full-Stack Developer specializing in intuitive digital products.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} ${notoSansMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 selection:text-white`}>
				{children}
			</body>
		</html>
	);
}
