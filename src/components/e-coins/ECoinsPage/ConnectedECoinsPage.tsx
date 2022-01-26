import React, { useEffect, useState } from 'react';
import { ECoinsPage, PublicECoinsPageProps } from './ECoinsPage';
import { client } from '../../../remoteData/client';
import { convertLevelToLatestVersion } from '../../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../../level/deserialize';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import { CategoryUserOrder } from '../../levels/Levels2Page/categories';

type LoadingState = 'loading' | 'error' | 'success';

type FlatSerializedLevel = Omit<SerializedLevel, 'user'> & {
	username: string;
	total_vote_count: number;
	current_user_voted: boolean;
};

const PAGE_SIZE = 20;

const userOrderToOrderColumn: Record<CategoryUserOrder, string> = {
	newest: 'updated_at',
	popular: 'total_vote_count',
};

async function getLevels(
	page: number,
	order: CategoryUserOrder
): Promise<{ levels: FlatSerializedLevel[]; totalCount: number }> {
	const { error, data, count } = await client
		.rpc('get_published_levels_that_have_ecoins', { count: 'exact' })
		.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
		.order(userOrderToOrderColumn[order], { ascending: false });

	if (error) {
		throw error;
	}

	return { levels: data ?? [], totalCount: count ?? 0 };
}

function ConnectedECoinsPage(props: PublicECoinsPageProps) {
	const [page, setPage] = useState(0);
	const [loadingState, setLoadingState] = useState<LoadingState>('loading');
	const [levels, setLevels] = useState<Level[]>([]);
	const [totalCount, setTotalCount] = useState(0);

	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	useEffect(() => {
		setPage(0);
		setLevels([]);
		setLoadingState('loading');
	}, [props.currentOrder]);

	useEffect(() => {
		setLoadingState('loading');
		getLevels(page, props.currentOrder)
			.then(({ levels: retrievedLevels, totalCount: retrievedTotalCount }) => {
				const convertedLevels = retrievedLevels.reduce<Level[]>(
					(building, rawLevel) => {
						const convertedLevel = convertLevelToLatestVersion(rawLevel);

						if (convertedLevel) {
							const level: Level = {
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
				setTotalCount(retrievedTotalCount);
				setLoadingState('success');
			})
			.catch(() => {
				setLoadingState('error');
			});
	}, [page, props.currentOrder, setLoadingState]);

	return (
		<ECoinsPage
			{...props}
			allFilesReady={allFilesReady}
			loadingState={loadingState}
			levels={levels}
			totalCount={totalCount}
			pageSize={PAGE_SIZE}
			currentPage={page}
			onPreviousClick={() => {
				setPage((p) => Math.max(0, p - 1));
			}}
			onNextClick={() => {
				setPage((p) => p + 1);
			}}
		/>
	);
}

export { ConnectedECoinsPage };
