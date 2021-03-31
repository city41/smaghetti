import React from 'react';
import { useSelector } from 'react-redux';

import { HexEditorPage } from './HexEditorPage';
import { AppState } from '../../../store';

function ConnectedHexEditorPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	return <HexEditorPage allFilesReady={allFilesReady} />;
}

export { ConnectedHexEditorPage };
