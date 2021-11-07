import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSpriteWithNumericByteParam } from './util';
import { NumberPicker } from './detailPanes/NumberPicker';

const BooChooseSpeed: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-fortress',
		title: 'Boo - Choose its speed',
		description: 'Like a normal Boo, but you can choose how fast it pursues',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[6, 8], -1, -1, -1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x2a,

	defaultSettings: { speed: 10 },

	toSpriteBinary({ x, y, settings }) {
		const speed = (settings.speed ?? this.defaultSettings!.speed) as number;
		return [1, this.objectId, x, y, speed];
	},

	parseSprite(data, offset) {
		return parseSimpleSpriteWithNumericByteParam(
			data,
			offset,
			1,
			this,
			'speed'
		);
	},

	simpleRender(size) {
		return (
			<div
				className="relative Boo-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					speed
				</div>
			</div>
		);
	},

	render({ settings, onSettingsChange }) {
		const width = TILE_SIZE;
		const height = TILE_SIZE;

		return (
			<div className="relative Boo-bg bg-cover" style={{ width, height }}>
				<NumberPicker
					className="absolute bottom-0 left-0 w-full"
					min={0}
					max={0xff}
					value={settings.speed}
					onValueChange={(newSpeed) => {
						onSettingsChange({ speed: newSpeed });
					}}
				/>
			</div>
		);
	},
};

export { BooChooseSpeed };
