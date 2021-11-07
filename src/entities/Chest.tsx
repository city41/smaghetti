import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { PayloadEditDetails } from './detailPanes/PayloadEditDetails';
import { PayloadViewDetails } from './detailPanes/PayloadViewDetails';
import { ResourceType } from '../resources/resourceMap';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';
import invert from 'lodash/invert';

const payloadToObjectId = {
	Mushroom: 1,
	FireFlower: 2,
	Leaf: 3,
	FrogSuit: 4,
	TanookiSuit: 5,
	HammerBroSuit: 6,
	LakituCloud: 7,
	PWing: 8,
	StarMan: 9,
	// Anchor: 0xa,
	// Hammer: 0xb,
	// Flute: 0xc,
	MusicBox: 0xd,
	CapeFeather: 0xe,
	Boomerang: 0xf,
	OneUpMushroom: 0x10, // note this is not a 1up mushroom, just an immediate 1up
	ThreeUpMoon: 0x11, // note this is not a 3up moon, just an immediate 3up
};

const objectIdToPayload = invert(payloadToObjectId) as Record<
	number,
	ResourceType
>;

const Chest: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Chest',
		description: 'Collecting a chest ends the level',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 0, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	defaultSettings: { payload: 'Mushroom' },
	objectId: 0x8,
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
		romOffset: 0x163768,
		tiles: [
			[357, 358],
			[373, 374],
		],
	},

	toSpriteBinary({ x, y, settings }) {
		const payloadToObjectId = this.payloadToObjectId!;
		const payload = (settings.payload ??
			this.defaultSettings!.payload) as keyof typeof payloadToObjectId;

		const payloadId = payloadToObjectId[payload];

		return [1, this.objectId, x, y, payloadId!];
	},

	parseSprite(data, offset) {
		const result = parseSimpleSprite(data, offset, 1, this);

		if (result) {
			const payload = objectIdToPayload[result.offset];

			return {
				...result,
				entity: {
					...result.entity,
					settings: { payload },
				},
				offset: result.offset + 1,
			};
		}
	},

	simpleRender(size) {
		return (
			<div
				className="Chest-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ showDetails, settings, onSettingsChange }) {
		const body = (
			<div
				className="Chest-bg bg-cover relative cursor-pointer"
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
				>
					{body}
				</PayloadEditDetails>
			);
		} else {
			return body;
		}
	},

	getProblem({ room }) {
		const chests = room.actors.entities.filter((e) => e.type === 'Chest');
		const firstChestPayload = chests[0].settings!.payload as EntityType;

		if (
			chests.length > 1 &&
			!chests.every((cc) => cc.settings!.payload === firstChestPayload)
		) {
			return 'All chests in the same room should have the same item';
		}
	},
};

export { Chest };
