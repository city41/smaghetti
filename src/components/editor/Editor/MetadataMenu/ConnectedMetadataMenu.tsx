import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
	setCurrentRoomIndex,
	toggleManageLevelMode,
	saveLevelCopy,
} from '../../editorSlice';
import { AppState, dispatch } from '../../../../store';

import { MetadataMenu } from './MetadataMenu';
import { PublicMetadataMenuProps } from './MetadataMenu';

const actions = bindActionCreators(
	{
		onRoomIndexChange: setCurrentRoomIndex,
		onManageLevelClick: toggleManageLevelMode,
	},
	dispatch
);

function ConnectedMetadataMenu(props: PublicMetadataMenuProps) {
	const {
		savedLevelId,
		name,
		currentRoomIndex,
		rooms,
		storedForManageLevelMode,
	} = useSelector((s: AppState) => s.editor.present);

	function handleSaveLevelCopy() {
		dispatch(saveLevelCopy());
	}

	return (
		<MetadataMenu
			{...props}
			isManagingLevel={!!storedForManageLevelMode}
			levelName={name}
			currentRoomIndex={currentRoomIndex}
			roomCount={rooms.length}
			{...actions}
			onSaveLevelCopy={savedLevelId ? handleSaveLevelCopy : undefined}
		/>
	);
}

export { ConnectedMetadataMenu };
