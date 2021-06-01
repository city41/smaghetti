import { ROOM_SPRITE_POINTERS } from '../levelData/constants';
import { knownBank0SpriteIds, knownBank1SpriteIds } from './knownIds';
import { entityMap } from '../entities/entityMap';

type LevelSprite = {
	bank: number;
	x: number;
	y: number;
	id: number;
	rawBytes: number[];
	param1?: number;
	param2?: number;
	isKnown: boolean;
};

function getRawByteLength(
	bank: number,
	id: number,
	fourByteIds: number[],
	fiveByteIds: number[],
	sixByteIds: number[]
): { rawByteLength: number; isKnown: boolean } {
	const matchingEntity = Object.entries(entityMap).find((entry) => {
		const e = entry[1];
		return (
			!!e.toSpriteBinary &&
			(e.objectId === id || e.alternateObjectIds?.includes(id)) &&
			e.toSpriteBinary(0, 0, 1, 1, {})[0] === bank
		);
	});

	if (matchingEntity) {
		return {
			isKnown: true,
			rawByteLength: matchingEntity[1].toSpriteBinary!(0, 0, 1, 1, {}).length,
		};
	}

	const knownMap = bank === 0 ? knownBank0SpriteIds : knownBank1SpriteIds;

	let rawByteLength = 4;

	// the passed in byte arrays are overrides coming from hex-tree
	// they get priority. From there the least number of bytes that can
	// satisfy get priority. But note that if we got down here, we don't
	// set isKnown to true because these are still guesses

	if (fourByteIds.includes(id)) {
		rawByteLength = 4;
	} else if (fiveByteIds.includes(id)) {
		rawByteLength = 5;
	} else if (sixByteIds.includes(id)) {
		rawByteLength = 6;
	} else if (knownMap[4].includes(id)) {
		rawByteLength = 4;
	} else if (knownMap[5].includes(id)) {
		rawByteLength = 5;
	} else if (knownMap[6].includes(id)) {
		rawByteLength = 6;
	}

	return { rawByteLength, isKnown: false };
}

function parseSprite(
	levelData: Uint8Array | number[],
	spriteIndex: number,
	fourByteIds: number[],
	fiveByteIds: number[],
	sixByteIds: number[]
): LevelSprite {
	const bank = levelData[spriteIndex];
	const id = levelData[spriteIndex + 1];

	const { rawByteLength, isKnown } = getRawByteLength(
		bank,
		id,
		fourByteIds,
		fiveByteIds,
		sixByteIds
	);

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
		isKnown,
	};
}

function parseSprites(
	data: Uint8Array | number[],
	index: number,
	fourByteIds: number[],
	fiveByteIds: number[],
	sixByteIds: number[]
): LevelSprite[] {
	const sprites = [];

	while (data[index] !== 0xff && index < data.length) {
		const sprite = parseSprite(
			data,
			index,
			fourByteIds,
			fiveByteIds,
			sixByteIds
		);
		sprites.push(sprite);
		index += sprite.rawBytes.length;
	}

	return sprites;
}

function parseSpritesFromLevelFile(
	levelData: Uint8Array,
	roomIndex: 0 | 1 | 2 | 3 = 0,
	fourByteIds: number[],
	fiveByteIds: number[],
	sixByteIds: number[]
): LevelSprite[] {
	const view = new DataView(levelData.buffer);

	const pointer = ROOM_SPRITE_POINTERS[roomIndex];
	let spriteIndex = view.getUint16(pointer, true);

	// technically this is where the sprites start, but there is always a null
	// byte to kick things off that needs to be skipped
	spriteIndex += 1;

	return parseSprites(
		levelData,
		spriteIndex,
		fourByteIds,
		fiveByteIds,
		sixByteIds
	);
}
export { parseSpritesFromLevelFile, parseSprites, parseSprite };
export type { LevelSprite };
