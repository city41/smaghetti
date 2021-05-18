import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
// @ts-ignore no types
import sha1 from 'js-sha1';

function buildShasForDir(shas: Set<string>, dir: string) {
	const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png'));

	files.forEach((f) => {
		const fullPath = path.join(dir, f);
		const buffer = fs.readFileSync(fullPath);
		shas.add(sha1(buffer));
	});
}

function buildShas(rootDir: string): Set<string> {
	const shas = new Set<string>();

	buildShasForDir(
		shas,
		path.join(rootDir, 'fiveByteBank1Objects/results_bank1_5bytes___uniques')
	);
	buildShasForDir(
		shas,
		path.join(rootDir, 'fourByteBank0Objects/results_bank0_4bytes___uniques')
	);
	buildShasForDir(
		shas,
		path.join(rootDir, 'fourByteBank1Objects/results_bank1_4bytes___uniques')
	);
	buildShasForDir(
		shas,
		path.join(rootDir, 'spritesBank0/results_sprites_bank0___uniques')
	);
	buildShasForDir(
		shas,
		path.join(rootDir, 'spritesBank1/results_sprites_bank1___uniques')
	);

	return shas;
}

function processRawDir(
	shas: Set<string>,
	rootDir: string,
	destRootDir: string,
	subDir: string
) {
	const destPath = path.join(destRootDir, subDir + '___uniques');
	mkdirp.sync(destPath);

	const setDirs = fs
		.readdirSync(path.join(rootDir, subDir))
		.filter((d) => fs.statSync(path.join(rootDir, subDir, d)).isDirectory());

	setDirs.forEach((setDir) => {
		const setDirPath = path.join(rootDir, subDir, setDir);
		const files = fs.readdirSync(setDirPath).filter((f) => f.endsWith('.png'));

		files.forEach((file) => {
			const filePath = path.join(setDirPath, file);
			const buffer = fs.readFileSync(filePath);
			const sha = sha1(buffer);

			if (shas.has(sha)) {
				const destFilePath = path.join(destPath, `${setDir}_${file}`);
				fs.writeFileSync(destFilePath, buffer);
			}
		});
	});
}

/**
 * This script takes the large brute force dump and compares it to the curated
 * deduped set and builds up a non-deduped set that has removed all the bogus
 * results. The result of this can then be fed into generateKnowns.ts to generate
 * all object and sprite sizes from the entire brute force dump, which should
 * greatly increase hex-tree's usefulness and accuracy
 */
function main(rootDir: string) {
	const destDirPath = path.join(rootDir, 'forGeneratingKnowns');
	mkdirp.sync(destDirPath);

	const shas = buildShas(rootDir);

	processRawDir(
		shas,
		rootDir,
		destDirPath,
		'fiveByteBank1Objects/results_bank1_5bytes'
	);
	processRawDir(
		shas,
		rootDir,
		destDirPath,
		'fourByteBank0Objects/results_bank0_4bytes'
	);
	processRawDir(
		shas,
		rootDir,
		destDirPath,
		'fourByteBank1Objects/results_bank1_4bytes'
	);
	processRawDir(
		shas,
		rootDir,
		destDirPath,
		'spritesBank0/results_sprites_bank0'
	);
	processRawDir(
		shas,
		rootDir,
		destDirPath,
		'spritesBank1/results_sprites_bank1'
	);
}

const rootDir = process.argv[2];

if (!rootDir) {
	console.error(`usage: ${process.argv[0]} ${process.argv[1]} <root-dir>`);
	process.exit(1);
}

main(rootDir);
