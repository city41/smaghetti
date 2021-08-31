import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const RedParaTroopa: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Koopa Troopa - Red Para Troopa',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6f,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this.objectId, 'RedParaTroopa');
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
		};

		const wingStyle = {
			width: size / 4,
			height: size / 2,
			top: 1,
			left: size / 2,
		};

		return (
			<div
				className="relative RedKoopaTroopa-bg bg-center bg-no-repeat"
				style={style}
			>
				<div className="absolute KoopaWing-bg bg-cover" style={wingStyle} />
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
			marginTop: -TILE_SIZE,
			paddingTop: TILE_SIZE,
			backgroundPositionY: 2,
		};

		const wingStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE,
			top: 2,
			left: TILE_SIZE / 2,
		};

		return (
			<div
				className="relative RedKoopaTroopa-bg bg-cover bg-no-repeat"
				style={style}
			>
				<div className="absolute KoopaWing-bg bg-cover" style={wingStyle} />
				<TileSpace />
			</div>
		);
	},
};

export { RedParaTroopa };
