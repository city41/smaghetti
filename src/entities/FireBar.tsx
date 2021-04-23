import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';

const FireBar: Entity = {
	editorType: 'entity',
	gameType: 'sprite',
	dimensions: 'none',
	objectId: 0xb9,

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
		romOffset: 0x163768,
		tiles: [
			[290, 290],
			[306, 306],
		],
	},

	toBinary(x, y): number[] {
		// todo: 3 means 4 fireballs counterclockwise, need a details pan to let user choose
		return [0, this.objectId!, x, y, 3];
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
		};

		return <div className="FireBar-bg bg-cover bg-no-repeat" style={style} />;
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE,
			marginLeft: TILE_SIZE / 4,
			backgroundSize: '50% 100%',
			backgroundPosition: `${TILE_SIZE / 2}px 0`,
			paddingRight: TILE_SIZE,
		};

		return (
			<div className="FireBar-bg" style={style}>
				<div className="w-full h-full" style={{ marginLeft: -TILE_SIZE / 4 }}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { FireBar };
