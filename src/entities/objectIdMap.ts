import { EntityType } from './entityMap';

// this is weird because the ids dont really map 1:1 to a tile type
// TODO: need to figure this out better?
const bank1ObjectIdToEntityType: Record<number, EntityType> = {
	0xf: 'Brick',
	0x16: 'Coin',
	0x10: 'QuestionBlock',
	0x80: 'IndestructibleBrick',
};

const bank0ObjectIdToEntityType: Record<number, EntityType> = {
	0x10: 'QuestionBlock', // with mushroom/fire flower inside
	0x16: 'Brick', // with mushroom/fire flower inside
	0x1b: 'Brick', // with a one up mushroom in it
	0x1a: 'Brick', // with a coin cache inside
	0x18: 'Brick', // with a coin cache inside
};

const bank1EntityTypeToObjectId: Record<EntityType, number> = (function () {
	return Object.entries(bank1ObjectIdToEntityType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<EntityType, number>;
})();

const bank0EntityTypeToObjectId: Record<EntityType, number> = (function () {
	return Object.entries(bank0ObjectIdToEntityType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<EntityType, number>;
})();

export {
	bank0EntityTypeToObjectId,
	bank0ObjectIdToEntityType,
	bank1EntityTypeToObjectId,
	bank1ObjectIdToEntityType,
};
