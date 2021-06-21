import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { getPublishedLevels as getPublishedLevelsQuery } from '../../remoteData/getPublishedLevels';
import { convertLevelToLatestVersion } from '../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../level/deserialize';

type LevelsState = {
	loadState: 'dormant' | 'loading' | 'error' | 'success';
	levels: Level[];
};

const initialState: LevelsState = {
	loadState: 'dormant',
	levels: [],
};

const levelsSlice = createSlice({
	name: 'levels',
	initialState,
	reducers: {
		setLoadState: (
			state: LevelsState,
			action: PayloadAction<LevelsState['loadState']>
		) => {
			state.loadState = action.payload;
		},
		setLoadedlevels: (state: LevelsState, action: PayloadAction<Level[]>) => {
			state.levels = action.payload;
		},
	},
});

type LevelsSliceThunk = ThunkAction<void, AppState, null, Action>;

const loadPublishedLevels = (): LevelsSliceThunk => async (dispatch) => {
	dispatch(levelsSlice.actions.setLoadState('loading'));

	try {
		const rawLevels = await getPublishedLevelsQuery();

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
		dispatch(levelsSlice.actions.setLoadState('success'));
	} catch (e) {
		dispatch(levelsSlice.actions.setLoadState('error'));
	}
};

const reducer = levelsSlice.reducer;

export { reducer, loadPublishedLevels };
export type { LevelsState };
