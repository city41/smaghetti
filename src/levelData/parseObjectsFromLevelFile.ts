import {
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_HEADER_SIZE_IN_BYTES,
	ROOM_OBJECT_POINTERS,
} from '../levelData/constants';
import {
	knownFiveByteBank1ObjectIds,
	knownFourByteBank0ObjectIds,
	knownFourByteBank1ObjectIds,
} from './generated_knownIds';

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

	const knownFourByteIds =
		bank > 0 ? knownFourByteBank0ObjectIds : knownFourByteBank1ObjectIds;

	const allKnownFourByteIds = [
		...(knownFourByteIds[objectSet] ?? []),
		...fourByteIds,
	];
	const allKnownFiveByteIds = [
		...(knownFiveByteBank1ObjectIds[objectSet] ?? []),
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
