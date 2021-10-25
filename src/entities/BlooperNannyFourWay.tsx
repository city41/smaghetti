import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const BlooperNannyFourWay: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-water',
		title: 'Blooper Nanny - Four Way',
		description: 'Shoots her babies out in four directions',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [7, -1, 1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6a,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const ulBabyStyle = {
			width: size / 2,
			height: size,
			top: -size / 2,
			left: -size / 4,
		};

		const urBabyStyle = {
			width: size / 2,
			height: size,
			top: -size / 2,
			right: -size / 4,
		};

		const blBabyStyle = {
			width: size / 2,
			height: size,
			bottom: -size / 2,
			left: -size / 4,
		};

		const brBabyStyle = {
			width: size / 2,
			height: size,
			bottom: -size / 2,
			right: -size / 4,
		};

		return (
			<div
				className="relative Blooper-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div style={ulBabyStyle} className="absolute BlooperBaby-bg bg-cover" />
				<div style={urBabyStyle} className="absolute BlooperBaby-bg bg-cover" />
				<div style={blBabyStyle} className="absolute BlooperBaby-bg bg-cover" />
				<div style={brBabyStyle} className="absolute BlooperBaby-bg bg-cover" />
			</div>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { BlooperNannyFourWay };
