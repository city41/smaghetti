import { ROOM_SPRITE_POINTERS } from '../levelData/constants';
import { getSpriteLength } from './spriteLengths';
import { entityMap } from '../entities/entityMap';

type LevelSprite = {
	bank: number;
	x: number;
	y: number;
	id: number;
	rawBytes: number[];
	param1?: number;
	param2?: number;
};

function getRawByteLength(bank: number, id: number): number {
	const matchingEntity = Object.entries(entityMap).find((entry) => {
		const e = entry[1];
		return (
			!!e.toSpriteBinary &&
			(e.objectId === id || e.alternateObjectIds?.includes(id)) &&
			e.toSpriteBinary({ x: 0, y: 0, w: 1, h: 1, settings: {} })[0] === bank &&
			e.toSpriteBinary({ x: 0, y: 0, w: 1, h: 1, settings: {} })[1] === id
		);
	});

	// bank1,id5 causes matchingEntity to choose BowserLaserStatue,
	// which is an odd case since it is an object that also emits a sprite
	// (the laser itself)
	// so a crappy hack to avoid that bad pick
	// TODO: once get decent at reverse engineering, should have a very solid
	// way to do all this *cross fingers*
	if (matchingEntity && !(bank === 1 && id === 5)) {
		return matchingEntity[1].toSpriteBinary!({
			x: 0,
			y: 0,
			w: 1,
			h: 1,
			settings: {},
		}).length;
	}

	return getSpriteLength(id, bank);
}

function parseSprite(
	levelData: Uint8Array | number[],
	spriteIndex: number
): LevelSprite {
	const bank = levelData[spriteIndex];
	const id = levelData[spriteIndex + 1];

	const rawByteLength = getRawByteLength(bank, id);

	const rawBytes = Array.from(
		levelData.slice(spriteIndex, spriteIndex + rawByteLength)
	);

	return {
		bank,
		id,
		x: levelData[spriteIndex + 2],
		y: levelData[spriteIndex + 3],
		param1: rawBytes[4],
		param2: rawBytes[5],
		rawBytes,
	};
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
