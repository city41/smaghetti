import React from 'react';
import { TILE_SIZE } from '../../../../tiles/constants';
import { LevelTreeObject } from '../../types';
import { ObjectIcon } from '../entityIcons';
import { getEntityDefFromId, getEntityDefFromPayloadId } from '../util';
import { Entity } from '../../../../entities/types';
import { EntityType } from '../../../../entities/entityMap';

type LevelObjectProps = {
	object: LevelTreeObject;
	scale: number;
};

function determineHeight(
	obj: LevelTreeObject,
	entityDef: Entity | null
): number {
	if (entityDef?.param1 === 'height') {
		return obj.param1;
	}

	if (entityDef?.param2 === 'height') {
		return obj.param2;
	}

	return 1;
}

function determineWidth(
	obj: LevelTreeObject,
	entityDef: Entity | null
): number {
	if (entityDef?.param1 === 'width') {
		return obj.param1;
	}

	if (entityDef?.param2 === 'width') {
		return obj.param2;
	}

	return 1;
}

function getPayloadType(
	payloads: Record<EntityType, number>,
	id: number
): EntityType | null {
	const foundEntry = Object.entries(payloads).find((p) => p[1] === id);

	return (foundEntry?.[0] as EntityType) ?? null;
}

function LevelObject({ object, scale }: LevelObjectProps) {
	const entityDefViaId = getEntityDefFromId(object);
	const entityDefViaPayload = entityDefViaId
		? null
		: getEntityDefFromPayloadId(object);

	const entityDef = entityDefViaId ?? entityDefViaPayload;

	const widthInTiles = determineWidth(object, entityDef);
	const heightInTiles = determineHeight(object, entityDef);

	const width = widthInTiles * TILE_SIZE * scale;
	const height = heightInTiles * TILE_SIZE * scale;

	const style = {
		width,
		height,
		backgroundSize: TILE_SIZE,
	};

	if (entityDefViaPayload) {
		const payloadType = getPayloadType(
			entityDefViaPayload.payloadToObjectId!,
			object.id
		);

		const payloadStyle = {
			position: 'absolute',
			backgroundSize: 'cover',
			bottom: 0,
			right: 0,
			width: scale * TILE_SIZE * 0.75,
			height: scale * TILE_SIZE * 0.75,
		} as const;

		return (
			<div className="relative" style={style}>
				<ObjectIcon
					className="absolute top-0 left-0"
					entityType={entityDef?.type}
					style={style}
				/>
				<div style={payloadStyle} className={`${payloadType}-bg`} />
			</div>
		);
	} else {
		return <ObjectIcon entityType={entityDef?.type} style={style} />;
	}
}

export { LevelObject };
