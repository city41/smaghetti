import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LevelRow, PublicLevelRowProps } from './LevelRow';
import { AppState, dispatch } from '../../../../store';
import { client } from '../../../../remoteData/client';
import { unvoteForLevel, voteForLevel } from '../../levelsSlice';
import { SignInJoinModal } from '../../../auth/SignInJoinModal';

const actions = bindActionCreators(
	{
		onVote: voteForLevel,
		onUnvote: unvoteForLevel,
	},
	dispatch
);

function ConnectedLevelRow(props: PublicLevelRowProps) {
	const { votes, votingState } = useSelector((state: AppState) => state.levels);
	const [showModal, setShowModal] = useState(false);
	const [userId, setUserId] = useState<string | undefined>(
		client.auth.user()?.id
	);
	const [pendingLevelVoteId, setPendingLevelVoteId] = useState<string | null>(
		null
	);

	useEffect(() => {
		client.auth.onAuthStateChange(() => {
			setUserId(client.auth.user()?.id);
		});
	}, []);

	const levelId = props.level.id;

	const voteCount = votes.filter((v) => v.levelId === levelId).length;

	const currentUserVoted = votes.some(
		(v) => v.userId === userId && v.levelId === levelId
	);

	function handleVoteClick() {
		if (!userId) {
			setShowModal(true);
			setPendingLevelVoteId(levelId);
		} else {
			const vote = { userId: userId!, levelId };
			if (currentUserVoted) {
				actions.onUnvote(vote);
			} else {
				actions.onVote(vote);
			}
		}
	}

	const modal = showModal ? (
		<SignInJoinModal
			initialMode="join-to-vote"
			onClose={() => setShowModal(false)}
			onUser={(user) => {
				setShowModal(false);
				setUserId(user.id);

				if (pendingLevelVoteId) {
					actions.onVote({ userId: user.id, levelId: pendingLevelVoteId });
				}
			}}
		/>
	) : null;

	return (
		<>
			<LevelRow
				{...props}
				voteCount={voteCount}
				currentUserVoted={currentUserVoted}
				isVoting={votingState[levelId] === 'loading'}
				onVoteClick={handleVoteClick}
			/>
			{modal}
		</>
	);
}

export { ConnectedLevelRow };
