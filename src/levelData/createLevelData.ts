import { convertASCIIToLevelName, flattenCells } from './util';
import { TILE_SIZE } from '../tiles/constants';
import cloneDeep from 'lodash/cloneDeep';
import { entityMap } from '../entities/entityMap';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import { decodeObjectSet, encodeObjectSets } from '../entities/util';
import {
	INITIAL_ROOM_TILE_HEIGHT,
	ROOM_WIDTH_INCREMENT,
} from '../components/editor/constants';
import _ from 'lodash';
import { OBJECT_PRIORITY_MIDDLE } from '../entities/constants';

type Room = {
	objects: number[];
	levelSettings: number[];
	transportData: number[];
	sprites: number[];
	blockPathMovementData: number[];
	autoscrollMovementData: number[];
};

const exitTypeToCategoryByte: Record<EditorTransport['exitType'], number> = {
	door: 0,
	'horizontal-travel-right-pipe': 1,
	'horizontal-travel-left-pipe': 1,
	'up-from-pipe': 1,
	'down-from-pipe': 2,
};

const exitTypeToByte: Record<EditorTransport['exitType'], number> = {
	door: 0,
	'up-from-pipe': 1,
	'down-from-pipe': 2,
	'horizontal-travel-right-pipe': 3,
	'horizontal-travel-left-pipe': 4,
};

function getHeader(eCoinIndex: number, aceCoinCount: number): Tuple<number, 5> {
	// copying the values from classic 1-2 for now
	return [
		eCoinIndex, // zero means no e-coin
		aceCoinCount, // number of ace coins
		0x17, // eLevel class
		0, // eLevel number
		0xc, // eLevel icon
	];
}

function getLevelName(name: string): number[] {
	const asEreader = convertASCIIToLevelName(name);

	if (asEreader.length < 21) {
		asEreader.push(0xff);
	}

	return asEreader;
}

function getObjectSet(entities: EditorEntity[]): [number, number] {
	const intersected = entities.reduce<number[]>((building, entity) => {
		const entityDef = entityMap[entity.type];

		if (
			!entityDef.objectSets ||
			entityDef.objectSets.length === 0 ||
			isEqual(entityDef.objectSets, [-1])
		) {
			return building;
		}

		if (building.length === 0) {
			return entityDef.objectSets;
		}

		return intersection(building, entityDef.objectSets);
	}, []);

	// nothing in the intersection? then default to 1,1
	// not a huge deal, this means this room has no objects at all, so
	// it's unlikely to be a room of much use
	const resultingSet = intersected[0] ?? encodeObjectSets([[1, 1]])[0];

	return decodeObjectSet(resultingSet);
}

function getTimerBytes(timer: number): [number, number] {
	const clamped = Math.max(Math.min(timer, 999), 1);
	let timerS = clamped.toString();

	while (timerS.length < 3) {
		timerS = '0' + timerS;
	}

	const digits = timerS.toString().split('');

	const hundreds = parseInt(digits[0]) & 0xf;
	const tensOnes =
		((parseInt(digits[1]) & 0xf) << 4) | (parseInt(digits[2]) & 0xf);

	return [hundreds, tensOnes];
}

function getObjectHeader(
	levelSettings: LevelSettings,
	room: RoomData,
	entities: EditorEntity[]
): Tuple<number, 11> {
	const [, objectGraphicSet] = getObjectSet(entities);

	// like most things in sma4, they store it as "minus 1"
	const width = Math.ceil(room.roomTileWidth / ROOM_WIDTH_INCREMENT) - 1;

	return [
		...getTimerBytes(levelSettings.timer),
		0x00, // 16 bit value that is unknown, copied from classic 1-2
		room.settings.unknownThirdHeaderByte ?? 0x02, // ----
		width & 0xf, // bottom nibble is length of level, top is unknown
		room.settings.bgColor, // background color
		room.settings.wrapAround ? 0xb1 : 0xa1, // top nibble is scroll settings, bottom unknown, copied from 1-2
		// TODO: level entries. for now they are always zero, and to help ensure that is the case
		// mask objectGraphicSet down to 5 bits
		objectGraphicSet & 0x1f, // top 3 bits: level entry action, bottom 5: graphics set
		0x08, // top nibble: graphics set, bottom: unknown
		room.settings.bgExtraColorAndEffect ?? 0,
		room.settings.bgGraphic,
	];
}

/**
 * given the provided entities, finds the rotation byte that satisfies them all.
 * NOTE: this function assumes all entities are compatible with each other rotation-wise
 */
function getRotationByte(entities: EditorEntity[]): number {
	const rotationEntity = entities.find(
		(e) => typeof entityMap[e.type].rotationGraphicSet === 'number'
	);

	if (rotationEntity) {
		return entityMap[rotationEntity.type].rotationGraphicSet as number;
	} else {
		return 0;
	}
}

/**
 * given the provided entities, returns the six bytes that can satisfy all
 * of their graphic set needs. The assumption is the passed in entities are all
 * compatible with each other
 */
function buildSpriteGraphicSetBytes(
	entities: EditorEntity[]
): Tuple<number, 6> {
	const graphicSets = [];

	for (let i = 0; i < 6; ++i) {
		const candidates = entities.reduce<number[][]>((building, entity) => {
			const def = entityMap[entity.type];

			if (
				def.spriteGraphicSets[i] === -1 ||
				isEqual(def.spriteGraphicSets[i], [-1])
			) {
				return building;
			}

			const value = def.spriteGraphicSets[i];
			const asArray = Array.isArray(value) ? value : [value];
			building.push(asArray);
			return building;
		}, []);

		const intersected = intersection(...candidates);

		// after the intersection any value will do, so grab the first one
		// no values? then all entities declared zero here. again,
		// assuming the passed in entities are all compatible
		graphicSets.push(intersected[0] ?? 0);
	}

	// if any ended up as -1, push them up to zero
	return graphicSets.map((v) => Math.max(v, 0));
}

type CameraValues = {
	cameraMin: number;
	screenStart: Point;
};

function getCameraValues(
	playerPos: Point,
	roomTileHeight: number
): CameraValues {
	const playerDistanceToBottom = roomTileHeight - playerPos.y - 1;

	if (playerDistanceToBottom < 3) {
		const delta = 3 - playerDistanceToBottom;

		return {
			cameraMin: 0x50 + delta * 0x10,
			screenStart: {
				x: Math.max(0, playerPos.x - 5),
				y: Math.max(0, playerPos.y - (5 + delta)),
			},
		};
	} else {
		return {
			cameraMin: 0x50,
			screenStart: {
				x: Math.max(0, playerPos.x - 5),
				y: Math.max(0, playerPos.y - 5),
			},
		};
	}
}

function getLevelSettings(
	room: RoomData,
	entities: EditorEntity[]
): Tuple<number, 32> {
	const [objectSet] = getObjectSet(entities);
	const spriteGraphicSet = buildSpriteGraphicSetBytes(entities);
	const player =
		entities.find((e) => e.type === 'PlayerGhost') ??
		entities.find((e) => e.type === 'Player');
	const playerY = player ? player.y / TILE_SIZE : room.roomTileHeight - 2;
	const playerX = player ? player.x / TILE_SIZE : 2;

	// if they stuck with the default height, then stick with classic 1-2 settings
	let mostSigHeightInPixels = 1;
	let leastSigHeightInPixels = 0xbf;

	const { cameraMin, screenStart } = getCameraValues(
		{ x: playerX, y: playerY },
		room.roomTileHeight
	);

	if (room.roomTileHeight !== INITIAL_ROOM_TILE_HEIGHT) {
		const heightInPixels = room.roomTileHeight * TILE_SIZE + 15;
		mostSigHeightInPixels = heightInPixels >> 8;
		leastSigHeightInPixels = heightInPixels & 0xff;
	}

	return [
		leastSigHeightInPixels, // screen y boundary, least sig byte
		mostSigHeightInPixels, // screen y boundary, most sig byte
		0, // fixed screen center y, least sig byte
		0, // fixed screen center y, most sig byte
		0, // player y screen center, least sig byte
		0, // player y screen center, most sig byte
		cameraMin,
		0, // camera max
		playerY, // player starting y
		playerX, // player starting x
		screenStart.y,
		screenStart.x,
		objectSet, // object set, least sig byte
		0, // object set, most sig byte
		room.settings.music, // music, least sig byte
		0, // music, most sig byte
		...spriteGraphicSet,
		// the rest of the bytes are largely unknown and copied from classic 1-2
		0x0,
		0,
		0x0,
		0,
		getRotationByte(entities),
		0,
		0, // y position of extra effects such as the river
		0,
		0,
		0,
	];
}

type PendingObject = {
	x: number;
	y: number;
	w: number;
	h: number;
	entity: EditorEntity;
};

function sortByObjectPriority(a: PendingObject, b: PendingObject): number {
	const aPriority =
		entityMap[a.entity.type].objectPriority ?? OBJECT_PRIORITY_MIDDLE;
	const bPriority =
		entityMap[b.entity.type].objectPriority ?? OBJECT_PRIORITY_MIDDLE;

	return aPriority - bPriority;
}

function getPendingObjectsFromMatrix(
	matrix: EditorEntityMatrix,
	room: RoomData,
	yIncrement: number
): PendingObject[] {
	const pendingObjects: PendingObject[] = [];

	function getEndX(
		row: EditorEntityRow,
		startTile: EditorEntity
	): EditorEntity {
		if (!entityMap[startTile.type].dimensions.includes('x')) {
			return startTile;
		}

		let x = startTile.x;

		while (
			row[x]?.type === startTile.type &&
			isEqual(row[x]?.settings ?? {}, startTile.settings ?? {}) &&
			x - startTile.x < 26
		) {
			++x;
		}

		// x goes one too far, so our tile is one back
		return row[Math.max(startTile.x, x - 1)] as EditorEntity;
	}

	function getMaxY(tile: EditorEntity): number {
		if (!entityMap[tile.type].dimensions.includes('y')) {
			return tile.y;
		}

		let y = tile.y;

		while (
			matrix[y]?.[tile.x]?.type === tile.type &&
			isEqual(matrix[y]?.[tile.x]?.settings ?? {}, tile.settings ?? {})
		) {
			++y;
		}

		return Math.max(y - 1, tile.y);
	}

	function getBestY(startTile: EditorEntity, endTile: EditorEntity): number {
		let curBest = Number.MAX_SAFE_INTEGER;

		for (let x = startTile.x; x <= endTile.x; ++x) {
			const thisColMaxY = getMaxY(matrix[startTile.y]![x]!);

			curBest = Math.min(curBest, thisColMaxY);
		}

		return curBest;
	}

	function erase(startY: number, endY: number, startX: number, endX: number) {
		for (let y = startY; y <= endY; ++y) {
			const row = matrix[y]!;

			for (let x = startX; x <= endX; ++x) {
				row[x] = null;
			}
		}
	}

	for (let y = 0; y < room.roomTileHeight; ++y) {
		const row = matrix[y];

		if (!row) {
			continue;
		}

		for (let x = 0; x < row.length; ++x) {
			const tile = row[x];

			if (!tile) {
				continue;
			}

			const objectDef = entityMap[tile.type];

			if (!objectDef.toObjectBinary) {
				continue;
			}

			const endXTile = getEndX(row, tile);
			const bestY = getBestY(tile, endXTile);

			// length/height - 1 because they are stored 1 less than actual
			const length = endXTile.x - tile.x;
			const height = bestY - tile.y;

			pendingObjects.push({
				x,
				y: y + yIncrement,
				w: length,
				h: height,
				entity: tile,
			});

			erase(tile.y, bestY, tile.x, endXTile.x);
		}
	}

	return pendingObjects;
}

function getPendingDoubleCellObjects(
	doubleCellEntities: EditorEntity[],
	room: RoomData,
	yIncrement: number
): PendingObject[] {
	const matrices: Record<string, EditorEntityMatrix> = {
		xEvenYEven: [],
		xOddYOdd: [],
		xOddYEven: [],
		xEvenYOdd: [],
	};

	function getMatrix(tx: number, ty: number): EditorEntityMatrix {
		const xe = (tx & 1) === 0;
		const ye = (ty & 1) === 0;

		const key = `x${xe ? 'Even' : 'Odd'}Y${ye ? 'Even' : 'Odd'}`;
		return matrices[key];
	}

	doubleCellEntities.forEach((e) => {
		const tx = e.x / TILE_SIZE;
		const ty = e.y / TILE_SIZE;

		const matrix = getMatrix(tx, ty);

		const mx = Math.floor(tx / 2);
		const my = Math.floor(ty / 2);

		matrix[my] = matrix[my] ?? [];
		matrix[my]![mx] = {
			...e,
			x: mx,
			y: my,
		};
	});

	function mapToOriginalPosition(
		po: PendingObject,
		matrix: EditorEntityMatrix
	): PendingObject {
		let tx = po.x * 2;
		let ty = po.y * 2 - 1;

		if (matrix === matrices.xOddYEven || matrix === matrices.xOddYOdd) {
			tx += 1;
		}

		if (matrix === matrices.xOddYOdd || matrix === matrices.xEvenYOdd) {
			ty += 1;
		}

		return {
			...po,
			x: tx,
			y: ty,
		};
	}

	return Object.values(matrices).reduce<PendingObject[]>((building, matrix) => {
		if (matrix.length === 0) {
			return building;
		}

		const pendingObjects = getPendingObjectsFromMatrix(
			matrix,
			room,
			yIncrement
		);

		return building.concat(
			pendingObjects.map((po) => mapToOriginalPosition(po, matrix))
		);
	}, []);
}

function getPendingObjects(layer: RoomLayer, room: RoomData): PendingObject[] {
	// TODO: actually figure out wrap around rooms, this is not correct most of the time
	const yIncrement = room.settings.wrapAround ? 2 : 1;

	const pendingObjects = getPendingObjectsFromMatrix(
		cloneDeep(layer.matrix),
		room,
		yIncrement
	);

	const doubleCellEntities = layer.entities.filter(
		(e) => entityMap[e.type].editorType === 'double-cell'
	);
	const nonDoubleCellEntities = layer.entities.filter(
		(e) => entityMap[e.type].editorType !== 'double-cell'
	);

	const pendingDoubleCellObjects = getPendingDoubleCellObjects(
		doubleCellEntities,
		room,
		yIncrement
	);
	const pendingEntityObjects = nonDoubleCellEntities.reduce<PendingObject[]>(
		(building, e) => {
			const entityDef = entityMap[e.type];

			if (!entityDef.toObjectBinary) {
				return building;
			}

			return building.concat({
				x: e.x / TILE_SIZE,
				y: e.y / TILE_SIZE + yIncrement,
				w: 1,
				h: 1,
				entity: e,
			});
		},
		[]
	);

	return pendingObjects.concat(pendingDoubleCellObjects, pendingEntityObjects);
}

function getSprites(entities: EditorEntity[], room: RoomData): number[] {
	const sortedEntities = [...entities].sort((a, b) => {
		// this is needed due to some cell entities emiting sprites. They are in the cell
		// coordinate system, but the sprite they emit will be in the pixel coordinate system
		// just another fallout of having two coordinate systems... ugh.
		const aDivisor = entityMap[a.type].editorType === 'cell' ? 1 : TILE_SIZE;
		const bDivisor = entityMap[b.type].editorType === 'cell' ? 1 : TILE_SIZE;

		return a.x / aDivisor - b.x / bDivisor;
	});

	return sortedEntities.reduce<number[]>((building, entity) => {
		const entityDef = entityMap[entity.type];

		if (!entityDef.toSpriteBinary) {
			return building;
		}

		const x =
			entityDef.editorType === 'cell'
				? entity.x
				: Math.floor(entity.x / TILE_SIZE);
		const y =
			entityDef.editorType === 'cell'
				? entity.y
				: Math.floor(entity.y / TILE_SIZE);

		return building.concat(
			entityDef.toSpriteBinary({
				x,
				y: y + 1,
				w: 1,
				h: 1,
				settings: entity.settings ?? {},
				entity,
				room,
			})
		);
	}, []);
}

function getTransports(
	roomIndex: number,
	entities: EditorEntity[],
	allRooms: RoomData[]
): number[] {
	const transports = entities.reduce<EditorTransport[]>((building, e) => {
		const entityDef = entityMap[e.type];

		if (!entityDef.getTransports) {
			return building;
		}

		return building.concat(
			entityDef.getTransports({
				room: roomIndex,
				allRooms,
				x: Math.floor(e.x / TILE_SIZE),
				y: Math.floor(e.y / TILE_SIZE),
				settings: e.settings ?? {},
			})
		);
	}, []);

	// transports are not 0xff terminated, rather a tiny header indicating
	// how many transports follow. This is either a 16 bit value (why? more than 255 transports in one room???)
	// or the second byte means something we don't yet understand
	const transportsHeader = [transports.length, 0];

	return transports.reduce<number[]>((building, t) => {
		if (t.destRoom < 0 || t.destY < 0 || t.destX < 0) {
			return building;
		}

		const sx = t.x;
		const sy = t.y + 1;

		const dx = t.destX;
		const dy = t.destY + 1;

		// sx sy dr 0 dx dy cx cy 2 0 (exit type, two strange bytes)
		return building.concat([
			sy, // sy
			sx, // sx
			t.destRoom,
			0, // 0
			// these patches to the dest are done here to account for differences depending on the
			// exit type, but allowing the editor to always have warps be placed at the upperleft corner
			// of a pipe, regardless of its orientation
			t.exitType === 'down-from-pipe' ? dy - 1 : dy, // dy
			dx,
			dy, // cy
			dx, // cx
			exitTypeToCategoryByte[t.exitType],
			exitTypeToByte[t.exitType],
		]);
	}, transportsHeader);
}
const BLOCK_PATH_RIGHT = 0;
const BLOCK_PATH_LEFT = 1;
const BLOCK_PATH_UP = 2;
const BLOCK_PATH_DOWN = 3;

// this is really 2, one gets subtracted below
// the subtraction is just a cheap way to allow the UI to be 1-8 instead of 0-7
const DEFAULT_SNAKE_SPEED = 3;

function getDirection(cur: Point, prev: Point): number {
	if (cur.x > prev.x) {
		return BLOCK_PATH_RIGHT;
	}

	if (cur.x < prev.x) {
		return BLOCK_PATH_LEFT;
	}

	if (cur.y > prev.y) {
		return BLOCK_PATH_DOWN;
	}

	return BLOCK_PATH_UP;
}

function getBlockPathMovementData(room: RoomData): number[] {
	const snake = room.actors.entities.find((e) => e.type === 'SnakeBlock');

	if (!snake || !snake.settings?.path?.length) {
		return [0xff];
	}

	const blockPathData = [];

	const path = snake.settings.path as Point[];

	let curDirection = BLOCK_PATH_RIGHT;
	let curDistance = 1;

	for (let i = 1; i < path.length; ++i) {
		const cellDirection = getDirection(path[i], path[i - 1]);

		if (cellDirection === curDirection) {
			++curDistance;
		} else {
			blockPathData.push((curDistance << 2) | curDirection);
			curDistance = 1;
			curDirection = cellDirection;
		}
	}

	blockPathData.push((curDistance << 2) | curDirection);

	const speed = (snake.settings?.speed ?? DEFAULT_SNAKE_SPEED) - 1;

	const headerByte =
		BLOCK_PATH_RIGHT | ((snake.settings.width ?? 5) << 3) | speed;
	return [headerByte].concat(blockPathData, [0xff]);
}

function getAutoscrollEntries(room: RoomData): number[] {
	const vectors = room.actors.entities.filter(
		(e) => e.type === 'AutoscrollVector'
	);

	if (!vectors.length) {
		return [];
	}

	return vectors.reduce<number[]>(
		(building, vector) => {
			const to = (vector.settings?.to ?? { x: 0, y: 0 }) as Point;

			return building.concat([
				vector.x / TILE_SIZE + to.x,
				vector.y / TILE_SIZE + to.y,
				9,
			]);
		},
		// this is the "seed" entry, as with less than 2 entries no scrolling happens
		// in most Nintendo made levels, this entry has values, but 0,0,0 does work
		// for simple scrolling at least
		[0, 0, 0]
	);
}

function getRoom(
	levelSettings: LevelSettings,
	roomIndex: number,
	allRooms: RoomData[]
): Room {
	const currentRoom = allRooms[roomIndex];
	const { actors, stage } = currentRoom;

	const cellActorEntities = flattenCells(actors.matrix);
	const cellStageEntities = flattenCells(stage.matrix);

	const allEntities = actors.entities.concat(
		stage.entities,
		cellActorEntities,
		cellStageEntities
	);

	const objectHeader = getObjectHeader(levelSettings, currentRoom, allEntities);
	const pendingActorObjects = getPendingObjects(actors, currentRoom);
	const pendingStageObjects = getPendingObjects(stage, currentRoom);

	const allPendingObjects = pendingActorObjects.concat(pendingStageObjects);

	const sortedPendingObjects = allPendingObjects.sort(sortByObjectPriority);

	const objectData = sortedPendingObjects.reduce<number[]>((building, po) => {
		const entityDef = entityMap[po.entity.type];
		return building.concat(
			...entityDef.toObjectBinary!({
				x: po.x,
				y: po.y,
				w: po.w,
				h: po.h,
				settings: po.entity.settings ?? {},
				room: currentRoom,
			})
		);
	}, []);

	const levelSettingsData = getLevelSettings(currentRoom, allEntities);
	const transportData = getTransports(roomIndex, allEntities, allRooms);
	const spriteHeader = [0x0];
	const sprites = getSprites(allEntities, currentRoom);
	const autoscrollMovementData = getAutoscrollEntries(currentRoom);

	return {
		objects: objectHeader.concat(objectData, [0xff]),
		levelSettings: levelSettingsData,
		transportData,
		sprites: spriteHeader.concat(sprites, [0xff]),
		blockPathMovementData: getBlockPathMovementData(currentRoom),
		autoscrollMovementData: autoscrollMovementData.concat([0xff, 0xff]),
	};
}

// TODO: if this used a typed array, could just call setUint16
function setPointer(
	pointers: Tuple<number, 48>,
	pointerIndex: number,
	value: number
) {
	const lowByte = value & 0xff;
	const highByte = (value >> 8) & 0xff;

	pointers[pointerIndex * 2] = lowByte;
	pointers[pointerIndex * 2 + 1] = highByte;

	// value is returned since pointers are typically constructed one
	// after the other
	return value;
}

function getFullRoomData(rooms: Room[]): number[] {
	return rooms.reduce<number[]>((building, room) => {
		return building.concat(
			room.objects,
			room.levelSettings,
			room.transportData,
			room.sprites,
			room.blockPathMovementData,
			room.autoscrollMovementData
		);
	}, []);
}

function getAllEntities(rooms: RoomData[]): EditorEntity[] {
	return rooms.reduce<EditorEntity[]>((building, room) => {
		return building.concat(
			room.actors.entities,
			room.stage.entities,
			flattenCells(room.actors.matrix),
			flattenCells(room.stage.matrix)
		);
	}, []);
}

function createLevelData(level: LevelToLoadInGBA): Uint8Array {
	const rooms = level.data.rooms.map((_r, i, arr) =>
		getRoom(level.data.settings, i, arr)
	);

	const allEntities = getAllEntities(level.data.rooms);

	const aceCoinCount =
		allEntities.filter((e) => e.type === 'AceCoin').length +
		allEntities.filter(
			(e) => e.type === 'Bubble' && e.settings?.payload === 'AceCoin'
		).length;

	const eCoinDataProvider = allEntities.find((e) =>
		entityMap[e.type].getECoinTileData?.(e)
	);

	const header = getHeader(eCoinDataProvider ? 1 : 0, aceCoinCount);
	// four rooms, each with six pointers, pointers are two bytes
	const pointers: Tuple<number, 48> = new Array(4 * 6 * 2);
	// empty bytes between pointer and name so that name starts at 0x40
	const nullBytes = new Array(11).fill(0);

	const eCoinTileData = eCoinDataProvider
		? entityMap[eCoinDataProvider.type].getECoinTileData!(eCoinDataProvider)!
		: [];

	const eCoinPaletteData = eCoinDataProvider
		? entityMap[eCoinDataProvider.type].getECoinPaletteData!(eCoinDataProvider)!
		: [];

	const eCoinData = eCoinPaletteData.concat(eCoinTileData);
	const name = getLevelName(level.name);

	const pointerOffset =
		header.length +
		pointers.length +
		nullBytes.length +
		eCoinData.length +
		name.length;

	// kick off pointers by setting room0's object pointer
	let pointer = setPointer(pointers, 0, pointerOffset);

	// then do the rest in a loop
	let roomIndex;
	for (roomIndex = 0; roomIndex < rooms.length; ++roomIndex) {
		const base = roomIndex * 6;
		if (roomIndex > 0) {
			pointer = setPointer(
				pointers,
				base + 0,
				pointer + rooms[roomIndex - 1].autoscrollMovementData.length
			);
		}

		// level settings
		pointer = setPointer(
			pointers,
			base + 1,
			pointer + rooms[roomIndex].objects.length
		);
		// transport data
		pointer = setPointer(
			pointers,
			base + 2,
			pointer + rooms[roomIndex].levelSettings.length
		);
		// sprite data
		pointer = setPointer(
			pointers,
			base + 3,
			pointer + rooms[roomIndex].transportData.length
		);
		// block path movement data
		pointer = setPointer(
			pointers,
			base + 4,
			pointer + rooms[roomIndex].sprites.length
		);
		// auto scroll movement data
		pointer = setPointer(
			pointers,
			base + 5,
			pointer + rooms[roomIndex].blockPathMovementData.length
		);
	}

	const presentRoomsData = getFullRoomData(rooms);

	const fullDataLength =
		header.length +
		pointers.length +
		nullBytes.length +
		name.length +
		presentRoomsData.length;

	for (; roomIndex < 4; ++roomIndex) {
		const base = roomIndex * 6;
		setPointer(pointers, base + 0, fullDataLength);
		setPointer(pointers, base + 1, fullDataLength);
		setPointer(pointers, base + 2, fullDataLength);
		setPointer(pointers, base + 3, fullDataLength);
		setPointer(pointers, base + 4, fullDataLength);
		setPointer(pointers, base + 5, fullDataLength);
	}

	const fullData = header.concat(
		pointers,
		nullBytes,
		eCoinData,
		name,
		presentRoomsData
	);

	return Uint8Array.from(fullData);
}

export {
	createLevelData,
	getAllEntities,
	getLevelName,
	setPointer,
	getPendingObjects,
	sortByObjectPriority,
};
export type { PendingObject };
