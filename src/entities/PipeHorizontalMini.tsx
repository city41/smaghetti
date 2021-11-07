import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';

const PipeHorizontalMini: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Pipe - Horizontal Mini',
		description: "No mini mario in this game, so can't go inside...",
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',

	defaultSettings: { width: 2, height: 1 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x36,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				14798,
				19026,
				25368,
				30653,
				9852,
				17247,
				23487,
				15753,
				18957,
				22096,
				25266,
				28437,
				30584,
			],
		],
		tiles: [
			[331, 330, 330, 330],
			[347, 346, 346, 346],
		],
		romOffset: 1501760,
	},

	toObjectBinary({ x, y, settings }) {
		const width = settings.width ?? 1;

		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 50%' };

		return (
			<div
				style={style}
				className="PipeHorizontalMini-bg bg-center bg-no-repeat"
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			height: TILE_SIZE,
			width: width * TILE_SIZE,
		};

		const lipStyle = {
			height: TILE_SIZE,
			width: TILE_SIZE,
		};

		const size = { x: width, y: 1 };

		const bodyStyle = {
			height: TILE_SIZE,
			width: TILE_SIZE,
			backgroundPositionX: -TILE_SIZE,
			backgroundSize: `${2 * TILE_SIZE}px ${TILE_SIZE}px`,
		};

		const bodyPieces = [];

		for (let i = 0; i < width - 1; ++i) {
			bodyPieces.push(
				<div className="PipeHorizontalMini-bg" style={bodyStyle} />
			);
		}

		const lip = <div className="PipeHorizontalMini-bg" style={lipStyle} />;

		return (
			<div
				style={style}
				className={clsx('relative flex flex-row', {
					[styles.resizing]: settings?.resizing,
				})}
			>
				{lip}
				{bodyPieces}
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
};

export { PipeHorizontalMini };
