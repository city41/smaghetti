import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
// @ts-ignore no types available
import sha1 from 'js-sha1';

type ShaMap = Record<string, string[]>;

function processDir(dirPath: string, map: ShaMap) {
	const files = fs.readdirSync(dirPath);

	files.forEach((file) => {
		if (!file.endsWith('.png')) {
			return;
		}

		const filePath = path.join(dirPath, file);
		const fileBuffer = fs.readFileSync(filePath);
		const sha = sha1(new Uint8Array(fileBuffer));

		const bucket = (map[sha] = map[sha] ?? []);
		bucket.push(filePath);
	});
}

function writeOutUniques(srcPath: string, map: ShaMap) {
	console.log('writeOutUniques', srcPath);
	const dirName = path.dirname(srcPath);
	const baseName = path.basename(srcPath);
	const destDir = path.join(dirName, `${baseName}___uniques`);
	mkdirp.sync(destDir);

	const values = Object.values(map);
	const uniques = values.map((v) => v[0]);

	// /home/matt/dev/smaghetti/brute/results_bank1_5bytes/obj_02/gfx_2_id_0d.png
	uniques.forEach((uniquePath) => {
		const baseName = path.basename(uniquePath);
		const objName = path.basename(path.dirname(uniquePath));
		const filename = `${objName}_${baseName}`;
		const destPath = path.join(destDir, filename);

		fs.copyFileSync(uniquePath, destPath);
	});
}

function main(rootDir: string | undefined) {
	if (!rootDir) {
		console.error('usage: node dedupe <root-dir>');
		process.exit(1);
	}

	const dedupeMap: ShaMap = {};

	const rootDirPath = path.join(process.cwd(), rootDir);
	const objectDirs = fs.readdirSync(rootDirPath);

	objectDirs.forEach((objectDir) => {
		const fullPath = path.join(rootDirPath, objectDir);
		if (!fs.statSync(fullPath).isDirectory()) {
			return;
		}

		processDir(fullPath, dedupeMap);
	});

	const uniques = Object.values(dedupeMap).filter((v) => v.length === 1);
	const dupes = Object.values(dedupeMap).filter((v) => v.length > 1);

	const totalUniqueCount = uniques.length + dupes.length;

	const dupeCount = dupes.reduce<number>((building, d) => {
		return building + d.length;
	}, 0);

	console.log('uniques', totalUniqueCount, 'dupes', dupeCount - dupes.length);

	writeOutUniques(rootDirPath, dedupeMap);
}

main(process.argv[2]);
