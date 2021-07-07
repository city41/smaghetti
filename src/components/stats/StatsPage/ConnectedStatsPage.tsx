import React from 'react';
import { useSelector } from 'react-redux';

import { StatsPage } from './StatsPage';
import { AppState } from '../../../store';

function ConnectedStatsPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	return <StatsPage allFilesReady={allFilesReady} />;
}

export { ConnectedStatsPage };
