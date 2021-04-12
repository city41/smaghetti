import React from 'react';
import { bindActionCreators } from 'redux';

import { AppState, dispatch } from '../../../../store';
import {
	addRoom,
	deleteRoom,
	setCurrentRoomIndex,
	toggleManageRoomsMode,
} from '../../editorSlice';

import { ManageRooms } from './ManageRooms';
import type { PublicManageRoomsProps } from './ManageRooms';
import { useSelector } from 'react-redux';

const actions = bindActionCreators(
	{
		onAddRoom: addRoom,
		onDeleteRoom: deleteRoom,
		onRoomIndexChange: setCurrentRoomIndex,
		onClose: toggleManageRoomsMode,
	},
	dispatch
);

function ConnectedManageRooms(props: PublicManageRoomsProps) {
	const { rooms, currentRoomIndex } = useSelector(
		(s: AppState) => s.editor.present
	);

	return (
		<ManageRooms
			{...props}
			{...actions}
			rooms={rooms}
			currentRoomIndex={currentRoomIndex}
			scale={rooms[currentRoomIndex].scale}
		/>
	);
}

export { ConnectedManageRooms };
