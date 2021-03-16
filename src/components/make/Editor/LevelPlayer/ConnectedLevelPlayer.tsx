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
	const { entities, tiles, levelTileWidth, levelTileHeight } = useSelector(
		(state: AppState) => state.editor.present
	);

	const romFile = getRom();
	const biosFile = getBios();
	const emptySaveFile = getEmptySave();

	if (!romFile || !biosFile || !emptySaveFile) {
		if (props.isPlaying) {
			throw new Error(
				'ConnectedLevelPlayer: invoked before bios/rom/empty save set'
			);
		} else {
			return null;
		}
	}

	const tileLayer = {
		width: levelTileWidth,
		height: levelTileHeight,
		data: tiles,
	};

	return (
		<LevelPlayer
			{...props}
			tileLayer={tileLayer}
			romFile={romFile}
			biosFile={biosFile}
			emptySaveFile={emptySaveFile}
			entities={entities}
		/>
	);
}

export { ConnectedLevelPlayer };
