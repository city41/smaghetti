import { Action, createSlice, ThunkAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { entityMap } from '../../../../entities/entityMap';
import { compress } from '../../../../levelData/compress';
import {
	createLevelData,
	getAllEntities,
} from '../../../../levelData/createLevelData';
import { sendBlobToAnchorTag } from '../../../../levelData/downloadLevelAsSaveFile';
import {
	createOverwrite1_1IPSPatch,
	createVCIPSPatch,
} from '../../../../levelData/ipsPatches';
import { convertASCIIToLevelName } from '../../../../levelData/util';
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

const downloadOverwriteClassic1_1InVCVersionIPS = (): ExperimentThunk => (
	_dispatch,
	getState
) => {
	const appState = getState();

	const name = appState.editor.present.name;
	const level: LevelToLoadInGBA = {
		name,
		data: {
			rooms: appState.editor.present.rooms,
			settings: appState.editor.present.settings,
		},
	};

	const allEntities = getAllEntities(level.data.rooms);

	const aceCoinCount =
		allEntities.filter((e) => e.type === 'AceCoin').length +
		allEntities.filter(
			(e) => e.type === 'Bubble' && e.settings?.payload === 'AceCoin'
		).length;

	const levelData = createLevelData(level);
	const compressed1 = compress(levelData, 0);
	const compressed2 = compress(levelData, 0x80);

	const compressed =
		compressed1.length < compressed2.length ? compressed1 : compressed2;

	const nameAsBinary = convertASCIIToLevelName(name);

	const eCoinDataProvider = allEntities.find((e) =>
		entityMap[e.type].getECoinTileData?.(e)
	);

	const eCoinTileData = eCoinDataProvider
		? entityMap[eCoinDataProvider.type].getECoinTileData!(eCoinDataProvider)!
		: null;

	const compressedLevels = [];
	const names = [];
	const aceCoins = [];
	const eCoinTileDatas = [];

	for (let i = 0; i < 1; ++i) {
		compressedLevels.push(compressed);
		names.push(nameAsBinary);
		aceCoins.push(aceCoinCount);
		eCoinTileDatas.push(eCoinTileData);
	}

	const ips = createVCIPSPatch(
		compressedLevels,
		names,
		aceCoins,
		eCoinTileDatas
	);

	const fileBlob = new Blob([ips.buffer], {
		type: 'application/octet-stream',
	});

	sendBlobToAnchorTag(fileBlob, 'sma4_classic1_1_wiiu_vc_overwrite.ips');
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
	downloadOverwriteClassic1_1InVCVersionIPS,
};
export type { ExperimentsState };
