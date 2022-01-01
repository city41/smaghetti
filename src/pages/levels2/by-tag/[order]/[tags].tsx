import React from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import { Levels2Page } from '../../../../components/levels/Levels2Page';
import { store } from '../../../../store';
import { CategoryUserOrder } from '../../../../components/levels/Levels2Page/categories';

type NextLevels2ByTagQuery = {
	order: CategoryUserOrder;
	tags: string | undefined;
};

function parseTagString(tagS: string): string[] {
	if (!tagS || !tagS.trim()) {
		return [];
	}

	return tagS.split('_').map((rawTag) => rawTag.trim().toLowerCase());
}

function NextLevels2ByTagPage() {
	const router = useRouter();
	const { order, tags = '' } = router.query as NextLevels2ByTagQuery;
	const currentTags = parseTagString(tags);

	return (
		<Provider store={store}>
			<Levels2Page
				currentSlug="by-tag"
				currentOrder={(order ?? 'newest') as CategoryUserOrder}
				tags={currentTags}
				onSlugClick={(newSlug) => {
					router.push(`/levels2/${newSlug}/newest`);
				}}
				onUserOrderClick={(newOrder) => {
					router.push(`/levels2/by-tag/${newOrder}/${tags}`);
				}}
				onTagClick={(tag) => {
					let newTagString: string;

					if (currentTags.includes(tag)) {
						newTagString = currentTags.filter((t) => t !== tag).join('_');
					} else {
						newTagString = currentTags
							.concat(tag)
							.filter((t) => !!t && !!t.trim())
							.join('_');
					}

					router.push(`/levels2/by-tag/${order}/${newTagString}`);
				}}
			/>
		</Provider>
	);
}

export default NextLevels2ByTagPage;
