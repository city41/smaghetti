import { ROOM_WIDTH_INCREMENT } from '../components/editor/constants';
import { entityMap } from '../entities/entityMap';
import { Entity } from '../entities/types';
import {
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
	index: number,
	lastOffset: number
): string {
	const view = new DataView(levelBytes.buffer);
	const spritePointer = ROOM_SPRITE_POINTERS[index];
	const spriteOffset = view.getUint16(spritePointer, true);

	const bytes = [];

	for (let i = lastOffset; i < spriteOffset; ++i) {
		bytes.push(levelBytes[i]);
	}

	return bytes.map((b) => b.toString(16)).join(', ');
}

function parseSprites(
	levelBytes: Uint8Array,
	index: number
): NewEditorEntity[] {
	const view = new DataView(levelBytes.buffer);
	const spritePointer = ROOM_SPRITE_POINTERS[index];

	const spriteOffset = view.getUint16(spritePointer, true);

	// sprites always have an opening zero for some reason
	let offset = spriteOffset + 1;

	const entities: NewEditorEntity[] = [];

	while (offset < levelBytes.byteLength && levelBytes[offset] !== 0xff) {
		const result = parseSpriteEntity(levelBytes, offset);

		if (result) {
			entities.push(result.entity);
			offset = result.offset;
		} else {
			const objectId = levelBytes[offset + 1];
			const bank = levelBytes[offset];
			const length = getSpriteLength(objectId, bank);
			const x = levelBytes[offset + 2];
			const y = levelBytes[offset + 3];

			entities.push({
				type: 'Unknown',
				x: x * TILE_SIZE,
				y: y * TILE_SIZE,
				settings: {
					type: 'sprite',
					objectId,
					rawBytes: Array.from(levelBytes.subarray(offset, offset + length)),
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

type UnknownObjectDef = {
	id: number;
	byteLength: number;
};

const unknownObjectDefs: Map<string, UnknownObjectDef[]> = new Map();
// unknownObjectDefs.set('1-1', [{ id: 0x1f, byteLength: 4 }]);

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

function parseObjects(
	levelBytes: Uint8Array,
	index: number
): { objectEntities: NewEditorEntity[]; cellEntities: NewEditorEntity[] } {
	const view = new DataView(levelBytes.buffer);
	const objectPointer = ROOM_OBJECT_POINTERS[index];
	const levelSettingsPointer = ROOM_LEVELSETTING_POINTERS[index];

	const objectOffset = view.getUint16(objectPointer, true);
	const levelSettingsOffset = view.getUint16(levelSettingsPointer, true);

	const objectEntities: NewEditorEntity[] = [];
	const cellEntities: NewEditorEntity[] = [];

	const gfxSet = levelBytes[objectOffset + 7] & 0xf;
	const objectSet = levelBytes[levelSettingsOffset + 12];
	const encodedObjectSet = encodeObjectSets([[objectSet, gfxSet]]).pop()!;

	let offset = objectOffset + OBJECT_HEADER_SIZE;

	while (offset < levelBytes.length && levelBytes[offset] !== 0xff) {
		const result = parseObjectEntity(levelBytes, offset, encodedObjectSet);

		if (result) {
			if (result.entities.length === 0) {
				// eslint-disable-next-line no-console
				console.warn(
					`Empty entity array encountered in room ${index}, after ${
						objectEntities.length + cellEntities.length
					} successes`
				);
				// eslint-disable-next-line no-console
				console.warn(
					'remaining bytes',
					getRemainingObjectBytes(levelBytes, index, offset)
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
				levelBytes,
				offset,
				objectSet,
				gfxSet
			);

			if (unknownObjectResult) {
				// eslint-disable-next-line no-console
				console.warn(
					'unknown object captured',
					unknownObjectResult.entity.settings?.rawBytes
						.map((b: number) => b.toString(16))
						.join(' ')
				);
				objectEntities.push(unknownObjectResult.entity);
				offset = unknownObjectResult.offset;
			} else {
				// eslint-disable-next-line no-console
				console.warn(
					`unknown object encountered in room ${index}, after ${
						objectEntities.length + cellEntities.length
					} successes`
				);
				// eslint-disable-next-line no-console
				console.warn(
					'remaining bytes',
					getRemainingObjectBytes(levelBytes, index, offset)
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
	const spriteEntities = parseSprites(levelBytes, index);
	const { objectEntities, cellEntities } = parseObjects(levelBytes, index);
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

function parseBinaryLevel(
	levelBytes: Uint8Array
): { levelData: LevelData; name: string } {
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

export { parseBinaryLevel };
