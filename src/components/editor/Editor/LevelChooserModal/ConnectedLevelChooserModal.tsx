import React, { useEffect, useState } from 'react';
import {
	LevelChooserModal,
	PublicLevelChooserModalProps,
} from './LevelChooserModal';
import {
	loadExampleLevel,
	loadBlankLevel,
	setLevel,
	loadFromLocalStorage,
} from '../../editorSlice';
import { AppState, dispatch } from '../../../../store';
import { client } from '../../../../remoteData/client';
import { useSelector } from 'react-redux';
import {
	deleteLevel,
	loadProfile,
	togglePublishLevel,
} from '../../../profile/profileSlice';

function ConnectedLevelChooserModal(props: PublicLevelChooserModalProps) {
	const [localUser, setLocalUser] = useState(client.auth.user());

	const { loadState, levels, user: loadedUser } = useSelector(
		(state: AppState) => state.profile
	);

	useEffect(() => {
		client.auth.onAuthStateChange(() => {
			setLocalUser(client.auth.user());
		});
	}, []);

	useEffect(() => {
		if (localUser && props.isOpen) {
			dispatch(loadProfile());
		}
	}, [localUser, dispatch, props.isOpen]);

	function handleExampleLevelChosen() {
		dispatch(loadExampleLevel());
		props.onRequestClose();
	}

	function handleLocalStorageLevelChosen() {
		dispatch(loadFromLocalStorage());
		props.onRequestClose();
	}

	function handleBlankLevelChosen() {
		dispatch(loadBlankLevel());
		props.onRequestClose();
	}

	function handleLevelChosen(level: Level) {
		dispatch(setLevel(level));
		props.onRequestClose();
	}

	function handleDeleteLevel(level: Level | BrokenLevel) {
		dispatch(deleteLevel(level));
	}

	function handleTogglePublishLevel(level: Level) {
		dispatch(togglePublishLevel(level));
	}

	return (
		<LevelChooserModal
			{...props}
			onExampleLevelChosen={handleExampleLevelChosen}
			onBlankLevelChosen={handleBlankLevelChosen}
			onLocalStorageLevelChosen={handleLocalStorageLevelChosen}
			onLevelChosen={handleLevelChosen}
			onDeleteLevel={handleDeleteLevel}
			onTogglePublishLevel={handleTogglePublishLevel}
			loadingLevelsState={localUser ? loadState : 'none'}
			savedLevels={levels}
			isLoggedIn={!!localUser}
			isAdmin={loadedUser?.role === 'admin'}
		/>
	);
}

export { ConnectedLevelChooserModal };
