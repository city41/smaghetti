import React, { useEffect, useState } from 'react';
import { Levels2Page } from './Levels2Page';
import type { CategorySlug, CategoryUserOrder } from './categories';
import type { PublicLevels2PageProps } from './Levels2Page';
import { client } from '../../../remoteData/client';
import { convertLevelToLatestVersion } from '../../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../../level/deserialize';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';

type LoadingState = 'loading' | 'error' | 'success';
type LevelWithVoting = Level & {
	voteCount: number;
	currentUserVoted: boolean;
	loading?: boolean;
};

type FlatSerializedLevel = Omit<SerializedLevel, 'user'> & {
	username: string;
	total_vote_count: number;
	current_user_voted: boolean;
};

const PAGE_SIZE = 20;

const slugToRpc: Record<CategorySlug, string> = {
	coins: 'get_published_levels_that_have_special_coins',
	'dev-favs': 'get_devs_favs_published_levels',
	all: 'get_all_published_levels',
	'by-tag': 'get_published_levels_with_tags',
};

const userOrderToOrderColumn: Record<CategoryUserOrder, string> = {
	newest: 'updated_at',
	popular: 'total_vote_count',
};

async function getLevels(
	slug: CategorySlug,
	order: CategoryUserOrder,
	tags: string[] | undefined,
	page: number,
	userId: string | undefined
): Promise<{ levels: FlatSerializedLevel[]; totalCount: number }> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const params: Record<string, any> = { current_user_id: userId ?? '' };

	if (slug === 'by-tag') {
		if (!tags || tags.length === 0) {
			return { levels: [], totalCount: 0 };
		}

		params.matching_tags = tags;
	}

	const rpcFunc = slugToRpc[slug];

	const { error, data, count } = await client
		.rpc(rpcFunc, params, { count: 'exact' })
		.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
		.order(userOrderToOrderColumn[order], { ascending: false });

	if (error) {
		throw error;
	}

	return { levels: data ?? [], totalCount: count ?? 0 };
}

function ConnectedLevels2Page(props: PublicLevels2PageProps) {
	const [page, setPage] = useState(0);
	const [loadingState, setLoadingState] = useState<LoadingState>('loading');
	const [levels, setLevels] = useState<LevelWithVoting[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [userId, setUserId] = useState<string | undefined>(
		client.auth.user()?.id
	);

	const { allFilesReady, emptySaveFileState } = useSelector(
		(state: AppState) => state.fileLoader
	);

	useEffect(() => {
		client.auth.onAuthStateChange(() => {
			setUserId(client.auth.user()?.id);
		});
	}, []);

	useEffect(() => {
		setPage(0);
		setLevels([]);
		setLoadingState('loading');
	}, [props.currentSlug, props.currentOrder, props.tags]);

	useEffect(() => {
		setLoadingState('loading');
		getLevels(props.currentSlug, props.currentOrder, props.tags, page, userId)
			.then(({ levels: retrievedLevels, totalCount: retrievedTotalCount }) => {
				const convertedLevels = retrievedLevels.reduce<LevelWithVoting[]>(
					(building, rawLevel) => {
						const serializedLevel = {
							...rawLevel,
							user: {
								username: rawLevel.username,
							},
						};

						const convertedLevel = convertLevelToLatestVersion(serializedLevel);

						if (convertedLevel) {
							const level: LevelWithVoting = {
								...convertedLevel,
								voteCount: rawLevel.total_vote_count,
								currentUserVoted: rawLevel.current_user_voted,
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
	}, [
		page,
		props.currentSlug,
		props.currentOrder,
		props.tags,
		setLoadingState,
		userId,
	]);

	return (
		<>
			<Levels2Page
				{...props}
				allFilesReady={allFilesReady}
				emptySaveFileState={emptySaveFileState}
				loadingState={loadingState}
				levels={levels}
				totalCount={totalCount}
				pageSize={PAGE_SIZE}
				currentPage={page}
				onPreviousClick={() => {
					setPage((p) => Math.max(0, p - 1));
				}}
				onNextClick={() => {
					// TODO: what to do when run out of pages?
					setPage((p) => p + 1);
				}}
				onVoteClick={() => {}}
			/>
		</>
	);
}

export { ConnectedLevels2Page };
export type { LevelWithVoting };
