import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../tiles/constants';

import { Entity as EntityCmp } from '../Entity';
import { Cell } from '../Cell';
import { bgGraphicToResourceMap } from '../../resources/bgGraphicToResourceMap';

type LevelThumbnailProps = {
	className?: string;
	tileX: number;
	tileY: number;
	tileWidth: number;
	tileHeight: number;
	bgGraphic?: number;
	scale: number;
	matrix: EditorEntityMatrix;
	entities: EditorEntity[];
	children?: ReactNode;
};

type MatrixRowProps = {
	entities: Array<EditorEntity | null>;
	scale: number;
	startingX: number;
	y: number;
	width: number;
};

function MatrixRow({ entities, startingX, y, scale, width }: MatrixRowProps) {
	const tileEls = entities.map((t, x) => {
		if (!t || x < x || x >= x + width) {
			return null;
		}
		return (
			<Cell
				left={(x - startingX) * TILE_SIZE * scale}
				key={t.id}
				id={t.id}
				type={t.type}
				scale={scale}
			/>
		);
	});

	return (
		<div style={{ position: 'absolute', top: y * TILE_SIZE * scale, left: 0 }}>
			{tileEls}
		</div>
	);
}

function LevelThumbnail({
	className,
	tileX,
	tileY,
	tileWidth,
	tileHeight,
	bgGraphic,
	scale,
	matrix,
	entities,
	children,
}: LevelThumbnailProps) {
	const width = tileWidth * TILE_SIZE * scale;
	const height = tileHeight * TILE_SIZE * scale;

	const tileRows = matrix.map((row, y) => {
		if (!row || y < tileY || y >= tileY + tileHeight) {
			return null;
		}

		return (
			<MatrixRow
				key={y}
				entities={row}
				y={y - tileY}
				scale={scale}
				startingX={tileX}
				width={tileWidth}
			/>
		);
	});

	const entityCmps = entities.map((e) => {
		// thumbnail never shows the player
		if (e.type === 'Player') {
			return null;
		}

		const top = (e.y - tileY * TILE_SIZE) * scale;
		const left = (e.x - tileX * TILE_SIZE) * scale;

		// don't bother to render the entity if it won't be seen
		if (top >= height || left >= width) {
			return null;
		}

		return (
			<EntityCmp
				key={e.id}
				style={{
					position: 'absolute',
					top,
					left,
				}}
				type={e.type}
				scale={scale}
			/>
		);
	});

	return (
		<div
			className={clsx(className, 'relative overflow-hidden')}
			style={{ width, height }}
		>
			{typeof bgGraphic === 'number' && (
				<div
					className={clsx(
						'absolute top-0 left-0 w-full h-full opacity-50',
						bgGraphicToResourceMap[bgGraphic]
					)}
				/>
			)}
			{tileRows}
			{entityCmps}
			{children}
		</div>
	);
}

export { LevelThumbnail };
