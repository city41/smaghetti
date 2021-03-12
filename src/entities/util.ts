import { entityMap, EntityType } from './entityMap_generated';
import { TILE_SIZE } from '../tiles/constants';

export function getEntityOffset(type: EntityType): { x: number; y: number } {
  const size = entityMap[type];

  const remainderX = size.width % TILE_SIZE;
  const remainderY = size.height % TILE_SIZE;

  const offset = {
    x: remainderX === 0 ? 0 : (TILE_SIZE - remainderX) / 2,
    y: remainderY === 0 ? 0 : (TILE_SIZE - remainderY) / 2,
  };

  return offset;
}
