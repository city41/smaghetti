import { TILE_SERIALIZED_ID_TO_TYPE_MAP } from '../tiles/constants';
import { entityMap } from '../entities/entityMap';

/**
 * scrub through the entities and make sure they all
 * get assigned a unique id. This helps prevent issues
 * where bugs from previous builds cause duplicate ids
 */
function normalizeIds(
	layer: SerializedRoomLayer,
	idCounter: number
): { idCounter: number; normalizedEntities: EditorEntity[] } {
	const normalizedEntities = layer.entities.map((e) => {
		return {
			...e,
			id: idCounter++,
		};
	});

	return {
		idCounter,
		normalizedEntities,
	};
}

function deserializeMatrix(
	layer: SerializedRoomLayer,
	idCounter: number
): { matrix: EditorEntityMatrix; idCounter: number } {
	const matrix = layer.matrix.map((row, y) => {
		if (row === null) {
			return row;
		}

		if (row === '') {
			return null;
		}

		return (row as (string | null)[]).map((cell, x) => {
			if (cell === null) {
				return cell;
			}

			if (cell === '') {
				return null;
			}

			const type = TILE_SERIALIZED_ID_TO_TYPE_MAP[cell];

			if (!type) {
				return null;
			}

			const tileSettings = layer.matrixSettings.find(
				(f) => f.x === x && f.y === y
			);

			if (tileSettings) {
				layer.matrixSettings = layer.matrixSettings.filter(
					(te) => te !== tileSettings
				);
			}

			const objectDef = entityMap[type];
			let settings = tileSettings?.s;

			if (!settings && objectDef.settingsType === 'single') {
				settings = { ...objectDef.defaultSettings };
			}

			return {
				id: idCounter++,
				x,
				y,
				type,
				settings,
			};
		});
	});

	return { matrix, idCounter };
}

function deserializeRoom(
	room: SerializedRoomData,
	idCounter: number
): { idCounter: number; room: RoomData } {
	const actorEntitiesResult = normalizeIds(room.actors, 1);
	const actorMatrixResult = deserializeMatrix(
		room.actors,
		actorEntitiesResult.idCounter
	);
	const stageEntitiesResult = normalizeIds(
		room.stage,
		actorMatrixResult.idCounter
	);
	const stageMatrixResult = deserializeMatrix(
		room.stage,
		stageEntitiesResult.idCounter
	);
	idCounter = stageMatrixResult.idCounter;

	return {
		idCounter,
		room: {
			...room,
			actors: {
				entities: actorEntitiesResult.normalizedEntities,
				matrix: actorMatrixResult.matrix,
			},
			stage: {
				entities: stageEntitiesResult.normalizedEntities,
				matrix: stageMatrixResult.matrix,
			},
		},
	};
}

function deserialize(
	levelData: SerializedLevelData
): { levelData: LevelData; maxId: number } {
	let idCounter = 0;

	const deserializedLevelData: LevelData = {
		...levelData,
		rooms: levelData.rooms.reduce<RoomData[]>((building, room) => {
			const {
				idCounter: newIdCounter,
				room: deserializedRoom,
			} = deserializeRoom(room, idCounter);

			idCounter = newIdCounter;
			return building.concat(deserializedRoom);
		}, []),
	};

	return {
		levelData: deserializedLevelData,
		maxId: idCounter,
	};
}

export { deserialize };
