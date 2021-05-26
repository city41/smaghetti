import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { encodeObjectSets } from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const BowserDoor: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Bowser Door',
		description: 'This can only be used as decoration and not a real door :(',
	},

	objectSets: encodeObjectSets([[2, 2]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x43,
	width: 2,
	height: 2,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x65a3,
			0x7a8b,
			0x7f6e,
			0x7fd6,
			0x1594,
			0x2e39,
			0x42bd,
			0x11,
			0x16,
			0x1a,
			0xdbe,
			0x123f,
			0x2bf,
		],
		romOffset: 0x167674,
		tiles: [
			[39, 60, 61, 39],
			[39, 62, 63, 39],
			[39, 60, 61, 39],
			[39, 60, 61, 39],
		],
	},

	toObjectBinary(x, y) {
		return [0x40, y, x, this.objectId];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		return (
			<div className="BowserDoor-bg bg-cover bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
		};

		return (
			<div className="BowserDoor-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { BowserDoor };
