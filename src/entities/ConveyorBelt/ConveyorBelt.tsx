import React from 'react';
import clsx from 'clsx';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import type { Entity } from '../types';
import { encodeObjectSets, getBankParam1 } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { Resizer } from '../../components/Resizer';

import styles from '../../components/Resizer/ResizingStyles.module.css';

type Direction = 'left' | 'right';

const directionToObjectId: Record<Direction, number> = {
	left: 0x31,
	right: 0x32,
};

const ConveyorBelt: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Conveyor Belt',
	},

	objectSets: encodeObjectSets([
		[2, 10],
		[2, 11],
		[2, 12],
		[2, 13],
		[2, 14],
		[2, 15],
		[2, 1],
		[2, 2],
		[2, 3],
		[2, 4],
		[2, 5],
		[2, 6],
		[2, 8],
		[2, 9],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 3, direction: 'right' },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x31,
	emptyBank: 1,

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x15d2,
			0x2257,
			0x2afc,
			0x37be,
			0x20ba,
			0x21be,
			0x32df,
			0x3192,
			0x1636,
			0x2a9c,
			0x42ff,
			0x0,
			0x0,
		],
		romOffset: 0x131fe0,
		tiles: [
			[304, 304],
			[304, 304],
		],
	},

	toObjectBinary(x, y, _w, _h, settings) {
		const width = settings.width ?? 1;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const objectId = directionToObjectId[direction];

		return [getBankParam1(1, width - 1), y, x, objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="ConveyorBelt-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render(_showDetails, settings, onSettingsChange) {
		const width = settings.width ?? this.defaultSettings!.width;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;

		const DirectionIcon = direction === 'left' ? ImArrowLeft : ImArrowRight;

		const style = {
			width: width * TILE_SIZE,
			height: TILE_SIZE,
		};

		const size = { x: width, y: 1 };

		return (
			<div
				className={clsx('relative ConveyorBelt-bg', {
					[styles.resizing]: settings?.resizing,
				})}
				style={style}
			>
				<div
					className={clsx('w-full h-full grid place-items-center border z-10', {
						'border-blue-200': direction === 'right',
						'border-yellow-200': direction === 'left',
					})}
				>
					<button
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onSettingsChange({
								direction: direction === 'left' ? 'right' : 'left',
							});
						}}
					>
						<DirectionIcon
							className={clsx('w-1.5 h-1.5 text-white', {
								'bg-blue-500': direction === 'right',
								'bg-yellow-500': direction === 'left',
							})}
						/>
					</button>
				</div>
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
			</div>
		);
	},
};

export { ConveyorBelt };
