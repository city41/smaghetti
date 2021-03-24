import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { getProfile as getProfileQuery } from '../../remoteData/getProfile';
import { deleteLevel as deleteLevelMutation } from '../../remoteData/deleteLevel';
import type { ProfileData } from '../../remoteData/getProfile';
import { client } from '../../remoteData/client';
import { deserialize } from '../../level/deserialize';

type DeleteState = 'deleting' | 'error' | 'success';

type ProfileState = {
	loadState: 'dormant' | 'loading' | 'error' | 'success';
	deleteState: Record<string, DeleteState>;
	user: User | null;
	levels: Level[];
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
		setProfile(state: ProfileState, action: PayloadAction<ProfileData>) {
			state.user = action.payload.user;
			state.levels = action.payload.levels.map((l) => {
				return {
					...l,
					data: deserialize(l.data).levelData,
				};
			});
		},
	},
});

type ProfileSliceThunk = ThunkAction<void, AppState, null, Action>;

const loadProfile = (): ProfileSliceThunk => async (dispatch) => {
	dispatch(profileSlice.actions.setLoadState('loading'));

	const user = client.auth.user();

	if (!user) {
		throw new Error('loadProfile: called when there is no local user');
	}

	try {
		const profileData = await getProfileQuery(user.id);
		dispatch(profileSlice.actions.setProfile(profileData));
		dispatch(profileSlice.actions.setLoadState('success'));
	} catch (e) {
		dispatch(profileSlice.actions.setLoadState('error'));
	}
};

const deleteLevel = (level: Level): ProfileSliceThunk => async (dispatch) => {
	dispatch(
		profileSlice.actions.setDeleteState({ id: level.id, state: 'deleting' })
	);
	try {
		await deleteLevelMutation(level.id);
		dispatch(
			profileSlice.actions.setDeleteState({ id: level.id, state: 'success' })
		);
		dispatch(profileSlice.actions.removeLevel(level.id));
	} catch (e) {
		dispatch(
			profileSlice.actions.setDeleteState({ id: level.id, state: 'error' })
		);
	} finally {
		setTimeout(() => {
			dispatch(profileSlice.actions.clearDeleteState(level.id));
		}, 2000);
	}
};

const reducer = profileSlice.reducer;

export { reducer, loadProfile, deleteLevel };
export type { ProfileState };
