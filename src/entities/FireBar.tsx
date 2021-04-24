import React from 'react';
import { GiAnticlockwiseRotation } from 'react-icons/gi';

import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';

const FireBar: Entity = {
	editorType: 'entity',
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
		tiles: [[290], [306]],
	},

	toSpriteBinary(x, y): number[] {
		// todo: 3 means 4 fireballs counterclockwise, need a details pane to let user choose
		return [0, this.objectId!, x, y, 3];
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '100%',
		};

		return <div className="FireBar-bg bg-center bg-no-repeat" style={style} />;
	},

	render() {
		const FIREBALL_SIZE = TILE_SIZE - 5;

		const style = {
			width: FIREBALL_SIZE - 2.5,
			height: FIREBALL_SIZE - 2.5,
			top: 4,
		};

		const fireballs = [];

		for (let i = 0; i < 4; ++i) {
			fireballs.push(
				<div
					className="FireBar-bg absolute bg-center bg-no-repeat"
					style={{ ...style, left: -i * FIREBALL_SIZE + 3 }}
				/>
			);
		}

		return (
			<div className="relative" style={{ width: TILE_SIZE, height: TILE_SIZE }}>
				{fireballs}
				<TileSpace />
				<GiAnticlockwiseRotation
					className="absolute w-1 h-1 bg-black text-white"
					style={{ left: 1, bottom: 1, padding: 0.25 }}
				/>
			</div>
		);
	},
};

export { FireBar };
