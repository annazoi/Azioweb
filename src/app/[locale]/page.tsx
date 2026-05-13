import Navbar from '@/components/ui/navbar';
import Hero from '@/app/sections/hero';
import Services from '@/app/sections/services';
import Experience from '@/app/sections/experience';
import Process from '@/app/sections/process';
import Testimonials from '@/app/sections/testimonials';
import Agency from '@/app/sections/agency';
import Pricing from '@/app/sections/pricing';
import FAQ from '@/app/sections/faq';
import Contact from '@/app/sections/contact';

import Footer from '@/components/ui/footer';

export const metadata = {
	title: 'Azioweb | AI-First Product Studio',
	description:
		'Azioweb is an AI-focused product studio. We build web and mobile applications with production-ready AI integrations—copilots, automation, retrieval, and custom models tailored to your product.',
	keywords:
		'AI software development, AI integration, LLM apps, web development, mobile apps, Next.js, React, React Native, product studio',
};

export const ParallaxSection = ({
	children,
	bgImage,
	style,
	className,
}: {
	children: React.ReactNode;
	bgImage?: string;
	style?: React.CSSProperties;
	className?: string;
}) => (
	<section className="relative w-full overflow-hidden">
		{/* Parallax Static Background */}
		<div
			className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat ${className || ''}`}
			style={{
				...(bgImage ? { backgroundImage: `url('${bgImage}')` } : {}),
				backgroundAttachment: 'fixed',
				...style,
			}}
		/>

		{/* Premium Dark Overlay with a very subtle blur to merge the sections nicely */}
		{bgImage && <div className="absolute inset-0 z-0 bg-gray-950/85 backdrop-blur-[2px]" />}

		{/* Section Content */}
		<div className="relative z-10 w-full md:pb-20 pb-10">{children}</div>
	</section>
);

export default function Home() {
	return (
		<div>
			<Navbar />
			<main className="relative">
				<ParallaxSection bgImage="/backgrounds/bg6.jpg">
					<Hero />
				</ParallaxSection>

				<ParallaxSection style={{ backgroundColor: 'var(--background-secondary)', backgroundAttachment: 'unset' }}>
					<Services />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg1.jpg">
					<Process />
				</ParallaxSection>

				<ParallaxSection style={{ backgroundColor: 'var(--background-secondary)', backgroundAttachment: 'unset' }}>
					<Experience />
				</ParallaxSection>

				{/* <ParallaxSection style={{ backgroundColor: '#15171d', backgroundAttachment: 'unset' }}>
					<FAQ />
				</ParallaxSection> */}

				<ParallaxSection bgImage="/backgrounds/bg3.jpg">
					<Contact />
				</ParallaxSection>
			</main>

			<Footer />
		</div>
	);
}
