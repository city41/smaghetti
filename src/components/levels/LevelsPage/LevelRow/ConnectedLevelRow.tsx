import React from 'react';

import { LevelRow, PublicLevelRowProps } from './LevelRow';

function ConnectedLevelRow(props: PublicLevelRowProps) {
	return (
		<>
			<LevelRow
				{...props}
				voteCount={0}
				currentUserVoted={false}
				isVoting={false}
				onVoteClick={() => {}}
			/>
		</>
	);
}

export { ConnectedLevelRow };
