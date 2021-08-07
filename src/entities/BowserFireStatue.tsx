import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const BowserFireStatue: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-statues',
		title: 'Bowser Fire Statue',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0xc],
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xf,
	emptyBank: 0,

	toSpriteBinary({ x, y }) {
		// fifth byte drives behavior
		// 0 - just a statue
		// 1 - statute that shoots fire
		// 2 - hops and attacks
		// TODO: allow choosing zero with a details pane
		// 2 is a separate entity, HoppingBowserStatue
		return [0, this.objectId, x, y, 1];
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
					className="absolute BowserFireStatueHead-bg bg-cover bg-no-repeat"
					style={headStyle}
				/>
				<div
					className="absolute BowserFireStatueBody-bg bg-cover bg-no-repeat right-0 bottom-0"
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
					className="absolute BowserFireStatueHead-bg bg-cover bg-no-repeat"
					style={headStyle}
				/>
				<div
					className="absolute BowserFireStatueBody-bg bg-cover bg-no-repeat right-0 bottom-0"
					style={headStyle}
				/>
				<div className="absolute" style={spaceStyle}>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { BowserFireStatue };
