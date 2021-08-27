import { Mock } from 'ts-mockery';
import { TILE_SIZE } from '../../../tiles/constants';
import { from_5_1_1_to_5_2_0 as convert } from '../from_5_1_1_to_5_2_0';

describe('from_5_1_1_to_5_2_0', function () {
	it('should return null if the input is not 5.1.1', function () {
		const result = convert({ version: '5.0.0' });

		expect(result).toBeNull();
	});

	it('should convert a simple cell liquid entity', function () {
		const level = Mock.of<SerializedLevel>({
			version: '5.1.1',
			data: {
				rooms: [
					{
						stage: {
							entities: [],
							matrix: [['Wf']],
						},
					},
				],
			},
		});

		const converted = convert(level);

		expect(converted!.data.rooms[0].stage.entities).toEqual([
			{
				id: 123,
				settings: { height: 1, width: 1 },
				type: 'Waterfall',
				x: 0,
				y: 0,
			},
		]);

		expect(converted!.data.rooms[0].stage.matrix).toBe(
			level.data.rooms[0].stage.matrix
		);
	});

	it('should convert several cell liquid entities', function () {
		const level = Mock.of<SerializedLevel>({
			version: '5.1.1',
			data: {
				rooms: [
					{
						stage: {
							entities: [],
							matrix: [
								['Wf', 'Wf', 'Wf', '', '', 'Lv', 'Lv'],
								['Wf', 'Wf', 'Wf', '', '', 'Lv', 'Lv'],
							],
						},
					},
				],
			},
		});

		const converted = convert(level);

		expect(converted!.data.rooms[0].stage.entities).toEqual([
			{
				id: 123,
				settings: { height: 2, width: 2 },
				type: 'Lava',
				x: 5 * TILE_SIZE,
				y: 0,
			},
			{
				id: 123,
				settings: { height: 2, width: 3 },
				type: 'Waterfall',
				x: 0,
				y: 0,
			},
		]);

		expect(converted!.data.rooms[0].stage.matrix).toBe(
			level.data.rooms[0].stage.matrix
		);
	});

	it('should leave non liquid tiles alone', function () {
		const level = Mock.of<SerializedLevel>({
			version: '5.1.1',
			data: {
				rooms: [
					{
						stage: {
							entities: [],
							matrix: [['Br', 'Br', 'Br', '', '', 'Lv', '$']],
						},
					},
				],
			},
		});

		const converted = convert(level);
		expect(converted!.data.rooms[0].stage.entities).toEqual([
			{ id: 123, settings: { height: 1, width: 1 }, type: 'Lava', x: 80, y: 0 },
		]);
		expect(converted!.data.rooms[0].stage.matrix).toBe(
			level.data.rooms[0].stage.matrix
		);
	});

	it('should honor the max width of 26 as createLevelData does', function () {
		const row = [];
		for (let i = 0; i < 30; ++i) {
			row.push('Cw');
		}

		const level = Mock.of<SerializedLevel>({
			version: '5.1.1',
			data: {
				rooms: [
					{
						stage: {
							entities: [],
							matrix: [row],
						},
					},
				],
			},
		});

		const converted = convert(level);
		expect(converted!.data.rooms[0].stage.entities).toEqual([
			{
				id: 123,
				settings: { height: 1, width: 26 },
				type: 'ChoppyWater',
				x: 0,
				y: 0,
			},
			{
				id: 123,
				settings: { height: 1, width: 4 },
				type: 'ChoppyWater',
				x: 416,
				y: 0,
			},
		]);
	});

	it('should handle string rows', function () {
		const level = Mock.of<SerializedLevel>({
			version: '5.1.1',
			data: {
				rooms: [
					{
						stage: {
							entities: [],
							matrix: ['', ['Lv', 'Lv'], '', ['', 'Pw'], ''],
						},
					},
				],
			},
		});

		const converted = convert(level);
		expect(converted!.data.rooms[0].stage.entities).toEqual([
			{ id: 123, settings: { height: 1, width: 2 }, type: 'Lava', x: 0, y: 16 },
			{
				id: 123,
				settings: { height: 1, width: 1 },
				type: 'PoolOfWater',
				x: 16,
				y: 48,
			},
		]);

		expect(converted!.data.rooms[0].stage.matrix).toBe(
			level.data.rooms[0].stage.matrix
		);
	});
});
