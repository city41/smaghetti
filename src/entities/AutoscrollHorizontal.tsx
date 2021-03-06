import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const AutoscrollHorizontal: Entity = {
	paletteInfo: {
		title: 'Autoscroll - Horizontal',
		warning: 'So far does not work...',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xab,

	toSpriteBinary({ x, y }) {
		// so far it seems like the param has to always be zero
		return [1, this.objectId, x, y, 0];
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
				className="relative bg-green-500 text-white flex flex-col items-center justify-around p-0.5"
			>
				<div>autoscroll</div>
				<FaArrowRight className="w-1/2 h-1/2" />
			</div>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { AutoscrollHorizontal };
