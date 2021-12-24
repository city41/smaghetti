import React, { useEffect, useState } from 'react';
import { AppState, dispatch } from '../../../store';
import { useSelector } from 'react-redux';
import memoize from 'lodash/memoize';
import { loadPublishedLevels } from '../levelsSlice';
import { LevelsPage } from '../LevelsPage/LevelsPage';

type ConnectedCreatorLevelsPageProps = {
	creator: string;
};

type SortType = 'likes' | 'new';

function getVoteCount(levelId: string, votes: LevelVote[]): number {
	return votes.filter((v) => v.levelId === levelId).length;
}

function sortLevelsByVotes(levels: Level[], votes: LevelVote[]): Level[] {
	const memoizedGetVoteCount = memoize(getVoteCount);

	return [...levels].sort((a, b) => {
		return (
			memoizedGetVoteCount(b.id, votes) - memoizedGetVoteCount(a.id, votes)
		);
	});
}

function sortLevelsByNew(levels: Level[]): Level[] {
	return [...levels].sort((a, b) => {
		return (
			new Date(b.updated_at!).getTime() - new Date(a.updated_at!).getTime()
		);
	});
}

function sortLevels(
	levels: Level[],
	votes: LevelVote[],
	sortType: SortType
): Level[] {
	switch (sortType) {
		case 'likes': {
			return sortLevelsByVotes(levels, votes);
		}
		case 'new': {
			return sortLevelsByNew(levels);
		}
	}
}

function ConnectedCreatorLevelsPage({
	creator,
}: ConnectedCreatorLevelsPageProps) {
	const { allFilesReady, emptySaveFileState } = useSelector(
		(state: AppState) => state.fileLoader
	);
	const [sortType, setSortType] = useState<SortType>('likes');

	const { levels, votes, loadState } = useSelector(
		(state: AppState) => state.levels
	);

	useEffect(() => {
		if (creator) {
			dispatch(loadPublishedLevels(creator));
		}
	}, [creator]);

	const title = loadState === 'success' ? `${creator}'s levels` : 'loading...';

	return (
		<LevelsPage
			allFilesReady={allFilesReady}
			emptySaveFileState={emptySaveFileState}
			loadState={loadState}
			levels={sortLevels(levels, votes, sortType)}
			sortType={sortType}
			headerTitle={title}
			pageTitle={title}
			hideHelpCallout
			onSortTypeChange={() =>
				setSortType(sortType === 'likes' ? 'new' : 'likes')
			}
			noPublishedLevelsNode={
				<>This creator hasn&apos;t created a level yet :(</>
			}
		/>
	);
}

export { ConnectedCreatorLevelsPage };
