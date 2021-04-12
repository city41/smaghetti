import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
	setLevelName,
	setCurrentRoomIndex,
	toggleManageRoomsMode,
} from '../../editorSlice';
import { AppState, dispatch } from '../../../../store';

import { MetadataMenu } from './MetadataMenu';
import { PublicMetadataMenuProps } from './MetadataMenu';

const actions = bindActionCreators(
	{
		onSetLevelName: setLevelName,
		onRoomIndexChange: setCurrentRoomIndex,
		onManageRoomsClick: toggleManageRoomsMode,
	},
	dispatch
);

function ConnectedMetadataMenu(props: PublicMetadataMenuProps) {
	const { metadata, currentRoomIndex, rooms } = useSelector(
		(s: AppState) => s.editor.present
	);

	return (
		<MetadataMenu
			{...props}
			levelName={metadata.name}
			currentRoomIndex={currentRoomIndex}
			roomCount={rooms.length}
			{...actions}
		/>
	);
}

export { ConnectedMetadataMenu };
