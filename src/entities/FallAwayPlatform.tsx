import React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const FallAwayPlatform: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Platform - Fall Away',
		description: 'Whenever Mario is standing on this platform, it falls',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0x20,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palettes: [
			[
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
		],
		romOffset: 0x18af80,
		tiles: [[224, 225, 226, 227]],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 25%' };
		return (
			<div
				className="FallAwayPlatform-bg bg-center bg-no-repeat flex flex-row items-end"
				style={style}
			>
				<FaArrowDown />
				<FaArrowDown />
				<FaArrowDown />
			</div>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 2, height: TILE_SIZE };
		return (
			<div
				className="relative FallAwayPlatform-bg bg-no-repeat flex flex-row items-end justify-between"
				style={style}
			>
				<FaArrowDown className="w-2 h-2" />
				<FaArrowDown className="w-2 h-2" />
				<FaArrowDown className="w-2 h-2" />
			</div>
		);
	},
};

export { FallAwayPlatform };
