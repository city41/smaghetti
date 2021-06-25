import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	setCurrentPaletteEntryByIndex,
	removePaletteEntry,
	addPaletteEntry,
} from '../../editorSlice';
import { AppState, dispatch } from '../../../../store';

import { Palette, PublicPaletteProps } from './Palette';

const actions = bindActionCreators(
	{
		onPaletteEntryIndexChosen: setCurrentPaletteEntryByIndex,
		onPaletteEntryRemove: removePaletteEntry,
		onPaletteEntryAdded: addPaletteEntry,
	},
	dispatch
);

function ConnectedPalette(props: PublicPaletteProps) {
	const { currentPaletteEntry, paletteEntries, validEntityTypes } = useSelector(
		(state: AppState) => state.editor.currentRoom
	);

	return (
		<Palette
			currentPaletteEntry={currentPaletteEntry}
			paletteEntries={paletteEntries}
			validEntityTypes={validEntityTypes}
			{...props}
			{...actions}
		/>
	);
}

export { ConnectedPalette };
