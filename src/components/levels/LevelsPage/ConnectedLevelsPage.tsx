import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { LevelsPage } from './LevelsPage';
import { AppState, dispatch } from '../../../store';
import { loadPublishedLevels } from '../levelsSlice';
import memoize from 'lodash/memoize';

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

function ConnectedLevelsPage() {
	const {
		allFilesReady,
		emptySaveFileState,
		overallExtractionState,
	} = useSelector((state: AppState) => state.fileLoader);
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
			levels={sortLevelsByVotes(levels, votes)}
		/>
	);
}

export { ConnectedLevelsPage };
