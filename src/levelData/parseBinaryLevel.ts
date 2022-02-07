import { ROOM_WIDTH_INCREMENT } from '../components/editor/constants';
import { entityMap } from '../entities/entityMap';
import { Entity } from '../entities/types';
import {
	MUSIC_VALUES,
	ROOM_BACKGROUND_SETTINGS,
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_POINTERS,
	ROOM_SPRITE_POINTERS,
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

	const spriteOffset = view.getUint16(spritePointer, true);

	// sprites always have a leading zero for some reason
	const spriteData = levelBytes.slice(spriteOffset + 1);

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
		} else {
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
	encodedObjectSet: number
): { entities: NewEditorEntity[]; offset: number } | null {
	for (let i = 0; i < ENTITIES.length; ++i) {
		const entity = ENTITIES[i];

		if (entity.parseObject && hasObjectSet(entity, encodedObjectSet)) {
			const result = entity.parseObject(levelBytes, offset);

			if (result) {
				return result;
			}
		}
	}

	return null;
}

function parseUnknownObject(
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
	const objectData = levelBytes.slice(objectOffset + OBJECT_HEADER_SIZE);

	return parseObjects(objectData, objectSet, gfxSet);
}

function parseObjects(
	objectData: Uint8Array,
	objectSet: number,
	gfxSet: number
): { objectEntities: NewEditorEntity[]; cellEntities: NewEditorEntity[] } {
	// eslint-disable-next-line no-console
	console.log('parseObjects: object set', objectSet, 'gfx set', gfxSet);

	const objectEntities: NewEditorEntity[] = [];
	const cellEntities: NewEditorEntity[] = [];

	const encodedObjectSet = encodeObjectSets([[objectSet, gfxSet]]).pop()!;

	let offset = 0;

	while (offset < objectData.length && objectData[offset] !== 0xff) {
		const result = parseObjectEntity(objectData, offset, encodedObjectSet);

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

			if (entityMap[result.entities[0].type].editorType === 'entity') {
				objectEntities.push(...result.entities);
			} else {
				cellEntities.push(...result.entities);
			}
			offset = result.offset;
		} else {
			const unknownObjectResult = parseUnknownObject(
				objectData,
				offset,
				objectSet,
				gfxSet
			);

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
					`parseObjects: unknown object encountered after ${
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
	const allNonCellEntities = spriteEntities.concat(objectEntities, player);

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
	const gfxSet = rom[root + 7];

	return { objectSet, gfxSet };
}

function parseBinaryInGameLevel(
	levelId: '1-1',
	rom: Uint8Array
): ParseBinaryResult {
	const inGameLevel = inGameLevels.find((igl) => igl.name === levelId);

	if (!inGameLevel) {
		throw new Error(`Failed to get InGameLevel entry for ${levelId}`);
	}

	if (inGameLevel.sprites === undefined) {
		throw new Error(`InGameLevel entry for ${levelId} has no sprite offset`);
	}

	if (inGameLevel.root === undefined) {
		throw new Error(`InGameLevel entry for ${levelId} has no root`);
	}

	// sprites always start with a leading zero, skip past it
	const spriteData = rom.slice(inGameLevel.sprites + 1);
	const newSpriteEntities = parseSprites(spriteData);

	let idCounter = 1;

	const { objectSet, gfxSet } = getObjectAndGraphicSetForInGameLevel(
		inGameLevel.root,
		rom
	);

	const { objectEntities, cellEntities } = parseObjects(
		rom.slice(inGameLevel.root + 15),
		objectSet,
		gfxSet
	);

	const allNonCellEntities = newSpriteEntities.concat(objectEntities);

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

		roomTileHeight: 27,
		roomTileWidth: 128,
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

export { parseBinaryEReaderLevel, parseBinaryInGameLevel };
