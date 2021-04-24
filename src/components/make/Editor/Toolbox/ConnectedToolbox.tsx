import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppState, dispatch } from '../../../../store';
import {
	mouseModeChanged,
	scaleIncreased,
	scaleDecreased,
	undo,
	redo,
	toggleGrid,
	eraseLevel,
	toggleResizeMode,
} from '../../editorSlice';
import { Toolbox, PublicToolboxProps } from './Toolbox';

const actions = bindActionCreators(
	{
		onMouseModeChanged: mouseModeChanged,
		onScaleDecreased: scaleDecreased,
		onScaleIncreased: scaleIncreased,
		onUndo: undo,
		onRedo: redo,
		onToggleGrid: toggleGrid,
		onEraseLevel: eraseLevel,
		onToggleResizeMode: toggleResizeMode,
	},
	dispatch
);

function ConnectedToolbox(props: PublicToolboxProps) {
	const { mouseMode, showGrid, storedForResizeMode } = useSelector(
		(state: AppState) => state.editor.present
	);

	const {
		currentPaletteEntry,
		canIncreaseScale,
		canDecreaseScale,
	} = useSelector((state: AppState) => state.editor.currentRoom);

	const { canUndo, canRedo } = useSelector((state: AppState) => ({
		canUndo: state.editor.past.length > 0,
		canRedo: state.editor.future.length > 0,
	}));

	return (
		<Toolbox
			currentPaletteEntry={currentPaletteEntry}
			mouseMode={mouseMode}
			canIncreaseScale={canIncreaseScale}
			canDecreaseScale={canDecreaseScale}
			canUndo={canUndo}
			canRedo={canRedo}
			showGrid={showGrid}
			resizeMode={!!storedForResizeMode}
			{...actions}
			{...props}
		/>
	);
}

export { ConnectedToolbox };
