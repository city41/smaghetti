import 'ignore-styles';
import './gbajs';
import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { ROOM_LEVELSETTING_POINTERS } from '../src/levelData/constants';
import { injectLevelIntoSave } from '../src/levelData/injectLevelIntoSave';
import cloneDeep from 'lodash/cloneDeep';
import { deserialize } from '../src/saveStates/serializer';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';
import { SpriteGraphicSets } from '../src/entities/types';
import { createLevelData } from '../src/levelData/createLevelData';

type Action = 'stand' | 'jump' | 'walk-right';

const saveStateString = fs
	.readFileSync(path.join(__dirname, '../public/justOutsideEReaderMenu.json'))
	.toString();
const saveState = deserialize(saveStateString);

const bios = fs.readFileSync(path.join(__dirname, '../public/bios.bin'));
const emptySave = fs.readFileSync(path.join(__dirname, '../public/empty.sav'));
const rom = fs.readFileSync(path.join(__dirname, './sma4.gba'));
const canvas = createCanvas(240, 160);

function applySpriteGraphicSet(
	levelData: Uint8Array,
	spriteGraphicSet: SpriteGraphicSets
): Uint8Array {
	const view = new DataView(levelData.buffer);

	const levelSettingsPointer = ROOM_LEVELSETTING_POINTERS[0];
	const levelSettingsIndex = view.getUint16(levelSettingsPointer, true);
	const spriteGraphicSetIndex = levelSettingsIndex + 16;

	for (let i = 0; i < spriteGraphicSet.length; ++i) {
		const slot = spriteGraphicSet[i];
		const value = Array.isArray(slot) ? slot[0] : slot;
		view.setUint8(spriteGraphicSetIndex + i, value);
	}

	return levelData;
}

function getGbaScreen(
	levelData: Uint8Array,
	spriteGraphicSet: SpriteGraphicSets,
	action: Action
): Promise<{ buffer: Buffer; data: Uint8ClampedArray }> {
	return new Promise((resolve, reject) => {
		const patchedLevelData = applySpriteGraphicSet(levelData, spriteGraphicSet);
		const saveFileWithLevel = injectLevelIntoSave(
			emptySave,
			patchedLevelData,
			true
		);

		// @ts-ignore
		const gba: any = new GameBoyAdvance();

		gba.statusCallback = (status: string) => {
			if (status === 'crashed') {
				reject();
			} else {
				if (status === 'level-ready') {
					gba.setAction('stand');
					gba.pause();
					// eraseBogusTiles(canvas);
					resolve({
						buffer: canvas.toBuffer(),
						data: canvas.getContext('2d').getImageData(0, 0, 240, 160).data,
					});
				}
			}
		};

		gba.setAction(action);
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

function isBlackScreen(data: Uint8ClampedArray): boolean {
	for (let i = 0; i < data.length; i += 4) {
		if (!data.slice(i, i + 3).every((v) => v === 0)) {
			return false;
		}
	}

	return true;
}

function capture(
	title: string,
	levelData: Uint8Array,
	action: Action,
	graphicSetIndex: number,
	graphicSetValue: number
): Promise<void> {
	const graphicSet = getGraphicSet(graphicSetIndex, graphicSetValue);
	const graphicSetStr = graphicSet.map(toHexString).join('_');

	return getGbaScreen(levelData, graphicSet, action)
		.then(({ buffer, data }) => {
			if (isBlackScreen(data)) {
				console.log(graphicSetStr, 'black');
			} else {
				const dirPath = path.join(
					__dirname,
					`results_getSpriteGraphicSetBytes_${title}`
				);
				mkdirp.sync(dirPath);
				fs.writeFileSync(path.join(dirPath, `${graphicSetStr}.png`), buffer);
				console.log(graphicSetStr, 'not-empty');
			}
		})
		.catch((e) => {
			console.error(
				`getGbaScreen rejected for graphicSet: ${graphicSetStr}`,
				e
			);
		});
}

const STARTING_VALUE = 0x0;
// this is the starting value after the first iteration
// this is done to avoid dumping 0_0_0_0_0_0 repeatedly
const SUBSEQUENT_STARTING_VALUE = 0x1;
const ENDING_VALUE = 0x20;

function dumpAllWithId(
	title: string,
	levelData: Uint8Array,
	action: Action,
	offset: number,
	chunkSize: number
): Promise<void> {
	let graphicSetIndex = offset * chunkSize;
	let graphicSetValue = STARTING_VALUE;

	function onCapture(): Promise<any> | undefined {
		if (graphicSetValue < ENDING_VALUE - 1) {
			graphicSetValue += 1;
		} else {
			graphicSetValue = SUBSEQUENT_STARTING_VALUE;
			graphicSetIndex += 1;
		}

		if (graphicSetIndex < (offset + 1) * chunkSize) {
			return capture(
				title,
				levelData,
				action,
				graphicSetIndex,
				graphicSetValue
			).then(onCapture);
		}
	}

	return capture(
		title,
		levelData,
		action,
		graphicSetIndex,
		graphicSetValue
	).then(onCapture);
}

function main() {
	const levelJsonPath = process.argv[2];
	const action = process.argv[3];
	const offset = parseInt(process.argv[4], 10);
	const chunkSize = parseInt(process.argv[5], 10);

	const title = path.basename(levelJsonPath, '.json');

	if (!levelJsonPath || !action || isNaN(offset) || isNaN(chunkSize)) {
		console.error(
			'usage: node getSpriteGraphicSetBytes <level-json-path> <jump, stand or walk-right> <offset> <chunk-size>'
		);
		process.exit(1);
	}

	const smaghettiLevelData = require(path.join(process.cwd(), levelJsonPath));
	const levelData = createLevelData(smaghettiLevelData);

	dumpAllWithId(title, levelData, action as Action, offset, chunkSize).then(
		() => {
			console.log('all done');
			process.exit(0);
		}
	);
}

main();
