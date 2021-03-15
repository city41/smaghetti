import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './LevelPlayer.module.css';
import checkerboardStyles from '../../styles/checkerboard.module.css';
import { GBAPlayer } from './GBAPlayer';
import { createLevelData } from '../../levelData/createLevelData';

type LevelPlayerProps = {
	className?: string;
	style?: CSSProperties;
	isPlaying: boolean;
	entities: Entity[];
	// tileLayer: TileLayer;
	biosFile: Uint8Array;
	romFile: Uint8Array;
	emptySaveFile: Uint8Array;
	onPlayerDied?: () => boolean;
	onLevelCompleted?: () => void;
	checkeredBackground?: boolean;
	editUrl?: string;
	showEarlyPreviewStarburst?: boolean;
	children?: ReactNode;
};

function LevelPlayer({
	isPlaying,
	entities,
	biosFile,
	romFile,
	emptySaveFile,
	children,
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
				levelData={createLevelData(entities)}
				isPlaying={isPlaying}
			/>
			{children}
		</div>
	);
}

export { LevelPlayer };
export type { LevelPlayerProps };
