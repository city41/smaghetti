import { TILE_TYPE_TO_SERIALIZE_ID_MAP } from '../tiles/constants';
import isEqual from 'lodash/isEqual';
import { entityMap } from '../entities/entityMap';

function serializeMatrix(
	matrix: EditorEntityMatrix
): {
	matrix: SerializedEditorEntityMatrix;
	matrixSettings: SerializedMatrixEntitySettings[];
} {
	const serializedMatrix = [];
	const serializedMatrixSettings: SerializedMatrixEntitySettings[] = [];

	for (let y = 0; y < matrix.length; y += 1) {
		const row = matrix[y];

		if (!row) {
			serializedMatrix.push('');
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
						serializedMatrixSettings.push({ x, y, s: tile.settings });
					}
				}
			}
			serializedMatrix.push(serializedRow);
		}
	}

	return { matrix: serializedMatrix, matrixSettings: serializedMatrixSettings };
}

function serializeRoom(room: RoomData): SerializedRoomData {
	const serializedRoom = {
		...room,
		actors: {
			...room.actors,
			...serializeMatrix(room.actors.matrix),
		},
		stage: {
			...room.stage,
			...serializeMatrix(room.stage.matrix),
		},
	};

	return serializedRoom;
}

function serialize(levelData: LevelData): SerializedLevelData {
	return {
		rooms: levelData.rooms.map(serializeRoom),
	};
}

export { serialize };
