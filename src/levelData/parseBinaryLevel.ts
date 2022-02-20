import { ROOM_WIDTH_INCREMENT } from '../components/editor/constants';
import { entityMap } from '../entities/entityMap';
import { Entity } from '../entities/types';
import {
	MUSIC_VALUES,
	ROOM_BACKGROUND_SETTINGS,
	ROOM_BLOCKPATH_POINTERS,
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_POINTERS,
	ROOM_SPRITE_POINTERS,
	IN_GAME_LEVEL_HEADER_SIZE,
} from './constants';
import {
	ECOIN_TILE_SIZE,
	LEVEL_ECOIN_TILE_OFFSET,
	MAX_NAME_SIZE,
	OBJECT_HEADER_SIZE,
} from './typesAndConstants';
import { convertLevelNameToASCII } from './util';
import isEqual from 'lodash/isEqual';
import { encodeObjectSets } from '../entities/util';
import { TILE_SIZE } from '../tiles/constants';
import { getSpriteLength } from './spriteLengths';
import { inGameLevels } from './inGameLevels';
import inRange from 'lodash/inRange';
import without from 'lodash/without';

type ParseFinalizeResult = {
	add: NewEditorEntity[];
	remove: NewEditorEntity[];
};

type ParseBinaryResult = {
	levelData: LevelData;
	name: string;
};

type UnknownObjectDef = {
	id: number;
	byteLength: number;
};

const unknownObjectDefs: Map<string, UnknownObjectDef[]> = new Map();
unknownObjectDefs.set('1-1', [
	{ id: 0x0, byteLength: 4 },
	{ id: 0x1, byteLength: 4 },
	{ id: 0x2, byteLength: 4 },
	{ id: 0x3, byteLength: 4 },
	{ id: 0x5, byteLength: 4 },
	{ id: 0xa, byteLength: 4 },
	{ id: 0xb, byteLength: 5 },
	{ id: 0x5b, byteLength: 4 },
	{ id: 0x5c, byteLength: 4 },
]);
unknownObjectDefs.set('9-9', [
	{ id: 0x36, byteLength: 4 },
	{ id: 0x5b, byteLength: 4 },
	{ id: 0x5c, byteLength: 4 },
	{ id: 0x9, byteLength: 4 },
	{ id: 0x12, byteLength: 4 },
	{ id: 0x37, byteLength: 4 },
	{ id: 0x38, byteLength: 4 },
]);

const ENTITIES = Object.freeze(Object.values(entityMap));

function parseLevelName(levelBytes: Uint8Array): string {
	const nameOffset =
		levelBytes[0] === 0 ? 0x40 : LEVEL_ECOIN_TILE_OFFSET + ECOIN_TILE_SIZE;

	return convertLevelNameToASCII(
		levelBytes.subarray(nameOffset, nameOffset + MAX_NAME_SIZE)
	);
}

function parseSpriteEntity(
	levelBytes: Uint8Array,
	offset: number
): { entity: NewEditorEntity; offset: number } | null {
	for (let i = 0; i < ENTITIES.length; ++i) {
		const entity = ENTITIES[i];

		if (entity.parseSprite) {
			const result = entity.parseSprite(levelBytes, offset);

			if (result) {
				return result;
			}
		}
	}

	return null;
}

function getRemainingObjectBytes(
	levelBytes: Uint8Array,
	lastOffset: number
): string {
	return Array.from(levelBytes.slice(lastOffset))
		.map((b) => b.toString(16))
		.join(', ');
}

function parseEReaderRoomSprites(
	levelBytes: Uint8Array,
	index: number
): NewEditorEntity[] {
	const view = new DataView(levelBytes.buffer);
	const spritePointer = ROOM_SPRITE_POINTERS[index];
	const blockPathMovementPointer = ROOM_BLOCKPATH_POINTERS[index];

	const spriteOffset = view.getUint16(spritePointer, true);
	const blockPathOffset = view.getUint16(blockPathMovementPointer, true);

	// sprites always have a leading zero for some reason
	const spriteData = levelBytes.slice(spriteOffset + 1, blockPathOffset);

	return parseSprites(spriteData);
}

function parseSprites(spriteData: Uint8Array): NewEditorEntity[] {
	let offset = 0;

	const entities: NewEditorEntity[] = [];

	while (offset < spriteData.byteLength && spriteData[offset] !== 0xff) {
		const result = parseSpriteEntity(spriteData, offset);

		if (result) {
			entities.push(result.entity);
			offset = result.offset;
		} else if (offset < spriteData.byteLength - 4) {
			const objectId = spriteData[offset + 1];
			const bank = spriteData[offset];
			const length = getSpriteLength(objectId, bank);
			const x = spriteData[offset + 2];
			const y = spriteData[offset + 3];

			entities.push({
				type: 'Unknown',
				x: x * TILE_SIZE,
				y: y * TILE_SIZE,
				settings: {
					type: 'sprite',
					objectId,
					rawBytes: Array.from(spriteData.subarray(offset, offset + length)),
				},
			});
			offset += length;
		} else {
			return entities;
		}
	}

	return entities;
}

function hasObjectSet(entity: Entity, encodedObjectSet: number): boolean {
	return (
		isEqual(entity.objectSets, [-1]) ||
		entity.objectSets.includes(encodedObjectSet)
	);
}

function parseObjectEntity(
	levelBytes: Uint8Array,
	offset: number,
	encodedObjectSet: number,
	inGame: boolean
): { entities: NewEditorEntity[]; offset: number } | null {
	for (let i = 0; i < ENTITIES.length; ++i) {
		const entity = ENTITIES[i];

		if (entity.parseObject && hasObjectSet(entity, encodedObjectSet)) {
			const result = entity.parseObject(levelBytes, offset, inGame);

			if (result) {
				return result;
			}
		}
	}

	return null;
}

function parseUnknownInGameObject(
	objectData: Uint8Array,
	offset: number
): { entity: NewEditorEntity; offset: number } | null {
	const fourAheadValue = objectData[offset + 4];

	let size = 4;
	if (fourAheadValue != 0 && fourAheadValue < 0x40) {
		size = 5;
	}

	if (offset + size > objectData.length) {
		return null;
	}

	const objectId = objectData[offset + 3];
	const x = objectData[offset + 2];
	const y = objectData[offset + 1];

	return {
		entity: {
			type: 'Unknown',
			x: x * TILE_SIZE,
			y: y * TILE_SIZE,
			settings: {
				type: 'object',
				objectId,
				rawBytes: Array.from(objectData.subarray(offset, offset + size)),
			},
		} as const,
		offset: offset + size,
	};
}

function parseUnknownEReaderObject(
	bytes: Uint8Array,
	offset: number,
	objectSet: number,
	gfxSet: number
): { entity: NewEditorEntity; offset: number } | null {
	const defs = unknownObjectDefs.get(`${objectSet}-${gfxSet}`);

	if (!defs) {
		return null;
	}

	const objectId = bytes[offset + 3];
	const def = defs.find((d) => d.id === objectId);
	const x = bytes[offset + 2];
	const y = bytes[offset + 1];

	if (def) {
		return {
			entity: {
				type: 'Unknown',
				x: x * TILE_SIZE,
				y: y * TILE_SIZE,
				settings: {
					type: 'object',
					objectId,
					rawBytes: Array.from(bytes.subarray(offset, offset + def.byteLength)),
				},
			} as const,
			offset: offset + def.byteLength,
		};
	}

	return null;
}

function parseEReaderRoomObjects(
	levelBytes: Uint8Array,
	index: number
): ReturnType<typeof parseObjects> {
	const view = new DataView(levelBytes.buffer);
	const objectPointer = ROOM_OBJECT_POINTERS[index];
	const levelSettingsPointer = ROOM_LEVELSETTING_POINTERS[index];

	const objectOffset = view.getUint16(objectPointer, true);
	const levelSettingsOffset = view.getUint16(levelSettingsPointer, true);

	const gfxSet = levelBytes[objectOffset + 7] & 0xf;
	const objectSet = levelBytes[levelSettingsOffset + 12];

	// when getting the objects, skip past the header
	const objectData = levelBytes.slice(
		objectOffset + OBJECT_HEADER_SIZE,
		levelSettingsOffset
	);

	return parseObjects(objectData, objectSet, gfxSet, false);
}

function parseObjects(
	objectData: Uint8Array,
	objectSet: number,
	gfxSet: number,
	inGame: boolean
): { objectEntities: NewEditorEntity[]; cellEntities: NewEditorEntity[] } {
	// eslint-disable-next-line no-console
	console.log('parseObjects: object set', objectSet, 'gfx set', gfxSet);

	const objectEntities: NewEditorEntity[] = [];
	const cellEntities: NewEditorEntity[] = [];

	const encodedObjectSet = encodeObjectSets([[objectSet, gfxSet]]).pop()!;

	let offset = 0;

	while (offset < objectData.length) {
		const result = parseObjectEntity(
			objectData,
			offset,
			encodedObjectSet,
			inGame
		);

		if (result) {
			if (result.entities.length === 0) {
				// eslint-disable-next-line no-console
				console.warn(
					`parseObjects: Empty entity array encountered after ${
						objectEntities.length + cellEntities.length
					} successes`
				);
				// eslint-disable-next-line no-console
				console.warn(
					'parseObjects: remaining bytes',
					getRemainingObjectBytes(objectData, offset)
				);

				return { objectEntities, cellEntities };
			}

			if (entityMap[result.entities[0].type].editorType === 'cell') {
				cellEntities.push(...result.entities);
			} else {
				objectEntities.push(...result.entities);
			}

			// eslint-disable-next-line no-console
			console.log(
				'parseObjects: consumed %s, got: %s',
				'[' +
					Array.from(objectData.slice(offset, result.offset))
						.map((b) => b.toString(16))
						.join(',') +
					']',
				result.entities.map((e) => `${e.type}(${e.x},${e.y})`).join(',')
			);
			offset = result.offset;
		} else {
			const unknownObjectResult = inGame
				? parseUnknownInGameObject(objectData, offset)
				: parseUnknownEReaderObject(objectData, offset, objectSet, gfxSet);

			if (unknownObjectResult) {
				// eslint-disable-next-line no-console
				console.warn(
					'parseObjects: unknown object captured',
					unknownObjectResult.entity.settings?.rawBytes
						.map((b: number) => b.toString(16))
						.join(' ')
				);
				objectEntities.push(unknownObjectResult.entity);
				offset = unknownObjectResult.offset;
			} else {
				// eslint-disable-next-line no-console
				console.warn(
					`parseObjects: unknown, uncapturable, object encountered after ${
						objectEntities.length + cellEntities.length
					} successes`
				);
				// eslint-disable-next-line no-console
				console.warn(
					'parseObjects: remaining bytes',
					getRemainingObjectBytes(objectData, offset)
				);

				return { objectEntities, cellEntities };
			}
		}
	}

	return { objectEntities, cellEntities };
}

function parseRoomSettings(
	levelBytes: Uint8Array,
	index: number
): RoomSettings {
	const view = new DataView(levelBytes.buffer);
	const objectPointer = ROOM_OBJECT_POINTERS[index];
	const objectOffset = view.getUint16(objectPointer, true);

	const bgGraphic = levelBytes[objectOffset + 10];

	const bgValues = Object.values(ROOM_BACKGROUND_SETTINGS).find((s) => {
		return s.bgGraphic === bgGraphic;
	});

	if (bgValues) {
		return {
			...bgValues,
			music: 0,
		};
	}

	return {
		bgColor: 0,
		bgExtraColorAndEffect: 0,
		bgGraphic: 0,
		music: 0,
	};
}

function parseRoomWidth(levelBytes: Uint8Array, index: number): number {
	const view = new DataView(levelBytes.buffer);
	const objectPointer = ROOM_OBJECT_POINTERS[index];
	const objectOffset = view.getUint16(objectPointer, true);

	const levelLength = levelBytes[objectOffset + 4];

	return ((levelLength & 0xf) + 1) * ROOM_WIDTH_INCREMENT;
}

function parseRoomHeight(levelBytes: Uint8Array, index: number): number {
	const view = new DataView(levelBytes.buffer);
	const levelSettingsPointer = ROOM_LEVELSETTING_POINTERS[index];
	const levelSettingsOffset = view.getUint16(levelSettingsPointer, true);

	const heightInPixels = view.getUint16(levelSettingsOffset, true);
	return Math.floor(heightInPixels / TILE_SIZE);
}

function hasRoomData(levelBytes: Uint8Array, index: number): boolean {
	const view = new DataView(levelBytes.buffer);
	const objectPointer = ROOM_OBJECT_POINTERS[index];
	const objectOffset = view.getUint16(objectPointer, true);

	return objectOffset < levelBytes.byteLength;
}

function cellsToMatrix(
	cells: NewEditorEntity[],
	idCounter: number
): { idCounter: number; matrix: EditorEntityMatrix } {
	const matrix: EditorEntityMatrix = [];

	cells.forEach((c) => {
		matrix[c.y] = matrix[c.y] ?? [];
		matrix[c.y]![c.x] = {
			...c,
			id: idCounter++,
		};
	});

	return { idCounter, matrix };
}

function parsePlayer(levelBytes: Uint8Array, index: number): NewEditorEntity {
	const view = new DataView(levelBytes.buffer);
	const levelSettingsPointer = ROOM_LEVELSETTING_POINTERS[index];
	const levelSettingsOffset = view.getUint16(levelSettingsPointer, true);

	const playerY = levelBytes[levelSettingsOffset + 8];
	const playerX = levelBytes[levelSettingsOffset + 9];

	return {
		type: 'Player',
		x: playerX * TILE_SIZE,
		// +1 because nintendo stores mario's position as if he is super Mario,
		// but Smaghetti stores it as if he is normal Mario
		y: (playerY + 1) * TILE_SIZE,
	};
}

function adjustY(entities: NewEditorEntity[]): void {
	entities.forEach((e) => {
		if (entityMap[e.type].editorType === 'cell') {
			e.y -= 1;
		} else {
			e.y -= TILE_SIZE;
		}
	});
}

function parseFinalize(entities: NewEditorEntity[]): ParseFinalizeResult {
	return Object.values(entityMap).reduce<ParseFinalizeResult>(
		(building, entityDef) => {
			if (!entityDef.parseFinalize) {
				return building;
			}

			const diff = entityDef.parseFinalize(entities);

			if (!diff) {
				return building;
			}

			return {
				add: building.add.concat(diff.add),
				remove: building.remove.concat(diff.remove),
			};
		},
		{ add: [], remove: [] }
	);
}

function parseRoom(
	levelBytes: Uint8Array,
	index: number,
	idCounter: number
): { roomData: RoomData; idCounter: number } | null {
	if (!hasRoomData(levelBytes, index)) {
		return null;
	}

	const player = parsePlayer(levelBytes, index);
	const spriteEntities = parseEReaderRoomSprites(levelBytes, index);
	const { objectEntities, cellEntities } = parseEReaderRoomObjects(
		levelBytes,
		index
	);

	const finalizeDiffs = parseFinalize(
		spriteEntities.concat(objectEntities, cellEntities)
	);

	const allNonCellEntities = without(
		spriteEntities.concat(
			objectEntities,
			player,
			finalizeDiffs.add.filter((e) => entityMap[e.type].editorType !== 'cell')
		),
		...finalizeDiffs.remove
	);

	const allCellEntities = without(
		cellEntities.concat(
			finalizeDiffs.add.filter((e) => entityMap[e.type].editorType === 'cell')
		),
		...finalizeDiffs.remove
	);

	adjustY(allCellEntities);
	adjustY(allNonCellEntities);

	const actorSpriteEntities = allNonCellEntities.reduce<EditorEntity[]>(
		(building, e) => {
			if (entityMap[e.type].layer === 'actor') {
				return building.concat({
					...e,
					id: idCounter++,
				});
			} else {
				return building;
			}
		},
		[]
	);

	const stageSpriteEntities = allNonCellEntities.reduce<EditorEntity[]>(
		(building, e) => {
			if (entityMap[e.type].layer === 'stage') {
				return building.concat({
					...e,
					id: idCounter++,
				});
			} else {
				return building;
			}
		},
		[]
	);

	const stageCells = allCellEntities.filter(
		(c) => entityMap[c.type].layer === 'stage'
	);
	const actorCells = allCellEntities.filter(
		(c) => entityMap[c.type].layer === 'actor'
	);

	const stageMatrixResult = cellsToMatrix(stageCells, idCounter);
	const actorMatrixResult = cellsToMatrix(
		actorCells,
		stageMatrixResult.idCounter
	);

	return {
		roomData: {
			settings: parseRoomSettings(levelBytes, index),
			paletteEntries: [],
			actors: {
				entities: actorSpriteEntities,
				matrix: actorMatrixResult.matrix,
			},
			stage: {
				entities: stageSpriteEntities,
				matrix: stageMatrixResult.matrix,
			},

			roomTileHeight: parseRoomHeight(levelBytes, index),
			roomTileWidth: parseRoomWidth(levelBytes, index),
		},
		idCounter: actorMatrixResult.idCounter,
	};
}

function parseBinaryEReaderLevel(levelBytes: Uint8Array): ParseBinaryResult {
	const name = parseLevelName(levelBytes);

	let idCounter = 1;

	const rooms = [0, 1, 2, 3].reduce<RoomData[]>((building, index) => {
		const roomResult = parseRoom(levelBytes, index, idCounter);

		if (roomResult) {
			idCounter = roomResult.idCounter;
			return building.concat(roomResult.roomData);
		} else {
			return building;
		}
	}, []);

	return {
		levelData: {
			rooms,
			settings: {
				timer: 300,
			},
		},
		name,
	};
}

function getObjectAndGraphicSetForInGameLevel(
	root: number,
	rom: Uint8Array
): { objectSet: number; gfxSet: number } {
	const objectSet = rom[root + 6] & 0xf;
	const gfxSet = rom[root + 7] & 0x1f;

	return { objectSet, gfxSet };
}

const rawYToYposition: Record<number, number> = {
	0: 18,
	1: 18,
	2: 5,
	3: 5,
	4: 0,
	5: 0,
	6: 16,
	7: 16,
	8: 4,
	9: 4,
	0xa: 8,
	0xb: 8,
	0xc: 12,
	0xd: 12,
	0xe: 19,
	0xf: 19,
};

function parsePlayerFromInGameLevel(header: Uint8Array): NewEditorEntity {
	// TODO: these don't seem correct at all
	const rawY = header[4] >> 4;
	const rawX = header[5] & 0xf;

	let x = 0;

	if (inRange(rawX, 0, 0x20) || inRange(rawX, 0x80, 0xa0)) {
		x = 1;
	}

	if (inRange(rawX, 0x20, 0x40) || inRange(rawX, 0xa0, 0xc0)) {
		x = 7;
	}

	if (inRange(rawX, 0x40, 0x60) || inRange(rawX, 0xc0, 0xe0)) {
		x = 0xd;
	}

	if (inRange(rawX, 0x60, 0x80) || inRange(rawX, 0xe0, 0x100)) {
		x = 0;
	}

	return {
		type: 'Player',
		x: x * TILE_SIZE,
		y: ((rawYToYposition[rawY] ?? 0) + 6) * TILE_SIZE,
	};
}

function parseInGameLevelTileWidth(header: Uint8Array): number {
	const nibble = header[4] & 0xf;

	return (nibble + 1) * 16;
}

function parseInGameLevelBGGraphic(header: Uint8Array): number {
	return header[10];
}

type InGameObjectHeader = {
	player: NewEditorEntity;
	roomTileWidth: number;
	bgGraphic: number;
};

function parseInGameLevelObjectHeader(header: Uint8Array): InGameObjectHeader {
	const roomTileWidth = parseInGameLevelTileWidth(header);
	const player = parsePlayerFromInGameLevel(header);
	const bgGraphic = parseInGameLevelBGGraphic(header);

	return {
		roomTileWidth,
		player,
		bgGraphic,
	};
}

/**
 * this is a hacky function which hopefully ultimately goes away.
 * in game levels seem to have mysterious sections that are not objects
 * this function patchs those sections out in the pursuit of hopefully
 * learning more
 * see: https://github.com/city41/smaghetti/discussions/166
 */
function patchOutUnknownData(objectData: Uint8Array, levelId: string) {
	switch (levelId) {
		case '1-1': {
			const data = Array.from(objectData);
			const first80I = data.indexOf(0x80);
			const second801 = data.indexOf(0x80, first80I + 1);
			data.splice(second801, 4);

			return new Uint8Array(data);
		}
	}

	return objectData;
}

function parseBinaryInGameLevel(
	levelId: string,
	rom: Uint8Array
): ParseBinaryResult {
	const inGameLevel = inGameLevels.find((igl) => igl.name === levelId);

	if (!inGameLevel) {
		throw new Error(`Failed to get InGameLevel entry for ${levelId}`);
	}

	if (inGameLevel.root === undefined) {
		throw new Error(`InGameLevel entry for ${levelId} has no root`);
	}

	let newSpriteEntities: NewEditorEntity[] = [];

	if (inGameLevel.sprites) {
		// sprites always start with a leading zero, skip past it
		const spriteData = rom.slice(inGameLevel.sprites + 1);
		newSpriteEntities = parseSprites(spriteData);
	}

	let idCounter = 1;

	const { objectSet, gfxSet } = getObjectAndGraphicSetForInGameLevel(
		inGameLevel.root,
		rom
	);

	const objectHeader = rom.slice(
		inGameLevel.root,
		inGameLevel.root + IN_GAME_LEVEL_HEADER_SIZE
	);

	const endIndex = rom.indexOf(
		0xff,
		inGameLevel.root + IN_GAME_LEVEL_HEADER_SIZE
	);
	const objectData = rom.slice(
		inGameLevel.root + IN_GAME_LEVEL_HEADER_SIZE,
		endIndex
	);

	const parseObjectsResult = parseObjects(
		patchOutUnknownData(objectData, levelId),
		objectSet,
		gfxSet,
		true
	);
	const objectEntities = parseObjectsResult.objectEntities;
	const cellEntities = parseObjectsResult.cellEntities;
	const { roomTileWidth, player, bgGraphic } = parseInGameLevelObjectHeader(
		objectHeader
	);

	const allNonCellEntities = newSpriteEntities.concat(objectEntities, player);

	adjustY(cellEntities);
	adjustY(allNonCellEntities);

	const actorSpriteEntities = allNonCellEntities.reduce<EditorEntity[]>(
		(building, e) => {
			if (entityMap[e.type].layer === 'actor') {
				return building.concat({
					...e,
					id: idCounter++,
				});
			} else {
				return building;
			}
		},
		[]
	);

	const stageSpriteEntities = allNonCellEntities.reduce<EditorEntity[]>(
		(building, e) => {
			if (entityMap[e.type].layer === 'stage') {
				return building.concat({
					...e,
					id: idCounter++,
				});
			} else {
				return building;
			}
		},
		[]
	);

	const stageCells = cellEntities.filter(
		(c) => entityMap[c.type].layer === 'stage'
	);
	const actorCells = cellEntities.filter(
		(c) => entityMap[c.type].layer === 'actor'
	);

	const stageMatrixResult = cellsToMatrix(stageCells, idCounter);
	const actorMatrixResult = cellsToMatrix(
		actorCells,
		stageMatrixResult.idCounter
	);

	const room: RoomData = {
		settings: {
			...ROOM_BACKGROUND_SETTINGS.plains,
			bgGraphic,
			music: MUSIC_VALUES.Plains,
		},
		paletteEntries: [],
		actors: {
			entities: actorSpriteEntities,
			matrix: actorMatrixResult.matrix,
		},
		stage: {
			entities: stageSpriteEntities,
			matrix: stageMatrixResult.matrix,
		},

		roomTileHeight: 26,
		roomTileWidth,
	};

	return {
		levelData: {
			rooms: [room],
			settings: {
				timer: 300,
			},
		},
		name: levelId,
	};
}

export { parseBinaryEReaderLevel, parseBinaryInGameLevel, parseSprites };
