import React from 'react';
import type { Entity } from '../types';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from '../constants';
import { TILE_SIZE } from '../../tiles/constants';
import { TileSpace } from '../TileSpace';
import { parseSimpleSprite } from '../util';

const RotoDisc: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Roto Disc',
		description: 'SMB3 style fire bars',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [6, -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { rotation: 'counter-clockwise', pivot: 'end', count: 4 },
	objectId: 0x5a,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x101a,
				0x10bf,
				0x125f,
				0x25fd,
				0x369e,
				0x475f,
				0x139f,
				0x177,
				0x21c,
				0x29f,
				0x47bf,
				0x137f,
				0x25f,
			],
		],
		romOffset: 0x167674,
		tiles: [
			[132, 133],
			[148, 149],
		],
	},

	toSpriteBinary({ x, y }) {
		// TODO: other objectIds for other rotodiscs
		// 5b - single counterclockwise
		// 5e - double, starts from side
		// 5f - double, starts from top
		// 60 - double, clockwise
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '100%',
		};

		return <div className="RotoDisc-bg bg-center bg-no-repeat" style={style} />;
	},

	render() {
		const style = {
			width: 7 * TILE_SIZE,
			height: 7 * TILE_SIZE,
			marginLeft: -TILE_SIZE * 3,
			marginTop: -TILE_SIZE * 3,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: TILE_SIZE * 3,
			left: TILE_SIZE * 3,
		};

		const rotoStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: TILE_SIZE * 3,
			left: 0,
		};

		return (
			<div style={style} className="relative">
				<div className="absolute top-0 left-0 w-full h-full rounded-full border border-red-300 border-dotted" />
				<TileSpace style={spaceStyle} className="absolute" />
				<div style={rotoStyle} className="absolute RotoDisc-bg bg-cover" />
			</div>
		);
	},
};

export { RotoDisc };
