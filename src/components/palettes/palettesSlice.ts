import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	ExtractedEntityTileData,
	extractResourceTileData,
} from '../../tiles/extractResourcesToStylesheet';
import { getRom } from '../FileLoader/files';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import { entityMap, EntityType } from '../../entities/entityMap';
import { resourceMap, ResourceType } from '../../resources/resourceMap';

type ExtractedEntity = {
	type: EntityType | ResourceType;
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

			const toExtract = { ...entityMap, ...resourceMap };

			state.entities = Object.keys(toExtract).reduce<ExtractedEntity[]>(
				(building, key) => {
					const resource = toExtract[key as keyof typeof toExtract];

					if (!('tiles' in resource)) {
						return building;
					}

					const data = extractResourceTileData(rom, resource);

					return building.concat({
						type: key as EntityType | ResourceType,
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

		dispatch(palettesSlice.actions.setPalettes(palettes));
	};

	reader.readAsArrayBuffer(blob);
};

const reducer = palettesSlice.reducer;

const { getEntities } = palettesSlice.actions;

export type { PalettesState };

export { reducer, getPalettes, getEntities };
