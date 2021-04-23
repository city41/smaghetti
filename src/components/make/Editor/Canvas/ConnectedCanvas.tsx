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
import { entityMap } from '../../../../entities/entityMap';

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

	const allTransports = rooms.reduce<EditorTransport[]>((building, room) => {
		const thisRoomTransports = room.entities.reduce<EditorTransport[]>(
			(buildingRoom, e, roomIndex) => {
				const entityDef = entityMap[e.type];

				if (entityDef.getTransports) {
					return buildingRoom.concat(
						entityDef.getTransports(roomIndex, e.x, e.y, e.settings ?? {})
					);
				} else {
					return buildingRoom;
				}
			},
			[]
		);

		return building.concat(thisRoomTransports);
	}, []);

	const transportDestinations = allTransports.filter(
		(t) => t.destRoom === currentRoomIndex
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
