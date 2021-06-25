import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';
import { TransportSource } from '../components/Transport/TransportSource';
import { TransportEditDetails } from './detailPanes/TransportEditDetails';
import { DestinationSetProps } from '../components/Transport/TransportDestinationModal/TransportDestinationModal';
import {
	getEntityTileBounds,
	pointIsInside,
} from '../components/editor/editorSlice';

const PSwitchDoor: Entity = {
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'P-Switch Door',
		description: 'Only visible/usable while a p-switch is active',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, 1, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x8,

	toSpriteBinary(x, y) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="flex flex-row items-center justify-center"
				style={{ width: size, height: size }}
			>
				<div className="bg-white h-full w-1/2" />
			</div>
		);
	},

	render(
		showDetails: boolean,
		settings: EditorEntitySettings,
		onSettingsChange: (newSettings: EditorEntitySettings) => void
	) {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		const body = (
			<div className="relative bg-white" style={style}>
				<TileSpace />
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
					height={TILE_SIZE * 2}
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

	getWarning(
		settings: EditorEntitySettings,
		_entity: EditorEntity,
		_room: RoomData,
		rooms: RoomData[]
	) {
		if (settings.destination) {
			const destination = settings.destination as DestinationSetProps;
			const destRoom = rooms[destination.room];

			// the dest should be on top of a pipe
			const destEntity = destRoom.stage.entities.find((e) => {
				return pointIsInside(destination, getEntityTileBounds(e));
			});

			if (destEntity?.type === 'PipeVertical') {
				return 'Doors can not warp to pipes';
			}

			if (
				['SimpleBlackDoor', 'TexturedDoor', 'WoodDoor'].includes(
					destEntity?.type ?? ''
				)
			) {
				if (destEntity!.y / TILE_SIZE !== destination.y) {
					return 'The exit should be at the top of the door';
				}
			}
		}
	},

	getTransports(
		room: number,
		_rooms: RoomData[],
		x: number,
		y: number,
		settings: EditorEntitySettings
	) {
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
};

export { PSwitchDoor };
