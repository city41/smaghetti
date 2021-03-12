import {
  TILE_TYPE_COUNT,
  FIRST_TILE_INDEX_TO_TILE_TYPE_MAP,
  TILE_TYPE_TO_INTERACTION_MAP,
  Interaction,
  TileInteractionType,
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

function getTileInteraction(
  tileIndex: number | null | undefined
): Interaction | undefined {
  if (!tileIndex) {
    return undefined;
  }
  const tileType = getTileType(tileIndex);
  return TILE_TYPE_TO_INTERACTION_MAP[tileType as TileInteractionType];
}

export { getTileType, getTileInteraction };
