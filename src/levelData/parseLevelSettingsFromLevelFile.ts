import { ROOM_LEVELSETTING_POINTERS } from './constants';

function parseLevelSettingsFromLevelFile(
	data: Uint8Array,
	roomIndex: 0 | 1 | 2 | 3 = 0
) {
	const view = new DataView(data.buffer);

	const address = view.getUint16(ROOM_LEVELSETTING_POINTERS[roomIndex], true);

	if (address >= data.length - 1) {
		return null;
	}

	return {
		screenYBoundary: view.getUint16(address, true),
		fixedScreenCenterY: view.getInt16(address + 2, true),
		playerScreenCenterY: view.getInt16(address + 4, true),
		cameraMin: data[address + 6],
		cameraMax: data[address + 7],
		playerYStart: data[address + 8],
		playerXStart: data[address + 9],
		screenYStart: data[address + 10],
		screenXStart: data[address + 11],
		objectSet: view.getUint16(address + 12, true),
		music: view.getUint16(address + 14, true),
	};
}

type LevelSettings = ReturnType<typeof parseLevelSettingsFromLevelFile>;

export { parseLevelSettingsFromLevelFile };
export type { LevelSettings };
