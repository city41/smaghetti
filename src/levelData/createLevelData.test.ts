import { createLevelData } from './createLevelData';
import {
	BREAKABLE_BRICK_OBJECT_ID,
	OBJECT_HEADER_SIZE,
	ROOM0_OBJECT_POINTER_ADDRESS,
} from './constants';
import { getObjectCount, parseObject } from './objects';

describe('createLevelData', () => {
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

			const levelData = createLevelData([], tileLayer);

			const objectAddr =
				levelData[ROOM0_OBJECT_POINTER_ADDRESS] + OBJECT_HEADER_SIZE;

			const objectCount = getObjectCount(levelData, objectAddr);
			expect(objectCount).toEqual(1);

			const parsedObject = parseObject(levelData, objectAddr);

			expect(parsedObject.bank).toEqual(1);
			expect(parsedObject.width).toEqual(2);
			expect(parsedObject.height).toEqual(2);
			expect(parsedObject.id).toEqual(BREAKABLE_BRICK_OBJECT_ID);

			// 26 because SMA4 stores Ys very strangely.
			expect(parsedObject.y).toEqual(26);
			expect(parsedObject.x).toEqual(0);
		});
	});
});
