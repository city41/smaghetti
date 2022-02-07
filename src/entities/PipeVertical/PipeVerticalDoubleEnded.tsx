import React from 'react';
import clsx from 'clsx';
import type { Entity } from '../types';
import {
	encodeObjectSets,
	getBankParam1,
	parseParam1HeightEntityObject,
} from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';
import { Resizer } from '../../components/Resizer';

import styles from '../../components/Resizer/ResizingStyles.module.css';

const PipeVerticalDoubleEnded: Entity = {
	experimental: true,
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'Pipe - Vertical Double Ended',
		description: 'Always warps Mario to the other end',
		warning:
			'These can do unexpected things sometimes. If you use them, be sure to test them out, especially going back down after going up.',
	},

	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { height: 3 },
	dimensions: 'none',
	param1: 'height',
	objectId: 0x2c,
	emptyBank: 1,
	width: 2,

	toObjectBinary({ x, y, settings }) {
		const height = settings.height ?? 1;

		return [getBankParam1(1, height - 1), y, x, this.objectId];
	},

	parseObject(data, offset) {
		return parseParam1HeightEntityObject(data, offset, this);
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const lipStyle = { width: (size * 2) / 3, height: size / 3 };
		const bodyStyle = {
			width: (size * 2) / 3,
			height: size / 3,
			backgroundSize: '100%',
		};

		return (
			<div className="flex flex-col items-center" style={style}>
				<div className="PipeVerticalLip-bg bg-cover" style={lipStyle} />
				<div className="PipeVerticalBody-bg bg-repeat-y" style={bodyStyle} />
				<div className="PipeVerticalLip-bg bg-cover" style={lipStyle} />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = (settings.height ?? this.defaultSettings!.height) as number;

		const style = {
			width: 2 * TILE_SIZE,
			height: height * TILE_SIZE,
		};

		const lipStyle = {
			width: 2 * TILE_SIZE,
			height: TILE_SIZE,
		};

		const bodyHeight = Math.max(height - 2, 0);
		const bodyStyle = {
			width: 2 * TILE_SIZE,
			height: bodyHeight * TILE_SIZE,
		};

		const size = { x: 1, y: height };

		const lip = (
			<div className="PipeVerticalLip-bg bg-cover" style={lipStyle}></div>
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
				{lip}
				{body}
				{lip}
				{!!entity && (
					<Resizer
						className="absolute bottom-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="y"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ height: Math.max(2, newSizePoint.y) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { PipeVerticalDoubleEnded };
