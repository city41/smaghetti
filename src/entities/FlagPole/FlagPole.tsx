import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { encodeObjectSets, getBankParam1 } from '../util';
import { objectSets } from './objectSets';
import { TileSpace } from '../TileSpace';
import { Resizer } from '../../components/Resizer';

const MIN_HEIGHT = 3;
// six bits of space for height, plus 3, with one more buffer for safety
const MAX_HEIGHT = 65;

const FlagPole: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Flag Pole',
		description: "These are just for fun, they don't finish the level",
	},
	width: 1,

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0x13],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x1c,
	settingsType: 'single',
	defaultSettings: { height: MIN_HEIGHT + 1 },

	resource: {
		romOffset: 0x18c914,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x26b,
				0x1b10,
				0x13b4,
				0x25fd,
				0x369e,
				0x475f,
				0x1abf,
				0x1c,
				0x253f,
				0x463f,
				0x7ad1,
				0x6e2c,
				0x59a6,
			],
		],
		tiles: [
			[784, 785],
			[816, 817],
		],
	},

	toSpriteBinary(x, y) {
		return [1, this.objectId, x, y + 1];
	},

	toObjectBinary(x, y, _w, _h, settings) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		return [
			getBankParam1(1, Math.min(Math.max(height, MIN_HEIGHT), MAX_HEIGHT) - 3),
			y,
			x,
			0x7f,
		];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundPositionX: 4,
		};

		const poleStyle = {
			width: 4,
			height: '100%',
		};

		const ballStyle = {
			width: size / 2,
			height: size / 2,
			top: -size / 2,
			left: -size / 4,
		};

		return (
			<div className="relative FlagPole-bg bg-cover" style={style}>
				<div className="absolute top-0 left-0 bg-white" style={poleStyle} />
				<div
					className="absolute FlagPoleBall-bg bg-cover bg-center"
					style={ballStyle}
				/>
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * height,
		};

		const ballStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionY: TILE_SIZE / 2,
		};

		const flagStyle = {
			left: TILE_SIZE / 2,
			top: TILE_SIZE,
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const shaftStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE * (height - 2),
		};

		const baseStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const size = { x: 1, y: height };

		return (
			<div style={style} className="relative flex flex-col">
				<div className="absolute top-0 left-0 w-full h-full">
					<TileSpace />
				</div>
				<div className="FlagPoleBall-bg bg-no-repeat" style={ballStyle} />
				<div className="absolute FlagPole-bg" style={flagStyle} />
				<div className="FlagPoleShaft-bg bg-repeat-y" style={shaftStyle} />
				<div className="IndestructibleBrick-bg bg-cover" style={baseStyle} />
				{entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="y"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({
								height: Math.min(
									Math.max(MIN_HEIGHT, newSizePoint.y),
									MAX_HEIGHT
								),
							});
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { FlagPole };
