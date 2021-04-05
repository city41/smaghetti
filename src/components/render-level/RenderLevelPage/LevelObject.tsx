import React, { useState } from 'react';
import clsx from 'clsx';
import { LevelObject as LevelEntityType } from '../../../levelData/parseObjectsFromLevelFile';
import { TILE_SIZE as ACTUAL_TILE_SIZE } from '../../../tiles/constants';
import {
	bank0ObjectIdToEntityType,
	bank1ObjectIdToEntityType,
} from '../../../entities/objectIdMap';

type LevelObjectProps = {
	object: LevelEntityType;
};

const SCALE = 2;
const TILE_SIZE = ACTUAL_TILE_SIZE * SCALE;

const rawBytesDesc = {
	0: 'b/w',
	1: 'y',
	2: 'x',
	3: 'id',
	4: 'h',
};

function Raw({ bytes }: { bytes: number[] }) {
	const bank = bytes[0] >> 6;
	return (
		<div
			style={{ zIndex: 99999 }}
			className={clsx(
				'absolute left-0 -bottom-14 w-52 bg-gray-200 text-gray-900 grid',
				{
					'grid-cols-4': bank === 0,
					'grid-cols-5': bank === 1,
				}
			)}
		>
			{bytes.map((b, i) => (
				<div key={i} className="border border-black">
					<div>0x{b.toString(16)}</div>
					<div>{rawBytesDesc[i as keyof typeof rawBytesDesc]}</div>
				</div>
			))}
		</div>
	);
}

function LevelObject({ object }: LevelObjectProps) {
	const [showRaw, setShowRaw] = useState(false);
	const tileType =
		object.bank === 0
			? bank0ObjectIdToEntityType[object.id]
			: bank1ObjectIdToEntityType[object.id];

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
			{showRaw && <Raw bytes={object.rawBytes} />}
		</div>
	);
}

export { LevelObject };
