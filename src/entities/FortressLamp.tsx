import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets, parseSimpleObject } from './util';

const FortressLamp: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Fortress Lamp',
	},

	objectSets: encodeObjectSets([[2, 2]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x8,
	emptyBank: 0,

	resources: {
		FortressLampRopeAttach: {
			palettes: [
				[
					31744,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					8378,
					8638,
					13023,
					12690,
					5686,
					10908,
					17151,
					0,
					0,
				],
			],
			tiles: [
				[24, 26],
				[25, 27],
			],
			romOffset: 1472116,
		},
		FortressLampRope: {
			palettes: [
				[
					31744,
					32767,
					0,
					5586,
					8791,
					11004,
					14270,
					8378,
					8638,
					13023,
					12690,
					5686,
					10908,
					17151,
					0,
					0,
				],
			],
			tiles: [
				[25, 27],
				[25, 27],
			],
			romOffset: 1472116,
		},
		FortressLamp: {
			palettes: [
				[
					31744,
					32767,
					0,
					17932,
					23185,
					28469,
					32731,
					0,
					0,
					0,
					8378,
					5567,
					10911,
					17247,
					0,
					0,
				],
			],
			tiles: [
				[28, 30],
				[29, 31],
			],
			romOffset: 1472116,
		},
	},

	toObjectBinary({ x, y }) {
		return [0x40, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0x40, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};
		return <div className="FortressLamp-bg bg-cover" style={style} />;
	},

	render({ entity }) {
		const height = (entity?.y ?? 0) / TILE_SIZE + 1;

		const attachStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const ropeStyle = {
			height: (height - 2) * TILE_SIZE,
			width: TILE_SIZE,
		};

		const lampStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const ropePositionStyle = {
			left: 0,
			top: -((height - 1) * TILE_SIZE),
			height: (height - 1) * TILE_SIZE,
		};

		return (
			<div style={lampStyle} className="relative FortressLamp-bg bg-cover">
				<div style={ropePositionStyle} className="absolute flex flex-col">
					<div
						style={attachStyle}
						className="FortressLampRopeAttach-bg bg-cover"
					/>
					<div style={ropeStyle} className="FortressLampRope-bg bg-repeat-y" />
				</div>
			</div>
		);
	},
};

export { FortressLamp };
