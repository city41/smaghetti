import React from 'react';
import { LevelsPage } from './LevelsPage';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';

function ConnectedLevelsPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	return <LevelsPage allFilesReady={allFilesReady} />;
}

export { ConnectedLevelsPage };
