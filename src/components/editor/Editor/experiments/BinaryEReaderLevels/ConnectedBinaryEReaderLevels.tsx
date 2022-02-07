import React from 'react';
import { useSelector } from 'react-redux';

import { BinaryEReaderLevels } from './BinaryEReaderLevels';
import { AppState, dispatch } from '../../../../../store';
import { loadBinaryEReaderLevel } from '../../../editorSlice';
import { downloadLevelAsLevelFile } from '../../../../../levelData/downloadLevelAsSaveFile';

type ConnectedBinaryEReaderLevelsProps = {
	onRequestClose: () => void;
};

function ConnectedBinaryEReaderLevels({
	onRequestClose,
}: ConnectedBinaryEReaderLevelsProps) {
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
		dispatch(loadBinaryEReaderLevel(file));
		onRequestClose();
	}

	return (
		<BinaryEReaderLevels
			onDownload={handleDownload}
			onBinaryLevelFile={handleBinaryLevelFile}
		/>
	);
}

export { ConnectedBinaryEReaderLevels };
