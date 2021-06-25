import 'ignore-styles';
import './gbajs';
import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { createLevelData } from '../src/levelData/createLevelData';
import {
	MUSIC_VALUES,
	ROOM_BACKGROUND_SETTINGS,
} from '../src/levelData/constants';
import { injectLevelIntoSave } from '../src/levelData/injectLevelIntoSave';
import cloneDeep from 'lodash/cloneDeep';
import { deserialize } from '../src/saveStates/serializer';
import {
	INITIAL_PLAYER_Y_TILE,
	INITIAL_ROOM_TILE_HEIGHT,
	INITIAL_ROOM_TILE_WIDTH,
	PLAY_WINDOW_TILE_WIDTH,
} from '../src/components/editor/constants';
import { ArrowSign } from '../src/entities/ArrowSign';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';
import isEqual from 'lodash/isEqual';
import { encodeObjectSets } from '../src/entities/util';

type KnownGood = {
	objectSet: number;
	objectGraphicSet: number;
};

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

// TODO: nothing changes here, no longer needs to be a function
function getRoom(): RoomData {
	return {
		settings: {
			music: MUSIC_VALUES.Underground,
			...ROOM_BACKGROUND_SETTINGS.underground,
		},
		paletteEntries: [],
		actors: {
			entities: [
				{
					id: 1,
					type: 'ArrowSign',
					x: 0,
					y: 0,
				},
			],
			matrix: [],
		},
		stage: {
			entities: [],
			matrix: BRICKS_ALONG_BOTTOM,
		},
		roomTileWidth: INITIAL_ROOM_TILE_WIDTH,
		roomTileHeight: INITIAL_ROOM_TILE_HEIGHT,
	};
}

function getGbaScreen(
	objectBytes: number[],
	objectSet: number,
	objectGraphicSet: number
): Promise<{ buffer: Buffer; data: Uint8ClampedArray }> {
	return new Promise((resolve, reject) => {
		ArrowSign.toSpriteBinary = undefined;
		ArrowSign.toObjectBinary = () => {
			return objectBytes;
		};
		ArrowSign.objectSets = encodeObjectSets([[objectSet, objectGraphicSet]]);

		// @ts-ignore
		const levelData = createLevelData({
			name: 'getObjectSetBytes',
			data: {
				settings: {
					timer: 999,
				},
				rooms: [getRoom()],
			},
		});

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
	objectBytes: number[],
	objectSet: number,
	objectGraphicSet: number
): Promise<void> {
	const objectBytesStr = objectBytes.map(toHexString).join('_');
	const label = `[${objectSet},${objectGraphicSet}]`;

	return getGbaScreen(objectBytes, objectSet, objectGraphicSet)
		.then(({ buffer, data }) => {
			if (isEmptyLevel(buffer)) {
				console.log(label, 'empty');
			} else if (isBlackScreen(data)) {
				console.log(label, 'black');
			} else {
				console.log(label, 'not-empty');
			}
			const dirPath = path.join(
				__dirname,
				`results_getObjectSetBytes_${objectBytesStr}`
			);
			mkdirp.sync(dirPath);
			fs.writeFileSync(path.join(dirPath, `${label}.png`), buffer);
		})
		.catch(() => {
			console.error(`getGbaScreen rejected for : ${label}`);
		});
}

function captureEmptyLevel(
	objectSet: number,
	objectGraphicSet: number
): Promise<{ buffer: Buffer; data: Uint8ClampedArray }> {
	return getGbaScreen([], objectSet, objectGraphicSet);
}

const STARTING_VALUE = 0x0;
const ENDING_VALUE = 0x10;

function dumpAll(
	knownGood: KnownGood | null,
	objectBytes: number[],
	offset: number,
	chunkSize: number
): Promise<void> {
	let objectSet = offset * chunkSize;
	let objectGraphicSet = STARTING_VALUE;

	function onCapture(): Promise<any> | undefined {
		if (objectGraphicSet < ENDING_VALUE - 1) {
			objectGraphicSet += 1;
		} else {
			objectGraphicSet = 0;
			objectSet += 1;
		}

		if (objectSet < (offset + 1) * chunkSize) {
			return capture(objectBytes, objectSet, objectGraphicSet).then(onCapture);
		}
	}

	let basePromise;

	if (knownGood) {
		basePromise = getGbaScreen(
			objectBytes,
			knownGood.objectSet,
			knownGood.objectGraphicSet
		);
	} else {
		basePromise = captureEmptyLevel(objectSet, objectGraphicSet);
	}

	return basePromise.then(({ buffer }) => {
		emptyLevelBuffer = buffer;

		return capture(objectBytes, objectSet, objectGraphicSet).then(onCapture);
	});
}

function parseKnownGood(knownGoodStr: string): KnownGood | null {
	if (!knownGoodStr) {
		return null;
	}

	const splits = knownGoodStr.split(' ');

	if (splits.length !== 2) {
		return null;
	}

	return {
		objectSet: parseInt(splits[0].trim(), 16),
		objectGraphicSet: parseInt(splits[1].trim(), 16),
	};
}

function main() {
	const objectByteString = process.argv[2];
	const offset = parseInt(process.argv[3], 10);
	const chunkSize = parseInt(process.argv[4], 10);
	const knownGood = parseKnownGood(process.argv[5]);

	if (!objectByteString || isNaN(offset) || isNaN(chunkSize)) {
		console.error(
			'usage: node getObjectSetBytes <object-byte-string> <offset> <chunk-size>'
		);
		console.error("example: node getObjectSetBytes '0 5 22 3' 0 2");
		process.exit(1);
	}

	const bytes = objectByteString.split(' ').map((v) => {
		return parseInt(v.trim(), 16);
	});

	dumpAll(knownGood, bytes, offset, chunkSize).then(() => {
		console.log('all done');
		process.exit(0);
	});
}

main();
