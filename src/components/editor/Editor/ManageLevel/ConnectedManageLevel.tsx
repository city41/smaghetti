import React, { useState } from 'react';
import { bindActionCreators } from 'redux';

import { AppState, dispatch } from '../../../../store';
import {
	addRoom,
	deleteRoom,
	setCurrentRoomIndex,
	toggleManageLevelMode,
	roomSettingsChange,
	setTimer,
	setLevelName,
	roomSizeChange,
} from '../../editorSlice';

import { ManageLevel } from './ManageLevel';
import type { PublicManageLevelProps } from './ManageLevel';
import { useSelector } from 'react-redux';
import { ROOM_BACKGROUND_SETTINGS } from '../../../../levelData/constants';
import { IncompatibleEntitiesWarningModal } from './IncompatibleEntitiesWarningModal';

const actions = bindActionCreators(
	{
		onAddRoom: addRoom,
		onDeleteRoom: deleteRoom,
		onRoomIndexChange: setCurrentRoomIndex,
		onClose: toggleManageLevelMode,
		onTimerChange: setTimer,
		onLevelNameChange: setLevelName,
		onRoomSettingsChange: roomSettingsChange,
		onRoomSizeChange: roomSizeChange,
	},
	dispatch
);

const roomTypes = Object.keys(ROOM_BACKGROUND_SETTINGS).sort();

// TODO: since RoomBackgroundSettings are bundled and unlikely to be unbundled,
// should just the string "underground", "fortress" etc be set in state?
function getRoomType(settings: RoomSettings): string {
	const entry = Object.entries(ROOM_BACKGROUND_SETTINGS).find((rts) => {
		return (
			settings.bgGraphic === rts[1].bgGraphic &&
			settings.bgExtraColorAndEffect === rts[1].bgExtraColorAndEffect
		);
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

	const { rooms, currentRoomIndex, name, settings } = useSelector(
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
				settings:
					ROOM_BACKGROUND_SETTINGS[
						type as keyof typeof ROOM_BACKGROUND_SETTINGS
					],
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
				levelName={name}
				levelSettings={settings}
				rooms={roomsWithType}
				currentRoomIndex={currentRoomIndex}
				roomTypes={roomTypes}
				onRoomTypeChange={handleRoomTypeChange}
			/>
		</>
	);
}

export { ConnectedManageLevel };
