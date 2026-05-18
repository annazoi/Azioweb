import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/services/service-detail-page';
import JsonLd from '@/components/seo/json-ld';
import common from '@/locales/en/common.json';
import { isServiceSlug, SERVICE_CARD_IDS, SERVICE_SLUGS } from '@/lib/services';
import {
	breadcrumbSchema,
	buildGraph,
	createPageMetadata,
	serviceSchema,
	webPageSchema,
} from '@/lib/seo';

type PageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	if (!isServiceSlug(slug)) return { title: 'Service' };

	const data = common.servicePages.items[slug];
	const cardId = SERVICE_CARD_IDS[slug];
	const cardTitle = common.services.cards[cardId as keyof typeof common.services.cards].title;

	return createPageMetadata({
		title: cardTitle,
		description: data.metaDescription,
		path: `/services/${slug}`,
	});
}

export default async function ServicePage({ params }: PageProps) {
	const { slug } = await params;
	if (!isServiceSlug(slug)) notFound();

	const cardId = SERVICE_CARD_IDS[slug];
	const cardTitle = common.services.cards[cardId as keyof typeof common.services.cards].title;
	const data = common.servicePages.items[slug];

	const serviceJsonLd = buildGraph(
		webPageSchema(`/services/${slug}`, cardTitle, data.metaDescription),
		serviceSchema(slug),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: cardTitle, path: `/services/${slug}` },
		]),
	);

	return (
		<>
			<JsonLd data={serviceJsonLd} />
			<ServiceDetailPage slug={slug} />
		</>
	);
}
