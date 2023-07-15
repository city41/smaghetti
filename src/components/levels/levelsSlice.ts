import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';

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

const loadPublishedLevels = (_username?: string): LevelsSliceThunk => async (
	_dispatch
) => {
	// dispatch(levelsSlice.actions.setLoadState('loading'));
	// try {
	// 	const [rawLevels, votes] = await Promise.all<
	// 		SerializedLevel[],
	// 		LevelVote[]
	// 	>([getPublishedLevelsQuery(username), getAllVotesQuery()]);
	// 	const convertedLevels = rawLevels.reduce<Level[]>((building, rawLevel) => {
	// 		const convertedLevel = convertLevelToLatestVersion(rawLevel);
	// 		if (convertedLevel) {
	// 			const level = {
	// 				...convertedLevel,
	// 				data: deserialize(convertedLevel.data),
	// 			};
	// 			return building.concat(level);
	// 		} else {
	// 			return building;
	// 		}
	// 	}, []);
	// 	dispatch(levelsSlice.actions.setLoadedlevels(convertedLevels));
	// 	dispatch(levelsSlice.actions.setVotes(votes));
	// 	dispatch(levelsSlice.actions.setLoadState('success'));
	// } catch (e) {
	// 	dispatch(levelsSlice.actions.setLoadState('error'));
	// }
};

const voteForLevel = (_vote: LevelVote): LevelsSliceThunk => async (
	_dispatch
) => {
	// TODO: get rid of voting
};

const unvoteForLevel = (_vote: LevelVote): LevelsSliceThunk => async (
	_dispatch
) => {
	// TODO: get rid of voting
};

const reducer = levelsSlice.reducer;

export { reducer, loadPublishedLevels, voteForLevel, unvoteForLevel };
export type { LevelsState };
