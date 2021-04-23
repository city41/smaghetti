import React from 'react';
import clsx from 'clsx';

import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';

const OBJECT_ID = 0xfa;

const AceCoin: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',

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

	toBinary(x, y, _w, _h, settings) {
		// if (typeof settings.aceCoinIndex !== 'number') {
		// 	throw new Error('AceCoin#toBinary: no aceCoinIndex setting found');
		// }

		return [0, OBJECT_ID, x, y, settings.aceCoinIndex];
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '50% 100%',
		};

		return <div className="AceCoin-bg bg-center bg-no-repeat" style={style} />;
	},

	render(_showDetails, settings) {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
			paddingBottom: TILE_SIZE,
		};

		return (
			<div className="AceCoin-bg bg-cover relative" style={style}>
				<TileSpace />
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
};

export { AceCoin };
