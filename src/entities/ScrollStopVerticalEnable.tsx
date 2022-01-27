import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { IconArrowDown } from '../icons';

const ScrollStopVerticalEnable: Entity = {
	paletteCategory: 'unfinished',
	paletteInfo: {
		title: 'Scroll Stop - Vertical, Enable',
		description: 'Stops the screen from scrolling vertically',
		warning: 'More research needed, not well understood yet',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x1b,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y, 0, 0x38];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			fontSize: size * 0.17,
			borderRadius: '10%',
		};

		return (
			<div
				style={style}
				className="relative bg-red-500 text-white flex flex-col items-center justify-around p-0.5"
			>
				<div>scroll stop</div>
				<IconArrowDown className="w-1/2 h-1/2" />
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			fontSize: 2.25,
			padding: 1,
			borderRadius: '10%',
		};

		return (
			<div
				style={style}
				className="relative bg-red-500 text-white flex flex-col items-center justify-around"
			>
				<div>scroll stop</div>
				<IconArrowDown className="w-full h-full" />
			</div>
		);
	},
};

export { ScrollStopVerticalEnable };
