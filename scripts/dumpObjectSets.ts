import * as fs from 'fs';
import * as path from 'path';
import { ROOM_LEVELSETTING_POINTERS } from '../src/levelData/constants';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';

function dumpObjectSets(levelPath: string) {
	const data = new Uint8Array(fs.readFileSync(levelPath));
	const view = new DataView(data.buffer);

	const levelName = path.basename(levelPath, '.level');

	ROOM_LEVELSETTING_POINTERS.forEach((lsp, roomIndex) => {
		const lspAddress = view.getUint16(lsp, true);

		if (lspAddress >= data.length - 1) {
			return;
		}

		const objectSetLeastSigByte = data[lspAddress + 12];

		console.log(
			`${levelName}, room ${roomIndex}: ${toHexString(objectSetLeastSigByte)}`
		);
	});
}

function main() {
	const levelDir = process.argv[2];

	if (!levelDir) {
		console.error('usage: ts-node dumpObjectSets <level dir>');
		process.exit(1);
	}

	const levelFiles = fs
		.readdirSync(levelDir)
		.filter((file) => file.endsWith('.level'));

	levelFiles.forEach((levelFile) => {
		dumpObjectSets(path.join(levelDir, levelFile));
	});
}

main();
