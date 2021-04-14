import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../../../tiles/constants';
import {
	bank0SpriteIdToEntityType,
	bank1SpriteIdToEntityType,
} from '../../../../entities/spriteIdMap';
import { LevelTreeSprite } from '../../types';

type LevelSpriteProps = {
	sprite: LevelTreeSprite;
	scale: number;
	focused?: boolean;
	onClick: () => void;
};

const BORDER_WIDTH = 4;

function LevelSprite({ sprite, scale, focused, onClick }: LevelSpriteProps) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (focused && ref.current) {
			ref.current?.scrollIntoView({ block: 'center', inline: 'center' });
		}
	}, [focused]);

	const spriteType =
		sprite.bank === 0
			? bank0SpriteIdToEntityType[sprite.id]
			: bank1SpriteIdToEntityType[sprite.id];

	const x = sprite.x * TILE_SIZE * scale - BORDER_WIDTH;
	const y = sprite.y * TILE_SIZE * scale - BORDER_WIDTH;
	// hmmm....
	const width = 1 * TILE_SIZE * scale + 2 * BORDER_WIDTH;
	const height = 1 * TILE_SIZE * scale + 2 * BORDER_WIDTH;

	const style = {
		left: x,
		top: y,
		width,
		height,
		backgroundSize: TILE_SIZE,
		borderWidth: BORDER_WIDTH,
		borderStyle: 'solid',
	};

	const bgClass = `${spriteType}-bg`;

	return (
		<div
			ref={ref}
			className={clsx(bgClass, 'absolute bg-center bg-no-repeat', {
				'bg-green-300': !spriteType,
				'border-white': focused,
				'border-transparent': !focused,
			})}
			style={style}
			onClick={onClick}
		/>
	);
}

export { LevelSprite };
