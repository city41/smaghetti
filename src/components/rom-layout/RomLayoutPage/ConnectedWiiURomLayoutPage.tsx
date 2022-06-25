import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RomLayoutPage } from './RomLayoutPage';
import { AppState, dispatch } from '../../../store';
import { loadSections } from '../romLayoutSlice';

function ConnectedWiiURomLayoutPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);
	const { sections } = useSelector((state: AppState) => state.romLayout);

	useEffect(() => {
		if (allFilesReady) {
			dispatch(loadSections());
		}
	}, [allFilesReady]);

	return (
		<RomLayoutPage
			allFilesReady={allFilesReady}
			sections={sections}
			mode="any"
		/>
	);
}

export { ConnectedWiiURomLayoutPage };
