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
import { dispatch } from '../../../../store';
import { getAllLevels } from '../../../../localData/getAllLevels';
import { deleteLevel } from '../../../../localData/deleteLevel';
import { deserialize } from '../../../../level/deserialize';

type LoadingLevelState = 'loading' | 'success' | 'error';

function ConnectedLevelChooserModal(props: PublicLevelChooserModalProps) {
	const [levels, setLevels] = useState<Level[]>([]);
	const [loadingLevelState, setLoadingLevelState] = useState<LoadingLevelState>(
		'loading'
	);

	useEffect(() => {
		getAllLevels()
			.then((serializedLevels) => {
				const allLevels = serializedLevels.map((serializedLevel) => {
					const deserializedData = deserialize(serializedLevel.data);
					return {
						...serializedLevel,
						data: deserializedData,
					};
				});

				setLevels(allLevels);
				setLoadingLevelState('success');
			})
			.catch((e) => {
				console.error('error from getAllLevels', e);
				setLoadingLevelState('error');
			});
	}, []);

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

	async function handleDeleteLevel(level: Level) {
		await deleteLevel(level.id);
		const serializedLevels = await getAllLevels();
		const allLevels = serializedLevels.map((serializedLevel) => {
			const deserializedData = deserialize(serializedLevel.data);
			return {
				...serializedLevel,
				data: deserializedData,
			};
		});

		setLevels(allLevels);
	}

	return (
		<LevelChooserModal
			{...props}
			onExampleLevelChosen={handleExampleLevelChosen}
			onBlankLevelChosen={handleBlankLevelChosen}
			onLocalStorageLevelChosen={handleLocalStorageLevelChosen}
			onLevelChosen={handleLevelChosen}
			onDeleteLevel={handleDeleteLevel}
			loadingLevelsState={loadingLevelState}
			savedLevels={levels}
		/>
	);
}

export { ConnectedLevelChooserModal };
