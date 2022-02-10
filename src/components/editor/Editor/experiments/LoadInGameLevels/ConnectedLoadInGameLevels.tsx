import React from 'react';

import { LoadInGameLevels } from './LoadInGameLevels';
import { dispatch } from '../../../../../store';
import { loadBinaryInGameLevel } from '../../../editorSlice';

type ConnectedLoadInGameLevelsProps = {
	onRequestClose: () => void;
};

function ConnectedLoadInGameLevels({
	onRequestClose,
}: ConnectedLoadInGameLevelsProps) {
	function handleLoad(level: string) {
		dispatch(loadBinaryInGameLevel(level));
		onRequestClose();
	}

	return <LoadInGameLevels onLoad={handleLoad} />;
}

export { ConnectedLoadInGameLevels };
