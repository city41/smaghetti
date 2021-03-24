import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { getProfile } from '../../remoteData/getProfile';
import type { ProfileData } from '../../remoteData/getProfile';
import { client } from '../../remoteData/client';
import { deserialize } from '../../level/deserialize';

type ProfileState = {
	loadState: 'initial' | 'loading' | 'error' | 'success';
	user: User | null;
	levels: Level[] | null;
};

const initialState: ProfileState = {
	loadState: 'initial',
	user: null,
	levels: null,
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
		const profileData = await getProfile(user.id);
		dispatch(profileSlice.actions.setProfile(profileData));
		dispatch(profileSlice.actions.setLoadState('success'));
	} catch (e) {
		dispatch(profileSlice.actions.setLoadState('error'));
	}
};

const reducer = profileSlice.reducer;

export { reducer, loadProfile };
export type { ProfileState };
