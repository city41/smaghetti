import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
// @ts-ignore no types
import * as sha1 from 'js-sha1';
import { AppState } from '../../store';
import {
	setBios,
	setRom,
	setEmptySave,
	setSaveState,
	setExampleLevel,
} from './files';
import { getRom } from './files';
import { entityMap, EntityType } from '../../entities/entityMap';
import { extractResourcesToStylesheet } from '../../tiles/extractResourcesToStylesheet';
import { deserialize as deserializeSaveState } from '../../saveStates/serializer';
import { resourceMap } from '../../resources/resourceMap';
import { Resource } from '../../resources/types';

// indicates which type of a rom we're currently using
// some pages require v1.1, others wii-u, and some will work with either.
// this is because the wii-u rom's first half is identical to the 1.1. rom
// any allows any file at all. This is used by wiiu-rom-layout-page to allow
// inspection of patched ROMs
type RomMode = '1.1' | 'wiiu' | 'both' | 'any' | 'none';

type RomFileState =
	| 'not-chosen'
	| 'loading'
	| 'success'
	| 'checksum-error'
	| 'wrong-version-error'
	| 'wiiu-version-error'
	| 'sma4-11-version-error'
	| 'error';
type OtherFilesState = 'loading' | 'success' | 'error';

type ExtractionState = 'not-started' | 'extracting' | 'complete';

type FileLoaderState = {
	mode: RomMode;
	romFileState: RomFileState;
	biosFileState: OtherFilesState;
	emptySaveFileState: OtherFilesState;
	saveStateJsonState: OtherFilesState;
	exampleLevelState: OtherFilesState;

	otherFilesState: OtherFilesState;
	allFilesReady: boolean;
	overallExtractionState: ExtractionState;
	extractionGraphicState: {
		done: number;
		total: number;
		mostRecentlyFinished: string | null;
	};
};

const SMA4_SHA = '532f3307021637474b6dd37da059ca360f612337';
// the sha for the old v1 version of the rom
const SMA4_V1_SHA = '69e81f41394f02d64cad206adb26b3cd43690770';
const WIIU_SHA = 'dd2879329ec52bd5372f26b75297a67f1a81215a';

const defaultInitialState: FileLoaderState = {
	mode: '1.1',
	romFileState: 'not-chosen',
	biosFileState: 'loading',
	emptySaveFileState: 'loading',
	saveStateJsonState: 'loading',
	exampleLevelState: 'loading',
	otherFilesState: 'loading',
	allFilesReady: false,
	overallExtractionState: 'not-started',
	extractionGraphicState: {
		done: 0,
		total: 0,
		mostRecentlyFinished: null,
	},
};

const initialState = defaultInitialState;

function settleState(state: FileLoaderState) {
	const states = [
		state.emptySaveFileState,
		state.biosFileState,
		state.saveStateJsonState,
		state.exampleLevelState,
	];

	if (states.some((s) => s === 'error')) {
		state.otherFilesState = 'error';
	} else if (states.some((s) => s === 'loading')) {
		state.otherFilesState = 'loading';
	} else {
		state.otherFilesState = 'success';
	}

	state.allFilesReady =
		state.otherFilesState === 'success' &&
		(state.mode === 'none' || state.romFileState === 'success') &&
		state.overallExtractionState === 'complete';
}

const fileLoaderSlice = createSlice({
	name: 'fileLoader',
	initialState,
	reducers: {
		setMode(
			state: FileLoaderState,
			action: PayloadAction<RomMode | undefined | null>
		) {
			state.mode = action.payload ?? '1.1';
		},
		// reducers related to the base files
		biosState(state: FileLoaderState, action: PayloadAction<OtherFilesState>) {
			state.biosFileState = action.payload;
			settleState(state);
		},
		romState(state: FileLoaderState, action: PayloadAction<RomFileState>) {
			state.romFileState = action.payload;
			settleState(state);
		},
		emptySaveState(
			state: FileLoaderState,
			action: PayloadAction<OtherFilesState>
		) {
			state.emptySaveFileState = action.payload;
			settleState(state);
		},
		saveStateJsonState(
			state: FileLoaderState,
			action: PayloadAction<OtherFilesState>
		) {
			state.saveStateJsonState = action.payload;
			settleState(state);
		},
		exampleLevelState(
			state: FileLoaderState,
			action: PayloadAction<OtherFilesState>
		) {
			state.exampleLevelState = action.payload;
			settleState(state);
		},
		overallExtractionState(
			state: FileLoaderState,
			action: PayloadAction<ExtractionState>
		) {
			state.overallExtractionState = action.payload;
			settleState(state);
		},
		setExtractionSize(
			state: FileLoaderState,
			action: PayloadAction<{
				done: number;
				total: number;
			}>
		) {
			const { done, total } = action.payload;

			state.extractionGraphicState.done = done;
			state.extractionGraphicState.total = total;
		},
		finishedExtracting(state: FileLoaderState, action: PayloadAction<string>) {
			const mostRecentlyFinished = action.payload;
			state.extractionGraphicState.mostRecentlyFinished = mostRecentlyFinished;
			state.extractionGraphicState.done += 1;
		},
	},
});

type FileLoaderThunk = ThunkAction<void, AppState, null, Action>;

const loadRom = (file: File): FileLoaderThunk => async (dispatch, getState) => {
	try {
		dispatch(fileLoaderSlice.actions.romState('loading'));

		const reader = new FileReader();
		reader.addEventListener('loadend', () => {
			const romFile = new Uint8Array(reader.result as ArrayBuffer);

			const sha = sha1(romFile);

			const { mode } = getState().fileLoader;

			if (mode === 'wiiu') {
				if (sha === SMA4_V1_SHA) {
					dispatch(fileLoaderSlice.actions.romState('wrong-version-error'));
				} else if (sha === SMA4_SHA) {
					dispatch(fileLoaderSlice.actions.romState('sma4-11-version-error'));
				} else if (sha !== WIIU_SHA) {
					dispatch(fileLoaderSlice.actions.romState('checksum-error'));
				} else {
					setRom(romFile);
					dispatch(fileLoaderSlice.actions.romState('success'));
				}
			} else if (mode === '1.1') {
				if (sha === SMA4_V1_SHA) {
					dispatch(fileLoaderSlice.actions.romState('wrong-version-error'));
				} else if (sha === WIIU_SHA) {
					dispatch(fileLoaderSlice.actions.romState('wiiu-version-error'));
				} else if (sha !== SMA4_SHA) {
					dispatch(fileLoaderSlice.actions.romState('checksum-error'));
				} else {
					setRom(romFile);
					dispatch(fileLoaderSlice.actions.romState('success'));
				}
			} else if (mode === 'both') {
				if (sha !== SMA4_V1_SHA && sha !== WIIU_SHA) {
					dispatch(fileLoaderSlice.actions.romState('wrong-version-error'));
				} else {
					setRom(romFile);
					dispatch(fileLoaderSlice.actions.romState('success'));
				}
			} else {
				// any
				setRom(romFile);
				dispatch(fileLoaderSlice.actions.romState('success'));
			}
		});

		reader.addEventListener('error', () => {
			dispatch(fileLoaderSlice.actions.romState('error'));
		});

		reader.readAsArrayBuffer(file);
	} catch (e) {
		dispatch(fileLoaderSlice.actions.romState('error'));
	}
};

const loadEmptySave = (): FileLoaderThunk => async (dispatch) => {
	try {
		dispatch(fileLoaderSlice.actions.emptySaveState('loading'));

		fetch('/empty.sav')
			.then((r) => r.blob())
			.then((blob) => {
				const reader = new FileReader();
				reader.addEventListener('loadend', () => {
					setEmptySave(new Uint8Array(reader.result as ArrayBuffer));
					dispatch(fileLoaderSlice.actions.emptySaveState('success'));
				});

				reader.addEventListener('error', (e) => {
					console.error('failed to load empty save', e);
					dispatch(fileLoaderSlice.actions.emptySaveState('error'));
				});

				reader.readAsArrayBuffer(blob);
			})
			.catch((e) => {
				console.error('failed to load empty save', e);
				dispatch(fileLoaderSlice.actions.emptySaveState('error'));
			});
	} catch (e) {
		console.error('failed to load empty save', e);
		dispatch(fileLoaderSlice.actions.emptySaveState('error'));
	}
};

const loadSaveState = (): FileLoaderThunk => async (dispatch) => {
	try {
		dispatch(fileLoaderSlice.actions.saveStateJsonState('loading'));

		fetch('/justOutsideEReaderMenu.json')
			.then((r) => r.text())
			.then((saveStateText) => {
				const saveState = deserializeSaveState(saveStateText);
				setSaveState(saveState);
				dispatch(fileLoaderSlice.actions.saveStateJsonState('success'));
			})
			.catch((e) => {
				console.error('failed to load save state json', e);
				dispatch(fileLoaderSlice.actions.saveStateJsonState('error'));
			});
	} catch (e) {
		console.error('failed to load save state json', e);
		dispatch(fileLoaderSlice.actions.saveStateJsonState('error'));
	}
};

const loadExampleLevel = (): FileLoaderThunk => async (dispatch) => {
	try {
		dispatch(fileLoaderSlice.actions.exampleLevelState('loading'));

		fetch('/exampleLevel.json')
			.then((r) => r.text())
			.then((exampleLevelText) => {
				const serializedExampleLevel = JSON.parse(
					exampleLevelText
				) as SerializedLevel;
				setExampleLevel(serializedExampleLevel);
				dispatch(fileLoaderSlice.actions.exampleLevelState('success'));
			})
			.catch((e) => {
				console.error('failed to load example level', e);
				dispatch(fileLoaderSlice.actions.exampleLevelState('error'));
			});
	} catch (e) {
		console.error('failed to load example level', e);
		dispatch(fileLoaderSlice.actions.exampleLevelState('error'));
	}
};

const loadBios = (): FileLoaderThunk => async (dispatch) => {
	try {
		dispatch(fileLoaderSlice.actions.biosState('loading'));

		fetch('/bios.bin')
			.then((r) => r.blob())
			.then((blob) => {
				const reader = new FileReader();
				reader.addEventListener('loadend', () => {
					setBios(new Uint8Array(reader.result as ArrayBuffer));
					dispatch(fileLoaderSlice.actions.biosState('success'));
				});

				reader.addEventListener('error', (e) => {
					console.error('failed to load bios', e);
					dispatch(fileLoaderSlice.actions.biosState('error'));
				});

				reader.readAsArrayBuffer(blob);
			})
			.catch((e) => {
				console.error('failed to load bios', e);
				dispatch(fileLoaderSlice.actions.biosState('error'));
			});
	} catch (e) {
		console.error('failed to load bios', e);
		dispatch(fileLoaderSlice.actions.biosState('error'));
	}
};

const extract = (): FileLoaderThunk => async (dispatch) => {
	const rom = getRom();

	if (!rom) {
		throw new Error('fileLoaderSlice#extract: called before rom is set');
	}

	dispatch(fileLoaderSlice.actions.overallExtractionState('extracting'));

	const entityResourceMap = Object.keys(entityMap).reduce<
		Partial<Record<string, Resource>>
	>((building, key) => {
		const entityDef = entityMap[key as EntityType];
		if (entityDef.resource) {
			building[key] = entityDef.resource;
		}

		if (entityDef.resources) {
			Object.keys(entityDef.resources).forEach((resourceKey) => {
				building[resourceKey] = entityDef.resources![resourceKey];
			});
		}

		return building;
	}, {});

	const allResources = {
		...entityResourceMap,
		...resourceMap,
	};

	dispatch(
		fileLoaderSlice.actions.setExtractionSize({
			done: 0,
			total: Object.keys(allResources).length,
		})
	);

	await extractResourcesToStylesheet(
		rom,
		allResources,
		(extractedName: string) => {
			dispatch(fileLoaderSlice.actions.finishedExtracting(extractedName));
		}
	);

	dispatch(fileLoaderSlice.actions.overallExtractionState('complete'));
};

const reducer = fileLoaderSlice.reducer;

export type { FileLoaderState, OtherFilesState, ExtractionState };

const { setMode } = fileLoaderSlice.actions;

export {
	reducer,
	loadBios,
	loadRom,
	loadEmptySave,
	loadSaveState,
	loadExampleLevel,
	extract,
	setMode,
};
