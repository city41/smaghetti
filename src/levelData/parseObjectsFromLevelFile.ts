import {
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_HEADER_SIZE_IN_BYTES,
	ROOM_OBJECT_POINTERS,
	ROOM_TYPE_SETTINGS,
} from '../levelData/constants';

type LevelObject = {
	bank: number;
	x: number;
	y: number;
	param1: number;
	param2?: number;
	id: number;
	rawBytes: number[];
};

function getObjectSet(data: Uint8Array, roomIndex: number): number {
	const view = new DataView(data.buffer);

	const levelSettingsPointer = ROOM_LEVELSETTING_POINTERS[roomIndex];

	if (levelSettingsPointer >= data.length - 2) {
		return -1;
	}

	const levelSettingsAddress = view.getUint16(levelSettingsPointer, true);

	if (levelSettingsAddress >= data.length - 2) {
		return -1;
	}

	const objectSet = view.getUint16(levelSettingsAddress + 12, true);

	return objectSet;
}

/**
 * object size is not determined by bank. Rather, objects have
 * whatever size they need, and the game seems to know that inherently.
 *
 * This array records all objects that are not in bank zero but are 4 bytes rather than 5.
 *
 * So far it seems un-assuming >0 objects are 5 bytes is working well. If we need to make
 * bank 0 objects 5 bytes or something else proves to be true, need to revisit this
 *
 * TODO: this might need a more central/better location
 * TODO: not sure how object/graphic sets will impact this once they are figured out
 */
const knownFourByteIds: Record<number, number[]> = {
	0: [
		0x10, // question block
	],
	[ROOM_TYPE_SETTINGS.underground.objectSet]: [
		0x10, // QuestionBlock with coin payload
		0x17, // something in Classic 1-2, I think it's a pipe
		0x18, // something in Classic 1-2, also think it's a pipe
		0x1c, // something in Classic 1-2, also think it's a pipe
		0x3a, // initial wall at start of Classic 1-2
		0x5a, // buried veggie -- giant veggie
		0x5b, // buried veggie -- regular veggie
		0x5c, // buried veggie -- small veggie
		0x63, // buried veggie -- coin
		0x64, // buried veggie -- coin cache
		0x65, // buried veggie -- 1up
		0x67, // buried veggie -- poison mushroom
		0x69, // buried veggie -- monty mole
		0x7e, // buried veggie -- koopa shell
		0xd, // final most wall in Classic 1-2 (right side of warp pipe "room")
	],
	[ROOM_TYPE_SETTINGS.fortress.objectSet]: [
		0x21, // the bridge in classic fortresses
		0x79, // not sure yet, but it is in mushroom04
		0x56, // yellow switch brick
		0x61, // ghost house wooden walkway
		0xb, // pointing up spike strip
	],
	// TODO: not sure what this object set is yet, but it is mushroom11, room 0, the one with music blocks galore
	0x4: [
		0x14, // empty music block
		0x5, // not sure yet, but it is in mushroom11,room0
		0x17, // seems to be a upward pipe, mushroom11,room2
	],
	0xa: [
		0x2f, // first object in mushroom05,room0. no idea what it is, but it is clearly 4 bytes
	],
};

const knownFiveByteIds: Record<number, number[]> = {
	[ROOM_TYPE_SETTINGS.fortress.objectSet]: [
		0xd, // the main fortress "metal" brick
	],
};

function parseObject(
	levelData: Uint8Array | number[],
	objectIndex: number,
	objectSet: number,
	fourByteIds: number[],
	fiveByteIds: number[]
): LevelObject {
	const bankAndParam1 = levelData[objectIndex];
	const bank = bankAndParam1 >> 6;
	const param1 = bankAndParam1 & 0x3f;
	const id = levelData[objectIndex + 3];

	const allKnownFourByteIds = [
		...(knownFourByteIds[objectSet] ?? []),
		...(knownFourByteIds[0] ?? []),
		...fourByteIds,
	];
	const allKnownFiveByteIds = [
		...(knownFiveByteIds[objectSet] ?? []),
		...(knownFiveByteIds[0] ?? []),
		...fiveByteIds,
	];

	// if the bank/id combo is in the map, we truly know its size, else
	// we are just guessing based on bank. As reverse engineering progresses,
	// the number of guesses should approach zero
	let rawByteLength = bank === 0 ? 4 : 5;

	if (bank === 0 || allKnownFourByteIds.includes(id)) {
		rawByteLength = 4;
	}

	if (bank !== 0 && allKnownFiveByteIds.includes(id)) {
		rawByteLength = 5;
	}

	const rawBytes = Array.from(
		levelData.slice(objectIndex, objectIndex + rawByteLength)
	);

	return {
		bank,
		id: levelData[objectIndex + 3],
		x: levelData[objectIndex + 2],
		y: levelData[objectIndex + 1],
		// TODO: probably should not add the 1 here
		param1: param1 + 1,
		param2: rawBytes.length > 4 ? rawBytes[4] + 1 : undefined,
		rawBytes,
	};
}

function parseObjectHeader(
	levelData: Uint8Array,
	roomIndex: 0 | 1 | 2 | 3 = 0
) {
	const view = new DataView(levelData.buffer);
	const pointer = ROOM_OBJECT_POINTERS[roomIndex];
	const objectIndex = view.getUint16(pointer, true);

	return {
		timeLimit: 0,
		roomLength: 0,
		rawBytes: Array.from(
			levelData.subarray(
				objectIndex,
				objectIndex + ROOM_OBJECT_HEADER_SIZE_IN_BYTES
			)
		),
	};
}

function parseObjects(
	data: Uint8Array | number[],
	index: number,
	objectSet: number,
	fourByteIds: number[],
	fiveByteIds: number[]
): LevelObject[] {
	const objects = [];

	while (data[index] !== 0xff && index < data.length) {
		const object = parseObject(
			data,
			index,
			objectSet,
			fourByteIds,
			fiveByteIds
		);
		objects.push(object);
		index += object.rawBytes.length;
	}

	return objects;
}

function parseObjectsFromLevelFile(
	levelData: Uint8Array,
	roomIndex: 0 | 1 | 2 | 3 = 0,
	fourByteIds: number[],
	fiveByteIds: number[]
): LevelObject[] {
	const view = new DataView(levelData.buffer);

	const pointer = ROOM_OBJECT_POINTERS[roomIndex];

	if (pointer >= levelData.length - 2) {
		return [];
	}

	const objectIndex =
		view.getUint16(pointer, true) + ROOM_OBJECT_HEADER_SIZE_IN_BYTES;

	const objectSet = getObjectSet(levelData, roomIndex);

	return parseObjects(
		levelData,
		objectIndex,
		objectSet,
		fourByteIds,
		fiveByteIds
	);
}

export {
	parseObjectHeader,
	parseObjectsFromLevelFile,
	parseObjects,
	parseObject,
};
export type { LevelObject };
