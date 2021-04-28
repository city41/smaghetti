import * as fs from 'fs';
import * as path from 'path';
import { createCanvas, Image } from 'canvas';
import isEqual from 'lodash/isEqual';

function hasX(filePath: string, xData: number[]): boolean {
	const buf = fs.readFileSync(filePath);
	const img = new Image();
	img.src = buf;

	const canvas = createCanvas(img.width, img.height);
	const context = canvas.getContext('2d')!;
	context.drawImage(img, 0, 0);

	for (let y = 0; y < img.height; y += 8) {
		for (let x = 0; x < img.width; x += 8) {
			const tileData = context.getImageData(x, y, 8, 8);

			if (isEqual(Array.from(tileData.data), xData)) {
				return true;
			}
		}
	}

	return false;
}

function processDir(dirPath: string, xData: number[]) {
	const files = fs.readdirSync(dirPath);

	let deleteCount = 0;

	files.forEach((file) => {
		if (!file.endsWith('.png')) {
			return;
		}

		const filePath = path.join(dirPath, file);

		if (hasX(filePath, xData)) {
			fs.unlinkSync(filePath);
			deleteCount += 1;
		}
	});

	return deleteCount;
}

function getImageData(buf: Buffer): Uint8ClampedArray {
	const canvas = createCanvas(8, 8);
	const img = new Image();
	img.src = buf;

	const context = canvas.getContext('2d')!;
	context.drawImage(img, 0, 0);

	return context.getImageData(0, 0, 8, 8).data;
}

function main(rootDir: string | undefined) {
	const refX = fs.readFileSync(path.join(__dirname, '../reference/sma4X.png'));
	const refXAsImageData = getImageData(refX);

	if (!rootDir) {
		console.error('usage: node dedupe <root-dir>');
		process.exit(1);
	}

	const rootDirPath = path.join(process.cwd(), rootDir);
	const deleteCount = processDir(rootDirPath, Array.from(refXAsImageData));

	console.log('deleted', deleteCount);
}

main(process.argv[2]);
