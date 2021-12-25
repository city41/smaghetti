import React, { useEffect, useState } from 'react';
import { CategorySlug, Levels2Page } from './Levels2Page';
import type { PublicLevels2PageProps } from './Levels2Page';
import { client } from '../../../remoteData/client';
import { convertLevelToLatestVersion } from '../../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../../level/deserialize';

type LoadingState = 'loading' | 'error' | 'success';

async function getLevels(
	_slug: CategorySlug,
	page: number
): Promise<SerializedLevel[]> {
	const { data, error } = await client
		.from<SerializedLevel>('levels')
		.select('*, user:user_id!inner(username)')
		.eq('published', true)
		.order('updated_at', { ascending: false })
		.range(page * 10, (page + 1) * 10);

	if (error) {
		throw error;
	}

	return data ?? [];
}

function ConnectedLevels2Page(props: PublicLevels2PageProps) {
	const [page, _setPage] = useState(0);
	const [loadingState, setLoadingState] = useState<LoadingState>('loading');
	const [levels, setLevels] = useState<Level[]>([]);

	useEffect(() => {
		setLoadingState('loading');
		getLevels(props.currentSlug, page)
			.then((retrievedLevels) => {
				const convertedLevels = retrievedLevels.reduce<Level[]>(
					(building, rawLevel) => {
						const convertedLevel = convertLevelToLatestVersion(rawLevel);

						if (convertedLevel) {
							const level = {
								...convertedLevel,
								data: deserialize(convertedLevel.data),
							};
							return building.concat(level);
						} else {
							return building;
						}
					},
					[]
				);

				setLevels(convertedLevels);
				setLoadingState('success');
			})
			.catch(() => {
				setLoadingState('error');
			});
	}, [page, props.currentSlug, setLoadingState]);

	return (
		<Levels2Page
			{...props}
			loadingState={loadingState}
			levels={levels}
			currentPage={page}
			onPreviousClick={() => {}}
			onNextClick={() => {}}
		/>
	);
}

export { ConnectedLevels2Page };
