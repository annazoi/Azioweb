import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/services/service-detail-page';
import common from '@/locales/en/common.json';
import { isServiceSlug, SERVICE_CARD_IDS, SERVICE_SLUGS } from '@/lib/services';

type PageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	if (!isServiceSlug(slug)) return { title: 'Service | Azioweb' };

	const data = common.servicePages.items[slug];
	const cardId = SERVICE_CARD_IDS[slug];
	const cardTitle = common.services.cards[cardId as keyof typeof common.services.cards].title;

	return {
		title: `${cardTitle} | Azioweb`,
		description: data.metaDescription,
	};
}

export default async function ServicePage({ params }: PageProps) {
	const { slug } = await params;
	if (!isServiceSlug(slug)) notFound();
	return <ServiceDetailPage slug={slug} />;
}
