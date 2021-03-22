import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { getProfile } from '../../remoteData/getProfile';
import type { ProfileData } from '../../remoteData/getProfile';
import { client } from '../../remoteData/client';

type ProfileState = {
	user: User | null;
	levels: Level[] | null;
	loading: boolean;
	loadError?: string | null;
};

const initialState: ProfileState = {
	user: null,
	levels: null,
	loading: false,
	loadError: null,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		loadingProfile: (state: ProfileState, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		profileLoadSuccess: (
			state: ProfileState,
			action: PayloadAction<ProfileData>
		) => {
			state.user = action.payload.user;
			state.levels = action.payload.levels;
		},
		loadError: (state: ProfileState, action: PayloadAction<string>) => {
			state.loadError = action.payload;
		},
	},
});

type ProfileSliceThunk = ThunkAction<void, AppState, null, Action>;

const loadProfile = (): ProfileSliceThunk => async (dispatch) => {
	dispatch(profileSlice.actions.loadingProfile(true));

	const user = client.auth.user();

	if (!user) {
		throw new Error('loadProfile: called when there is no local user');
	}

	try {
		const profileData = await getProfile(user.id);
		dispatch(profileSlice.actions.profileLoadSuccess(profileData));
	} catch (e) {
		dispatch(profileSlice.actions.loadError(e.message || ''));
	} finally {
		dispatch(profileSlice.actions.loadingProfile(false));
	}
};

const reducer = profileSlice.reducer;

export { reducer, loadProfile };
export type { ProfileState };
