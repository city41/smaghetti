import React from 'react';
import { useSelector } from 'react-redux';

import { BinaryLevels } from './BinaryLevels';
import { AppState, dispatch } from '../../../../../store';
import { loadBinaryLevel } from '../../../editorSlice';
import { downloadLevelAsLevelFile } from '../../../../../levelData/downloadLevelAsSaveFile';

type ConnectedBinaryLevelsProps = {
	onRequestClose: () => void;
};

function ConnectedBinaryLevels({ onRequestClose }: ConnectedBinaryLevelsProps) {
	const { rooms, settings, name } = useSelector(
		(state: AppState) => state.editor.present
	);

	function handleDownload() {
		const level: LevelToLoadInGBA = {
			name,
			data: {
				settings,
				rooms,
			},
		};

		downloadLevelAsLevelFile(level);
		onRequestClose();
	}

	function handleBinaryLevelFile(file: File) {
		dispatch(loadBinaryLevel(file));
		onRequestClose();
	}

	return (
		<BinaryLevels
			onDownload={handleDownload}
			onBinaryLevelFile={handleBinaryLevelFile}
		/>
	);
}

export { ConnectedBinaryLevels };
