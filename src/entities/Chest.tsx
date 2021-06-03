import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { PayloadEditDetails } from './detailPanes/PayloadEditDetails';
import { PayloadViewDetails } from './detailPanes/PayloadViewDetails';
import { ResourceType } from '../resources/resourceMap';
import { EntityType } from './entityMap';
import { ANY_OBJECT_SET } from './constants';

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const Chest: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Chest',
		description: 'Collecting a chest ends the level',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		graphicSets,
		graphicSets,
		-1,
		graphicSets,
	],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { payload: 'Mushroom' },
	objectId: 0x8,
	payloadToObjectId: {
		Mushroom: 1,
		FireFlower: 2,
		FrogSuit: 4,
		TanookiSuit: 5,
		//HammerBrosSuit: 6
		LakituCloud: 7,
		PWing: 8,
		StarMan: 9,
		// Anchor: 0xa,
		// Hammer: 0xb,
		// Flute: 0xc,
		// MusicBox: 0xd,
		CapeFeather: 0xe,
		Boomerang: 0xf,
		// OneUp: 0x10 // note this is not a 1up mushroom, just an immediate 1up
		// ThreeUp: 0x11 // note this is not a 3up moon, just an immediate 3up
	},

	resource: {
		palette: [
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
		romOffset: 0x163768,
		tiles: [
			[357, 358],
			[373, 374],
		],
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		const payloadToObjectId = this.payloadToObjectId!;

		if (settings.payload in payloadToObjectId) {
			const payloadId =
				payloadToObjectId[settings.payload as keyof typeof payloadToObjectId];

			return [1, this.objectId, x, y, payloadId!];
		} else {
			return [1, this.objectId, x, y];
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

	render(showDetails, settings, onSettingsChange) {
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

export { Chest };
