import * as fs from 'fs';
import * as path from 'path';
import {
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_POINTERS,
} from '../src/levelData/constants';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';

function getObjectSets(data: Uint8Array): number[] {
	const view = new DataView(data.buffer);

	return ROOM_LEVELSETTING_POINTERS.reduce<number[]>((building, lsp) => {
		const lsAddress = view.getUint16(lsp, true);

		if (lsAddress >= data.length - 1) {
			return building;
		}

		const objectSetLeastSigByte = data[lsAddress + 12];
		return building.concat(objectSetLeastSigByte);
	}, []);
}

function getGraphicSets(data: Uint8Array): number[] {
	const view = new DataView(data.buffer);

	return ROOM_OBJECT_POINTERS.reduce<number[]>((building, op) => {
		const oAddress = view.getUint16(op, true);

		if (oAddress >= data.length - 1) {
			return building;
		}

		const objectSetLeastSigNibble = data[oAddress + 7] & 0xf;

		return building.concat(objectSetLeastSigNibble);
	}, []);
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
		const levelName = path.basename(levelFile, '.level');
		const levelPath = path.join(levelDir, levelFile);
		const data = new Uint8Array(fs.readFileSync(levelPath));

		const objectSets = getObjectSets(data);
		const graphicSets = getGraphicSets(data);

		console.log(levelName);
		console.log('----------------');
		console.log('room | obj | gfx ');
		for (let i = 0; i < objectSets.length; ++i) {
			console.log(
				`${i}    | ${toHexString(objectSets[i])}  | ${toHexString(
					graphicSets[i]
				)}`
			);
		}
		console.log('----------------');
	});
}

main();
