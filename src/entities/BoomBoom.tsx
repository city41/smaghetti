import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';
import { KoopalingViewDetails } from './detailPanes/KoopalingViewDetails';
import { KoopalingEditDetails } from './detailPanes/KoopalingEditDetails';

const graphicSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const BoomBoom: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-boss',
		title: 'Boom Boom',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [
		graphicSets,
		graphicSets,
		graphicSets,
		graphicSets,
		graphicSets,
		0,
	],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x13,
	defaultSettings: { stompCount: 3, fireballCount: 5 },

	resource: {
		palettes: [
			[
				0x7f96,
				0x0,
				0x7fff,
				0x196,
				0x123b,
				0x1a9e,
				0x25fd,
				0x369e,
				0x475f,
				0x0,
				0x7f11,
				0x7f74,
				0x7fd8,
				0x31f,
				0x21f,
				0x1d,
			],
		],
		romOffset: 0x16ea40,
		tiles: [
			[
				{ romOffset: 0x16ea40, tileIndex: 250 },
				{ romOffset: 0x16ea40, tileIndex: 220 },
				{ romOffset: 0x16ea40, tileIndex: 220, flip: 'h' },
				{ romOffset: 0x16ea40, tileIndex: 250 },
			],
			[
				{ romOffset: 0x16ea40, tileIndex: 205 },
				{ romOffset: 0x16ea40, tileIndex: 206 },
				{ romOffset: 0x16ea40, tileIndex: 206, flip: 'h' },
				{ romOffset: 0x16ea40, tileIndex: 205, flip: 'h' },
			],
			[
				{ romOffset: 0x16ea40, tileIndex: 221 },
				{ romOffset: 0x16ea40, tileIndex: 222 },
				{ romOffset: 0x16ea40, tileIndex: 222, flip: 'h' },
				{ romOffset: 0x16ea40, tileIndex: 221, flip: 'h' },
			],
		],
	},

	toSpriteBinary({ x, y, settings }) {
		const stompCount = (settings.stompCount ??
			this.defaultSettings!.stompCount) as number;
		const fireballCount = (settings.fireballCount ??
			this.defaultSettings!.fireballCount) as number;

		return [1, this.objectId, x, y, stompCount, fireballCount];
	},

	parseSprite(data, offset) {
		const result = parseSimpleSprite(data, offset, 1, this);

		if (result) {
			return {
				...result,
				offset: result.offset + 2,
			};
		}
	},

	simpleRender(size) {
		return (
			<div
				className="BoomBoom-bg bg-cover bg-no-repeat bg-center"
				style={{
					width: size,
					height: size,
					backgroundSize: '100% 66%',
				}}
			/>
		);
	},

	render({ showDetails, settings, onSettingsChange }) {
		const stompCount = (settings.stompCount ??
			this.defaultSettings!.stompCount) as number;
		const fireballCount = (settings.fireballCount ??
			this.defaultSettings!.fireballCount) as number;

		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
			paddingBottom: TILE_SIZE,
			paddingRight: TILE_SIZE,
			backgroundPosition: `0 ${TILE_SIZE / 2}px`,
			backgroundSize: '100%',
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: 0,
			left: 0,
		};

		const body = (
			<div className="relative BoomBoom-bg bg-no-repeat" style={style}>
				<TileSpace className="absolute" style={spaceStyle} />
				<KoopalingViewDetails
					stompCount={stompCount}
					fireballCount={fireballCount}
				/>
			</div>
		);

		if (showDetails) {
			return (
				<KoopalingEditDetails
					currentStompCount={stompCount}
					currentFireballCount={fireballCount}
					onSettingsChange={onSettingsChange}
				>
					{body}
				</KoopalingEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { BoomBoom };
