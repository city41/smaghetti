export const MAX_LEVEL_RECORDS = 72; // Maximum number of level records
export const MAX_LEVEL_DATA = 33; // Maximum number of level data
export const MAX_DATA_SIZE = 2024; // Max compressed level data size
export const MAX_SAVE_SIZE = 0x20000; // Max save data size
export const MAX_ECOIN_TABLE = 24; // e-coin tale size
export const ECOIN_PALETTE_SIZE = 0x20; // e-coin data B size
export const ECOIN_TILE_SIZE = 0x120; // e-coin data A size
export const MAX_NAME_SIZE = 21;
export const OFFSET_ECOIN = 0x668; // e-coins available/collected flag
export const OFFSET_ECOIN_TILE_DATA = 0x4040; // e-coin data A (0x120)
export const OFFSET_ECOIN_PALETTE_DATA = 0x5b40; // e-coin data B (0x20)

export const OFFSET_CLEARED_MARIO = 0x6b9; // Level completed by Mario flag
export const OFFSET_CLEARED_LUIGI = 0x6c3; // Level completed by Luigi flag
export const OFFSET_PERFECT_ACECOIN = 0x730; // All ace coins collected in single play flag
export const OFFSET_PLAYABLE = 0x6b0; // Level playable flag
export const OFFSET_ACECOIN = 0x30; // Ace coins available/collected flag
export const OFFSET_LEVELINFO = 0x740; // Level info (Class, level number, and icon)
export const OFFSET_NAME = 0x80; // Level name table
export const OFFSET_UNFINISHED = 0x29; // Current unfinished level record ID
export const OFFSET_DATAIDLIST = 0x6d4; // Level data ID list
export const LEVEL_ECOIN_PALETTE_OFFSET = 0x40;
export const LEVEL_ECOIN_TILE_OFFSET = 0x60;

type ELevelInfo = {
	name: Uint8Array;
	// this is for convenience/debugging and is never added to a save file
	asciiName: string;
	levelClass: number;
	levelNumber: number;
	icon: number;
	eCoinID: number;
	aceCoinTotal: number;
};

type ELevelRecord = {
	info: ELevelInfo;
	playable: number;
	dataID: number;

	// Progess data
	eCoinCollected: number;
	aceCoinCollectedFlag: number;
	aceCoinPerfect: number;
	clearedByMario: number;
	clearedByLuigi: number;
};

type ELevelData = {
	info: ELevelInfo;
	recordID: number;
	ecoinB: Uint8Array;
	ecoinA: Uint8Array;
	data: Uint8Array;
};

// note that this is not an entire SMA4 save file,
// just the parts pertaining to ereader levels
type SaveFile = {
	records: ELevelRecord[];
	data: ELevelData[];
	ecoinArray: number[];
};

export type { ELevelInfo, ELevelRecord, ELevelData, SaveFile };
