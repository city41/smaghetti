import React from 'react';
import clsx from 'clsx';

import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const AceCoin: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Advance Coin',
		description:
			'Special coins to search for. At most a level can have five of them.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xfa,

	resource: {
		romOffset: 0x18af80,
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x3192,
			0x1636,
			0x2a9c,
			0x1f4,
			0x29a,
			0x37f,
			0x42ff,
			0x4a52,
			0x6318,
			0x77bd,
			0x7ffb,
			0x7fd2,
			0x732c,
		],
		tiles: [
			[10, 11],
			[42, 43],
			[74, 75],
			[106, 107],
		],
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		// if (typeof settings.aceCoinIndex !== 'number') {
		// 	throw new Error('AceCoin#toBinary: no aceCoinIndex setting found');
		// }

		return [0, this.objectId, x, y, settings.aceCoinIndex];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
		};

		return <div className="AceCoin-bg bg-center bg-no-repeat" style={style} />;
	},

	render(_showDetails, settings) {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div className="relative AceCoin-bg bg-cover relative" style={style}>
				<div className="absolute left-0 top-0" style={spaceStyle}>
					<TileSpace />
				</div>
				{!isNaN(settings.aceCoinIndex) && (
					<div
						className={clsx(
							'absolute bottom-1 right-0 bg-black text-white rounded-sm grid place-items-center font-bold'
						)}
						style={{ fontSize: 4, width: 5, height: 5 }}
					>
						{settings.aceCoinIndex + 1}
					</div>
				)}
			</div>
		);
	},

	getWarning(settings) {
		if (settings.aceCoinIndex >= 5) {
			return 'The ace coin in your bubble is one too many';
		}
	},
};

export { AceCoin };
