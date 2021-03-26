import React, { useState } from 'react';
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
	const [showRaw, setShowRaw] = useState(false);
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
			onClick={() => setShowRaw((sr) => !sr)}
		>
			{showRaw && (
				<div className="absolute left-0 -bottom-8 h-8 w-52 bg-gray-200 text-gray-900">
					{object.rawBytes.map((b) => `0x${b.toString(16)}`).join(', ')}
				</div>
			)}
		</div>
	);
}

export { LevelObject };
