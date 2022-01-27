import React from 'react';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1WidthEntityObject,
} from './util';
import { ANY_SPRITE_GRAPHIC_SET, OBJECT_PRIORITY_HIGHEST } from './constants';
import { Plateau } from '../components/Plateau';

const StonePlateau: Entity = {
	paletteInfo: {
		title: 'Stone Plateau',
		warning: 'Often renders corrupted, more research needed',
	},

	objectSets: encodeObjectSets([[8, 6]]),
	objectPriority: OBJECT_PRIORITY_HIGHEST,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { width: 3 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x30,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				14798,
				19026,
				25368,
				30653,
				29484,
				32722,
				32763,
				5586,
				8791,
				11004,
				14270,
				0,
				0,
			],
		],
		tiles: [
			[
				{
					romOffset: 1550484,
					tileIndex: 564,
				},
				{
					romOffset: 1550484,
					tileIndex: 565,
				},
				{
					romOffset: 1550484,
					tileIndex: 566,
				},
				{
					romOffset: 1550484,
					tileIndex: 565,
				},
				{
					romOffset: 1550484,
					tileIndex: 566,
				},
				{
					romOffset: 1550484,
					tileIndex: 567,
				},
			],
			[
				{
					romOffset: 1550484,
					tileIndex: 602,
				},
				253,
				254,
				253,
				253,
				255,
			],
			[
				{
					romOffset: 1550484,
					tileIndex: 602,
				},
				238,
				237,
				238,
				237,
				239,
			],
			[
				{
					romOffset: 1550484,
					tileIndex: 603,
				},
				254,
				253,
				254,
				253,
				255,
			],
		],
		romOffset: 1584308,
	},

	toObjectBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseParam1WidthEntityObject(data, offset, this);
	},

	simpleRender(size) {
		return (
			<div
				className="StonePlateau-bg bg-center bg-no-repeat"
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
				bgClassName="StonePlateau-bg"
				settings={settings}
				entity={entity}
				room={room}
				onSettingsChange={onSettingsChange}
			/>
		);
	},
};

export { StonePlateau };
