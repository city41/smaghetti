import React from 'react';
import { TILE_SIZE } from '../../tiles/constants';
import clsx from 'clsx';
import { Resizer } from '../Resizer';

import styles from '../Resizer/ResizingStyles.module.css';
import { TileSpace } from '../../entities/TileSpace';

type PlateauProps = {
	bgClassName: string;
	settings: EditorEntitySettings;
	entity: EditorEntity | undefined;
	room: RoomData | undefined;
	onSettingsChange: (newSettings: EditorEntitySettings) => void;
};

function getHeight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined,
	width: number
): number {
	if (!entity || !room) {
		return 2;
	}

	const ey = entity.y / TILE_SIZE;
	const ex = entity.x / TILE_SIZE;

	for (let y = ey + 1; y < room.roomTileHeight; ++y) {
		for (let x = ex; x < ex + width; ++x) {
			if (room.stage.matrix[y]?.[x]) {
				return y - ey;
			}
		}
	}

	return room.roomTileHeight - ey;
}

/**
 * This component extracts the common rendering needs used by all the plateaus:
 * GrassPlateau, SnowPlateau, etc.
 */
function Plateau({
	bgClassName,
	settings,
	entity,
	room,
	onSettingsChange,
}: PlateauProps) {
	const width = settings.width ?? 3;
	const height = getHeight(entity, room, width);

	const style = {
		width: width * TILE_SIZE,
		height: height * TILE_SIZE,
	};

	const leftCornerStyle = {
		width: TILE_SIZE,
		height: TILE_SIZE,
	};

	const rightCornerStyle = {
		width: TILE_SIZE,
		height: TILE_SIZE,
		backgroundPositionX: -TILE_SIZE * 2,
	};

	const plateauCenterStyle = {
		width: TILE_SIZE,
		height: TILE_SIZE,
		backgroundPositionX: -TILE_SIZE,
	};

	const plateaCenterPieces = [];
	for (let i = 0; i < width - 2; ++i) {
		plateaCenterPieces.push(
			<div style={plateauCenterStyle} className={bgClassName} />
		);
	}

	const plateau = (
		<div className="flex flex-row">
			<div className={bgClassName} style={leftCornerStyle} />
			{plateaCenterPieces}
			<div className={bgClassName} style={rightCornerStyle} />
		</div>
	);

	const leftBodyStyle = {
		width: TILE_SIZE,
		height: TILE_SIZE,
		backgroundPositionY: -TILE_SIZE,
	};

	const rightBodyStyle = {
		width: TILE_SIZE,
		height: TILE_SIZE,
		backgroundPositionX: -TILE_SIZE * 2,
		backgroundPositionY: -TILE_SIZE,
	};

	const centerBodyStyle = {
		width: TILE_SIZE,
		height: TILE_SIZE,
		backgroundPositionX: -TILE_SIZE,
		backgroundPositionY: -TILE_SIZE,
	};

	const bodyCenterPieces = [];
	for (let i = 0; i < width - 2; ++i) {
		bodyCenterPieces.push(
			<div style={centerBodyStyle} className={bgClassName} />
		);
	}

	const bodyRow = (
		<div className="flex flex-row">
			<div className={bgClassName} style={leftBodyStyle} />
			{bodyCenterPieces}
			<div className={bgClassName} style={rightBodyStyle} />
		</div>
	);

	const bodyRows = [];
	for (let i = 0; i < height - 1; ++i) {
		bodyRows.push(bodyRow);
	}

	const size = { x: width, y: 1 };

	return (
		<div
			className={clsx('relative', {
				[styles.resizing]: settings?.resizing,
			})}
			style={style}
		>
			{plateau}
			{bodyRows}
			{entity && (
				<Resizer
					className="absolute top-0 right-0"
					style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
					size={size}
					increment={TILE_SIZE}
					axis="x"
					onSizeChange={(newSizePoint) => {
						onSettingsChange({ width: Math.max(2, newSizePoint.x) });
					}}
					onResizeStart={() => onSettingsChange({ resizing: true })}
					onResizeEnd={() => onSettingsChange({ resizing: false })}
				/>
			)}
			<TileSpace
				className="absolute top-0 left-0 w-full"
				style={{ height: TILE_SIZE }}
			/>
		</div>
	);
}

export { Plateau };
