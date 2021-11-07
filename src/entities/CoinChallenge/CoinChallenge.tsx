import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { parseSimpleSprite } from '../util';
import { NumberPicker } from '../detailPanes/NumberPicker';

/**
 * This is the weird thing at the beginning of mushroom05, Bombarded by Bob-ombs.
 * Once mario hits it from below, he is then tasked with collecting a certain amount of coins
 *
 * the amount to collect is param1 (byte 5).
 *
 * TODO: details panel allowing user to specify the coin number. so far hardcoded to 100
 */
const CoinChallenge: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Coin Challenge',
		description:
			'If the player hits it, they are challenged to collect a certain number of coins. If they succeed, they get 3 lives',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	defaultSettings: { count: 10 },
	objectId: 0xfd,
	param1: 'other',

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x3192,
				0x1636,
				0x2a9c,
				0x1f4,
				0x29a,
				0x37f,
				0x42ff,
				0x4a52,
				0x6318,
				0x77bd,
				0x7ffb,
				0x7fd2,
				0x732c,
			],
		],
		romOffset: 0x189ac0,
		tiles: [
			[94, 95],
			[126, 127],
		],
	},

	toSpriteBinary({ x, y, settings }) {
		const count = settings.count ?? this.defaultSettings!.count;
		return [0, this.objectId, x, y, count];
	},

	parseSprite(data, offset) {
		const result = parseSimpleSprite(data, offset, 0, this);

		if (result) {
			offset = result.offset;
			return {
				entity: {
					...result.entity,
					settings: {
						count: data[offset++],
					},
				},
				offset,
			};
		}
	},

	simpleRender(size) {
		return (
			<div
				className="CoinChallenge-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ settings, onSettingsChange }) {
		const count = settings.count ?? this.defaultSettings!.count;
		const style = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div className="relative CoinChallenge-bg bg-cover" style={style}>
				<NumberPicker
					className="absolute bottom-0 left-0 w-full"
					min={0}
					max={0xff}
					value={count}
					onValueChange={(newCount) => {
						onSettingsChange({ count: newCount });
					}}
				/>
			</div>
		);
	},

	getProblem({ room }) {
		const coinChallenges = room.actors.entities.filter(
			(e) => e.type === 'CoinChallenge'
		);
		const firstChallengeCount = (coinChallenges[0].settings?.count ??
			10) as number;

		if (
			coinChallenges.length > 1 &&
			!coinChallenges.every(
				(cc) => (cc.settings?.count ?? 10) === firstChallengeCount
			)
		) {
			return 'Coin challenges should all have the same value in the same room';
		}
	},
};

export { CoinChallenge };
