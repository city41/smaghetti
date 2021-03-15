import React from 'react';
import { useSelector } from 'react-redux';

import { MakePage } from './MakePage';
import { AppState } from '../../../store';

function ConnectedMakePage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	return <MakePage allFilesReady={allFilesReady} />;
}

export { ConnectedMakePage };
