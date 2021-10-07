import React from 'react';
import clsx from 'clsx';

import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { TileSpace } from '../TileSpace';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { AceCoinDetails, AceCoinIndex } from './AceCoinDetails';
import { parseSimpleSprite } from '../util';

function getAllAceCoinEntities(allRooms: RoomData[]): EditorEntity[] {
	return allRooms.reduce<EditorEntity[]>((building, room) => {
		const aceCoinsInRoom = room.stage.entities.filter(
			(e) => e.type === 'AceCoin'
		);

		return building.concat(aceCoinsInRoom);
	}, []);
}

function getAllAceCoinBubbleEntities(allRooms: RoomData[]): EditorEntity[] {
	return allRooms.reduce<EditorEntity[]>((building, room) => {
		const aceCoinsInRoom = room.actors.entities.filter(
			(e) => e.type === 'Bubble' && e.settings?.payload === 'AceCoin'
		);

		return building.concat(aceCoinsInRoom);
	}, []);
}

const AceCoin: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Ace Coin',
		description:
			'Special coins to search for. At most a level can have five of them.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xfa,
	width: 1,
	height: 2,

	resource: {
		romOffset: 0x18af80,
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
		tiles: [
			[10, 11],
			[42, 43],
			[74, 75],
			[106, 107],
		],
	},

	toSpriteBinary({ x, y, settings }) {
		return [0, this.objectId, x, y, settings.aceCoinIndex ?? 0];
	},

	parseSprite(data, offset) {
		const result = parseSimpleSprite(data, offset, 0, this);

		if (result) {
			offset = result.offset;
			return {
				entity: {
					...result.entity,
					settings: {
						aceCoinIndex: data[offset++],
					},
				},
				offset,
			};
		}
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
		};

		return <div className="AceCoin-bg bg-center bg-no-repeat" style={style} />;
	},

	render({ settings, showDetails, onSettingsChange, entity }) {
		const aceCoinIndex = settings.aceCoinIndex as AceCoinIndex;

		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const body = (
			<div className="relative AceCoin-bg bg-cover" style={style}>
				<div className="absolute left-0 top-0" style={spaceStyle}>
					<TileSpace />
				</div>
				{!isNaN(settings.aceCoinIndex) && !!entity && (
					<div
						className={clsx(
							'absolute bottom-1 right-0 bg-black text-white rounded-sm grid place-items-center font-bold'
						)}
						style={{ fontSize: 4, width: 6, height: 5 }}
					>
						#{settings.aceCoinIndex + 1}
					</div>
				)}
			</div>
		);

		if (showDetails) {
			return (
				<AceCoinDetails
					aceCoinIndex={aceCoinIndex}
					onIndexChange={(newIndex) => {
						onSettingsChange({ aceCoinIndex: newIndex });
					}}
				>
					{body}
				</AceCoinDetails>
			);
		} else {
			return body;
		}
	},

	getWarning({ settings, allRooms }) {
		const aceCoinIndex = settings?.aceCoinIndex;

		if (aceCoinIndex === undefined) {
			return 'Position not set';
		}

		const allAceCoins = getAllAceCoinEntities(allRooms);
		const allBubbles = getAllAceCoinBubbleEntities(allRooms);

		if (allBubbles.length + allAceCoins.length > 5) {
			return 'Too many Ace Coins in level';
		}

		if (allBubbles.length > 0 && aceCoinIndex === 0) {
			return 'Ace Coins in bubbles are always position #1';
		}

		const aceCoinsWithIndex = allAceCoins.filter(
			(ac) => ac.settings?.aceCoinIndex === aceCoinIndex
		);

		if (aceCoinsWithIndex.length > 1) {
			return `${aceCoinsWithIndex.length} Ace Coins have position #${
				aceCoinIndex + 1
			}`;
		}
	},
};

export { AceCoin };
