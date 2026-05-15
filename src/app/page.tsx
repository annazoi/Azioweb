import Navbar from '@/components/ui/navbar';
import Hero from '@/app/sections/hero';
import About from '@/app/sections/about';
import PcScrollReveal from '@/app/sections/pc-scroll-reveal';
import Services from '@/app/sections/services';
import Experience from '@/app/sections/experience';
import Process from '@/app/sections/process';
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
		<div
			className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat ${className || ''}`}
			style={{
				...(bgImage ? { backgroundImage: `url('${bgImage}')` } : {}),
				backgroundAttachment: 'fixed',
				...style,
			}}
		/>
		{bgImage && <div className="absolute inset-0 z-0 bg-gray-950/85 backdrop-blur-[2px]" />}
		<div className="relative z-10 w-full md:pb-20 pb-10">{children}</div>
	</section>
);

export default function Home() {
	return (
		<div>
			<Navbar />
			<main className="relative">
				<Hero />
				<About />
				<PcScrollReveal />
				<ParallaxSection style={{ backgroundColor: '#F2F2F2', backgroundAttachment: 'unset' }}>
					<Services />
				</ParallaxSection>
				<ParallaxSection bgImage="/backgrounds/bg1.jpg">
					<Process />
				</ParallaxSection>
				<ParallaxSection style={{ backgroundColor: '#000000', backgroundAttachment: 'unset' }}>
					<Experience />
				</ParallaxSection>
			</main>
			<Footer />
		</div>
	);
}

