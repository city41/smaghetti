import {
	Action,
	createSlice,
	PayloadAction,
	ThunkAction,
} from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { extractCompressedTilesFromRom } from '../../tiles/extractCompressedTilesFromRom';
import { getRom } from '../FileLoader/files';
import { inGameLevels } from '../hex-tree/inGameLevels';
import { ROM_SIZE } from './constants';
import { CompressedTilesRomSection, RomSection } from './types';

type RomLayoutState = {
	sections: RomSection[];
	sectionsTotalSize: number;
	romSize: number;
};

const defaultInitialState: RomLayoutState = {
	sections: [],
	sectionsTotalSize: 0,
	romSize: ROM_SIZE,
};

const initialState = defaultInitialState;

const romLayoutSlice = createSlice({
	name: 'romLayout',
	initialState,
	reducers: {
		setSections(state: RomLayoutState, action: PayloadAction<RomSection[]>) {
			state.sections = action.payload;

			state.sectionsTotalSize = state.sections.reduce<number>((building, s) => {
				return building + s.size;
			}, 0);
		},
	},
});

type RomLayoutThunkAction = ThunkAction<void, AppState, null, Action>;

function sortByStart(a: RomSection, b: RomSection): number {
	return a.start - b.start;
}

const loadSections = (): RomLayoutThunkAction => async (dispatch) => {
	const rom = getRom();

	if (!rom) {
		throw new Error('loadSections called before rom is set');
	}

	const tilePages = extractCompressedTilesFromRom(rom);

	const compressedTileSections: CompressedTilesRomSection[] = tilePages.map(
		(tp) => {
			return {
				label: `${tp.tiles.length} tiles`,
				size: tp.compressedLength,
				start: tp.address,
				type: 'compressed-tiles',
				page: tp,
			};
		}
	);

	const levelSections = inGameLevels.reduce<RomSection[]>((building, igl) => {
		const sections = [];
		if (igl.root) {
			sections.push({
				label: igl.name ?? '?',
				start: igl.root,
				size: 1,
				type: 'level-objects',
			} as const);
		}

		if (igl.sprites) {
			sections.push({
				label: igl.name ?? '?',
				start: igl.sprites,
				size: 1,
				type: 'level-sprites',
			} as const);
		}

		return building.concat(sections);
	}, []);

	const allSections: RomSection[] = (compressedTileSections as RomSection[]).concat(
		levelSections
	);

	dispatch(romLayoutSlice.actions.setSections(allSections.sort(sortByStart)));
};

const reducer = romLayoutSlice.reducer;

export { reducer, loadSections };
export type { RomLayoutState };
