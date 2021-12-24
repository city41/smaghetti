import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { getPublishedLevels as getPublishedLevelsQuery } from '../../remoteData/getPublishedLevels';
import { getAllVotes as getAllVotesQuery } from '../../remoteData/getAllVotes';
import { convertLevelToLatestVersion } from '../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../level/deserialize';
import { insertVote } from '../../remoteData/insertVote';
import { logError } from '../../reporting/logError';
import { deleteVote } from '../../remoteData/deleteVote';

type LoadingState = 'dormant' | 'loading' | 'error' | 'success';
type LevelsState = {
	loadState: LoadingState;
	levels: Level[];
	votes: LevelVote[];
	votingState: Record<string, LoadingState>;
};

const initialState: LevelsState = {
	loadState: 'dormant',
	levels: [],
	votes: [],
	votingState: {},
};

const levelsSlice = createSlice({
	name: 'levels',
	initialState,
	reducers: {
		setLoadState: (state: LevelsState, action: PayloadAction<LoadingState>) => {
			state.loadState = action.payload;
		},
		setLoadedlevels: (state: LevelsState, action: PayloadAction<Level[]>) => {
			state.levels = action.payload;
		},
		setVotes: (state: LevelsState, action: PayloadAction<LevelVote[]>) => {
			state.votes = action.payload;
		},
		addVote: (state: LevelsState, action: PayloadAction<LevelVote>) => {
			const newVote = action.payload;

			if (
				!state.votes.find(
					(v) => v.levelId === newVote.levelId && v.userId === newVote.userId
				)
			) {
				state.votes.push(newVote);
			}
		},
		removeVote: (state: LevelsState, action: PayloadAction<LevelVote>) => {
			const voteToRemove = action.payload;
			state.votes = state.votes.filter(
				(v) =>
					!(
						v.levelId === voteToRemove.levelId &&
						v.userId === voteToRemove.userId
					)
			);
		},
		setVotingState: (
			state: LevelsState,
			action: PayloadAction<{ levelId: string; state: LoadingState }>
		) => {
			const { levelId, state: votingState } = action.payload;
			state.votingState[levelId] = votingState;
		},
	},
});

type LevelsSliceThunk = ThunkAction<void, AppState, null, Action>;

const loadPublishedLevels = (username?: string): LevelsSliceThunk => async (
	dispatch
) => {
	dispatch(levelsSlice.actions.setLoadState('loading'));

	try {
		const [rawLevels, votes] = await Promise.all<
			SerializedLevel[],
			LevelVote[]
		>([getPublishedLevelsQuery(username), getAllVotesQuery()]);

		const convertedLevels = rawLevels.reduce<Level[]>((building, rawLevel) => {
			const convertedLevel = convertLevelToLatestVersion(rawLevel);

			if (convertedLevel) {
				const level = {
					...convertedLevel,
					data: deserialize(convertedLevel.data),
				};
				return building.concat(level);
			} else {
				return building;
			}
		}, []);

		dispatch(levelsSlice.actions.setLoadedlevels(convertedLevels));
		dispatch(levelsSlice.actions.setVotes(votes));
		dispatch(levelsSlice.actions.setLoadState('success'));
	} catch (e) {
		dispatch(levelsSlice.actions.setLoadState('error'));
	}
};

const voteForLevel = (vote: LevelVote): LevelsSliceThunk => async (
	dispatch
) => {
	dispatch(
		levelsSlice.actions.setVotingState({
			levelId: vote.levelId,
			state: 'loading',
		})
	);

	try {
		await insertVote(vote);
		dispatch(
			levelsSlice.actions.setVotingState({
				levelId: vote.levelId,
				state: 'success',
			})
		);
		dispatch(levelsSlice.actions.addVote(vote));
	} catch (e) {
		dispatch(
			levelsSlice.actions.setVotingState({
				levelId: vote.levelId,
				state: 'error',
			})
		);
		logError({
			context: 'levelsSlice#voteForLevel',
			message: 'error voting for level',
			stack: e?.stack ?? e?.details ?? 'none',
		});
	}
};

const unvoteForLevel = (vote: LevelVote): LevelsSliceThunk => async (
	dispatch
) => {
	dispatch(
		levelsSlice.actions.setVotingState({
			levelId: vote.levelId,
			state: 'loading',
		})
	);

	try {
		await deleteVote(vote);
		dispatch(
			levelsSlice.actions.setVotingState({
				levelId: vote.levelId,
				state: 'success',
			})
		);
		dispatch(levelsSlice.actions.removeVote(vote));
	} catch (e) {
		dispatch(
			levelsSlice.actions.setVotingState({
				levelId: vote.levelId,
				state: 'error',
			})
		);
		logError({
			context: 'levelsSlice#unvoteForLevel',
			message: 'error unvoting for level',
			stack: e?.stack ?? e?.details ?? 'none',
		});
	}
};

const reducer = levelsSlice.reducer;

export { reducer, loadPublishedLevels, voteForLevel, unvoteForLevel };
export type { LevelsState };
