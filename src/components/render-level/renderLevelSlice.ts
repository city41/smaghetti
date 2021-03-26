import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { parseObjectsFromLevelFile } from '../../tiles/parseObjectsFromLevelFile';
import type { LevelObject } from '../../tiles/parseObjectsFromLevelFile';

type RenderLevelState = {
	objects: LevelObject[];
};

const defaultInitialState: RenderLevelState = {
	objects: [],
};

const initialState = defaultInitialState;

const renderLevelSlice = createSlice({
	name: 'renderLevel',
	initialState,
	reducers: {
		setObjects(state: RenderLevelState, action: PayloadAction<LevelObject[]>) {
			state.objects = action.payload;
		},
	},
});

type RenderLevelSliceThunk = ThunkAction<void, AppState, null, Action>;

const loadLevel = (levelFile: File): RenderLevelSliceThunk => async (
	dispatch
) => {
	const reader = new FileReader();

	reader.onloadend = () => {
		const objects = parseObjectsFromLevelFile(
			new Uint8Array(reader.result as ArrayBuffer)
		);
		dispatch(renderLevelSlice.actions.setObjects(objects));
	};

	reader.readAsArrayBuffer(levelFile);
};

const reducer = renderLevelSlice.reducer;

export { reducer, loadLevel };
export type { RenderLevelState };
