import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppState, dispatch } from '../../../../store';
import {
	editorVisibleWindowChanged,
	selectDrag,
	dragComplete,
	pan,
	popPan,
	pushPan,
} from '../../editorSlice';

import {
	CanvasOffsetContainer,
	CanvasOffsetContainerProps,
} from './CanvasOffsetContainer';

const actions = bindActionCreators(
	{
		onEditorVisibleWindowChanged: editorVisibleWindowChanged,
		onSelectDrag: selectDrag,
		onDragComplete: dragComplete,
		onPan: pan,
		onPressForPan: pushPan,
		onLiftFromPan: popPan,
	},
	dispatch
);

// TODO: switch this to the public/internal approach
function ConnectedCanvasOffsetContainer(
	props: Partial<CanvasOffsetContainerProps>
) {
	const { mouseMode, dragOffset } = useSelector(
		(state: AppState) => state.editor.present
	);
	const { scrollOffset, scale } = useSelector(
		(state: AppState) => state.editor.currentRoom
	);

	return (
		<CanvasOffsetContainer
			offset={scrollOffset}
			scale={scale}
			mouseMode={mouseMode}
			dragOffset={dragOffset}
			{...actions}
			{...props}
		/>
	);
}

export { ConnectedCanvasOffsetContainer };
