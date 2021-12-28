import React, { useEffect, useState } from 'react';
import { CategorySlug, Levels2Page } from './Levels2Page';
import type { PublicLevels2PageProps } from './Levels2Page';
import { client } from '../../../remoteData/client';
import { convertLevelToLatestVersion } from '../../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../../level/deserialize';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import { SignInJoinModal } from '../../auth/SignInJoinModal';
import { deleteVote } from '../../../remoteData/deleteVote';
import { insertVote } from '../../../remoteData/insertVote';

type LoadingState = 'loading' | 'error' | 'success';
type LevelWithVoting = Level & {
	voteCount: number;
	currentUserVoted: boolean;
	loading?: boolean;
};

type FlatSerializedLevel = Omit<SerializedLevel, 'user'> & {
	username: string;
	total_vote_count: number;
	current_user_voted: boolean;
};

const PAGE_SIZE = 20;

const slugToRpc: Record<CategorySlug, string> = {
	popular: 'get_most_popular_published_levels',
	coins: 'get_published_levels_that_have_special_coins',
	'dev-favs': 'get_devs_favs_published_levels',
	newest: 'get_newest_published_levels',
	'by-tag': '',
};

async function getLevels(
	slug: CategorySlug,
	page: number,
	userId: string | undefined
): Promise<{ levels: FlatSerializedLevel[]; totalCount: number }> {
	const params = { current_user_id: userId ?? '' };

	const rpcFunc = slugToRpc[slug];

	const { data, error, count } = await client
		.rpc(rpcFunc, params, { count: 'exact' })
		.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

	if (error) {
		throw error;
	}

	return { levels: data ?? [], totalCount: count ?? 0 };
}

function ConnectedLevels2Page(props: PublicLevels2PageProps) {
	const [page, setPage] = useState(0);
	const [loadingState, setLoadingState] = useState<LoadingState>('loading');
	const [levels, setLevels] = useState<LevelWithVoting[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [userId, setUserId] = useState<string | undefined>(
		client.auth.user()?.id
	);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [
		pendingLevelVote,
		setPendingLevelVote,
	] = useState<LevelWithVoting | null>(null);

	const { allFilesReady, emptySaveFileState } = useSelector(
		(state: AppState) => state.fileLoader
	);

	useEffect(() => {
		client.auth.onAuthStateChange(() => {
			setUserId(client.auth.user()?.id);
		});
	}, []);

	useEffect(() => {
		setPage(0);
		setLevels([]);
		setLoadingState('loading');
	}, [props.currentSlug]);

	useEffect(() => {
		setLoadingState('loading');
		getLevels(props.currentSlug, page, userId)
			.then(({ levels: retrievedLevels, totalCount: retrievedTotalCount }) => {
				const convertedLevels = retrievedLevels.reduce<LevelWithVoting[]>(
					(building, rawLevel) => {
						const serializedLevel = {
							...rawLevel,
							user: {
								username: rawLevel.username,
							},
						};

						const convertedLevel = convertLevelToLatestVersion(serializedLevel);

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
				setTotalCount(retrievedTotalCount);
				setLoadingState('success');
			})
			.catch(() => {
				setLoadingState('error');
			});
	}, [page, props.currentSlug, setLoadingState, userId]);

	async function handleVoteClick(level: LevelWithVoting) {
		setLevels((levels) => {
			return levels.map((l) => {
				if (l.id === level.id) {
					return {
						...l,
						loading: true,
					};
				} else {
					return l;
				}
			});
		});

		if (!userId) {
			setShowLoginModal(true);
			setPendingLevelVote(level);
		} else {
			const vote = { userId: userId!, levelId: level.id };
			if (level.currentUserVoted) {
				await deleteVote(vote);
				setLevels((levels) => {
					return levels.map((l) => {
						if (l.id === level.id) {
							return {
								...l,
								voteCount: l.voteCount - 1,
								currentUserVoted: false,
								loading: false,
							};
						} else {
							return l;
						}
					});
				});
			} else {
				await insertVote(vote);
				setLevels((levels) => {
					return levels.map((l) => {
						if (l.id === level.id) {
							return {
								...l,
								voteCount: l.voteCount + 1,
								currentUserVoted: true,
								loading: false,
							};
						} else {
							return l;
						}
					});
				});
			}
		}
	}

	const modal = showLoginModal ? (
		<SignInJoinModal
			initialMode="join-to-vote"
			onClose={() => setShowLoginModal(false)}
			onUser={(user) => {
				setShowLoginModal(false);
				setUserId(user.id);

				if (pendingLevelVote) {
					handleVoteClick(pendingLevelVote);
				}
			}}
		/>
	) : null;

	return (
		<>
			<Levels2Page
				{...props}
				allFilesReady={allFilesReady}
				emptySaveFileState={emptySaveFileState}
				loadingState={loadingState}
				levels={levels}
				totalCount={totalCount}
				pageSize={PAGE_SIZE}
				currentPage={page}
				onPreviousClick={() => {
					setPage((p) => Math.max(0, p - 1));
				}}
				onNextClick={() => {
					// TODO: what to do when run out of pages?
					setPage((p) => p + 1);
				}}
				onVoteClick={handleVoteClick}
			/>
			{modal}
		</>
	);
}

export { ConnectedLevels2Page };
export type { LevelWithVoting };
