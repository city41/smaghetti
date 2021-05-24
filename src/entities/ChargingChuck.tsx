import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const ChargingChuck: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Charging Chuck',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 9],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x9b,

	toSpriteBinary(x, y) {
		return [0, this.objectId!, x, y];
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const headStyle = {
			width: size * 0.66,
			height: size * 0.66,
			left: size / 6,
		};
		const bodyStyle = { width: size, height: size * 0.66, top: size / 3 };

		return (
			<div className="relative" style={style}>
				<div
					className="absolute ChargingChuckBody-bg bg-cover"
					style={bodyStyle}
				/>
				<div
					className="absolute ChargingChuckHead-bg bg-cover"
					style={headStyle}
				/>
			</div>
		);
	},

	render() {
		const width = TILE_SIZE * 1.5;
		const height = TILE_SIZE * 1.5;
		const style = {
			width,
			height,
			marginLeft: -TILE_SIZE / 4,
			marginTop: -TILE_SIZE * 0.5,
		};
		const headStyle = {
			width: width * 0.66,
			height: height * 0.66,
			left: width / 6,
		};
		const bodyStyle = { width: width, height: height * 0.66, top: width / 3 };
		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			left: TILE_SIZE / 4,
			top: TILE_SIZE * 0.5,
		};

		return (
			<div className="relative" style={style}>
				<div
					className="absolute ChargingChuckBody-bg bg-cover"
					style={bodyStyle}
				/>
				<div
					className="absolute ChargingChuckHead-bg bg-cover"
					style={headStyle}
				/>
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { ChargingChuck };
