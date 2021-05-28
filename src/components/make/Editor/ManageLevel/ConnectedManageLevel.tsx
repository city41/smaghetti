import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';

import { AppState, dispatch } from '../../../../store';
import {
	addRoom,
	deleteRoom,
	setCurrentRoomIndex,
	toggleManageLevelMode,
	roomSettingsChange,
} from '../../editorSlice';

import { ManageLevel } from './ManageLevel';
import type { PublicManageLevelProps } from './ManageLevel';
import { useSelector } from 'react-redux';
import { ROOM_TYPE_SETTINGS } from '../../../../levelData/constants';
import { IncompatibleEntitiesWarningModal } from './IncompatibleEntitiesWarningModal';

const actions = bindActionCreators(
	{
		onAddRoom: addRoom,
		onDeleteRoom: deleteRoom,
		onRoomIndexChange: setCurrentRoomIndex,
		onClose: toggleManageLevelMode,
	},
	dispatch
);

const roomTypes = Object.keys(ROOM_TYPE_SETTINGS);

function getRoomType(settings: RoomSettings): string {
	const entry = Object.entries(ROOM_TYPE_SETTINGS).find((rts) => {
		return isEqual(settings, rts[1]);
	});

	if (!entry) {
		throw new Error(
			`ConnectedManageLevel: failed to get a room type for: ${JSON.stringify(
				settings
			)}`
		);
	}

	return entry[0];
}

function ConnectedManageLevel(props: PublicManageLevelProps) {
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
		dispatchRoomSettingsChange(index, type);
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
			<ManageLevel
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

export { ConnectedManageLevel };
