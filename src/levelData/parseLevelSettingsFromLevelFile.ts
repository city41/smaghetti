import { ROOM_LEVELSETTING_POINTERS } from './constants';

function parseLevelSettings(data: Uint8Array | number[], offset: number) {
	const view = new DataView(new Uint8Array(data).buffer);

	return {
		screenYBoundary: view.getUint16(offset, true),
		fixedScreenCenterY: view.getInt16(offset + 2, true),
		playerScreenCenterY: view.getInt16(offset + 4, true),
		cameraMin: data[offset + 6],
		cameraMax: data[offset + 7],
		playerYStart: data[offset + 8],
		playerXStart: data[offset + 9],
		screenYStart: data[offset + 10],
		screenXStart: data[offset + 11],
		objectSet: view.getUint16(offset + 12, true),
		music: view.getUint16(offset + 14, true),
	};
}
function parseLevelSettingsFromLevelFile(
	data: Uint8Array,
	roomIndex: 0 | 1 | 2 | 3 = 0
) {
	const view = new DataView(data.buffer);

	const address = view.getUint16(ROOM_LEVELSETTING_POINTERS[roomIndex], true);

	if (address >= data.length - 1) {
		return null;
	}

	return parseLevelSettings(data, address);
}

type ParsedLevelSettings = ReturnType<typeof parseLevelSettings>;

export { parseLevelSettingsFromLevelFile, parseLevelSettings };
export type { ParsedLevelSettings };
