import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { PayloadViewDetails } from '../detailPanes/PayloadViewDetails';
import { EntityType } from '../entityMap';
import { ResourceType } from '../../resources/resourceMap';
import { PayloadEditDetails } from '../detailPanes/PayloadEditDetails';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const MetalBrick: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-basic',
		title: 'Metal Brick',
		description: "A brick that even Super Mario can't break",
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	dimensions: 'xy',
	objectId: 0x55,
	param1: 'width',
	param2: 'height',
	payloadBank: 0,
	emptyBank: 1,

	resource: {
		romOffset: 0x20e4f0,
		palettes: [
			[
				0x23df,
				0x7fff,
				0x0,
				0x4e71,
				0x5ef5,
				0x6f79,
				0x7bdd,
				0x13,
				0x19,
				0x1f,
				0x112,
				0x5a1f,
				0x6ebf,
				0x7f9f,
				0x579f,
				0x6fff,
			],
		],
		tiles: [
			[8, 9],
			[24, 25],
		],
	},

	toObjectBinary(x, y, w, h): number[] {
		return [getBankParam1(1, w), y, x, this.objectId, h];
	},

	simpleRender(size) {
		return (
			<div
				className="MetalBrick-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const body = (
			<div
				className="MetalBrick-bg bg-cover relative cursor-pointer"
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

export { MetalBrick };
