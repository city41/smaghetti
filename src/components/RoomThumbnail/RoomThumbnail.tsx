import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../tiles/constants';

import { bgGraphicToResourceMap } from '../../resources/bgGraphicToResourceMap';
import { scaledEntityRender } from '../../entities/util';

type RoomThumbnailProps = {
	className?: string;
	upperLeftTile: Point;
	widthInTiles: number;
	heightInTiles: number;
	scale: number;
	room: RoomData;
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
		const style = {
			position: 'absolute',
			left: (x - startingX) * TILE_SIZE * scale,
			top: 0,
		} as const;

		return (
			<div key={t.id} style={style}>
				{scaledEntityRender(t.type, scale)}
			</div>
		);
	});

	return (
		<div style={{ position: 'absolute', top: y * TILE_SIZE * scale, left: 0 }}>
			{tileEls}
		</div>
	);
}

type EntitiesProps = {
	entities: EditorEntity[];
	scale: number;
	upperLeftTile: Point;
	widthInTiles: number;
	heightInTiles: number;
};

function Entities({
	entities,
	scale,
	upperLeftTile,
	widthInTiles,
	heightInTiles,
}: EntitiesProps) {
	const width = widthInTiles * TILE_SIZE;
	const height = heightInTiles * TILE_SIZE;

	const entityCmps = entities.map((e) => {
		// thumbnail never shows the player
		if (e.type === 'Player') {
			return null;
		}

		const top = (e.y - upperLeftTile.y * TILE_SIZE) * scale;
		const left = (e.x - upperLeftTile.x * TILE_SIZE) * scale;

		// don't bother to render the entity if it won't be seen
		if (top >= height || left >= width) {
			return null;
		}

		const body = scaledEntityRender(e.type, scale);

		return (
			<div
				key={e.id}
				style={{
					position: 'absolute',
					top,
					left,
				}}
			>
				{body}
			</div>
		);
	});

	return <>{entityCmps}</>;
}

type MatrixProps = {
	matrix: EditorEntityMatrix;
	scale: number;
	upperLeftTile: Point;
	widthInTiles: number;
	heightInTiles: number;
};

function Matrix({
	matrix,
	scale,
	upperLeftTile,
	widthInTiles,
	heightInTiles,
}: MatrixProps) {
	const rows = matrix.map((row, y) => {
		if (!row || y < upperLeftTile.y || y >= upperLeftTile.y + heightInTiles) {
			return null;
		}

		return (
			<MatrixRow
				key={y}
				entities={row}
				y={y - upperLeftTile.y}
				scale={scale}
				startingX={upperLeftTile.x}
				width={widthInTiles}
			/>
		);
	});

	return <>{rows}</>;
}

function RoomThumbnail({
	className,
	upperLeftTile,
	widthInTiles,
	heightInTiles,
	scale,
	room,
	children,
}: RoomThumbnailProps) {
	const width = widthInTiles * TILE_SIZE * scale;
	const height = heightInTiles * TILE_SIZE * scale;

	return (
		<div
			className={clsx(className, 'relative overflow-hidden')}
			style={{ width, height }}
		>
			{typeof room.settings.bgGraphic === 'number' && (
				<div
					className={clsx(
						'absolute top-0 left-0 w-full h-full opacity-50',
						bgGraphicToResourceMap[room.settings.bgGraphic]
					)}
				/>
			)}
			<Matrix
				matrix={room.actors.matrix}
				scale={scale}
				upperLeftTile={upperLeftTile}
				heightInTiles={heightInTiles}
				widthInTiles={widthInTiles}
			/>
			<Matrix
				matrix={room.stage.matrix}
				scale={scale}
				upperLeftTile={upperLeftTile}
				heightInTiles={heightInTiles}
				widthInTiles={widthInTiles}
			/>
			<Entities
				entities={room.actors.entities}
				scale={scale}
				upperLeftTile={upperLeftTile}
				heightInTiles={heightInTiles}
				widthInTiles={widthInTiles}
			/>
			<Entities
				entities={room.stage.entities}
				scale={scale}
				upperLeftTile={upperLeftTile}
				heightInTiles={heightInTiles}
				widthInTiles={widthInTiles}
			/>
			{children}
		</div>
	);
}

export { RoomThumbnail };
