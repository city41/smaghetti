import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const Flutter: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		title: 'Flutter',
		description: 'A wiggler with wings??',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0x14],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x17,

	resource: {
		romOffset: 0x134104,
		palettes: [
			[
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
		],
		tiles: [
			[394, 395],
			[426, 427],
		],
	},

	toSpriteBinary(x, y) {
		return [1, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		const leftWingStyle = {
			width: size / 1.5,
			height: size * 0.75,
			left: -size / 6,
			top: size / 8,
			transform: 'scale(-1, 1)',
		};

		const rightWingStyle = {
			width: size / 1.5,
			height: size * 0.75,
			top: size * 0.125,
			right: -size * 0.25,
		};

		const headStyle = {
			width: size / 1.5,
			height: size / 2,
			top: size / 4,
			left: size * 0.25,
		};

		const bodyStyle = {
			width: size / 1.5,
			height: size / 2,
			bottom: 0,
			right: 0,
		};

		const flowerStyle = {
			width: size / 3,
			height: size / 4,
			top: size / 8,
			left: size / 2,
		};

		return (
			<div className="relative" style={style}>
				<div
					className="absolute FlutterWing-bg bg-no-repeat"
					style={leftWingStyle}
				/>
				<div
					className="absolute FlutterWing-bg bg-no-repeat"
					style={rightWingStyle}
				/>
				<div
					className="absolute FlutterBody-bg bg-no-repeat"
					style={bodyStyle}
				/>
				<div
					className="absolute FlutterHead-bg bg-no-repeat"
					style={headStyle}
				/>
				<div
					className="absolute FlutterFlower-bg bg-no-repeat"
					style={flowerStyle}
				/>
			</div>
		);
	},

	render() {
		const width = TILE_SIZE * 1.5;
		const height = TILE_SIZE * 2;

		const style = {
			width,
			height,
			marginTop: height / 2,
			marginLeft: -width / 3,
		};

		const leftWingStyle = {
			width: width / 1.5,
			height: height * 0.75,
			left: -width / 6,
			top: height / 8,
			transform: 'scale(-1, 1)',
		};

		const rightWingStyle = {
			width: width / 1.5,
			height: height * 0.75,
			top: height / 16,
			right: -width * 0.333,
		};

		const headStyle = {
			width: width / 1.5,
			height: height / 2,
			top: height / 4,
			left: 0,
		};

		const bodyStyle = {
			width: width / 1.5,
			height: height / 2,
			bottom: 0,
			right: 0,
		};

		const flowerStyle = {
			width: width / 3,
			height: height / 4,
			left: width * 0.375,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			left: TILE_SIZE * 0.5,
			top: -TILE_SIZE,
		};

		return (
			<div className="relative" style={style}>
				<div className="absolute FlutterWing-bg" style={leftWingStyle} />
				<div className="absolute FlutterWing-bg" style={rightWingStyle} />
				<div className="absolute FlutterBody-bg" style={bodyStyle} />
				<div className="absolute FlutterHead-bg" style={headStyle} />
				<div className="absolute FlutterFlower-bg" style={flowerStyle} />
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { Flutter };
