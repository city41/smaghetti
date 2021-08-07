import { moveRoomToFront } from '../moveRoomToFront';
import { Mock } from 'ts-mockery';

function getRooms(): RoomData[] {
	return [
		Mock.of<RoomData>({
			stage: {
				entities: [
					Mock.of<NewEditorEntity>({
						type: 'WoodDoor',
						settings: { destination: { room: 1 } },
					}),
				],
				matrix: [],
			},
		}),
		Mock.of<RoomData>({
			stage: {
				entities: [
					Mock.of<NewEditorEntity>({
						type: 'TexturedDoor',
						settings: { destination: { room: 0 } },
					}),
				],
				matrix: [],
			},
		}),
		Mock.of<RoomData>({
			stage: {
				entities: [
					Mock.of<NewEditorEntity>({
						type: 'MusicBlockWarp',
						settings: { destination: { room: 0 } },
					}),
				],
				matrix: [],
			},
		}),
	];
}

describe('moveRoomToFront', function () {
	it('should not do anything if the target room is zero', function () {
		const rooms = getRooms();
		const newRooms = moveRoomToFront(rooms, 0);

		expect(newRooms).toBe(rooms);
	});

	it('should not do anything if the target room does not exist', function () {
		const rooms = getRooms();
		const newRooms = moveRoomToFront(rooms, 3);

		expect(newRooms).toBe(rooms);
	});

	it('should move the target room to the front', function () {
		const rooms = getRooms();
		const newRooms = moveRoomToFront(rooms, 1);

		expect(newRooms[0].stage.entities[0].type).toBe('TexturedDoor');
		expect(newRooms[1].stage.entities[0].type).toBe('WoodDoor');
		expect(newRooms[2].stage.entities[0].type).toBe('MusicBlockWarp');
	});

	it('should patch up destination rooms', function () {
		const rooms = getRooms();
		const newRooms = moveRoomToFront(rooms, 1);

		expect(newRooms[0].stage.entities[0].settings?.destination.room).toBe(1);
		expect(newRooms[1].stage.entities[0].settings?.destination.room).toBe(0);
		expect(newRooms[2].stage.entities[0].settings?.destination.room).toBe(1);
	});
});
