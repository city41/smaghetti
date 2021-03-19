import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { PalettesPage } from './PalettesPage';
import { AppState, dispatch } from '../../../store';
import { getPalettes, getEntities } from '../palettesSlice';

function ConnectedPalettesPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);
	const { palettes, entities } = useSelector(
		(state: AppState) => state.palettes
	);

	useEffect(() => {
		if (allFilesReady) {
			dispatch(getPalettes());
			dispatch(getEntities());
		}
	}, [allFilesReady]);

	return (
		<PalettesPage
			allFilesReady={allFilesReady}
			palettes={palettes}
			entities={entities}
		/>
	);
}

export { ConnectedPalettesPage };
