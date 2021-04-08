import React from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../tiles/constants';

import { Entity as EntityCmp } from '../Entity';
import { Tile } from '../Tile';

type LevelThumbnailProps = {
	className?: string;
	tileX: number;
	tileY: number;
	tileWidth: number;
	tileHeight: number;
	scale: number;
	tileData: TileMatrix;
	entities: EditorEntity[];
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
	scale,
	tileData,
	entities,
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
				disableDrag
				scale={scale}
			/>
		);
	});

	return (
		<div
			className={clsx(className, 'relative overflow-hidden')}
			style={{ width, height }}
		>
			{tileRows}
			{entityCmps}
		</div>
	);
}

export { LevelThumbnail };
