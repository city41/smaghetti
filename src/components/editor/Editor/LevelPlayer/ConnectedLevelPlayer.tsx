import React, { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { LevelPlayer } from '../../../LevelPlayer';
import {
	getBios,
	getEmptySave,
	getRom,
	getSaveState,
} from '../../../FileLoader/files';
import { AppState } from '../../../../store';
import { moveRoomToFront } from './moveRoomToFront';

type LevelPlayerProps = {
	className?: string;
	isPlaying: boolean;
	usableWindowArea: { width: number; height: number };
	checkeredBackground: boolean;
	children?: ReactNode;
};

function ConnectedLevelPlayer(props: LevelPlayerProps) {
	const {
		playAs,
		mouseMode,
		name,
		settings,
		rooms,
		currentRoomIndex,
	} = useSelector((state: AppState) => state.editor.present);

	const level = useMemo(
		() => ({
			name,
			data: { settings, rooms: moveRoomToFront(rooms, currentRoomIndex) },
		}),
		[
			mouseMode !== 'pan' && settings,
			mouseMode !== 'pan' && rooms,
			mouseMode !== 'pan' && currentRoomIndex,
		]
	);

	const romFile = getRom();
	const biosFile = getBios();
	const emptySaveFile = getEmptySave();
	const saveState = getSaveState();

	if (!romFile || !biosFile || !emptySaveFile || !saveState) {
		if (props.isPlaying) {
			throw new Error(
				'ConnectedLevelPlayer: invoked before bios/rom/empty save/save state set'
			);
		} else {
			return null;
		}
	}

	return (
		<LevelPlayer
			{...props}
			level={level}
			playAs={playAs}
			romFile={romFile}
			biosFile={biosFile}
			emptySaveFile={emptySaveFile}
			saveState={saveState}
		/>
	);
}

export { ConnectedLevelPlayer };
