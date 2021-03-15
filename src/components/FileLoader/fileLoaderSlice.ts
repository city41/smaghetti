import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { setBios, setRom, getBios, getRom } from './files';

type FileLoaderState = {
	isLoadingBios: boolean;
	isLoadingRom: boolean;
	loadBiosError: string | null;
	loadRomError: string | null;
	allFilesReady: boolean;
};

const defaultInitialState: FileLoaderState = {
	isLoadingBios: false,
	isLoadingRom: false,
	loadBiosError: null,
	loadRomError: null,
	allFilesReady: false,
};

const initialState = defaultInitialState;

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
			state.allFilesReady = !!(getBios() && getRom());
		},
		loadingRom(state: FileLoaderState, action: PayloadAction<boolean>) {
			state.isLoadingRom = action.payload;
		},
		loadRomError(state: FileLoaderState, action: PayloadAction<string | null>) {
			state.loadRomError = action.payload;
		},
		romLoaded(state: FileLoaderState, action: PayloadAction<Uint8Array>) {
			setRom(action.payload);
			state.allFilesReady = !!(getBios() && getRom());
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
			dispatch(fileLoaderSlice.actions.biosLoaded(reader.result as Uint8Array));
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
			dispatch(fileLoaderSlice.actions.romLoaded(reader.result as Uint8Array));
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

const reducer = fileLoaderSlice.reducer;

export type { FileLoaderState };

export { reducer, loadBios, loadRom };
