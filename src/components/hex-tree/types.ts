import { LevelSettings } from '../../levelData/parseLevelSettingsFromLevelFile';

type RoomIndex = 0 | 1 | 2 | 3;

type LevelTreeObject = {
	bank: number;
	id: number;
	x: number;
	y: number;
	// TODO: these really should just be param0, param1
	width: number;
	height: number;
	rawBytes: number[];
	exclude?: boolean;
};

type LevelTreeSprite = {
	bank: number;
	id: number;
	x: number;
	y: number;
	rawBytes: number[];
	exclude?: boolean;
};

type LevelTreeTransport = {
	sx: number;
	sy: number;
	destRoom: number;
	dx: number;
	dy: number;
	cx: number;
	cy: number;
	exitType: number;
	rawBytes: number[];
	exclude?: boolean;
};

type LevelTreeObjectHeader = {
	timeLimit: number;
	roomLength: number;
	rawBytes: number[];
};

type LevelTreeRoom = {
	objects: {
		header: LevelTreeObjectHeader;
		objects: LevelTreeObject[];
		pendingRawBytes: number[];
	};
	levelSettings: {
		settings: LevelSettings;
		rawBytes: number[];
	};
	transports: {
		transports: LevelTreeTransport[];
		rawBytes: number[];
	};
	sprites: {
		sprites: LevelTreeSprite[];
		pendingRawBytes: number[];
	};
	blockPaths: {
		rawBytes: number[];
	};
	autoScroll: {
		rawBytes: number[];
	};
	exclude?: boolean;
};

type LevelHeader = {
	eCoin: boolean;
	aceCoins: number;
	levelClass: number;
	levelNumber: number;
	levelIcon: number;
	levelName: string;
	rawBytes: number[];
};

type LevelRooms = [LevelTreeRoom, LevelTreeRoom, LevelTreeRoom, LevelTreeRoom];

type LevelTree = {
	header: LevelHeader;
	rooms: LevelRooms;
};

type BinaryRoom = {
	objectData: number[];
	levelSettingsData: number[];
	transportData: number[];
	spriteData: number[];
	blockPathData: number[];
	autoScrollData: number[];
};

type Exclusion = {
	type: 'object' | 'sprite' | 'transport' | 'room';
	roomIndex: RoomIndex;
	entity?: LevelTreeObject | LevelTreeSprite | LevelTreeTransport;
};

type Patch = {
	type: 'object' | 'sprite' | 'transport' | 'level-settings';
	roomIndex: RoomIndex;
	offset: number;
	bytes: number[];
};

export type {
	Patch,
	Exclusion,
	RoomIndex,
	LevelTree,
	LevelRooms,
	LevelHeader,
	LevelTreeRoom,
	LevelTreeObject,
	LevelTreeObjectHeader,
	LevelTreeSprite,
	LevelTreeTransport,
	BinaryRoom,
};
