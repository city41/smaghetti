import React, { CSSProperties } from 'react';
import clsx from 'clsx';

import styles from './LevelPlayer.module.css';
import checkerboardStyles from '../../styles/checkerboard.module.css';
import { GBAPlayer } from './GBAPlayer';
import { createLevelData } from '../../levelData/createLevelData';
import { ControlsBanner } from '../ControlsBanner';

type LevelPlayerProps = {
	className?: string;
	style?: CSSProperties;
	isPlaying: boolean;
	rooms: RoomData[];
	biosFile: Uint8Array;
	romFile: Uint8Array;
	emptySaveFile: Uint8Array;
	saveState: Record<string, unknown>;
	onPlayerDied?: () => boolean;
	onLevelCompleted?: () => void;
	checkeredBackground?: boolean;
	editUrl?: string;
	showEarlyPreviewStarburst?: boolean;
};

function LevelPlayer({
	isPlaying,
	rooms,
	biosFile,
	romFile,
	emptySaveFile,
	saveState,
	checkeredBackground,
}: LevelPlayerProps) {
	return (
		<div
			className={clsx(
				styles.root,
				'w-full h-full overflow-hidden grid items-center justify-center',
				{
					hidden: !isPlaying,
					grid: isPlaying,
					[checkerboardStyles.checkerboard]: checkeredBackground,
				}
			)}
		>
			<GBAPlayer
				biosFile={biosFile}
				romFile={romFile}
				emptySaveFile={emptySaveFile}
				saveState={saveState}
				levelData={createLevelData(rooms)}
				isPlaying={isPlaying}
			/>
			<ControlsBanner className="rounded-tl-lg rounded-tr-lg" />
		</div>
	);
}

export { LevelPlayer };
export type { LevelPlayerProps };
