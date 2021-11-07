import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from './constants';
import { HammerButton } from './detailPanes/HammerButton';
import { parseSimpleObject } from './util';

const sides = ['left', 'right'] as const;
type Side = typeof sides[number];

const sideToObjectId: Record<Side, number> = {
	left: 0x49,
	right: 0x48,
};

const StalactiteSingle: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-damaging',
		title: 'Stalactite - Single',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0x49,
	alternateObjectIds: Object.values(sideToObjectId),
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'x',
	emptyBank: 1,
	param1: 'width',

	defaultSettings: { side: 'left' },

	resource: {
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
		romOffset: 0x16ea40,
		tiles: [[122], [123]],
	},

	toObjectBinary({ x, y, settings }) {
		const side = (settings.side ?? this.defaultSettings!.side) as Side;
		const objectId = sideToObjectId[side];

		return [0, y, x, objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="StalactiteSingle-bg bg-no-repeat"
				style={{ width: size, height: size, backgroundSize: '50% 100%' }}
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const side = (settings.side ?? this.defaultSettings!.side) as Side;

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionX: side,
			backgroundSize: '50% 100%',
		};

		return (
			<div style={style} className="StalactiteSingle-bg bg-no-repeat">
				{!!entity && (
					<HammerButton
						currentValue={side}
						values={sides}
						onNewValue={(newSide) => {
							onSettingsChange({ side: newSide });
						}}
					/>
				)}
			</div>
		);
	},
};

export { StalactiteSingle };
