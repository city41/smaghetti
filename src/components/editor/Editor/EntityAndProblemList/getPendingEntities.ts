import { entityMap } from '../../../../entities/entityMap';
import {
	getPendingObjects,
	PendingObject,
} from '../../../../levelData/createLevelData';
import { TILE_SIZE } from '../../../../tiles/constants';

export function getPendingEntities(
	layer: RoomLayer,
	data: RoomData
): PendingObject[] {
	const pendingObjects = getPendingObjects(layer, data);
	const sprites = layer.entities.filter(
		(e) =>
			!!entityMap[e.type].toSpriteBinary &&
			!pendingObjects.some((pe) => pe.entity.id === e.id)
	);

	const pendingSprites = sprites.map((s) => {
		return {
			x: s.x / TILE_SIZE,
			y: s.y / TILE_SIZE,
			w: 1,
			h: 1,
			entity: s,
		};
	});

	return pendingSprites.concat(pendingObjects);
}
