import React from 'react';
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
import { useSelector } from 'react-redux';
import { deleteLevel, togglePublishLevel } from '../../../profile/profileSlice';

function ConnectedLevelChooserModal(props: PublicLevelChooserModalProps) {
	const { levels, user: loadedUser } = useSelector(
		(state: AppState) => state.profile
	);

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
			loadingLevelsState={'none'}
			savedLevels={levels}
			isLoggedIn={false}
			isAdmin={loadedUser?.role === 'admin'}
		/>
	);
}

export { ConnectedLevelChooserModal };
