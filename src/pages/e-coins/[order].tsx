import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import {
	CategoryUserOrder,
	userOrders,
} from '../../components/levels/Levels2Page/categories';
import { ECoinsPage } from '../../components/e-coins/ECoinsPage';
import { store } from '../../store';

type NextECoinsPageProps = {
	order: CategoryUserOrder;
};

export function getStaticPaths(): GetStaticPathsResult {
	return {
		paths: userOrders.map((order) => {
			return {
				params: {
					order,
				},
			};
		}),
		fallback: false,
	};
}

export function getStaticProps(
	context: GetStaticPropsContext
): GetStaticPropsResult<NextECoinsPageProps> {
	const { params } = context;
	const order = (params?.order ?? 'popular') as CategoryUserOrder;

	return {
		props: { order },
	};
}

function NextECoinsPage({ order }: NextECoinsPageProps) {
	const router = useRouter();

	useEffect(() => {
		if (typeof order !== 'string') {
			router.replace(`/e-coins/popular`);
		}
	}, [order]);

	return (
		<Provider store={store}>
			<ECoinsPage
				currentOrder={order as CategoryUserOrder}
				onUserOrderClick={(newOrder) => {
					router.push(`/e-coins/${newOrder}`);
				}}
			/>
		</Provider>
	);
}

export default NextECoinsPage;
