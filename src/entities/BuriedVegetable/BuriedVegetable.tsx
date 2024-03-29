import React from 'react';

import type { Entity } from '../types';
import {
	encodeObjectSets,
	getBankParam1,
	parsePayloadCellObjectParam1Width,
} from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { PayloadViewDetails } from '../detailPanes/PayloadViewDetails';
import { ResourceType } from '../../resources/resourceMap';
import { PayloadEditDetails } from '../detailPanes/PayloadEditDetails';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import { ECoinPaintBrushButton } from '../ECoin/ECoinPaintBrushButton';
import { ECoinPaletteData, ECoinTileData } from '../ECoin/ECoinData';
import invert from 'lodash/invert';

const payloadToObjectId = {
	Coin: 0x63,
	CoinCache: 0x64,
	GiantVegetable: 0x5a,
	KoopaShell: 0x7e,
	// monty mole is now its own entity, BuriedVegetableMontyMole
	// MontyMole: 0x69,
	OneUpMushroom: 0x65,
	PoisonMushroom: 0x67,
	RegularVegetable: 0x5b,
	SmallVegetable: 0x5c,
	ECoin: 0x66,
};

const objectIdToPayload = invert(payloadToObjectId) as Record<
	number,
	EntityType | ResourceType
>;

const BuriedVegetable: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Buried Vegetable',
		description: 'Can pull up all kinds of things...',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',

	defaultSettings: { payload: 'SmallVegetable' },
	dimensions: 'x',
	// empty veggie, nothing comes up
	objectId: 0x66,
	payloadBank: 1,
	emptyBank: 1,
	payloadToObjectId,

	resource: {
		palettes: [
			[
				0x7f40,
				0x7fff,
				0x0,
				0x7629,
				0x7f30,
				0x7fd2,
				0x7ffb,
				0x2e39,
				0x42bd,
				0x535f,
				0x3708,
				0x3f6d,
				0x4bd1,
				0x5bf4,
				0x36df,
				0x6bf8,
			],
		],
		romOffset: 0x20e4f0,
		tiles: [
			[74, 75],
			[46, 47],
		],
	},

	toObjectBinary({ x, y, w, settings }) {
		const payloadToObjectId = this.payloadToObjectId!;

		const objectId =
			payloadToObjectId[settings.payload as keyof typeof payloadToObjectId]! ??
			this.objectId;

		return [getBankParam1(1, w), y, x, objectId];
	},

	parseObject(data, offset) {
		return parsePayloadCellObjectParam1Width(
			data,
			offset,
			objectIdToPayload,
			this
		);
	},

	// TODO: parseSprite for e-coin

	toSpriteBinary({ x, y, settings }) {
		if (settings.payload === 'ECoin') {
			return [0, 0xf9, x, y, 1];
		} else {
			return [];
		}
	},

	getECoinTileData(entity) {
		if (entity.settings?.payload === 'ECoin') {
			const coinData = (entity.settings?.coinData ?? ECoinTileData) as number[];
			// returns either the custom made data, or the default smaghetti coin
			return coinData ?? ECoinTileData;
		}
	},

	getECoinPaletteData(entity: EditorEntity) {
		if (entity.settings?.payload === 'ECoin') {
			// so far all ecoins use the standard ecoin palette
			return ECoinPaletteData;
		}
	},

	simpleRender(size) {
		return (
			<div
				className="BuriedVegetable-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ showDetails, settings, onSettingsChange }) {
		const body = (
			<div
				className="relative BuriedVegetable-bg bg-cover selectable"
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
			>
				{settings.payload === 'ECoin' && !showDetails && (
					<ECoinPaintBrushButton
						className="absolute"
						style={{ top: 1, right: 1 }}
						coinData={settings.coinData}
						onCoinData={(coinData) => {
							onSettingsChange({ coinData });
						}}
					/>
				)}
				<PayloadViewDetails
					className="top-0 right-0"
					payload={settings.payload}
				/>
			</div>
		);

		if (showDetails) {
			// nasty hack, remove the koopa shell here so it can't be chosen going
			// forward, but existing koopa shell choices won't be broken when generating
			// level data
			const payloads = Object.keys(this.payloadToObjectId!).filter(
				(p) => p !== 'KoopaShell'
			) as Array<EntityType | ResourceType>;

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

export { BuriedVegetable };
