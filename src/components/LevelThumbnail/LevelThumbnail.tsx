import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../tiles/constants';

import { Entity as EntityCmp } from '../Entity';
import { Tile } from '../Tile';
import { bgGraphicToResourceMap } from '../../resources/bgGraphicToResourceMap';

type LevelThumbnailProps = {
	className?: string;
	tileX: number;
	tileY: number;
	tileWidth: number;
	tileHeight: number;
	bgGraphic?: number;
	scale: number;
	tileData: TileMatrix;
	entities: EditorEntity[];
	children?: ReactNode;
};

type TileRowProps = {
	tiles: Array<Tile | null>;
	y: number;
	scale: number;
	tileX: number;
	tileWidth: number;
};

function TileRow({ tiles, y, scale, tileX, tileWidth }: TileRowProps) {
	const tileEls = tiles.map((t, x) => {
		if (!t || x < tileX || x >= tileX + tileWidth) {
			return null;
		}
		return (
			<Tile
				left={(x - tileX) * TILE_SIZE * scale}
				key={t.id}
				id={t.id}
				tileType={t.tileType}
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
	tileData,
	entities,
	children,
}: LevelThumbnailProps) {
	const width = tileWidth * TILE_SIZE * scale;
	const height = tileHeight * TILE_SIZE * scale;

	const tileRows = tileData.map((row, y) => {
		if (!row || y < tileY || y >= tileY + tileHeight) {
			return null;
		}

		return (
			<TileRow
				key={y}
				tiles={row}
				y={y - tileY}
				scale={scale}
				tileX={tileX}
				tileWidth={tileWidth}
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
