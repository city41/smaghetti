import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';
import {
	FIRST_LEVEL_NAME_OFFSET,
	// OFFSET_AFTER_NAME_TABLE,
	WIIU_EREADER_LEVEL_COUNT,
} from './constants';
import { convertLevelNameToASCII } from '../../src/levelData/util';
import { toHexString } from '../../src/components/hex-tree/HexTreePage/util';

function dumpLevelNames(romData: Uint8Array) {
	for (let i = 0; i < WIIU_EREADER_LEVEL_COUNT; ++i) {
		const offset = FIRST_LEVEL_NAME_OFFSET + 21 * i;

		const name = convertLevelNameToASCII(romData.slice(offset, offset + 21));

		console.log(toHexString(offset), name || '<blank>');
	}
}

// function dumpAfterNames(romData: Uint8Array) {
// 	const slice = romData.slice(
// 		OFFSET_AFTER_NAME_TABLE,
// 		OFFSET_AFTER_NAME_TABLE + 1024
// 	);

// 	const hexStrings = Array.from(slice).map((b) => toHexString(b));
// 	console.log('after level names');
// 	console.log(hexStrings.join(' '));

// 	console.log('OFFSET_AFTER_NAME_TABLE', toHexString(OFFSET_AFTER_NAME_TABLE));
// }

function usage() {
	console.error(
		`\nusage: ${path.basename(process.argv[0])} ${path.basename(
			process.argv[1]
		)} <path-to-wiiu-vc-rom>`
	);
	process.exit(1);
}

function main() {
	const romPath = process.argv[2];

	if (!romPath) {
		usage();
	}

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);

	dumpLevelNames(romData);
}

main();
