import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { LevelPlayer } from '../../../LevelPlayer';
import {
	getBios,
	getEmptySave,
	getRom,
	getSaveState,
} from '../../../FileLoader/files';
import { AppState } from '../../../../store';

type LevelPlayerProps = {
	className?: string;
	isPlaying: boolean;
	checkeredBackground: boolean;
	children?: ReactNode;
};

function ConnectedLevelPlayer(props: LevelPlayerProps) {
	const { rooms } = useSelector((state: AppState) => state.editor.present);

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

	const roomDatas: RoomData[] = rooms.map((r) => {
		return {
			entities: r.entities,
			transports: r.transports,
			tileLayer: {
				width: r.roomTileWidth,
				height: r.roomTileHeight,
				data: r.tiles,
			},
		};
	});

	return (
		<LevelPlayer
			{...props}
			rooms={roomDatas}
			romFile={romFile}
			biosFile={biosFile}
			emptySaveFile={emptySaveFile}
			saveState={saveState}
		/>
	);
}

export { ConnectedLevelPlayer };
