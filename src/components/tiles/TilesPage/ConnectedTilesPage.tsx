import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TilesPage } from './TilesPage';
import { AppState, dispatch } from '../../../store';
import { dump } from '../tilesSlice';

const actions = bindActionCreators(
	{
		onDumpTiles: dump,
	},
	dispatch
);

function ConnectedTilesPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	const { pages } = useSelector((state: AppState) => state.tiles);

	return <TilesPage allFilesReady={allFilesReady} pages={pages} {...actions} />;
}

export { ConnectedTilesPage };
