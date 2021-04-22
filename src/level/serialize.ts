import { TILE_TYPE_TO_SERIALIZE_ID_MAP } from '../tiles/constants';
import isEqual from 'lodash/isEqual';
import { entityMap } from '../entities/entityMap';

function serializeRoom(room: RoomData): SerializedRoomData {
	const tiles = room.matrixLayer.data;

	const serializedTiles = [];
	const serializedTileSettings: SerializedMatrixEntitySettings[] = [];

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
					const serializedId = TILE_TYPE_TO_SERIALIZE_ID_MAP[tile.type];

					if (!serializedId) {
						throw new Error(
							`${tile.type} not found in TILE_TYPE_TO_SERIALIZE_ID_MAP`
						);
					}

					serializedRow.push(serializedId);

					// TODO: don't serialize the settings if they are all defaults
					if (
						tile.settings &&
						Object.keys(tile.settings).length > 0 &&
						!isEqual(entityMap[tile.type].defaultSettings, tile.settings)
					) {
						serializedTileSettings.push({ x, y, s: tile.settings });
					}
				}
			}
			serializedTiles.push(serializedRow);
		}
	}

	const tileLayer = {
		...room.matrixLayer,
		data: serializedTiles,
	};

	return {
		...room,
		matrixLayer: tileLayer,
		matrixEntitySettings: serializedTileSettings,
	};
}

function serialize(levelData: LevelData): SerializedLevelData {
	return {
		rooms: levelData.rooms.map(serializeRoom),
	};
}

export { serialize };
