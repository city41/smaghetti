import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { LevelsPage } from './LevelsPage';
import { AppState, dispatch } from '../../../store';
import { loadPublishedLevels } from '../levelsSlice';
import memoize from 'lodash/memoize';

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

function ConnectedLevelsPage() {
	const {
		allFilesReady,
		emptySaveFileState,
		overallExtractionState,
	} = useSelector((state: AppState) => state.fileLoader);
	const [sortType, setSortType] = useState<SortType>('likes');

	const { levels, votes, loadState } = useSelector(
		(state: AppState) => state.levels
	);

	useEffect(() => {
		dispatch(loadPublishedLevels());
	}, []);

	return (
		<LevelsPage
			allFilesReady={allFilesReady}
			emptySaveFileState={emptySaveFileState}
			extractionState={overallExtractionState}
			loadState={loadState}
			levels={sortLevels(levels, votes, sortType)}
			sortType={sortType}
			onSortTypeChange={() =>
				setSortType(sortType === 'likes' ? 'new' : 'likes')
			}
		/>
	);
}

export { ConnectedLevelsPage };
