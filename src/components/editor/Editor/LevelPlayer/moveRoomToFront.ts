function fixTransportsForEntities(
	entities: EditorEntity[],
	movedRoomIndex: number
): EditorEntity[] {
	return entities.map((e) => {
		if (!e.settings || !e.settings.destination) {
			return e;
		} else {
			let newRoomIndex;

			if (e.settings.destination.room === movedRoomIndex) {
				newRoomIndex = 0;
			} else if (e.settings.destination.room < movedRoomIndex) {
				newRoomIndex = e.settings.destination.room + 1;
			} else {
				newRoomIndex = e.settings.destination.room;
			}

			return {
				...e,
				settings: {
					...e.settings,
					destination: {
						...e.settings.destination,
						room: newRoomIndex,
					},
				},
			};
		}
	});
}

function moveRoomToFront(rooms: RoomData[], targetIndex: number): RoomData[] {
	if (targetIndex === 0) {
		return rooms;
	}

	const targetRoom = rooms[targetIndex];

	if (!targetRoom) {
		return rooms;
	}

	const newRooms = [targetRoom, ...rooms.filter((r) => r !== targetRoom)];

	return newRooms.map((r) => {
		return {
			...r,
			stage: {
				...r.stage,
				entities: fixTransportsForEntities(r.stage.entities, targetIndex),
			},
		};
	});
}

export { moveRoomToFront };
