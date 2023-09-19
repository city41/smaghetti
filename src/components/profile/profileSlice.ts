import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';

type DeleteState = 'deleting' | 'error' | 'success';

type ProfileState = {
	loadState: 'dormant' | 'loading' | 'error' | 'success';
	deleteState: Record<string, DeleteState>;
	user: User | null;
	levels: Array<Level | BrokenLevel>;
};

const initialState: ProfileState = {
	loadState: 'dormant',
	deleteState: {},
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
		clearDeleteState(state: ProfileState, action: PayloadAction<string>) {
			delete state.deleteState[action.payload];
		},
		removeLevel(state: ProfileState, action: PayloadAction<string>) {
			state.levels = state.levels.filter((l) => l.id !== action.payload);
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

const reducer = profileSlice.reducer;

export { reducer, loadProfile, deleteLevel };
export type { ProfileState };
