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

export const metadata = {
	title: 'Azioweb | Premium Software Development Agency',
	description:
		'Azioweb is a premium software development agency. We partner with ambitious brands to transform complex ideas into robust, enterprise-grade web and mobile applications.',
	keywords: 'software development, agency, web development, web design, Next.js, React, mobile apps',
};

export default function Home() {
	return (
		<div>
			<Navbar />
			<main>
				<Hero />
				<Services />
				<Agency />
				<Process />
				<Projects />
				<Experience />
				<Testimonials />
				<Pricing />
				<FAQ />
				<Contact />
			</main>

			<footer></footer>
		</div>
	);
}
