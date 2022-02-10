import React from 'react';

import { LoadInGameLevels } from './LoadInGameLevels';
import { dispatch } from '../../../../../store';
import { enableInGameBinaryLevelChooser } from '../experimentsSlice';

type ConnectedLoadInGameLevelsProps = {
	onRequestClose: () => void;
};

function ConnectedLoadInGameLevels({
	onRequestClose,
}: ConnectedLoadInGameLevelsProps) {
	function handleEnable() {
		dispatch(enableInGameBinaryLevelChooser());
		onRequestClose();
	}

	return <LoadInGameLevels onEnable={handleEnable} />;
}

export { ConnectedLoadInGameLevels };
