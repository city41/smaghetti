import 'ignore-styles';
import './gbajs';
import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { createLevelData } from '../src/levelData/createLevelData';
import { ROOM_BACKGROUND_SETTINGS } from '../src/levelData/constants';
import { injectLevelIntoSave } from '../src/levelData/injectLevelIntoSave';
import cloneDeep from 'lodash/cloneDeep';
import { deserialize } from '../src/saveStates/serializer';
import {
	INITIAL_ROOM_TILE_HEIGHT,
	INITIAL_ROOM_TILE_WIDTH,
	INITIAL_PLAYER_Y_TILE,
	PLAY_WINDOW_TILE_WIDTH,
} from '../src/components/editor/constants';
import { TILE_SIZE } from '../src/tiles/constants';
import { ArrowSign } from '../src/entities/ArrowSign';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';
import isEqual from 'lodash/isEqual';

const BRICKS_ALONG_BOTTOM: EditorEntityMatrix = (function () {
	let idCounter = 1;
	const rows = [];
	for (let y = 0; y < INITIAL_PLAYER_Y_TILE + 1; ++y) {
		rows.push(null);
	}

	const playerRow = [];
	for (let x = 0; x < PLAY_WINDOW_TILE_WIDTH; ++x) {
		playerRow.push({
			id: idCounter++,
			type: 'IndestructibleBrick',
			x,
			y: INITIAL_PLAYER_Y_TILE + 1,
		} as const);
	}

	rows.push(playerRow);

	while (rows.length < INITIAL_ROOM_TILE_HEIGHT) {
		rows.push(null);
	}

	return rows;
})();

let emptyLevelBuffer: Buffer | null = null;

const saveStateString = fs
	.readFileSync(path.join(__dirname, '../public/justOutsideEReaderMenu.json'))
	.toString();
const saveState = deserialize(saveStateString);

const bios = fs.readFileSync(path.join(__dirname, '../public/bios.bin'));
const emptySave = fs.readFileSync(path.join(__dirname, '../public/empty.sav'));
const rom = fs.readFileSync(path.join(__dirname, './sma4.gba'));
const canvas = createCanvas(240, 160);

function getRoom(spriteGraphicSet: number[]) {
	return {
		settings: {
			...ROOM_BACKGROUND_SETTINGS.underground,
			spriteGraphicSet,
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
			data: BRICKS_ALONG_BOTTOM,
		},
	};
}

function getGbaScreen(
	bytes: number[],
	spriteGraphicSet: number[]
): Promise<{ buffer: Buffer; data: Uint8ClampedArray }> {
	return new Promise((resolve, reject) => {
		ArrowSign.toObjectBinary = undefined;
		ArrowSign.toSpriteBinary = () => {
			return bytes;
		};

		// @ts-ignore
		const levelData = createLevelData([getRoom(spriteGraphicSet)]);
		const saveFileWithLevel = injectLevelIntoSave(emptySave, levelData, true);

		// @ts-ignore
		const gba: any = new GameBoyAdvance();

		gba.statusCallback = (status: string) => {
			if (status === 'crashed') {
				reject();
			} else {
				if (status === 'level-ready') {
					gba.pause();
					// eraseBogusTiles(canvas);
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

function getGraphicSet(
	graphicSetIndex: number,
	graphicSetValue: number
): number[] {
	const gs = [2, 3, 4, 5, 6, 7];
	gs[graphicSetIndex] = graphicSetValue;

	return gs;
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

function capture(
	spriteBytes: number[],
	graphicSetIndex: number,
	graphicSetValue: number
): Promise<void> {
	const graphicSet = getGraphicSet(graphicSetIndex, graphicSetValue);
	const graphicSetStr = graphicSet.map(toHexString).join('_');
	const spriteBytesStr = spriteBytes.map(toHexString).join('_');

	return getGbaScreen(spriteBytes, graphicSet)
		.then(({ buffer, data }) => {
			if (isEmptyLevel(buffer)) {
				console.log(graphicSetStr, 'empty');
			} else if (isBlackScreen(data)) {
				console.log(graphicSetStr, 'black');
			} else {
				const dirPath = path.join(
					__dirname,
					`results_single_bytes_${spriteBytesStr}`
				);
				mkdirp.sync(dirPath);
				fs.writeFileSync(
					path.join(
						dirPath,
						`gfx_${graphicSetStr}_bytes_${spriteBytesStr}.png`
					),
					buffer
				);
				console.log(graphicSetStr, 'success');
			}
		})
		.catch(() => {
			console.error(`getGbaScreen rejected for graphicSet: ${graphicSetStr}`);
		});
}

function captureEmptyLevel(
	graphicSetIndex: number,
	graphicSetValue: number
): Promise<{ buffer: Buffer; data: Uint8ClampedArray }> {
	const graphicSet = getGraphicSet(graphicSetIndex, graphicSetValue);
	return getGbaScreen([], graphicSet);
}

const STARTING_VALUE = 0x0;
const ENDING_VALUE = 0x10;

function dumpAllWithId(spriteBytes: number[]): Promise<void> {
	let graphicSetIndex = 0;
	let graphicSetValue = STARTING_VALUE;
	const spriteBytesStr = spriteBytes.map(toHexString).join('_');

	function onCapture(): Promise<any> | undefined {
		if (graphicSetValue < ENDING_VALUE) {
			graphicSetValue += 1;
		} else {
			graphicSetValue = STARTING_VALUE;
			graphicSetIndex += 1;
		}

		if (graphicSetIndex < 6) {
			return capture(spriteBytes, graphicSetIndex, graphicSetValue).then(
				onCapture
			);
		}
	}

	return captureEmptyLevel(graphicSetIndex, graphicSetValue).then(
		({ buffer }) => {
			emptyLevelBuffer = buffer;

			const dirPath = path.join(
				__dirname,
				`results_single_bytes_${spriteBytesStr}`
			);
			mkdirp.sync(dirPath);
			fs.writeFileSync(path.join(dirPath, 'empty.png'), buffer);
			return capture(spriteBytes, graphicSetIndex, graphicSetValue).then(
				onCapture
			);
		}
	);
}

const BOO_BYTES = [0, 0x2f, 5, 22];
// const THWOMP_BYTES = [0, 0x8a, 5, 22];
// const THWIMP_BYTES = [0, 0xd0, 5, 22];
// const GOOMBA_BYTES = [0, 0x72, 5, 22];
// const KOOPA_BYTES = [0, 0x6c, 5, 22];
// const MUSHROOM_BYTES = [0, 0xd, 9, 22];
// const LUDWIG_BYTES = [0x1, 0x14, 5, 21, 0x73, 0xa];

function main() {
	dumpAllWithId(BOO_BYTES).then(() => {
		console.log('all done');
		process.exit(0);
	});
}

main();
