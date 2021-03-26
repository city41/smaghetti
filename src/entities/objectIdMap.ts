import { TileType } from '../tiles/constants';

const objectIdToTileType: Record<number, TileType> = {
	0xf: 'Brick',
	0x16: 'Coin',
	0x10: 'QuestionBlock',
};

const tileTypeToObjectId: Record<TileType, number> = (function () {
	return Object.entries(objectIdToTileType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<TileType, number>;
})();

export { objectIdToTileType, tileTypeToObjectId };
