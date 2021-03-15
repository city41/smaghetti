import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import {
	setBios,
	setRom,
	setEmptySave,
	getBios,
	getRom,
	getEmptySave,
} from './files';

type FileLoaderState = {
	isLoadingBios: boolean;
	isLoadingRom: boolean;
	isLoadingEmptySave: boolean;
	loadBiosError: string | null;
	loadRomError: string | null;
	loadEmptySaveError: string | null;
	allFilesReady: boolean;
};

const defaultInitialState: FileLoaderState = {
	isLoadingBios: false,
	isLoadingRom: false,
	isLoadingEmptySave: false,
	loadBiosError: null,
	loadRomError: null,
	loadEmptySaveError: null,
	allFilesReady: false,
};

const initialState = defaultInitialState;

function areAllFilesReady(): boolean {
	return !!(getBios() && getRom() && getEmptySave());
}

const fileLoaderSlice = createSlice({
	name: 'fileLoader',
	initialState,
	reducers: {
		loadingBios(state: FileLoaderState, action: PayloadAction<boolean>) {
			state.isLoadingBios = action.payload;
		},
		loadBiosError(
			state: FileLoaderState,
			action: PayloadAction<string | null>
		) {
			state.loadBiosError = action.payload;
		},
		biosLoaded(state: FileLoaderState, action: PayloadAction<Uint8Array>) {
			setBios(action.payload);
			state.allFilesReady = areAllFilesReady();
		},
		loadingRom(state: FileLoaderState, action: PayloadAction<boolean>) {
			state.isLoadingRom = action.payload;
		},
		loadRomError(state: FileLoaderState, action: PayloadAction<string | null>) {
			state.loadRomError = action.payload;
		},
		romLoaded(state: FileLoaderState, action: PayloadAction<Uint8Array>) {
			setRom(action.payload);
			state.allFilesReady = areAllFilesReady();
		},
		loadingEmptySave(state: FileLoaderState, action: PayloadAction<boolean>) {
			state.isLoadingEmptySave = action.payload;
		},
		loadEmptySaveError(
			state: FileLoaderState,
			action: PayloadAction<string | null>
		) {
			state.loadEmptySaveError = action.payload;
		},
		emptySaveLoaded(state: FileLoaderState, action: PayloadAction<Uint8Array>) {
			setEmptySave(action.payload);
			state.allFilesReady = areAllFilesReady();
		},
	},
});

type FileLoaderThunk = ThunkAction<void, AppState, null, Action>;

const loadBios = (file: File): FileLoaderThunk => async (dispatch) => {
	try {
		dispatch(fileLoaderSlice.actions.loadBiosError(null));
		dispatch(fileLoaderSlice.actions.loadingBios(true));

		const reader = new FileReader();
		reader.addEventListener('loadend', () => {
			dispatch(
				fileLoaderSlice.actions.biosLoaded(
					new Uint8Array(reader.result as ArrayBuffer)
				)
			);
		});

		reader.addEventListener('error', () => {
			dispatch(
				fileLoaderSlice.actions.loadBiosError('Error reading the bios file')
			);
		});

		reader.readAsArrayBuffer(file);
	} catch (e) {
		dispatch(
			fileLoaderSlice.actions.loadBiosError(
				'An unknown error occurred while loading the bios: ' + e?.message ??
					e ??
					''
			)
		);
	} finally {
		dispatch(fileLoaderSlice.actions.loadingBios(false));
	}
};

const loadRom = (file: File): FileLoaderThunk => async (dispatch) => {
	try {
		dispatch(fileLoaderSlice.actions.loadRomError(null));
		dispatch(fileLoaderSlice.actions.loadingRom(true));

		const reader = new FileReader();
		reader.addEventListener('loadend', () => {
			dispatch(
				fileLoaderSlice.actions.romLoaded(
					new Uint8Array(reader.result as ArrayBuffer)
				)
			);
		});

		reader.addEventListener('error', () => {
			dispatch(
				fileLoaderSlice.actions.loadRomError('Error reading the rom file')
			);
		});

		reader.readAsArrayBuffer(file);
	} catch (e) {
		dispatch(
			fileLoaderSlice.actions.loadRomError(
				'An unknown error occurred while loading the rom: ' + e?.message ??
					e ??
					''
			)
		);
	} finally {
		dispatch(fileLoaderSlice.actions.loadingRom(false));
	}
};

const loadEmptySave = (): FileLoaderThunk => async (dispatch) => {
	try {
		dispatch(fileLoaderSlice.actions.loadEmptySaveError(null));
		dispatch(fileLoaderSlice.actions.loadingEmptySave(true));

		fetch('/empty.sav')
			.then((r) => r.blob())
			.then((blob) => {
				const reader = new FileReader();
				reader.addEventListener('loadend', () => {
					dispatch(
						fileLoaderSlice.actions.emptySaveLoaded(
							new Uint8Array(reader.result as ArrayBuffer)
						)
					);
				});

				reader.addEventListener('error', () => {
					dispatch(
						fileLoaderSlice.actions.loadEmptySaveError(
							'Error reading the rom file'
						)
					);
				});

				reader.readAsArrayBuffer(blob);
			});
	} catch (e) {
		dispatch(
			fileLoaderSlice.actions.loadEmptySaveError(
				'An unknown error occurred while loading the rom: ' + e?.message ??
					e ??
					''
			)
		);
	} finally {
		dispatch(fileLoaderSlice.actions.loadingEmptySave(false));
	}
};

const reducer = fileLoaderSlice.reducer;

export type { FileLoaderState };

export { reducer, loadBios, loadRom, loadEmptySave };
