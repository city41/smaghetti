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
import {
	parseTransport,
	parseTransportsFromLevelFile,
} from '../../levelData/parseTransportsFromLevelFile';
import {
	Add,
	ByteSizes,
	ExcludeAfter,
	Exclusion,
	LevelHeader,
	LevelRooms,
	LevelTree,
	LevelTreeRoom,
	ObjectPatch,
	Patch,
	RoomIndex,
	SpritePatch,
	TransportPatch,
} from './types';
import {
	BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES,
	BACKGROUND_GRAPHIC_VALUES,
	MUSIC_VALUES,
	ROOM_AUTOSCROLL_POINTERS,
	ROOM_BLOCKPATH_POINTERS,
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_POINTERS,
	ROOM_SPRITE_POINTERS,
	ROOM_TRANSPORT_POINTERS,
} from '../../levelData/constants';
import {
	convertCharacterToASCII,
	convertLevelNameToASCII,
} from '../../levelData/util';
import { createLevelData } from '../../levelData/createLevelData';
import {
	parseLevelSettings,
	parseLevelSettingsFromLevelFile,
} from '../../levelData/parseLevelSettingsFromLevelFile';
import { LOCALSTORAGE_KEY } from '../editor/editorSlice';
import { deserialize } from '../../level/deserialize';
import { convertLevelToLatestVersion } from '../../level/versioning/convertLevelToLatestVersion';

type HexTreeState = {
	tree: LevelTree | null;
	originalData: number[] | null;
	byteSizes: ByteSizes;
	originalLevelName: string | null;
};

const EMPTY_LEVEL = createLevelData({
	name: 'empty level',
	data: {
		settings: {
			timer: 900,
		},
		rooms: [
			{
				settings: {
					music: MUSIC_VALUES.Underground,
					bgColor: 0,
					bgGraphic: BACKGROUND_GRAPHIC_VALUES.underground,
					bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
				},
				actors: {
					entities: [],
					matrix: [],
				},
				stage: {
					entities: [],
					matrix: [],
				},
				paletteEntries: [],
				roomTileWidth: 0,
				roomTileHeight: 0,
			},
		],
	},
});

const defaultInitialState: HexTreeState = {
	tree: null,
	originalData: null,
	originalLevelName: null,
	byteSizes: {
		object: {
			four: [],
			five: [],
		},
	},
};

function getLevelName(data: number[]): string {
	const start = data[0] === 0 ? 0x40 : 0x180;

	const chars: string[] = [];

	let address = start;
	while (
		address < data.length &&
		data[address] !== 0xff &&
		address < start + 21
	) {
		const char = convertCharacterToASCII(data[address]);
		chars.push(char);
		address += 1;
	}

	return chars.join('');
}

const initialState = defaultInitialState;

const hexTreeSlice = createSlice({
	name: 'hexTree',
	initialState,
	reducers: {
		setOriginalData(state: HexTreeState, action: PayloadAction<number[]>) {
			state.originalData = action.payload;
			state.originalLevelName = getLevelName(action.payload);
		},
		setTree(state: HexTreeState, action: PayloadAction<LevelTree>) {
			state.tree = action.payload;
		},
		toFourBytes(
			state: HexTreeState,
			action: PayloadAction<{ type: 'sprite' | 'object'; id: number }>
		) {
			if (state.originalData) {
				const { type, id } = action.payload;

				if (type === 'object') {
					if (!state.byteSizes.object.four.includes(id)) {
						state.byteSizes.object.four.push(id);
						state.byteSizes.object.five = state.byteSizes.object.five.filter(
							(i) => i !== id
						);
					} else {
						state.byteSizes.object.four = state.byteSizes.object.four.filter(
							(i) => i !== id
						);
					}
				}

				state.tree = parseDataToTree(
					new Uint8Array(state.originalData),
					state.byteSizes
				);
			}
		},
		toFiveBytes(
			state: HexTreeState,
			action: PayloadAction<{ type: 'sprite' | 'object'; id: number }>
		) {
			if (state.originalData) {
				const { type, id } = action.payload;

				if (type === 'object') {
					if (!state.byteSizes.object.five.includes(id)) {
						state.byteSizes.object.five.push(id);
						state.byteSizes.object.four = state.byteSizes.object.four.filter(
							(i) => i !== id
						);
					} else {
						state.byteSizes.object.five = state.byteSizes.object.five.filter(
							(i) => i !== id
						);
					}
				}

				state.tree = parseDataToTree(
					new Uint8Array(state.originalData),
					state.byteSizes
				);
			}
		},
		add(state: HexTreeState, action: PayloadAction<Add>) {
			if (!state.tree) {
				return;
			}

			const { roomIndex, afterIndex, type, bytes } = action.payload;

			const room = state.tree.rooms[roomIndex];
			const objectSet = room.levelSettings.settings?.objectSet;

			switch (type) {
				case 'sprite': {
					const newSprite = parseSprite(bytes, 0);
					room.sprites.sprites.splice(afterIndex + 1, 0, newSprite);
					break;
				}
				case 'object': {
					const newObject = parseObject(
						bytes,
						0,
						objectSet!,
						state.byteSizes.object.four,
						state.byteSizes.object.five
					);
					newObject.rawBytes = bytes;
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
			const objectSet = room.levelSettings.settings?.objectSet;

			if (type === 'level-settings') {
				room.levelSettings.rawBytes.splice(offset, bytes.length, ...bytes);
				room.levelSettings.settings = parseLevelSettings(
					room.levelSettings.rawBytes,
					0
				);
			}

			if (type === 'object-header') {
				room.objects.header.rawBytes.splice(offset, bytes.length, ...bytes);
				// TODO: parse the header again. But so far, don't care about the parsed output...
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
				const newValues = parseObject(
					rawBytes,
					0,
					objectSet!,
					state.byteSizes.object.four,
					state.byteSizes.object.five
				);

				room.objects.objects[objectIndex] = {
					...newValues,
					rawBytes,
				};
			}

			if (type === 'transport') {
				const { transportIndex } = action.payload as TransportPatch;
				const rawBytes = room.transports.transports[transportIndex].rawBytes;
				rawBytes.splice(offset, bytes.length, ...bytes);
				const newValues = parseTransport(rawBytes, 0);

				room.transports.transports[transportIndex] = {
					...newValues,
					rawBytes,
				};
			}
		},
		toggleExcludeAfter(
			state: HexTreeState,
			action: PayloadAction<ExcludeAfter>
		) {
			if (!state.tree) {
				return;
			}

			const { roomIndex, type, index } = action.payload;

			const room = state.tree.rooms[roomIndex];

			const entities =
				type === 'object' ? room.objects.objects : room.sprites.sprites;

			entities[index].excludedAfter = !entities[index].excludedAfter;
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
	byteSizes: ByteSizes
): LevelTreeRoom {
	const autoScrollEndAddress =
		roomIndex === 3
			? data.length
			: getPointer(data, ROOM_OBJECT_POINTERS[(roomIndex + 1) as RoomIndex]);

	return {
		objects: {
			header: parseObjectHeader(data, roomIndex),
			objects: parseObjectsFromLevelFile(
				data,
				roomIndex,
				byteSizes.object.four,
				byteSizes.object.five
			),
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

function parseDataToTree(data: Uint8Array, byteSizes: ByteSizes): LevelTree {
	const header = parseHeader(data);
	const rooms = ([0, 1, 2, 3] as RoomIndex[]).map((roomIndex) =>
		parseRoom(data, roomIndex, byteSizes)
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
				parseDataToTree(data, getState().hexTree.byteSizes)
			)
		);
	};

	reader.readAsArrayBuffer(levelFile);
};

const resetLevel = (): HexTreeThunkAction => (dispatch, getState) => {
	const originalData = getState().hexTree.originalData;

	if (originalData) {
		dispatch(
			hexTreeSlice.actions.setTree(
				parseDataToTree(
					new Uint8Array(originalData),
					getState().hexTree.byteSizes
				)
			)
		);
	}
};

const loadEmptyLevel = (): HexTreeThunkAction => (dispatch, getState) => {
	dispatch(hexTreeSlice.actions.setOriginalData(Array.from(EMPTY_LEVEL)));
	dispatch(
		hexTreeSlice.actions.setTree(
			parseDataToTree(EMPTY_LEVEL, getState().hexTree.byteSizes)
		)
	);
};

const loadFromLocalStorage = (): HexTreeThunkAction => (dispatch, getState) => {
	const rawJson = localStorage[LOCALSTORAGE_KEY];

	let levelData;
	if (rawJson) {
		try {
			const unknownLocalStorageData = JSON.parse(rawJson) as unknown;
			const localStorageData = convertLevelToLatestVersion(
				unknownLocalStorageData
			);

			if (localStorageData) {
				levelData = createLevelData({
					name: localStorageData.name,
					data: deserialize(localStorageData.data),
				});
			} else {
				levelData = EMPTY_LEVEL;
			}
		} catch (e) {
			console.error('loadFromLocalStorage error', e);
			levelData = EMPTY_LEVEL;
		}
	} else {
		levelData = EMPTY_LEVEL;
	}

	dispatch(hexTreeSlice.actions.setOriginalData(Array.from(levelData)));
	dispatch(
		hexTreeSlice.actions.setTree(
			parseDataToTree(levelData, getState().hexTree.byteSizes)
		)
	);
};

const reducer = hexTreeSlice.reducer;
const {
	toggleExclude,
	toggleExcludeAfter,
	patch,
	add,
	toFourBytes,
	toFiveBytes,
} = hexTreeSlice.actions;

export {
	reducer,
	resetLevel,
	loadLevel,
	loadEmptyLevel,
	loadFromLocalStorage,
	toggleExclude,
	toggleExcludeAfter,
	patch,
	add,
	toFourBytes,
	toFiveBytes,
};
export type { HexTreeState };
