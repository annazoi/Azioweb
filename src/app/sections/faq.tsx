'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const FAQ = () => {
	const faqs = [
		{
			question: 'How much does a typical project cost?',
			answer:
				'Project costs vary widely based on scope, complexity, and technology stack. Generally, our projects start at $10k for specialized MVPs and can scale into enterprise budgets. We provide detailed estimates after our discovery call.',
		},
		{
			question: 'How long does it take to build an application?',
			answer:
				'A simple landing page or MVP can take 4-6 weeks. More complex SaaS platforms or mobile applications typically take 3-6 months. We break down the timeline into clear milestones during planning.',
		},
		{
			question: 'Do you provide ongoing support after launch?',
			answer:
				'Yes! We offer post-launch maintenance, bug-fixes, and continuous feature development retainers to ensure your application stays secure and up-to-date as your user base grows.',
		},
		{
			question: 'What technologies do you specialize in?',
			answer:
				'We primarily use modern web and mobile technologies: React, Next.js, and Tailwind CSS for the frontend; Node.js, NestJS, and PostgreSQL for the backend; and React Native for mobile apps.',
		},
		{
			question: 'How do we communicate during the project?',
			answer:
				"We believe in total transparency. You'll receive weekly updates, access to our project management board (Jira/Asana), and direct communication with the lead engineers via a private Slack channel.",
		},
	];

	return (
		<div id="faq" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-32 mb-32 flex flex-col gap-16">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-black tracking-[0.2em] uppercase text-[10px] italic">Have Questions?</h3>
				<h2 className="header">
					Frequently Asked <span className="text-gradient">Questions</span>
				</h2>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true, amount: 0.2 }}
				className="w-full flex flex-col gap-4"
			>
				{faqs.map((faq, index) => (
					<Disclosure
						as="div"
						key={index}
						className="bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden transition-all hover:border-white/10 group"
					>
						{({ open }) => (
							<>
								<DisclosureButton className="flex w-full justify-between items-center px-10 py-8 text-left text-sm lg:text-base font-black text-white hover:text-primary transition-colors focus:outline-none">
									<span>{faq.question}</span>
									<ChevronUpIcon
										className={`${
											open ? 'rotate-180 transform' : ''
										} h-4 w-4 text-primary transition-transform duration-300`}
									/>
								</DisclosureButton>
								<DisclosurePanel className="px-10 pb-8 text-slate-400 text-xs lg:text-sm leading-relaxed italic">
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
