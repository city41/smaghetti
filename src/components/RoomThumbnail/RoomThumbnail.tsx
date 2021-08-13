import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../tiles/constants';

import { entityMap } from '../../entities/entityMap';

import styles from './RoomThumbnail.module.css';
import { LevelBackground } from '../LevelBackground';

type RoomThumbnailProps = {
	className?: string;
	upperLeftTile: Point;
	widthInTiles: number;
	heightInTiles: number;
	scale: number;
	room: RoomData;
	children?: ReactNode;
	prioritizeObjects?: boolean;
};

type MatrixRowProps = {
	entities: Array<EditorEntity | null>;
	room: RoomData;
	startingX: number;
	y: number;
	width: number;
};

function MatrixRow({ entities, room, startingX, y, width }: MatrixRowProps) {
	const tileEls = entities.map((t, x) => {
		if (!t || x < x || x >= x + width) {
			return null;
		}
		const style = {
			position: 'absolute',
			left: (x - startingX) * TILE_SIZE,
			top: 0,
		} as const;

		return (
			<div key={t.id} style={style}>
				{entityMap[t.type].render({
					showDetails: false,
					settings: t.settings ?? {},
					onSettingsChange: () => {},
					entity: t,
					room,
				})}
			</div>
		);
	});

	return (
		<div style={{ position: 'absolute', top: y * TILE_SIZE, left: 0 }}>
			{tileEls}
		</div>
	);
}

type EntitiesProps = {
	entities: EditorEntity[];
	room: RoomData;
	upperLeftTile: Point;
	widthInTiles: number;
	heightInTiles: number;
};

function Entities({
	entities,
	room,
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

		const top = e.y - upperLeftTile.y * TILE_SIZE;
		const left = e.x - upperLeftTile.x * TILE_SIZE;

		// don't bother to render the entity if it won't be seen
		if (top >= height || left >= width) {
			return null;
		}

		const body =
			entityMap[e.type]?.render({
				showDetails: false,
				settings: e.settings ?? {},
				onSettingsChange: () => {},
				entity: e,
				room,
			}) ?? null;

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
	room: RoomData;
	upperLeftTile: Point;
	widthInTiles: number;
	heightInTiles: number;
};

function Matrix({
	matrix,
	room,
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
				room={room}
				y={y - upperLeftTile.y}
				startingX={upperLeftTile.x}
				width={widthInTiles}
			/>
		);
	});

	return <>{rows}</>;
}

const RoomThumbnail = React.memo(function RoomThumbnail({
	className,
	upperLeftTile,
	widthInTiles,
	heightInTiles,
	scale,
	room,
	children,
	prioritizeObjects,
}: RoomThumbnailProps) {
	const canvasWidth = widthInTiles * TILE_SIZE;
	const canvasHeight = heightInTiles * TILE_SIZE;

	const outerWidth = widthInTiles * TILE_SIZE * scale;
	const outerHeight = heightInTiles * TILE_SIZE * scale;

	const stageMatrix = (
		<Matrix
			room={room}
			matrix={room.stage.matrix}
			upperLeftTile={upperLeftTile}
			heightInTiles={heightInTiles}
			widthInTiles={widthInTiles}
		/>
	);
	const actorMatrix = (
		<Matrix
			room={room}
			matrix={room.actors.matrix}
			upperLeftTile={upperLeftTile}
			heightInTiles={heightInTiles}
			widthInTiles={widthInTiles}
		/>
	);

	const stageEntities = (
		<Entities
			entities={room.stage.entities}
			room={room}
			upperLeftTile={upperLeftTile}
			heightInTiles={heightInTiles}
			widthInTiles={widthInTiles}
		/>
	);

	const actorEntities = (
		<Entities
			entities={room.actors.entities}
			room={room}
			upperLeftTile={upperLeftTile}
			heightInTiles={heightInTiles}
			widthInTiles={widthInTiles}
		/>
	);

	const body = prioritizeObjects ? (
		<>
			{actorEntities}
			{stageEntities}
			{actorMatrix}
			{stageMatrix}
		</>
	) : (
		<>
			{stageMatrix}
			{actorMatrix}
			{stageEntities}
			{actorEntities}
		</>
	);

	return (
		<div
			style={{ width: outerWidth, height: outerHeight }}
			className={clsx(
				className,
				styles.root,
				'overflow-hidden pointer-events-none'
			)}
		>
			<div
				className="relative"
				style={{
					width: canvasWidth,
					height: canvasHeight,
					transformOrigin: 'top left',
					transform: `scale(${scale}, ${scale})`,
				}}
			>
				{typeof room.settings.bgGraphic === 'number' && (
					<LevelBackground
						className="absolute top-0 left-0 w-full h-full opacity-50"
						bgNumber={room.settings.bgGraphic}
					/>
				)}
				{body}
				{children}
			</div>
		</div>
	);
});

export { RoomThumbnail };
