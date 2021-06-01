import { ParsedLevelSettings } from '../../levelData/parseLevelSettingsFromLevelFile';

type RoomIndex = 0 | 1 | 2 | 3;

type LevelTreeObject = {
	bank: number;
	id: number;
	x: number;
	y: number;
	param1: number;
	param2?: number;
	rawBytes: number[];
	isKnown: boolean;
	exclude?: boolean;
};

type LevelTreeSprite = {
	bank: number;
	id: number;
	x: number;
	y: number;
	rawBytes: number[];
	isKnown: boolean;
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
		settings: ParsedLevelSettings | null;
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

type ObjectExclusion = {
	type: 'object';
	roomIndex: RoomIndex;
	entity: LevelTreeObject;
};

type SpriteExclusion = {
	type: 'sprite';
	roomIndex: RoomIndex;
	entity: LevelTreeSprite;
};

type TransportExclusion = {
	type: 'transport';
	roomIndex: RoomIndex;
	entity: LevelTreeTransport;
};

type RoomExclusion = {
	type: 'room';
	roomIndex: RoomIndex;
};

type Exclusion =
	| ObjectExclusion
	| SpriteExclusion
	| TransportExclusion
	| RoomExclusion;

type LevelSettingsPatch = {
	type: 'level-settings';
	roomIndex: RoomIndex;
	offset: number;
	bytes: number[];
};

type SpritePatch = {
	type: 'sprite';
	roomIndex: RoomIndex;
	spriteIndex: number;
	offset: number;
	bytes: number[];
};

type ObjectPatch = {
	type: 'object';
	roomIndex: RoomIndex;
	objectIndex: number;
	offset: number;
	bytes: number[];
};

type ObjectHeaderPatch = {
	type: 'object-header';
	roomIndex: RoomIndex;
	offset: number;
	bytes: number[];
};

type Patch = LevelSettingsPatch | SpritePatch | ObjectPatch | ObjectHeaderPatch;

type Add = {
	type: 'sprite' | 'object' | 'transport';
	roomIndex: number;
	afterIndex: number;
	bytes: number[];
};

type ByteSizes = {
	object: {
		four: number[];
		five: number[];
	};
	sprite: {
		four: number[];
		five: number[];
		six: number[];
	};
};

export type {
	ObjectPatch,
	SpritePatch,
	LevelSettingsPatch,
	Patch,
	Add,
	SpriteExclusion,
	ObjectExclusion,
	TransportExclusion,
	RoomExclusion,
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
	ByteSizes,
};
