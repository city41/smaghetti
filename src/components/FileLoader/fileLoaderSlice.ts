import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
// @ts-ignore no types
import * as sha1 from 'js-sha1';
import { AppState } from '../../store';
import { setBios, setRom, setEmptySave } from './files';
import { EntityType } from '../../entities/entityMap_generated';
import { resources, ExtractedResource } from '../../resources/resources';
import { getRom } from './files';
import {
	extractResource,
	cleanup as extractCleanup,
} from '../../tiles/extractResource';

type RomFileState =
	| 'not-chosen'
	| 'loading'
	| 'success'
	| 'checksum-error'
	| 'error';
type OtherFilesState = 'loading' | 'success' | 'error';

type ExtractionState = 'not-started' | 'extracting' | 'complete';

type FileLoaderState = {
	romFileState: RomFileState;
	biosFileState: OtherFilesState;
	emptySaveFileState: OtherFilesState;
	otherFilesState: OtherFilesState;
	allFilesReady: boolean;
	overallExtractionState: ExtractionState;
	extractedGraphicsState: Partial<Record<EntityType, ExtractionState>>;
};

const SMA4_SHA = '532f3307021637474b6dd37da059ca360f612337';

const defaultInitialState: FileLoaderState = {
	romFileState: 'not-chosen',
	biosFileState: 'loading',
	emptySaveFileState: 'loading',
	otherFilesState: 'loading',
	allFilesReady: false,
	overallExtractionState: 'not-started',
	extractedGraphicsState: {},
};

const initialState = defaultInitialState;

function settleState(state: FileLoaderState) {
	if (state.emptySaveFileState === 'error' || state.biosFileState === 'error') {
		state.otherFilesState = 'error';
	} else if (
		state.emptySaveFileState === 'loading' ||
		state.biosFileState === 'loading'
	) {
		state.otherFilesState = 'loading';
	} else {
		state.otherFilesState = 'success';
	}

	state.allFilesReady =
		state.otherFilesState === 'success' && state.romFileState === 'success';
}

const fileLoaderSlice = createSlice({
	name: 'fileLoader',
	initialState,
	reducers: {
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

		// reducers related to graphic extraction
		overallExtractionState(
			state: FileLoaderState,
			action: PayloadAction<ExtractionState>
		) {
			state.overallExtractionState = action.payload;
		},
		resourceExtractionState(
			state: FileLoaderState,
			action: PayloadAction<{ type: EntityType; state: ExtractionState }>
		) {
			const { type, state: extractionState } = action.payload;

			state.extractedGraphicsState[type] = extractionState;
		},
	},
});

type FileLoaderThunk = ThunkAction<void, AppState, null, Action>;

const loadRom = (file: File): FileLoaderThunk => async (dispatch) => {
	try {
		dispatch(fileLoaderSlice.actions.romState('loading'));

		const reader = new FileReader();
		reader.addEventListener('loadend', () => {
			const romFile = new Uint8Array(reader.result as ArrayBuffer);

			const sha = sha1(romFile);

			if (sha !== SMA4_SHA) {
				dispatch(fileLoaderSlice.actions.romState('checksum-error'));
			} else {
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
				dispatch(fileLoaderSlice.actions.biosState('error'));
			});
	} catch (e) {
		console.error('failed to load empty save', e);
		dispatch(fileLoaderSlice.actions.emptySaveState('error'));
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

	const entries = Object.entries(resources);

	const resourcesToLoad = entries.filter((e) => e[1].type === 'extracted');

	for (let i = 0; i < resourcesToLoad.length; ++i) {
		await extractResource(rom, resourcesToLoad[i][1] as ExtractedResource);
	}

	extractCleanup();
	dispatch(fileLoaderSlice.actions.overallExtractionState('complete'));
};

const reducer = fileLoaderSlice.reducer;

export type { FileLoaderState };

export { reducer, loadBios, loadRom, loadEmptySave, extract };
