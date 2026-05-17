'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import InfinityOrbsAnimation from '@/components/ui/infinity-orbs-animation';
import { useLocalTime } from '@/hooks/use-local-time';
import { getBlogArticle, getOrderedBlogSlugs, type BlogSlug } from '@/lib/blog';

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
}

function ArticleCard({
	slug,
	featured = false,
	index,
}: {
	slug: BlogSlug;
	featured?: boolean;
	index: number;
}) {
	const { t } = useTranslation();
	const article = getBlogArticle(slug);

	return (
		<motion.article
			initial={{ opacity: 0, y: 28 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-60px' }}
			transition={{ duration: 0.5, delay: index * 0.06 }}
			className={featured ? 'lg:col-span-2 lg:row-span-2' : ''}
		>
			<Link
				href={`/blog/${slug}`}
				className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.07)] transition-transform duration-500 hover:scale-[0.985] ${
					featured ? 'min-h-[420px] lg:min-h-[520px]' : 'min-h-[340px]'
				}`}
			>
				<div
					className={`relative w-full overflow-hidden ${featured ? 'h-[52%] min-h-[200px] lg:h-[58%]' : 'h-[48%] min-h-[160px]'}`}
				>
					<Image
						src={article.image}
						alt=""
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-105"
						sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
					<span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-black">
						{article.category}
					</span>
				</div>
				<div className="flex flex-1 flex-col p-6 md:p-8">
					<time className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#AAAAAA]">
						{formatDate(article.date)}
					</time>
					<h2
						className={`mt-3 font-bold tracking-tight text-black ${
							featured ? 'text-2xl sm:text-3xl md:text-[2rem] md:leading-tight' : 'text-xl sm:text-2xl'
						}`}
					>
						{article.title}
					</h2>
					<p
						className={`mt-3 flex-1 leading-relaxed text-black/70 ${featured ? 'text-base md:text-[17px]' : 'text-[15px]'}`}
					>
						{article.excerpt}
					</p>
					<span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black">
						{t('blog.readArticle')}
						<ArrowUpRightIcon
							className="size-4 transition-transform duration-300 group-hover:rotate-45"
							strokeWidth={2}
						/>
					</span>
				</div>
			</Link>
		</motion.article>
	);
}

export default function BlogPage() {
	const { t } = useTranslation();
	const { time, hour, theme } = useLocalTime('Europe/Athens');
	const slugs = getOrderedBlogSlugs();
	const [featured, ...rest] = slugs;

	return (
		<div className="min-h-screen bg-black text-white">
			<Navbar />

			<header className="relative z-10 overflow-hidden">
				<div className="pointer-events-none absolute inset-0 bg-gradient-brand-glow opacity-80" aria-hidden />
				<div
					className="pointer-events-none absolute -left-24 top-20 size-[22rem] rounded-full bg-[#9886ff]/15 blur-[90px]"
					aria-hidden
				/>
				<div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
					<motion.p {...fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
						{t('blog.tag')}
					</motion.p>
					<div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-3xl">
							<motion.h1
								{...fadeUp}
								transition={{ ...fadeUp.transition, delay: 0.05 }}
								className="font-semibold tracking-tight text-white"
								style={{ fontSize: 'clamp(2.5rem, 6vw, 4.25rem)', lineHeight: 1.02 }}
							>
								{t('blog.titlePrefix')}{' '}
								<span className="text-gradient">{t('blog.titleAccent')}</span>
							</motion.h1>
							<motion.p
								{...fadeUp}
								transition={{ ...fadeUp.transition, delay: 0.1 }}
								className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg"
							>
								{t('blog.description')}
							</motion.p>
						</div>
						<motion.div
							{...fadeUp}
							transition={{ ...fadeUp.transition, delay: 0.14 }}
							className="flex items-center gap-1.5 text-sm font-medium text-neutral-500"
						>
							<InfinityOrbsAnimation theme={theme} hour={hour} />
							{time} {t('hero.locationLabel')}
						</motion.div>
					</div>
				</div>
			</header>

			<div data-navbar-light className="relative z-10 rounded-t-[2rem] bg-[#F2F2F2] text-black md:rounded-t-[2.5rem]">
				<div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
					<div className="grid gap-6 lg:grid-cols-3 lg:gap-7">
						{featured && <ArticleCard slug={featured} featured index={0} />}
						{rest.map((slug, i) => (
							<ArticleCard key={slug} slug={slug} index={i + 1} />
						))}
					</div>
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
