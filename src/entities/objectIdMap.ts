import { ObjectType } from './entityMap';

// this is weird because the ids dont really map 1:1 to a tile type
// TODO: need to figure this out better?
const bank1ObjectIdToObjectType: Record<number, ObjectType> = {
	0xf: 'Brick',
	0x16: 'Coin',
	0x10: 'QuestionBlock',
	0x80: 'IndestructibleBrick',
};

const bank0ObjectIdToObjectType: Record<number, ObjectType> = {
	0x10: 'QuestionBlock', // with mushroom/fire flower inside
	0x16: 'Brick', // with mushroom/fire flower inside
	0x1b: 'Brick', // with a one up mushroom in it
	0x1a: 'Brick', // with a coin cache inside
};

const bank1ObjectTypeToObjectId: Record<ObjectType, number> = (function () {
	return Object.entries(bank1ObjectIdToObjectType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<ObjectType, number>;
})();

const bank0ObjectTypeToObjectId: Record<ObjectType, number> = (function () {
	return Object.entries(bank0ObjectIdToObjectType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<ObjectType, number>;
})();

export {
	bank1ObjectIdToObjectType,
	bank0ObjectTypeToObjectId,
	bank0ObjectIdToObjectType,
	bank1ObjectTypeToObjectId,
};
