import { ROOM_SPRITE_POINTERS } from '../levelData/constants';
import { entityMap } from '../entities/entityMap';
import {
	bank0SpriteIdToEntityType,
	bank1SpriteIdToEntityType,
} from '../entities/spriteIdMap';

type LevelSprite = {
	bank: number;
	x: number;
	y: number;
	id: number;
	rawBytes: number[];
};

function parseSprite(
	levelData: Uint8Array | number[],
	spriteIndex: number
): LevelSprite {
	const bank = levelData[spriteIndex];
	const id = levelData[spriteIndex + 1];

	const spriteIdToEntityType =
		bank === 0 ? bank0SpriteIdToEntityType : bank1SpriteIdToEntityType;
	const EntityType = entityMap[spriteIdToEntityType[id]];

	const rawByteLength = bank === 0 ? 4 : 6;
	const rawBytes = Array.from(
		levelData.slice(spriteIndex, spriteIndex + rawByteLength)
	);

	if (EntityType && EntityType.parseBinary) {
		return EntityType.parseBinary(rawBytes);
	} else {
		return {
			bank,
			id,
			x: levelData[spriteIndex + 2],
			y: levelData[spriteIndex + 3],
			rawBytes,
		};
	}
}

function parseSprites(
	data: Uint8Array | number[],
	index: number
): LevelSprite[] {
	const sprites = [];

	while (data[index] !== 0xff && index < data.length) {
		const sprite = parseSprite(data, index);
		sprites.push(sprite);
		index += sprite.rawBytes.length;
	}

	return sprites;
}

function parseSpritesFromLevelFile(
	levelData: Uint8Array,
	roomIndex: 0 | 1 | 2 | 3 = 0
): LevelSprite[] {
	const view = new DataView(levelData.buffer);

	const pointer = ROOM_SPRITE_POINTERS[roomIndex];
	let spriteIndex = view.getUint16(pointer, true);

	// technically this is where the sprites start, but there is always a null
	// byte to kick things off that needs to be skipped
	spriteIndex += 1;

	return parseSprites(levelData, spriteIndex);
}
export { parseSpritesFromLevelFile, parseSprites, parseSprite };
export type { LevelSprite };
