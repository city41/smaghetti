import React, { useState } from 'react';
import { bindActionCreators } from 'redux';

import { AppState, dispatch } from '../../../../store';
import {
	addRoom,
	deleteRoom,
	setCurrentRoomIndex,
	toggleManageRoomsMode,
	roomSettingsChange,
	RoomState,
} from '../../editorSlice';

import { ManageRooms } from './ManageRooms';
import type { PublicManageRoomsProps } from './ManageRooms';
import { useSelector } from 'react-redux';
import { ROOM_TYPE_SETTINGS } from '../../../../levelData/constants';
import { IncompatibleEntitiesWarningModal } from './IncompatibleEntitiesWarningModal';
import { entityMap, EntityType } from '../../../../entities/entityMap';
import { isCompatibleEntity } from '../../util';

const actions = bindActionCreators(
	{
		onAddRoom: addRoom,
		onDeleteRoom: deleteRoom,
		onRoomIndexChange: setCurrentRoomIndex,
		onClose: toggleManageRoomsMode,
	},
	dispatch
);

const roomTypes = Object.keys(ROOM_TYPE_SETTINGS);

function getRoomType(settings: RoomSettings): string {
	const entry = Object.entries(ROOM_TYPE_SETTINGS).find((rts) => {
		return (
			settings.graphicSet === rts[1].graphicSet &&
			settings.objectSet === rts[1].objectSet
		);
	});

	if (!entry) {
		throw new Error(
			`ConnectedManageRooms: failed to get a room type for: ${JSON.stringify(
				settings
			)}`
		);
	}

	return entry[0];
}

function isIncompatibleSwitch(room: RoomState, type: string) {
	const settings = ROOM_TYPE_SETTINGS[type as keyof typeof ROOM_TYPE_SETTINGS];

	const hasIncompatibleEntities = room.entities.some((e) => {
		return !isCompatibleEntity(e.type, settings);
	});

	const hasIncompatibleTiles = room.tiles.reduce<boolean>((building, row) => {
		if (!row) {
			return building;
		}

		return (
			building ||
			row.some((t) => {
				if (!t) {
					return false;
				}

				return !isCompatibleEntity(t.tileType, settings);
			})
		);
	}, false);

	return hasIncompatibleEntities || hasIncompatibleTiles;
}

function ConnectedManageRooms(props: PublicManageRoomsProps) {
	const [
		showIncompatibleWarningModal,
		setShowIncompatibleWarningModal,
	] = useState(false);
	const [pendingRoomTypeChange, setPendingRoomTypeChange] = useState<null | {
		index: number;
		type: string;
	}>(null);

	const { rooms, currentRoomIndex } = useSelector(
		(s: AppState) => s.editor.present
	);

	const roomsWithType = rooms.map((r) => ({
		...r,
		type: getRoomType(r.settings),
	}));

	function dispatchRoomSettingsChange(index: number, type: string) {
		dispatch(
			roomSettingsChange({
				index,
				settings: ROOM_TYPE_SETTINGS[type as keyof typeof ROOM_TYPE_SETTINGS],
			})
		);
	}

	function handleRoomTypeChange(index: number, type: string) {
		if (isIncompatibleSwitch(rooms[currentRoomIndex], type)) {
			setPendingRoomTypeChange({ index, type });
			setShowIncompatibleWarningModal(true);
		} else {
			dispatchRoomSettingsChange(index, type);
		}
	}

	function handleProceed() {
		if (!pendingRoomTypeChange) {
			throw new Error(
				'ConnectedManageRooms: handling a proceed but missing a pending room change'
			);
		}

		dispatchRoomSettingsChange(
			pendingRoomTypeChange.index,
			pendingRoomTypeChange.type
		);
		setPendingRoomTypeChange(null);
		setShowIncompatibleWarningModal(false);
	}

	return (
		<>
			<IncompatibleEntitiesWarningModal
				isOpen={showIncompatibleWarningModal}
				onCancel={() => setShowIncompatibleWarningModal(false)}
				onProceed={handleProceed}
				incompatibleType={pendingRoomTypeChange?.type}
			/>
			<ManageRooms
				{...props}
				{...actions}
				rooms={roomsWithType}
				currentRoomIndex={currentRoomIndex}
				scale={rooms[currentRoomIndex].scale}
				roomTypes={roomTypes}
				onRoomTypeChange={handleRoomTypeChange}
			/>
		</>
	);
}

export { ConnectedManageRooms };
