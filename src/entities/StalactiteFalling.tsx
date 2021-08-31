import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { HammerButton } from './detailPanes/HammerButton';

const falls = ['left', 'right'] as const;
type Fall = typeof falls[number];

const fallToParam: Record<Fall, number> = {
	left: 0,
	right: 1,
};

const StalactiteFalling: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Stalactite - Falling',
		description: 'Falls as Mario gets near',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xd3,
	settingsType: 'single',
	defaultSettings: { fall: 'left' },

	resources: {
		StalactiteFallingStationary: {
			romOffset: 0x16ea40,
			palettes: [
				[
					0x7f96,
					0x7fff,
					0x0,
					0x520c,
					0x6270,
					0x72f3,
					0x7b77,
					0x1f4,
					0x29a,
					0x37f,
					0x7e93,
					0x7f17,
					0x7fbc,
					0x7ffe,
					0x1df,
					0x31f,
				],
			],
			tiles: [[122], [123]],
		},
		StalactiteFallingLoose: {
			romOffset: 0x18af80,
			palettes: [
				[
					0x7ffb,
					0x7fff,
					0x0,
					0x579f,
					0x6fff,
					0x6b5a,
					0x4631,
					0x5ad6,
					0x77bd,
					0x112,
					0x5a1f,
					0x6ebf,
					0x7f9f,
					0x465f,
					0x1f,
					0x19,
				],
			],
			tiles: [[326], [358]],
		},
	},

	toSpriteBinary({ x, y, settings }) {
		const fall = (settings.fall ?? this.defaultSettings!.fall) as Fall;
		const fallValue = fallToParam[fall];

		return [0, this.objectId, x, y, fallValue];
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const leftStyle = {
			width: size / 2,
			height: size,
			top: size / 10,
			left: 0,
		};
		const rightStyle = {
			width: size / 2,
			height: size,
			top: 0,
			left: size / 2,
		};

		return (
			<div style={style} className="relative">
				<div
					style={leftStyle}
					className="absolute StalactiteFallingLoose-bg bg-cover"
				/>
				<div
					style={rightStyle}
					className="absolute StalactiteFallingStationary-bg bg-cover"
				/>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const fall = (settings.fall ?? this.defaultSettings!.fall) as Fall;

		const style = { width: TILE_SIZE, height: TILE_SIZE };

		const leftStalactiteStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE,
			left: 0,
			top: fall === 'left' ? 3 : 0,
		};
		const rightStalactiteStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE,
			left: TILE_SIZE / 2,
			top: fall === 'right' ? 3 : 0,
		};

		return (
			<div style={style} className="relative">
				<div
					style={leftStalactiteStyle}
					className={clsx('absolute bg-cover', {
						'StalactiteFallingLoose-bg': fall === 'left',
						'StalactiteFallingStationary-bg': fall === 'right',
					})}
				/>
				<div
					style={rightStalactiteStyle}
					className={clsx('absolute bg-cover', {
						'StalactiteFallingLoose-bg': fall === 'right',
						'StalactiteFallingStationary-bg': fall === 'left',
					})}
				/>
				{!!entity && (
					<HammerButton
						currentValue={fall}
						values={falls}
						onNewValue={(newFall) => {
							onSettingsChange({ fall: newFall });
						}}
					/>
				)}
			</div>
		);
	},
};

export { StalactiteFalling };
