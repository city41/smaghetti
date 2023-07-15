import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { isBrokenLevel } from '../editor/Editor/LevelChooserModal/util';

type DeleteState = 'deleting' | 'error' | 'success';
type TogglePublishState = 'toggling' | 'error' | 'success';

type ProfileState = {
	loadState: 'dormant' | 'loading' | 'error' | 'success';
	deleteState: Record<string, DeleteState>;
	publishState: Record<string, TogglePublishState>;
	user: User | null;
	levels: Array<Level | BrokenLevel>;
};

const initialState: ProfileState = {
	loadState: 'dormant',
	deleteState: {},
	publishState: {},
	user: null,
	levels: [],
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setLoadState: (
			state: ProfileState,
			action: PayloadAction<ProfileState['loadState']>
		) => {
			state.loadState = action.payload;
		},
		setDeleteState: (
			state: ProfileState,
			action: PayloadAction<{ id: string; state: DeleteState }>
		) => {
			const { id, state: deleteState } = action.payload;
			state.deleteState = {
				...state.deleteState,
				[id]: deleteState,
			};
		},
		setPublishState: (
			state: ProfileState,
			action: PayloadAction<{ id: string; state: TogglePublishState }>
		) => {
			const { id, state: publishState } = action.payload;
			state.publishState = {
				...state.publishState,
				[id]: publishState,
			};
		},
		clearDeleteState(state: ProfileState, action: PayloadAction<string>) {
			delete state.deleteState[action.payload];
		},
		clearPublishState(state: ProfileState, action: PayloadAction<string>) {
			delete state.publishState[action.payload];
		},
		removeLevel(state: ProfileState, action: PayloadAction<string>) {
			state.levels = state.levels.filter((l) => l.id !== action.payload);
		},
		togglePublished(state: ProfileState, action: PayloadAction<string>) {
			const level = state.levels.find((l) => l.id === action.payload);

			if (level && !isBrokenLevel(level)) {
				level.published = !level.published;
			}
		},
		setProfile() {},
	},
});

type ProfileSliceThunk = ThunkAction<void, AppState, null, Action>;

const loadProfile = (): ProfileSliceThunk => async (_dispatch) => {
	// TODO: delete profiles
};

const deleteLevel = (_level: Level | BrokenLevel): ProfileSliceThunk => async (
	_dispatch
) => {};

const togglePublishLevel = (_level: Level): ProfileSliceThunk => async (
	_dispatch
) => {
	// TODO: remove publishing levels
};

const reducer = profileSlice.reducer;

export { reducer, loadProfile, deleteLevel, togglePublishLevel };
export type { ProfileState };
