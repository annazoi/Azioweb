'use client';

import { Project } from '@/interfaces';
import ProjectModal from '@/components/ui/project-modal';
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import relay from '@/assets/projects/relay.png';
import habitry from '@/assets/projects/habitry/habitry.png';
import drobe from '@/assets/projects/drobe/drobe.png';

function chunkPairs<T>(arr: T[]): T[][] {
	const out: T[][] = [];
	for (let i = 0; i < arr.length; i += 2) {
		out.push(arr.slice(i, i + 2));
	}
	return out;
}

const Experience = () => {
	const { t } = useTranslation();
	const sites: Project[] = [
		{
			id: 'site-7',
			name: 'Fishing Trips Rhodes',
			photo: '/img/projects/fishingtripsrhodesdimitris.png',
			photos: ['/img/projects/fishingtripsrhodesdimitris.png'],
			description: t('experience.projects.fishingTripsRhodes.description'),
			url: 'https://www.fishingtripsrhodesdimitris.com/',
			tag: t('experience.projects.fishingTripsRhodes.tag'),
			highlights: [
				t('experience.projects.fishingTripsRhodes.highlights.0'),
				t('experience.projects.fishingTripsRhodes.highlights.1'),
			],
			details: t('experience.projects.fishingTripsRhodes.details'),
			showcaseTags: ['Web design', 'Booking', 'Tourism'],
			categoryLine: 'Travel, Experiences',
		},
		{
			id: 'site-2',
			name: 'Svyaz Platform',
			photo: "/img/projects/svyaz.png",
			photos: ["/img/projects/svyaz.png"],
			description: t('experience.projects.svyaz.description'),
			url: 'https://svyaz.azioweb.com/',
			tag: t('experience.projects.svyaz.tag'),
			highlights: [t('experience.projects.svyaz.highlights.0'), t('experience.projects.svyaz.highlights.1')],
			details: t('experience.projects.svyaz.details'),
			showcaseTags: ['App design', 'Messaging', 'AI'],
			categoryLine: 'AI, Collaboration',
		},
		{
			id: 'site-6',
			name: 'Hozya Platform',
			photo: '/img/projects/hozya.png',
			photos: ["/img/projects/hozya.png"],
			description: t('experience.projects.hozya.description'),
			url: 'https://hozya.com/',
			tag: t('experience.projects.hozya.tag'),
			highlights: [t('experience.projects.hozya.highlights.0'), t('experience.projects.hozya.highlights.1')],
			details: t('experience.projects.hozya.details'),
			showcaseTags: ['Web design', 'Platform', 'SaaS'],
			categoryLine: 'PropTech, Real estate',
		},
		{
			id: 'site-1',
			name: 'Lather Lab',
			photo: "/img/projects/latherlab.png",
			photos: ["/img/projects/latherlab.png"],
			url: 'https://latherlab.azioweb.com/',
			description: t('experience.projects.latherLab.description'),
			highlights: [t('experience.projects.latherLab.highlights.0'), t('experience.projects.latherLab.highlights.1')],
			details: t('experience.projects.latherLab.details'),
			showcaseTags: ['Web design', 'E-commerce', 'Brand'],
			categoryLine: 'Commerce, Retail',
		},
		{
			id: 'site-5',
			name: 'Relay Platform',
			photo: '/img/projects/relay.png',
			photos: ["/img/projects/relay.png"],
			description: t('experience.projects.relay.description'),
			url: 'https://relay.annazoi.dev/',
			tag: t('experience.projects.relay.tag'),
			highlights: [t('experience.projects.relay.highlights.0'), t('experience.projects.relay.highlights.1')],
			details: t('experience.projects.relay.details'),
			showcaseTags: ['Web design', 'Dashboard', 'Analytics'],
			categoryLine: 'Insights, NLP',
		},
		{
			id: 'site-4',
			name: 'Drobe App',
			photo: "/img/projects/drobe.png",
			photos: ["/img/projects/drobe.png"],
			description: t('experience.projects.drobe.description'),
			url: 'https://drobe.annazoi.dev/',
			tag: t('experience.projects.drobe.tag'),
			highlights: [t('experience.projects.drobe.highlights.0'), t('experience.projects.drobe.highlights.1')],
			details: t('experience.projects.drobe.details'),
			showcaseTags: ['App design', 'AI', 'Mobile'],
			categoryLine: 'Lifestyle, Fashion',
		},
		{
			id: 'site-3',
			name: 'Habitry App',
			photo: "/img/projects/habitry.png",
			photos: ["/img/projects/habitry.png"],
			description: t('experience.projects.habitry.description'),
			url: 'https://habitry.annazoi.dev/',
			tag: t('experience.projects.habitry.tag'),
			highlights: [t('experience.projects.habitry.highlights.0'), t('experience.projects.habitry.highlights.1')],
			details: t('experience.projects.habitry.details'),
			showcaseTags: ['App design', 'Product', 'Health'],
			categoryLine: 'Wellness, Habits',
		},
	];

	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleProjectClick = (site: Project) => {
		if (site.photos && site.photos.length > 0) {
			setSelectedProject(site);
			setIsModalOpen(true);
		} else {
			window.open(site.url, '_blank');
		}
	};

	const rows = chunkPairs(sites);

	return (
		<div id="clients" className="relative mx-auto max-w-[100rem] px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-30">
			<div className="mx-auto max-w-6xl">
				<h2 className="max-w-2xl">
					<span className="block text-[clamp(1.75rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
						{t('experience.headlineBold')}
					</span>
					<span className="mt-1 block text-[clamp(1.75rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-neutral-500">
						{t('experience.headlineMuted')}
					</span>
				</h2>

				<div className="mt-8 grid grid-cols-1 gap-y-6 md:mt-9 md:grid-cols-2 md:items-start md:gap-x-12 lg:gap-x-16">
					<p className="max-w-lg text-[18px] leading-[1.5] text-neutral-400">
						{t('experience.introLeftBefore')}
						<span className="font-semibold text-neutral-100">{t('experience.introLeftHighlight')}</span>
						{t('experience.introLeftAfter')}
					</p>
					<p className="max-w-xs text-[18px] leading-[1.5] text-neutral-400 md:justify-self-end md:text-right">
						{t('experience.introRight')}
					</p>
				</div>
			</div>

			<div className="mt-14 flex flex-col gap-6 sm:mt-16 lg:mt-20 lg:gap-8">
				{rows.map((pair) => (
					<div key={pair.map((s) => s.id).join('-')} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
						{pair.map((site) => (
							<ShowcaseCard key={site.id} site={site} onProjectClick={handleProjectClick} />
						))}
					</div>
				))}
			</div>

			{selectedProject && (
				<ProjectModal project={selectedProject} onOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			)}
		</div>
	);
};

function ShowcaseCard({ site, onProjectClick }: { site: Project; onProjectClick: (site: Project) => void }) {
	const variant = site.showcaseVariant ?? 'dark';
	const tags = site.showcaseTags ?? [];
	const category = site.categoryLine ?? site.tag ?? '';
	const extras = site.photos?.filter((p) => p !== site.photo).slice(0, 2) ?? [];
	const isDark = variant === 'dark';

	return (
		<button
			type="button"
			onClick={() => onProjectClick(site)}
			className={`group relative w-full cursor-pointer overflow-hidden rounded-[2rem] text-left transition-transform duration-300 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
				isDark ? 'bg-[#101010] shadow-[0_24px_80px_rgba(0,0,0,0.45)]' : 'bg-[#F2F2F2] shadow-[0_20px_60px_rgba(0,0,0,0.12)]'
			}`}
		>
			<div className="absolute right-5 top-5 z-20 flex max-w-[65%] flex-wrap justify-end gap-2 sm:right-6 sm:top-6">
				{tags.map((tag) => (
					<span
						key={tag}
						className={`rounded-full px-3 py-1 text-[14px] font-semibold tracking-tight sm:text-xs ${
							isDark ? 'bg-white/10 text-white' : 'bg-neutral-300/95 text-neutral-900'
						}`}
					>
						{tag}
					</span>
				))}
			</div>

			<div className={`relative min-h-[min(100vw,26rem)] sm:min-h-[28rem] md:min-h-[30rem] ${isDark ? '' : ''}`}>
					<div className="relative h-full min-h-[inherit] p-5 pt-20 sm:p-8 sm:pt-24 md:min-h-[45rem]">
						{/* {extras[0] && (
							<div className="absolute left-4 top-28 z-10 hidden h-36 w-24 overflow-hidden rounded-2xl shadow-xl sm:left-6 sm:top-32 sm:block sm:h-40 sm:w-28 md:h-44 md:w-32">
								<Image src={extras[0]} alt="" fill className="object-cover" sizes="128px" />
							</div>
						)}
						{extras[1] && (
							<div className="absolute bottom-28 right-4 z-10 hidden h-40 w-24 overflow-hidden rounded-2xl shadow-xl sm:right-6 md:block md:h-44 md:w-28">
								<Image src={extras[1]} alt="" fill className="object-cover" sizes="112px" />
							</div>
						)} */}
						<div className="absolute left-1/2 top-[48%] z-[5] w-full h-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl shadow-2xl">
							<Image src={site.photo} alt={site.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105 object-center" />
						</div>
					</div>
			</div>

			<div
				className={`absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between gap-4 p-6 sm:p-8 ${
					isDark ? 'bg-gradient-to-t from-black via-black/85 to-transparent pb-7 pt-20 sm:pb-8 sm:pt-24' : 'bg-gradient-to-t from-[#e8e8e8] via-[#F2F2F2]/95 to-transparent pb-6 pt-16 sm:pb-8 sm:pt-20'
				}`}
			>
				<div>
					<h3 className={`text-xl font-bold tracking-tight sm:text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-neutral-900'}`}>
						{site.name}
					</h3>
					<p className={`mt-1 text-base font-medium ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>{category}</p>
				</div>
				{!isDark && (
					<span
						className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md ring-1 ring-black/5 transition-transform group-hover:scale-105 sm:size-12"
						aria-hidden
					>
						<PlusIcon className="size-5 sm:size-6" strokeWidth={2} />
					</span>
				)}
			</div>
		</button>
	);
}

export default Experience;
