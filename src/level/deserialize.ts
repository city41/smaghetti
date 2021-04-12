import { TILE_SERIALIZED_ID_TO_TYPE_MAP } from '../tiles/constants';
import { entityMap } from '../entities/entityMap';

/**
 * scrub through the entities and make sure they all
 * get assigned a unique id. This helps prevent issues
 * where bugs from previous builds cause duplicate ids
 */
function normalizeIds(
	entities: EditorEntity[],
	idCounter: number
): { idCounter: number; normalizedEntities: EditorEntity[] } {
	const normalizedEntities = entities.map((e) => {
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

function deserializeRoom(
	room: SerializedRoomData,
	idCounter: number
): { idCounter: number; room: RoomData } {
	const { width, height } = room.tileLayer;

	const { idCounter: newIdCounter, normalizedEntities } = normalizeIds(
		room.entities,
		idCounter
	);

	idCounter = newIdCounter;

	const tiles = room.tileLayer.data.map((row, y) => {
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

			const tileType = TILE_SERIALIZED_ID_TO_TYPE_MAP[cell];
			const tileSettings = room.tileSettings.find(
				(f) => f.x === x && f.y === y
			);

			if (tileSettings) {
				room.tileSettings = room.tileSettings.filter(
					(te) => te !== tileSettings
				);
			}

			const objectDef = entityMap[tileType];
			let settings = tileSettings?.s;

			if (!settings && objectDef.settingsType === 'single') {
				settings = { ...objectDef.defaultSettings };
			}

			return {
				id: idCounter++,
				x,
				y,
				tileType,
				// TODO: tileIndex isn't really used anymore
				tileIndex: 0,
				settings,
			};
		});
	});

	return {
		idCounter,
		room: {
			...room,
			entities: normalizedEntities,
			tileLayer: {
				width,
				height,
				data: tiles,
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
