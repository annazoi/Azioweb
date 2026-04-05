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

const ParallaxSection = ({ children, bgImage }: { children: React.ReactNode; bgImage: string }) => (
	<section className="relative w-full overflow-hidden">
		{/* Parallax Static Background */}
		<div
			className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `url('${bgImage}')`,
				backgroundAttachment: 'fixed',
			}}
		/>

		{/* Premium Dark Overlay with a very subtle blur to merge the sections nicely */}
		<div className="absolute inset-0 z-0 bg-slate-950/85 backdrop-blur-[2px]" />

		{/* Section Content */}
		<div className="relative z-10 w-full pb-8">{children}</div>
	</section>
);

export default function Home() {
	return (
		<div>
			<Navbar />
			<main className="relative bg-slate-950">
				<ParallaxSection bgImage="/backgrounds/bg1.jpg">
					<Hero />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg2.jpg">
					<Services />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg3.png">
					<Agency />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg1.jpg">
					<Process />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg2.jpg">
					<Projects />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg3.png">
					<Experience />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg1.jpg">
					<Testimonials />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg2.jpg">
					<Pricing />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg3.png">
					<FAQ />
				</ParallaxSection>

				<ParallaxSection bgImage="/backgrounds/bg1.jpg">
					<Contact />
				</ParallaxSection>
			</main>

			<Footer />
		</div>
	);
}
