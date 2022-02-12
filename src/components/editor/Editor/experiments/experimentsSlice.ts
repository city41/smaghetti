import { createSlice } from '@reduxjs/toolkit';

type ExperimentsState = {
	inGameBinaryLevelChooser: boolean;
};

const defaultInitialState: ExperimentsState = {
	inGameBinaryLevelChooser: false,
};

const initialState = defaultInitialState;

const experimentsSlice = createSlice({
	name: 'experiments',
	initialState,
	reducers: {
		enableInGameBinaryLevelChooser(state: ExperimentsState) {
			state.inGameBinaryLevelChooser = true;
		},
		disableInGameBinaryLevelChooser(state: ExperimentsState) {
			state.inGameBinaryLevelChooser = false;
		},
	},
});

const reducer = experimentsSlice.reducer;
const {
	enableInGameBinaryLevelChooser,
	disableInGameBinaryLevelChooser,
} = experimentsSlice.actions;

export {
	reducer,
	enableInGameBinaryLevelChooser,
	disableInGameBinaryLevelChooser,
};
export type { ExperimentsState };
