import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import {
	Levels2Page,
	categories,
} from '../../../components/levels/Levels2Page';
import { store } from '../../../store';
import type {
	CategorySlug,
	CategoryUserOrder,
} from '../../../components/levels/Levels2Page/categories';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

type NextLevels2PageProps = {
	slug: CategorySlug;
	order: CategoryUserOrder;
};

export function getStaticPaths(): GetStaticPathsResult {
	return {
		paths: categories
			.filter((c) => c.userOrder)
			.map((c) => {
				return [
					{
						params: { slug: c.slug, order: 'newest' },
					},
					{
						params: { slug: c.slug, order: 'popular' },
					},
				];
			})
			.flat(1),
		fallback: false,
	};
}

export function getStaticProps(
	context: GetStaticPropsContext
): GetStaticPropsResult<NextLevels2PageProps> {
	const { params } = context;
	const slug = params?.slug as CategorySlug;
	const order = (params?.order ?? 'newest') as CategoryUserOrder;

	return {
		props: { slug, order },
	};
}

function NextLevels2Page({ slug, order }: NextLevels2PageProps) {
	const router = useRouter();

	useEffect(() => {
		if (typeof slug !== 'string') {
			router.replace('/levels2/all/newest');
		} else if (typeof order !== 'string') {
			router.replace(`/levels2/${slug}/newest`);
		}
	}, [slug, order]);

	return (
		<Provider store={store}>
			<Levels2Page
				currentSlug={slug as CategorySlug}
				currentOrder={order as CategoryUserOrder}
				onSlugClick={(newSlug) => {
					router.push(`/levels2/${newSlug}/newest`);
				}}
				onUserOrderClick={(newOrder) => {
					router.push(`/levels2/${slug}/${newOrder}`);
				}}
			/>
		</Provider>
	);
}

export default NextLevels2Page;
