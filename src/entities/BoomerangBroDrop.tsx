import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const BoomerangBroDrop: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-bro',
		title: 'Boomerang Bro - Drops Boomerang',
		description: 'Once defeated, his boomerang becomes a weapon Mario can use',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x19,

	toSpriteBinary({ x, y }) {
		return [1, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 1, this);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '66% 100%',
		};

		const boomerangStyle = {
			width: size / 2,
			height: size / 2,
		};

		return (
			<div
				className="relative BoomerangBro-bg bg-center bg-no-repeat"
				style={style}
			>
				<div
					className="absolute -left-2 bottom-0 Boomerang-bg bg-cover"
					style={boomerangStyle}
				/>
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 1.5,
			backgroundSize: '100%',
			marginTop: TILE_SIZE / 2,
			paddingTop: TILE_SIZE / 2,
		};

		return (
			<div
				className="relative BoomerangBro-bg bg-center bg-no-repeat"
				style={style}
			>
				<TileSpace
					className="w-full h-full"
					style={{ marginTop: -TILE_SIZE }}
				/>
				<div
					className="absolute left-0 bottom-0 Boomerang-bg bg-cover bg-gray-800"
					style={{
						width: TILE_SIZE / 2,
						height: TILE_SIZE / 2,
						borderRadius: '10%',
					}}
				/>
			</div>
		);
	},
};

export { BoomerangBroDrop };
