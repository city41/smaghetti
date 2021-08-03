import { createLevelData } from '../createLevelData';
import {
	BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES,
	BACKGROUND_GRAPHIC_VALUES,
	MUSIC_VALUES,
	ROOM_OBJECT_HEADER_SIZE_IN_BYTES,
	ROOM_OBJECT_POINTERS,
	ROOM_SPRITE_POINTERS,
} from '../constants';
import { parseObject } from '../parseObjectsFromLevelFile';

describe('createLevelData', () => {
	describe('sprites', () => {
		it('should store the sprites in the level sorted by x', () => {
			const entities: EditorEntity[] = [
				{
					id: 1,
					x: 32,
					y: 64,
					type: 'Goomba',
				},
				{
					id: 2,
					x: 16,
					y: 48,
					type: 'Mushroom',
				},
			];

			const room: RoomData = {
				settings: {
					music: MUSIC_VALUES.Underground,
					bgColor: 0,
					bgGraphic: BACKGROUND_GRAPHIC_VALUES.underground,
					bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
				},
				paletteEntries: [],
				actors: {
					entities,
					matrix: [],
				},
				stage: {
					entities: [],
					matrix: [],
				},
				roomTileWidth: 16,
				roomTileHeight: 40,
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
				0xd, // mushroom id
				1, // mushroom X
				4, // mushroom Y
				0, // goomba bank 0
				0x72, // goomba id
				2, // goomba x
				5, // goomba y
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
								bgGraphic: BACKGROUND_GRAPHIC_VALUES.underground,
								music: MUSIC_VALUES.Underground,
								bgColor: 0,
								bgExtraColorAndEffect:
									BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
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

			expect(parsedObject.y).toEqual(1);
			expect(parsedObject.x).toEqual(0);
		});
	});
});
