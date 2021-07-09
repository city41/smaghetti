import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { NumberPickerEditDetails } from '../detailPanes/NumberPickerEditDetails';

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
	settingsType: 'single',
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

	toSpriteBinary(x, y, _w, _h, settings) {
		const count = settings.count ?? this.defaultSettings!.count;
		return [0, this.objectId, x, y, count];
	},

	simpleRender(size) {
		return (
			<div
				className="CoinChallenge-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const count = settings.count ?? this.defaultSettings!.count;
		const style = { width: TILE_SIZE, height: TILE_SIZE };

		const body = (
			<div className="relative CoinChallenge-bg bg-cover" style={style}>
				<div
					style={{ fontSize: 3 }}
					className="absolute bottom-0 right-0 w-1.5 h-1 bg-black text-white rounded-xs text-center"
				>
					{count}
				</div>
			</div>
		);

		if (showDetails) {
			return (
				<NumberPickerEditDetails
					min={1}
					max={255}
					value={count}
					onValueChange={(newCount) => {
						onSettingsChange({ count: newCount });
					}}
				>
					{body}
				</NumberPickerEditDetails>
			);
		} else {
			return body;
		}
	},

	getWarning(
		_settings: EditorEntitySettings,
		_entity: EditorEntity,
		room: RoomData
	) {
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
