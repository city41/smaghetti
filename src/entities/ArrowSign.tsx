import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';

const directionToObjectId = {
	left: 0x4c,
	right: 0x4b,
};

const ArrowSign: Entity = {
	editorType: 'entity',
	gameType: 'object',
	settingsType: 'single',
	dimensions: 'none',
	defaultSettings: { direction: 'right' },
	width: 2,
	height: 2,

	resource: {
		romOffset: 0x20e4f0,
		palette: [
			0x23df,
			0x7fff,
			0x0,
			0x4e71,
			0x5ef5,
			0x6f79,
			0x7bdd,
			0x13,
			0x19,
			0x1f,
			0x112,
			0x5a1f,
			0x6ebf,
			0x7f9f,
			0x579f,
			0x6fff,
		],
		tiles: [
			// TODO: 74 is a blank tile, need to support null tiles here
			[74, 74, 74],
			[41, 42, 43],
			[57, 58, 59],
			[74, 31, 74],
		],
	},

	toBinary(x, y, _w, _h, settings): number[] {
		const direction = settings?.direction ?? this.defaultSettings!.direction;

		return [
			0,
			y,
			x,
			directionToObjectId[direction as keyof typeof directionToObjectId],
		];
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
			backgroundSize: '66% 100%',
		};

		return (
			<div className="ArrowSign-bg bg-center bg-no-repeat" style={style} />
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
			backgroundSize: '75%',
		};

		return (
			<div className="ArrowSign-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},
};

export { ArrowSign, directionToObjectId };
