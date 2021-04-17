import {
	ROOM_OBJECT_HEADER_SIZE_IN_BYTES,
	ROOM_OBJECT_POINTERS,
} from '../levelData/constants';
import { entityMap } from '../entities/entityMap';
import {
	bank0ObjectIdToEntityType,
	bank1ObjectIdToEntityType,
} from '../entities/objectIdMap';

type LevelObject = {
	bank: number;
	x: number;
	y: number;
	param1: number;
	param2?: number;
	id: number;
	rawBytes: number[];
};

/**
 * object size is not determined by bank. Rather, objects have
 * whatever size they need, and the game seems to know that inherently.
 *
 * This map records all "unexpected" sizes, generally if an object is bank zero,
 * it has a higher chance of being 4 bytes. if it is bank >0, it has a higher chance
 * of being five (or more) bytes, but that is not a definite.
 *
 * TODO: this might need a more central/better location
 * TODO: not sure how object/graphic sets will impact this once they are figured out
 */
const bankIdToByteSize: Record<number, Record<number, number>> = {
	1: {
		0x10: 4, // QuestionBlock with coin payload
		0x18: 4, // something in Classic 1-2, possibly terrain?
		0x3a: 4, // initial wall at start of Classic 1-2
	},
};

function parseObject(
	levelData: Uint8Array | number[],
	objectIndex: number
): LevelObject {
	const bankAndParam1 = levelData[objectIndex];
	const bank = bankAndParam1 >> 6;
	const param1 = bankAndParam1 & 0x3f;
	const id = levelData[objectIndex + 3];

	// if the bank/id combo is in the map, we truly know its size, else
	// we are just guessing based on bank. As reverse engineering progresses,
	// the number of guesses should approach zero
	const rawByteLength = bankIdToByteSize[bank]?.[id] ?? bank === 0 ? 4 : 5;
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
	index: number
): LevelObject[] {
	const objects = [];

	while (data[index] !== 0xff && index < data.length) {
		const object = parseObject(data, index);
		objects.push(object);
		index += object.rawBytes.length;
	}

	return objects;
}

function parseObjectsFromLevelFile(
	levelData: Uint8Array,
	roomIndex: 0 | 1 | 2 | 3 = 0
): LevelObject[] {
	const view = new DataView(levelData.buffer);

	const pointer = ROOM_OBJECT_POINTERS[roomIndex];

	const objectIndex =
		view.getUint16(pointer, true) + ROOM_OBJECT_HEADER_SIZE_IN_BYTES;

	return parseObjects(levelData, objectIndex);
}

export {
	parseObjectHeader,
	parseObjectsFromLevelFile,
	parseObjects,
	parseObject,
};
export type { LevelObject };
