import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const FallAwayPlatform: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Fall Away Platform',
		description: 'Whenever Mario is standing on this platform, it falls',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0x20,
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x0,
			0x7fff,
			0x196,
			0x123b,
			0x1a9e,
			0x25fd,
			0x369e,
			0x475f,
			0x0,
			0x7f11,
			0x7f74,
			0x7fd8,
			0x31f,
			0x21f,
			0x1d,
		],
		romOffset: 0x18af80,
		tiles: [[224, 225, 226, 227]],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		const style = { width: mw, height: mh, backgroundSize: '100% 25%' };
		return (
			<div
				className="FallAwayPlatform-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 2, height: TILE_SIZE / 2 };
		return (
			<div
				className="relative FallAwayPlatform-bg bg-cover bg-no-repeat"
				style={style}
			>
				<div
					className="absolute top-0 left-0"
					style={{ width: TILE_SIZE, height: TILE_SIZE }}
				>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { FallAwayPlatform };
