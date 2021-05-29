import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
	setLevelName,
	setCurrentRoomIndex,
	toggleManageLevelMode,
} from '../../editorSlice';
import { AppState, dispatch } from '../../../../store';

import { MetadataMenu } from './MetadataMenu';
import { PublicMetadataMenuProps } from './MetadataMenu';

const actions = bindActionCreators(
	{
		onSetLevelName: setLevelName,
		onRoomIndexChange: setCurrentRoomIndex,
		onManageLevelClick: toggleManageLevelMode,
	},
	dispatch
);

function ConnectedMetadataMenu(props: PublicMetadataMenuProps) {
	const { name, currentRoomIndex, rooms } = useSelector(
		(s: AppState) => s.editor.present
	);

	return (
		<MetadataMenu
			{...props}
			levelName={name}
			currentRoomIndex={currentRoomIndex}
			roomCount={rooms.length}
			{...actions}
		/>
	);
}

export { ConnectedMetadataMenu };
