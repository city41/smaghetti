import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TilesPage } from './TilesPage';
import { AppState, dispatch } from '../../../store';
import { dumpCompressed, dumpUncompressed, setShift } from '../tilesSlice';

const actions = bindActionCreators(
	{
		onDumpCompressedTiles: dumpCompressed,
		onDumpUncompressedTiles: dumpUncompressed,
		onSetShift: setShift,
	},
	dispatch
);

function ConnectedTilesPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	const { pages, shift, dumpType } = useSelector(
		(state: AppState) => state.tiles
	);

	return (
		<TilesPage
			allFilesReady={allFilesReady}
			pages={pages}
			shift={shift}
			dumpType={dumpType}
			{...actions}
		/>
	);
}

export { ConnectedTilesPage };
