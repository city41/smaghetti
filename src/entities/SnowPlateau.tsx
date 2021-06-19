import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

import { Plateau } from '../components/Plateau';

const SnowPlateau: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-winter',
		title: 'Snow Plateau',
	},

	objectSets: encodeObjectSets([[12, 12]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 3 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x6,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				19948,
				24144,
				28371,
				31575,
				500,
				666,
				895,
				27057,
				30390,
				32729,
				26617,
				32317,
				32607,
			],
		],
		tiles: [
			[512, 513, 536, 513, 536, 537],
			[528, 529, 552, 529, 552, 553],
			[528, 529, 552, 529, 552, 553],
			[528, 529, 552, 529, 552, 553],
		],
		romOffset: 1472116,
	},

	toObjectBinary(x, y, _w, _h, settings) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="SnowPlateau-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: `100% ${(4 / 6) * 100}%`,
				}}
			/>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity, room) {
		return (
			<Plateau
				entity={entity}
				room={room}
				settings={settings}
				onSettingsChange={onSettingsChange}
				bgClassName="SnowPlateau-bg"
			/>
		);
	},
};

export { SnowPlateau };
