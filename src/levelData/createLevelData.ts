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

type Room = {
	objects: number[];
	levelSettings: number[];
	transportData: number[];
	sprites: number[];
	blockPathMovementData: number[];
	autoScrollMovementData: number[];
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

function getHeader(aceCoinCount: number): Tuple<number, 5> {
	if (aceCoinCount > 5) {
		throw new Error(
			`createLevelData: this level has too many ace coins. max of 5, but given ${aceCoinCount}`
		);
	}

	// copying the values from classic 1-2 for now
	return [
		0, // whether it has an ecoin
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
		0x02, // ----
		width & 0xf, // bottom nibble is length of level, top is unknown
		room.settings.bgColor, // background color
		0xa1, // top nibble is scroll settings, bottom unknown, copied from 1-2
		objectGraphicSet, // top 3 bits: level entry action, bottom 5: graphics set
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

function getLevelSettings(
	room: RoomData,
	entities: EditorEntity[]
): Tuple<number, 32> {
	const [objectSet] = getObjectSet(entities);
	const spriteGraphicSet = buildSpriteGraphicSetBytes(entities);
	const player = entities.find((e) => e.type === 'Player');
	const playerY = player ? player.y / TILE_SIZE : room.roomTileHeight - 2;
	const playerX = player ? player.x / TILE_SIZE : 2;

	// if they stuck with the default height, then stick with classic 1-2 settings
	let mostSigHeightInPixels = 1;
	let leastSigHeightInPixels = 0xbf;

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
		0x40, // camera min
		0, // camera max
		playerY, // player starting y
		playerX, // player starting x
		Math.max(0, playerY - 4), // screen starting y
		Math.max(0, playerX - 5), // screen starting x
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
		0,
		0,
		0,
		0,
	];
}

function getObjects(layer: RoomLayer, room: RoomData): number[] {
	const clone = cloneDeep(layer.matrix);
	const objects: number[] = [];

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
			clone[y]?.[tile.x]?.type === tile.type &&
			isEqual(clone[y]?.[tile.x]?.settings ?? {}, tile.settings ?? {})
		) {
			++y;
		}

		return Math.max(y - 1, tile.y);
	}

	function getBestY(startTile: EditorEntity, endTile: EditorEntity): number {
		let curBest = Number.MAX_SAFE_INTEGER;

		for (let x = startTile.x; x <= endTile.x; ++x) {
			const thisColMaxY = getMaxY(clone[startTile.y]![x]!);

			curBest = Math.min(curBest, thisColMaxY);
		}

		return curBest;
	}

	function erase(startY: number, endY: number, startX: number, endX: number) {
		for (let y = startY; y <= endY; ++y) {
			const row = clone[y]!;

			for (let x = startX; x <= endX; ++x) {
				row[x] = null;
			}
		}
	}

	for (let y = 0; y < room.roomTileHeight; ++y) {
		const row = clone[y];

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

			objects.push(
				...objectDef.toObjectBinary(
					x,
					y + 1,
					length,
					height,
					tile.settings ?? {},
					tile,
					room
				)
			);

			erase(tile.y, bestY, tile.x, endXTile.x);
		}
	}

	const entityObjectData = layer.entities.reduce<number[]>((building, e) => {
		const entityDef = entityMap[e.type];

		if (!entityDef.toObjectBinary) {
			return building;
		}

		return building.concat(
			entityDef.toObjectBinary(
				e.x / TILE_SIZE,
				e.y / TILE_SIZE + 1,
				1,
				1,
				e.settings ?? {},
				e,
				room
			)
		);
	}, []);

	return objects.concat(entityObjectData);
}

function getSprites(entities: EditorEntity[], room: RoomData): number[] {
	const sortedEntities = [...entities].sort((a, b) => {
		return a.x - b.x;
	});

	return sortedEntities.reduce<number[]>((building, entity) => {
		const entityDef = entityMap[entity.type];

		if (!entityDef.toSpriteBinary) {
			return building;
		}

		const x = Math.floor(entity.x / TILE_SIZE);
		const y = Math.floor(entity.y / TILE_SIZE);

		return building.concat(
			entityDef.toSpriteBinary(
				x,
				y + 1,
				1,
				1,
				entity.settings ?? {},
				entity,
				room
			)
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
			entityDef.getTransports(
				roomIndex,
				allRooms,
				Math.floor(e.x / TILE_SIZE),
				Math.floor(e.y / TILE_SIZE),
				e.settings ?? {}
			)
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
	const actorObjects = getObjects(actors, currentRoom);
	const stageObjects = getObjects(stage, currentRoom);
	const levelSettingsData = getLevelSettings(currentRoom, allEntities);
	const transportData = getTransports(roomIndex, allEntities, allRooms);
	const spriteHeader = [0x0];
	const sprites = getSprites(allEntities, currentRoom);

	return {
		objects: objectHeader.concat(actorObjects, stageObjects, [0xff]),
		levelSettings: levelSettingsData,
		transportData,
		sprites: spriteHeader.concat(sprites, [0xff]),
		blockPathMovementData: [0xff],
		autoScrollMovementData: [0xff],
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
			room.autoScrollMovementData
		);
	}, []);
}

function getAllNonCellEntities(rooms: RoomData[]): EditorEntity[] {
	return rooms.reduce<EditorEntity[]>((building, room) => {
		return building.concat(room.actors.entities, room.stage.entities);
	}, []);
}

function createLevelData(level: LevelToLoadInGBA): Uint8Array {
	const rooms = level.data.rooms.map((_r, i, arr) =>
		getRoom(level.data.settings, i, arr)
	);

	const allNonCellEntities = getAllNonCellEntities(level.data.rooms);

	const aceCoinCount = allNonCellEntities.filter((e) => e.type === 'AceCoin')
		.length;

	const header = getHeader(aceCoinCount);
	// four rooms, each with six pointers, pointers are two bytes
	const pointers: Tuple<number, 48> = new Array(4 * 6 * 2);
	// empty bytes between pointer and name so that name starts at 0x40
	const nullBytes = new Array(11).fill(0);

	const name = getLevelName(level.name);

	const pointerOffset =
		header.length + pointers.length + nullBytes.length + name.length;

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
				pointer + rooms[roomIndex - 1].autoScrollMovementData.length
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

	const fullData = header.concat(pointers, nullBytes, name, presentRoomsData);

	return Uint8Array.from(fullData);
}

export { createLevelData, getLevelName, setPointer };
