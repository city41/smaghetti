import React, { useState } from 'react';
import clsx from 'clsx';
import { LevelSprite as LevelEntityType } from '../../../levelData/parseSpritesFromLevelFile';
import { TILE_SIZE as ACTUAL_TILE_SIZE } from '../../../tiles/constants';
import {
	bank0SpriteIdToEntityType,
	bank1SpriteIdToEntityType,
} from '../../../entities/spriteIdMap';

type LevelSpriteProps = {
	sprite: LevelEntityType;
};

const SCALE = 2;
const TILE_SIZE = ACTUAL_TILE_SIZE * SCALE;

const rawBytesDesc = {
	0: 'bnk',
	1: 'id',
	2: 'x',
	3: 'y',
	4: '?',
	5: '?',
};

function Raw({ bytes }: { bytes: number[] }) {
	const bank = bytes[0] >> 6;
	return (
		<div
			style={{ zIndex: 99999 }}
			className={clsx(
				'absolute left-0 -bottom-14 w-60 bg-gray-200 text-gray-900 grid',
				{
					'grid-cols-4': bank === 0,
					'grid-cols-6': bank > 0,
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

function LevelSprite({ sprite }: LevelSpriteProps) {
	const [showRaw, setShowRaw] = useState(false);
	const spriteType =
		sprite.bank === 0
			? bank0SpriteIdToEntityType[sprite.id]
			: bank1SpriteIdToEntityType[sprite.id];

	const x = sprite.x * TILE_SIZE;
	const y = sprite.y * TILE_SIZE;
	// hmmm....
	const width = 1 * TILE_SIZE;
	const height = 1 * TILE_SIZE;

	const style = { left: x, top: y, width, height, backgroundSize: TILE_SIZE };

	const bgClass = `${spriteType}-bg`;

	return (
		<div
			className={clsx(bgClass, 'absolute', {
				'bg-green-300': !spriteType,
			})}
			style={style}
			onClick={() => setShowRaw((sr) => !sr)}
		>
			{showRaw && <Raw bytes={sprite.rawBytes} />}
		</div>
	);
}

export { LevelSprite };
