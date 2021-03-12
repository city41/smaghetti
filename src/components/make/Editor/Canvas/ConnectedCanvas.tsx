import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
	entityDropped,
	painted,
	deleteFocused,
	scaleDecreased,
	scaleIncreased,
	setEntitySettings,
} from '../../editorSlice';
import { TILE_SIZE } from '../../../../tiles/constants';
import { AppState, dispatch } from '../../../../store';

import { Canvas, CanvasProps } from './Canvas';

type ConnectedCanvasProps = Partial<CanvasProps>;

const actions = bindActionCreators(
	{
		onEntityDropped: entityDropped,
		onPainted: painted,
		onDeleteFocused: deleteFocused,
		onScaleDecreased: scaleDecreased,
		onScaleIncreased: scaleIncreased,
		onEntitySettingsChange: setEntitySettings,
	},
	dispatch
);

const ConnectedCanvas: FunctionComponent<ConnectedCanvasProps> = (props) => {
	const {
		currentPaletteEntry,
		entities,
		focused,
		isSelecting,
		dragOffset,
		tiles,
		mouseMode,
		levelTileWidth,
		levelTileHeight,
		scale,
		showGhosts,
		ghosts,
		showGrid,
	} = useSelector((state: AppState) => state.editor.present);

	return (
		<Canvas
			currentPaletteEntry={currentPaletteEntry}
			width={levelTileWidth * TILE_SIZE}
			height={levelTileHeight * TILE_SIZE}
			scale={scale}
			entities={entities}
			focused={focused}
			isSelecting={isSelecting}
			dragOffset={dragOffset}
			tiles={tiles}
			ghosts={showGhosts ? ghosts : []}
			mouseMode={mouseMode}
			showGrid={showGrid}
			{...actions}
			{...props}
		/>
	);
};

export { ConnectedCanvas };
