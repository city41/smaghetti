import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../../../tiles/constants';
import {
	bank0ObjectIdToEntityType,
	bank1ObjectIdToEntityType,
} from '../../../../entities/objectIdMap';
import { LevelTreeObject } from '../../types';

type LevelObjectProps = {
	object: LevelTreeObject;
	scale: number;
	focused?: boolean;
	onClick: () => void;
};

function LevelObject({ object, scale, focused, onClick }: LevelObjectProps) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (focused && ref.current) {
			ref.current?.scrollIntoView({ block: 'center', inline: 'center' });
		}
	}, [focused]);

	const tileType =
		object.bank === 0
			? bank0ObjectIdToEntityType[object.id]
			: bank1ObjectIdToEntityType[object.id];

	const x = object.x * TILE_SIZE * scale;
	const y = object.y * TILE_SIZE * scale;
	const width = TILE_SIZE * scale;
	const height = TILE_SIZE * scale;

	const style = {
		left: x,
		top: y,
		width,
		height,
		backgroundSize: TILE_SIZE,
	};

	const bgClass = `${tileType}-bg`;

	return (
		<div
			ref={ref}
			className={clsx(bgClass, 'absolute', {
				'bg-red-300': !tileType,
				'border-2 border-white': focused,
			})}
			style={style}
			onClick={onClick}
		/>
	);
}

export { LevelObject };
