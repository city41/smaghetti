import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const dotPositions: Point[] = [
	{ x: 2, y: 59 },
	{ x: 0, y: 87 },
	{ x: 17, y: 78 },
	{ x: 24, y: 84 },
	{ x: 30, y: 89 },
	{ x: 31, y: 80 },
	{ x: 40, y: 82 },
	{ x: 45, y: 60 },
	{ x: 45, y: 86 },
	{ x: 1, y: 20 },
	{ x: 44, y: 35 },
];

const UpwardWaterCurrentNarrow: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Upward Water Current - Narrow',
		description:
			'Usually placed at the mouth of an underwater pipe to cause an upward water pressure',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x65,

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		const dotStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
		};

		const scale = size / (TILE_SIZE * 7);

		return (
			<div
				className="relative bg-blue-700 rounded-lg overflow-hidden"
				style={style}
			>
				{dotPositions.map((p, i) => (
					<div
						key={i}
						className="absolute bg-cover Tornado-bg"
						style={{
							...dotStyle,
							top: p.y * scale,
							left: size / 4 + p.x * scale,
						}}
					/>
				))}
			</div>
		);
	},

	render() {
		const style = {
			width: 2 * TILE_SIZE,
			height: 4 * TILE_SIZE,
		};

		const dotStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE / 2,
		};

		const tileSpaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		return (
			<div className="relative" style={style}>
				{dotPositions.map((p, i) => (
					<div
						key={i}
						className="absolute bg-cover Tornado-bg"
						style={{
							...dotStyle,
							top: -(style.height - (p.y / 100) * style.height - TILE_SIZE),
							left: (p.x / 50) * style.width,
						}}
					/>
				))}
				<div className="absolute top-0 left-0" style={tileSpaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { UpwardWaterCurrentNarrow };
