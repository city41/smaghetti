import React from 'react';
import { useSelector } from 'react-redux';

import { SaveStatesPage } from './SaveStatesPage';
import { AppState } from '../../../store';

function ConnectedSaveStatesPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	return <SaveStatesPage allFilesReady={allFilesReady} />;
}

export { ConnectedSaveStatesPage };
