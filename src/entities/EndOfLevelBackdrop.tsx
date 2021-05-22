import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

const EndOfLevelBackdrop: Entity = {
	paletteCategory: 'decoration',
	paletteInfo: {
		title: 'End of Level Backdrop',
		description:
			'A black background that clues the player they have reached the end of the level',
	},
	layer: 'stage',
	editorType: 'entity',
	width: 32,
	height: 26,

	// NOTE: different object/graphic sets will cause different decorations
	// to show up in the background. For now, the user just gets a random
	// decoration based on which object sets end up valid for the room
	// TODO: support picking the decoration, which is a HUGE change!
	objectSets: encodeObjectSets([
		// green hills
		[1, 12],
		[1, 1],
		[1, 4],
		[1, 9],

		// snow capped plateaus
		[12, 12],
		[12, 1],
		[12, 4],
		[12, 9],

		// clouds
		[13, 13],

		// orange hills
		[14, 12],
		[14, 1],
		[14, 4],
		[14, 9],

		// light green hills
		[3, 12],
		[3, 1],
		[3, 4],
		[3, 9],

		// green plateaus
		[4, 12],
		[4, 1],
		[4, 4],
		[4, 9],

		// pyramids
		[9, 12],
		[9, 1],
		[9, 4],
		[9, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	dimensions: 'none',
	objectId: 0x29,

	resource: {
		romOffset: 0x16ea40,
		palette: [0x7f96, 0x7fff, 0x0],
		tiles: [[555], [539]],
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId!];
	},

	simpleRender(width, height) {
		const style = { width, height, gridTemplateColumns: '25% 75%' };

		const edgeStyle = {
			backgroundSize: '100% 50%',
			backgroundPosition: '0 -50%',
		};

		return (
			<div className="grid" style={style}>
				<div
					className="EndOfLevelBackdrop-bg w-full h-full"
					style={edgeStyle}
				/>
				<div className="bg-black w-full h-full" />
			</div>
		);
	},

	render() {
		const style = {
			width: 32 * TILE_SIZE,
			height: 26 * TILE_SIZE,
			gridTemplateColumns: `${TILE_SIZE / 2}px 1fr`,
		};

		const edgeStyle = {
			width: TILE_SIZE,
			height: '100%',
		};

		return (
			<div className="relative grid" style={style}>
				<div className="EndOfLevelBackdrop-bg" style={edgeStyle} />
				<div className="bg-black w-full h-full" />
				<div className="absolute w-full h-full">
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { EndOfLevelBackdrop };
