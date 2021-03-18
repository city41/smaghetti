import { createSlice } from '@reduxjs/toolkit';
import { extractTilesFromRom, TilePage } from '../../tiles/extractTilesFromRom';
import { getRom } from '../FileLoader/files';

type TilesState = {
	pages: TilePage[];
};

const defaultInitialState: TilesState = {
	pages: [],
};

const initialState = defaultInitialState;

const tilesSlice = createSlice({
	name: 'tiles',
	initialState,
	reducers: {
		dump(state: TilesState) {
			const rom = getRom();

			if (!rom) {
				throw new Error('tileSlice#dump, called before rom is set');
			}

			state.pages = extractTilesFromRom(rom);
		},
	},
});

const reducer = tilesSlice.reducer;

const { dump } = tilesSlice.actions;

export type { TilesState };

export { reducer, dump };
