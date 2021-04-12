import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { parseObjectsFromLevelFile } from '../../levelData/parseObjectsFromLevelFile';
import type { LevelObject } from '../../levelData/parseObjectsFromLevelFile';
import {
	LevelSprite,
	parseSpritesFromLevelFile,
} from '../../levelData/parseSpritesFromLevelFile';
import {
	LevelTransport,
	parseTransportsFromLevelFile,
} from '../../levelData/parseTransportsFromLevelFile';

type RenderLevelState = {
	objects: LevelObject[];
	sprites: LevelSprite[];
	transports: LevelTransport[];
};

const defaultInitialState: RenderLevelState = {
	objects: [],
	sprites: [],
	transports: [],
};

const initialState = defaultInitialState;

const renderLevelSlice = createSlice({
	name: 'renderLevel',
	initialState,
	reducers: {
		setObjects(state: RenderLevelState, action: PayloadAction<LevelObject[]>) {
			state.objects = action.payload;
		},
		setSprites(state: RenderLevelState, action: PayloadAction<LevelSprite[]>) {
			state.sprites = action.payload;
		},
		setTransports(
			state: RenderLevelState,
			action: PayloadAction<LevelTransport[]>
		) {
			state.transports = action.payload;
		},
	},
});

type RenderLevelSliceThunk = ThunkAction<void, AppState, null, Action>;

const loadLevel = (levelFile: File): RenderLevelSliceThunk => async (
	dispatch
) => {
	const reader = new FileReader();

	reader.onloadend = () => {
		const data = new Uint8Array(reader.result as ArrayBuffer);

		const objects = parseObjectsFromLevelFile(data);
		dispatch(renderLevelSlice.actions.setObjects(objects));

		const sprites = parseSpritesFromLevelFile(data);
		dispatch(renderLevelSlice.actions.setSprites(sprites));

		const transports = parseTransportsFromLevelFile(data);
		dispatch(renderLevelSlice.actions.setTransports(transports));
	};

	reader.readAsArrayBuffer(levelFile);
};

const reducer = renderLevelSlice.reducer;

export { reducer, loadLevel };
export type { RenderLevelState };
