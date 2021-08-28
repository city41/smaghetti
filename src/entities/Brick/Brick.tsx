import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1, parseParamFromBank } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { PayloadViewDetails } from '../detailPanes/PayloadViewDetails';
import { ResourceType } from '../../resources/resourceMap';
import { PayloadEditDetails } from '../detailPanes/PayloadEditDetails';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import invert from 'lodash/invert';

const payloadToObjectId = {
	Coin: 0x19,
	CoinCache: 0x1a,
	FireFlower: 0x16,
	Leaf: 0x17,
	OneUpMushroom: 0x1b,
	StarMan: 0x18,
	PSwitch: 0x1d,
	ClimbingVineHead: 0x1c,
};

const objectIdToPayload = invert(payloadToObjectId);

const Brick: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Brick',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	settingsType: 'single',
	dimensions: 'xy',
	objectId: 0xf,
	payloadToObjectId,
	param1: 'width',
	param2: 'height',
	payloadBank: 0,
	emptyBank: 1,

	resource: {
		romOffset: 0x131fe0,
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x209,
				0x228e,
				0x3732,
				0x47b7,
				0x1f4,
				0x29a,
				0x37f,
				0x15,
				0xd9d,
				0x2bf,
				0x3600,
				0x4aa5,
				0x5b29,
			],
		],
		tiles: [
			[308, 310],
			[309, 311],
		],
	},

	toObjectBinary({ x, y, w, h, settings }) {
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
				className="Brick-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ showDetails, settings, onSettingsChange }) {
		const body = (
			<div
				className="Brick-bg bg-cover relative cursor-pointer"
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

	parseObject(data, offset) {
		if (data[offset] === 0) {
			const matchingPayloadId = Object.values(payloadToObjectId).find(
				(payloadId) => {
					return payloadId === data[offset + 3];
				}
			);

			if (matchingPayloadId) {
				const y = data[offset + 1];
				const x = data[offset + 2];

				return {
					entities: [
						{
							type: 'Brick',
							x,
							y,
							settings: {
								payload: objectIdToPayload[matchingPayloadId],
							},
						},
					],
					offset: offset + 4,
				};
			}
		} else if (data[offset] >= 0x40 && data[offset + 3] === this.objectId) {
			const width = parseParamFromBank(data[offset++]);
			const y = data[offset++];
			const x = data[offset++];
			offset += 1; // move past objectId
			const height = data[offset++];

			const entities = [];

			for (let h = 0; h <= height; ++h) {
				for (let w = 0; w <= width; ++w) {
					entities.push({
						type: 'Brick',
						x: x + w,
						y: y + h,
					} as const);
				}

				return { entities, offset };
			}
		}
	},
};

export { Brick };
