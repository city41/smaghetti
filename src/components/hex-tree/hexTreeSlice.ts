import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import {
	parseObjectHeader,
	parseObjectsFromLevelFile,
} from '../../levelData/parseObjectsFromLevelFile';
import { parseSpritesFromLevelFile } from '../../levelData/parseSpritesFromLevelFile';
import { parseTransportsFromLevelFile } from '../../levelData/parseTransportsFromLevelFile';
import {
	Exclusion,
	LevelHeader,
	LevelRooms,
	LevelTree,
	LevelTreeObject,
	LevelTreeRoom,
	LevelTreeSprite,
	LevelTreeTransport,
	Patch,
	RoomIndex,
} from './types';
import {
	ROOM_AUTOSCROLL_POINTERS,
	ROOM_BLOCKPATH_POINTERS,
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_POINTERS,
	ROOM_SPRITE_POINTERS,
	ROOM_TRANSPORT_POINTERS,
} from '../../levelData/constants';
import { convertLevelNameToASCII } from '../../levelData/util';
import { createLevelData } from '../../levelData/createLevelData';
import { parseLevelSettingsFromLevelFile } from '../../levelData/parseLevelSettingsFromLevelFile';

type HexTreeState = {
	tree: LevelTree | null;
};

const defaultInitialState: HexTreeState = {
	tree: null,
};

const initialState = defaultInitialState;

const hexTreeSlice = createSlice({
	name: 'hexTree',
	initialState,
	reducers: {
		setTree(state: HexTreeState, action: PayloadAction<LevelTree>) {
			state.tree = action.payload;
		},
		patch(state: HexTreeState, action: PayloadAction<Patch>) {
			if (!state.tree) {
				return;
			}

			const { type, roomIndex, offset, bytes } = action.payload;
			const room = state.tree.rooms[roomIndex];

			if (type === 'level-settings') {
				room.levelSettings.rawBytes.splice(offset, bytes.length, ...bytes);
			}
		},
		toggleExclude(state: HexTreeState, action: PayloadAction<Exclusion>) {
			if (!state.tree) {
				return;
			}

			const { type, roomIndex, entity } = action.payload;

			const room = state.tree.rooms[roomIndex];

			let targetEntity;

			if (type === 'room') {
				room.exclude = !room.exclude;
				return;
			}

			if (type === 'object') {
				const eo = entity as LevelTreeObject;
				targetEntity = room.objects.objects.find((o) => {
					return (
						o.bank === eo.bank && o.id === eo.id && o.x === eo.x && o.y === eo.y
					);
				});
			} else if (type === 'sprite') {
				const es = entity as LevelTreeSprite;
				targetEntity = room.objects.objects.find((o) => {
					return (
						o.bank === es.bank && o.id === es.id && o.x === es.x && o.y === es.y
					);
				});
			} else if (type === 'transport') {
				const te = entity as LevelTreeTransport;
				targetEntity = room.transports.transports.find((t) => {
					return (
						t.destRoom === te.destRoom &&
						t.sx === te.sx &&
						t.sy === t.sy &&
						t.dx === te.dx &&
						t.dy === te.dy
					);
				});
			}

			if (targetEntity) {
				targetEntity.exclude = !targetEntity.exclude;
			}
		},
	},
});

function getPointer(data: Uint8Array, offset: number): number {
	const view = new DataView(data.buffer);
	return view.getUint16(offset, true);
}

function parseHeader(data: Uint8Array): LevelHeader {
	return {
		eCoin: data[0] !== 0,
		aceCoins: data[1],
		levelClass: data[2],
		levelNumber: data[3],
		levelIcon: data[4],
		// TODO: if a level has an eCoin, the name is in a different location
		levelName: convertLevelNameToASCII(data.subarray(0x40, 0x40 + 21)),
		rawBytes: Array.from(data.slice(0, 5)),
	};
}

function parseRoom(data: Uint8Array, roomIndex: RoomIndex): LevelTreeRoom {
	const autoScrollEndAddress =
		roomIndex === 3
			? data.length
			: getPointer(data, ROOM_OBJECT_POINTERS[(roomIndex + 1) as RoomIndex]);

	return {
		objects: {
			header: parseObjectHeader(data, roomIndex),
			objects: parseObjectsFromLevelFile(data, roomIndex),
			pendingRawBytes: [],
		},
		levelSettings: {
			settings: parseLevelSettingsFromLevelFile(data, roomIndex),
			rawBytes: Array.from(
				data.slice(
					getPointer(data, ROOM_LEVELSETTING_POINTERS[roomIndex]),
					getPointer(data, ROOM_TRANSPORT_POINTERS[roomIndex])
				)
			),
		},
		transports: {
			transports: parseTransportsFromLevelFile(data, roomIndex),
			rawBytes: Array.from(
				data.slice(
					getPointer(data, ROOM_TRANSPORT_POINTERS[roomIndex]),
					getPointer(data, ROOM_SPRITE_POINTERS[roomIndex])
				)
			),
		},
		sprites: {
			sprites: parseSpritesFromLevelFile(data, roomIndex),
			pendingRawBytes: [],
		},
		blockPaths: {
			rawBytes: Array.from(
				data.slice(
					getPointer(data, ROOM_BLOCKPATH_POINTERS[roomIndex]),
					getPointer(data, ROOM_AUTOSCROLL_POINTERS[roomIndex])
				)
			),
		},
		autoScroll: {
			rawBytes: Array.from(
				data.slice(
					getPointer(data, ROOM_AUTOSCROLL_POINTERS[roomIndex]),
					autoScrollEndAddress
				)
			),
		},
	};
}

function parseDataToTree(data: Uint8Array): LevelTree {
	const header = parseHeader(data);
	const rooms = ([0, 1, 2, 3] as RoomIndex[]).map((roomIndex) =>
		parseRoom(data, roomIndex)
	) as LevelRooms;

	return { header, rooms };
}

type HexTreeThunkAction = ThunkAction<void, AppState, null, Action>;

const loadLevel = (levelFile: File): HexTreeThunkAction => async (dispatch) => {
	const reader = new FileReader();

	reader.onloadend = () => {
		const data = new Uint8Array(reader.result as ArrayBuffer);
		dispatch(hexTreeSlice.actions.setTree(parseDataToTree(data)));
	};

	reader.readAsArrayBuffer(levelFile);
};

const loadEmptyLevel = (): HexTreeThunkAction => async (dispatch) => {
	const emptyLevelData = createLevelData([
		{
			paletteEntries: [],
			entities: [],
			transports: [],
			tileLayer: { width: 0, height: 0, data: [] },
		},
	]);

	dispatch(hexTreeSlice.actions.setTree(parseDataToTree(emptyLevelData)));
};

const reducer = hexTreeSlice.reducer;
const { toggleExclude, patch } = hexTreeSlice.actions;

export { reducer, loadLevel, loadEmptyLevel, toggleExclude, patch };
export type { HexTreeState };
