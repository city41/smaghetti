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
	},
});

const reducer = experimentsSlice.reducer;
const { enableInGameBinaryLevelChooser } = experimentsSlice.actions;

export { reducer, enableInGameBinaryLevelChooser };
export type { ExperimentsState };
