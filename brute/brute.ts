import 'ignore-styles';
import './gbajs';
import { Canvas, createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { createLevelData } from '../src/levelData/createLevelData';
import { ROOM_BACKGROUND_SETTINGS } from '../src/levelData/constants';
import { FLOOR_SO_PLAYER_DOESNT_FALL } from '../src/components/editor/editorSlice';
import { injectLevelIntoSave } from '../src/levelData/injectLevelIntoSave';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { deserialize } from '../src/saveStates/serializer';
import {
	INITIAL_ROOM_TILE_HEIGHT,
	INITIAL_ROOM_TILE_WIDTH,
} from '../src/components/editor/constants';
import { TILE_SIZE } from '../src/tiles/constants';
import { ArrowSign } from '../src/entities/ArrowSign';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';

const saveStateString = fs
	.readFileSync(path.join(__dirname, '../public/justOutsideEReaderMenu.json'))
	.toString();
const saveState = deserialize(saveStateString);

const bios = fs.readFileSync(path.join(__dirname, '../public/bios.bin'));
const emptySave = fs.readFileSync(path.join(__dirname, '../public/empty.sav'));
const rom = fs.readFileSync(path.join(__dirname, './sma4.gba'));
const canvas = createCanvas(240, 160);

let emptyLevelBuffer: Buffer | null = null;

function getRoom(objectSet: number, objectGraphicSet: number) {
	return {
		settings: {
			...ROOM_BACKGROUND_SETTINGS.underground,
			objectSet,
			objectGraphicSet,
			bgGraphic: 0,
			bgColor: 0,
		},
		paletteEntries: [],
		entities: [
			{
				id: 1,
				type: 'ArrowSign',
				x: 8 * TILE_SIZE,
				y: (INITIAL_ROOM_TILE_HEIGHT - 4) * TILE_SIZE,
			},
		],
		matrixLayer: {
			width: INITIAL_ROOM_TILE_WIDTH,
			height: INITIAL_ROOM_TILE_HEIGHT,
			data: FLOOR_SO_PLAYER_DOESNT_FALL,
		},
	};
}

function eraseBogusTiles(canvas: Canvas) {
	const context = canvas.getContext('2d')!;
	const upperLeft = context.getImageData(0, 0, 16, 16);

	function clear(data: Uint8ClampedArray) {
		for (let p = 0; p < data.length; p += 4) {
			data[p + 0] = 0;
			data[p + 1] = 0;
			data[p + 2] = 0;
		}
	}

	for (let y = 0; y < 10; ++y) {
		for (let x = 0; x < 15; ++x) {
			const data = context.getImageData(x * 16, y * 16, 16, 16);

			if (isEqual(upperLeft.data, data.data)) {
				clear(data.data);
				context.putImageData(data, x * 16, y * 16);
			}
		}
	}

	clear(upperLeft.data);
	context.putImageData(upperLeft, 0, 0);
}

function getGbaScreen(
	objectSet: number,
	graphicSet: number,
	bytes: number[]
): Promise<{ buffer: Buffer; data: Uint8ClampedArray }> {
	return new Promise((resolve, reject) => {
		ArrowSign.toObjectBinary = () => {
			return bytes;
		};

		// @ts-ignore
		const levelData = createLevelData([getRoom(objectSet, graphicSet)]);
		const saveFileWithLevel = injectLevelIntoSave(emptySave, levelData, true);

		// @ts-ignore
		const gba: any = new GameBoyAdvance();

		gba.statusCallback = (status: string) => {
			if (status === 'crashed') {
				reject();
			} else {
				if (status === 'level-ready') {
					gba.pause();
					eraseBogusTiles(canvas);
					resolve({
						buffer: canvas.toBuffer(),
						data: canvas.getContext('2d').getImageData(0, 0, 240, 160).data,
					});
				}
			}
		};

		gba.setBios(bios.buffer);
		gba.setCanvasDirect(canvas);
		gba.setRom(rom.buffer);
		gba.defrost(cloneDeep(saveState));
		gba.injectSaveFile(saveFileWithLevel.buffer);
	});
}

function isEmptyLevel(levelBuffer: Buffer): boolean {
	return isEqual(levelBuffer, emptyLevelBuffer);
}

function isBlackScreen(data: Uint8ClampedArray): boolean {
	for (let i = 0; i < data.length; i += 4) {
		if (!data.slice(i, i + 3).every((v) => v === 0)) {
			return false;
		}
	}

	return true;
}

function report(
	objectSet: number,
	graphicSet: number,
	id: number,
	result: 'empty' | 'black' | 'crash' | 'success'
) {
	console.log(`'${objectSet}, '${graphicSet}, '0x${toHexString(id)},`, result);
}

function capture(
	objectSet: number,
	graphicSet: number,
	id: number
): Promise<void> {
	return new Promise((resolve) => {
		return getGbaScreen(objectSet, graphicSet, [0, 22, 5, id])
			.then(({ buffer, data }) => {
				if (isEmptyLevel(buffer)) {
					report(objectSet, graphicSet, id, 'empty');
				} else if (isBlackScreen(data)) {
					report(objectSet, graphicSet, id, 'black');
				} else {
					const dirPath = path.join(
						__dirname,
						'results',
						`obj_${toHexString(objectSet)}`
					);
					mkdirp.sync(dirPath);
					fs.writeFileSync(
						path.join(dirPath, `gfx_${graphicSet}_id_${toHexString(id)}.png`),
						buffer
					);
					report(objectSet, graphicSet, id, 'success');
				}
				resolve();
			})
			.catch(() => {
				report(objectSet, graphicSet, id, 'crash');
				resolve();
			});
	});
}

function captureEmptyLevel(
	objectSet: number,
	graphicSet: number
): Promise<{ buffer: Buffer; data: Uint8ClampedArray }> {
	return getGbaScreen(objectSet, graphicSet, []);
}

function captureSet(objectSet: number, graphicSet: number): Promise<void> {
	let objectId = 0;
	function onCaptureObject(): Promise<any> | undefined {
		if (objectId < 0xff) {
			objectId += 1;
			return capture(objectSet, graphicSet, objectId).then(onCaptureObject);
		}
	}

	return captureEmptyLevel(objectSet, graphicSet).then(({ buffer }) => {
		emptyLevelBuffer = buffer;
		return capture(objectSet, graphicSet, objectId).then(onCaptureObject);
	});
}

const offset = Number(process.argv[2]);
const chunkSize = Number(process.argv[3]);

if (isNaN(offset) || isNaN(chunkSize)) {
	console.error('usage: node brute <offset> <chunk-size>');
	process.exit(1);
}

let objectSet = offset * chunkSize;
let graphicSet = 0;

function onCaptureSet() {
	if (graphicSet < 0xf) {
		graphicSet += 1;
	} else {
		objectSet += 1;
		graphicSet = 0;
	}

	if (objectSet < (offset + 1) * chunkSize && objectSet < 0x10) {
		captureSet(objectSet, graphicSet).then(onCaptureSet);
	} else {
		console.log('all done');
		process.exit(0);
	}
}

console.log('objectSet, graphicSet, id, result');
captureSet(objectSet, graphicSet).then(onCaptureSet);
