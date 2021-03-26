import { TileType } from '../tiles/constants';

// this is weird because the ids dont really map 1:1 to a tile type
// TODO: need to figure this out better?
// also TODO: this is duplicating info found at for example Brick.ts
const bank1ObjectIdToTileType: Record<number, TileType> = {
	0xf: 'Brick',
	0x16: 'Coin',
	0x10: 'QuestionBlock',
};

const bank0ObjectIdToTileType: Record<number, TileType> = {
	0x16: 'Brick', // with mushroom/fire flower inside
	0x1b: 'Brick', // with a one up mushroom in it
	0x1a: 'Brick', // with a coin cache inside
};

const bank1TileTypeToObjectId: Record<TileType, number> = (function () {
	return Object.entries(bank1ObjectIdToTileType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<TileType, number>;
})();

const bank0TileTypeToObjectId: Record<TileType, number> = (function () {
	return Object.entries(bank0ObjectIdToTileType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<TileType, number>;
})();

export {
	bank1ObjectIdToTileType,
	bank0TileTypeToObjectId,
	bank0ObjectIdToTileType,
	bank1TileTypeToObjectId,
};
