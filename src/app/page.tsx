import Navbar from '@/components/ui/navbar';
import Hero from '@/app/sections/hero';
import Services from '@/app/sections/services';
import Projects from '@/app/sections/projects';
import Experience from '@/app/sections/experience';
import Process from '@/app/sections/process';
import Testimonials from '@/app/sections/testimonials';
import Agency from '@/app/sections/agency';
import Pricing from '@/app/sections/pricing';
import FAQ from '@/app/sections/faq';
import Contact from '@/app/sections/contact';

import Footer from '@/components/ui/footer';

export const metadata = {
	title: 'Azioweb | Premium Software Development Agency',
	description:
		'Azioweb is a premium software development agency. We partner with ambitious brands to transform complex ideas into robust, enterprise-grade web and mobile applications.',
	keywords: 'software development, agency, web development, web design, Next.js, React, mobile apps',
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
		<div className="relative z-10 w-full pb-30">{children}</div>
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

				<ParallaxSection style={{ backgroundColor: '#181822ff', backgroundAttachment: 'unset' }}>
					<Services />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg4.jpg">
					<Process />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg3.jpg">
					<Experience />
				</ParallaxSection>

				{/* <ParallaxSection style={{ backgroundColor: '#1A1B21' }}>
					<FAQ />
				</ParallaxSection> */}

				<ParallaxSection bgImage="/backgrounds/bg4.jpg">
					<Contact />
				</ParallaxSection>
			</main>

			<Footer />
		</div>
	);
}
