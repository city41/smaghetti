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
	resetViewport,
} from '../../editorSlice';
import { Toolbox, PublicToolboxProps } from './Toolbox';
import { useRouter } from 'next/router';

const actions = bindActionCreators(
	{
		onMouseModeChanged: mouseModeChanged,
		onResetViewport: resetViewport,
		onScaleDecreased: scaleDecreased,
		onScaleIncreased: scaleIncreased,
		onUndo: undo,
		onRedo: redo,
		onToggleGrid: toggleGrid,
	},
	dispatch
);

function ConnectedToolbox(props: PublicToolboxProps) {
	const router = useRouter();

	const { mouseMode, showGrid } = useSelector(
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

	function handleEraseLevel() {
		dispatch(eraseLevel());
		router.replace('/editor');
	}

	return (
		<Toolbox
			currentPaletteEntry={currentPaletteEntry}
			mouseMode={mouseMode}
			canIncreaseScale={canIncreaseScale}
			canDecreaseScale={canDecreaseScale}
			canUndo={canUndo}
			canRedo={canRedo}
			showGrid={showGrid}
			onEraseLevel={handleEraseLevel}
			{...actions}
			{...props}
		/>
	);
}

export { ConnectedToolbox };
