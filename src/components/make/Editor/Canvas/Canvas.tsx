import React, {
	CSSProperties,
	FunctionComponent,
	useRef,
	useState,
	memo,
} from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';

import { Entity } from '../../../Entity';
import { Tile } from '../../../Tile';
import { TILE_SIZE } from '../../../../tiles/constants';
import { MouseMode } from '../../editorSlice';
import {
	PLAY_WINDOW_TILE_WIDTH,
	PLAY_WINDOW_TILE_HEIGHT,
} from '../../constants';
import { snap } from '../../../../util/snap';
import { useScrollWheel } from './useScrollWheel';

import styles from './Canvas.module.css';
import { entityMap, EntityType } from '../../../../entities/entityMap';

type OnPaintedArg = {
	points: Point[];
	newGroup: boolean;
};

type CanvasProps = {
	className?: string;
	width: number;
	height: number;
	scale: number;
	currentPaletteEntry?: EntityType;
	entities: EditorEntity[];
	focused: Record<number, boolean>;
	isSelecting: boolean;
	dragOffset: Point | null;
	tiles: TileMatrix;
	showGrid: boolean;
	mouseMode: MouseMode;
	onEntityDropped: (entity: EditorEntity | NewEntity) => void;
	onPainted: (arg: OnPaintedArg) => void;
	onDeleteFocused: () => void;
	onScaleDecreased: () => void;
	onScaleIncreased: () => void;
	onEntitySettingsChange: (arg: {
		id: number;
		settings: EntitySettings;
	}) => void;
};

function getTranslation(scale: number): string {
	return `${((scale - 1) / 2) * 100}%`;
}

// const Root = styled.div`
// 	transform: translateX(var(--translation)) translateY(var(--translation))
// 		scale(var(--scale));
//
// 	position: relative;
//
// 	box-shadow: 0px 3px 6px -2px rgba(0, 0, 0, 0.75);
//
// 	&.draw,
// 	&.fill {
// 		cursor: crosshair;
// 	}
//
// 	&.erase {
// 		cursor: url('${eraseCursorPng}') 7 16, auto;
// 	}
//
// 	background-image: url(${bg});
// 	background-size: 8px 8px;
// 	// background-color: #001f64;
// 	background-color: #bed0f7;
//
// 	// &::after {
// 	//   content: '';
//
// 	//   position: absolute;
// 	//   top: 0;
// 	//   left: 0;
// 	//   width: 100%;
// 	//   height: 100%;
//
// 	//   background-color: rgba(255, 0, 0, 0.2);
// 	//   z-index: -1;
// 	// }
// `;

type TileRowProps = {
	tiles: (Tile | null)[];
	y: number;
	focused: Record<number, boolean>;
	dragOffset: Point | null;
	onEntitySettingsChange: (arg: {
		id: number;
		settings: EntitySettings;
	}) => void;
};

const TileRow: FunctionComponent<TileRowProps> = memo(function TileRow({
	tiles,
	y,
	focused,
	dragOffset,
	onEntitySettingsChange,
}) {
	const tileEls = tiles.map((t, x) => {
		const isFocused = !dragOffset && t !== null && focused[t.id];

		return (
			t && (
				<Tile
					left={x * TILE_SIZE}
					key={t.id}
					id={t.id}
					tileType={t.tileType}
					animateIn
					focused={isFocused}
					settings={t.settings}
					onEntitySettingsChange={onEntitySettingsChange}
					opacity={dragOffset && focused[t.id] ? 0.3 : 1}
				/>
			)
		);
	});

	let draggingEls = null;

	if (dragOffset) {
		draggingEls = tiles.map((t, x) => {
			if (!t) {
				return null;
			}

			if (focused[t.id]) {
				return (
					<Tile
						left={x * TILE_SIZE + dragOffset.x}
						top={dragOffset.y}
						key={`dragging-${t.id}`}
						id={t.id}
						tileType={t.tileType}
						focused
					/>
				);
			} else {
				return null;
			}
		});
	}

	return (
		<div style={{ position: 'absolute', top: y * TILE_SIZE }}>
			{tileEls}
			{draggingEls}
		</div>
	);
});

type EntitiesProps = {
	entities: EditorEntity[];
	mouseMode: MouseMode;
	focused: Record<number, boolean>;
	isSelecting: boolean;
	dragOffset: Point | null;
	disableAllDrag: boolean;
	onEntitySettingsChange: (arg: {
		id: number;
		settings: EntitySettings;
	}) => void;
};

const Entities = memo(function Entities({
	entities,
	mouseMode,
	focused,
	isSelecting,
	dragOffset,
	disableAllDrag,
	onEntitySettingsChange,
}: EntitiesProps) {
	return (
		<>
			{entities.map((e) => {
				const isFocused =
					focused[e.id] && (mouseMode === 'select' || mouseMode === 'pan');
				const soleFocused =
					isFocused && Object.keys(focused).length === 1 && !isSelecting;

				return (
					<Entity
						key={`${e.type}-${e.id}`}
						style={{
							position: 'absolute',
							top: e.y,
							left: e.x,
						}}
						id={e.id}
						type={e.type}
						settings={e.settings}
						disableDrag={!!e.disableDrag || disableAllDrag}
						focused={!dragOffset && isFocused}
						soleFocused={!dragOffset && soleFocused}
						opacity={!!dragOffset && isFocused ? 0.3 : 1}
						onEntitySettingsChange={onEntitySettingsChange}
					/>
				);
			})}
			{!!dragOffset &&
				entities.map((e) => {
					if (!focused[e.id]) {
						return null;
					}

					return (
						<Entity
							key={`dragging-${e.type}-${e.id}`}
							style={{
								position: 'absolute',
								top: e.y + dragOffset.y,
								left: e.x + dragOffset.x,
							}}
							id={e.id}
							type={e.type}
							settings={e.settings}
							disableDrag={true}
							focused
						/>
					);
				})}
		</>
	);
});

function getPointsBetween(oldP: Point, newP: Point, scale: number): Point[] {
	let distance = Math.sqrt((newP.x - oldP.x) ** 2 + (newP.y - oldP.y) ** 2);

	const step = Math.min(TILE_SIZE * scale, TILE_SIZE);

	if (distance <= step) {
		return [oldP, newP];
	}

	const points: Point[] = [];
	const angleFromAToB_rads = Math.atan2(newP.y - oldP.y, newP.x - oldP.x);

	let curPoint = oldP;

	while (distance > step) {
		const nextPoint = {
			x: curPoint.x + Math.cos(angleFromAToB_rads) * step,
			y: curPoint.y + Math.sin(angleFromAToB_rads) * step,
		};

		points.push(nextPoint);

		distance = Math.sqrt(
			(newP.x - nextPoint.x) ** 2 + (newP.y - nextPoint.y) ** 2
		);

		curPoint = nextPoint;
	}

	points.push(newP);

	return points;
}

const Canvas: FunctionComponent<CanvasProps> = memo(function Canvas({
	className,
	width,
	height,
	scale,
	currentPaletteEntry,
	entities,
	focused,
	isSelecting,
	dragOffset,
	tiles,
	showGrid,
	mouseMode,
	onPainted,
	onDeleteFocused,
	onScaleDecreased,
	onScaleIncreased,
	onEntitySettingsChange,
}) {
	const [divRef, setDivRef] = useState<HTMLDivElement | null>(null);
	const [mouseDown, setMouseDown] = useState(false);
	const tileGhostRef = useRef<HTMLDivElement | null>(null);
	const entityGhostRef = useRef<HTMLDivElement | null>(null);
	const lastMousePoint = useRef<Point | null>(null);

	useHotkeys('del', () => onDeleteFocused());

	useScrollWheel({
		down: onScaleDecreased,
		up: onScaleIncreased,
		ref: divRef,
	});

	const style = {
		'--scale': scale,
		'--translation': getTranslation(scale),
		width,
		height,
	} as CSSProperties;

	const gridDisplay = showGrid ? 'block' : 'none';
	const tileGridStyles = {
		'--grid-width': `${TILE_SIZE}px`,
		'--grid-height': `${TILE_SIZE}px`,
		'--grid-line-width': '0.3px',
		'--grid-color': 'rgba(0, 0, 0, 0.3)',
		display: gridDisplay,
	} as CSSProperties;

	const viewportGridStyles = {
		'--grid-width': `${TILE_SIZE * PLAY_WINDOW_TILE_WIDTH}px`,
		'--grid-height': `${TILE_SIZE * PLAY_WINDOW_TILE_HEIGHT}px`,
		'--grid-line-width': '0.8px',
		'--grid-color': 'rgba(255, 255, 255, 0.6)',
		backgroundPosition: 'left bottom',
		display: gridDisplay,
	} as CSSProperties;

	function getMousePoint(e: React.MouseEvent<HTMLDivElement>): Point {
		let rect;
		if (divRef) {
			rect = divRef.getBoundingClientRect();
		} else {
			rect = { x: 0, y: 0 };
		}

		const x = (e.clientX - rect.x) / scale;
		const y = (e.clientY - rect.y) / scale;

		return { x, y };
	}
	function sendPaint(curMousePoint: Point, newGroup: boolean) {
		const lastPoint = newGroup
			? curMousePoint
			: lastMousePoint.current ?? curMousePoint;

		const allPoints = getPointsBetween(lastPoint, curMousePoint, scale);

		onPainted({ points: allPoints, newGroup });

		lastMousePoint.current = curMousePoint;
	}

	const tileRows = tiles.map(
		(row, y) =>
			row && (
				<TileRow
					key={y}
					tiles={row}
					y={y}
					focused={focused}
					dragOffset={dragOffset}
					onEntitySettingsChange={onEntitySettingsChange}
				/>
			)
	);

	const borderStyle = {
		width: width * scale + 4,
		height: height * scale + 4,
	};

	const tileGhostDisplay =
		mouseMode === 'draw' &&
		currentPaletteEntry &&
		entityMap[currentPaletteEntry].editorType === 'tile'
			? 'block'
			: 'none';
	const entityGhostDisplay =
		mouseMode === 'draw' &&
		currentPaletteEntry &&
		entityMap[currentPaletteEntry].editorType === 'entity'
			? 'block'
			: 'none';

	return (
		// TODO: why is border on its own div? probably due to scaling?
		<div className="border-2 border-black" style={borderStyle}>
			<div
				className={clsx(
					className,
					styles.root,
					'UndergroundBackground-bg',
					'relative shadow-lg bg-blue-200',
					{
						'cursor-crosshair': mouseMode === 'draw' || mouseMode === 'fill',
					}
				)}
				ref={(div) => {
					setDivRef(div);
				}}
				style={style}
				onMouseDown={(e) => {
					if (mouseMode === 'pan') {
						return;
					}

					// ignore right clicks, and also ignore clicks on tiles/entities
					if (
						e.button !== 0 ||
						(e.target !== divRef &&
							(e.target as HTMLElement).getAttribute('data-editor-type') ===
								'entity' &&
							mouseMode === 'draw')
					) {
						setMouseDown(false);
						return;
					}

					if (mouseMode !== 'select') {
						setMouseDown(true);
						const mousePoint = getMousePoint(e);
						lastMousePoint.current = mousePoint;
						sendPaint(mousePoint, true);
					}
				}}
				onMouseUp={() => {
					setMouseDown(false);
					lastMousePoint.current = null;
				}}
				onMouseMove={(e) => {
					if (mouseDown) {
						sendPaint(getMousePoint(e), false);
					} else {
						const ghostPoint = getMousePoint(e);
						if (tileGhostRef.current) {
							tileGhostRef.current.style.left =
								snap(ghostPoint.x, TILE_SIZE) + 'px';
							tileGhostRef.current.style.top =
								snap(ghostPoint.y, TILE_SIZE) + 'px';
						}
						if (
							entityGhostRef.current &&
							currentPaletteEntry &&
							entityMap[currentPaletteEntry].editorType === 'entity'
						) {
							entityGhostRef.current.style.left =
								snap(ghostPoint.x, TILE_SIZE) + 'px';
							entityGhostRef.current.style.top =
								snap(ghostPoint.y, TILE_SIZE) + 'px';
						}
					}
				}}
				onMouseLeave={() => {
					setMouseDown(false);
				}}
			>
				{currentPaletteEntry &&
					entityMap[currentPaletteEntry].editorType === 'tile' && (
						<Tile
							ref={tileGhostRef}
							opacity={0.3}
							style={{
								display: tileGhostDisplay,
								position: 'fixed',
								zIndex: 200,
							}}
							tileType={currentPaletteEntry}
						/>
					)}
				{currentPaletteEntry &&
					entityMap[currentPaletteEntry].editorType === 'entity' && (
						<Entity
							ref={entityGhostRef}
							opacity={0.3}
							style={{
								display: entityGhostDisplay,
								position: 'fixed',
								zIndex: 200,
							}}
							type={currentPaletteEntry}
						/>
					)}
				<div className={styles.grid} style={tileGridStyles} />
				<div className={styles.grid} style={viewportGridStyles} />
				{tileRows}
				<Entities
					entities={entities}
					focused={focused}
					isSelecting={isSelecting}
					mouseMode={mouseMode}
					dragOffset={dragOffset}
					disableAllDrag={mouseMode !== 'select'}
					onEntitySettingsChange={onEntitySettingsChange}
				/>
			</div>
		</div>
	);
});

export { Canvas };
export type { CanvasProps };
