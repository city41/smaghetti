import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';

const CardSlotMachine: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Card Slot Machine',
		description: 'Collecting the card is one way to complete a level',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0x41,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x101a,
			0x10bf,
			0x125f,
			0x25fd,
			0x369e,
			0x475f,
			0x139f,
			0x177,
			0x21c,
			0x29f,
			0x47bf,
			0x137f,
			0x25f,
		],
		tiles: [
			[
				{ romOffset: 0x189ac0, tileIndex: 139 },
				{ romOffset: 0x189ac0, tileIndex: 140 },
				{ romOffset: 0x189ac0, tileIndex: 140 },
				{ romOffset: 0x189ac0, tileIndex: 139, flip: 'h' },
			],
			[
				{ romOffset: 0x189ac0, tileIndex: 171 },
				{ romOffset: 0x134104, tileIndex: 266 },
				{ romOffset: 0x134104, tileIndex: 267 },
				{ romOffset: 0x189ac0, tileIndex: 171, flip: 'h' },
			],
			[
				{ romOffset: 0x189ac0, tileIndex: 171 },
				{ romOffset: 0x134104, tileIndex: 298 },
				{ romOffset: 0x134104, tileIndex: 299 },
				{ romOffset: 0x189ac0, tileIndex: 171, flip: 'h' },
			],
			[
				{ romOffset: 0x189ac0, tileIndex: 139, flip: 'v' },
				{ romOffset: 0x189ac0, tileIndex: 140, flip: 'v' },
				{ romOffset: 0x189ac0, tileIndex: 140, flip: 'v' },
				{ romOffset: 0x189ac0, tileIndex: 139, flip: 'hv' },
			],
		],
	},

	toSpriteBinary(x, y) {
		return [0, this.objectId!, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="CardSlotMachine-bg bg-cover bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundPosition: '-8% -8%',
					backgroundSize: '100%',
				}}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
			marginTop: -TILE_SIZE / 2,
			marginLeft: -TILE_SIZE / 2,
			padding: TILE_SIZE / 2,
		};
		return (
			<div className="CardSlotMachine-bg bg-cover" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { CardSlotMachine };
