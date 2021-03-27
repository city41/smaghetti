import { ROOM0_SPRITE_POINTER_ADDRESS } from '../levelData/constants';
import { spriteMap } from '../entities/entityMap';
import {
	bank0SpriteIdToSpriteType,
	bank1SpriteIdToSpriteType,
} from '../entities/spriteIdMap';

type LevelSprite = {
	bank: number;
	x: number;
	y: number;
	id: number;
	rawBytes: number[];
};

function extractSprite(
	levelData: Uint8Array,
	spriteIndex: number
): LevelSprite {
	const bank = levelData[spriteIndex];
	const id = levelData[spriteIndex + 1];

	const spriteIdToSpriteType =
		bank === 0 ? bank0SpriteIdToSpriteType : bank1SpriteIdToSpriteType;
	const SpriteType = spriteMap[spriteIdToSpriteType[id]];

	const rawByteLength = bank === 0 ? 4 : 6;
	const rawBytes = Array.from(
		levelData.slice(spriteIndex, spriteIndex + rawByteLength)
	);

	if (SpriteType && SpriteType.parseBinary) {
		return SpriteType.parseBinary(rawBytes);
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

function parseSpritesFromLevelFile(levelData: Uint8Array): LevelSprite[] {
	const view = new DataView(levelData.buffer);

	let spriteIndex = view.getUint16(ROOM0_SPRITE_POINTER_ADDRESS, true);

	// technically this is where the sprites start, but there is always a null
	// byte to kick things off that needs to be skipped
	spriteIndex += 1;

	const sprites = [];

	while (levelData[spriteIndex] !== 0xff) {
		const sprite = extractSprite(levelData, spriteIndex);
		sprites.push(sprite);
		spriteIndex += sprite.rawBytes.length;
	}

	return sprites;
}
export { parseSpritesFromLevelFile };
export type { LevelSprite };
