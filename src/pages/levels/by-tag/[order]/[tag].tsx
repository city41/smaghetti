import React from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import { Levels2Page } from '../../../../components/levels/Levels2Page';
import { store } from '../../../../store';
import { CategoryUserOrder } from '../../../../components/levels/Levels2Page/categories';

type NextLevels2ByTagQuery = {
	order: CategoryUserOrder;
	tag: string | undefined;
};

function NextLevels2ByTagPage() {
	const router = useRouter();
	const { order, tag = '' } = router.query as NextLevels2ByTagQuery;

	return (
		<Provider store={store}>
			<Levels2Page
				currentSlug="by-tag"
				currentOrder={(order ?? 'popular') as CategoryUserOrder}
				tag={tag}
				onSlugClick={(newSlug) => {
					router.push(`/levels/${newSlug}/popular`);
				}}
				onUserOrderClick={(newOrder) => {
					router.push(`/levels/by-tag/${newOrder}/${tag}`);
				}}
				onTagClick={(tag) => {
					router.push(`/levels/by-tag/${order}/${tag}`);
				}}
			/>
		</Provider>
	);
}

export default NextLevels2ByTagPage;
