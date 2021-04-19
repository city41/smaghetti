import { ROOM_SPRITE_POINTERS } from '../levelData/constants';

type LevelSprite = {
	bank: number;
	x: number;
	y: number;
	id: number;
	rawBytes: number[];
	param1?: number;
	param2?: number;
};

const knownFourByteIds: number[] = [];
const knownFiveByteIds: number[] = [
	0xb9, // fortress fire bars
];
const knownSixByteIds: number[] = [];

function parseSprite(
	levelData: Uint8Array | number[],
	spriteIndex: number,
	fourByteIds: number[],
	fiveByteIds: number[],
	sixByteIds: number[]
): LevelSprite {
	const bank = levelData[spriteIndex];
	const id = levelData[spriteIndex + 1];

	const allKnownFourByteIds = [...knownFourByteIds, ...fourByteIds];

	const allKnownFiveByteIds = [...knownFiveByteIds, ...fiveByteIds];

	const allKnownSixByteIds = [...knownSixByteIds, ...sixByteIds];

	let rawByteLength = 4;

	if (allKnownFourByteIds.includes(id)) {
		rawByteLength = 4;
	}
	if (allKnownFiveByteIds.includes(id)) {
		rawByteLength = 5;
	}
	if (allKnownSixByteIds.includes(id)) {
		rawByteLength = 6;
	}

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
