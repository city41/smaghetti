import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	setCurrentPaletteEntryByIndex,
	removePaletteEntry,
	addPaletteEntry,
} from '../../editorSlice';
import { AppState, dispatch } from '../../../../store';

import { Palette, PaletteProps } from './Palette';

const actions = bindActionCreators(
	{
		onPaletteEntryIndexChosen: setCurrentPaletteEntryByIndex,
		onPaletteEntryRemove: removePaletteEntry,
		onPaletteEntryAdded: addPaletteEntry,
	},
	dispatch
);

const ConnectedPalette: FunctionComponent<Partial<PaletteProps>> = (props) => {
	const { currentPaletteEntry, paletteEntries, settings } = useSelector(
		(state: AppState) => state.editor.currentRoom
	);

	return (
		<Palette
			currentPaletteEntry={currentPaletteEntry}
			paletteEntries={paletteEntries}
			currentObjectSet={settings.objectSet}
			currentGraphicSet={settings.objectGraphicSet}
			{...props}
			{...actions}
		/>
	);
};

export { ConnectedPalette };
