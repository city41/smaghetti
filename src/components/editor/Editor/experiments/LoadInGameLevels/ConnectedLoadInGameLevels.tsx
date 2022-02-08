import React from 'react';

import { LoadInGameLevels } from './LoadInGameLevels';
import { dispatch } from '../../../../../store';
import { loadBinaryInGameLevel } from '../../../editorSlice';
import { InGameLevelId } from '../../../../../levelData/inGameLevels';

type ConnectedLoadInGameLevelsProps = {
	onRequestClose: () => void;
};

function ConnectedLoadInGameLevels({
	onRequestClose,
}: ConnectedLoadInGameLevelsProps) {
	function handleLoad(level: InGameLevelId) {
		dispatch(loadBinaryInGameLevel(level));
		onRequestClose();
	}

	return <LoadInGameLevels onLoad={handleLoad} />;
}

export { ConnectedLoadInGameLevels };
