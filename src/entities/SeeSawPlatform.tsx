import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const SeeSawPlatform: Entity = {
	// SeeSaw requires the sixth to last byte of level settings to be 1, not zero/
	// can't make it 1 as that would break arrow lift and several others.
	// TODO: that byte, and probably others, needs to become a factor in compatibility
	paletteCategory: 'unfinished',
	paletteInfo: {
		title: 'See Saw Platform',
		description: '',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	width: 1,
	height: 1,
	objectId: 0xb3,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x39ce,
			0x4a52,
			0x5ef7,
			0x7a8b,
			0x7f6e,
			0x7fd6,
			0x6f7b,
			0x19f8,
			0x2e5c,
			0x42ff,
			0x1b1f,
			0x1a1f,
			0x1d,
		],
		romOffset: 0x18af80,
		tiles: [
			[312, 313, 314, 315, 316, 317, 318, 319],
			[344, 345, 346, 347, 348, 349, 350, 351],
		],
	},

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '100% 25%',
		};

		return (
			<div
				className="relative SeeSawPlatform-bg bg-center bg-no-repeat"
				style={style}
			>
				<div className="absolute SeeSawPivotPoint-bg bg-no-repeat w-full h-full top-0 left-0 bg-center" />
			</div>
		);
	},

	render() {
		const style = {
			marginTop: TILE_SIZE / 2,
			width: TILE_SIZE * 4,
			height: TILE_SIZE,
			marginLeft: -TILE_SIZE,
			paddingTop: TILE_SIZE / 2,
			paddingLeft: TILE_SIZE,
			paddingRight: TILE_SIZE * 2,
		};

		const pivotStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			left: TILE_SIZE * 1.5,
			top: 0,
		};

		const tileSpaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			left: TILE_SIZE,
			top: -TILE_SIZE / 2,
		};

		return (
			<div
				className="relative SeeSawPlatform-bg bg-cover bg-no-repeat"
				style={style}
			>
				<div className="absolute" style={tileSpaceStyle}>
					<TileSpace />
				</div>
				<div className="absolute SeeSawPivotPoint-bg" style={pivotStyle} />
			</div>
		);
	},
};

export { SeeSawPlatform };
