import React from 'react';
import clsx from 'clsx';
import { LevelTreeSprite } from '../../types';
import {
	bank0SpriteIdToEntityType,
	bank1SpriteIdToEntityType,
} from '../../../../entities/spriteIdMap';
import { SpriteIcon } from '../entityIcons';

type LevelSpriteProps = {
	className?: string;
	levelSprite: LevelTreeSprite;
};

function LevelSprite({ className, levelSprite }: LevelSpriteProps) {
	const spriteType =
		levelSprite.bank === 0
			? bank0SpriteIdToEntityType[levelSprite.id]
			: bank1SpriteIdToEntityType[levelSprite.id];

	return (
		<div className={clsx(className, 'ml-8 bg-gray-600 p-2 m-2 flex flex-col')}>
			<div className="flex flex-row items-center space-x-2">
				<SpriteIcon entityType={spriteType} />
				<div className="bg-gray-200 text-gray-900 grid grid-rows-2 grid-cols-3 gap-x-2 p-1">
					<div className="text-xs text-gray-400">x</div>
					<div className="text-xs text-gray-400">y</div>
					<div className="text-xs text-gray-400">id</div>
					<div className="text-sm">{levelSprite.x}</div>
					<div className="text-sm">{levelSprite.y}</div>
					<div className="text-sm">0x{levelSprite.id.toString(16)}</div>
				</div>
			</div>
		</div>
	);
}

export { LevelSprite };
