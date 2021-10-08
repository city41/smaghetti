import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TransportSource } from '../components/Transport/TransportSource';

const WarpArea: Entity = {
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'Warp Area',
		description:
			'When Mario touches this, he warps to the specified destination. Good for edges of rooms to create "doorways".',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, -1, -1, 0x15],
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x0,
	width: 1,
	height: 2,

	toSpriteBinary({ x, y }) {
		return [1, this.objectId, x, y, 0];
	},

	getTransports({ room, x, y, settings }) {
		const dest = settings.destination;

		if (dest) {
			return [
				{
					destRoom: dest.room as number,
					destX: dest.x as number,
					destY: dest.y as number,
					x,
					y,
					room,
					exitCategory: 'door',
					exitType: 'door',
				} as const,
			];
		}

		return [];
	},

	simpleRender(size) {
		const style = { width: size, height: size, fontSize: size * 0.25 };

		return (
			<div
				style={style}
				className="relative bg-pink-600 text-white font-bold flex flex-col items-center justify-start rounded-lg p-0.5"
			>
				<div>warp</div>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const destination = settings.destination;

		const style = { width: TILE_SIZE, height: TILE_SIZE * 2, fontSize: 3 };

		return (
			<div
				className="relative bg-pink-600 text-white font-bold flex flex-col items-center justify-between rounded-sm p-1"
				style={style}
			>
				<div>warp</div>
				{!!entity && (
					<TransportSource
						destRoom={destination?.room}
						destX={destination?.x}
						destY={destination?.y}
						exitCategory="door"
						onDestinationSet={(newDestination) => {
							onSettingsChange({ destination: newDestination });
						}}
					/>
				)}
			</div>
		);
	},

	getProblem({ settings }) {
		if (!settings?.destination) {
			return {
				severity: 'error',
				message: 'Goes nowhere, will cause a black screen if player enters',
			} as const;
		}
	},
};

export { WarpArea };
