'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { getBlogArticle, getOrderedBlogSlugs, type BlogSlug } from '@/lib/blog';

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

function getRelatedSlugs(current: BlogSlug): BlogSlug[] {
	return getOrderedBlogSlugs().filter((s) => s !== current).slice(0, 3);
}

type ContentBlock = { type: 'p' | 'h2'; text: string };

export default function BlogArticlePage({ slug }: { slug: BlogSlug }) {
	const { t } = useTranslation();
	const article = getBlogArticle(slug);
	const related = getRelatedSlugs(slug);
	const content = article.content as ContentBlock[];

	return (
		<div className="min-h-screen bg-black text-white">
			<Navbar />

			<header className="relative z-0 min-h-[min(72vh,44rem)] overflow-hidden md:min-h-[min(78vh,50rem)]">
				<div className="absolute inset-0">
					<Image
						src={article.image}
						alt={article.title}
						fill
						className="object-cover blur-xs brightness-70"
						sizes="100vw"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-transparent" aria-hidden />
					<div
						className="absolute inset-x-0 bottom-0 h-[min(55%,22rem)] bg-gradient-to-t from-black via-black/95 to-transparent"
						aria-hidden
					/>
				</div>
				<div className="relative mx-auto max-w-6xl px-6 pb-28 pt-28 md:px-10 md:pb-36 md:pt-36">
					<motion.div {...fadeUp}>
						<Link
							href="/blog"
							className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-white"
						>
							<ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2} />
							{t('blog.backToBlog')}
						</Link>
					</motion.div>

					<motion.div
						{...fadeUp}
						transition={{ ...fadeUp.transition, delay: 0.05 }}
						className="mt-10 flex flex-wrap items-center gap-3"
					>
						<span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-300">
							{article.category}
						</span>
						<time className="text-sm text-neutral-500">{formatDate(article.date)}</time>
						<span className="text-sm text-neutral-600">·</span>
						<span className="text-sm text-neutral-500">
							{t('blog.minRead', { minutes: article.readMinutes })}
						</span>
					</motion.div>

					<motion.h1
						{...fadeUp}
						transition={{ ...fadeUp.transition, delay: 0.1 }}
						className="mt-6 max-w-4xl font-semibold tracking-tight text-white"
						style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.08 }}
					>
						{article.title}
					</motion.h1>

					<motion.p
						{...fadeUp}
						transition={{ ...fadeUp.transition, delay: 0.14 }}
						className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400"
					>
						{article.excerpt}
					</motion.p>
				</div>
			</header>

			<div
				data-navbar-light
				className="relative z-10 -mt-10 rounded-t-[2rem] bg-[#F2F2F2] text-black md:-mt-14 md:rounded-t-[2.5rem]"
			>
				<div className="mx-auto max-w-6xl px-6 md:px-10">
					<article className="mx-auto max-w-3xl py-14 md:py-20">
						{content.map((block, i) =>
							block.type === 'h2' ? (
								<motion.h2
									key={i}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-40px' }}
									transition={{ duration: 0.45 }}
									className="mt-12 text-2xl font-bold tracking-tight text-black first:mt-0 md:text-[1.75rem]"
								>
									{block.text}
								</motion.h2>
							) : (
								<motion.p
									key={i}
									initial={{ opacity: 0, y: 12 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-40px' }}
									transition={{ duration: 0.45, delay: 0.02 }}
									className="mt-5 text-[17px] leading-[1.75] text-black/80 md:text-lg"
								>
									{block.text}
								</motion.p>
							),
						)}
					</article>

					{related.length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.5 }}
							className="border-t border-[#E0E0E0] pb-16 pt-14 md:pb-20 md:pt-16"
						>
							<h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#AAAAAA]">
								{t('blog.relatedHeading')}
							</h2>
							<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{related.map((relatedSlug) => {
									const relatedArticle = getBlogArticle(relatedSlug);
									return (
										<Link
											key={relatedSlug}
											href={`/blog/${relatedSlug}`}
											className="group flex flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:scale-[0.98]"
										>
											<div className="relative aspect-[16/10] w-full overflow-hidden">
												<Image
													src={relatedArticle.image}
													alt={relatedArticle.title}
													fill
													className="object-cover transition-transform duration-500 group-hover:scale-105"
													sizes="(max-width: 1024px) 50vw, 33vw"
												/>
											</div>
											<div className="flex flex-1 flex-col p-5">
												<span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#AAAAAA]">
													{relatedArticle.category}
												</span>
												<h3 className="mt-2 text-lg font-bold tracking-tight text-black">
													{relatedArticle.title}
												</h3>
												<span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-black/70">
													{t('blog.readArticle')}
													<ArrowUpRightIcon
														className="size-3.5 transition-transform duration-300 group-hover:rotate-45"
														strokeWidth={2}
													/>
												</span>
											</div>
										</Link>
									);
								})}
							</div>
						</motion.div>
					)}
				</div>

				<div className="border-t border-[#E0E0E0] bg-white">
					<div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-14 md:flex-row md:items-center md:px-10 md:py-16">
						<div className="max-w-xl">
							<h2 className="text-2xl font-bold tracking-tight text-black md:text-3xl">{t('blog.ctaTitle')}</h2>
							<p className="mt-3 text-[15px] leading-relaxed text-black/70 md:text-base">{t('blog.ctaDescription')}</p>
						</div>
						<Link
							href="/book"
							className="group inline-flex shrink-0 items-center gap-2 rounded-[16px] bg-black px-6 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
						>
							{t('blog.ctaButton')}
							<ArrowUpRightIcon
								className="size-3.5 transition-transform duration-300 group-hover:rotate-45"
								strokeWidth={2}
							/>
						</Link>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
