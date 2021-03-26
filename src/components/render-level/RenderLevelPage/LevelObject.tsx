import React from 'react';
import clsx from 'clsx';
import { LevelObject as LevelObjectType } from '../../../tiles/parseObjectsFromLevelFile';
import { TILE_SIZE as ACTUAL_TILE_SIZE } from '../../../tiles/constants';
import { objectIdToTileType } from '../../../entities/objectIdMap';

type LevelObjectProps = {
	object: LevelObjectType;
};

const SCALE = 2;
const TILE_SIZE = ACTUAL_TILE_SIZE * SCALE;

function LevelObject({ object }: LevelObjectProps) {
	const tileType = objectIdToTileType[object.id];

	const x = object.x * TILE_SIZE;
	const y = object.y * TILE_SIZE;
	const width = object.width * TILE_SIZE;
	const height = object.height * TILE_SIZE;

	const style = { left: x, top: y, width, height, backgroundSize: TILE_SIZE };

	const bgClass = `${tileType}-bg`;

	return (
		<div
			className={clsx(bgClass, 'absolute', {
				'bg-gray-300': !tileType,
			})}
			style={style}
		/>
	);
}

export { LevelObject };
