import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import {
	Levels2Page,
	categories,
} from '../../../components/levels/Levels2Page';
import { store } from '../../../store';
import type { CategorySlug } from '../../../components/levels/Levels2Page/categories';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

type NextLevels2PageProps = {
	slug?: CategorySlug;
};

export function getStaticPaths(): GetStaticPathsResult {
	return {
		paths: categories.map((c) => {
			return {
				params: { slug: c.slug },
			};
		}),
		fallback: false,
	};
}

export function getStaticProps(
	context: GetStaticPropsContext
): GetStaticPropsResult<NextLevels2PageProps> {
	const { params } = context;
	const slug = params?.slug as undefined | CategorySlug;

	return {
		props: { slug },
	};
}

function NextLevels2Page({ slug }: NextLevels2PageProps) {
	const router = useRouter();

	useEffect(() => {
		if (typeof slug !== 'string') {
			router.replace('/levels2/newest');
		}

		const matchingCategory = categories.find((c) => c.slug === slug);

		if (matchingCategory?.userOrder) {
			router.replace(`/levels2/${slug}/newest`);
		}
	}, [slug]);

	return (
		<Provider store={store}>
			<Levels2Page
				currentSlug={slug as CategorySlug}
				onSlugClick={(newSlug) => {
					router.push('/levels2/' + newSlug);
				}}
			/>
		</Provider>
	);
}

export default NextLevels2Page;
