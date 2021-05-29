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
				settings: {
					music: 0,
					bgColor: 0,
					bgGraphic: 0,
					bgExtraColorAndEffect: 0,
				},
				paletteEntries: [],
				actors: {
					entities,
					matrix: [],
				},
				stage: {
					entities,
					matrix: [],
				},
				roomTileWidth: 0,
				roomTileHeight: 0,
			};

			const level = {
				name: 'createLevelData.test',
				data: {
					settings: {
						timer: 900,
					},
					rooms: [room],
				},
			};

			const levelData = createLevelData(level);

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
			const matrix = [
				[
					{ id: 1, x: 0, y: 0, type: 'Brick' },
					{ id: 2, x: 1, y: 0, type: 'Brick' },
				],
				[
					{ id: 3, x: 0, y: 1, type: 'Brick' },
					{ id: 4, x: 1, y: 1, type: 'Brick' },
				],
			] as EditorEntityMatrix;

			const levelData = createLevelData({
				name: 'createLevelData.test',
				data: {
					settings: {
						timer: 900,
					},
					rooms: [
						{
							settings: {
								bgGraphic: 0,
								music: 0,
								bgColor: 0,
								bgExtraColorAndEffect: 0,
							},
							paletteEntries: [],
							actors: {
								entities: [],
								matrix: [],
							},
							stage: {
								entities: [],
								matrix,
							},
							roomTileWidth: 2,
							roomTileHeight: 2,
						},
					],
				},
			});

			const objectAddr =
				levelData[ROOM_OBJECT_POINTERS[0]] + ROOM_OBJECT_HEADER_SIZE_IN_BYTES;

			const parsedObject = parseObject(levelData, objectAddr, 0xe, [], []);

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
