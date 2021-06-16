import React from 'react';
import { TILE_SIZE } from '../../../../tiles/constants';
import {
	bank0SpriteIdToEntityType,
	bank1SpriteIdToEntityType,
} from '../../../../entities/spriteIdMap';
import { LevelTreeSprite } from '../../types';
import { SpriteIcon } from '../entityIcons';
import { entityMap } from '../../../../entities/entityMap';

type LevelSpriteProps = {
	sprite: LevelTreeSprite;
	scale: number;
};

function LevelSprite({ sprite, scale }: LevelSpriteProps) {
	const matchingEntity = Object.entries(entityMap).find((entry) => {
		const e = entry[1];
		return (
			!!e.toSpriteBinary &&
			(e.objectId === sprite.id || e.alternateObjectIds?.includes(sprite.id)) &&
			e.toSpriteBinary(0, 0, 1, 1, {})[0] === sprite.bank
		);
	});

	const spriteType = (matchingEntity
		? matchingEntity[0]
		: sprite.bank === 0
		? bank0SpriteIdToEntityType[sprite.id]
		: bank1SpriteIdToEntityType[sprite.id]) as EntityType;

	const spriteDef = entityMap[spriteType];

	const tileWidth = spriteDef?.width ?? 1;
	const tileHeight = spriteDef?.height ?? 1;

	// hmmm....
	const width = tileWidth * TILE_SIZE * scale;
	const height = tileHeight * TILE_SIZE * scale;

	const body = spriteDef?.render(false, {}, () => {});

	if (body) {
		return body;
	} else {
		const style = {
			width,
			height,
			backgroundSize: 'cover',
			// TODO: sprites should be positioning themselves so they can account for
			// the fact that y is based on their bottom, not top. For now, a lil
			// hack with negative margin...
			marginTop: -((height - TILE_SIZE) * scale),
		};
		return (
			<SpriteIcon
				className="cursor-pointer"
				entityType={spriteType}
				style={style}
			/>
		);
	}
}

export { LevelSprite };
