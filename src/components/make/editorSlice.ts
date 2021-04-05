import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import undoable, {
	ActionTypes as ReduxUndoActionTypes,
	ActionCreators,
	excludeAction,
	StateWithHistory,
} from 'redux-undo';
import produce from 'immer';
import { AppState } from '../../store';
import {
	MIN_LEVEL_TILE_WIDTH,
	MAX_LEVEL_TILE_WIDTH,
	MIN_LEVEL_TILE_HEIGHT,
	MAX_LEVEL_TILE_HEIGHT,
	INITIAL_LEVEL_TILE_HEIGHT,
	INITIAL_LEVEL_TILE_WIDTH,
	INITIAL_PLAYER_Y_TILE,
	INITIAL_PLAYER_X_TILE,
	PLAY_WINDOW_TILE_WIDTH,
	PLAY_WINDOW_TILE_HEIGHT,
} from './constants';
import { getPlayerScaleFromWindow } from '../../util/getPlayerScaleFromWindow';
import { saveLevel as saveLevelMutation } from '../../remoteData/saveLevel';
import { getLevel as getLevelQuery } from '../../remoteData/getLevel';
import { serialize } from '../../level/serialize';
import { deserialize } from '../../level/deserialize';
import isEqual from 'lodash/isEqual';

import { TILE_SIZE, TILE_TYPE_TO_GROUP_TYPE_MAP } from '../../tiles/constants';
import { entityMap, EntityType } from '../../entities/entityMap';

type LocalStorageData = {
	metadata: {
		name: string;
	};
	levelData: SerializedLevelData;
	editorData: {
		paletteEntries: EntityType[];
	};
};

type MouseMode = 'select' | 'draw' | 'fill' | 'erase' | 'pan';

type EditorFocusRect = {
	offset: Point;
	width: number;
	height: number;
};

const nonDeletableEntityTypes = ['Player'];

const playerScale = getPlayerScaleFromWindow();
const scales: number[] = [
	playerScale / 6,
	playerScale / 4,
	playerScale / 3,
	playerScale / 2,
	playerScale,
	playerScale * 2,
];

type InternalEditorState = {
	metadata: {
		name: string;
	};
	paintedGroup: string;
	entities: EditorEntity[];
	tiles: TileMatrix;
	storedMouseMode?: MouseMode | null;
	mouseMode: MouseMode;
	levelTileWidth: number;
	levelTileHeight: number;
	pendingLevelResizeIncrement: Point;
	scale: number;
	storedForResizeMode?: { scale: number; offset: Point } | null;
	canIncreaseScale: boolean;
	canDecreaseScale: boolean;
	editorVisibleWindow: EditorFocusRect;
	scrollOffset: Point;
	showGrid: boolean;

	paletteEntries: EntityType[];
	currentPaletteEntry?: EntityType;

	focused: Record<number, boolean>;
	dragOffset: Point | null;
	isSelecting: boolean;

	savedLevelId?: string;
	saveLevelState: 'dormant' | 'saving' | 'error' | 'success';

	loadLevelState: 'dormant' | 'loading' | 'error' | 'missing' | 'success';
};

const initialScale = playerScale;

/**
 * Figure out what the y scroll should be such that the player and start
 * are placed in the lower left corner of the browser window.
 *
 * NOTE: this only works correctly when the level is still INITIAL_LEVEL_TILE_HEIGHT
 * tall.
 */
function calcYForScrollToBottom() {
	if (typeof window === 'undefined') {
		return 0;
	}

	const levelHeight = INITIAL_LEVEL_TILE_HEIGHT * TILE_SIZE * initialScale;
	const windowHeight = window.innerHeight;

	return (levelHeight - windowHeight) / initialScale;
}

const defaultInitialState: InternalEditorState = {
	metadata: {
		name: 'new level',
	},
	paintedGroup: '',
	entities: [
		{
			id: 1,
			x: TILE_SIZE * INITIAL_PLAYER_X_TILE,
			y: TILE_SIZE * INITIAL_PLAYER_Y_TILE,
			type: 'Player',
		},
	],
	tiles: [],
	saveLevelState: 'dormant',
	loadLevelState: 'dormant',
	mouseMode: 'draw',
	levelTileWidth: INITIAL_LEVEL_TILE_WIDTH,
	levelTileHeight: INITIAL_LEVEL_TILE_HEIGHT,
	pendingLevelResizeIncrement: { x: 0, y: 0 },
	scale: initialScale,
	canIncreaseScale: scales.indexOf(initialScale) < scales.length - 1,
	canDecreaseScale: scales.indexOf(initialScale) > 0,
	editorVisibleWindow: {
		offset: { x: 0, y: 0 },
		width: 0,
		height: 0,
	},
	scrollOffset: { x: 0, y: calcYForScrollToBottom() },
	showGrid: true,

	paletteEntries: ['Brick', 'Coin', 'Goomba'],
	currentPaletteEntry: 'Goomba',
	focused: {},
	dragOffset: null,
	isSelecting: false,
};

const initialState = defaultInitialState;

const EMPTY_LEVEL: SerializedLevelData = {
	entities: [...initialState.entities],
	tileSettings: [],
	tileLayer: {
		data: [],
		width: PLAY_WINDOW_TILE_WIDTH,
		height: PLAY_WINDOW_TILE_HEIGHT,
	},
};

let idCounter = 10;

function getPaintedGroup(point: Point, mouseMode: MouseMode) {
	return `${mouseMode}-${point.x}-${point.y}`;
}

type FloodBounds = {
	minX: number;
	minY: number;
	maxX: number;
	maxY: number;
};

function floodFill(
	tiles: TileMatrix,
	floodTileType: EntityType,
	indexX: number,
	indexY: number,
	levelTileWidth: number,
	levelTileHeight: number
): FloodBounds {
	const targetTile = tiles[indexY]?.[indexX];
	const targetType = targetTile?.tileType ?? 0;

	const toProcess: Point[] = [{ x: indexX, y: indexY }];

	const outsideOfLevel = (p: Point): boolean => {
		return (
			p.x < 0 || p.x >= levelTileWidth || p.y < 0 || p.y >= levelTileHeight
		);
	};

	const seenPoints: Point[] = [];
	const floodBounds: FloodBounds = {
		minX: levelTileWidth,
		minY: levelTileHeight,
		maxX: 0,
		maxY: 0,
	};

	while (toProcess.length > 0) {
		const point = toProcess.pop() as Point;

		if (
			outsideOfLevel(point) ||
			seenPoints.find((sp) => sp.x === point.x && sp.y === point.y)
		) {
			continue;
		}

		seenPoints.push(point);

		floodBounds.minX = Math.min(floodBounds.minX, point.x);
		floodBounds.minY = Math.min(floodBounds.minY, point.y);
		floodBounds.maxX = Math.max(floodBounds.maxX, point.x);
		floodBounds.maxY = Math.max(floodBounds.maxY, point.y);

		const tileAtPoint = tiles[point.y]?.[point.x];

		let exploreNeighbors = false;

		if (tileAtPoint) {
			if (tileAtPoint.tileType === targetType) {
				tileAtPoint.tileType = floodTileType;
				exploreNeighbors = true;
			}
		} else if (targetType === 0) {
			tiles[point.y] = tiles[point.y] || [];
			tiles[point.y]![point.x] = {
				id: idCounter++,
				x: point.x,
				y: point.y,
				tileType: floodTileType,
				tileIndex: 0,
			};
			exploreNeighbors = true;
		}

		if (exploreNeighbors) {
			// to the left
			toProcess.push({
				x: point.x - 1,
				y: point.y,
			});
			// to the right
			toProcess.push({
				x: point.x + 1,
				y: point.y,
			});
			// to the top
			toProcess.push({
				x: point.x,
				y: point.y - 1,
			});
			// to the bottom
			toProcess.push({
				x: point.x,
				y: point.y + 1,
			});
		}
	}

	return floodBounds;
}

function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(value, max));
}

type MetadataEntity = {
	editor: {
		canvas: {
			width: number;
			height: number;
			offsetX: number;
			offsetY: number;
		};
		tiling: {
			width: number;
			height: number;
			offsetX: number;
			offsetY: number;
		};
	};
};

function getEntityPixelBounds(entity: NewEntity): Bounds {
	const spriteDef = entityMap[entity.type];
	const width = Math.max(spriteDef.tiles[0].length * 8, TILE_SIZE);
	const height = Math.max(spriteDef.tiles.length * 8, TILE_SIZE);

	return {
		upperLeft: { x: entity.x, y: entity.y },
		lowerRight: { x: entity.x + width, y: entity.y + height },
	};
}

function getEntityTileBounds(entity: NewEntity): Bounds {
	const spriteDef = entityMap[entity.type];

	const tileWidth = spriteDef.tiles[0].length / 2;
	const tileHeight = spriteDef.tiles.length / 2;

	const minX = Math.floor(entity.x / TILE_SIZE);
	const minY = Math.floor(entity.y / TILE_SIZE);

	const maxX = minX + tileWidth - 1;
	const maxY = minY + tileHeight - 1;

	return {
		upperLeft: { x: minX, y: minY },
		lowerRight: { x: maxX, y: maxY },
	};
}

function pointIsInside(a: Point, b: Bounds) {
	if (a.x < b.upperLeft.x) {
		return false;
	}

	// a is completely to the right of b
	if (a.x > b.lowerRight.x) {
		return false;
	}

	// a is completely above b
	if (a.y < b.upperLeft.y) {
		return false;
	}

	// a is completely below b
	if (a.y > b.lowerRight.y) {
		return false;
	}

	return true;
}

function overlap(a: Bounds, b: Bounds): boolean {
	// a is completely to the left of b
	if (a.lowerRight.x < b.upperLeft.x) {
		return false;
	}

	// a is completely to the right of b
	if (a.upperLeft.x > b.lowerRight.x) {
		return false;
	}

	// a is completely above b
	if (a.lowerRight.y < b.upperLeft.y) {
		return false;
	}

	// a is completely below b
	if (a.upperLeft.y > b.lowerRight.y) {
		return false;
	}

	return true;
}

function isNotANewEntity(e: NewEntity | EditorEntity): e is EditorEntity {
	return 'id' in e && !!e.id;
}

function canDrop(entity: NewEntity | EditorEntity, entities: EditorEntity[]) {
	const entityBounds = getEntityTileBounds(entity);

	return !entities.some((otherEntity) => {
		// ignore the current entity, allow it to drop back down onto itself
		if (isNotANewEntity(entity) && otherEntity.id === entity.id) {
			return false;
		}

		const otherBounds = getEntityTileBounds(otherEntity);

		return overlap(entityBounds, otherBounds);
	});
}

function getEntityX(inputX: number, type: EntityType): number {
	return Math.floor(inputX / TILE_SIZE) * TILE_SIZE;
}

function getEntityY(inputY: number, type: EntityType): number {
	return Math.floor(inputY / TILE_SIZE) * TILE_SIZE;
}

function deleteEntitiesWithin(
	entities: EditorEntity[],
	bounds: Bounds,
	ignore: EntityType[] = []
) {
	const entitiestoClobber = entities.filter((e) => {
		return overlap(getEntityTileBounds(e), bounds);
	});

	entitiestoClobber.forEach((e) => {
		if (ignore.indexOf(e.type) > -1) {
			return;
		}

		if (e.type === 'Player') {
			// move player to the left of the goal
			const playerBounds = getEntityTileBounds(e);
			e.x =
				bounds.upperLeft.x -
				(playerBounds.lowerRight.x - playerBounds.upperLeft.x);
		} else {
			const index = entities.indexOf(e);
			entities.splice(index, 1);
		}
	});
}

function deleteTilesWithin(tiles: TileMatrix, bounds: Bounds) {
	const matchingRows = tiles.filter((_row, y) => {
		return bounds.upperLeft.y <= y && bounds.lowerRight.y >= y;
	});

	matchingRows.forEach((row) => {
		if (row) {
			for (
				let x = bounds.upperLeft.x;
				x <= bounds.lowerRight.x && x < row.length;
				++x
			) {
				row[x] = null;
			}
		}
	});
}

function ensurePlayerIsInView(state: InternalEditorState, offsetDelta: Point) {
	const player = state.entities.find((e) => e.type === 'Player')!;

	player.x = clamp(
		player.x + offsetDelta.x,
		0,
		(state.levelTileWidth - 1) * TILE_SIZE
	);
	player.y = clamp(
		player.y + offsetDelta.y,
		0,
		(state.levelTileHeight - 1) * TILE_SIZE
	);
}

/**
 * Ensures that scrollOffset doesn't get too far out, which would cause the level
 * to completely not show up in the browser window
 */
function ensureLevelIsInView(state: InternalEditorState) {
	if (typeof window === 'undefined') {
		return;
	}

	const windowWidth = window.innerWidth / state.scale;
	const windowHeight = window.innerHeight / state.scale;

	const levelWidthPx = state.levelTileWidth * TILE_SIZE;
	const levelHeightPx = state.levelTileHeight * TILE_SIZE;

	state.scrollOffset.x = clamp(
		state.scrollOffset.x,
		-windowWidth + TILE_SIZE,
		levelWidthPx - TILE_SIZE
	);

	state.scrollOffset.y = clamp(
		state.scrollOffset.y,
		-windowHeight + TILE_SIZE,
		levelHeightPx - TILE_SIZE
	);
}

function removeOutOfBoundsEntities(state: InternalEditorState) {
	const levelBounds = {
		upperLeft: { x: 0, y: 0 },
		lowerRight: {
			x: state.levelTileWidth * TILE_SIZE,
			y: state.levelTileHeight * TILE_SIZE,
		},
	};

	state.entities = state.entities.filter((e) => {
		if (nonDeletableEntityTypes.includes(e.type)) {
			return true;
		}

		const pixelBounds = getEntityPixelBounds(e);

		return overlap(pixelBounds, levelBounds);
	});
}

function removeOutOfBoundsTiles(state: InternalEditorState) {
	state.tiles = state.tiles.map((row) => {
		return row?.slice(0, state.levelTileWidth) ?? null;
	});

	state.tiles = state.tiles.slice(0, state.levelTileHeight);
}

function scaleTo(state: InternalEditorState, newScale: number) {
	const newScaleIndex = scales.indexOf(newScale);

	state.scale = newScale;
	state.canIncreaseScale =
		newScaleIndex !== -1 && newScaleIndex < scales.length - 1;
	state.canDecreaseScale = newScaleIndex !== -1 && newScaleIndex > 0;
}

/**
 * when in resize mode, the minimum amount to have around the edges of
 * the canvas when sized to fit the window
 */
const EDGE_BUFFER_SIZE = 200;

function determineResizeScale(state: InternalEditorState): number {
	// this is actual pixels, ie when the level is scaled to 1
	const levelWidthInPixels = state.levelTileWidth * TILE_SIZE;
	const levelHeightInPixels = state.levelTileHeight * TILE_SIZE;

	const maxWidthInPixels = window.innerWidth - EDGE_BUFFER_SIZE * 2;
	const maxHeightInPixels = window.innerHeight - EDGE_BUFFER_SIZE * 2;

	const horizontalScale = maxWidthInPixels / levelWidthInPixels;
	const verticalScale = maxHeightInPixels / levelHeightInPixels;

	return Math.min(horizontalScale, verticalScale);
}

function centerLevelInWindow(state: InternalEditorState) {
	// this is onscreen pixels, as in how many pixels the level is taking up at the current scale on the window
	const levelWidthInPixels = state.levelTileWidth * TILE_SIZE * state.scale;
	const levelHeightInPixels = state.levelTileHeight * TILE_SIZE * state.scale;

	const upperPixels = (window.innerHeight - levelHeightInPixels) / 2;
	const leftPixels = (window.innerWidth - levelWidthInPixels) / 2;

	state.scrollOffset.x = -leftPixels / state.scale;
	state.scrollOffset.y = -upperPixels / state.scale;
}

function selectEntireTileEntity(
	focused: Record<number, boolean>,
	tiles: TileMatrix,
	focusedTile: Tile
) {
	const groupType = TILE_TYPE_TO_GROUP_TYPE_MAP[focusedTile.tileType];
	const { x, y } = focusedTile;

	if (groupType === 'x') {
		let startX = focusedTile.x;

		while (tiles[y]?.[startX - 1]?.tileType === focusedTile.tileType) {
			startX -= 1;
		}

		let endX = focusedTile.x;

		while (tiles[y]?.[endX + 1]?.tileType === focusedTile.tileType) {
			endX += 1;
		}

		for (let t = startX; t <= endX; ++t) {
			focused[tiles[y]![t]!.id] = true;
		}
	} else if (groupType === 'y') {
		let startY = focusedTile.y;

		while (tiles[startY - 1]?.[x]?.tileType === focusedTile.tileType) {
			startY -= 1;
		}

		let endY = focusedTile.y;

		while (tiles[endY + 1]?.[x]?.tileType === focusedTile.tileType) {
			endY += 1;
		}

		for (let t = startY; t <= endY; ++t) {
			focused[tiles[t]![x]!.id] = true;
		}
	}
}

function findTile(tiles: TileMatrix, id: number): Tile | null {
	for (let y = 0; y < tiles.length; ++y) {
		for (let x = 0; !!tiles[y] && x < tiles[y]!.length; ++x) {
			if (tiles[y]![x]?.id === id) {
				return tiles[y]![x];
			}
		}
	}

	return null;
}

// Each ace coin is given a specific index, so the game can keep track of
// which coins have been collected. Whenever a new ace coin is added or deleted,
// the indices need to be updated
function assignAceCoinIndices(entities: EditorEntity[]) {
	let aceCoinIndex = 0;

	for (let i = 0; i < entities.length; ++i) {
		const e = entities[i];

		if (e.type === 'AceCoin') {
			e.settings = { aceCoinIndex };
			aceCoinIndex += 1;

			if (aceCoinIndex === 5) {
				break;
			}
		}
	}
}

const editorSlice = createSlice({
	name: 'editor',
	initialState,
	reducers: {
		setLevelName(state: InternalEditorState, action: PayloadAction<string>) {
			state.metadata.name = action.payload.trim() || 'new level';
		},
		addPaletteEntry(
			state: InternalEditorState,
			action: PayloadAction<EntityType>
		) {
			const newEntry = action.payload;

			if (!state.paletteEntries.some((p) => isEqual(p, newEntry))) {
				state.paletteEntries.push(newEntry);
				state.currentPaletteEntry =
					state.paletteEntries[state.paletteEntries.length - 1];
			} else {
				// already in the palette? just select it then
				const index = state.paletteEntries.findIndex((p) =>
					isEqual(p, newEntry)
				);

				if (index > -1) {
					state.currentPaletteEntry = state.paletteEntries[index];
				}
			}
		},
		removePaletteEntry(
			state: InternalEditorState,
			action: PayloadAction<EntityType>
		) {
			const entryToRemove = action.payload;
			const index = state.paletteEntries.findIndex((pe) =>
				// TODO: isEqual no longer needed
				isEqual(pe, entryToRemove)
			);

			if (isEqual(entryToRemove, state.currentPaletteEntry)) {
				let nextIndex = index - 1;

				if (nextIndex < 0) {
					nextIndex = index + 1;
				}

				state.currentPaletteEntry = state.paletteEntries[nextIndex];
			}

			state.paletteEntries.splice(index, 1);
		},
		setCurrentPaletteEntryByIndex(
			state: InternalEditorState,
			action: PayloadAction<number>
		) {
			const index = action.payload;

			if (index >= 0 && index < state.paletteEntries.length) {
				state.currentPaletteEntry = state.paletteEntries[index];
			}
		},
		entityDropped(
			state: InternalEditorState,
			action: PayloadAction<EditorEntity | NewEntity>
		) {
			if (!canDrop(action.payload, state.entities)) {
				return;
			}

			if ('id' in action.payload) {
				const { id } = action.payload;
				const entity = state.entities.find((e) => e.id === id);

				if (entity) {
					Object.assign(entity, action.payload, {
						x: getEntityX(action.payload.x, action.payload.type),
						y: getEntityY(action.payload.y, action.payload.type),
					});
				}
			} else {
				state.entities.push({
					...action.payload,
					x: getEntityX(action.payload.x, action.payload.type),
					y: getEntityY(action.payload.y, action.payload.type),
					id: idCounter++,
				});
			}
		},
		// TODO: refactor this, so messy
		painted(
			state: InternalEditorState,
			action: PayloadAction<{ points: Point[]; newGroup: boolean }>
		) {
			const { points, newGroup } = action.payload;

			if (newGroup) {
				state.paintedGroup = getPaintedGroup(points[0], state.mouseMode);
			}

			let minX = state.levelTileWidth;
			let minY = state.levelTileHeight;
			let maxX = 0;
			let maxY = 0;

			points.forEach((point) => {
				const indexX = Math.floor(point.x / TILE_SIZE);
				const indexY = Math.floor(point.y / TILE_SIZE);

				minX = Math.min(minX, indexX);
				minY = Math.min(minY, indexY);
				maxX = Math.max(maxX, indexX);
				maxY = Math.max(maxY, indexY);

				const existingTile = state.tiles[indexY]?.[indexX];

				switch (state.mouseMode) {
					case 'erase': {
						const existingEntity = state.entities.find((e) => {
							const tilePoint = {
								x: indexX,
								y: indexY,
							};
							return pointIsInside(tilePoint, getEntityTileBounds(e));
						});

						if (
							existingEntity &&
							!nonDeletableEntityTypes.includes(existingEntity.type)
						) {
							state.entities = state.entities.filter(
								(e) => e !== existingEntity
							);

							if (existingEntity.type === 'AceCoin') {
								assignAceCoinIndices(state.entities);
							}
						} else if (state.tiles[indexY]) {
							// TODO: why is the assertion needed?
							state.tiles[indexY]![indexX] = null;
						}

						break;
					}
					case 'draw': {
						if (
							state.currentPaletteEntry &&
							entityMap[state.currentPaletteEntry].editorType === 'tile'
						) {
							// replace a tile
							if (existingTile) {
								existingTile.tileType = state.currentPaletteEntry;
							} else {
								// paint a new tile
								state.tiles[indexY] = state.tiles[indexY] || [];
								state.tiles[indexY]![indexX] = {
									id: idCounter++,
									x: indexX,
									y: indexY,
									tileType: state.currentPaletteEntry,
									// TODO: tileIndex isn't really used anymore
									tileIndex: 0,
								};

								const objectDef = entityMap[state.currentPaletteEntry];

								if (objectDef.settingsType === 'single') {
									state.tiles[indexY]![indexX]!.settings = {
										...objectDef.defaultSettings,
									};
								}
							}
						} else if (
							state.currentPaletteEntry &&
							entityMap[state.currentPaletteEntry].editorType === 'entity'
						) {
							// place an entity
							const type = state.currentPaletteEntry;

							const newEntity: NewEntity = {
								x: getEntityX(point.x, state.currentPaletteEntry),
								y: getEntityY(point.y, state.currentPaletteEntry),
								type,
							};

							if (
								canDrop(newEntity, state.entities) &&
								(type !== 'AceCoin' ||
									state.entities.filter((e) => e.type === 'AceCoin').length < 5)
							) {
								const completeEntity: EditorEntity = {
									...newEntity,
									id: idCounter++,
								};

								state.entities.push(completeEntity);

								// TODO: is this still necessary
								// if (completeEntity.type in detailsPanes) {
								// 	state.focused = { [completeEntity.id]: true };
								// }
								if (type === 'AceCoin') {
									assignAceCoinIndices(state.entities);
								}
							}
						}
						break;
					}
					// TODO: fill entities
					case 'fill': {
						if (
							state.currentPaletteEntry &&
							entityMap[state.currentPaletteEntry].editorType === 'tile'
						) {
							const floodResult = floodFill(
								state.tiles,
								state.currentPaletteEntry,
								indexX,
								indexY,
								state.levelTileWidth,
								state.levelTileHeight
							);

							minX = floodResult.minX;
							minY = floodResult.minY;
							maxX = floodResult.maxX;
							maxY = floodResult.maxY;
						}

						break;
					}
				}
			});

			minX = Math.max(0, minX - 1);
			minY = Math.max(0, minY - 1);
			maxX = Math.min(state.levelTileWidth, maxX + 1);
			maxY = Math.min(state.levelTileHeight, maxY + 1);
		},
		deleteFocused(state: InternalEditorState) {
			state.entities = state.entities.filter((e) => {
				return nonDeletableEntityTypes.includes(e.type) || !state.focused[e.id];
			});

			let minX = state.levelTileWidth;
			let minY = state.levelTileHeight;
			let maxX = 0;
			let maxY = 0;

			state.tiles = state.tiles.map((row, y) => {
				if (!row) {
					return null;
				}

				return row.map((t, x) => {
					if (!t) {
						return t;
					}

					if (state.focused[t.id]) {
						minX = Math.min(minX, x);
						maxX = Math.max(maxX, x);
						minY = Math.min(minY, y);
						maxY = Math.max(maxY, y);

						return null;
					} else {
						return t;
					}
				});
			});

			state.focused = {};

			assignAceCoinIndices(state.entities);
		},
		mouseModeChanged(
			state: InternalEditorState,
			action: PayloadAction<MouseMode>
		) {
			if (
				(state.currentPaletteEntry &&
					entityMap[state.currentPaletteEntry].editorType !== 'entity') ||
				action.payload !== 'fill'
			) {
				state.mouseMode = action.payload;
				state.focused = {};
			}
		},
		resizeLevel(state: InternalEditorState, action: PayloadAction<Point>) {
			// WIDTH

			state.pendingLevelResizeIncrement.x +=
				action.payload.x / (TILE_SIZE * state.scale);

			const tileDiffX = Math.floor(state.pendingLevelResizeIncrement.x);
			state.pendingLevelResizeIncrement.x -= tileDiffX;

			state.levelTileWidth = clamp(
				state.levelTileWidth + tileDiffX,
				MIN_LEVEL_TILE_WIDTH,
				MAX_LEVEL_TILE_WIDTH
			);

			// HEIGHT

			state.pendingLevelResizeIncrement.y +=
				action.payload.y / (TILE_SIZE * state.scale);

			const tileDiffY = Math.floor(state.pendingLevelResizeIncrement.y);
			state.pendingLevelResizeIncrement.y -= tileDiffY;

			state.levelTileHeight = clamp(
				state.levelTileHeight + tileDiffY,
				MIN_LEVEL_TILE_HEIGHT,
				MAX_LEVEL_TILE_HEIGHT
			);
		},
		resizeLevelComplete(state: InternalEditorState) {
			const newScale = determineResizeScale(state);
			scaleTo(state, newScale);
			centerLevelInWindow(state);
		},
		eraseLevel(state: InternalEditorState) {
			state.levelTileWidth = INITIAL_LEVEL_TILE_WIDTH;
			state.levelTileHeight = INITIAL_LEVEL_TILE_HEIGHT;

			state.tiles = [];
			state.entities = defaultInitialState.entities.map((e) => ({ ...e }));

			if (state.storedForResizeMode) {
				const newScale = determineResizeScale(state);
				scaleTo(state, newScale);
				centerLevelInWindow(state);
			}

			state.metadata.name = defaultInitialState.metadata.name;
		},
		moveOffsetToEntity(
			state: InternalEditorState,
			action: PayloadAction<EntityType>
		) {
			// if (action.payload === 'Goal') {
			// 	const goal = state.entities.find((e) => e.type === 'Goal')!;
			//
			// 	state.scrollOffset.x =
			// 		goal.x - (PLAY_WINDOW_TILE_WIDTH / 2) * TILE_SIZE;
			// 	state.scrollOffset.y =
			// 		goal.y - (PLAY_WINDOW_TILE_HEIGHT / 2) * TILE_SIZE;
			// } else if (action.payload === 'Player') {
			// 	const player = state.entities.find((e) => e.type === 'Player')!;
			//
			// 	state.scrollOffset.x =
			// 		player.x - (PLAY_WINDOW_TILE_WIDTH / 2) * TILE_SIZE;
			// 	state.scrollOffset.y =
			// 		player.y - (PLAY_WINDOW_TILE_HEIGHT / 2) * TILE_SIZE;
			// }
		},
		resetOffset(state: InternalEditorState) {
			state.scrollOffset.x = 0;
			state.scrollOffset.y = calcYForScrollToBottom();
		},
		editorVisibleWindowChanged(
			state: InternalEditorState,
			action: PayloadAction<EditorFocusRect>
		) {
			state.editorVisibleWindow = action.payload;

			state.scrollOffset = action.payload.offset;
		},
		scaleDecreased(state: InternalEditorState) {
			const currentScaleIndex = scales.indexOf(state.scale);
			const newScaleIndex = Math.max(0, currentScaleIndex - 1);

			if (newScaleIndex !== currentScaleIndex) {
				scaleTo(state, scales[newScaleIndex]);
			}
		},
		scaleIncreased(state: InternalEditorState) {
			const currentScaleIndex = scales.indexOf(state.scale);
			const newScaleIndex = Math.min(scales.length - 1, currentScaleIndex + 1);

			if (newScaleIndex !== currentScaleIndex) {
				scaleTo(state, scales[newScaleIndex]);
			}
		},
		toggleResizeMode(state: InternalEditorState) {
			if (state.storedForResizeMode) {
				scaleTo(state, state.storedForResizeMode.scale);
				state.scrollOffset = state.storedForResizeMode.offset;

				state.storedForResizeMode = null;
			} else {
				state.storedForResizeMode = {
					scale: state.scale,
					offset: { ...state.scrollOffset },
				};

				const newScale = determineResizeScale(state);
				scaleTo(state, newScale);
				centerLevelInWindow(state);
			}
		},
		setSaveLevelState(
			state: InternalEditorState,
			action: PayloadAction<InternalEditorState['saveLevelState']>
		) {
			state.saveLevelState = action.payload;
		},
		setSavedLevelId(state: InternalEditorState, action: PayloadAction<string>) {
			state.savedLevelId = action.payload;
		},
		setLoadLevelState(
			state: InternalEditorState,
			action: PayloadAction<InternalEditorState['loadLevelState']>
		) {
			state.loadLevelState = action.payload;
		},
		setPaletteEntries(
			state: InternalEditorState,
			action: PayloadAction<EntityType[]>
		) {
			state.paletteEntries = action.payload;
		},
		setLevelDataFromLoad(
			state: InternalEditorState,
			action: PayloadAction<SerializedLevelData>
		) {
			const { levelData, maxId } = deserialize(action.payload);

			// quick sanity check, if there is a type in local storage that we don't
			// know about, just throw it away
			state.entities = levelData.entities.filter((e) => !!entityMap[e.type]);
			state.tiles = levelData.tileLayer.data;
			state.levelTileWidth = levelData.tileLayer.width;
			state.levelTileHeight = levelData.tileLayer.height;

			const player = state.entities.find((e) => e.type === 'Player')!;
			player.x = TILE_SIZE * INITIAL_PLAYER_X_TILE;
			player.y = TILE_SIZE * INITIAL_PLAYER_Y_TILE;

			idCounter = maxId;
		},
		pan(state: InternalEditorState, action: PayloadAction<Point>) {
			const { x, y } = action.payload;

			const newX = state.scrollOffset.x - x / state.scale;
			const newY = state.scrollOffset.y - y / state.scale;

			const { x: lastOffsetX, y: lastOffsetY } = { ...state.scrollOffset };

			state.scrollOffset.x = newX;
			state.scrollOffset.y = newY;

			const delta = {
				x: state.scrollOffset.x - lastOffsetX,
				y: state.scrollOffset.y - lastOffsetY,
			};

			ensurePlayerIsInView(state, delta);
		},
		selectDrag(
			state: InternalEditorState,
			action: PayloadAction<{
				bounds: Bounds;
				startingPoint: Point;
			}>
		) {
			const { bounds, startingPoint } = action.payload;

			state.isSelecting = true;

			const scaledStartingPoint = {
				x: startingPoint.x / state.scale + state.scrollOffset.x,
				y: startingPoint.y / state.scale + state.scrollOffset.y,
			};

			const tileStartingPoint = {
				x: Math.floor(scaledStartingPoint.x / TILE_SIZE),
				y: Math.floor(scaledStartingPoint.y / TILE_SIZE),
			};

			const scaledBounds = {
				upperLeft: {
					x: bounds.upperLeft.x / state.scale + state.scrollOffset.x,
					y: bounds.upperLeft.y / state.scale + state.scrollOffset.y,
				},
				lowerRight: {
					x: bounds.lowerRight.x / state.scale + state.scrollOffset.x,
					y: bounds.lowerRight.y / state.scale + state.scrollOffset.y,
				},
			};

			const tileBounds = {
				upperLeft: {
					x: Math.floor(scaledBounds.upperLeft.x / TILE_SIZE),
					y: Math.floor(scaledBounds.upperLeft.y / TILE_SIZE),
				},
				lowerRight: {
					x: Math.ceil(scaledBounds.lowerRight.x / TILE_SIZE),
					y: Math.ceil(scaledBounds.lowerRight.y / TILE_SIZE),
				},
			};

			const entityUnderStart = state.entities.find((e) => {
				const pixelBounds = getEntityPixelBounds(e);

				return pointIsInside(scaledStartingPoint, pixelBounds);
			});

			const tileUnderStart =
				state.tiles[tileStartingPoint.y]?.[tileStartingPoint.x];

			if (entityUnderStart || tileUnderStart) {
				const idUnderStart = entityUnderStart?.id ?? tileUnderStart?.id ?? 0;

				const underStartAlreadyFocused = state.focused[idUnderStart];

				if (!underStartAlreadyFocused) {
					state.focused = {};
				}

				// this turned out to be a new select, not a drag
				if (Object.keys(state.focused).length === 0) {
					if (entityUnderStart) {
						state.focused[entityUnderStart.id] = true;
					}
					if (tileUnderStart) {
						state.focused[tileUnderStart.id] = true;
					}
				} else {
					// drag
					state.dragOffset = {
						x: scaledBounds.lowerRight.x - scaledBounds.upperLeft.x,
						y: scaledBounds.lowerRight.y - scaledBounds.upperLeft.y,
					};
				}
			} else {
				// select
				state.focused = {};

				state.entities.forEach((e) => {
					if (
						overlap(getEntityPixelBounds(e), scaledBounds) &&
						!nonDeletableEntityTypes.includes(e.type)
					) {
						state.focused[e.id] = true;
					}
				});

				for (let y = tileBounds.upperLeft.y; y < tileBounds.lowerRight.y; ++y) {
					for (
						let x = tileBounds.upperLeft.x;
						x < tileBounds.lowerRight.x;
						++x
					) {
						if (state.tiles[y]?.[x]) {
							state.focused[state.tiles[y]![x]!.id] = true;
						}
					}
				}
			}

			if (Object.keys(state.focused).length === 1) {
				const focusedId = Object.keys(state.focused).pop();
				const tile = findTile(state.tiles, Number(focusedId));

				if (tile && !!tile.settings) {
					// there is only one focused tile, and it is the head of a tile entity
					// so select the entire entity
					selectEntireTileEntity(state.focused, state.tiles, tile);
				}
			}
		},
		dragComplete(state: InternalEditorState) {
			if (state.dragOffset) {
				const tileXOffset = Math.round(state.dragOffset!.x / TILE_SIZE);
				const tileYOffset = Math.round(state.dragOffset!.y / TILE_SIZE);

				const spotsToClear: Point[] = [];
				const movedEntities: EditorEntity[] = [];

				let minX = state.levelTileWidth;
				let minY = state.levelTileHeight;
				let maxX = 0;
				let maxY = 0;

				// TODO: due to immer weirdness with sets, need to search by id
				// rather than entity reference (due to the refs being wrapped by proxies)
				Object.keys(state.focused).forEach((fid) => {
					const entity = state.entities.find((e) => e.id === Number(fid));

					if (entity) {
						entity.x += tileXOffset * TILE_SIZE;
						entity.y += tileYOffset * TILE_SIZE;

						// nudge it over by one so entities just above or to the left won't
						// get clobbered
						spotsToClear.push({ x: entity.x + 1, y: entity.y + 1 });
						movedEntities.push(entity);
					}

					const tile = findTile(state.tiles, Number(fid));

					if (tile) {
						state.tiles[tile.y]![tile.x] = null;
						state.tiles[tile.y + tileYOffset] =
							state.tiles[tile.y + tileYOffset] || [];
						state.tiles[tile.y + tileYOffset]![tile.x + tileXOffset] = tile;

						minX = Math.min(minX, tile.x);
						minY = Math.min(minY, tile.y);
						maxX = Math.max(maxX, tile.x);
						maxY = Math.max(maxY, tile.y);

						tile.x += tileXOffset;
						tile.y += tileYOffset;

						minX = Math.min(minX, tile.x);
						minY = Math.min(minY, tile.y);
						maxX = Math.max(maxX, tile.x);
						maxY = Math.max(maxY, tile.y);
					}
				});

				state.entities = state.entities.filter((e) => {
					if (movedEntities.includes(e)) {
						return true;
					}

					const bounds = getEntityPixelBounds(e);

					const spotToClear = spotsToClear.find((spot) => {
						return pointIsInside(spot, bounds);
					});

					return !spotToClear;
				});
			}

			state.dragOffset = null;
			state.isSelecting = false;
		},
		pushPan(state: InternalEditorState) {
			state.storedMouseMode = state.mouseMode;
			state.mouseMode = 'pan';
		},
		popPan(state: InternalEditorState) {
			// the draw fallback should never happen...
			state.mouseMode = state.storedMouseMode || 'draw';
		},
		toggleGrid(state: InternalEditorState) {
			state.showGrid = !state.showGrid;
		},
		clearFocusedEntity(state: InternalEditorState) {
			state.focused = {};
		},
		setEntitySettings(
			state: InternalEditorState,
			action: PayloadAction<{ id: number; settings: EntitySettings }>
		) {
			const { id, settings } = action.payload;

			const entity = state.entities.find((e) => e.id === id);

			if (entity) {
				entity.settings = {
					...entity.settings,
					...settings,
				};

				// TODO: nasty hack! this is needed due to mutating the entity just above
				// since immer is used, a new copy of the entity is created, and that breaks
				// the focused set, which is using tile/entity refs

				// remove this hack once the TileEntity work is done
				state.focused = {};
				state.focused[entity.id] = true;
			} else {
				const tile = findTile(state.tiles, id);

				if (tile) {
					tile.settings = {
						...tile.settings,
						...settings,
					};

					// TODO: nasty hack! see above in entity section
					state.focused = {};
					selectEntireTileEntity(state.focused, state.tiles, tile);
				}
			}
		},
	},
});

type LevelThunk = ThunkAction<void, AppState, null, Action>;

const saveLevel = (): LevelThunk => async (dispatch, getState) => {
	try {
		dispatch(editorSlice.actions.setSaveLevelState('saving'));

		const editorState = getState().editor.present;

		const tileLayer: TileLayer = {
			width: editorState.levelTileWidth,
			height: editorState.levelTileHeight,
			data: editorState.tiles,
		};

		const levelData: LevelData = {
			entities: editorState.entities,
			tileLayer,
		};

		const serializedLevelData = serialize(levelData);

		try {
			const createdLevelId = await saveLevelMutation(
				editorState.savedLevelId ?? null,
				editorState.metadata.name?.trim() ?? 'new level',
				'auto desc',
				serializedLevelData
			);
			dispatch(editorSlice.actions.setSavedLevelId(createdLevelId));
			dispatch(editorSlice.actions.setSaveLevelState('success'));
		} catch (e) {
			console.log('error', e);
			dispatch(editorSlice.actions.setSaveLevelState('error'));
		}
	} catch (e) {
		console.log('error2', e);
		dispatch(editorSlice.actions.setSaveLevelState('error'));
	} finally {
		setTimeout(() => {
			dispatch(editorSlice.actions.setSaveLevelState('dormant'));
		}, 2000);
	}
};

const loadLevel = (id: string): LevelThunk => async (dispatch) => {
	try {
		dispatch(editorSlice.actions.setLevelDataFromLoad(EMPTY_LEVEL));
		dispatch(editorSlice.actions.setLevelName(''));
		dispatch(editorSlice.actions.setLoadLevelState('loading'));

		const result = await getLevelQuery(id);

		if (!result) {
			dispatch(editorSlice.actions.setLoadLevelState('missing'));
		} else {
			dispatch(editorSlice.actions.setLevelDataFromLoad(result.data));
			dispatch(editorSlice.actions.setLevelName(result.name));
			dispatch(editorSlice.actions.setSavedLevelId(result.id));
			dispatch(editorSlice.actions.setLoadLevelState('success'));
		}
	} catch (e) {
		dispatch(editorSlice.actions.setLoadLevelState('error'));
	}
};

// 1.0.0: first localstorage implementation
// 1.0.1: changed some tile serialization ids
// 1.1.0: added metadata.name
// 2.0.0: paletteEntries switched to just be EntityType strings
const LOCALSTORAGE_KEY = 'smaghetti_2.0.0';

const loadFromLocalStorage = (): LevelThunk => (dispatch) => {
	try {
		const rawJson = window.localStorage[LOCALSTORAGE_KEY];

		if (rawJson) {
			try {
				const localStorageData = JSON.parse(rawJson) as LocalStorageData;

				if (
					localStorageData &&
					localStorageData.levelData &&
					localStorageData.levelData.entities &&
					localStorageData.levelData.tileLayer
				) {
					dispatch(
						editorSlice.actions.setLevelDataFromLoad(localStorageData.levelData)
					);
				}

				if (localStorageData?.editorData?.paletteEntries) {
					dispatch(
						editorSlice.actions.setPaletteEntries(
							localStorageData.editorData.paletteEntries
						)
					);
				}

				if (localStorageData?.metadata?.name) {
					dispatch(
						editorSlice.actions.setLevelName(localStorageData.metadata.name)
					);
				}
			} catch (e) {
				dispatch(editorSlice.actions.setLoadLevelState('error'));
			}
		}
	} catch (e) {
		dispatch(editorSlice.actions.setLoadLevelState('error'));
	}
};

const saveToLocalStorage = (): LevelThunk => (dispatch, getState) => {
	try {
		dispatch(editorSlice.actions.setSaveLevelState('saving'));

		const editorState = getState().editor.present;

		const tileLayer: TileLayer = {
			width: editorState.levelTileWidth,
			height: editorState.levelTileHeight,
			data: editorState.tiles,
		};

		const localStorageData: LevelData = {
			entities: editorState.entities,
			tileLayer,
		};

		const serializedLevelData = serialize(localStorageData);

		const dataToWrite: LocalStorageData = {
			metadata: {
				...editorState.metadata,
			},
			levelData: serializedLevelData,
			editorData: {
				paletteEntries: editorState.paletteEntries,
			},
		};

		try {
			const asJson = JSON.stringify(dataToWrite);
			window.localStorage[LOCALSTORAGE_KEY] = asJson;
		} catch (e) {
			dispatch(editorSlice.actions.setSaveLevelState('error'));
		}

		dispatch(editorSlice.actions.setSaveLevelState('success'));
	} catch (e) {
		dispatch(editorSlice.actions.setSaveLevelState('error'));
	} finally {
		setTimeout(() => {
			dispatch(editorSlice.actions.setSaveLevelState('dormant'));
		}, 2000);
	}
};

const {
	setLevelName,
	entityDropped,
	mouseModeChanged,
	painted,
	deleteFocused,
	pan,
	selectDrag,
	dragComplete,
	resizeLevel,
	resizeLevelComplete,
	editorVisibleWindowChanged,
	scaleIncreased,
	scaleDecreased,
	toggleResizeMode,
	toggleGrid,
	pushPan,
	popPan,
	moveOffsetToEntity,
	resetOffset,
	addPaletteEntry,
	removePaletteEntry,
	setCurrentPaletteEntryByIndex,
	clearFocusedEntity,
	setEntitySettings,
	eraseLevel,
} = editorSlice.actions;

const reducer = editorSlice.reducer;

/**
 * a reducer that just makes sure state goes out in a clean form.
 * basically always make sure there are no tiles behind start/goal, that player
 * is not outside the bounds of the level, etc
 */
function cleanUpReducer(state: InternalEditorState, action: Action) {
	const newState = reducer(state, action);

	const nextState = produce(newState, (draftState) => {
		ensurePlayerIsInView(draftState, { x: 0, y: 0 });
		ensureLevelIsInView(draftState);

		removeOutOfBoundsTiles(draftState);
		removeOutOfBoundsEntities(draftState);
	});

	return nextState;
}

// @ts-ignore not sure why this ignore is needed...
const undoableReducer = undoable(cleanUpReducer, {
	filter: excludeAction([
		setLevelName.toString(),
		mouseModeChanged.toString(),
		editorVisibleWindowChanged.toString(),
		scaleIncreased.toString(),
		scaleDecreased.toString(),
		toggleResizeMode.toString(),
		resizeLevelComplete.toString(),
		pan.toString(),
		toggleGrid.toString(),
		moveOffsetToEntity.toString(),
		resetOffset.toString(),
		addPaletteEntry.toString(),
		removePaletteEntry.toString(),
		setCurrentPaletteEntryByIndex.toString(),
		clearFocusedEntity.toString(),
		selectDrag.toString(),
		'editor/savingLevel',
		'editor/saveLevel',
		'editor/saveLevelError',
		'editor/loadLevel',
		'editor/loadingLevel',
		'editor/loadLevelError',
		'editor/setLevelDataFromLoad',
		'editor/loadFromLocalStorage',
		'editor/saveToLocalStorage',
		'@@INIT',
		'preloader/resourceLoaded',
	]),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	groupBy(action: PayloadAction<any>, currentState: InternalEditorState) {
		if (action.type === resizeLevel.toString()) {
			return 'resize-level';
		}

		if (action.type === painted.toString()) {
			if (action.payload.newGroup) {
				return getPaintedGroup(
					action.payload.points[0],
					currentState.mouseMode
				);
			} else {
				return currentState.paintedGroup;
			}
		}

		return null;
	},
});

type EditorState = StateWithHistory<InternalEditorState>;

const { undo, redo } = ActionCreators;

/**
 * these props on editor state never get undone. They are "ephemeral" things
 * that the user would not expect to be undone, like the current zoom level.
 *
 * This approach does work, but it's a bit clunky. I think it could strongly
 * be argued this state should just not be in the slice at all. It probably
 * makes sense to move this state into <Editor /> itself, so a TODO on exploring that
 */
const NonUndoableState: Array<keyof InternalEditorState> = [
	'scale',
	'canIncreaseScale',
	'canDecreaseScale',
	'editorVisibleWindow',
	'scrollOffset',
	'showGrid',
	'paletteEntries',
	'currentPaletteEntry',
	'focused',
	'mouseMode',
];

function pullForwardNonUndoableState(
	editorState: InternalEditorState | undefined
): Partial<InternalEditorState> | undefined {
	if (!editorState) {
		return editorState;
	}

	return NonUndoableState.reduce<Partial<InternalEditorState>>(
		(building, key) => {
			// @ts-ignore
			building[key] = editorState[key];

			return building;
		},
		{}
	);
}

function neverUndoRedoCertainStateReducer(
	state: EditorState | undefined,
	action: Action
) {
	const newState = undoableReducer(state, action);

	if (
		action.type === ReduxUndoActionTypes.UNDO ||
		action.type === ReduxUndoActionTypes.REDO
	) {
		const finalNewState = {
			...newState,
			present: {
				...newState.present,
				...pullForwardNonUndoableState(state?.present),
			},
		};

		return finalNewState;
	} else {
		return newState;
	}
}

export type { EditorState, InternalEditorState, EditorFocusRect, MouseMode };

export {
	neverUndoRedoCertainStateReducer as reducer,
	undo,
	redo,
	setLevelName,
	entityDropped,
	mouseModeChanged,
	painted,
	deleteFocused,
	pan,
	selectDrag,
	dragComplete,
	resizeLevel,
	resizeLevelComplete,
	editorVisibleWindowChanged,
	scaleIncreased,
	scaleDecreased,
	toggleResizeMode,
	toggleGrid,
	pushPan,
	popPan,
	moveOffsetToEntity,
	resetOffset,
	addPaletteEntry,
	removePaletteEntry,
	setCurrentPaletteEntryByIndex,
	clearFocusedEntity,
	setEntitySettings,
	saveLevel,
	loadLevel,
	loadFromLocalStorage,
	saveToLocalStorage,
	eraseLevel,
};
