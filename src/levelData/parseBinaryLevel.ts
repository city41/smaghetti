import { ROOM_WIDTH_INCREMENT } from '../components/editor/constants';
import { entityMap } from '../entities/entityMap';
import {
	ROOM_BACKGROUND_SETTINGS,
	ROOM_BLOCKPATH_POINTERS,
	ROOM_OBJECT_POINTERS,
	ROOM_SPRITE_POINTERS,
} from './constants';
import {
	ECOIN_TILE_SIZE,
	LEVEL_ECOIN_TILE_OFFSET,
	MAX_NAME_SIZE,
} from './typesAndConstants';
import { convertLevelNameToASCII } from './util';

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
	const entities = Object.values(entityMap);

	for (let i = 0; i < entities.length; ++i) {
		const entity = entities[i];

		if (entity.parseSprite) {
			const result = entity.parseSprite(levelBytes, offset);

			if (result) {
				return result;
			}
		}
	}

	return null;
}

function getRemainingSpriteBytes(
	levelBytes: Uint8Array,
	index: number,
	lastOffset: number
): string {
	const view = new DataView(levelBytes.buffer);
	const blockPathPointer = ROOM_BLOCKPATH_POINTERS[index];
	const blockPathOffset = view.getUint16(blockPathPointer, true);

	const bytes = [];

	for (let i = lastOffset; i < blockPathOffset; ++i) {
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
			entities.push(result.entity), (offset = result.offset);
		} else {
			// eslint-disable-next-line no-console
			console.warn('unknown sprite encountered');
			// eslint-disable-next-line no-console
			console.warn(
				'remaining bytes',
				getRemainingSpriteBytes(levelBytes, index, offset)
			);

			return entities;
		}
	}

	return entities;
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

	return levelLength & (0xf * ROOM_WIDTH_INCREMENT);
}

function parseRoom(
	levelBytes: Uint8Array,
	index: number,
	idCounter: number
): { roomData: RoomData; idCounter: number } {
	const spriteEntities = parseSprites(levelBytes, index);

	const actorSpriteEntities = spriteEntities.reduce<EditorEntity[]>(
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

	const stageSpriteEntities = spriteEntities.reduce<EditorEntity[]>(
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

	return {
		roomData: {
			settings: parseRoomSettings(levelBytes, index),
			paletteEntries: [],
			actors: {
				entities: actorSpriteEntities,
				matrix: [],
			},
			stage: {
				entities: stageSpriteEntities,
				matrix: [],
			},

			roomTileHeight: 30,
			roomTileWidth: parseRoomWidth(levelBytes, index),
		},
		idCounter,
	};
}

function parseBinaryLevel(
	levelBytes: Uint8Array
): { levelData: LevelData; name: string } {
	const name = parseLevelName(levelBytes);

	let idCounter = 1;

	const room0Result = parseRoom(levelBytes, 0, idCounter);
	idCounter = room0Result.idCounter;

	return {
		levelData: {
			rooms: [room0Result.roomData],
			settings: {
				timer: 300,
			},
		},
		name,
	};
}

export { parseBinaryLevel };
