import React from 'react';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { TileSpace } from '../TileSpace';
import { TransportSource } from '../../components/Transport/TransportSource';
import { TransportEditDetails } from '../../components/details/TransportEditDetails';
import { encodeObjectSets } from '../util';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const DOOR_LOCK_OBJECT_ID = 0xce;

const WoodDoor: Entity = {
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'Wood Door',
	},

	objectSets: encodeObjectSets(objectSets),
	// this is for the lock sprite, which truly is universal
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xf,
	emptyBank: 0,
	width: 1,
	height: 2,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x17b,
			0x1a1f,
			0x329f,
			0x4b7f,
			0x2e24,
			0x46c9,
			0x634d,
			0x3192,
			0x1636,
			0x2a9c,
			0x42ff,
			0x0,
			0x0,
		],
		romOffset: 0x16ad5c,
		tiles: [
			[496, 497],
			[498, 499],
			[484, 485],
			[500, 501],
		],
	},

	getTransports(room, x, y, settings) {
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
					exitType: 0,
				},
			];
		}

		return [];
	},

	toObjectBinary(x, y) {
		return [0, y, x, this.objectId];
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		if (settings.locked) {
			return [0, DOOR_LOCK_OBJECT_ID, x, y];
		} else {
			return [];
		}
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
		};

		return <div className="WoodDoor-bg bg-center bg-no-repeat" style={style} />;
	},

	render(showDetails, settings, onSettingsChange) {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		const body = (
			<div className="relative WoodDoor-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
				{settings.locked && (
					<div
						className="DoorLock-bg absolute left-0 top-3"
						style={{ width: TILE_SIZE / 2, height: TILE_SIZE }}
					/>
				)}
				{settings.destination && (
					<TransportSource
						className="absolute top-0 left-0"
						destRoom={settings.destination.room}
						destX={settings.destination.x}
						destY={settings.destination.y}
						exitType={0}
					/>
				)}
			</div>
		);

		if (showDetails) {
			return (
				<TransportEditDetails
					width={TILE_SIZE}
					height={TILE_SIZE * 2}
					onDestinationSet={(newDestination) => {
						onSettingsChange({ ...settings, destination: newDestination });
					}}
					locked={!!settings.locked}
					onLockChange={(locked) => {
						onSettingsChange({ ...settings, locked });
					}}
				>
					{body}
				</TransportEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { WoodDoor };
