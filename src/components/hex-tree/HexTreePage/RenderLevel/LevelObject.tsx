import React from 'react';
import { TILE_SIZE } from '../../../../tiles/constants';
import {
	bank0ObjectIdToEntityType,
	bank1ObjectIdToEntityType,
} from '../../../../entities/objectIdMap';
import { LevelTreeObject } from '../../types';
import clsx from 'clsx';
import { ObjectIcon } from '../entityIcons';

type LevelObjectProps = {
	object: LevelTreeObject;
	scale: number;
};

function LevelObject({ object, scale }: LevelObjectProps) {
	const tileType =
		object.bank === 0
			? bank0ObjectIdToEntityType[object.id]
			: bank1ObjectIdToEntityType[object.id];

	const width = TILE_SIZE * scale;
	const height = TILE_SIZE * scale;

	const style = {
		width,
		height,
		backgroundSize: TILE_SIZE,
	};

	return <ObjectIcon entityType={tileType} style={style} />;
}

export { LevelObject };
