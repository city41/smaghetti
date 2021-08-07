import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';

const AirshipPropeller: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Airship Propeller',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, 0, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xaa,

	resource: {
		romOffset: 0x163768,
		palettes: [
			[
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
		],
		tiles: [
			[8, 16],
			[24, 16],
			[9, 16],
			[25, 16],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y + 1];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '25% 100%',
		};

		return (
			<div
				className="AirshipPropeller-bg bg-no-repeat bg-center"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			marginTop: 3,
			width: TILE_SIZE,
			height: 2 * TILE_SIZE,
		};

		return <div className="AirshipPropeller-bg bg-cover" style={style} />;
	},
};

export { AirshipPropeller };
