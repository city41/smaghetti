import { createLevelData } from './createLevelData';
import {
	ROOM_OBJECT_HEADER_SIZE_IN_BYTES,
	ROOM_OBJECT_POINTERS,
	ROOM_SPRITE_POINTERS,
} from './constants';
import { parseObject } from './parseObjectsFromLevelFile';

describe('createLevelData', () => {
	describe('sprites', () => {
		it('should store the sprites in the level sorted by x', () => {
			const entities: EditorEntity[] = [
				{
					id: 0,
					x: 32,
					y: 64,
					type: 'Goomba',
				},
				{
					id: 1,
					x: 16,
					y: 48,
					type: 'Mushroom',
				},
			];

			const room: RoomData = {
				paletteEntries: [],
				entities,
				transports: [],
				tileLayer: {
					width: 0,
					height: 0,
					data: [],
				},
			};

			const levelData = createLevelData([room]);

			// skip the opening 0 byte
			const spriteAddr = levelData[ROOM_SPRITE_POINTERS[0]] + 1;

			const spriteData = levelData.slice(spriteAddr, spriteAddr + 8);

			expect(Array.from(spriteData)).toEqual([
				0, // mushroom bank 0
				13, // mushroom id
				1, // mushroom X
				31, // mushroom Y (encoded to the level)
				0, // goomba bank 0
				114, // goomba id
				2, // goomba x
				32, // goomba y (encoded to the level)
			]);
		});
	});

	describe('objects', () => {
		it('should create a single 2D object', () => {
			const tileLayer: TileLayer = {
				width: 2,
				height: 2,
				data: [
					[
						{ id: 1, x: 0, y: 0, tileType: 'Brick', tileIndex: 0 },
						{ id: 2, x: 1, y: 0, tileType: 'Brick', tileIndex: 0 },
					],
					[
						{ id: 3, x: 0, y: 1, tileType: 'Brick', tileIndex: 0 },
						{ id: 4, x: 1, y: 1, tileType: 'Brick', tileIndex: 0 },
					],
				],
			};

			const levelData = createLevelData([
				{ paletteEntries: [], entities: [], transports: [], tileLayer },
			]);

			const objectAddr =
				levelData[ROOM_OBJECT_POINTERS[0]] + ROOM_OBJECT_HEADER_SIZE_IN_BYTES;

			const parsedObject = parseObject(levelData, objectAddr);

			expect(parsedObject.bank).toEqual(1);
			expect(parsedObject.param1).toEqual(2);
			expect(parsedObject.param2).toEqual(2);
			expect(parsedObject.id).toEqual(0xf);

			// 26 because SMA4 stores Ys very strangely.
			expect(parsedObject.y).toEqual(26);
			expect(parsedObject.x).toEqual(0);
		});
	});
});
