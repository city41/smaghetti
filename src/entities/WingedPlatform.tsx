import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const WingedPlatform: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Winged Platform',
		description: 'Normally a hammer bro rides it',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 4, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x3,

	resource: {
		romOffset: 0x134104,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x11dc,
				0x169e,
				0x1b5f,
				0x25fd,
				0x369e,
				0x475f,
				0x111d,
				0x1a1f,
				0x329f,
				0x4b7f,
				0x7bda,
				0x6b55,
				0x56b1,
			],
		],
		tiles: [
			[30, 31],
			[62, 63],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			paddingLeft: size / 4,
			paddingRight: size / 4,
			paddingTop: size / 4,
			paddingBottom: size / 4,
		};
		const blockStyle = { width: size / 4, height: size / 4 };

		const leftWingStyle = {
			width: size / 4,
			height: size / 4,
			left: (size / 64) * 3,
			top: (size / 64) * 3,
			transform: 'scale(-1, 1)',
		};
		const rightWingStyle = {
			width: size / 4,
			height: size / 4,
			right: (size / 64) * 3,
			top: (size / 64) * 3,
		};

		return (
			<div className="relative flex flex-row" style={style}>
				<div
					className="WingedPlatformBlock-bg bg-cover bg-no-repeat"
					style={blockStyle}
				/>
				<div
					className="WingedPlatformBlock-bg bg-cover bg-no-repeat"
					style={blockStyle}
				/>
				<div
					className="absolute WingedPlatformWing-bg bg-cover bg-no-repeat"
					style={leftWingStyle}
				/>
				<div
					className="absolute WingedPlatformWing-bg bg-cover bg-no-repeat"
					style={rightWingStyle}
				/>
			</div>
		);
	},

	render() {
		const width = TILE_SIZE * 2;
		const height = TILE_SIZE;

		const style = { width, height, marginTop: 2 };
		const blockStyle = { width: width / 2, height };

		const leftWingStyle = {
			width: width / 2,
			height,
			left: -(((width / 2) * 14) / 16),
			top: -((height * 11) / 16),
			transform: 'scale(-1, 1)',
		};
		const rightWingStyle = {
			width: width / 2,
			height,
			right: -(((width / 2) * 14) / 16),
			top: -((height * 11) / 16),
		};

		return (
			<div className="relative flex flex-row" style={style}>
				<div className="WingedPlatformBlock-bg" style={blockStyle} />
				<div className="WingedPlatformBlock-bg" style={blockStyle} />
				<div className="absolute" style={{ ...blockStyle, top: -2 }}>
					<TileSpace />
				</div>
				<div className="absolute WingedPlatformWing-bg" style={leftWingStyle} />
				<div
					className="absolute WingedPlatformWing-bg"
					style={rightWingStyle}
				/>
			</div>
		);
	},
};

export { WingedPlatform };
