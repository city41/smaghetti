import {
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_HEADER_SIZE_IN_BYTES,
	ROOM_OBJECT_POINTERS,
} from '../levelData/constants';
import {
	knownFiveByteBank1ObjectIds,
	knownFourByteBank0ObjectIds,
	knownFourByteBank1ObjectIds,
} from './knownIds';
import { entityMap } from '../entities/entityMap';
import { decodeObjectSet } from '../entities/util';

type LevelObject = {
	bank: number;
	x: number;
	y: number;
	param1: number;
	param2?: number;
	id: number;
	rawBytes: number[];
	isKnown: boolean;
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

function getRawByteLength(
	objectSet: number,
	bank: number,
	id: number,
	fourByteIds: number[],
	fiveByteIds: number[]
): { isKnown: boolean; rawByteLength: number } {
	const matchingEntity = Object.entries(entityMap).find((entry) => {
		const e = entry[1];
		return (
			!!e.toObjectBinary &&
			e.objectId === id &&
			e.emptyBank === bank &&
			e.objectSets.some((os) => decodeObjectSet(os)[0] === objectSet)
		);
	});

	if (matchingEntity) {
		// console.log('matchingEntity', matchingEntity[0]);
		return {
			isKnown: true,
			rawByteLength: matchingEntity[1].toObjectBinary!(0, 0, 1, 1, {}).length,
		};
	}

	// if the bank/id combo is in the map, we probably know its size, else
	// we are just guessing based on bank. As reverse engineering progresses,
	// the number of guesses should hopefully approach zero
	let rawByteLength = bank === 0 ? 4 : 5;

	// allow overrides to take priority, used by hex-tree
	if (fourByteIds.includes(id)) {
		rawByteLength = 4;
	} else if (fiveByteIds.includes(id)) {
		rawByteLength = 5;
	} else if (
		bank === 0 &&
		knownFourByteBank0ObjectIds[objectSet].includes(id)
	) {
		rawByteLength = 4;
	} else if (
		bank !== 0 &&
		knownFourByteBank1ObjectIds[objectSet].includes(id)
	) {
		rawByteLength = 4;
	} else if (
		bank !== 0 &&
		knownFiveByteBank1ObjectIds[objectSet].includes(id)
	) {
		rawByteLength = 5;
	}

	return { isKnown: false, rawByteLength };
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

	const { rawByteLength, isKnown } = getRawByteLength(
		objectSet,
		bank,
		id,
		fourByteIds,
		fiveByteIds
	);

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
		isKnown,
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
