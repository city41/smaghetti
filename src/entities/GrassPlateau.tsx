import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Plateau } from '../components/Plateau';

const GrassPlateau: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-large',
		title: 'Grass Plateau',
	},

	objectSets: encodeObjectSets([
		[4, 11],
		[4, 4],
		[12, 11],
		[12, 4],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 3 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x5,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				26019,
				31371,
				32622,
				32726,
				5524,
				11833,
				17085,
				10793,
				15021,
				18225,
				22452,
				8663,
				14971,
			],
		],
		tiles: [
			[160, 161, 162, 163, 164, 165],
			[176, 177, 178, 179, 180, 181],
			[166, 167, 168, 167, 168, 169],
			[182, 183, 167, 183, 167, 185],
		],
		romOffset: 1584308,
	},

	toObjectBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="GrassPlateau-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: `100% ${(4 / 6) * 100}%`,
				}}
			/>
		);
	},

	render({ settings, onSettingsChange, entity, room }) {
		return (
			<Plateau
				bgClassName="GrassPlateau-bg"
				settings={settings}
				entity={entity}
				room={room}
				onSettingsChange={onSettingsChange}
			/>
		);
	},
};

export { GrassPlateau };
