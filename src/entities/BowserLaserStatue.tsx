import type { Entity } from './types';
import { ROOM_TYPE_SETTINGS } from '../levelData/constants';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const BowserLaserStatue: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Bowser Laser Statue',
		warning: "They can't shoot lasers just yet...",
	},

	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectSets: [ROOM_TYPE_SETTINGS.fortress.objectSet],
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x5,
	emptyBank: 0,

	resource: {
		romOffset: 0x167674,
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x39ce,
			0x4a52,
			0x6318,
			0x77bd,
			0x732c,
			0x7fd2,
			0x7ffb,
			0xdf7,
			0x267c,
			0x435f,
			0x5bbf,
			0x0,
			0x0,
		],
		tiles: [
			[48, 50],
			[49, 51],
			[52, 54],
			[53, 55],
		],
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '50% 100%',
		};

		return (
			<div
				className="BowserLaserStatue-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
			backgroundPositionY: 2,
		};

		return (
			<div className="BowserLaserStatue-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { BowserLaserStatue };
