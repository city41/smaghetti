import React, { Ref, RefObject } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../../../tiles/constants';

type PlayerProps = {
	className?: string;
	x: number;
	y: number;
	scale: number;
	ref?: RefObject<HTMLDivElement> | Ref<HTMLDivElement> | null;
};

const Player = React.forwardRef<HTMLDivElement, PlayerProps>(function Player(
	{ className, x, y, scale },
	ref
) {
	const width = 1 * TILE_SIZE * scale;
	const height = 1 * TILE_SIZE * scale;

	const style = {
		left: x * TILE_SIZE * scale,
		top: y * TILE_SIZE * scale,
		width,
		height,
		backgroundSize: TILE_SIZE,
	};
	return (
		<div
			ref={ref}
			className={clsx(className, 'Player-bg', 'bg-center absolute')}
			style={style}
		/>
	);
});

export { Player };
