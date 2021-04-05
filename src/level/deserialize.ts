import { TILE_SERIALIZED_ID_TO_TYPE_MAP } from '../tiles/constants';
import { entityMap } from '../entities/entityMap';

/**
 * scrub through the entities and make sure they all
 * get assigned a unique id. This helps prevent issues
 * where bugs from previous builds cause duplicate ids
 */
function normalizeIds(entities: EditorEntity[]): EditorEntity[] {
	return entities.map((e, index) => {
		return {
			...e,
			id: index + 1,
		};
	});
}

function getMaxId(entities: EditorEntity[]): number {
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
			const tileSettings = levelData.tileSettings.find(
				(f) => f.x === x && f.y === y
			);

			if (tileSettings) {
				levelData.tileSettings = levelData.tileSettings.filter(
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

	const deserializedLevelData = {
		...levelData,
		entities: normalizedEntities,
		tileLayer: {
			...levelData.tileLayer,
			data: tiles,
		},
	};

	return {
		levelData: deserializedLevelData,
		maxId: idCounter,
	};
}

export { deserialize };
