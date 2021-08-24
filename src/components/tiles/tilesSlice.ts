import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	extractCompressedTilesFromRom,
	TilePage,
} from '../../tiles/extractCompressedTilesFromRom';
import { getRom } from '../FileLoader/files';
import { ignoredPages } from '../../tiles/ignoredPages';

type TilesState = {
	pages: TilePage[];
	shift: number;
	dumpType: 'compressed' | 'uncompressed';
};

const defaultInitialState: TilesState = {
	pages: [],
	shift: 0,
	dumpType: 'compressed',
};

const initialState = defaultInitialState;

function divideIntoPages(
	data: Uint8Array,
	size: number,
	shift: number
): TilePage[] {
	const pages: TilePage[] = [];

	for (let i = 0; i < data.length; i += size) {
		if (ignoredPages.includes(i)) {
			continue;
		}

		const chunk = data.slice(i + shift, i + size + shift);

		const tiles: number[][] = [];

		for (let i = 0; i < size / 32; i += 1) {
			tiles.push(Array.from(chunk.slice(i * 32, (i + 1) * 32)));
		}

		pages.push({
			address: i,
			tiles,
			compressedLength: -1,
		});
	}

	return pages;
}

const tilesSlice = createSlice({
	name: 'tiles',
	initialState,
	reducers: {
		dumpUncompressed(state: TilesState) {
			const rom = getRom();

			if (!rom) {
				throw new Error('tileSlice#dumpUncompressed, called before rom is set');
			}

			state.pages = divideIntoPages(rom, 32 * 32 * 20, state.shift);
			state.dumpType = 'uncompressed';
		},
		dumpCompressed(state: TilesState) {
			const rom = getRom();

			if (!rom) {
				throw new Error('tileSlice#dumpCompressed, called before rom is set');
			}

			state.pages = extractCompressedTilesFromRom(rom);

			const compressedByteLength = state.pages.reduce<number>(
				(building, page) => {
					return building + page.compressedLength;
				},
				0
			);

			const uncompressedByteLength = state.pages.reduce<number>(
				(building, page) => {
					const pageSize = page.tiles.length * 0x20;
					return building + pageSize;
				},
				0
			);

			// eslint-disable-next-line no-console
			console.log(
				'total compressed tiles byte length:',
				compressedByteLength,
				'uncompressed:',
				uncompressedByteLength,
				'ratio:',
				compressedByteLength / uncompressedByteLength
			);

			state.dumpType = 'compressed';
		},
		setShift(state: TilesState, action: PayloadAction<number>) {
			const rom = getRom();

			if (!rom) {
				throw new Error('tileSlice#setShift, called before rom is set');
			}

			state.shift = action.payload;
			state.pages = divideIntoPages(rom, 32 * 32 * 20, state.shift);
		},
	},
});

const reducer = tilesSlice.reducer;

const { dumpCompressed, dumpUncompressed, setShift } = tilesSlice.actions;

export type { TilesState };

export { reducer, dumpCompressed, dumpUncompressed, setShift };
