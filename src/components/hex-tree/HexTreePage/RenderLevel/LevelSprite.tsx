import React from 'react';
import { TILE_SIZE } from '../../../../tiles/constants';
import {
	bank0SpriteIdToEntityType,
	bank1SpriteIdToEntityType,
} from '../../../../entities/spriteIdMap';
import { LevelTreeSprite } from '../../types';
import { SpriteIcon } from '../entityIcons';

type LevelSpriteProps = {
	sprite: LevelTreeSprite;
	scale: number;
};

function LevelSprite({ sprite, scale }: LevelSpriteProps) {
	const spriteType =
		sprite.bank === 0
			? bank0SpriteIdToEntityType[sprite.id]
			: bank1SpriteIdToEntityType[sprite.id];

	// hmmm....
	const width = 1 * TILE_SIZE * scale;
	const height = 1 * TILE_SIZE * scale;

	const style = {
		width,
		height,
		backgroundSize: TILE_SIZE,
	};
	return (
		<SpriteIcon
			className="cursor-pointer"
			entityType={spriteType}
			style={style}
		/>
	);
}

export { LevelSprite };
