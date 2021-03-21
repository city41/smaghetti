import {
	TileType,
	ToppedType,
	TopperType,
	HasXEndCapType,
	HasYEndCapType,
	TILE_TYPE_TO_GROUP_TYPE_MAP,
	TILE_TOPPED_TO_TOPPER_MAP,
	TILE_TOPPER_TO_TOPPED_MAP,
	TILE_TYPE_TO_FIRST_TILE_INDEX_MAP,
	TILE_TYPE_COUNT,
	TILE_TYPE_TO_X_ENDCAPS_MAP,
	TILE_TYPE_TO_Y_ENDCAPS_MAP,
	TILE_TYPE_TO_TILE_ENTITY_TYPE,
	TileHasEntityType,
	TileGroupType,
} from '../tiles/constants';
import { groupingTileMap } from './groupingTileMap';
import { topperTileMap } from './topperTileMap';

function getSolidity(
	y: number,
	x: number,
	tileTypes: (TileType | undefined)[],
	tiles: TileMatrix,
	width: number,
	height: number
) {
	if (x < 0 || y < 0 || y >= height || x >= width) {
		return 1;
	}

	return tileTypes.indexOf(tiles[y]?.[x]?.tileType) > -1 ? 1 : 0;
}

function buildKey(
	tiles: TileMatrix,
	groupType: TileGroupType,
	tileTypes: (TileType | undefined)[],
	x: number,
	y: number,
	width: number,
	height: number
): string {
	// TODO y type

	if (groupType === 'xy' || groupType === 'xytopper') {
		const upperLeft = getSolidity(
			y - 1,
			x - 1,
			tileTypes,
			tiles,
			width,
			height
		);
		const upper = getSolidity(y - 1, x, tileTypes, tiles, width, height);
		const upperRight = getSolidity(
			y - 1,
			x + 1,
			tileTypes,
			tiles,
			width,
			height
		);
		const left = getSolidity(y, x - 1, tileTypes, tiles, width, height);
		const right = getSolidity(y, x + 1, tileTypes, tiles, width, height);
		const lowerLeft = getSolidity(
			y + 1,
			x - 1,
			tileTypes,
			tiles,
			width,
			height
		);
		const lower = getSolidity(y + 1, x, tileTypes, tiles, width, height);
		const lowerRight = getSolidity(
			y + 1,
			x + 1,
			tileTypes,
			tiles,
			width,
			height
		);

		return `${upperLeft}${upper}${upperRight}${left}1${right}${lowerLeft}${lower}${lowerRight}`;
	} else if (groupType === 'x') {
		const left = getSolidity(y, x - 1, tileTypes, tiles, width, height);
		const right = getSolidity(y, x + 1, tileTypes, tiles, width, height);
		return `${left}${right}`;
	} else {
		// 'y' groupType
		const above = getSolidity(y - 1, x, tileTypes, tiles, width, height);
		const below = getSolidity(y + 1, x, tileTypes, tiles, width, height);
		return `${above}${below}`;
	}
}

function determineTopperTileIndex(
	tile: Tile,
	tiles: TileMatrix,
	topsType: TileType
): number {
	const tileToLeft = tiles[tile.y]?.[tile.x - 1];
	const tileToDownLeftTileParentId = tiles[tile.y + 1]?.[tile.x - 1]?.tileType;
	const tileBelowTileParentId = tiles[tile.y + 1]?.[tile.x]?.tileType;
	const tileToRight = tiles[tile.y]?.[tile.x + 1];
	const tileToDownRightTileParentId = tiles[tile.y + 1]?.[tile.x + 1]?.tileType;

	const tileLeftType =
		tileToLeft?.tileType === tile.tileType
			? '1'
			: tileToLeft?.tileType === topsType
			? '2'
			: '0';

	const tileDownLeftType =
		tileToDownLeftTileParentId === topsType ||
		tileToDownLeftTileParentId === tile.tileType
			? '2'
			: '0';

	const tileBelowType =
		tileBelowTileParentId === topsType ||
		tileBelowTileParentId === tile.tileType
			? '2'
			: '0';

	const tileDownRightType =
		tileToDownRightTileParentId === topsType ||
		tileToDownRightTileParentId === tile.tileType
			? '2'
			: '0';

	const tileRightType =
		tileToRight?.tileType === tile.tileType
			? '1'
			: tileToRight?.tileType === topsType
			? '2'
			: '0';

	const key = `${tileLeftType}${tileDownLeftType}${tileBelowType}${tileDownRightType}${tileRightType}`;

	return topperTileMap[key];
}

function determineYTileIndex(
	tile: Tile,
	tiles: TileMatrix,
	levelTileHeight: number,
	endCapType: 'start' | 'end' | 'both' | 'none'
): number | null {
	if (endCapType === 'none') {
		return null;
	}

	const tileAbove = tiles[tile.y - 1]?.[tile.x];
	const tileBelow = tiles[tile.y + 1]?.[tile.x];

	// only one tile tall, and above and below is something else
	if (
		tileAbove &&
		tileAbove.tileType !== tile.tileType &&
		tileBelow &&
		tileBelow.tileType !== tile.tileType
	) {
		return 8;
	}

	// top edge of level, and to the bottom is something else
	// start and end cap piece
	if (tile.y === 0 && tileBelow && tileBelow.tileType !== tile.tileType) {
		return 8;
	}

	// bottom edge of level, and above  is something else
	// start and end cap piece
	if (
		tile.y === levelTileHeight - 1 &&
		tileAbove &&
		tileAbove.tileType !== tile.tileType
	) {
		return 8;
	}

	// no tile above or below, but there could be (ie, not on edge of level)
	if (!tileAbove && tile.y > 0 && !tileBelow && tile.y < levelTileHeight - 1) {
		return 0;
	}

	// internal piece
	if (
		tileAbove?.tileType === tile.tileType &&
		tileBelow?.tileType === tile.tileType
	) {
		return 2;
	}

	// stubbed start endcap
	if (
		(endCapType === 'start' || endCapType === 'both') &&
		(tile.y === 0 || (tileAbove && tileAbove.tileType !== tile.tileType)) &&
		tile.y < levelTileHeight - 1 &&
		(!tileBelow || tileBelow.tileType !== tile.tileType)
	) {
		return 5;
	}

	// start endcap
	if (
		(endCapType === 'start' || endCapType === 'both') &&
		(tile.y === 0 || (tileAbove && tileAbove.tileType !== tile.tileType))
	) {
		return 4;
	}

	// stupped endcap
	if (
		(endCapType === 'end' || endCapType === 'both') &&
		(tile.y === levelTileHeight - 1 ||
			(tileBelow && tileBelow.tileType !== tile.tileType)) &&
		tile.y > 0 &&
		(!tileAbove || tileAbove.tileType !== tile.tileType)
	) {
		return 7;
	}

	// end endcap
	if (
		(endCapType === 'end' || endCapType === 'both') &&
		(tile.y === levelTileHeight - 1 ||
			(tileBelow && tileBelow.tileType !== tile.tileType))
	) {
		return 6;
	}

	if (tileBelow && tileBelow.tileType === tile.tileType) {
		return 1;
	}

	if (tileAbove && tileAbove.tileType === tile.tileType) {
		return 3;
	}

	return null;
}

function determineXTileIndex(
	tile: Tile,
	tiles: TileMatrix,
	levelTileWidth: number,
	endCapType: 'start' | 'end' | 'both' | 'none'
): number | null {
	if (endCapType === 'none') {
		return null;
	}

	const tileLeft = tiles[tile.y]?.[tile.x - 1];
	const tileRight = tiles[tile.y]?.[tile.x + 1];

	// only one tile wide, and left and right are something else
	// start and end cap piece
	if (
		tileLeft &&
		tileLeft.tileType !== tile.tileType &&
		tileRight &&
		tileRight.tileType !== tile.tileType
	) {
		return 8;
	}

	// left edge of level, and to the right is something else
	// start and end cap piece
	if (tile.x === 0 && tileRight && tileRight.tileType !== tile.tileType) {
		return 8;
	}

	// right edge of level, and to the left is something else
	// start and end cap piece
	if (
		tile.x === levelTileWidth - 1 &&
		tileLeft &&
		tileLeft.tileType !== tile.tileType
	) {
		return 8;
	}

	// no tile left or right, but there could be (ie, not on edge of level)
	if (!tileLeft && tile.x > 0 && !tileRight && tile.x < levelTileWidth - 1) {
		return 0;
	}

	// internal piece
	if (
		tileLeft?.tileType === tile.tileType &&
		tileRight?.tileType === tile.tileType
	) {
		return 2;
	}

	// stubbed start endcap
	if (
		(endCapType === 'start' || endCapType === 'both') &&
		(tile.x === 0 || (tileLeft && tileLeft.tileType !== tile.tileType)) &&
		tile.x < levelTileWidth - 1 &&
		(!tileRight || tileRight.tileType !== tile.tileType)
	) {
		return 5;
	}

	// start endcap
	if (
		(endCapType === 'start' || endCapType === 'both') &&
		(tile.x === 0 || (tileLeft && tileLeft.tileType !== tile.tileType))
	) {
		return 4;
	}

	// stubbed endcap
	if (
		(endCapType === 'end' || endCapType === 'both') &&
		(tile.x === levelTileWidth - 1 ||
			(tileRight && tileRight.tileType !== tile.tileType)) &&
		tile.x > 0 &&
		(!tileLeft || tileLeft.tileType !== tile.tileType)
	) {
		return 7;
	}

	// end endcap
	if (
		(endCapType === 'end' || endCapType === 'both') &&
		(tile.x === levelTileWidth - 1 ||
			(tileRight && tileRight.tileType !== tile.tileType))
	) {
		return 6;
	}

	if (tileRight && tileRight.tileType === tile.tileType) {
		return 1;
	}

	if (tileLeft && tileLeft.tileType === tile.tileType) {
		return 3;
	}

	return null;
}

function regroupTileEntities(tiles: TileMatrix, toGroup: Tile, id: number) {
	const groupType = TILE_TYPE_TO_GROUP_TYPE_MAP[toGroup.tileType];

	if (groupType === 'x') {
		const y = toGroup.y;
		let startX = toGroup.x;

		while (tiles[y]?.[startX - 1]?.tileType === toGroup.tileType) {
			startX -= 1;
		}

		let endX = toGroup.x;

		while (tiles[y]?.[endX + 1]?.tileType === toGroup.tileType) {
			endX += 1;
		}

		for (let t = startX; t <= endX; ++t) {
			const tile = tiles[y]![t]!;

			tile.settings = t === startX ? tile.settings ?? {} : undefined;
		}
	} else if (groupType === 'y') {
		const x = toGroup.x;
		let startY = toGroup.y;

		while (tiles[startY - 1]?.[x]?.tileType === toGroup.tileType) {
			startY -= 1;
		}

		let endY = toGroup.y;

		while (tiles[endY + 1]?.[x]?.tileType === toGroup.tileType) {
			endY += 1;
		}

		for (let t = startY; t <= endY; ++t) {
			const tile = tiles[t]![x]!;

			tile.settings = t === startY ? tile.settings ?? {} : undefined;
		}
	}
}

function groupTiles(
	tiles: TileMatrix,
	upperLeft: Point,
	width: number,
	height: number,
	levelTileWidth: number,
	levelTileHeight: number,
	entityIdCallback: () => number
): TileMatrix {
	const tileEntitiesToRegroup: Tile[] = [];

	for (let y = upperLeft.y; y < upperLeft.y + height; ++y) {
		if (!tiles[y]) {
			continue;
		}

		for (let x = upperLeft.x; x < upperLeft.x + width; ++x) {
			if (
				!tiles[y]![x] ||
				!TILE_TYPE_TO_GROUP_TYPE_MAP[tiles[y]![x]!.tileType] ||
				TILE_TYPE_TO_GROUP_TYPE_MAP[tiles[y]![x]!.tileType] === 'none'
			) {
				continue;
			}
			const tile = tiles[y]![x];

			if (!tile) {
				continue;
			}

			const groupType = TILE_TYPE_TO_GROUP_TYPE_MAP[tile.tileType];

			const toppedType = TILE_TOPPED_TO_TOPPER_MAP[tile.tileType as ToppedType];

			const tileTypes = (typeof toppedType === 'string'
				? [tile.tileType, toppedType]
				: [tile.tileType]) as TileType[];

			const key = buildKey(
				tiles,
				groupType,
				tileTypes,
				x,
				y,
				levelTileWidth,
				levelTileHeight
			);

			const newTileIndex =
				groupingTileMap[groupType][key] * TILE_TYPE_COUNT +
				TILE_TYPE_TO_FIRST_TILE_INDEX_MAP[tile.tileType];

			if (newTileIndex) {
				// TODO: this should probably just be tile entities that have editor time settings
				// (ie conveyor not ladder)
				if (TILE_TYPE_TO_TILE_ENTITY_TYPE[tile.tileType as TileHasEntityType]) {
					tileEntitiesToRegroup.push(tile);
				}

				if (TILE_TYPE_TO_GROUP_TYPE_MAP[tile.tileType] === 'xytopper') {
					tile.tileIndex =
						determineTopperTileIndex(
							tile,
							tiles,
							TILE_TOPPER_TO_TOPPED_MAP[tile.tileType as TopperType]
						) *
							TILE_TYPE_COUNT +
						TILE_TYPE_TO_FIRST_TILE_INDEX_MAP[tile.tileType];
				} else if (
					TILE_TYPE_TO_GROUP_TYPE_MAP[tile.tileType] === 'y' &&
					TILE_TYPE_TO_Y_ENDCAPS_MAP[tile.tileType as HasYEndCapType] !== 'none'
				) {
					const determinedTileIndex = determineYTileIndex(
						tile,
						tiles,
						levelTileHeight,
						TILE_TYPE_TO_Y_ENDCAPS_MAP[tile.tileType as HasYEndCapType]
					);

					if (determinedTileIndex !== null) {
						tile.tileIndex =
							determinedTileIndex * TILE_TYPE_COUNT +
							TILE_TYPE_TO_FIRST_TILE_INDEX_MAP[tile.tileType];
					}
				} else if (
					TILE_TYPE_TO_GROUP_TYPE_MAP[tile.tileType] === 'x' &&
					TILE_TYPE_TO_X_ENDCAPS_MAP[tile.tileType as HasXEndCapType] !== 'none'
				) {
					const determinedTileIndex = determineXTileIndex(
						tile,
						tiles,
						levelTileWidth,
						TILE_TYPE_TO_X_ENDCAPS_MAP[tile.tileType as HasXEndCapType]
					);

					if (determinedTileIndex !== null) {
						tile.tileIndex =
							determinedTileIndex * TILE_TYPE_COUNT +
							TILE_TYPE_TO_FIRST_TILE_INDEX_MAP[tile.tileType];
					}
				} else {
					tile.tileIndex = newTileIndex;
				}
			}
		}
	}

	tileEntitiesToRegroup.forEach((te) =>
		regroupTileEntities(tiles, te, entityIdCallback())
	);

	return tiles;
}

export { groupTiles };
