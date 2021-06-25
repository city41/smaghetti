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
import { SpriteGraphicSets } from '../src/entities/types';

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

// TODO: this doesn't change anymore, doesn't need to be a function
function getRoom() {
	return {
		settings: {
			...ROOM_BACKGROUND_SETTINGS.underground,
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
	spriteGraphicSet: SpriteGraphicSets
): Promise<{ buffer: Buffer; data: Uint8ClampedArray }> {
	return new Promise((resolve, reject) => {
		ArrowSign.toObjectBinary = undefined;
		ArrowSign.toSpriteBinary = () => {
			return bytes;
		};
		ArrowSign.spriteGraphicSets = spriteGraphicSet;

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
): [number, number, number, number, number, number] {
	const gs = [0, 0, 0, 0, 0, 0];
	gs[graphicSetIndex] = graphicSetValue;

	return gs as [number, number, number, number, number, number];
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
				// const dirPath = path.join(
				// 	__dirname,
				// 	`results_getSpriteGraphicSetBytes_${spriteBytesStr}`
				// );
				// mkdirp.sync(dirPath);
				// fs.writeFileSync(
				// 	path.join(
				// 		dirPath,
				// 		`gfx_${graphicSetStr}_bytes_${spriteBytesStr}.png`
				// 	),
				// 	buffer
				// );
			} else if (isBlackScreen(data)) {
				console.log(graphicSetStr, 'black');
			} else {
				const dirPath = path.join(
					__dirname,
					`results_getSpriteGraphicSetBytes_${spriteBytesStr}`
				);
				mkdirp.sync(dirPath);
				fs.writeFileSync(
					path.join(
						dirPath,
						`gfx_${graphicSetStr}_bytes_${spriteBytesStr}.png`
					),
					buffer
				);
				console.log(graphicSetStr, 'not-empty');
			}
		})
		.catch(() => {
			console.error(`getGbaScreen rejected for graphicSet: ${graphicSetStr}`);
		});
}

function captureEmptyLevel(
	_graphicSetIndex: number,
	_graphicSetValue: number
): Promise<{ buffer: Buffer; data: Uint8ClampedArray }> {
	return getGbaScreen([0, 0xe8, 5, 0x16], [0, 0, 0, 0, 0, 0]);
}

const STARTING_VALUE = 0xff;
// this is the starting value after the first iteration
// this is done to avoid dumping 0_0_0_0_0_0 repeatedly
const SUBSEQUENT_STARTING_VALUE = 0xff;
const ENDING_VALUE = 0x100;

function dumpAllWithId(
	spriteBytes: number[],
	offset: number,
	chunkSize: number
): Promise<void> {
	let graphicSetIndex = offset * chunkSize;
	let graphicSetValue = STARTING_VALUE;
	const spriteBytesStr = spriteBytes.map(toHexString).join('_');

	function onCapture(): Promise<any> | undefined {
		if (graphicSetValue < ENDING_VALUE - 1) {
			graphicSetValue += 1;
		} else {
			graphicSetValue = SUBSEQUENT_STARTING_VALUE;
			graphicSetIndex += 1;
		}

		if (graphicSetIndex < (offset + 1) * chunkSize) {
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
				`results_getSpriteGraphicSetBytes_${spriteBytesStr}`
			);
			mkdirp.sync(dirPath);
			fs.writeFileSync(path.join(dirPath, `empty_${offset}.png`), buffer);
			return capture(spriteBytes, graphicSetIndex, graphicSetValue).then(
				onCapture
			);
		}
	);
}

function main() {
	const spriteByteString = process.argv[2];
	const offset = parseInt(process.argv[3], 10);
	const chunkSize = parseInt(process.argv[4], 10);

	if (!spriteByteString || isNaN(offset) || isNaN(chunkSize)) {
		console.error(
			'usage: node getSpriteGraphicSetBytes <sprite-byte-string> <offset> <chunk-size>'
		);
		console.error("example: node getSpriteGraphicSetBytes '0 0x72 5 22' 0 2");
		process.exit(1);
	}

	const bytes = spriteByteString.split(' ').map((v) => {
		return parseInt(v.trim(), 16);
	});

	dumpAllWithId(bytes, offset, chunkSize).then(() => {
		console.log('all done');
		process.exit(0);
	});
}

main();
