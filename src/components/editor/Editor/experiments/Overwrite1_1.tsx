import React from 'react';
import {
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_HEADER_SIZE_IN_BYTES,
	ROOM_OBJECT_POINTERS,
} from '../../../../levelData/constants';
import { Button } from '../../../Button';

const LEVEL_1_1_OBJECT_OFFSET = 0x1408d6;
const LEVEL_1_1_SPRITE_OFFSET = 0x157811 + 1;
const LEVEL_1_1_OBJECT_HEADER_OFFSET = LEVEL_1_1_OBJECT_OFFSET - 15;
const LEVEL_1_1_MARIO_X = LEVEL_1_1_OBJECT_HEADER_OFFSET + 5;
const LEVEL_1_1_MARIO_Y = LEVEL_1_1_OBJECT_HEADER_OFFSET + 4;
const LEVEL_1_1_OBJECT_SET = LEVEL_1_1_OBJECT_HEADER_OFFSET + 6;

function overwriteLevel1_1(rom: Uint8Array, level: Uint8Array): Uint8Array {
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

	const levelObjectOffset =
		levelView.getUint16(ROOM_OBJECT_POINTERS[0], true) +
		ROOM_OBJECT_HEADER_SIZE_IN_BYTES;
	let i = 0;

	while (level[levelObjectOffset + i] !== 0xff) {
		rom[LEVEL_1_1_OBJECT_OFFSET + i] = level[levelObjectOffset + i];
		++i;
	}
	rom[LEVEL_1_1_OBJECT_OFFSET + i] = 0xff;
	rom[LEVEL_1_1_SPRITE_OFFSET] = 0xff;

	return rom;
}

function Overwrite1_1() {
	function handleSetOverwrite() {
		// @ts-ignore
		window.overwrite1_1 = true;
	}

	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Replace 1-1</h1>
			<div className="text-gray-400 flex flex-col gap-y-4">
				<p>
					Have your Smaghetti level replace 1-1. Once you launch the emulator,
					exit back to the main game and go into 1-1.
				</p>
				<p className="font-bold text-gray-300">Caveats:</p>
				<ul className="list-disc ml-4">
					<li>
						So far only very simple levels work, lots of research needed yet
					</li>
					<li>Only room 1 will replace 1-1, warps will not work</li>
					<li>If your room is too big to fit, then bad things will happen</li>
					<li>To get back to a clean state, refresh the browser</li>
				</ul>
			</div>

			<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
				<Button onClick={handleSetOverwrite}>Replace 1-1</Button>
			</div>
		</div>
	);
}

export { Overwrite1_1, overwriteLevel1_1 };
