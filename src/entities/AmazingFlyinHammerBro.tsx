import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';

function isRidingWingedPlatform(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const platform = room.actors.entities.find((e) => {
		return (
			e.x === entity.x &&
			e.y === entity.y + TILE_SIZE &&
			e.type === 'WingedPlatform'
		);
	});

	return !!platform;
}

const AmazingFlyinHammerBro: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-bro',
		title: "Amazing Flyin' Hammer Bro",
		description: 'Normally plopped on top of a Winged Platform',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, 4, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xd9,
	alternateObjectIds: [
		0x2, // riding a winged platform
		0xd9, // not riding a platform
	],

	resource: {
		romOffset: 0x18fa98,
		palettes: [
			[
				0x7fb4,
				0x7fff,
				0x0,
				0x75ad,
				0x7a94,
				0x7f39,
				0x25de,
				0x273f,
				0x1b1d,
				0x2fbf,
				0x53ff,
				0x119,
				0x167b,
				0x6ab2,
				0x7b98,
				0x7bdd,
			],
		],
		tiles: [
			[
				{ romOffset: 0x18c914, tileIndex: 484 },
				52,
				{ tileIndex: 52, flip: 'h' },
				{ romOffset: 0x18c914, tileIndex: 484 },
			],
			[16, 17, 18, 19],
			[48, 49, 50, 51],
		],
	},

	toSpriteBinary({ x, y, entity, room }) {
		const objectId = isRidingWingedPlatform(entity, room) ? 0x2 : 0xd9;
		return [0, objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="AmazingFlyinHammerBro-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 1.5,
			marginTop: -TILE_SIZE * 0.5,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: TILE_SIZE * 0.5,
		};

		return (
			<div className="relative AmazingFlyinHammerBro-bg" style={style}>
				<div style={spaceStyle} className="absolute left-0">
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { AmazingFlyinHammerBro };
