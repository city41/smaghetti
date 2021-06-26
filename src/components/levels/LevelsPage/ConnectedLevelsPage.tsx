import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { LevelsPage } from './LevelsPage';
import { AppState, dispatch } from '../../../store';
import { loadPublishedLevels } from '../levelsSlice';

function ConnectedLevelsPage() {
	const {
		allFilesReady,
		emptySaveFileState,
		overallExtractionState,
	} = useSelector((state: AppState) => state.fileLoader);
	const { levels, loadState } = useSelector((state: AppState) => state.levels);

	useEffect(() => {
		dispatch(loadPublishedLevels());
	}, []);

	return (
		<LevelsPage
			allFilesReady={allFilesReady}
			emptySaveFileState={emptySaveFileState}
			extractionState={overallExtractionState}
			loadState={loadState}
			levels={levels}
		/>
	);
}

export { ConnectedLevelsPage };
