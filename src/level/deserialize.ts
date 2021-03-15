import {
	TILE_SERIALIZED_ID_TO_TYPE_MAP,
	TILE_SIZE,
	TILE_TYPE_TO_FIRST_TILE_INDEX_MAP,
} from '../tiles/constants';
import { groupTiles } from './groupTiles';

/**
 * scrub through the entities and make sure they all
 * get assigned a unique id. This helps prevent issues
 * where bugs from previous builds cause duplicate ids
 */
function normalizeIds(entities: Entity[]): Entity[] {
	return entities.map((e, index) => {
		return {
			...e,
			id: index + 1,
		};
	});
}

function getMaxId(entities: Entity[]): number {
	const ids = entities.map((e) => e.id);

	return Math.max(...ids);
}

function deserialize(
	levelData: SerializedLevelData
): { levelData: LevelData; maxId: number } {
	const normalizedEntities = normalizeIds(levelData.entities);

	let idCounter = getMaxId(normalizedEntities) + 1;

	const { width, height } = levelData.tileLayer;

	const tiles = levelData.tileLayer.data.map((row, y) => {
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
			const tileEntityData = levelData.tileEntities.find(
				(f) => f.x === x && f.y === y
			);

			if (tileEntityData) {
				levelData.tileEntities = levelData.tileEntities.filter(
					(te) => te !== tileEntityData
				);
			}

			return {
				id: idCounter++,
				x,
				y,
				tileType,
				tileIndex: TILE_TYPE_TO_FIRST_TILE_INDEX_MAP[tileType],
				entitySettings: tileEntityData?.s,
			};
		});
	});

	const groupedTiles = groupTiles(
		tiles,
		{ x: 0, y: 0 },
		width,
		height,
		width,
		height,
		() => idCounter++
	);

	const deserializedLevelData = {
		...levelData,
		entities: normalizedEntities,
		tileLayer: {
			...levelData.tileLayer,
			data: groupedTiles,
		},
	};

	return {
		levelData: deserializedLevelData,
		maxId: idCounter,
	};
}

export { deserialize };
