import React from 'react';
import type { Entity } from './types';
import { PipeHorizontalMini } from './PipeHorizontalMini';
import { TILE_SIZE } from '../tiles/constants';

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const PipeCannonMini: Entity = {
	...PipeHorizontalMini,
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-airship',
		title: 'Pipe - Cannon Mini',
		description:
			'Fires cannon balls. Just want a pipe? Check out Pipe Horizontal Mini in the terrain section',
	},

	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		-1,
		0,
		graphicSets,
		graphicSets,
	],

	toSpriteBinary(x, y) {
		return [1, 0x96, x, y];
	},

	simpleRender(size) {
		const pipeCmp = PipeHorizontalMini.simpleRender(size);

		const cannonBallStyle = {
			top: size / 4,
			left: '-20%',
			width: size / 2,
			height: size / 2,
		};

		return (
			<div
				className="relative grid place-items-center"
				style={{ width: size, height: size }}
			>
				<div
					style={cannonBallStyle}
					className="absolute CannonBall-bg bg-cover"
				/>
				<div style={{ zIndex: 1 }}>{pipeCmp}</div>
			</div>
		);
	},

	render(...args) {
		const pipeCmp = PipeHorizontalMini.render(...args);

		const cannonBallStyle = {
			top: 0,
			left: -7,
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div className="relative">
				<div
					style={cannonBallStyle}
					className="absolute CannonBall-bg bg-cover"
				/>
				{pipeCmp}
			</div>
		);
	},
};

export { PipeCannonMini };
