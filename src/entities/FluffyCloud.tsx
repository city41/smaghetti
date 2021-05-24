import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const FluffyCloud: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Fluffy Cloud',
	},

	objectSets: encodeObjectSets([
		[4, 12],
		[12, 12],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	param1: 'width',
	objectId: 0xb,
	emptyBank: 1,
	width: 3,
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
		romOffset: 0x163768,
		tiles: [
			[520, 552, 553, 520],
			[
				554,
				{ romOffset: 0x131fe0, tileIndex: 44 },
				{ romOffset: 0x131fe0, tileIndex: 44 },
				555,
			],
			[556, 557, 558, 559],
		],
	},

	toObjectBinary(x, y) {
		// TODO: param1 is actually cloud width, but need a details pane
		// and custom resources to support it in the editor
		return [getBankParam1(1, 2), y, x, this.objectId!];
	},

	simpleRender(size) {
    const style = { width: size, height: size, backgroundSize: '100% 75%' };
		return (
			<div className="FluffyCloud-bg bg-no-repeat bg-center" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 3,
			height: TILE_SIZE * 2,
			backgroundPositionX: 'center',
			backgroundPositionY: 1,
		};
		return (
			<div style={style} className="FluffyCloud-bg bg-no-repeat">
				<TileSpace />
			</div>
		);
	},
};

export { FluffyCloud };
