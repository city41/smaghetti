import { convertASCIIToLevelName } from './util';
import { TILE_SIZE } from '../tiles/constants';
import cloneDeep from 'lodash/cloneDeep';
import { entityMap } from '../entities/entityMap';
import isEqual from 'lodash/isEqual';
import { ROOM_TYPE_SETTINGS } from './constants';

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

function getObjectHeader(settings: RoomSettings): Tuple<number, 11> {
	return [
		0x09, // time, hundreds digit
		0x00, // time, tens and ones
		0x00, // 16 bit value that is unknown, copied from classic 1-2
		0x02, // ----
		0x0c, // bottom nibble is length of level, copied from classic 1-2
		settings.bgColor, // background color
		0xa1, // top nibble is scroll settings, bottom unknown, copied from 1-2
		settings.graphicSet, // top 3 bits: level entry action, bottom 5: graphics set
		0x08, // top nibble: graphics set, bottom: unknown
		0x00, // top nibble: extra color, bottom: extre effect
		// background graphics, copied from 1-2
		settings.bgGraphic,
	];
}

function getLevelSettings(settings: RoomSettings): Tuple<number, 32> {
	// based on classic 1-2 settings
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
		settings.objectSet, // object set, least sig byte
		0, // object set, most sig byte
		settings.music, // music, least sig byte
		0, // music, most sig byte
		// the rest of the bytes are largely unknown and copied from classic 1-2
		0,
		0,
		0,
		0x02,
		0,
		0,
		0x18,
		0,
		0x38,
		0,
		0x01,
		0,
		0,
		0,
		0xf4,
		0,
	];
}

function getObjects(entities: EditorEntity[], tileLayer: TileLayer): number[] {
	const clone = cloneDeep(tileLayer);
	const objects: number[] = [];

	function getEndX(row: TileRow, startTile: Tile): Tile {
		if (!entityMap[startTile.tileType].dimensions.includes('x')) {
			return startTile;
		}

		let x = startTile.x;

		while (
			row[x]?.tileType === startTile.tileType &&
			isEqual(row[x]?.settings, startTile.settings)
		) {
			++x;
		}

		// x goes one too far, so our tile is one back
		return row[x - 1] as Tile;
	}

	function getMaxY(tile: Tile): number {
		if (!entityMap[tile.tileType].dimensions.includes('y')) {
			return tile.y;
		}

		let y = tile.y;

		while (
			clone.data[y]?.[tile.x]?.tileType === tile.tileType &&
			isEqual(clone.data[y]?.[tile.x]?.settings, tile.settings)
		) {
			++y;
		}

		return y - 1;
	}

	function getBestY(startTile: Tile, endTile: Tile): number {
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

			if (!tile || entityMap[tile.tileType].gameType !== 'object') {
				continue;
			}

			const endXTile = getEndX(row, tile);
			const bestY = getBestY(tile, endXTile);

			// length/height - 1 because they are stored 1 less than actual
			const length = endXTile.x - tile.x;
			const height = bestY - tile.y;

			const yDiff = tileLayer.height - (y + 1);
			const encodedY = MAX_Y - yDiff;

			const objectDef = entityMap[tile.tileType];

			objects.push(
				...objectDef.toBinary(x, encodedY, length, height, tile.settings ?? {})
			);

			erase(tile.y, bestY, tile.x, endXTile.x);
		}
	}

	const entityObjectData = entities.reduce<number[]>((building, e) => {
		const entityDef = entityMap[e.type];

		if (entityDef.gameType !== 'object') {
			return building;
		}

		const y = e.y / TILE_SIZE;
		const yDiff = tileLayer.height - (y + 1);
		const encodedY = MAX_Y - yDiff;

		return building.concat(
			entityDef.toBinary(e.x / TILE_SIZE, encodedY, 1, 1, e.settings ?? {})
		);
	}, []);

	return objects.concat(entityObjectData);
}

function getSprites(
	entities: EditorEntity[],
	tiles: Tile[],
	levelHeightInTiles: number
): number[] {
	// TODO: also need to sort tile entities into this
	const sortedEntities = [...entities].sort((a, b) => {
		return a.x - b.x;
	});

	const sprites = sortedEntities.reduce<number[]>((building, entity) => {
		if (entity.type === 'Player') {
			return building;
		}

		const entityDef = entityMap[entity.type];

		if (entityDef.gameType !== 'sprite') {
			return building;
		}

		const x = Math.floor(entity.x / TILE_SIZE);
		const entityTileY = Math.floor(entity.y / TILE_SIZE);
		const yDiff = levelHeightInTiles - (entityTileY + 1);
		const y = MAX_Y - yDiff;

		return building.concat(
			entityDef.toBinary(x, y, 1, 1, entity.settings ?? {})
		);
	}, []);

	const tileSprites = tiles.reduce<number[]>((building, t) => {
		const entityDef = entityMap[t.tileType];

		if (entityDef.gameType !== 'sprite') {
			return building;
		}

		return building.concat(
			entityDef.toBinary(t.x, t.y, 1, 1, t.settings ?? {})
		);
	}, []);

	return sprites.concat(tileSprites);
}

function getTransports(
	transports: EditorTransport[],
	allRooms: RoomData[]
): number[] {
	if (transports.length > 255) {
		throw new Error(
			'createLevelData#getTransports: more than 255 transports in one room'
		);
	}

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
		const syDiff = allRooms[t.room].tileLayer.height - (sy + 1);
		const encodedSY = MAX_Y - syDiff;

		const dx = t.destX;

		const dy = t.destY;
		const dyDiff = allRooms[t.destRoom].tileLayer.height - (dy + 1);
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

function flattenTiles(tileLayer: TileLayer): Tile[] {
	return tileLayer.data.reduce<Tile[]>((building, row) => {
		if (!row) {
			return building;
		}
		const rowTiles = row.reduce<Tile[]>((buildingRow, tile) => {
			if (!tile) {
				return buildingRow;
			}

			return buildingRow.concat(tile);
		}, []);

		return building.concat(rowTiles);
	}, []);
}

function getRoom(roomIndex: number, allRooms: RoomData[]): Room {
	const { settings, tileLayer, entities, transports } = allRooms[roomIndex];
	const flatTiles = flattenTiles(tileLayer);

	const objectHeader = getObjectHeader(settings);
	const objects = getObjects(entities, tileLayer);
	const levelSettings = getLevelSettings(settings);
	const transportData = getTransports(transports, allRooms);
	const spriteHeader = [0x0];
	const sprites = getSprites(entities, flatTiles, tileLayer.height);

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
	const rooms = roomDatas.map((r, i, arr) => getRoom(i, arr));

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
