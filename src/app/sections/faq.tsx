'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import common from '../../../public/locales/en/common.json';

const FAQ = () => {
	const { t } = useTranslation();
	const faqs = common.faq.items;

	return (
		<section id="faq" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 md:mt-20 mt-10">
			<div className="relative overflow-hidden rounded-3xl bg-[#0b0d12]/85 p-6 md:p-10 lg:p-12">
				<div className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />

				<div className="relative mb-6 md:mb-8 flex flex-col gap-3 text-center">
					<h3 className="text-primary font-black tracking-[0.2em] uppercase text-[10px] italic">{t('faq.tag')}</h3>
					<h2 className="header">
						{t('faq.titlePrefix')} <span className="text-gradient">{t('faq.titleAccent')}</span>
					</h2>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45 }}
					viewport={{ once: true, amount: 0.2 }}
					className="relative flex flex-col gap-3"
				>
					{faqs.map((faq, index) => (
						<Disclosure
							as="div"
							key={index}
							className="rounded-2xl bg-white/[0.03] transition-colors hover:border-primary/40"
						>
							{({ open }) => (
								<>
									<DisclosureButton className="cursor-pointer flex w-full items-center justify-between gap-4 px-5 md:px-6 py-4 text-left text-sm md:text-base font-bold text-white focus:outline-none">
										<span>{faq.question}</span>
										<ChevronUpIcon
											className={`${open ? 'rotate-180 transform' : ''} h-4 w-4 shrink-0 text-primary transition-transform duration-300`}
										/>
									</DisclosureButton>
									<AnimatePresence initial={false}>
										{open && (
											<DisclosurePanel static as="div">
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: 'auto', opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.25, ease: 'easeInOut' }}
													className="overflow-hidden"
												>
													<div className="px-5 md:px-6 pb-4 text-slate-300 text-sm leading-relaxed">{faq.answer}</div>
												</motion.div>
											</DisclosurePanel>
										)}
									</AnimatePresence>
								</>
							)}
						</Disclosure>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default FAQ;
