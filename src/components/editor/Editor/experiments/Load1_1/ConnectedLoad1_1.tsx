import React from 'react';

import { Load1_1 } from './Load1_1';
import { dispatch } from '../../../../../store';
import { loadBinaryInGameLevel } from '../../../editorSlice';

type ConnectedLoad1_1LevelsProps = {
	onRequestClose: () => void;
};

function ConnectedLoad1_1({ onRequestClose }: ConnectedLoad1_1LevelsProps) {
	function handleLoad1_1() {
		dispatch(loadBinaryInGameLevel('1-1'));
		onRequestClose();
	}

	return <Load1_1 onClick={handleLoad1_1} />;
}

export { ConnectedLoad1_1 };
