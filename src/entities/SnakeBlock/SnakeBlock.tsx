import React from 'react';
import clsx from 'clsx';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';

import styles from '../../components/Resizer/ResizingStyles.module.css';
import { SnakePath } from './SnakePath';
import { Resizer } from '../../components/Resizer';
import clamp from 'lodash/clamp';
import { EyeButton } from '../detailPanes/EyeButton';
import { BombButton } from '../detailPanes/BombButton';

const SnakeBlock: Entity = {
	// paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Snake Block',
		warning: 'Still some bugs to work out, but this should be done soon',
	},

	objectId: 0xba,
	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { path: [], width: 5, hidePath: false },

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
						{settings.path.length > 1 && (
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

	getWarning({ room }) {
		const snakes = room.actors.entities.filter((e) => e.type === 'SnakeBlock');

		if (snakes.length > 1) {
			return 'A room can only have one snake';
		} else if (snakes[0].settings?.width > snakes[0].settings?.path?.length) {
			return `Must travel at least ${snakes[0].settings?.width} blocks`;
		}
	},
};

export { SnakeBlock };
