import {
	Action,
	createSlice,
	PayloadAction,
	ThunkAction,
} from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { extractCompressedTilesFromRom } from '../../tiles/extractCompressedTilesFromRom';
import { getRom } from '../FileLoader/files';
import { inGameLevels } from '../../levelData/inGameLevels';
import {
	AceCoinTotalSection,
	CompressedTilesRomSection,
	RomSection,
	UnknownLevelRecordSection,
} from './types';
import { IN_GAME_LEVEL_HEADER_SIZE } from '../../levelData/constants';
import {
	FIRST_LEVEL_NAME_OFFSET,
	OFFSET_AFTER_NAME_TABLE,
} from '../../../scripts/wiiu/constants';
import {
	ECOIN_PALETTE_SIZE,
	ECOIN_TILE_SIZE,
} from '../../levelData/typesAndConstants';

type RomLayoutState = {
	sections: RomSection[];
	sectionsTotalSize: number;
	romSize: number;
};

const defaultInitialState: RomLayoutState = {
	sections: [],
	sectionsTotalSize: 0,
	romSize: 0,
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
		setRomSize(state: RomLayoutState, action: PayloadAction<number>) {
			state.romSize = action.payload;
		},
	},
});

type RomLayoutThunkAction = ThunkAction<void, AppState, null, Action>;

function sortByStart(a: RomSection, b: RomSection): number {
	return a.start - b.start;
}

function getSize(rom: Uint8Array, offset: number): number {
	let size = 0;

	while (offset < rom.length && rom[offset] != 0xff) {
		++offset;
		++size;
	}

	return size;
}

const loadSections = (): RomLayoutThunkAction => async (dispatch, getState) => {
	const { mode } = getState().fileLoader;
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
				start: igl.root + IN_GAME_LEVEL_HEADER_SIZE,
				size: getSize(rom, igl.root + IN_GAME_LEVEL_HEADER_SIZE),
				type: 'level-objects',
			} as const);
		}

		if (igl.sprites) {
			sections.push({
				label: igl.name ?? '?',
				start: igl.sprites,
				size: getSize(rom, igl.sprites),
				type: 'level-sprites',
			} as const);
		}

		return building.concat(sections);
	}, []);

	let allSections = (compressedTileSections as RomSection[]).concat(
		levelSections
	);
	if (mode === 'wiiu' || mode === 'any') {
		const compressedLevelSections: RomSection[] = [];

		for (let i = 0; i < 72; ++i) {
			compressedLevelSections.push({
				label: 'e-reader lvl ' + i,
				start: 0x400000 + 0x800 * i,
				size: 0x808,
				type: 'compressed-e-level',
			});
		}

		const levelNameTableSection: RomSection = {
			label: 'level name table',
			start: FIRST_LEVEL_NAME_OFFSET,
			size: OFFSET_AFTER_NAME_TABLE - FIRST_LEVEL_NAME_OFFSET,
			type: 'level-name-table',
		};

		const eCoinSections: RomSection[] = [];

		const ecoinStart = 0x425040;

		for (let c = 0; c < 8; ++c) {
			eCoinSections.push({
				label: 'e-coin ' + c,
				start: ecoinStart + 288 * c,
				size: ECOIN_TILE_SIZE,
				type: 'e-coin',
			});
		}

		const ecoinPaletteSections: RomSection[] = [];
		const ecoinPaletteStart = 0x426b40;

		for (let i = 0; i < 8; ++i) {
			ecoinPaletteSections.push({
				label: 'e-coin-palette' + i,
				start: ecoinPaletteStart + ECOIN_PALETTE_SIZE * i,
				size: ECOIN_PALETTE_SIZE,
				type: 'e-coin-palette',
			});
		}

		const aceCoinTotalSection: AceCoinTotalSection = {
			type: 'ace-coin-total-section',
			start: 0x424600,
			size: 72,
		};

		const unknownLevelRecordSections: UnknownLevelRecordSection[] = [
			{
				type: 'unknown-level-record-section',
				start: 0x424648,
				size: 72,
			},
			{
				type: 'unknown-level-record-section',
				start: 0x424690,
				size: 72,
			},
			{
				type: 'unknown-level-record-section',
				start: 0x4246d8,
				size: 72,
			},
		];

		allSections = allSections
			.concat(compressedLevelSections)
			.concat(levelNameTableSection)
			.concat(eCoinSections)
			.concat(ecoinPaletteSections)
			.concat(aceCoinTotalSection)
			.concat(unknownLevelRecordSections);
	}

	dispatch(romLayoutSlice.actions.setSections(allSections.sort(sortByStart)));
	dispatch(romLayoutSlice.actions.setRomSize(getRom()!.length));
};

const reducer = romLayoutSlice.reducer;

export { reducer, loadSections };
export type { RomLayoutState };
