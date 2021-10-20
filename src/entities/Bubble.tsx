import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { PayloadViewDetails } from './detailPanes/PayloadViewDetails';
import { ResourceType } from '../resources/resourceMap';
import { PayloadEditDetails } from './detailPanes/PayloadEditDetails';
import { ANY_OBJECT_SET } from './constants';
import invert from 'lodash/invert';

const graphicSets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const payloadToObjectId = {
	OneUpMushroom: 0,
	Mushroom: 1,
	FireFlower: 2,
	Leaf: 3,
	StarMan: 4,
	TanookiSuit: 5,
	FrogSuit: 6,
	HammerBroSuit: 7,
	Shoe: 8,
	// 9 is half of an ace coin? seems like a bug
	Boomerang: 10,
	// 11 is the other half of an ace coin?
	// 12 is some kind of wing?
	Key: 13,
	SpringBoard: 14,
	AceCoin: 15,
	// 16 is some kind of lettering? possibly need a diff graphic set
};

const objectIdToPayload = invert(payloadToObjectId) as Record<
	number,
	ResourceType
>;

const Bubble: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Bubble',
		description:
			'A cool SMA4 exclusive. Throw vegetables at it three times to release the item.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		graphicSets,
		graphicSets,
		[0],
		graphicSets,
	],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xdb,
	defaultSettings: { payload: 'Mushroom' },
	width: 2,
	height: 2,

	payloadToObjectId,

	resource: {
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
		romOffset: 0x18af80,
		tiles: [
			[134, 135, 136, 137],
			[166, 167, 168, 169],
			[198, 199, 200, 201],
			[230, 231, 232, 233],
		],
	},

	toSpriteBinary({ x, y, settings }) {
		const payloadToObjectId = this.payloadToObjectId!;

		const payloadId = payloadToObjectId[
			settings.payload as keyof typeof payloadToObjectId
		]!;
		return [0, this.objectId, x, y, payloadId, 0];
	},

	parseSprite(data, offset) {
		if (
			data[offset] === 0 &&
			data[offset + 1] === this.objectId &&
			data[offset + 5] === 0
		) {
			const x = data[offset + 2] * TILE_SIZE;
			const y = data[offset + 3] * TILE_SIZE;
			const payloadId = data[offset + 4];
			const payload = objectIdToPayload[payloadId];

			return {
				entity: {
					type: 'Bubble',
					x,
					y,
					settings: {
						payload,
					},
				},
				offset: offset + 6,
			};
		}
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '92%',
		};

		return <div className="Bubble-bg bg-center bg-no-repeat" style={style} />;
	},

	render({ showDetails, settings, onSettingsChange }) {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
			backgroundSize: '100%',
			paddingBottom: TILE_SIZE,
			paddingRight: TILE_SIZE,
		};

		const body = (
			<div className="Bubble-bg bg-cover relative cursor-pointer" style={style}>
				<TileSpace />
				<PayloadViewDetails
					className="bottom-3 right-3"
					payload={settings.payload ?? this.defaultSettings!.payload}
				/>
			</div>
		);

		if (showDetails) {
			const payloads = Object.keys(this.payloadToObjectId!) as Array<
				EntityType | ResourceType
			>;

			return (
				<PayloadEditDetails
					width={TILE_SIZE * 2}
					height={TILE_SIZE * 2}
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

export { Bubble };
