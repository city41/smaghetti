import { convertASCIIToLevelName } from './util';
import { TILE_SIZE } from '../tiles/constants';
import cloneDeep from 'lodash/cloneDeep';
import { entityMap } from '../entities/entityMap';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import { decodeObjectSet } from '../entities/util';

type Room = {
	objects: number[];
	levelSettings: number[];
	transportData: number[];
	sprites: number[];
	blockPathMovementData: number[];
	autoScrollMovementData: number[];
};

const MAX_Y = 0x1b;

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
		0, // eLevel class
		0, // eLevel number
		0, // eLevel icon
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

	const resultingSet = intersected[0] ?? 0;

	return decodeObjectSet(resultingSet);
}

function getObjectHeader(
	settings: RoomSettings,
	entities: EditorEntity[]
): Tuple<number, 11> {
	const [, objectGraphicSet] = getObjectSet(entities);

	return [
		0x09, // time, hundreds digit
		0x00, // time, tens and ones
		0x00, // 16 bit value that is unknown, copied from classic 1-2
		0x02, // ----
		0x0c, // bottom nibble is length of level, copied from classic 1-2
		settings.bgColor, // background color
		0xa1, // top nibble is scroll settings, bottom unknown, copied from 1-2
		objectGraphicSet, // top 3 bits: level entry action, bottom 5: graphics set
		0x08, // top nibble: graphics set, bottom: unknown
		settings.bgExtraColorAndEffect ?? 0,
		// background graphics, copied from 1-2
		settings.bgGraphic,
	];
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
	settings: RoomSettings,
	entities: EditorEntity[]
): Tuple<number, 32> {
	const [objectSet] = getObjectSet(entities);

	return [
		0xbf, // screen y boundary, least sig byte
		0x01, // screen y boundary, most sig byte
		0, // fixed screen center y, least sig byte
		0, // fixed screen center y, most sig byte
		0x18, // player y screen center
		0, // player y screen center
		0x38, // camera min
		0, // camera max
		0x19, // player y
		0x02, // player x
		0x12, // screen y
		0, // screen x
		objectSet, // object set, least sig byte
		0, // object set, most sig byte
		settings.music, // music, least sig byte
		0, // music, most sig byte
		...buildSpriteGraphicSetBytes(entities),
		// the rest of the bytes are largely unknown and copied from classic 1-2
		0x0,
		0,
		0x0,
		0,
		1, // needs to be zero for arrow lift and others
		0,
		0,
		0,
		0,
		0,
	];
}

function getObjects(
	entities: EditorEntity[],
	tileLayer: MatrixLayer
): number[] {
	const clone = cloneDeep(tileLayer);
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
			isEqual(row[x]?.settings, startTile.settings)
		) {
			++x;
		}

		// x goes one too far, so our tile is one back
		return row[x - 1] as EditorEntity;
	}

	function getMaxY(tile: EditorEntity): number {
		if (!entityMap[tile.type].dimensions.includes('y')) {
			return tile.y;
		}

		let y = tile.y;

		while (
			clone.data[y]?.[tile.x]?.type === tile.type &&
			isEqual(clone.data[y]?.[tile.x]?.settings, tile.settings)
		) {
			++y;
		}

		return y - 1;
	}

	function getBestY(startTile: EditorEntity, endTile: EditorEntity): number {
		let curBest = Number.MAX_SAFE_INTEGER;

		for (let x = startTile.x; x <= endTile.x; ++x) {
			const thisColMaxY = getMaxY(clone.data[startTile.y]![x]!);

			curBest = Math.min(curBest, thisColMaxY);
		}

		return curBest;
	}

	function erase(startY: number, endY: number, startX: number, endX: number) {
		for (let y = startY; y <= endY; ++y) {
			const row = clone.data[y]!;

			for (let x = startX; x <= endX; ++x) {
				row[x] = null;
			}
		}
	}

	for (let y = 0; y < clone.height; ++y) {
		const row = clone.data[y];

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

			const yDiff = tileLayer.height - (y + 1);
			const encodedY = MAX_Y - yDiff;

			objects.push(
				...objectDef.toObjectBinary(
					x,
					encodedY,
					length,
					height,
					tile.settings ?? {}
				)
			);

			erase(tile.y, bestY, tile.x, endXTile.x);
		}
	}

	const entityObjectData = entities.reduce<number[]>((building, e) => {
		const entityDef = entityMap[e.type];

		if (!entityDef.toObjectBinary) {
			return building;
		}

		const y = e.y / TILE_SIZE;
		const yDiff = tileLayer.height - (y + 1);
		const encodedY = MAX_Y - yDiff;

		return building.concat(
			entityDef.toObjectBinary(
				e.x / TILE_SIZE,
				encodedY,
				1,
				1,
				e.settings ?? {}
			)
		);
	}, []);

	return objects.concat(entityObjectData);
}

function getSprites(
	entities: EditorEntity[],
	levelHeightInTiles: number
): number[] {
	const sortedEntities = [...entities].sort((a, b) => {
		return a.x - b.x;
	});

	return sortedEntities.reduce<number[]>((building, entity) => {
		const entityDef = entityMap[entity.type];

		if (!entityDef.toSpriteBinary) {
			return building;
		}

		const x = Math.floor(entity.x / TILE_SIZE);
		const entityTileY = Math.floor(entity.y / TILE_SIZE);
		const yDiff = levelHeightInTiles - (entityTileY + 1);
		const y = MAX_Y - yDiff;

		return building.concat(
			entityDef.toSpriteBinary(x, y, 1, 1, entity.settings ?? {})
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

		const sy = t.y;
		const syDiff = allRooms[t.room].matrixLayer.height - (sy + 1);
		const encodedSY = MAX_Y - syDiff;

		const dx = t.destX;

		const dy = t.destY;
		const dyDiff = allRooms[t.destRoom].matrixLayer.height - (dy + 1);
		const encodedDY = MAX_Y - dyDiff;

		// sx sy dr 0 dx dy cx cy 2 0 (exit type, two strange bytes)
		return building.concat([
			encodedSY, // sy
			sx, // sx
			t.destRoom,
			0, // 0
			encodedDY, // dy
			dx,
			16, // cy
			7, // cx
			0, // exit type byte one??
			0, // exit type byte two??
		]);
	}, transportsHeader);
}

function flattenCells(matrixLayer: MatrixLayer): EditorEntity[] {
	return matrixLayer.data.reduce<EditorEntity[]>((building, row) => {
		if (!row) {
			return building;
		}
		const rowTiles = row.reduce<EditorEntity[]>((buildingRow, tile) => {
			if (!tile) {
				return buildingRow;
			}

			return buildingRow.concat(tile);
		}, []);

		return building.concat(rowTiles);
	}, []);
}

function getRoom(roomIndex: number, allRooms: RoomData[]): Room {
	const { settings, matrixLayer, entities } = allRooms[roomIndex];
	const cellEntities = flattenCells(matrixLayer);

	const allEntities = entities.concat(cellEntities);

	const objectHeader = getObjectHeader(settings, allEntities);
	const objects = getObjects(entities, matrixLayer);
	const levelSettings = getLevelSettings(settings, allEntities);
	const transportData = getTransports(roomIndex, allEntities, allRooms);
	const spriteHeader = [0x0];
	const sprites = getSprites(allEntities, matrixLayer.height);

	return {
		objects: objectHeader.concat(objects, [0xff]),
		levelSettings,
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

function getAllEntities(rooms: RoomData[]): EditorEntity[] {
	return rooms.reduce<EditorEntity[]>((building, room) => {
		return building.concat(room.entities);
	}, []);
}

function createLevelData(roomDatas: RoomData[]): Uint8Array {
	const rooms = roomDatas.map((_r, i, arr) => getRoom(i, arr));

	const allEntities = getAllEntities(roomDatas);

	const aceCoinCount = allEntities.filter((e) => e.type === 'AceCoin').length;

	const header = getHeader(aceCoinCount);
	// four rooms, each with six pointers, pointers are two bytes
	const pointers: Tuple<number, 48> = new Array(4 * 6 * 2);
	// empty bytes between pointer and name so that name starts at 0x40
	const nullBytes = new Array(11).fill(0);
	const name = getLevelName('SMAGHETTI');

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
