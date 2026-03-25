'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const FAQ = () => {
	const faqs = [
		{
			question: "How much does a typical project cost?",
			answer: "Project costs vary widely based on scope, complexity, and technology stack. Generally, our projects start at $10k for specialized MVPs and can scale into enterprise budgets. We provide detailed estimates after our discovery call."
		},
		{
			question: "How long does it take to build an application?",
			answer: "A simple landing page or MVP can take 4-6 weeks. More complex SaaS platforms or mobile applications typically take 3-6 months. We break down the timeline into clear milestones during planning."
		},
		{
			question: "Do you provide ongoing support after launch?",
			answer: "Yes! We offer post-launch maintenance, bug-fixes, and continuous feature development retainers to ensure your application stays secure and up-to-date as your user base grows."
		},
		{
			question: "What technologies do you specialize in?",
			answer: "We primarily use modern web and mobile technologies: React, Next.js, and Tailwind CSS for the frontend; Node.js, NestJS, and PostgreSQL for the backend; and React Native for mobile apps."
		},
		{
			question: "How do we communicate during the project?",
			answer: "We believe in total transparency. You'll receive weekly updates, access to our project management board (Jira/Asana), and direct communication with the lead engineers via a private Slack channel."
		}
	];

	return (
		<div id="faq" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-32 flex flex-col gap-12">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-bold tracking-wider uppercase text-sm">Have Questions?</h3>
				<h2 className="header text-gradient">Frequently Asked Questions</h2>
				<p className="text-slate-400 text-center max-w-2xl leading-relaxed text-lg">
					Everything you need to know about our process, pricing, and how we collaborate with clients.
				</p>
			</div>

			<motion.div 
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true, amount: 0.2 }}
				className="w-full bg-white/5 p-2 rounded-3xl border border-white/10"
			>
				{faqs.map((faq, index) => (
					<Disclosure as="div" key={index} className="mt-2" defaultOpen={index === 0}>
						{({ open }) => (
							<>
								<DisclosureButton className="flex w-full justify-between rounded-2xl bg-white/5 px-6 py-5 text-left text-lg font-medium text-white hover:bg-white/10 focus:outline-none focus-visible:ring focus-visible:ring-primary/75 border border-white/5 transition-colors">
									<span>{faq.question}</span>
									<ChevronUpIcon
										className={`${
											open ? 'rotate-180 transform' : ''
										} h-6 w-6 text-primary transition-transform duration-300`}
									/>
								</DisclosureButton>
								<DisclosurePanel className="px-6 pt-4 pb-6 text-slate-300 leading-relaxed text-[15px]">
									{faq.answer}
								</DisclosurePanel>
							</>
						)}
					</Disclosure>
				))}
			</motion.div>
		</div>
	);
};

export default FAQ;
