import React, { useEffect, useState } from 'react';
import { Levels2Page } from './Levels2Page';
import type { CategorySlug, CategoryUserOrder } from './categories';
import type { PublicLevels2PageProps } from './Levels2Page';
import { convertLevelToLatestVersion } from '../../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../../level/deserialize';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import { TOTAL_COUNT_MAP } from '../_totalCountMap';

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

const FileRootMap: Record<CategorySlug, string> = {
	all: 'get_all_published_levels',
	'by-tag': 'get_published_levels_with_tags',
	coins: 'get_published_levels_that_have_special_coins',
};

async function getLevels(
	slug: CategorySlug,
	order: CategoryUserOrder,
	tag: string | undefined,
	page: number
): Promise<{ levels: FlatSerializedLevel[]; totalCount: number }> {
	if (slug === 'by-tag' && !tag) {
		return { levels: [], totalCount: 0 };
	}

	const fileRoot = FileRootMap[slug];

	const url = `/level-archive/${fileRoot}_order${order}_offset${
		page * PAGE_SIZE
	}_limit${PAGE_SIZE}${slug === 'by-tag' ? '_tag' + tag : ''}.json`;

	const request = await fetch(url);
	const data = await request.json();

	const totalCount = tag ? TOTAL_COUNT_MAP[tag] : TOTAL_COUNT_MAP[fileRoot];

	return { levels: data, totalCount };
}

function ConnectedLevels2Page(props: PublicLevels2PageProps) {
	const [page, setPage] = useState(0);
	const [loadingState, setLoadingState] = useState<LoadingState>('loading');
	const [levels, setLevels] = useState<LevelWithVoting[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const { allFilesReady, emptySaveFileState } = useSelector(
		(state: AppState) => state.fileLoader
	);

	useEffect(() => {
		setPage(0);
		setLevels([]);
		setLoadingState('loading');
	}, [props.currentSlug, props.currentOrder, props.tag]);

	useEffect(() => {
		setLoadingState('loading');
		getLevels(props.currentSlug, props.currentOrder, props.tag, page)
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
	}, [page, props.currentSlug, props.currentOrder, props.tag, setLoadingState]);

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
