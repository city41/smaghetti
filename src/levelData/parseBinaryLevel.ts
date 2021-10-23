import { entityMap } from '../entities/entityMap';
import { ROOM_SPRITE_POINTERS } from './constants';
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

function parseSprites(
	levelBytes: Uint8Array,
	index: number
): NewEditorEntity[] {
	const view = new DataView(levelBytes.buffer);
	const spritePointer = ROOM_SPRITE_POINTERS[index];

	const spriteOffset = view.getUint16(spritePointer, true);

	let offset = spriteOffset;

	const entities: NewEditorEntity[] = [];

	while (offset < levelBytes.byteLength && levelBytes[offset] !== 0xff) {
		const result = parseSpriteEntity(levelBytes, offset);

		if (result) {
			entities.push(result.entity), (offset = result.offset);
		} else {
			offset += 1;
		}
	}

	return entities;
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
			settings: {
				bgColor: 0,
				bgExtraColorAndEffect: 0,
				bgGraphic: 0,
				music: 0,
			},
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
			roomTileWidth: 32,
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
