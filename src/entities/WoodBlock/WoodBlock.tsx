import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { PayloadViewDetails } from '../detailPanes/PayloadViewDetails';
import { EntityType } from '../entityMap';
import { ResourceType } from '../../resources/resourceMap';
import { PayloadEditDetails } from '../detailPanes/PayloadEditDetails';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const WoodBlock: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Wood Block',
	},

	// TODO: some alternate palettes available in some other object set groups
	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	settingsType: 'single',
	dimensions: 'xy',
	defaultSettings: {},
	objectId: 0x12,
	emptyBank: 1,
	payloadBank: 0,
	param1: 'width',
	param2: 'height',
	payloadToObjectId: {
		FireFlower: 0x24,
		Leaf: 0x25,
		StarMan: 0x26,
	},

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x17b,
			0x1a1f,
			0x329f,
			0x4b7f,
			0x2e24,
			0x46c9,
			0x634d,
			0x3192,
			0x1636,
			0x2a9c,
			0x42ff,
			0x0,
			0x0,
		],
		romOffset: 0x163768,
		tiles: [
			[636, 638],
			[637, 639],
		],
	},

	toObjectBinary(x, y, w, h, settings) {
		const payloadToObjectId = this.payloadToObjectId!;

		if (settings.payload in payloadToObjectId) {
			// if there is a payload then need to split this up into individual brick objects

			let binaries: number[] = [];
			const objectId = payloadToObjectId[
				settings.payload as keyof typeof payloadToObjectId
			]!;

			for (let by = 0; by < h + 1; ++by) {
				for (let bx = 0; bx < w + 1; ++bx) {
					binaries = binaries.concat([0, y + by, x + bx, objectId]);
				}
			}

			return binaries;
		} else {
			return [getBankParam1(1, w), y, x, this.objectId, h];
		}
	},

	simpleRender(size) {
		return (
			<div
				className="WoodBlock-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const body = (
			<div
				className="WoodBlock-bg bg-cover relative cursor-pointer"
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
			>
				<PayloadViewDetails payload={settings.payload} />
			</div>
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
					canClear
				>
					{body}
				</PayloadEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { WoodBlock };
