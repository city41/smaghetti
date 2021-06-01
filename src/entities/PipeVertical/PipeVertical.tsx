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

type PipeDirection = 'up' | 'down' | 'up-down';

const transportDirectionToObjectId: Record<PipeDirection, number> = {
	up: 0x17,
	down: 0x1a,
	'up-down': 0x2c,
};

const nonTransportDirectionToObjectId: Record<PipeDirection, number> = {
	up: 0x18,
	down: 0x1b,
	'up-down': 0x2c,
};

const directionIcons: Record<PipeDirection, IconType> = {
	up: FaArrowUp,
	down: FaArrowDown,
	'up-down': FaArrowsAltV,
};

const directions = ['up', 'down']; //, 'up-down'];

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
	objectId: 0x17,
	alternateObjectIds: Object.values(transportDirectionToObjectId).concat(
		Object.values(nonTransportDirectionToObjectId)
	),
	emptyBank: 1,

	toObjectBinary(x, y, _w, _h, settings) {
		const height = settings.height ?? 1;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as PipeDirection;

		const objectId = nonTransportDirectionToObjectId[direction];

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

	render(_showDetails, settings, onSettingsChange) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as PipeDirection;

		const style = {
			width: 2 * TILE_SIZE,
			height: height * TILE_SIZE,
		};

		const lipStyle = {
			width: 2 * TILE_SIZE,
			height: TILE_SIZE,
		};

		const bodyStyle = {
			width: 2 * TILE_SIZE,
			height: (height - 1) * TILE_SIZE,
			backgroundSize: '100%',
		};

		const size = { x: 1, y: height };
		const DirectionIcon = directionIcons[direction];

		const lip = (
			<div
				className="PipeVerticalLip-bg flex flex-row items-center justify-center"
				style={lipStyle}
			>
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
						{lip}
						{body}
					</>
				) : (
					<>
						{body}
						{lip}
					</>
				)}
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
			</div>
		);
	},
};

export { PipeVertical };
