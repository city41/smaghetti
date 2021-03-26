import { ROOM0_OBJECT_POINTER_ADDRESS } from '../levelData/constants';
import { objectMap } from '../entities/entityMap';
import {
	bank0ObjectIdToObjectType,
	bank1ObjectIdToObjectType,
} from '../entities/objectIdMap';

type LevelObject = {
	bank: 0 | 1 | 2;
	x: number;
	y: number;
	width: number;
	height: number;
	id: number;
	rawBytes: number[];
};

function extractObject(
	levelData: Uint8Array,
	objectIndex: number
): LevelObject {
	const bankAndWidth = levelData[objectIndex];
	const bank = bankAndWidth >> 6;
	const width = bankAndWidth & 0x3f;
	const id = levelData[objectIndex + 3];

	const objectIdToObjectType =
		bank === 0 ? bank0ObjectIdToObjectType : bank1ObjectIdToObjectType;
	const ObjectType = objectMap[objectIdToObjectType[id]];

	const rawByteLength = bank === 0 ? 4 : 5;
	const rawBytes = Array.from(
		levelData.slice(objectIndex, objectIndex + rawByteLength)
	);

	if (ObjectType && ObjectType.parseBinary) {
		return ObjectType.parseBinary(rawBytes);
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
	} else if (bank === 1 || bank === 2) {
		return {
			bank,
			id: levelData[objectIndex + 3],
			x: levelData[objectIndex + 2],
			y: levelData[objectIndex + 1],
			width: width + 1,
			height: levelData[objectIndex + 4] + 1,
			rawBytes: Array.from(levelData.slice(objectIndex, objectIndex + 5)),
		};
	} else {
		throw new Error('whoa, an object in bank ' + bank);
	}
}

function parseObjectsFromLevelFile(levelData: Uint8Array): LevelObject[] {
	const view = new DataView(levelData.buffer);

	let objectIndex = view.getUint16(ROOM0_OBJECT_POINTER_ADDRESS, true);

	const objects = [];

	while (levelData[objectIndex] !== 0xff) {
		const object = extractObject(levelData, objectIndex);
		objects.push(object);
		objectIndex += object.rawBytes.length;
	}

	return objects;
}
export { parseObjectsFromLevelFile };
export type { LevelObject };
