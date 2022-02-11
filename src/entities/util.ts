import { entityMap, EntityType } from './entityMap';
import { TILE_SIZE } from '../tiles/constants';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import { Entity } from './types';
import { isStaticResource } from '../resources/util';
import { ResourceType } from '../resources/resourceMap';
import { getNearestSpeed, speedToRangeAdjustment } from './platforms/common';

export function getBankParam1(bank: 0 | 1, param: number): number {
	return (bank << 6) | param;
}

export function parseParamFromBank(byte: number): number {
	return 0x3f & byte;
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
	rotationGraphicSet: number | undefined;
	koopalingId: number | undefined;
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
	let currentValidRotationGraphicSet: number | undefined = undefined;
	let currentKoopalingId: number | undefined = undefined;

	entityDefs.forEach((def) => {
		if (def.spriteGraphicSets) {
			for (let i = 0; i < currentValidSpriteGraphicSets.length; ++i) {
				if (def.spriteGraphicSets[i] !== -1) {
					const value = def.spriteGraphicSets[i];
					const asArray = Array.isArray(value) ? value : [value];

					if (isEqual(currentValidSpriteGraphicSets[i], [-1])) {
						currentValidSpriteGraphicSets[i] = [...asArray];
					} else {
						const intersectionResult = intersection(
							currentValidSpriteGraphicSets[i],
							asArray
						);

						// the intersection can end up zero if entities that used to be
						// compatible no longer are. In that case, the current entity will
						// get filtered out as now incompatible
						if (intersectionResult.length > 0) {
							currentValidSpriteGraphicSets[i] = intersectionResult;
						}
					}
				}
			}
		}

		if (def.objectSets && def.objectSets[0] !== -1) {
			if (isEqual(currentValidObjectSets, [-1])) {
				currentValidObjectSets = [...def.objectSets];
			} else {
				const intersectionResult = intersection(
					currentValidObjectSets,
					def.objectSets
				);

				// the intersection can end up zero if entities that used to be
				// compatible no longer are. In that case, the current entity will
				// get filtered out as now incompatible
				if (intersectionResult.length > 0) {
					currentValidObjectSets = intersectionResult;
				}
			}
		}

		if (typeof def.rotationGraphicSet === 'number') {
			currentValidRotationGraphicSet = def.rotationGraphicSet;
		}

		if (typeof def.koopalingId === 'number') {
			currentKoopalingId = def.koopalingId;
		}
	});

	return {
		spriteGraphicSets: currentValidSpriteGraphicSets,
		objectSets: currentValidObjectSets,
		rotationGraphicSet: currentValidRotationGraphicSet,
		koopalingId: currentKoopalingId,
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

	const rotationGraphicSetCompatible =
		entityDef.rotationGraphicSet === undefined ||
		currentObjectAndGraphicSets.rotationGraphicSet === undefined ||
		entityDef.rotationGraphicSet ===
			currentObjectAndGraphicSets.rotationGraphicSet;

	const koopalingIdCompatible =
		entityDef.koopalingId === undefined ||
		currentObjectAndGraphicSets.koopalingId === undefined ||
		entityDef.koopalingId === currentObjectAndGraphicSets.koopalingId;

	return (
		spriteGraphicSetCompatible &&
		objectSetCompatible &&
		rotationGraphicSetCompatible &&
		koopalingIdCompatible
	);
}

export function isUnfinishedEntityType(type: EntityType): boolean {
	const entityDef = entityMap[type];

	return (
		!entityDef ||
		!entityDef.paletteCategory ||
		entityDef.paletteCategory === 'unfinished'
	);
}

function getType(entity: Entity): EntityType {
	return Object.entries(entityMap).find(
		([_t, e]) => entity === e
	)![0] as EntityType;
}

export function parseSimpleSprite(
	data: Uint8Array,
	offset: number,
	bank: number,
	target: Entity
): ReturnType<Required<Entity>['parseSprite']> {
	if (data[offset++] === bank && data[offset++] === target.objectId) {
		const x = data[offset++];
		const y = data[offset++];

		return {
			entity: {
				type: getType(target),
				x: x * TILE_SIZE,
				y: y * TILE_SIZE,
			},
			offset,
		};
	}
}

export function parseSimpleSpriteObjectIdOverride(
	data: Uint8Array,
	offset: number,
	bank: number,
	objectId: number | number[],
	target: Entity
): ReturnType<Required<Entity>['parseSprite']> {
	const ids = Array.isArray(objectId) ? objectId : [objectId];

	if (data[offset++] === bank && ids.includes(data[offset++])) {
		const x = data[offset++];
		const y = data[offset++];

		return {
			entity: {
				type: getType(target),
				x: x * TILE_SIZE,
				y: y * TILE_SIZE,
			},
			offset,
		};
	}
}

export function parseSimpleSpriteWithByteParam(
	data: Uint8Array,
	offset: number,
	bank: number,
	target: Entity,
	objectIdToSetting: Record<number, string>,
	settingKey: string
) {
	const result = parseSimpleSprite(data, offset, bank, target);

	if (result) {
		result.offset += 1;

		result.entity.settings = {
			[settingKey]: objectIdToSetting[data[result.offset]],
		};

		return result;
	}
}

export function parseSimpleSpriteWithNumericByteParam(
	data: Uint8Array,
	offset: number,
	bank: number,
	target: Entity,
	settingKey: string
) {
	const result = parseSimpleSprite(data, offset, bank, target);

	if (result) {
		result.offset += 1;

		result.entity.settings = {
			[settingKey]: data[result.offset],
		};

		return result;
	}
}

export function parseObjectIdMapSprite(
	data: Uint8Array,
	offset: number,
	bank: number,
	objectIdToSetting: Record<number, unknown>,
	settingKey: string,
	target: Entity
): ReturnType<Required<Entity>['parseSprite']> {
	const settingValue = objectIdToSetting[data[offset + 1]];

	if (data[offset] === bank && settingValue !== undefined) {
		return {
			entity: {
				type: getType(target),
				x: data[offset + 2] * TILE_SIZE,
				y: data[offset + 3] * TILE_SIZE,
				settings: {
					[settingKey]: settingValue,
				},
			},
			offset: offset + 4,
		};
	}
}

export function parseObjectIdMapObject(
	data: Uint8Array,
	offset: number,
	bankByte: number,
	objectIdToSetting: Record<number, unknown>,
	settingKey: string,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	const settingValue = objectIdToSetting[data[offset + 3]];

	if (data[offset] === bankByte && settingValue !== undefined) {
		const entity = {
			type: getType(target),
			x: data[offset + 2],
			y: data[offset + 1],
			settings: {
				[settingKey]: settingValue,
			},
		};

		return {
			entities: [entity],
			offset: offset + 4,
		};
	}
}

export function parseSimpleObject(
	data: Uint8Array,
	offset: number,
	bankByte: number,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	if (data[offset] === bankByte && data[offset + 3] === target.objectId) {
		const x = data[offset + 2];
		const y = data[offset + 1];
		const multiplier = target.editorType === 'cell' ? 1 : TILE_SIZE;

		return {
			entities: [
				{
					type: getType(target),
					x: x * multiplier,
					y: y * multiplier,
				},
			],
			offset: offset + 4,
		};
	}
}

export function parsePipe(
	data: Uint8Array,
	offset: number,
	objectIdToTransportDirection: Record<number, string>,
	objectIdToNonTransportDirection: Record<number, string>,
	dimension: 'height' | 'width',
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	const objectId = data[offset + 3];
	if (
		data[offset] >= 0x40 &&
		(objectIdToTransportDirection[objectId] ||
			objectIdToNonTransportDirection[objectId])
	) {
		const dimensionValue = parseParamFromBank(data[offset]) + 1;
		const y = data[offset + 1] * TILE_SIZE;
		const x = data[offset + 2] * TILE_SIZE;

		return {
			entities: [
				{
					type: getType(target),
					x,
					y,
					settings: {
						[dimension]: dimensionValue,
						direction:
							objectIdToTransportDirection[objectId] ??
							objectIdToNonTransportDirection[objectId],
					},
				},
			],
			offset: offset + 4,
		};
	}
}

export function parseSimpleObjectWithWidth(
	data: Uint8Array,
	offset: number,
	bankByte: number,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	const result = parseSimpleObject(data, offset, bankByte, target);

	if (result) {
		const seedEntity = result.entities[0];

		const width = data[offset + 4];

		const entities = [];
		for (let x = seedEntity.x; x <= seedEntity.x + width; ++x) {
			entities.push({
				...seedEntity,
				x,
			});
		}

		return {
			entities,
			offset: offset + 5,
		};
	}
}

export function parseParam1WidthEntityObject(
	data: Uint8Array,
	offset: number,
	target: Entity,
	widthPropName = 'width'
): ReturnType<Required<Entity>['parseObject']> {
	const ids = [target.objectId].concat(target.alternateObjectIds ?? []);

	if (data[offset] >= 0x40 && ids.includes(data[offset + 3])) {
		const width = parseParamFromBank(data[offset]);
		const y = data[offset + 1];
		const x = data[offset + 2];

		return {
			entities: [
				{
					type: getType(target),
					x: x * TILE_SIZE,
					y: y * TILE_SIZE,
					settings: {
						[widthPropName]: width + 1,
					},
				},
			],
			offset: offset + 4,
		};
	}
}

export function parseParam1HeightEntityObject(
	data: Uint8Array,
	offset: number,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	return parseParam1WidthEntityObject(data, offset, target, 'height');
}

export function parseParam1WidthParam2HeightEntityObject(
	data: Uint8Array,
	offset: number,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	const ids = [target.objectId].concat(target.alternateObjectIds ?? []);

	if (data[offset] >= 0x40 && ids.includes(data[offset + 3])) {
		const width = parseParamFromBank(data[offset]);
		const y = data[offset + 1];
		const x = data[offset + 2];
		const height = data[offset + 4];

		return {
			entities: [
				{
					type: getType(target),
					x: x * TILE_SIZE,
					y: y * TILE_SIZE,
					settings: {
						width: width + 1,
						height: height + 1,
					},
				},
			],
			offset: offset + 5,
		};
	}
}

export function parseParam1HeightParam2WidthEntityObject(
	data: Uint8Array,
	offset: number,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	if (data[offset] >= 0x40 && data[offset + 3] === target.objectId) {
		const height = parseParamFromBank(data[offset]) + 1;
		const y = data[offset + 1];
		const x = data[offset + 2];
		const width = data[offset + 4] + 1;

		return {
			entities: [
				{
					type: getType(target),
					x: x * TILE_SIZE,
					y: y * TILE_SIZE,
					settings: {
						width,
						height,
					},
				},
			],
			offset: offset + 5,
		};
	}
}

export function parseKoopalingSprite(
	data: Uint8Array,
	offset: number,
	target: Entity
): ReturnType<Required<Entity>['parseSprite']> {
	if (data[offset] === 1 && data[offset + 1] === target.objectId) {
		const koopalingId = (data[offset + 4] >> 4) & 0xf;

		if (koopalingId === target.koopalingId) {
			const x = data[offset + 2];
			const y = data[offset + 3];

			const fireballCount = data[offset + 5];
			const stompCount = data[offset + 4] & 0xf;
			return {
				entity: {
					type: getType(target),
					x: x * TILE_SIZE,
					y: y * TILE_SIZE,
					settings: {
						fireballCount,
						stompCount,
					},
				},
				offset: offset + 6,
			};
		}
	}
}

export function parseCellObjectsParam1WidthParam2Height(
	data: Uint8Array,
	offset: number,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	if (data[offset] >= 0x40 && data[offset + 3] === target.objectId) {
		const width = parseParamFromBank(data[offset++]);
		const y = data[offset++];
		const x = data[offset++];
		offset += 1; // move past objectId
		const height = data[offset++];

		const entities = [];
		const type = getType(target);

		for (let h = 0; h <= height; ++h) {
			for (let w = 0; w <= width; ++w) {
				entities.push({
					type,
					x: x + w,
					y: y + h,
				});
			}
		}

		return { entities, offset };
	}
}

export function parseDoubleCellObjectsParam1WidthParam2Height(
	data: Uint8Array,
	offset: number,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	if (data[offset] >= 0x40 && data[offset + 3] === target.objectId) {
		const width = parseParamFromBank(data[offset++]);
		const y = data[offset++];
		const x = data[offset++];
		offset += 1; // move past objectId
		const height = data[offset++];

		const entities = [];
		const type = getType(target);

		for (let h = 0; h <= height; ++h) {
			for (let w = 0; w <= width; ++w) {
				entities.push({
					type,
					x: (x + w * 2) * TILE_SIZE,
					y: (y + h * 2) * TILE_SIZE,
				});
			}
		}

		return { entities, offset };
	}
}

export function parsePayloadObject(
	data: Uint8Array,
	offset: number,
	bankByte: number,
	objectIdToPayload: Record<number, ResourceType | EntityType>,
	target: Entity
) {
	const objectId = data[offset + 3];

	if (
		data[offset] === bankByte &&
		Object.keys(objectIdToPayload).includes(objectId.toString())
	) {
		const y = data[offset + 1];
		const x = data[offset + 2];
		const multiplier = target.editorType === 'cell' ? 1 : TILE_SIZE;

		return {
			entities: [
				{
					type: getType(target),
					x: x * multiplier,
					y: y * multiplier,
					settings: {
						payload: objectIdToPayload[objectId],
					},
				},
			],
			offset: offset + 4,
		};
	}
}

export function parsePayloadCellObjectParam1Width(
	data: Uint8Array,
	offset: number,
	objectIdToPayload: Record<number, ResourceType | EntityType>,
	target: Entity
) {
	const objectId = data[offset + 3];

	if (
		data[offset] >= 0x40 &&
		Object.keys(objectIdToPayload).includes(objectId.toString())
	) {
		const y = data[offset + 1];
		const x = data[offset + 2];
		const width = parseParamFromBank(data[offset]);

		const entities = [];
		const type = getType(target);
		const payload = objectIdToPayload[objectId];

		for (let w = 0; w <= width; ++w) {
			entities.push({
				type,
				x: x + w,
				y,
				settings: {
					payload,
				},
			});
		}
		return {
			entities,
			offset: offset + 4,
		};
	}
}

export function parseCellObjectsParam1HeightParam2Width(
	data: Uint8Array,
	offset: number,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	if (data[offset] >= 0x40 && data[offset + 3] === target.objectId) {
		const height = parseParamFromBank(data[offset++]);
		const y = data[offset++];
		const x = data[offset++];
		offset += 1; // move past objectId
		const width = data[offset++];

		const entities = [];
		const type = getType(target);

		for (let h = 0; h <= height; ++h) {
			for (let w = 0; w <= width; ++w) {
				entities.push({
					type,
					x: x + w,
					y: y + h,
				});
			}
		}

		return { entities, offset };
	}
}

export function parseCellObjectsParam1Width(
	data: Uint8Array,
	offset: number,
	target: Entity,
	ids: number[] = [target.objectId]
): ReturnType<Required<Entity>['parseObject']> {
	if (data[offset] >= 0x40 && ids.includes(data[offset + 3])) {
		const width = parseParamFromBank(data[offset]);
		const y = data[offset + 1];
		const x = data[offset + 2];

		const entities = [];
		const type = getType(target);

		for (let w = 0; w < width + 1; ++w) {
			entities.push({
				type,
				x: x + w,
				y,
			});
		}

		return { entities, offset: offset + 4 };
	}
}

export function parseDoubleCellObjectsParam1Width(
	data: Uint8Array,
	offset: number,
	target: Entity,
	ids: number[] = [target.objectId]
): ReturnType<Required<Entity>['parseObject']> {
	if (data[offset] >= 0x40 && ids.includes(data[offset + 3])) {
		const width = parseParamFromBank(data[offset]);
		const y = data[offset + 1];
		const x = data[offset + 2];

		const entities = [];
		const type = getType(target);

		for (let w = 0; w < width + 1; ++w) {
			entities.push({
				type,
				x: (x + w * 2) * TILE_SIZE,
				y: y * TILE_SIZE,
			});
		}

		return { entities, offset: offset + 4 };
	}
}

export function parseCellObjectsParam1Height(
	data: Uint8Array,
	offset: number,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	if (data[offset] >= 0x40 && data[offset + 3] === target.objectId) {
		const height = parseParamFromBank(data[offset++]);
		const y = data[offset++];
		const x = data[offset++];

		const entities = [];
		const type = getType(target);

		for (let h = 0; h <= height; ++h) {
			entities.push({
				type,
				x,
				y: y + h,
			});
		}

		// move off of the id onto the next object
		offset++;

		return { entities, offset };
	}
}

export function parsePotentialPayloadObject(
	data: Uint8Array,
	offset: number,
	bankByte: number,
	objectIdToPayload: Record<number, ResourceType>,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	const objectId = data[offset + 3];

	// no payload? it's a rectangle of objects
	if (data[offset] >= 0x40 && objectId === target.objectId) {
		return parseCellObjectsParam1WidthParam2Height(data, offset, target);
	} else {
		return parsePayloadObject(
			data,
			offset,
			bankByte,
			objectIdToPayload,
			target
		);
	}
}

export function parsePlatformSprite(
	data: Uint8Array,
	offset: number,
	target: Entity
): ReturnType<Required<Entity>['parseSprite']> {
	if (data[offset] === 1 && data[offset + 1] === target.objectId) {
		const x = data[offset + 2] * TILE_SIZE;
		const y = data[offset + 3] * TILE_SIZE;

		const rawSpeed = data[offset + 4];
		const width = rawSpeed >= 0x80 ? 4 : 3;
		const speedValue = rawSpeed >= 0x80 ? rawSpeed - 0x80 : rawSpeed;
		const speed = getNearestSpeed(speedValue);

		const rawRange = data[offset + 5];
		const range = rawRange / speedToRangeAdjustment[speed];

		return {
			entity: {
				type: 'PlatformUpDown',
				x,
				y,
				settings: {
					range,
					width,
					speed,
				},
			},
			offset: offset + 6,
		};
	}
}

export function parseCheckeredTerrainCellObjectParamHeight(
	data: Uint8Array,
	offset: number,
	bankByte: number,
	target: Entity
) {
	if (data[offset] === bankByte && data[offset + 3] === target.objectId) {
		const y = data[offset + 1];
		const x = data[offset + 2];
		const height = data[offset + 4];

		const cells = [];
		for (let i = 0; i < height; ++i) {
			cells.push({
				type: getType(target),
				x,
				y: y + i,
			} as const);
		}

		return {
			entities: cells,
			offset: offset + 5,
		};
	}
}

export function parseCheckeredTerrainCellObjectParamWidth(
	data: Uint8Array,
	offset: number,
	bankByte: number,
	target: Entity
) {
	if (data[offset] === bankByte && data[offset + 3] === target.objectId) {
		const y = data[offset + 1];
		const x = data[offset + 2];
		const width = data[offset + 4];

		const cells = [];
		for (let i = 0; i < width; ++i) {
			cells.push({
				type: getType(target),
				x: x + i,
				y,
			} as const);
		}

		return {
			entities: cells,
			offset: offset + 5,
		};
	}
}

export function parseCheckeredTerrainCellObjectParam1WidthParam2Height(
	data: Uint8Array,
	offset: number,
	bankByte: number,
	target: Entity
) {
	if (data[offset] === bankByte && data[offset + 3] === target.objectId) {
		const y = data[offset + 1];
		const x = data[offset + 2];
		const width = data[offset + 4];
		const height = data[offset + 5];

		// so annoying, width is not "minus one", but height is
		// https://github.com/city41/smaghetti/wiki/Checkered-terrain#param-0-interior-pattern
		const cells = [];
		for (let h = 0; h < height + 1; ++h) {
			for (let w = 0; w < width; ++w) {
				cells.push({
					type: getType(target),
					x: x + w,
					y: y + h,
				} as const);
			}
		}

		return {
			entities: cells,
			offset: offset + 6,
		};
	}
}

export function parseSimpleCheckeredTerrainObject(
	data: Uint8Array,
	offset: number,
	bankByte: number,
	target: Entity
): ReturnType<Required<Entity>['parseObject']> {
	const result = parseSimpleObject(data, offset, bankByte, target);

	if (result && data[result.offset] === 1) {
		return {
			...result,
			offset: result.offset + 1,
		};
	}
}

export function parsePixelPositionedSprite(
	data: Uint8Array,
	offset: number,
	spriteId: number,
	target: Entity
): ReturnType<Required<Entity>['parseSprite']> {
	if (
		data[offset] === 1 &&
		data[offset + 1] === 0x1d &&
		data[offset + 4] === spriteId
	) {
		const x = data[offset + 2];
		const y = data[offset + 3];
		let pixelOffset = data[offset + 5];

		if (pixelOffset > 127) {
			pixelOffset = pixelOffset - 255;
		}

		const type = getType(target);

		return {
			entity: {
				type,
				x: x * TILE_SIZE,
				y: y * TILE_SIZE,
				settings: {
					pixelOffset,
					width: 1,
				},
			},
			offset: offset + 6,
		};
	}
}

export function invertNumeric(
	obj: Record<number, number>
): Record<number, number> {
	return Object.entries(obj).reduce<Record<number, number>>(
		(building, entry) => {
			building[entry[1]] = Number(entry[0]);

			return building;
		},
		{}
	);
}

/**
 * used by ColorfulMetalBoxWithShadow, GrassPlateauTopiary, and StonePlateau
 * These types need to sit on top of a floor in order to not be corrupt
 */
export function getSupportingFloor(
	entity: EditorEntity | undefined,
	room: RoomData | undefined,
	floorType: EntityType
): EditorEntity | null {
	if (!entity || !room) {
		return null;
	}

	const ety = entity.y / TILE_SIZE;
	const etx = entity.x / TILE_SIZE;

	const entityWidth = entity.settings!.width as number;

	const floorThatMatches = room.stage.entities.find((f) => {
		if (f.type !== floorType) {
			return false;
		}

		const fty = f.y / TILE_SIZE;

		if (fty <= ety) {
			return false;
		}

		const floorWidth = (f.settings?.width ?? 2) as number;
		const ftx = f.x / TILE_SIZE;

		if (ftx <= etx && ftx + floorWidth > etx + entityWidth) {
			return true;
		}
	});

	return floorThatMatches ?? null;
}

export function getHeightForEntityWithASupportingFloor(
	entity: EditorEntity | undefined,
	room: RoomData | undefined,
	floorType: EntityType
): number {
	if (!entity || !room) {
		return 2;
	}

	const ety = entity.y / TILE_SIZE;

	const floorThatMatches = getSupportingFloor(entity, room, floorType);

	if (!floorThatMatches) {
		return room.roomTileHeight - ety;
	}

	const wfty = floorThatMatches.y / TILE_SIZE;
	return wfty - ety;
}
