import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	ExtractedEntityTileData,
	extractResourceTileData,
} from '../../tiles/extractResource';
import { getRom } from '../FileLoader/files';
import { ExtractedResource, resources } from '../../resources';
import { EntityType } from '../../entities/entityMap_generated';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';

type ExtractedEntity = {
	type: EntityType;
	data: ExtractedEntityTileData;
};

type PalettesState = {
	palettes: Array<Tuple<number, 16>>;
	entities: ExtractedEntity[];
};

const defaultInitialState: PalettesState = {
	palettes: [],
	entities: [],
};

const initialState = defaultInitialState;

const palettesSlice = createSlice({
	name: 'palettes',
	initialState,
	reducers: {
		setPalettes(
			state: PalettesState,
			action: PayloadAction<Array<Tuple<number, 16>>>
		) {
			state.palettes = action.payload;
		},
		getEntities(state: PalettesState) {
			const rom = getRom();

			if (!rom) {
				throw new Error('tileSlice#dumpUncompressed, called before rom is set');
			}

			const entries = Object.entries(resources);

			const resourcesToLoad = entries.filter((e) => e[1].type === 'extracted');

			state.entities = resourcesToLoad.reduce<ExtractedEntity[]>(
				(building, resource) => {
					const data = extractResourceTileData(
						rom,
						resource[1] as ExtractedResource
					);

					return building.concat({
						type: resource[0] as EntityType,
						data,
					});
				},
				[]
			);
		},
	},
});

type PalettesThunk = ThunkAction<void, AppState, null, Action>;

const getPalettes = (): PalettesThunk => async (dispatch) => {
	const response = await fetch('/palettes.bin');
	const blob = await response.blob();

	const reader = new FileReader();

	reader.onloadend = () => {
		const rawPaletteBlob = new Uint16Array(reader.result as ArrayBuffer);

		const palettes: Array<Tuple<number, 16>> = [];

		for (let i = 0; i <= rawPaletteBlob.length - 16; i += 16) {
			palettes.push(Array.from(rawPaletteBlob.slice(i, i + 16)));
		}

		console.log(palettes[17].map((p) => p.toString(16)).join(', '));

		dispatch(palettesSlice.actions.setPalettes(palettes));
	};

	reader.readAsArrayBuffer(blob);
};

const reducer = palettesSlice.reducer;

const { getEntities } = palettesSlice.actions;

export type { PalettesState };

export { reducer, getPalettes, getEntities };
