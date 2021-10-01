import { entityMap } from '../../entities/entityMap';
import { TILE_SIZE } from '../../tiles/constants';

export function getEntityTileBounds(entity: NewEditorEntity): Bounds {
	const entityDef = entityMap[entity.type];
	const tileWidth = entity.settings?.width ?? entityDef.width ?? 1;
	const tileHeight = entity.settings?.height ?? entityDef.height ?? 1;

	const tileDivisor = entityDef.editorType === 'cell' ? 1 : TILE_SIZE;

	const minX = Math.floor(entity.x / tileDivisor);
	const minY = Math.floor(entity.y / tileDivisor);

	const maxX = minX + tileWidth - 1;
	const maxY = minY + tileHeight - 1;

	return {
		upperLeft: { x: minX, y: minY },
		lowerRight: { x: maxX, y: maxY },
	};
}

export function pointIsInside(a: Point, b: Bounds) {
	if (a.x < b.upperLeft.x) {
		return false;
	}

	// a is completely to the right of b
	if (a.x > b.lowerRight.x) {
		return false;
	}

	// a is completely above b
	if (a.y < b.upperLeft.y) {
		return false;
	}

	// a is completely below b
	if (a.y > b.lowerRight.y) {
		return false;
	}

	return true;
}
