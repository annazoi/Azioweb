'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
	const { t } = useTranslation();
	const faqs = [
		{
			question: t('faq.items.0.question'),
			answer: t('faq.items.0.answer'),
		},
		{
			question: t('faq.items.1.question'),
			answer: t('faq.items.1.answer'),
		},
		{
			question: t('faq.items.2.question'),
			answer: t('faq.items.2.answer'),
		},
		{
			question: t('faq.items.3.question'),
			answer: t('faq.items.3.answer'),
		},
		{
			question: t('faq.items.4.question'),
			answer: t('faq.items.4.answer'),
		},
	];

	return (
		<div id="faq" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-25 flex flex-col gap-16">
			<div className="flex flex-col items-center gap-4 text-center">
				<h3 className="text-primary font-black tracking-[0.2em] uppercase text-[10px] italic">{t('faq.tag')}</h3>
				<h2 className="header">
					{t('faq.titlePrefix')} <span className="text-gradient">{t('faq.titleAccent')}</span>
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
								<DisclosureButton className="cursor-pointer flex w-full justify-between items-center px-10 py-8 text-left text-sm lg:text-base font-black text-white hover:text-primary transition-colors focus:outline-none">
									<span>{faq.question}</span>
									<ChevronUpIcon
										className={`${
											open ? 'rotate-180 transform' : ''
										} h-4 w-4 text-primary transition-transform duration-300`}
									/>
								</DisclosureButton>
								<DisclosurePanel className="px-10 pb-8 text-slate-300 text-xs lg:text-sm leading-relaxed italic">
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
