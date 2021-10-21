import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';
import { parseSimpleSprite } from './util';
import { IconArrowUp } from '../icons';

const DonutLiftSurprise: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Surprise Donut Lift',
		description:
			'Hidden until Mario walks over it, then it rises rapidly. You can draw terrain over top of it to hide it.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, 1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x2e,
	width: 2,
	height: 1,

	resource: {
		romOffset: 0x167674,
		palettes: [
			[
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
		],
		tiles: [
			[224, 225],
			[240, 241],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 50%',
			backgroundPositionX: 0,
		};

		const arrowStyle = { marginTop: '-10%' };

		return (
			<div
				className="DonutLiftSurprise-bg bg-center bg-repeat-x flex flex-row items-start"
				style={style}
			>
				<IconArrowUp style={arrowStyle} />
				<IconArrowUp style={arrowStyle} />
				<IconArrowUp style={arrowStyle} />
			</div>
		);
	},

	render() {
		const style = { width: TILE_SIZE, height: TILE_SIZE };

		const platformStyle = {
			top: TILE_SIZE,
			left: 0,
			width: TILE_SIZE * 2,
			height: TILE_SIZE,
		};

		return (
			<div style={style} className="relative">
				<TileSpace />
				<div
					style={platformStyle}
					className="absolute DonutLiftSurprise-bg bg-repeat-x"
				/>
			</div>
		);
	},
};

export { DonutLiftSurprise };
