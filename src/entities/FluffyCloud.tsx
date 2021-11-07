import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseCellObjectsParam1Width,
} from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';
import { Resizer } from '../components/Resizer';

const FluffyCloud: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'Fluffy Cloud',
	},

	objectSets: encodeObjectSets([
		[4, 12],
		[12, 12],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',

	defaultSettings: { width: 3 },
	param1: 'width',
	objectId: 0xb,
	emptyBank: 1,
	height: 2,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x65a3,
				0x7a8b,
				0x7f6e,
				0x7fd6,
				0x1594,
				0x2e39,
				0x42bd,
				0x11,
				0x16,
				0x1a,
				0xdbe,
				0x123f,
				0x2bf,
			],
		],
		romOffset: 0x163768,
		tiles: [
			[520, 552, 553, 520],
			[
				554,
				{ romOffset: 0x131fe0, tileIndex: 44 },
				{ romOffset: 0x131fe0, tileIndex: 44 },
				555,
			],
			[556, 557, 558, 559],
		],
	},

	toObjectBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseCellObjectsParam1Width(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 75%' };
		return (
			<div className="FluffyCloud-bg bg-no-repeat bg-center" style={style} />
		);
	},

	render({ settings, onSettingsChange }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			width: TILE_SIZE * width,
			height: TILE_SIZE * 2,
			paddingLeft: TILE_SIZE * 0.5,
			paddingRight: TILE_SIZE * 0.5,
			paddingBottom: TILE_SIZE * 0.5,
		};

		const sideStyle = {
			width: TILE_SIZE * 0.5,
			height: TILE_SIZE * 1.5,
		};

		const centerStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE * 1.5,
			backgroundPositionX: -TILE_SIZE * 0.5,
		};

		const rightSideStyle = {
			...sideStyle,
			backgroundPositionX: -TILE_SIZE * 1.5,
		};

		const size = { x: width, y: 1 };

		const centers = [];

		for (let c = 0; c < width - 2; ++c) {
			centers.push(
				<div style={centerStyle} className="FluffyCloud-bg bg-no-repeat" />
			);
		}

		return (
			<div style={style} className="relative flex flex-row">
				<TileSpace className="absolute top-0 left-0 w-full h-full" />
				<Resizer
					className="absolute bottom-0 right-0"
					style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
					size={size}
					increment={TILE_SIZE}
					axis="x"
					onSizeChange={(newSizePoint) => {
						onSettingsChange({ width: Math.max(1, newSizePoint.x) });
					}}
					onResizeStart={() => onSettingsChange({ resizing: true })}
					onResizeEnd={() => onSettingsChange({ resizing: false })}
				/>
				<div style={sideStyle} className="FluffyCloud-bg bg-no-repeat" />
				{centers}
				<div style={rightSideStyle} className="FluffyCloud-bg bg-no-repeat" />
			</div>
		);
	},
};

export { FluffyCloud };
