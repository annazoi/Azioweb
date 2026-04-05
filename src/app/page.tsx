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

export default function Home() {
	return (
		<div>
			<Navbar />
			<main className="relative">
				{/* Background Blobs */}
				<div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
				<div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -z-10" />
				<div className="absolute top-[60%] left-[5%] w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />
				<div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />

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

			<Footer />
		</div>
	);
}
