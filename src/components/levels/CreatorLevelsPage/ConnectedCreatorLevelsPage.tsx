import React, { useEffect, useState } from 'react';
import { LevelsPage } from '../LevelsPage/LevelsPage';
import { AppState } from '../../../store';
import { useSelector } from 'react-redux';
import { LevelWithVoting } from '../Levels2Page/ConnectedLevels2Page';
import { convertLevelToLatestVersion } from '../../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../../level/deserialize';

type ConnectedCreatorLevelsPageProps = {
	creator: string;
};

type LoadState = 'dormant' | 'loading' | 'success' | 'error';

type FlatSerializedLevel = Omit<SerializedLevel, 'user'> & {
	username: string;
	total_vote_count: number;
	current_user_voted: boolean;
};

async function getLevels(creator: string): Promise<FlatSerializedLevel[]> {
	const url = `/level-archive/creator_levels_${creator}.json`;

	const request = await fetch(url);
	return request.json();
}

function ConnectedCreatorLevelsPage({
	creator,
}: ConnectedCreatorLevelsPageProps) {
	const [loadingState, setLoadingState] = useState<LoadState>('dormant');
	const [levels, setLevels] = useState<LevelWithVoting[]>([]);

	const { allFilesReady, emptySaveFileState } = useSelector(
		(state: AppState) => state.fileLoader
	);

	useEffect(() => {
		if (creator) {
			setLoadingState('loading');
			getLevels(creator)
				.then((retrievedLevels) => {
					const convertedLevels = retrievedLevels.reduce<LevelWithVoting[]>(
						(building, rawLevel) => {
							const serializedLevel = {
								...rawLevel,
								user: {
									username: creator,
								},
							};

							const convertedLevel = convertLevelToLatestVersion(
								serializedLevel
							);

							if (convertedLevel) {
								const level: LevelWithVoting = {
									...convertedLevel,
									voteCount: rawLevel.total_vote_count,
									currentUserVoted: rawLevel.current_user_voted,
									data: deserialize(convertedLevel.data),
								};
								return building.concat(level);
							} else {
								return building;
							}
						},
						[]
					);

					setLevels(convertedLevels);
					setLoadingState('success');
				})
				.catch(() => {
					setLoadingState('error');
				});
		}
	}, [creator]);

	const title =
		loadingState === 'success' ? `${creator}'s levels` : 'loading...';

	return (
		<LevelsPage
			allFilesReady={allFilesReady}
			emptySaveFileState={emptySaveFileState}
			loadState={loadingState}
			levels={levels}
			headerTitle={title}
			pageTitle={title}
			hideHelpCallout
			hideVotes
			noPublishedLevelsNode={
				<>This creator hasn&apos;t created a level yet :(</>
			}
		/>
	);
}

export { ConnectedCreatorLevelsPage };
