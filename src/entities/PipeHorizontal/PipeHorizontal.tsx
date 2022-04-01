import React from 'react';
import clsx from 'clsx';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1, parsePipe } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { Resizer } from '../../components/Resizer';
import { objectSets } from './objectSets';

import styles from '../../components/Resizer/ResizingStyles.module.css';
import { TransportSource } from '../../components/Transport/TransportSource';
import { getBasePipeProperties } from '../getBasePipeProperties';
import { HammerButton } from '../detailPanes/HammerButton';
import invert from 'lodash/invert';

const directions = ['right', 'left'] as const;
type PipeDirection = typeof directions[number];

const transportDirectionToObjectId: Record<PipeDirection, number> = {
	right: 0x1e,
	left: 0x1c,
};

const objectIdToTransportDirection = invert(
	transportDirectionToObjectId
) as Record<number, PipeDirection>;

const nonTransportDirectionToObjectId: Record<PipeDirection, number> = {
	right: 0x1f,
	left: 0x1d,
};

const objectIdToNonTransportDirection = invert(
	nonTransportDirectionToObjectId
) as Record<number, PipeDirection>;

const PipeHorizontal: Entity = {
	...getBasePipeProperties('PipeHorizontal'),
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'Pipe - Horizontal',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { width: 2, direction: 'left' },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x1e,
	alternateObjectIds: Object.values(transportDirectionToObjectId).concat(
		Object.values(nonTransportDirectionToObjectId)
	),
	emptyBank: 1,
	height: 2,

	toObjectBinary({ x, y, settings }) {
		const width = settings.width ?? 1;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as PipeDirection;

		const objectIdMap = settings.destination
			? transportDirectionToObjectId
			: nonTransportDirectionToObjectId;
		const objectId = objectIdMap[direction];

		return [getBankParam1(1, width - 1), y, x, objectId];
	},

	parseObject(data, offset) {
		return parsePipe(
			data,
			offset,
			objectIdToTransportDirection,
			objectIdToNonTransportDirection,
			'width',
			this
		);
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

	render({ settings, onSettingsChange, entity }) {
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

		const bodyWidth = width - 1;
		const bodyStyle = {
			height: 2 * TILE_SIZE,
			width: bodyWidth * TILE_SIZE,
			backgroundSize: '100% 100%',
		};

		const size = { x: width, y: 1 };

		const leftLip = (
			<div
				className="PipeHorizontalLip-bg flex flex-col items-center justify-around"
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
						<HammerButton
							currentValue={direction}
							values={directions}
							onNewValue={(newDirection) => {
								onSettingsChange({ direction: newDirection });
							}}
						/>
					</>
				)}
			</div>
		);

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
				{direction === 'right' ? (
					<>
						{body}
						{leftLip}
					</>
				) : (
					<>
						{leftLip}
						{body}
					</>
				)}
				{!!entity && (
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
};

export { PipeHorizontal };
