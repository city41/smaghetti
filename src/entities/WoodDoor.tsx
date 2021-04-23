import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import React from 'react';
import { TransportSource } from '../components/Transport/TransportSource';
import { TransportEditDetails } from '../components/details/TransportEditDetails';

const WoodDoor: Entity = {
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

	// TODO: add getTransports and toSpriteBinary for locks
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
		return [0, y, x, this.objectId!];
	},

	simpleRender(mw, mh) {
		const style = {
			width: mw,
			height: mh,
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
