import { convertASCIIToLevelName } from './util';
import { TILE_SIZE, TileType } from '../tiles/constants';

type Tuple<T, N extends number> = N extends N ? T[] : _TupleOf<T, N, []>;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
	? R
	: _TupleOf<T, N, [T, ...R]>;

type Room = {
	objects: number[];
	levelSettings: number[];
	transportData: number[];
	sprites: number[];
	blockPathMovementData: number[];
	autoScrollMovementData: number[];
};

const MAX_Y = 0x1b;

function getHeader(): Tuple<number, 5> {
	// copying the values from classic 1-2 for now
	return [
		0, // whether it has an ecoin
		1, // number of ace coins
		1, // eLevel class
		2, // eLevel number
		1, // eLevel icon
	];
}

function getLevelName(name: string): number[] {
	const asEreader = convertASCIIToLevelName(name);

	if (asEreader.length < 21) {
		asEreader.push(0xff);
	}

	return asEreader;
}

function getObjectHeader(): Tuple<number, 11> {
	return [
		0x09, // time, hundreds digit
		0x00, // time, tens and ones
		0x00, // 16 bit value that is unknown, copied from classic 1-2
		0x02, // ----
		0x0c, // bottom nibble is length of level, copied from classic 1-2
		0x01, // background color, copied from classic 1-2
		0xa1, // top nibble is scroll settings, bottom unknown, copied from 1-2
		0x03, // top 3 bits: level entry action, bottom 5: graphics set
		0x08, // top nibble: graphics set, bottom: unknown
		0x00, // top nibble: extra color, bottom: extre effect
		0x37, // background graphics, copied from 1-2
	];
}

const CoinStrip = [
	0x41, // top 2 bits: bank, bottom 6: length
	0x11, // y
	0x36, // x
	0x0f, // object Id, F = breakable brick
	0x01, // vertical length
];

const Goomba = [
	0x00, // bank 0 or 1
	0x72, // sprite Id, 0x72 = goomba
	0x0f, // X
	0x1a, // Y
];

// level settings for room 0
const Classic1_2LevelSettings = [
	0xbf,
	0x01,
	0,
	0,
	0x18,
	0,
	0x38,
	0,
	0x19,
	0x02,
	0x12,
	0,
	0x0e,
	0,
	0x0d,
	0,
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

const bricks = [
	0x5f, // 0x01011111 -> (01)(011111) -> bank 1, length of 32
	0x1b, // y
	0x01, // x
	0x0f, // breakable brick
	0, // vertical height of 1
];

const tileTypeToObjectId: Record<TileType, number> = {
	brick: 0xf,
	coin: 0x16,
};

function getObjects(tileLayer: TileLayer): number[] {
	function getObjectsForRow(row: Array<null | Tile>): number[] {
		const rowObjects: number[] = [];

		let i = 0;

		while (i < row.length) {
			while (i < row.length && !row[i]) {
				++i;
			}

			if (i === row.length) {
				break;
			}

			const start = i;
			const startType = row[start]!.tileType;

			if (!startType) debugger;

			while (i < row.length && row[i]?.tileType === startType) {
				++i;
			}

			const end = i;

			const bank = 1;
			const length = end - start;
			// length - 1 because the length is stored minus one
			const bankAndLength = (bank << 6) | (length - 1);

			const tileY = row[start]!.y;
			const yDiff = tileLayer.height - (tileY + 1);
			const y = MAX_Y - yDiff;
			const x = row[start]!.x;
			// height is zero because it's stored minus one
			const height = 0;

			rowObjects.push(
				...[
					bankAndLength,
					y,
					x,
					tileTypeToObjectId[row[start]!.tileType],
					height,
				]
			);
		}

		return rowObjects;
	}

	return tileLayer.data.reduce<number[]>((building, row) => {
		if (row === null) {
			return building;
		}

		return building.concat(getObjectsForRow(row));
	}, []);
}

function getSprites(entities: Entity[], levelHeightInTiles: number): number[] {
	return entities.reduce<number[]>((building, entity) => {
		if (entity.type === 'Player') {
			return building;
		}

		const entityTileY = Math.floor(entity.y / TILE_SIZE);
		const yDiff = levelHeightInTiles - (entityTileY + 1);

		return building.concat([
			0x00, // bank 0 or 1
			0x72, // sprite Id, 0x72 = goomba
			Math.floor(entity.x / TILE_SIZE),
			MAX_Y - yDiff,
		]);
	}, []);
}

function getRoom(entities: Entity[], tileLayer: TileLayer): Room {
	const objectHeader = getObjectHeader();
	const objects = getObjects(tileLayer); // CoinStrip.concat(bricks);
	console.log('objects:', objects.map((o) => o?.toString(16)).join(', '));

	const levelSettings = Classic1_2LevelSettings;

	const spriteHeader = [0x00];
	const sprites = getSprites(entities, tileLayer.height); // Goomba;

	return {
		objects: objectHeader.concat(objects, [0xff]),
		levelSettings,
		transportData: [0, 0],
		sprites: spriteHeader.concat(sprites, [0xff]),
		blockPathMovementData: [0xff],
		autoScrollMovementData: [0xff],
	};
}

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

function getFullRoomData(room: Room): number[] {
	return room.objects.concat(
		room.levelSettings,
		room.transportData,
		room.sprites,
		room.blockPathMovementData,
		room.autoScrollMovementData
	);
}

function createLevelData(entities: Entity[], tileLayer: TileLayer): Uint8Array {
	const room0 = getRoom(entities, tileLayer);
	// const room1 = null;
	// const room2 = null;
	// const room3 = null;

	const header = getHeader();
	// four rooms, each with six pointers, pointers are two bytes
	const pointers: Tuple<number, 48> = new Array(4 * 6 * 2);
	// empty bytes between pointer and name so that name starts at 0x40
	const nullBytes = new Array(11);
	const name = getLevelName('SMAGHETTI');

	const pointerOffset =
		header.length + pointers.length + nullBytes.length + name.length;

	// objects
	let pointer = setPointer(pointers, 0, pointerOffset);
	// level settings
	pointer = setPointer(pointers, 1, pointer + room0.objects.length);
	// transport data
	pointer = setPointer(pointers, 2, pointer + room0.levelSettings.length);
	// sprite data
	pointer = setPointer(pointers, 3, pointer + room0.transportData.length);
	// block path movement data
	pointer = setPointer(pointers, 4, pointer + room0.sprites.length);
	// auto scroll movement data
	pointer = setPointer(
		pointers,
		5,
		pointer + room0.blockPathMovementData.length
	);

	const room0Data = getFullRoomData(room0);

	const fullDataLength =
		header.length +
		pointers.length +
		nullBytes.length +
		name.length +
		room0Data.length;

	// room 1 pointers
	setPointer(pointers, 6, fullDataLength);
	setPointer(pointers, 7, fullDataLength);
	setPointer(pointers, 8, fullDataLength);
	setPointer(pointers, 9, fullDataLength);
	setPointer(pointers, 10, fullDataLength);
	setPointer(pointers, 11, fullDataLength);

	// room 2 pointers
	setPointer(pointers, 12, fullDataLength);
	setPointer(pointers, 13, fullDataLength);
	setPointer(pointers, 14, fullDataLength);
	setPointer(pointers, 15, fullDataLength);
	setPointer(pointers, 16, fullDataLength);
	setPointer(pointers, 17, fullDataLength);

	// room 3 pointers
	setPointer(pointers, 18, fullDataLength);
	setPointer(pointers, 19, fullDataLength);
	setPointer(pointers, 20, fullDataLength);
	setPointer(pointers, 21, fullDataLength);
	setPointer(pointers, 22, fullDataLength);
	setPointer(pointers, 23, fullDataLength);

	const fullData = header.concat(pointers, nullBytes, name, room0Data);

	return Uint8Array.from(fullData);
}

export { createLevelData };
