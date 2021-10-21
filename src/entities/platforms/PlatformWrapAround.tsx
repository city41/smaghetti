import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import type { Entity } from '../types';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';

import styles from '../../components/Resizer/ResizingStyles.module.css';
import { PlatformWidthButton } from './PlatformWidthButton';
import { NumberButton } from '../detailPanes/NumberButton';
import { IconArrowDown, IconArrowUp, IconUTurn } from '../../icons';
import type { IconType } from '../../icons';

const directions = ['up', 'down'] as const;
type Direction = typeof directions[number];
type Width = 2 | 3;

const directionToIcon: Record<Direction, IconType> = {
	up: IconArrowUp,
	down: IconArrowDown,
};

function getDirectionBoxStyle(
	dir: Direction,
	entity: EditorEntity | undefined,
	roomTileHeight: number | undefined
): CSSProperties {
	if (!entity || !roomTileHeight) {
		return {};
	}

	const ty = entity.y / TILE_SIZE;

	const tileHeight = dir === 'down' ? roomTileHeight - ty - 0.5 : ty;
	const heightPx = tileHeight * TILE_SIZE;

	const top = dir === 'down' ? TILE_SIZE / 2 : -heightPx;

	return {
		height: heightPx,
		top,
	};
}

const PlatformWrapAround: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Platform - Wrap Around',
		description:
			'The same platforms as in SMB 1-2. The more platforms you add, the more packed they get.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	objectId: 0x1d,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	settingsType: 'single',
	defaultSettings: { width: 2, direction: 'down', count: 3 },

	toSpriteBinary({ x, y, settings }) {
		const width = (settings.width ?? this.defaultSettings!.width) as Width;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const count = (settings.count ?? this.defaultSettings!.count) as number;

		const widthNibble = width & 1;
		const dirNibble = direction === 'up' ? 0 : 1;
		const configByte = (widthNibble << 4) | dirNibble;

		return [0, this.objectId, x, y, configByte, count - 1];
	},

	simpleRender(size) {
		const style = { width: size, height: size, backgroundSize: '100% 25%' };
		return (
			<div
				className="FallAwayPlatform-bg bg-center bg-no-repeat flex flex-col items-center justify-between"
				style={style}
			>
				<IconUTurn className="transform rotate-90" />
				<IconUTurn className="transform -rotate-90" />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity, room }) {
		const width = (settings.width ?? this.defaultSettings!.width) as Width;
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const count = (settings.count ?? this.defaultSettings!.count) as number;

		const DirectionIcon = directionToIcon[direction];

		const pieceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE / 2,
		};

		const bodyPieces = [];

		for (let i = 0; i < width - 2; i += 1) {
			bodyPieces.push(
				<div
					key={i}
					className="FloatingPlatformCenter-bg bg-cover"
					style={pieceStyle}
				/>
			);
		}
		const platform = (
			<>
				<div className="flex flex-row">
					<div
						className="FloatingPlatformLeftEnd-bg bg-cover"
						style={pieceStyle}
					/>
					{bodyPieces}
					<div
						className="FloatingPlatformRightEnd-bg bg-cover"
						style={pieceStyle}
					/>
				</div>
			</>
		);

		const style = { width: TILE_SIZE * width, height: TILE_SIZE / 2 };

		const directionBoxStyle = getDirectionBoxStyle(
			direction,
			entity,
			room?.roomTileHeight
		);

		return (
			<div
				className={clsx('relative', {
					[styles.resizing]: settings?.resizing,
				})}
				style={style}
			>
				<div
					style={directionBoxStyle}
					className="absolute left-0 w-full opacity-30 bg-green-500 pointer-events-none"
				/>
				<div
					style={{
						top: TILE_SIZE / 2,
						height: `calc(100% - ${TILE_SIZE / 2}px`,
					}}
					className="absolute left-0 w-full opacity-20 bg-green-500"
				/>
				<div className="top-0 left-0 w-full z-10">{platform}</div>
				{!!entity && (
					<div
						style={{ top: TILE_SIZE * 0.5 + 1, width: TILE_SIZE * 2 }}
						className="absolute left-0 flex flex-row justify-around align-start z-10"
					>
						<NumberButton
							className="pointer-events-auto"
							currentValue={count}
							range={[1, 14]}
							onNewValue={(newValue) => {
								onSettingsChange({ count: newValue });
							}}
						/>
						<button
							className="pointer-events-auto"
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();

								const dirIndex = directions.indexOf(direction);
								const newDirIndex = (dirIndex + 1) % directions.length;
								const newDir = directions[newDirIndex];
								onSettingsChange({
									direction: newDir,
								});
							}}
						>
							<DirectionIcon
								style={{ borderRadius: '10%', padding: 0.5 }}
								className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
							/>
						</button>
						<PlatformWidthButton
							widths={[2, 3]}
							currentWidth={width}
							onWidthChange={(newWidth) => {
								onSettingsChange({ width: newWidth });
							}}
						/>
					</div>
				)}
			</div>
		);
	},
};

export { PlatformWrapAround };
