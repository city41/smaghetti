import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';
import { ANY_OBJECT_SET } from './constants';
import { ResourceType } from '../resources/resourceMap';
import { PayloadViewDetails } from './detailPanes/PayloadViewDetails';
import { PayloadEditDetails } from './detailPanes/PayloadEditDetails';
import invert from 'lodash/invert';
import { parseSimpleSpriteWithByteParam } from './util';

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const payloadToObjectId = {
	GreenSpinyEgg: 1,
	OrangeSpinyEgg: 0,
};

const objectIdToPayload = invert(payloadToObjectId) as Record<
	number,
	ResourceType
>;

const Lakitu: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Lakitu',
		description: "Dammit, it's lakitu...",
	},

	payloadToObjectId,
	defaultSettings: { payload: 'OrangeSpinyEgg' },

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		-1,
		graphicSets,
		graphicSets,
		graphicSets,
	],
	objectId: 0x1f,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x11dc,
				0x169e,
				0x1b5f,
				0x25fd,
				0x369e,
				0x475f,
				0x111d,
				0x1a1f,
				0x329f,
				0x4b7f,
				0x7bda,
				0x6b55,
				0x56b1,
			],
		],
		tiles: [
			[
				{ romOffset: 0x163768, tileIndex: 718 },
				{ romOffset: 0x163768, tileIndex: 718, flip: 'h' },
			],
			[
				{ romOffset: 0x163768, tileIndex: 734 },
				{ romOffset: 0x163768, tileIndex: 734, flip: 'h' },
			],
			[
				{ romOffset: 0x163768, tileIndex: 719 },
				{ romOffset: 0x163768, tileIndex: 719, flip: 'h' },
			],
			[
				{ romOffset: 0x163768, tileIndex: 735 },
				{ romOffset: 0x163768, tileIndex: 735, flip: 'h' },
			],
		],
	},

	toSpriteBinary({ x, y, settings }) {
		const payload = (settings.payload ??
			this.defaultSettings!.payload) as ResourceType;
		const eggId = payloadToObjectId[payload as keyof typeof payloadToObjectId]!;
		return [1, this.objectId, x, y, eggId];
	},

	parseSprite(data, offset) {
		return parseSimpleSpriteWithByteParam(
			data,
			offset,
			1,
			this,
			objectIdToPayload,
			'payload'
		);
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
		};

		return <div className="Lakitu-bg bg-center bg-no-repeat" style={style} />;
	},

	render({ showDetails, settings, onSettingsChange }) {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
			marginTop: -TILE_SIZE,
			paddingTop: TILE_SIZE,
		};

		const body = (
			<div className="Lakitu-bg bg-cover relative cursor-pointer" style={style}>
				<TileSpace />
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
};

export { Lakitu };
