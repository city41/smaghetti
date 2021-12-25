import React, { useEffect, useState } from 'react';
import { CategorySlug, Levels2Page } from './Levels2Page';
import type { PublicLevels2PageProps } from './Levels2Page';
import { client } from '../../../remoteData/client';
import { convertLevelToLatestVersion } from '../../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../../level/deserialize';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';

type LoadingState = 'loading' | 'error' | 'success';

type FlatSerializedLevel = Omit<SerializedLevel, 'user'> & { username: string };

async function getLevels(
	slug: CategorySlug,
	page: number
): Promise<FlatSerializedLevel[]> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let query: any;

	switch (slug) {
		case 'newest':
			query = client.rpc('get_newest_published_levels', {
				current_user_id: null,
			});
			break;
		case 'popular':
			query = client.rpc('get_most_popular_published_levels');
			break;
		case 'e-coin':
			query = client.rpc('get_published_levels_that_have_ecoins');
			break;
		default:
			break;
	}

	const { data, error } = await query.range(page * 10, (page + 1) * 10 - 1);

	if (error) {
		throw error;
	}

	return data ?? [];
}

function ConnectedLevels2Page(props: PublicLevels2PageProps) {
	const [page, setPage] = useState(0);
	const [loadingState, setLoadingState] = useState<LoadingState>('loading');
	const [levels, setLevels] = useState<Level[]>([]);

	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	useEffect(() => {
		setLoadingState('loading');
		getLevels(props.currentSlug, page)
			.then((retrievedLevels) => {
				const convertedLevels = retrievedLevels.reduce<Level[]>(
					(building, rawLevel) => {
						const serializedLevel = {
							...rawLevel,
							user: {
								username: rawLevel.username,
							},
						};

						const convertedLevel = convertLevelToLatestVersion(serializedLevel);

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
			allFilesReady={allFilesReady}
			loadingState={loadingState}
			levels={levels}
			currentPage={page}
			onPreviousClick={() => {
				setPage((p) => Math.max(0, p - 1));
			}}
			onNextClick={() => {
				// TODO: what to do when run out of pages?
				setPage((p) => p + 1);
			}}
		/>
	);
}

export { ConnectedLevels2Page };
