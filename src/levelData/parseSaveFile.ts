import type { ELevelData, ELevelRecord, SaveFile } from "./typesAndConstants";

import {
  MAX_DATA_SIZE,
  MAX_ECOIN_TABLE,
  MAX_LEVEL_DATA,
  MAX_LEVEL_RECORDS,
  MAX_NAME_SIZE,
  OFFSET_ECOIN,
  OFFSET_ACECOIN,
  OFFSET_LEVELINFO,
  OFFSET_NAME,
  OFFSET_PLAYABLE,
  OFFSET_PERFECT_ACECOIN,
  OFFSET_CLEARED_MARIO,
  OFFSET_CLEARED_LUIGI,
} from "./typesAndConstants";
import { convertLevelNameToASCII, getLevelDataAddress } from "./util";

function getLevelName(saveData: Uint8Array, index: number): Uint8Array {
  const name: number[] = [];

  for (let i = 0; i < MAX_NAME_SIZE; ++i) {
    const letter = saveData[OFFSET_NAME + index * MAX_NAME_SIZE + i];

    name.push(letter);

    if (letter === 0xff) {
      break;
    }
  }

  return Uint8Array.from(name);
}

function getEcoinID(saveData: Uint8Array, id: number): number {
  for (let i = 0; i < MAX_ECOIN_TABLE; i++) {
    if (id + 1 === (saveData[OFFSET_ECOIN + i] & 0x7f)) {
      return i + 1;
    }
  }

  return 0;
}

function getLevelDataID(recordIDs: number[], recordID: number): number {
  for (let i = 0; i < recordIDs.length; i++) {
    if (recordIDs[i] === recordID + 1) {
      return i;
    }
  }

  return 0xff;
}

// #define BITTEST(v,n) ((v) & (1 << (n)))				// Get the specific bit status

function getBit(
  saveData: Uint8Array,
  byteIndex: number,
  bitIndex: number
): 1 | 0 {
  const byte = saveData[byteIndex];

  if (byte & (1 << bitIndex)) {
    return 1;
  }

  return 0;
}

function getLevelRecords(
  saveData: Uint8Array,
  recordIDs: number[]
): ELevelRecord[] {
  const records = [];

  for (let i = 0; i < MAX_LEVEL_RECORDS; ++i) {
    const eCoinID = getEcoinID(saveData, i);
    const name = getLevelName(saveData, i);

    records.push({
      info: {
        name,
        asciiName: convertLevelNameToASCII(name),
        levelClass: saveData[OFFSET_LEVELINFO + i * 2 + 1] & (0xf8 >> 3),
        levelNumber: saveData[OFFSET_LEVELINFO + i * 2 + 0] & 0x3f,
        icon:
          (saveData[OFFSET_LEVELINFO + i * 2 + 1] & (0x07 << 2)) |
          ((saveData[OFFSET_LEVELINFO + i * 2 + 0] & 0xc0) >> 6),
        aceCoinTotal: (saveData[OFFSET_ACECOIN + i] & 0xe0) >> 5,
        eCoinID,
      },
      dataID: getLevelDataID(recordIDs, i),
      playable: getBit(saveData, OFFSET_PLAYABLE + Math.floor(i / 8), i % 8),
      eCoinCollected:
        eCoinID === 0 ? 0 : (saveData[OFFSET_ECOIN + eCoinID - 1] & 0x80) >> 7,
      aceCoinCollectedFlag: saveData[OFFSET_ACECOIN + i] & 0x1f,
      aceCoinPerfect: getBit(
        saveData,
        OFFSET_PERFECT_ACECOIN + Math.floor(i / 8),
        i % 8
      ),
      clearedByMario: getBit(
        saveData,
        OFFSET_CLEARED_MARIO + Math.floor(i / 8),
        i % 8
      ),
      clearedByLuigi: getBit(
        saveData,
        OFFSET_CLEARED_LUIGI + Math.floor(i / 8),
        i % 8
      ),
    });
  }

  return records;
}

function getLevelData(
  saveData: Uint8Array,
  records: ELevelRecord[],
  recordIDs: number[]
): ELevelData[] {
  const levelData = [];

  for (let i = 0; i < MAX_LEVEL_DATA; ++i) {
    const addr = getLevelDataAddress(i);

    const data: number[] = [];

    for (let j = 0; j < MAX_DATA_SIZE; ++j) {
      data.push(saveData[addr + 8 + j]);
    }

    levelData.push({
      info: records[i].info,
      recordID: recordIDs[i],
      data: Uint8Array.from(data),
      ecoinA: Uint8Array.from([]),
      ecoinB: Uint8Array.from([]),
    });
  }

  return levelData;
}

function getRecordIDs(saveData: Uint8Array): number[] {
  const recordIDs: number[] = [];

  for (let i = 0; i < MAX_LEVEL_DATA; ++i) {
    const addr = getLevelDataAddress(i);
    recordIDs.push(saveData[addr]);
  }

  return recordIDs;
}

function parseSaveFile(saveData: Uint8Array): SaveFile {
  const recordIDs = getRecordIDs(saveData);
  const records = getLevelRecords(saveData, recordIDs);
  const data = getLevelData(saveData, records, recordIDs);
  return {
    records,
    data,
  };
}

export { parseSaveFile };
