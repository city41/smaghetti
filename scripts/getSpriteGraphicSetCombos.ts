import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';
import {
	ROOM_LEVELSETTING_POINTERS,
	ROOM_LEVELSETTINGS_SIZE_IN_BYTES,
} from '../src/levelData/constants';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';

function getLevelSettings(data: Uint8Array, roomIndex: number): number[] {
	const view = new DataView(data.buffer);

	const lsp = ROOM_LEVELSETTING_POINTERS[roomIndex];

	if (lsp >= data.length - 2) {
		return [];
	}

	const lsAddress = view.getUint16(lsp, true);

	if (lsAddress >= data.length - 2) {
		return [];
	}

	return Array.from(
		data.slice(lsAddress, lsAddress + ROOM_LEVELSETTINGS_SIZE_IN_BYTES)
	);
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

	const levelSettingsMap: Record<string, string[]> = {};

	levelFiles.forEach((levelFile) => {
		const levelFileName = path.basename(levelFile, '.level');
		const levelPath = path.join(levelDir, levelFile);
		const data = new Uint8Array(fs.readFileSync(levelPath));

		for (let i = 0; i < 4; ++i) {
			const levelSettings = getLevelSettings(data, i);
			if (levelSettings.length > 0) {
				const graphicSet = levelSettings
					.slice(16, 16 + 6)
					.map((v) => `0x${toHexString(v)}`)
					.join(',');

				const bucket = (levelSettingsMap[graphicSet] =
					levelSettingsMap[graphicSet] ?? []);
				bucket.push(`${levelFileName}-r${i}`);
			}
		}
	});

	console.log('unique graphic set count', Object.keys(levelSettingsMap).length);

	const graphicSets = Object.keys(levelSettingsMap);

	console.log('const ereaderGraphicSets = [');
	console.log(graphicSets.map((gs) => `[${gs}]`).join(',\n'));
	console.log('];');
}

main();
