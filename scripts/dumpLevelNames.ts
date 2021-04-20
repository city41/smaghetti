import * as fs from 'fs';
import * as path from 'path';
import { convertLevelNameToASCII, extractName } from '../src/levelData/util';

function getLevelName(data: Uint8Array): string {
	const eCoinId = data[0];
	const nameAsArray = extractName(data, eCoinId);

	return convertLevelNameToASCII(nameAsArray);
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
		const levelFileName = path.basename(levelFile, '.level');
		const levelPath = path.join(levelDir, levelFile);
		const data = new Uint8Array(fs.readFileSync(levelPath));

		const levelName = getLevelName(data);
		console.log(`${levelFileName}:`, levelName);
	});
}

main();
