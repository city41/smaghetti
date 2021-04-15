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
	width: number;
	height: number;
	id: number;
	rawBytes: number[];
};

function extractObject(
	levelData: Uint8Array | number[],
	objectIndex: number
): LevelObject {
	const bankAndWidth = levelData[objectIndex];
	const bank = bankAndWidth >> 6;
	const width = bankAndWidth & 0x3f;
	const id = levelData[objectIndex + 3];

	const objectIdToEntityType =
		bank === 0 ? bank0ObjectIdToEntityType : bank1ObjectIdToEntityType;
	const entityDef = entityMap[objectIdToEntityType[id]];

	const rawByteLength = bank === 0 ? 4 : 5;
	const rawBytes = Array.from(
		levelData.slice(objectIndex, objectIndex + rawByteLength)
	);

	if (entityDef && entityDef.parseBinary) {
		return entityDef.parseBinary(rawBytes);
	} else if (bank === 0) {
		return {
			bank,
			id: levelData[objectIndex + 3],
			x: levelData[objectIndex + 2],
			y: levelData[objectIndex + 1],
			width: width + 1,
			height: 1,
			rawBytes: Array.from(levelData.slice(objectIndex, objectIndex + 4)),
		};
	} else {
		return {
			bank,
			id: levelData[objectIndex + 3],
			x: levelData[objectIndex + 2],
			y: levelData[objectIndex + 1],
			width: width + 1,
			height: levelData[objectIndex + 4] + 1,
			rawBytes: Array.from(levelData.slice(objectIndex, objectIndex + 5)),
		};
	}
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
		const object = extractObject(data, index);
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

export { parseObjectHeader, parseObjectsFromLevelFile, parseObjects };
export type { LevelObject };
