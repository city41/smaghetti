import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets, parseSimpleSprite } from './util';
import { TileSpace } from './TileSpace';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';
import { clamp } from 'lodash';

const MAX_HEIGHT = 6;

const BoomBoomTrap: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Boom Boom - Trap',
		description: 'Traps Mario in a room with Boom Boom',
	},

	objectSets: encodeObjectSets([[2, 2]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x23,
	width: 1,
	height: 3,
	defaultSettings: {
		height: 3,
	},

	resources: {
		BoomBoomTrapPoof: {
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
				[388, 389],
				[420, 421],
			],
		},
	},

	toSpriteBinary({ x, y, settings }) {
		const height = (settings?.height ?? this.defaultSettings!.height) as number;
		return [1, this.objectId, x, y, Math.max(height - 2, 0)];
	},

	parseSprite(data, offset) {
		const result = parseSimpleSprite(data, offset, 0, this);

		if (result) {
			const heightByte = data[offset + 4];
			return {
				entity: {
					...result.entity,
					settings: {
						height: Math.min(heightByte, MAX_HEIGHT - 2) + 2,
					},
				},

				offset: result.offset + 1,
			};
		}
	},

	simpleRender(size) {
		return (
			<div
				className="BoomBoomTrapPoof-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ entity, settings, onSettingsChange }) {
		const height = (settings?.height ?? this.defaultSettings!.height) as number;

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * height,
		};

		const cellStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const bricks = [];

		for (let i = 0; i < height - 2; ++i) {
			bricks.push(
				<div
					key={i}
					style={cellStyle}
					className="FortressBrick-bg bg-cover opacity-50"
				/>
			);
		}

		const poof = (
			<div style={cellStyle} className="BoomBoomTrapPoof-bg bg-cover" />
		);

		const size = { x: 1, y: height };

		return (
			<div style={style} className="relative flex flex-col">
				{bricks}
				{poof}
				<TileSpace style={style} className="absolute top-0 left-0" />
				{entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="y"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({
								height: clamp(newSizePoint.y, 2, MAX_HEIGHT),
							});
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},

	getProblem({ room }) {
		const traps = room.actors.entities.filter((e) => e.type === 'BoomBoomTrap');

		if (traps.length > 1) {
			return 'Only one trap can be set per room';
		}

		const boomBooms = room.actors.entities.filter((e) => e.type === 'BoomBoom');

		if (boomBooms.length === 0) {
			return 'Will only work with a Boom Boom in the room';
		}
	},
};

export { BoomBoomTrap };
