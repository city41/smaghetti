import * as fs from 'fs';
import * as path from 'path';
import { ROOM_OBJECT_POINTERS } from '../src/levelData/constants';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';

function dumpGraphicSets(levelPath: string) {
	const data = new Uint8Array(fs.readFileSync(levelPath));
	const view = new DataView(data.buffer);

	const levelName = path.basename(levelPath, '.level');

	ROOM_OBJECT_POINTERS.forEach((op, roomIndex) => {
		const oAddress = view.getUint16(op, true);

		if (oAddress >= data.length - 1) {
			return;
		}

		const objectSetLeastSigFiveBits = data[oAddress + 7] & 0x1f;
		const objectSetLeastSigNibble = data[oAddress + 7] & 0xf;
		const objectSetMostSigNibble = (data[oAddress + 8] >> 4) & 0xf;

		const graphicSet = (objectSetMostSigNibble << 4) | objectSetLeastSigNibble;

		console.log(
			`${levelName}, room ${roomIndex}: ${toHexString(graphicSet)}`,
			graphicSet
		);

		if (objectSetLeastSigFiveBits > 255) {
			console.log('this room used all five upper bits');
		}
	});
}

function main() {
	const levelDir = process.argv[2];

	if (!levelDir) {
		console.error('usage: ts-node dumpGraphicSets <level dir>');
		process.exit(1);
	}

	const levelFiles = fs
		.readdirSync(levelDir)
		.filter((file) => file.endsWith('.level'));

	levelFiles.forEach((levelFile) => {
		dumpGraphicSets(path.join(levelDir, levelFile));
	});
}

main();
