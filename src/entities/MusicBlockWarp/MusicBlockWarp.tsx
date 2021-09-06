import type { Entity } from '../types';
import { encodeObjectSets, parseSimpleObject } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import React from 'react';
import { TransportSource } from '../../components/Transport/TransportSource';
import { TransportEditDetails } from '../detailPanes/TransportEditDetails';

const MusicBlockWarp: Entity = {
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'Note Block Warp',
		description: 'Shoots Mario into the sky, warping him somewhere.',
	},

	// TODO: probably has more object sets
	// this is just the one from mushroom 11
	objectSets: encodeObjectSets([[4, 4]]),
	spriteGraphicSets: [-1, 0, -1, -1, -1, -1],
	layer: 'stage',
	editorType: 'entity',
	objectId: 0x27,
	emptyBank: 0,
	dimensions: 'none',

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x17b,
				0x1a1f,
				0x329f,
				0x4b7f,
				0x3664,
				0x470a,
				0x5fb1,
				0x3192,
				0x1636,
				0x2a9c,
				0x42ff,
				0x19f8,
				0x2e5c,
			],
		],
		romOffset: 0x131fe0,
		tiles: [
			[312, 314],
			[313, 315],
		],
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

	toObjectBinary({ x, y }) {
		return [0, y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseSimpleObject(data, offset, 0, this);
	},

	simpleRender(size) {
		return (
			<div
				className="MusicBlockWarp-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ showDetails, settings, onSettingsChange }) {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const body = (
			<div className="relative" style={style}>
				<div className="MusicBlockWarp-bg bg-cover w-full h-full opacity-25" />
				{settings.destination && (
					<TransportSource
						className="absolute bottom-0 right-0"
						destRoom={settings.destination.room}
						destX={settings.destination.x}
						destY={settings.destination.y}
						exitCategory="door"
					/>
				)}
			</div>
		);

		if (showDetails) {
			return (
				<TransportEditDetails
					width={TILE_SIZE}
					height={TILE_SIZE}
					destination={settings.destination}
					onDestinationSet={(newDestination) => {
						onSettingsChange({ ...settings, destination: newDestination });
					}}
					hideLock
				>
					{body}
				</TransportEditDetails>
			);
		} else {
			return body;
		}
	},

	getWarning({ room }) {
		const allNoteWarps = room.stage.entities.filter(
			(e) => e.type === 'MusicBlockWarp'
		);

		const noDest = allNoteWarps.every((n) => !n.settings?.destination);

		if (noDest) {
			return 'No warp set, game will crash if warp is used';
		}

		if (allNoteWarps.length > 1) {
			return 'All note block warps will warp to the same place';
		}
	},
};

export { MusicBlockWarp };
