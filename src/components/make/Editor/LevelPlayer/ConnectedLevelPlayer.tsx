import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { LevelPlayer } from '../../../LevelPlayer';
import { getBios, getEmptySave, getRom } from '../../../FileLoader/files';
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
	const emptySaveFile = getEmptySave();

	if (!romFile || !biosFile || !emptySaveFile) {
		throw new Error(
			'ConnectedLevelPlayer: invoked before bios/rom/empty save set'
		);
	}

	return (
		<LevelPlayer
			{...props}
			romFile={romFile}
			biosFile={biosFile}
			emptySaveFile={emptySaveFile}
			entities={entities}
		/>
	);
}

export { ConnectedLevelPlayer };
