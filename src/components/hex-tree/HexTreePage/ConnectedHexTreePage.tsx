import React from 'react';
import { useSelector } from 'react-redux';

import { HexTreePage } from './HexTreePage';
import { AppState } from '../../../store';

function ConnectedHexTreePage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	return <HexTreePage allFilesReady={allFilesReady} />;
}

export { ConnectedHexTreePage };
