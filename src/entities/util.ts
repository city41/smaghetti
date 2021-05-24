import { entityMap, EntityType } from './entityMap';
import { TILE_SIZE } from '../tiles/constants';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import { Entity } from './types';
import { isStaticResource } from '../resources/util';

export function getBankParam1(bank: 0 | 1, length: number): number {
	return (bank << 6) | length;
}

function getEntityTileWidth(entityDef: Entity): number {
	if (entityDef.width) {
		return entityDef.width;
	}

	if (isStaticResource(entityDef.resource)) {
		return entityDef.resource.tiles[0].length / 2;
	}

	return 1;
}

function getEntityTileHeight(entityDef: Entity): number {
	if (entityDef.height) {
		return entityDef.height;
	}

	if (isStaticResource(entityDef.resource)) {
		return entityDef.resource.tiles.length / 2;
	}

	return 1;
}

export function scaledEntityRender(entityType: EntityType, scale = 1) {
	const entityDef = entityMap[entityType];
	const widthInTiles = getEntityTileWidth(entityDef);
	const heightInTiles = getEntityTileHeight(entityDef);
	const entityWidth = widthInTiles * TILE_SIZE * scale;
	const entityHeight = heightInTiles * TILE_SIZE * scale;
	const size = Math.max(entityWidth, entityHeight);

	return entityDef.simpleRender(size);
}

export function encodeObjectSets(sets: number[][]): number[] {
	return sets.map((s) => {
		return (s[0] << 16) | s[1];
	});
}

export function decodeObjectSet(set: number): [number, number] {
	const objectSet = set >> 16;
	const objectGraphicSet = set & 0xffff;

	return [objectSet, objectGraphicSet];
}

export type ObjectAndGraphicSets = {
	spriteGraphicSets: number[][];
	objectSets: number[];
};

export function determineValidGraphicAndObjectSetValues(
	entityDefs: Entity[]
): ObjectAndGraphicSets {
	const currentValidSpriteGraphicSets: Array<number[]> = [
		[-1],
		[-1],
		[-1],
		[-1],
		[-1],
		[-1],
	];

	let currentValidObjectSets = [-1];

	entityDefs.forEach((def) => {
		if (def.spriteGraphicSets) {
			for (let i = 0; i < currentValidSpriteGraphicSets.length; ++i) {
				if (def.spriteGraphicSets[i] !== -1) {
					const value = def.spriteGraphicSets[i];
					const asArray = Array.isArray(value) ? value : [value];

					if (isEqual(currentValidSpriteGraphicSets[i], [-1])) {
						currentValidSpriteGraphicSets[i] = [...asArray];
					} else {
						currentValidSpriteGraphicSets[i] = intersection(
							currentValidSpriteGraphicSets[i],
							asArray
						);
					}
				}
			}
		}

		if (def.objectSets) {
			if (isEqual(currentValidObjectSets, [-1])) {
				currentValidObjectSets = [...def.objectSets];
			} else {
				currentValidObjectSets = intersection(
					currentValidObjectSets,
					def.objectSets
				);
			}
		}
	});

	return {
		spriteGraphicSets: currentValidSpriteGraphicSets,
		objectSets: currentValidObjectSets,
	};
}

export function isGraphicAndObjectSetCompatible(
	entityDef: Entity,
	currentObjectAndGraphicSets: ObjectAndGraphicSets
) {
	const spriteGraphicSetCompatible = entityDef.spriteGraphicSets.every(
		(v, i) => {
			if (isEqual(currentObjectAndGraphicSets.spriteGraphicSets[i], [-1])) {
				return true;
			}

			if (
				v === -1 ||
				isEqual(currentObjectAndGraphicSets.spriteGraphicSets[i], [-1])
			) {
				return true;
			}

			const asArray = Array.isArray(v) ? v : [v];

			return (
				intersection(asArray, currentObjectAndGraphicSets.spriteGraphicSets[i])
					.length > 0
			);
		}
	);

	const objectSetCompatible =
		isEqual(currentObjectAndGraphicSets.objectSets, [-1]) ||
		isEqual(entityDef.objectSets, [-1]) ||
		intersection(entityDef.objectSets, currentObjectAndGraphicSets.objectSets)
			.length > 0;

	return spriteGraphicSetCompatible && objectSetCompatible;
}

export function isWorkingEntityType(type: EntityType): boolean {
	// in dev mode, everything is "working"
	if (process.env.NODE_ENV !== 'production') {
		return true;
	}

	const entityDef = entityMap[type];
	return !!(
		entityDef &&
		entityDef.paletteCategory &&
		entityDef.paletteCategory !== 'unfinished'
	);
}
