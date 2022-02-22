import type { Entity } from './types';
import { encodeObjectSets, parseSimpleObject } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const TanMetalBricksSmallPyramid: Entity = {
	experimental: true,
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-desert',
		title: 'Tan Metal Brick - Pyramid',
		warning:
			'This is a really big pyramid, but it easily gets "cut off". You should test your level to ensure it is doing what you expect.',
	},

	objectSets: encodeObjectSets([[9, 9]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x41,
	emptyBank: 0,
	width: 12,
	height: 6,

	toObjectBinary({ x, y }) {
		return [0x40, y, x + 4, this.objectId];
	},

	parseObject(data, offset) {
		const result = parseSimpleObject(data, offset, 0, this);

		if (result) {
			const entity = result.entities[0];
			const patchedEntity = {
				...entity,
				x: entity.x - 4,
			};

			return {
				...result,
				entities: [patchedEntity],
			};
		}
	},

	simpleRender(size) {
		const brickStyle = {
			width: size / 2,
			height: size / 4,
		};

		return (
			<div
				className="flex flex-col justify-center items-center"
				style={{
					width: size,
					height: size,
				}}
			>
				<div className="flex flex-row items-center justify-center">
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
				</div>
				<div className="flex flex-row items-center justify-center">
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
				</div>
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 16,
			height: TILE_SIZE * 8,
		};

		const brickStyle = {
			width: TILE_SIZE * 4,
			height: TILE_SIZE * 2,
		};

		return (
			<div
				className="relative flex flex-col justify-center items-center"
				style={style}
			>
				<TileSpace className="absolute top-0 left-0 w-full h-full" />
				<div className="flex flex-row items-center justify-center">
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
				</div>
				<div className="flex flex-row items-center justify-center">
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
				</div>
				<div className="flex flex-row items-center justify-center">
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
				</div>
				<div className="flex flex-row items-center justify-center">
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
					<div style={brickStyle} className="TanMetalBrickSmall-bg bg-cover" />
				</div>
			</div>
		);
	},
};

export { TanMetalBricksSmallPyramid };
