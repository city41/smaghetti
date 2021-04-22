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
	setTransportDestination,
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
		onTransportDestinationChange: setTransportDestination,
	},
	dispatch
);

const ConnectedCanvas: FunctionComponent<ConnectedCanvasProps> = (props) => {
	const {
		currentPaletteEntry,
		entities,
		transports,
		matrix,
		roomTileWidth,
		roomTileHeight,
		scale,
	} = useSelector((state: AppState) => state.editor.currentRoom);

	const {
		focused,
		isSelecting,
		dragOffset,
		mouseMode,
		showGrid,
		currentRoomIndex,
		rooms,
	} = useSelector((state: AppState) => state.editor.present);

	const transportDestinations = rooms.reduce<EditorTransport[]>(
		(building, room) => {
			const transportsDestinedToThisRoom = room.transports.filter(
				(t) => t.destRoom === currentRoomIndex
			);

			return building.concat(transportsDestinedToThisRoom);
		},
		[]
	);

	return (
		<Canvas
			currentPaletteEntry={currentPaletteEntry}
			width={roomTileWidth * TILE_SIZE}
			height={roomTileHeight * TILE_SIZE}
			scale={scale}
			rooms={rooms}
			currentRoomIndex={currentRoomIndex}
			entities={entities}
			transportSources={transports}
			transportDestinations={transportDestinations}
			matrix={matrix}
			focused={focused}
			isSelecting={isSelecting}
			dragOffset={dragOffset}
			mouseMode={mouseMode}
			showGrid={showGrid}
			{...actions}
			{...props}
		/>
	);
};

export { ConnectedCanvas };
