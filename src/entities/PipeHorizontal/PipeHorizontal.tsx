import React from 'react';
import clsx from 'clsx';
import { FaArrowRight, FaArrowLeft, FaArrowsAltH } from 'react-icons/fa';
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
import { TileSpace } from '../TileSpace';

type PipeDirection = 'right' | 'left' | 'right-left';

const transportDirectionToObjectId: Record<PipeDirection, number> = {
	right: 0x1e,
	left: 0x1c,
	'right-left': 0x2c,
};

const nonTransportDirectionToObjectId: Record<PipeDirection, number> = {
	right: 0x1f,
	left: 0x1d,
	'right-left': 0x0,
};

const directionIcons: Record<PipeDirection, IconType> = {
	right: FaArrowRight,
	left: FaArrowLeft,
	'right-left': FaArrowsAltH,
};

const directions = ['right', 'left']; //, 'right-left'];

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

const PipeHorizontal: Entity = {
	paletteInfo: {
		title: 'Pipe - Horizontal',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 2, height: 2, direction: 'left' },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x1e,
	alternateObjectIds: Object.values(transportDirectionToObjectId).concat(
		Object.values(nonTransportDirectionToObjectId)
	),
	emptyBank: 1,

	getTransports(room, rooms, x, y, settings) {
		const dest = settings.destination as DestinationSetProps;

		// right facing pipes cannot have transports
		// TODO: totally confirm this, but so far it seems likely
		const direction = settings.direction as PipeDirection;

		if (dest && direction !== 'right') {
			return [
				{
					destRoom: dest.room,
					destX: dest.x,
					destY: dest.y,
					x,
					y,
					room,
					exitCategory: 'pipe',
					exitType: getExitType(dest, rooms),
				},
			];
		}

		return [];
	},

	toObjectBinary(x, y, _w, _h, settings) {
		const width = settings.width ?? 1;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as PipeDirection;

		const objectIdMap = settings.destination
			? transportDirectionToObjectId
			: nonTransportDirectionToObjectId;
		const objectId = objectIdMap[direction];

		return [getBankParam1(1, width - 1), y, x, objectId];
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const lipStyle = { width: size / 2, height: size };
		const bodyStyle = {
			width: size / 2,
			height: size,
			backgroundSize: '100% 100%',
		};

		return (
			<div className="flex flex-row" style={style}>
				<div className="PipeHorizontalLip-bg bg-cover" style={lipStyle} />
				<div className="PipeHorizontalBody-bg bg-repeat-x" style={bodyStyle} />
			</div>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as PipeDirection;
		const destination = settings.destination;

		const style = {
			height: 2 * TILE_SIZE,
			width: width * TILE_SIZE,
		};

		const lipStyle = {
			height: 2 * TILE_SIZE,
			width: TILE_SIZE,
		};

		const bodyWidth = direction === 'right-left' ? width - 2 : width - 1;
		const bodyStyle = {
			height: 2 * TILE_SIZE,
			width: bodyWidth * TILE_SIZE,
			backgroundSize: '100% 100%',
		};

		const size = { x: width, y: 1 };
		const DirectionIcon = directionIcons[direction];

		const leftLip = (
			<div
				className="PipeHorizontalLip-bg flex flex-col items-center justify-around"
				style={lipStyle}
			>
				{!!entity && (
					<>
						<TransportSource
							className={clsx({ invisible: direction === 'right' })}
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

		const rightLip = <div className="PipeHorizontalLip-bg" style={lipStyle} />;

		const body = (
			<div className="PipeHorizontalBody-bg bg-repeat-y" style={bodyStyle} />
		);

		return (
			<div
				style={style}
				className={clsx('relative flex flex-row', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{!!entity && <TileSpace className="absolute w-full h-full" />}
				{direction === 'right' ? (
					<>
						{body}
						{leftLip}
					</>
				) : direction === 'left' ? (
					<>
						{leftLip}
						{body}
					</>
				) : (
					<>
						{leftLip}
						{body}
						{rightLip}
					</>
				)}
				{entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ width: Math.max(1, newSizePoint.x) });
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

export { PipeHorizontal };
