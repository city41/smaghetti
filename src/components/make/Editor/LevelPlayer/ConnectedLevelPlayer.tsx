import React, { ReactNode } from 'react';

type LevelPlayerProps = {
	className?: string;
	isPlaying: boolean;
	playerAtStart: boolean;
	provideSafetyPlatform: boolean;
	checkeredBackground: boolean;
	children?: ReactNode;
};

function ConnectedLevelPlayer(props: LevelPlayerProps) {
	return (
		<div>
			LevelPlayer stub
			<div>{props.children}</div>
		</div>
	);
}

export { ConnectedLevelPlayer };
