import React from 'react';
import clsx from 'clsx';

import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { EntityType } from '../entityMap';
import { ResourceType } from '../../resources/resourceMap';
import { PayloadEditDetails } from '../detailPanes/PayloadEditDetails';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const NumberBlock: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Number Block',
		description:
			'If the number is greater than zero, Mario can pick it up and create a new block',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x54,
	emptyBank: 1,
	param1: 'width',
	param2: 'height',
	settingsType: 'single',
	payloadToObjectId: {
		OneNumberBlock: 0x52,
		TwoNumberBlock: 0x53,
		ThreeNumberBlock: 0x54,
	},
	defaultSettings: { payload: 'ThreeNumberBlock' },

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x15d2,
				0x2257,
				0x2afc,
				0x37be,
				0x20ba,
				0x21be,
				0x32df,
				0x3192,
				0x1636,
				0x2a9c,
				0x42ff,
			],
		],
		romOffset: 0x20e4f0,
		tiles: [
			[72, 73],
			[88, 89],
		],
	},

	toObjectBinary(x, y, w, h, settings): number[] {
		const payload = settings.payload ?? this.defaultSettings!.payload;

		const payloadId = this.payloadToObjectId![payload as EntityType];

		return [getBankParam1(1, w), y, x, payloadId!, h];
	},

	simpleRender(size) {
		return (
			<div
				className="ThreeNumberBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const payload = settings.payload ?? this.defaultSettings!.payload;

		const body = (
			<div
				className={clsx(`${payload}-bg`, 'bg-cover relative cursor-pointer')}
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
			/>
		);

		if (showDetails) {
			const payloads = Object.keys(this.payloadToObjectId!) as Array<
				EntityType | ResourceType
			>;

			return (
				<PayloadEditDetails
					width={TILE_SIZE}
					height={TILE_SIZE}
					onPayloadChange={(payload) => onSettingsChange({ payload })}
					payloads={payloads}
				>
					{body}
				</PayloadEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { NumberBlock };
