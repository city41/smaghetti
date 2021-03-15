import {
	TILE_TYPE_COUNT,
	FIRST_TILE_INDEX_TO_TILE_TYPE_MAP,
	TileType,
} from './constants';

function getTileType(
	tileIndex: number | null | undefined
): TileType | undefined {
	if (!tileIndex) {
		return undefined;
	}

	let firstTileId = tileIndex % TILE_TYPE_COUNT;

	if (firstTileId === 0) {
		firstTileId = TILE_TYPE_COUNT;
	}

	return FIRST_TILE_INDEX_TO_TILE_TYPE_MAP[firstTileId];
}

export { getTileType };
