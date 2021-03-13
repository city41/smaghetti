import React, { ReactNode } from 'react';

import { LevelPlayer } from '../../../LevelPlayer';

type LevelPlayerProps = {
	className?: string;
	isPlaying: boolean;
	playerAtStart: boolean;
	provideSafetyPlatform: boolean;
	checkeredBackground: boolean;
	children?: ReactNode;
};

function ConnectedLevelPlayer(props: LevelPlayerProps) {
	return <LevelPlayer {...props} />;
}

export { ConnectedLevelPlayer };
