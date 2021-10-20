import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';

const HoppingBowserStatue: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Hopping Bowser Statue',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xc],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xf,
	emptyBank: 0,

	toSpriteBinary({ x, y }) {
		// fifth byte drives behavior
		// 0 - just a statue
		// 1 - statute that shoots fire
		// 2 - hops and attacks
		return [0, this.objectId, x, y, 2];
	},

	parseSprite(data, offset) {
		const result = parseSimpleSprite(data, offset, 0, this);

		if (result && data[result.offset] === 2) {
			return {
				...result,
				offset: result.offset + 1,
			};
		}
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		const headStyle = {
			width: (size * 2) / 3,
			height: (size * 2) / 3,
		};

		return (
			<div className="relative" style={style}>
				<div
					className="absolute HoppingBowserStatueHead-bg bg-cover bg-no-repeat"
					style={headStyle}
				/>
				<div
					className="absolute HoppingBowserStatueBody-bg bg-cover bg-no-repeat right-0 bottom-0"
					style={headStyle}
				/>
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 1.5,
			height: TILE_SIZE * 1.5,
			marginTop: TILE_SIZE / 2,
			marginLeft: -TILE_SIZE / 2,
		};

		const headStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: -TILE_SIZE / 2,
			left: TILE_SIZE / 2,
		};

		return (
			<div className="relative" style={style}>
				<div
					className="absolute HoppingBowserStatueHead-bg bg-cover bg-no-repeat"
					style={headStyle}
				/>
				<div
					className="absolute HoppingBowserStatueBody-bg bg-cover bg-no-repeat right-0 bottom-0"
					style={headStyle}
				/>
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { HoppingBowserStatue };
