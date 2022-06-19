import {
	IN_GAME_LEVEL_HEADER_SIZE,
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_HEADER_SIZE_IN_BYTES,
	ROOM_OBJECT_POINTERS,
	ROOM_SPRITE_POINTERS,
} from './constants';

export const LEVEL_1_1_OBJECT_OFFSET = 0x1408d6;
const LEVEL_1_1_SPRITE_OFFSET = 0x157811 + 1;
const LEVEL_1_1_OBJECT_HEADER_OFFSET =
	LEVEL_1_1_OBJECT_OFFSET - IN_GAME_LEVEL_HEADER_SIZE;
const LEVEL_1_1_MARIO_X = LEVEL_1_1_OBJECT_HEADER_OFFSET + 5;
const LEVEL_1_1_MARIO_Y = LEVEL_1_1_OBJECT_HEADER_OFFSET + 4;
const LEVEL_1_1_OBJECT_SET = LEVEL_1_1_OBJECT_HEADER_OFFSET + 6;

/*
 * a very simple overwriting of 1-1 using an e-reader level as the input
 */
export function overwriteLevel1_1(
	rom: Uint8Array,
	level: Uint8Array
): Uint8Array {
	const levelView = new DataView(level.buffer);

	const levelSettingsOffset = levelView.getUint16(
		ROOM_LEVELSETTING_POINTERS[0],
		true
	);

	rom[LEVEL_1_1_MARIO_X] = level[levelSettingsOffset + 9];
	rom[LEVEL_1_1_MARIO_Y] =
		((level[levelSettingsOffset + 8] & 0xf) << 8) |
		(rom[LEVEL_1_1_MARIO_Y] & 0xf);
	rom[LEVEL_1_1_OBJECT_SET] = level[levelSettingsOffset + 12];

	// inject objects
	const levelObjectOffset =
		levelView.getUint16(ROOM_OBJECT_POINTERS[0], true) +
		ROOM_OBJECT_HEADER_SIZE_IN_BYTES;

	let i: number;
	for (i = 0; level[levelObjectOffset + i] !== 0xff; ++i) {
		rom[LEVEL_1_1_OBJECT_OFFSET + i] = level[levelObjectOffset + i];
	}
	rom[LEVEL_1_1_OBJECT_OFFSET + i] = 0xff;

	// inject sprites
	const levelSpriteOffset =
		levelView.getUint16(ROOM_SPRITE_POINTERS[0], true) + 1;

	for (i = 0; level[levelSpriteOffset + i] !== 0xff; ++i) {
		rom[LEVEL_1_1_SPRITE_OFFSET + i] = level[levelSpriteOffset + i];
	}
	rom[LEVEL_1_1_SPRITE_OFFSET + i] = 0xff;

	return rom;
}
