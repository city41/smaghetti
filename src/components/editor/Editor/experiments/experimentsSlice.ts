import { Action, createSlice, ThunkAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { createLevelData } from '../../../../levelData/createLevelData';
import { sendBlobToAnchorTag } from '../../../../levelData/downloadLevelAsSaveFile';
import { createOverwrite1_1IPSPatch } from '../../../../levelData/level1_1';
import { AppState } from '../../../../store';

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

type ExperimentThunk = ThunkAction<void, AppState, null, Action>;

const downloadIPS = (): ExperimentThunk => (_dispatch, getState) => {
	const appState = getState();

	const room0 = appState.editor.present.rooms[0];
	const level: LevelToLoadInGBA = {
		name: '1-1 IPS',
		data: {
			rooms: [room0],
			settings: {
				timer: 300,
			},
		},
	};

	const levelData = createLevelData(level);

	const ips = createOverwrite1_1IPSPatch(levelData);

	const fileBlob = new Blob([ips.buffer], {
		type: 'application/octet-stream',
	});

	sendBlobToAnchorTag(fileBlob, 'sma4_1_1_overwrite.ips');
};

const reducer = experimentsSlice.reducer;
const {
	enableInGameBinaryLevelChooser,
	disableInGameBinaryLevelChooser,
} = experimentsSlice.actions;

export {
	reducer,
	enableInGameBinaryLevelChooser,
	disableInGameBinaryLevelChooser,
	downloadIPS,
};
export type { ExperimentsState };
