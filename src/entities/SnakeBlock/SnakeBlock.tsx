import React from 'react';
import clsx from 'clsx';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';

import styles from '../../components/Resizer/ResizingStyles.module.css';
import { SnakePath } from './SnakePath';
import { Resizer } from '../../components/Resizer';
import clamp from 'lodash/clamp';
import { EyeButton } from '../detailPanes/EyeButton';
import { BombButton } from '../detailPanes/BombButton';
import { NumberButton } from '../detailPanes/NumberButton';
import { encodeObjectSets } from '../util';

const SnakeBlock: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Snake Block',
	},

	objectId: 0xba,
	objectSets: encodeObjectSets([
		[0, 0],
		[0, 1],
		[0, 2],
		[0, 3],
		[0, 4],
		[0, 5],
		[0, 6],
		[0, 7],
		[0, 8],
		[0, 9],
		[0, 10],
		[0, 11],
		[0, 12],
		[0, 13],
		[0, 14],
		[0, 15],
		[1, 0],
		[1, 1],
		[1, 2],
		[1, 3],
		[1, 4],
		[1, 5],
		[1, 6],
		[1, 7],
		[1, 8],
		[1, 9],
		[1, 10],
		[1, 11],
		[1, 12],
		[1, 13],
		[1, 14],
		[1, 15],
		[2, 0],
		[2, 1],
		[2, 2],
		[2, 3],
		[2, 4],
		[2, 5],
		[2, 6],
		[2, 7],
		[2, 8],
		[2, 9],
		[2, 10],
		[2, 11],
		[2, 12],
		[2, 13],
		[2, 14],
		[2, 15],
		[3, 0],
		[3, 1],
		[3, 2],
		[3, 3],
		[3, 4],
		[3, 5],
		[3, 6],
		[3, 7],
		[3, 8],
		[3, 9],
		[3, 10],
		[3, 11],
		[3, 12],
		[3, 13],
		[3, 14],
		[3, 15],
		[5, 0],
		[5, 1],
		[5, 2],
		[5, 3],
		[5, 4],
		[5, 5],
		[5, 6],
		[5, 7],
		[5, 8],
		[5, 9],
		[5, 10],
		[5, 11],
		[5, 12],
		[5, 13],
		[5, 14],
		[5, 15],
		[7, 0],
		[7, 1],
		[7, 2],
		[7, 3],
		[7, 4],
		[7, 5],
		[7, 6],
		[7, 7],
		[7, 8],
		[7, 9],
		[7, 10],
		[7, 11],
		[7, 12],
		[7, 13],
		[7, 14],
		[7, 15],
		[8, 0],
		[8, 1],
		[8, 2],
		[8, 3],
		[8, 4],
		[8, 5],
		[8, 6],
		[8, 7],
		[8, 8],
		[8, 9],
		[8, 10],
		[8, 11],
		[8, 12],
		[8, 13],
		[8, 14],
		[8, 15],
		[9, 0],
		[9, 1],
		[9, 2],
		[9, 3],
		[9, 4],
		[9, 5],
		[9, 6],
		[9, 7],
		[9, 8],
		[9, 9],
		[9, 10],
		[9, 11],
		[9, 12],
		[9, 13],
		[9, 14],
		[9, 15],
		[10, 0],
		[10, 1],
		[10, 2],
		[10, 3],
		[10, 4],
		[10, 5],
		[10, 6],
		[10, 7],
		[10, 8],
		[10, 9],
		[10, 10],
		[10, 11],
		[10, 12],
		[10, 13],
		[10, 14],
		[10, 15],
		[11, 0],
		[11, 1],
		[11, 2],
		[11, 3],
		[11, 4],
		[11, 5],
		[11, 6],
		[11, 7],
		[11, 8],
		[11, 9],
		[11, 10],
		[11, 11],
		[11, 12],
		[11, 13],
		[11, 14],
		[11, 15],
		[14, 0],
		[14, 1],
		[14, 2],
		[14, 3],
		[14, 4],
		[14, 5],
		[14, 6],
		[14, 7],
		[14, 8],
		[14, 9],
		[14, 10],
		[14, 11],
		[14, 12],
		[14, 13],
		[14, 14],
		[14, 15],
		[15, 0],
		[15, 1],
		[15, 2],
		[15, 3],
		[15, 4],
		[15, 5],
		[15, 6],
		[15, 7],
		[15, 8],
		[15, 9],
		[15, 10],
		[15, 11],
		[15, 12],
		[15, 13],
		[15, 14],
		[15, 15],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	defaultSettings: { path: [], width: 5, hidePath: false, speed: 2 },

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y, 0];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
		};

		const cellStyle = {
			backgroundSize: '100%',
		};

		return (
			<div className="grid grid-cols-5 grid-rows-5" style={style}>
				<div
					style={{ ...cellStyle, gridColumn: 1, gridRow: 3 }}
					className="StretchBlock-bg"
				/>
				<div
					style={{ ...cellStyle, gridColumn: 2, gridRow: 3 }}
					className="StretchBlock-bg"
				/>
				<div
					style={{ ...cellStyle, gridColumn: 2, gridRow: 2 }}
					className="StretchBlock-bg"
				/>
				<div
					style={{ ...cellStyle, gridColumn: 3, gridRow: 2 }}
					className="StretchBlock-bg"
				/>
				<div
					style={{ ...cellStyle, gridColumn: 4, gridRow: 2 }}
					className="StretchBlock-bg"
				/>
				<div
					style={{ ...cellStyle, gridColumn: 4, gridRow: 3 }}
					className="StretchBlock-bg"
				/>
				<div
					style={{ ...cellStyle, gridColumn: 4, gridRow: 4 }}
					className="StretchBlock-bg"
				/>
			</div>
		);
	},

	render({ onSettingsChange, settings, entity }) {
		const speed = (settings.speed ?? this.defaultSettings!.speed) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as number;

		const style = {
			width: TILE_SIZE * width,
			height: TILE_SIZE,
		};

		return (
			<div
				className={clsx('relative StretchBlock-bg bg-repeat-x', {
					[styles.resizing]: settings?.resizing,
				})}
				style={style}
			>
				{!!entity && (
					<>
						<NumberButton
							className="absolute"
							style={{ width: TILE_SIZE, height: TILE_SIZE }}
							currentValue={speed}
							range={[1, 8]}
							title="speed"
							onNewValue={(newSpeed) => {
								onSettingsChange({ speed: newSpeed });
							}}
						/>
						{settings.path.length > 0 && (
							<div
								className="absolute top-0 right-0 flex flex-row"
								style={{ width: TILE_SIZE, height: TILE_SIZE }}
							>
								<EyeButton
									isHidden={settings.hidePath}
									onHideToggle={(hidden) => {
										onSettingsChange({ hidePath: hidden });
									}}
								/>
								<BombButton
									onClick={() => {
										onSettingsChange({ path: [] });
									}}
								/>
							</div>
						)}
						{!settings.hidePath && (
							<SnakePath
								className="absolute top-0 right-0"
								path={settings.path ?? []}
								onNewPath={(newPath) => {
									onSettingsChange({ path: newPath });
								}}
								onResizeStart={() => onSettingsChange({ resizing: true })}
								onResizeEnd={() => onSettingsChange({ resizing: false })}
							/>
						)}
						<Resizer
							className="absolute bottom-0 right-0"
							style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
							size={{ x: width, y: 1 }}
							increment={TILE_SIZE}
							axis="x"
							onSizeChange={(newSizePoint) => {
								onSettingsChange({ width: clamp(newSizePoint.x, 2, 15) });
							}}
							onResizeStart={() => onSettingsChange({ resizing: true })}
							onResizeEnd={() => onSettingsChange({ resizing: false })}
						/>
					</>
				)}
			</div>
		);
	},

	getProblem({ room }) {
		const snakes = room.actors.entities.filter((e) => e.type === 'SnakeBlock');

		if (snakes.length > 1) {
			return 'Only the first snake will work properly';
		} else if (snakes[0].settings?.width > snakes[0].settings?.path?.length) {
			return `Must travel at least ${snakes[0].settings?.width} blocks`;
		}
	},
};

export { SnakeBlock };
