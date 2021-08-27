import { Versioned } from './convertLevelToLatestVersion';
import cloneDeep from 'lodash/cloneDeep';
import { TILE_SIZE } from '../../tiles/constants';

type Version_5_2_0 = SerializedLevel;

function is511(level: Versioned): level is SerializedLevel {
	return level.version === '5.1.1';
}

// this is needed since server levels won't have any settings
// due to the mistake in 5.1.0
const DEFAULT_SETTINGS: LevelSettings = {
	timer: 900,
};

const liquidCellIds: Record<string, EntityType> = {
	Cw: 'ChoppyWater',
	Lv: 'Lava',
	Pw: 'PoolOfWater',
	Wf: 'Waterfall',
};

function extractLiquidEntity(
	matrix: SerializedEditorEntityMatrix,
	targetId: string
): EditorEntity[] {
	const entities: EditorEntity[] = [];

	function getEndX(row: string[], startX: number): number {
		let x = startX;

		while (row[x] === targetId && x - startX < 26) {
			++x;
		}

		// x goes one too far, so our tile is one back
		return Math.max(startX, x - 1);
	}

	function getMaxY(x: number, startY: number): number {
		let y = startY;

		while (matrix[y]?.[x] === targetId) {
			++y;
		}

		return Math.max(y - 1, startY);
	}

	function getBestY(startX: number, endX: number, startY: number): number {
		let curBest = Number.MAX_SAFE_INTEGER;

		for (let x = startX; x <= endX; ++x) {
			const thisColMaxY = getMaxY(x, startY);

			curBest = Math.min(curBest, thisColMaxY);
		}

		return curBest;
	}

	function erase(startY: number, endY: number, startX: number, endX: number) {
		for (let y = startY; y <= endY; ++y) {
			const row = matrix[y];

			if (Array.isArray(row)) {
				for (let x = startX; x <= endX; ++x) {
					row[x] = '';
				}
			}
		}
	}

	for (let y = 0; y < matrix.length; ++y) {
		const row = matrix[y];

		if (!row || typeof row === 'string') {
			continue;
		}

		for (let x = 0; x < row.length; ++x) {
			const tileId = row[x];

			if (tileId !== targetId) {
				continue;
			}

			const endX = getEndX(row, x);
			const bestY = getBestY(x, endX, y);

			const width = endX - x + 1;
			const height = bestY - y + 1;

			entities.push({
				// the id is really just to satisfy typescript. deserialize() will normalize
				// and fix the ids for the entire level, so the fact we are creating
				// duplicate ids during this process doesn't matter
				id: 123,
				type: liquidCellIds[targetId],
				x: x * TILE_SIZE,
				y: y * TILE_SIZE,
				settings: { width, height },
			});

			erase(y, bestY, x, endX);
		}
	}

	return entities;
}

function extractLiquidCellEntities(
	matrix: SerializedEditorEntityMatrix
): EditorEntity[] {
	const newMatrix = cloneDeep(matrix);

	const tileTypeIds = Object.keys(liquidCellIds);

	const entities = tileTypeIds.reduce<EditorEntity[]>(
		(building, tileTypeId) => {
			const entities = extractLiquidEntity(newMatrix, tileTypeId);

			return building.concat(entities);
		},
		[]
	);

	return entities;
}

function convertLiquidEntities(room: SerializedRoomData): SerializedRoomData {
	const newEntities = extractLiquidCellEntities(room.stage.matrix);

	return {
		...room,
		stage: {
			...room.stage,
			entities: room.stage.entities.concat(newEntities),
			// We are purposely leaving the liquid tile ids in the matrix.
			// deserialize() will remove them for us, so to minimize code
			// we just leave the matrix alone and focus on the new entities
		},
	};
}

export function from_5_1_1_to_5_2_0(level: Versioned): Version_5_2_0 | null {
	if (is511(level)) {
		return {
			...level,
			version: '5.2.0',
			id: level.id,
			name: level.name,
			created_at: level.created_at,
			updated_at: level.updated_at ?? '',
			data: {
				...level.data,
				// @ts-ignore level settings got moved
				settings: level.data.settings ?? level.settings ?? DEFAULT_SETTINGS,
				rooms: level.data.rooms.map(convertLiquidEntities),
			},
		};
	} else {
		return null;
	}
}
