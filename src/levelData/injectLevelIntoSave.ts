import { compress } from './compress';
import type {
	ELevelInfo,
	ELevelData,
	ELevelRecord,
	SaveFile,
} from './typesAndConstants';
import {
	MAX_NAME_SIZE,
	MAX_ECOIN_A_SIZE,
	MAX_ECOIN_B_SIZE,
	MAX_DATA_SIZE,
	MAX_SAVE_SIZE,
	OFFSET_ECOIN,
	OFFSET_CLEARED_MARIO,
	OFFSET_CLEARED_LUIGI,
	OFFSET_PERFECT_ACECOIN,
	OFFSET_PLAYABLE,
	OFFSET_ACECOIN,
	OFFSET_LEVELINFO,
	OFFSET_NAME,
	OFFSET_UNFINISHED,
	OFFSET_DATAIDLIST,
	MAX_LEVEL_RECORDS,
	MAX_LEVEL_DATA,
	MAX_ECOIN_TABLE,
} from './typesAndConstants';
import {
	convertLevelNameToASCII,
	extractName,
	getLevelDataAddress,
} from './util';
import { parseSaveFile } from './parseSaveFile';

function loadECoinData(level: ELevelData, inputData: Uint8Array) {
	if (level.info.eCoinID !== 0) {
		level.ecoinB = inputData.slice(0x40, 0x40 + MAX_ECOIN_B_SIZE);
		level.ecoinA = inputData.slice(0x60, 0x60 + MAX_ECOIN_A_SIZE);
	}
}

function loadCompressedLevelData(level: ELevelData, inputData: Uint8Array) {
	// TODO: compress is wrong I think, need to go over it again
	const compressedBuffer1 = compress(inputData, 0x00);
	const compressedBuffer2 = compress(inputData, 0x80);
	const minSize = Math.min(compressedBuffer1.length, compressedBuffer2.length);

	if (minSize >= MAX_DATA_SIZE) {
		throw new Error(
			`Level is to large to fit in a save file, compressed size: ${minSize}, max: ${MAX_DATA_SIZE}`
		);
	}

	const buffer =
		minSize === compressedBuffer1.length
			? compressedBuffer1
			: compressedBuffer2;
	level.data = buffer;
}

// TODO: this is totally different from the original
// but probably good enough if always saving the first record
function getLevelDataID(recordID: number): number {
	return recordID - 1;
}

//#define BITZERO(v,n) v &= ~(1 << (n))				// Set the specific bit to 0
function bitZero(data: Uint8Array, index: number, bit: number) {
	data[index] = data[index] & ~(1 << bit);
}
//#define BITSET(v,n) v |= (1 << (n))					// Set the specific bit to 1
function bitSet(data: Uint8Array, index: number, bit: number) {
	data[index] = data[index] | (1 << bit);
}

function saveLevelRecords(saveData: Uint8Array, saveFile: SaveFile) {
	const levelRecords = saveFile.records;

	for (let i = 0; i < MAX_ECOIN_TABLE; i++) {
		saveData[OFFSET_ECOIN + i] = 0;
	}

	for (let i = 0; i < MAX_LEVEL_RECORDS; i++) {
		// Name
		let terminate = 0;
		let emptyname = 1;
		for (let j = 0; j < MAX_NAME_SIZE; j++) {
			if (!terminate) {
				saveData[OFFSET_NAME + i * MAX_NAME_SIZE + j] =
					levelRecords[i].info.name[j];
				if (levelRecords[i].info.name[j] == 0xff) terminate = 1;
				else emptyname = 0;
			} else {
				saveData[OFFSET_NAME + i * MAX_NAME_SIZE + j] = 0;
			}
		}

		// Icon type and level number
		saveData[OFFSET_LEVELINFO + i * 2 + 0] =
			levelRecords[i].info.levelNumber | (levelRecords[i].info.icon << 6);

		// Class and icon
		saveData[OFFSET_LEVELINFO + i * 2 + 1] =
			(levelRecords[i].info.levelClass << 3) |
			((levelRecords[i].info.icon >> 2) & 0x07);

		// Ace coin total and collected flag
		saveData[OFFSET_ACECOIN + i] =
			(levelRecords[i].info.aceCoinTotal << 5) |
			levelRecords[i].aceCoinCollectedFlag;

		// Playable flag
		if (getLevelDataID(i) >= 32 || emptyname) {
			bitZero(saveData, OFFSET_PLAYABLE + Math.floor(i / 8), i % 8);
		} else {
			bitSet(saveData, OFFSET_PLAYABLE + Math.floor(i / 8), i % 8);
		}

		// Ace coin perfect flag
		if (!levelRecords[i].aceCoinPerfect) {
			bitZero(saveData, OFFSET_PERFECT_ACECOIN + Math.floor(i / 8), i % 8);
		} else {
			bitSet(saveData, OFFSET_PERFECT_ACECOIN + Math.floor(i / 8), i % 8);
		}

		// Mario cleared flag
		if (!levelRecords[i].clearedByMario) {
			bitZero(saveData, OFFSET_CLEARED_MARIO + Math.floor(i / 8), i % 8);
		} else {
			bitSet(saveData, OFFSET_CLEARED_MARIO + Math.floor(i / 8), i % 8);
		}

		// Luigi cleared flag
		if (!levelRecords[i].clearedByLuigi) {
			bitZero(saveData, OFFSET_CLEARED_LUIGI + Math.floor(i / 8), i % 8);
		} else {
			bitSet(saveData, OFFSET_CLEARED_LUIGI + Math.floor(i / 8), i % 8);
		}

		// e-coin
		if (levelRecords[i].info.eCoinID != 0) {
			saveData[OFFSET_ECOIN + levelRecords[i].info.eCoinID - 1] =
				(levelRecords[i].eCoinCollected << 7) | ((i + 1) & 0x7f);
		}
	}
}

function saveLevelData(saveData: Uint8Array, saveFile: SaveFile) {
	const levelData = saveFile.data;
	const levelRecords = saveFile.records;
	const appeared = new Uint8Array(MAX_LEVEL_RECORDS);

	for (let i = 0; i < MAX_LEVEL_DATA; i++) {
		const addr = getLevelDataAddress(i);

		// Record ID (0=None)
		saveData[addr] = levelData[i].recordID;
		if (
			levelData[i].recordID == 0 ||
			appeared[levelData[i].recordID - 1] >= 1 ||
			(!levelRecords[levelData[i].recordID - 1].playable &&
				i != MAX_LEVEL_DATA - 1)
		) {
			levelData[i].recordID = 0;
			saveData[addr] = 0;
		} else if (levelData[i].recordID >= 1) {
			appeared[levelData[i].recordID - 1]++;
		}

		if (levelData[i].recordID != 0) {
			// Dummy Data?
			saveData[addr + 1] = 0x00;
			saveData[addr + 2] = 0xff;
			saveData[addr + 3] = 0xff;
			saveData[addr + 4] = 0xff;
			saveData[addr + 5] = 0xff;
			saveData[addr + 6] = 0xff;
			saveData[addr + 7] = 0x00;

			// Level data (compressed)
			for (let j = 0; j < MAX_DATA_SIZE; j++) {
				saveData[addr + 8 + j] = levelData[i].data[j];
			}
		} else {
			saveData[addr + 1] = 0x00;
			saveData[addr + 2] = 0x00;
			saveData[addr + 3] = 0x00;
			saveData[addr + 4] = 0x00;
			saveData[addr + 5] = 0x00;
			saveData[addr + 6] = 0x00;
			saveData[addr + 7] = 0x00;

			for (let j = 0; j < MAX_DATA_SIZE; j++) {
				saveData[addr + 8 + j] = 0;
			}
		}

		// Write to level data ID list
		if (i == MAX_LEVEL_DATA - 1) {
			saveData[OFFSET_UNFINISHED] = levelData[i].recordID;
		} else {
			saveData[OFFSET_DATAIDLIST + i] = levelData[i].recordID;
		}
	}
}

/* Calculate and fix checksum and region code */
function calcAndFixChecksum(
	saveData: Uint8Array,
	offset: number,
	size: number,
	checksumAreaStart: number,
	regionCode: number,
	regionOffset: number
) {
	let sum = 0;
	let oldsum = 0;

	// Check and fix region code
	const oldregion = saveData[offset + regionOffset];

	if (oldregion != regionCode) {
		saveData[offset + regionOffset] = regionCode;
	}

	// Calculate and fix checksum
	for (let i = 0; i < size; i++) {
		if (i !== checksumAreaStart + 0 && i !== checksumAreaStart + 1) {
			sum += saveData[i + offset];
		}
	}

	oldsum =
		saveData[offset + checksumAreaStart + 0] +
		saveData[offset + checksumAreaStart + 1] * 0x100;

	if (sum !== oldsum) {
		saveData[offset + checksumAreaStart + 0] = sum;
		saveData[offset + checksumAreaStart + 1] = (sum & 0xff00) >> 8;
	}
}

function memcmp(dataA: Uint8Array, dataB: Uint8Array, size: number): boolean {
	for (let i = 0; i < size; ++i) {
		if (dataA[i] !== dataB[i]) {
			return false;
		}
	}

	return true;
}

function memcpy(
	dest: Uint8Array,
	destOffset: number,
	src: Uint8Array,
	srcOffset: number,
	size: number
) {
	for (let i = 0; i < size; ++i) {
		// no bounds checking, but since this is a copy of C's memcpy, fire away
		dest[destOffset + i] = src[srcOffset + i];
	}
}

function fixAllChecksum(saveData: Uint8Array) {
	let offset = 0;
	let masterindexCount = 0;
	let masterindexOffset = 0;
	let ecoinCount = 0;
	let ecoinOffset = 0;

	const regionCode = saveData[6];

	while (offset < MAX_SAVE_SIZE - 4) {
		// SMA4MW?0
		if (
			saveData[offset + 0] == 'S'.charCodeAt(0) &&
			saveData[offset + 1] == 'M'.charCodeAt(0) &&
			saveData[offset + 2] == 'A'.charCodeAt(0) &&
			saveData[offset + 3] == '4'.charCodeAt(0)
		) {
			calcAndFixChecksum(saveData, offset, 0x1000, 8, regionCode, 6);

			if (masterindexCount == 0) {
				masterindexOffset = offset;
			} else {
				if (
					!memcmp(
						saveData.subarray(offset),
						saveData.subarray(masterindexOffset),
						0x1000
					)
				) {
					memcpy(saveData, offset, saveData, masterindexOffset, 0x1000);
				}
			}
			masterindexCount++;
			offset += 0x1000;
		}
		// M3?0
		else if (
			saveData[offset + 0] == 'M'.charCodeAt(0) &&
			saveData[offset + 1] == '3'.charCodeAt(0) &&
			saveData[offset + 3] == '0'.charCodeAt(0)
		) {
			calcAndFixChecksum(saveData, offset, 0x1000, 4, regionCode, 2);
			offset += 0x1000;
		}
		// S4R?
		else if (
			saveData[offset + 0] == 'S'.charCodeAt(0) &&
			saveData[offset + 1] == '4'.charCodeAt(0) &&
			saveData[offset + 2] == 'R'.charCodeAt(0)
		) {
			calcAndFixChecksum(saveData, offset, 0x2000, 4, regionCode, 3);

			if (ecoinCount == 0) {
				ecoinOffset = offset;
			} else {
				if (
					!memcmp(
						saveData.subarray(offset),
						saveData.subarray(ecoinOffset),
						0x2000
					)
				) {
					memcpy(saveData, offset, saveData, ecoinOffset, 0x2000);
				}
			}
			ecoinCount++;
			offset += 0x2000;
		}
		// S4C?
		else if (
			saveData[offset + 0] == 'S'.charCodeAt(0) &&
			saveData[offset + 1] == '4'.charCodeAt(0) &&
			saveData[offset + 2] == 'C'.charCodeAt(0)
		) {
			calcAndFixChecksum(saveData, offset, 0x1000, 4, regionCode, 3);
			offset += 0x1000;
		}
		// S4K?
		else if (
			saveData[offset + 0] == 'S'.charCodeAt(0) &&
			saveData[offset + 1] == '4'.charCodeAt(0) &&
			saveData[offset + 2] == 'K'.charCodeAt(0)
		) {
			calcAndFixChecksum(saveData, offset, 0x1000, 4, regionCode, 3);
			offset += 0x1000;
		}
		// others
		else {
			offset += 0x1000;
		}
	}
}

function findFreeRecordID(saveFile: SaveFile): number {
	const levelRecords = saveFile.records;

	for (let i = 0; i < MAX_LEVEL_RECORDS; i++) {
		if (levelRecords[i].info.name[0] == 0xff) {
			return i + 1;
		}
	}
	return 0;
}

function findFreeLevelDataID(saveFile: SaveFile): number {
	const levelRecords = saveFile.records;

	for (let i = 0; i < MAX_LEVEL_DATA; i++) {
		for (let j = 0; j < MAX_LEVEL_RECORDS; j++) {
			if (levelRecords[j].dataID == i) {
				break;
			} else if (j == MAX_LEVEL_RECORDS - 1) {
				return i;
			}
		}
	}
	return 0xff;
}

function compareLevelInfo(info1: ELevelInfo, info2: ELevelInfo): boolean {
	// Name
	for (let i = 0; i < MAX_NAME_SIZE; i++) {
		if (info1.name[i] != info2.name[i]) {
			return false;
		} else if (info1.name[i] == 0xff && info2.name[i] == 0xff) {
			break;
		}
	}

	return true;
}

function findSameInfoRecord(saveFile: SaveFile, info: ELevelInfo): number {
	const levelRecords = saveFile.records;

	for (let i = 0; i < MAX_LEVEL_RECORDS; i++) {
		if (compareLevelInfo(info, levelRecords[i].info)) {
			return i + 1;
		}
	}
	return 0;
}

/**
 * injects a binary ereader level (a *.level file) into
 * a save file. Ported over from sma4savtool.cpp which was written by purplebridge001.
 *
 * NOTE: the level param is named "inputData" to match sma4savtool.cpp#addLevel,
 * which makes it easier to port the function over
 *
 * @param saveData {Uint8Array} the save file to inject the level into
 * @param inputData {Uint8Array} the level
 */
function injectLevelIntoSave(
	saveData: Uint8Array,
	inputData: Uint8Array
): Uint8Array {
	const saveFile = parseSaveFile(saveData);
	const eCoinID = inputData[0];

	const name = extractName(inputData, eCoinID);
	const level: ELevelData = {
		info: {
			name,
			asciiName: convertLevelNameToASCII(name),
			eCoinID,
			aceCoinTotal: inputData[1],
			levelClass: inputData[2],
			levelNumber: inputData[3],
			icon: inputData[4],
		},
		recordID: 1,
		ecoinB: new Uint8Array(MAX_ECOIN_B_SIZE),
		ecoinA: new Uint8Array(MAX_ECOIN_A_SIZE),
		data: Uint8Array.from([]),
	};

	loadECoinData(level, inputData);
	loadCompressedLevelData(level, inputData);

	const newRecord: ELevelRecord = {
		info: level.info,
		aceCoinCollectedFlag: 0,
		eCoinCollected: 0,
		aceCoinPerfect: 0,
		clearedByLuigi: 0,
		clearedByMario: 0,
		dataID: 0,
		playable: 0,
	};

	let overwrite = true;
	let recordID = findSameInfoRecord(saveFile, level.info);
	let dataID = -1;

	if (recordID === 0) {
		recordID = findFreeRecordID(saveFile);
		overwrite = false;

		if (recordID === 0) {
			throw new Error('No free level record found, cant add this level');
		}

		dataID = findFreeLevelDataID(saveFile);
	} else {
		// going to overwrite
		overwrite = true;
		dataID = saveFile.records[recordID - 1].dataID;

		if (dataID === 0xff) {
			dataID = findFreeLevelDataID(saveFile);
		}
	}

	if (dataID === 0xff) {
		throw new Error('No free level data found, cant add this level');
	}

	level.recordID = recordID;

	newRecord.info = level.info;
	newRecord.playable = dataID < 32 ? 1 : 0;
	newRecord.dataID = dataID;

	if (overwrite) {
		newRecord.eCoinCollected = saveFile.records[recordID - 1].eCoinCollected;
		newRecord.aceCoinCollectedFlag =
			saveFile.records[recordID - 1].aceCoinCollectedFlag;
		newRecord.aceCoinPerfect = saveFile.records[recordID - 1].aceCoinPerfect;
		newRecord.clearedByMario = saveFile.records[recordID - 1].clearedByMario;
		newRecord.clearedByLuigi = saveFile.records[recordID - 1].clearedByLuigi;
	}

	saveFile.records[recordID - 1] = newRecord;
	saveFile.data[dataID] = level;

	saveLevelData(saveData, saveFile);
	saveLevelRecords(saveData, saveFile);
	fixAllChecksum(saveData);

	return saveData;
}

export { injectLevelIntoSave };
