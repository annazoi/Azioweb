'use client';

import { InlineWidget } from 'react-calendly';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import galaxy from '@/assets/uploads/galaxy.png';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function BookPage() {
	const { t } = useTranslation();

	return (
		<div className="min-h-screen text-white bg-[#111318]">
			<Navbar />
			<main className="pt-24 md:pt-32 pb-12 px-6 max-w-7xl mx-auto relative z-10">
				<div className="absolute top-0 right-0 -z-10 w-1/3 h-[500px] opacity-20 pointer-events-none overflow-hidden blur-[100px]">
					<div className="w-full h-full bg-primary rounded-full" />
				</div>
				<div className="absolute bottom-0 left-0 -z-10 w-1/4 h-[400px] opacity-10 pointer-events-none overflow-hidden blur-[120px]">
					<div className="w-full h-full bg-secondary rounded-full" />
				</div>

				<div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
					<h1
						className="font-black leading-[0.95] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
						style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '-0.04em' }}
					>
						{t('book.titlePrefix')} <span className="text-gradient">{t('book.titleAccent')}</span>
					</h1>
					<p className="text-sm md:text-lg leading-relaxed font-medium text-slate-400 animate-in fade-in slide-in-from-bottom-4 duration-1000">
						{t('book.description')}
					</p>
				</div>

				<div className="relative group animate-in fade-in zoom-in-95 duration-700">
					<div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/[0.05] -z-10" />

					<div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10">
						<InlineWidget
							url="https://calendly.com/anna-zoi"
							styles={{
								height: '750px',
								width: '100%',
							}}
							pageSettings={{
								backgroundColor: '111318',
								hideEventTypeDetails: false,
								hideLandingPageDetails: false,
								primaryColor: '6b58ff',
								textColor: 'ffffff',
							}}
						/>
					</div>

					<div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-20 group-hover:bg-secondary/30 transition-all duration-500" />
					<div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-20 group-hover:bg-primary/30 transition-all duration-500" />
				</div>
			</main>

			<Footer />

			<div className="fixed top-0 right-0 -z-10 w-1/2 h-full opacity-5 pointer-events-none overflow-hidden">
				<Image src={galaxy} alt={t('book.backgroundAlt')} fill className="object-cover grayscale" priority />
			</div>
		</div>
	);
}

