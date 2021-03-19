import { TILE_TYPE_TO_SERIALIZE_ID_MAP } from '../tiles/constants';

function serialize(levelData: LevelData): SerializedLevelData {
	const tiles = levelData.tileLayer.data;

	const serializedTiles = [];
	const serializedTileEntities: SerializedTileEntity[] = [];

	for (let y = 0; y < tiles.length; y += 1) {
		const row = tiles[y];

		if (!row) {
			serializedTiles.push('');
		} else {
			const serializedRow = [];
			for (let x = 0; x < row.length; x += 1) {
				const tile = row[x];

				if (!tile) {
					serializedRow.push('');
				} else {
					serializedRow.push(TILE_TYPE_TO_SERIALIZE_ID_MAP[tile.tileType]);

					if (
						tile.entitySettings &&
						Object.keys(tile.entitySettings).length > 0
					) {
						serializedTileEntities.push({ x, y, s: tile.entitySettings });
					}
				}
			}
			serializedTiles.push(serializedRow);
		}
	}

	const tileLayer = {
		...levelData.tileLayer,
		data: serializedTiles,
	};

	return {
		...levelData,
		tileLayer,
		tileEntities: serializedTileEntities,
	};
}

export { serialize };
