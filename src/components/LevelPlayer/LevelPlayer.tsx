import React, { CSSProperties, ReactNode } from 'react';
import ReactDOM from 'react-dom';
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
	level: LevelToLoadInGBA;
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

function BodyPortal({ children }: { children: ReactNode }) {
	return ReactDOM.createPortal(children, document.body);
}

function LevelPlayer({
	isPlaying,
	level,
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
			<BodyPortal>
				<div
					className={clsx(
						'fixed top-0 left-0 w-full h-full overflow-hidden grid place-items-center pointer-events-none',
						{
							'z-10': isPlaying,
							hidden: !isPlaying,
						}
					)}
				>
					<GBAPlayer
						biosFile={biosFile}
						romFile={romFile}
						emptySaveFile={emptySaveFile}
						saveState={saveState}
						levelData={createLevelData(level)}
						isPlaying={isPlaying}
					/>
				</div>
			</BodyPortal>
			<ControlsBanner />
		</div>
	);
}

export { LevelPlayer };
export type { LevelPlayerProps };
