import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../store';
import {
	parseObject,
	parseObjectHeader,
	parseObjectsFromLevelFile,
} from '../../levelData/parseObjectsFromLevelFile';
import {
	parseSprite,
	parseSpritesFromLevelFile,
} from '../../levelData/parseSpritesFromLevelFile';
import { parseTransportsFromLevelFile } from '../../levelData/parseTransportsFromLevelFile';
import {
	Add,
	Exclusion,
	LevelHeader,
	LevelRooms,
	LevelTree,
	LevelTreeRoom,
	ObjectPatch,
	Patch,
	RoomIndex,
	SpritePatch,
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
import {
	parseLevelSettings,
	parseLevelSettingsFromLevelFile,
} from '../../levelData/parseLevelSettingsFromLevelFile';
import { LOCALSTORAGE_KEY } from '../make/editorSlice';
import { deserialize } from '../../level/deserialize';

type HexTreeState = {
	tree: LevelTree | null;
	originalData: number[] | null;
	fourByteIds: number[];
};

const EMPTY_LEVEL = createLevelData([
	{
		paletteEntries: [],
		entities: [],
		transports: [],
		tileLayer: { width: 0, height: 0, data: [] },
	},
]);

const defaultInitialState: HexTreeState = {
	tree: null,
	originalData: null,
	fourByteIds: [],
};

const initialState = defaultInitialState;

const hexTreeSlice = createSlice({
	name: 'hexTree',
	initialState,
	reducers: {
		setOriginalData(state: HexTreeState, action: PayloadAction<number[]>) {
			state.originalData = action.payload;
		},
		setTree(state: HexTreeState, action: PayloadAction<LevelTree>) {
			state.tree = action.payload;
		},
		toFourBytes(state: HexTreeState, action: PayloadAction<number>) {
			if (state.originalData) {
				const id = action.payload;

				if (!state.fourByteIds.includes(id)) {
					state.fourByteIds.push(id);
				} else {
					state.fourByteIds = state.fourByteIds.filter((i) => i !== id);
				}

				state.tree = parseDataToTree(
					new Uint8Array(state.originalData),
					state.fourByteIds
				);
			}
		},
		add(state: HexTreeState, action: PayloadAction<Add>) {
			if (!state.tree) {
				return;
			}

			const { roomIndex, afterIndex, type, bytes } = action.payload;

			const room = state.tree.rooms[roomIndex];

			switch (type) {
				case 'sprite': {
					const newSprite = parseSprite(bytes, 0);
					room.sprites.sprites.splice(afterIndex + 1, 0, newSprite);
					break;
				}
				case 'object': {
					const newObject = parseObject(bytes, 0, state.fourByteIds);
					room.objects.objects.splice(afterIndex + 1, 0, newObject);
					break;
				}
				// TODO: transports
			}
		},
		patch(state: HexTreeState, action: PayloadAction<Patch>) {
			if (!state.tree) {
				return;
			}

			const { type, roomIndex, offset, bytes } = action.payload;
			const room = state.tree.rooms[roomIndex];

			if (type === 'level-settings') {
				room.levelSettings.rawBytes.splice(offset, bytes.length, ...bytes);
				room.levelSettings.settings = parseLevelSettings(
					room.levelSettings.rawBytes,
					0
				);
			}

			if (type === 'sprite') {
				const { spriteIndex } = action.payload as SpritePatch;
				const rawBytes = room.sprites.sprites[spriteIndex].rawBytes;
				rawBytes.splice(offset, bytes.length, ...bytes);
				const newValues = parseSprite(rawBytes, 0);

				room.sprites.sprites[spriteIndex] = {
					...newValues,
					rawBytes,
				};
			}

			if (type === 'object') {
				const { objectIndex } = action.payload as ObjectPatch;
				const rawBytes = room.objects.objects[objectIndex].rawBytes;
				rawBytes.splice(offset, bytes.length, ...bytes);
				const newValues = parseObject(rawBytes, 0, state.fourByteIds);

				room.objects.objects[objectIndex] = {
					...newValues,
					rawBytes,
				};
			}
		},
		toggleExclude(state: HexTreeState, action: PayloadAction<Exclusion>) {
			if (!state.tree) {
				return;
			}

			const room = state.tree.rooms[action.payload.roomIndex];

			let targetEntity;

			switch (action.payload.type) {
				case 'room': {
					room.exclude = !room.exclude;
					break;
				}
				case 'object': {
					const eo = action.payload.entity;
					targetEntity = room.objects.objects.find((o) => {
						return (
							o.bank === eo.bank &&
							o.id === eo.id &&
							o.x === eo.x &&
							o.y === eo.y
						);
					});
					break;
				}
				case 'sprite': {
					const es = action.payload.entity;
					targetEntity = room.sprites.sprites.find((o) => {
						return (
							o.bank === es.bank &&
							o.id === es.id &&
							o.x === es.x &&
							o.y === es.y
						);
					});
					break;
				}
				case 'transport': {
					const te = action.payload.entity;
					targetEntity = room.transports.transports.find((t) => {
						return (
							t.destRoom === te.destRoom &&
							t.sx === te.sx &&
							t.sy === t.sy &&
							t.dx === te.dx &&
							t.dy === te.dy
						);
					});
					break;
				}
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

function parseRoom(
	data: Uint8Array,
	roomIndex: RoomIndex,
	fourByteIds: number[]
): LevelTreeRoom {
	const autoScrollEndAddress =
		roomIndex === 3
			? data.length
			: getPointer(data, ROOM_OBJECT_POINTERS[(roomIndex + 1) as RoomIndex]);

	return {
		objects: {
			header: parseObjectHeader(data, roomIndex),
			objects: parseObjectsFromLevelFile(data, roomIndex, fourByteIds),
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

function parseDataToTree(data: Uint8Array, fourByteIds: number[]): LevelTree {
	const header = parseHeader(data);
	const rooms = ([0, 1, 2, 3] as RoomIndex[]).map((roomIndex) =>
		parseRoom(data, roomIndex, fourByteIds)
	) as LevelRooms;

	return { header, rooms };
}

type HexTreeThunkAction = ThunkAction<void, AppState, null, Action>;

const loadLevel = (levelFile: File): HexTreeThunkAction => async (
	dispatch,
	getState
) => {
	const reader = new FileReader();

	reader.onloadend = () => {
		const data = new Uint8Array(reader.result as ArrayBuffer);
		dispatch(hexTreeSlice.actions.setOriginalData(Array.from(data)));
		dispatch(
			hexTreeSlice.actions.setTree(
				parseDataToTree(data, getState().hexTree.fourByteIds)
			)
		);
	};

	reader.readAsArrayBuffer(levelFile);
};

const loadEmptyLevel = (): HexTreeThunkAction => (dispatch) => {
	dispatch(hexTreeSlice.actions.setOriginalData(Array.from(EMPTY_LEVEL)));
	dispatch(hexTreeSlice.actions.setTree(parseDataToTree(EMPTY_LEVEL, [])));
};

const loadFromLocalStorage = (): HexTreeThunkAction => (dispatch) => {
	const localStorageData = localStorage[LOCALSTORAGE_KEY];

	let levelData;
	if (localStorageData) {
		try {
			const parsed = JSON.parse(localStorageData);
			const deserialized = deserialize(parsed.levelData);
			levelData = createLevelData(deserialized.levelData.rooms);
		} catch (e) {
			console.error('loadFromLocalStorage error', e);
			levelData = EMPTY_LEVEL;
		}
	} else {
		levelData = EMPTY_LEVEL;
	}

	dispatch(hexTreeSlice.actions.setOriginalData(Array.from(levelData)));
	dispatch(hexTreeSlice.actions.setTree(parseDataToTree(levelData, [])));
};

const reducer = hexTreeSlice.reducer;
const { toggleExclude, patch, add, toFourBytes } = hexTreeSlice.actions;

export {
	reducer,
	loadLevel,
	loadEmptyLevel,
	loadFromLocalStorage,
	toggleExclude,
	patch,
	add,
	toFourBytes,
};
export type { HexTreeState };
