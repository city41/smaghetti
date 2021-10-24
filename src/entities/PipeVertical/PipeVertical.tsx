import React from 'react';
import clsx from 'clsx';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1, parseParamFromBank } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { Resizer } from '../../components/Resizer';
import { objectSets } from './objectSets';

import styles from '../../components/Resizer/ResizingStyles.module.css';
import { TransportSource } from '../../components/Transport/TransportSource';
import { getBasePipeProperties } from '../getBasePipeProperties';
import { IconArrowUp, IconArrowDown } from '../../icons';
import type { IconType } from '../../icons';
import invert from 'lodash/invert';

type PipeDirection = 'up' | 'down';

const transportDirectionToObjectId: Record<PipeDirection, number> = {
	up: 0x17,
	down: 0x1a,
};

const objectIdToTransportDirection = invert(
	transportDirectionToObjectId
) as Record<number, PipeDirection>;

const nonTransportDirectionToObjectId: Record<PipeDirection, number> = {
	up: 0x18,
	down: 0x1b,
};

const objectIdToNonTransportDirection = invert(
	nonTransportDirectionToObjectId
) as Record<number, PipeDirection>;

const directionIcons: Record<PipeDirection, IconType> = {
	up: IconArrowUp,
	down: IconArrowDown,
};

const directions = ['up', 'down'];

const PipeVertical: Entity = {
	...getBasePipeProperties('PipeVertical'),
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'Pipe - Vertical',
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

	toObjectBinary({ x, y, settings }) {
		const height = settings.height ?? 1;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as PipeDirection;

		const objectIdMap = settings.destination
			? transportDirectionToObjectId
			: nonTransportDirectionToObjectId;
		const objectId = objectIdMap[direction];

		return [getBankParam1(1, height - 1), y, x, objectId];
	},

	parseObject(data, offset) {
		const objectId = data[offset + 3];
		if (
			data[offset] >= 0x40 &&
			(objectIdToTransportDirection[objectId] ||
				objectIdToNonTransportDirection[objectId])
		) {
			const height = parseParamFromBank(data[offset]) + 1;
			const y = data[offset + 1] * TILE_SIZE;
			const x = data[offset + 2] * TILE_SIZE;

			return {
				entities: [
					{
						type: 'PipeVertical',
						x,
						y,
						settings: {
							height,
							direction:
								objectIdToTransportDirection[objectId] ??
								objectIdToNonTransportDirection[objectId],
						},
					},
				],
				offset: offset + 4,
			};
		}
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

	render({ settings, onSettingsChange, entity }) {
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

		const bodyHeight = height - 1;
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
				) : (
					<>
						{body}
						{upperLip}
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
};

export { PipeVertical };
