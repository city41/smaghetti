import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const BigBoo: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Big Boo',
		description: 'A Boo, but bigger',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xb],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x12,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '100%',
			backgroundPosition: '0 0',
		};
		const tailStyle = {
			width: size / 2,
			height: size / 2,
			bottom: 1,
			right: 0,
		};

		const faceStyle = {
			width: size / 4,
			height: size / 2,
			top: size / 4,
			left: size / 8,
		};

		const armStyle = {
			width: size / 4,
			height: size / 4,
			top: size / 3,
			left: size / 2,
		};

		return (
			<div className="relative BigBooBody-bg bg-no-repeat" style={style}>
				<div
					className="absolute BigBooTail-bg bg-no-repeat bg-cover"
					style={tailStyle}
				/>
				<div
					className="absolute BigBooFace-bg bg-no-repeat bg-cover"
					style={faceStyle}
				/>
				<div
					className="absolute BigBooArm-bg bg-no-repeat bg-cover"
					style={armStyle}
				/>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					enemy
				</div>
			</div>
		);
	},

	render() {
		const width = TILE_SIZE * 4;
		const height = TILE_SIZE * 4;

		const style = {
			width,
			height,
			backgroundSize: '100%',
			backgroundPosition: '0 0',
		};
		const tailStyle = {
			width: width / 2,
			height: height / 2,
			bottom: 1,
			right: 0,
		};

		const faceStyle = {
			width: width / 4,
			height: height / 2,
			top: height / 4,
			left: width / 8,
		};

		const armStyle = {
			width: width / 4,
			height: height / 4,
			top: height / 3,
			left: width / 2,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: 0,
			left: 0,
		};

		const labelStyle = {
			fontSize: 3,
			bottom: 0,
		};

		return (
			<div className="relative BigBooBody-bg bg-no-repeat" style={style}>
				<div
					className="absolute BigBooTail-bg bg-no-repeat bg-cover"
					style={tailStyle}
				/>
				<div
					className="absolute BigBooFace-bg bg-no-repeat bg-cover"
					style={faceStyle}
				/>
				<div
					className="absolute BigBooArm-bg bg-no-repeat bg-cover"
					style={armStyle}
				/>
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
				</div>
				<div className="absolute left-0 w-full text-center" style={labelStyle}>
					<div className="inline-block px-2 bg-black text-white">enemy</div>
				</div>
			</div>
		);
	},
};

export { BigBoo };
