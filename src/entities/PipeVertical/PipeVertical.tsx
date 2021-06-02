import React from 'react';
import clsx from 'clsx';
import { FaArrowUp, FaArrowDown, FaArrowsAltV } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { Resizer } from '../../components/Resizer';
import { objectSets } from './objectSets';

import styles from '../../components/Resizer/ResizingStyles.module.css';
import { TransportSource } from '../../components/Transport/TransportSource';
import { DestinationSetProps } from '../../components/Transport/TransportDestinationModal/TransportDestinationModal';
import {
	getEntityTileBounds,
	pointIsInside,
} from '../../components/make/editorSlice';

type PipeDirection = 'up' | 'down' | 'up-down';

const transportDirectionToObjectId: Record<PipeDirection, number> = {
	up: 0x17,
	down: 0x1a,
	'up-down': 0x2c,
};

const nonTransportDirectionToObjectId: Record<PipeDirection, number> = {
	up: 0x18,
	down: 0x1b,
	'up-down': 0x0,
};

const directionIcons: Record<PipeDirection, IconType> = {
	up: FaArrowUp,
	down: FaArrowDown,
	'up-down': FaArrowsAltV,
};

const directions = ['up', 'down']; //, 'up-down'];

// TODO: this and getWarning() are very similar
// TODO: horizontal exits
function getExitType(
	destination: DestinationSetProps,
	rooms: RoomData[]
): EditorTransport['exitType'] {
	const destRoom = rooms[destination.room];

	// there should be a pipe at the destination
	const destPipe = destRoom.stage.entities.find((e) => {
		return pointIsInside(destination, getEntityTileBounds(e));
	});

	if (!destPipe) {
		// in a bad state, we can't know how to exit the pipe, the user
		// got a warning in the editor about this, so take a stab that
		// up from pipe works
		return 'up-from-pipe';
	}

	// if this is an up or up-down pipe, are we at the top left corner?
	if (
		destPipe.type === 'PipeVertical' &&
		(destPipe.settings?.direction === 'up' ||
			destPipe.settings?.direction === 'up-down') &&
		// TODO: stop using pixel coords for entities
		destPipe.x / TILE_SIZE === destination.x &&
		destPipe.y / TILE_SIZE === destination.y
	) {
		return 'up-from-pipe';
	}

	// if this is a down or up-down pipe, are we at its lower left corner?
	if (
		destPipe.type === 'PipeVertical' &&
		(destPipe.settings?.direction === 'down' ||
			destPipe.settings?.direction === 'up-down') &&
		// TODO: stop using pixel coords for entities
		destPipe.x / TILE_SIZE === destination.x &&
		destPipe.y / TILE_SIZE + (destPipe.settings?.height ?? 1) - 1 ===
			destination.y
	) {
		return 'down-from-pipe';
	}

	// uh oh, the pipes are not properly configured. The user gets a warning
	// in the editor when this happens, so we'll just hope up works
	return 'up-from-pipe';
}

const PipeVertical: Entity = {
	paletteInfo: {
		title: 'Pipe - Vertical',
		warning: 'Should be fully working soonish, current focus',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 2, height: 2, direction: 'up' },
	dimensions: 'none',
	param1: 'height',
	objectId: 0x18,
	alternateObjectIds: Object.values(transportDirectionToObjectId).concat(
		Object.values(nonTransportDirectionToObjectId)
	),
	emptyBank: 1,

	getTransports(room, rooms, x, y, settings) {
		const dest = settings.destination as DestinationSetProps;

		if (dest) {
			return [
				{
					destRoom: dest.room,
					destX: dest.x,
					destY: dest.y,
					x,
					y: y - 1,
					room,
					exitCategory: 'pipe',
					exitType: getExitType(dest, rooms),
				},
			];
		}

		return [];
	},

	toObjectBinary(x, y, _w, _h, settings) {
		const height = settings.height ?? 1;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as PipeDirection;

		const objectIdMap = settings.destination
			? transportDirectionToObjectId
			: nonTransportDirectionToObjectId;
		const objectId = objectIdMap[direction];

		return [getBankParam1(1, height - 1), y, x, objectId];
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const lipStyle = { width: size, height: size / 2 };
		const bodyStyle = { width: size, height: size / 2, backgroundSize: '100%' };

		return (
			<div className="flex flex-col" style={style}>
				<div className="PipeVerticalLip-bg bg-cover" style={lipStyle} />
				<div className="PipeVerticalBody-bg bg-repeat-y" style={bodyStyle} />
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as PipeDirection;
		const destination = settings.destination;

		const style = {
			width: 2 * TILE_SIZE,
			height: height * TILE_SIZE,
		};

		const lipStyle = {
			width: 2 * TILE_SIZE,
			height: TILE_SIZE,
		};

		const bodyHeight = direction === 'up-down' ? height - 2 : height - 1;
		const bodyStyle = {
			width: 2 * TILE_SIZE,
			height: bodyHeight * TILE_SIZE,
			backgroundSize: '100%',
		};

		const size = { x: 1, y: height };
		const DirectionIcon = directionIcons[direction];

		const upperLip = (
			<div
				className="PipeVerticalLip-bg flex flex-row items-center justify-around"
				style={lipStyle}
			>
				{!!entity && (
					<>
						<TransportSource
							destRoom={destination?.room}
							destX={destination?.x}
							destY={destination?.y}
							exitCategory="pipe"
							onDestinationSet={(newDestination) => {
								onSettingsChange({ destination: newDestination });
							}}
						/>
						<button
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();

								const curDirIndex = directions.indexOf(direction);
								const nexDirIndex = (curDirIndex + 1) % directions.length;
								onSettingsChange({ direction: directions[nexDirIndex] });
							}}
						>
							<DirectionIcon className="w-1.5 h-1.5 text-white bg-blue-500" />
						</button>
					</>
				)}
			</div>
		);

		const lowerLip = (
			<div
				className="PipeVerticalLip-bg flex flex-row items-center justify-around"
				style={lipStyle}
			/>
		);

		const body = (
			<div className="PipeVerticalBody-bg bg-repeat-y" style={bodyStyle} />
		);

		return (
			<div
				style={style}
				className={clsx('relative flex flex-col', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{direction === 'up' ? (
					<>
						{upperLip}
						{body}
					</>
				) : direction === 'down' ? (
					<>
						{body}
						{upperLip}
					</>
				) : (
					<>
						{upperLip}
						{body}
						{lowerLip}
					</>
				)}
				{entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="y"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ height: Math.max(1, newSizePoint.y) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},

	// TODO: this and getExitType() are very similar
	// TODO: horizontal exits
	getWarning(settings, _entity, _room, rooms) {
		if (settings.destination) {
			const WARNING = 'Warp must be placed at exit end of a destination pipe';

			const destination = settings.destination as DestinationSetProps;
			const destRoom = rooms[destination.room];

			// the dest should be on top of a pipe
			const destPipe = destRoom.stage.entities.find((e) => {
				return pointIsInside(destination, getEntityTileBounds(e));
			});

			if (!destPipe) {
				return WARNING;
			}

			// if this is an up or up-down pipe, are we at the top left corner?
			if (
				destPipe.type === 'PipeVertical' &&
				(destPipe.settings?.direction === 'up' ||
					destPipe.settings?.direction === 'up-down') &&
				// TODO: stop using pixel coords for entities
				destPipe.x / TILE_SIZE === destination.x &&
				destPipe.y / TILE_SIZE === destination.y
			) {
				// no warning needed, dest is good
				return;
			}

			// if this is a down or up-down pipe, are we at its lower left corner?
			if (
				destPipe.type === 'PipeVertical' &&
				(destPipe.settings?.direction === 'down' ||
					destPipe.settings?.direction === 'up-down') &&
				// TODO: stop using pixel coords for entities
				destPipe.x / TILE_SIZE === destination.x &&
				destPipe.y / TILE_SIZE + (destPipe.settings?.height ?? 1) - 1 ===
					destination.y
			) {
				// no warning needed, dest is good
				return;
			}

			return WARNING;
		}
	},
};

export { PipeVertical };
