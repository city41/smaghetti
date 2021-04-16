import React from 'react';
import { TILE_SIZE } from '../../../../tiles/constants';
import { LevelTreeObject } from '../../types';
import { ObjectIcon } from '../entityIcons';
import { getEntityDefFromId } from '../util';
import { Entity } from '../../../../entities/types';

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

function LevelObject({ object, scale }: LevelObjectProps) {
	const entityDef = getEntityDefFromId(object.id);

	const widthInTiles = determineWidth(object, entityDef);
	const heightInTiles = determineHeight(object, entityDef);

	const width = widthInTiles * TILE_SIZE * scale;
	const height = heightInTiles * TILE_SIZE * scale;

	const style = {
		width,
		height,
		backgroundSize: TILE_SIZE,
	};

	return <ObjectIcon entityType={entityDef?.type} style={style} />;
}

export { LevelObject };
