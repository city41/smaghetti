import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { LevelPlayer } from '../../../LevelPlayer';
import { getBios, getRom } from '../../../FileLoader/files';
import { AppState } from '../../../../store';

type LevelPlayerProps = {
	className?: string;
	isPlaying: boolean;
	checkeredBackground: boolean;
	children?: ReactNode;
};

function ConnectedLevelPlayer(props: LevelPlayerProps) {
	const { entities } = useSelector((state: AppState) => state.editor.present);

	const romFile = getRom();
	const biosFile = getBios();

	if (!romFile || !biosFile) {
		throw new Error('ConnectedLevelPlayer: invoked before bios/rom set');
	}

	return (
		<LevelPlayer
			{...props}
			romFile={romFile}
			biosFile={biosFile}
			entities={entities}
		/>
	);
}

export { ConnectedLevelPlayer };
