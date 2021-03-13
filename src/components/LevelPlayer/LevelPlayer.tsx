import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './LevelPlayer.module.css';
import checkerboardStyles from '../../styles/checkerboard.module.css';

type LevelPlayerProps = {
	className?: string;
	style?: CSSProperties;
	isPlaying: boolean;
	// entities: Entity[];
	// tileLayer: TileLayer;
	onPlayerDied?: () => boolean;
	onLevelCompleted?: () => void;
	provideSafetyPlatform?: boolean;
	checkeredBackground?: boolean;
	playerAtStart?: boolean;
	editUrl?: string;
	showEarlyPreviewStarburst?: boolean;
	children?: ReactNode;
};

function LevelPlayer({
	isPlaying,
	children,
	checkeredBackground,
}: LevelPlayerProps) {
	return (
		<div
			className={clsx(styles.root, 'w-full h-full overflow-hidden', {
				hidden: !isPlaying,
				grid: isPlaying,
				[checkerboardStyles.checkerboard]: checkeredBackground,
			})}
		>
			{children}
		</div>
	);
}

export { LevelPlayer };
export type { LevelPlayerProps };
