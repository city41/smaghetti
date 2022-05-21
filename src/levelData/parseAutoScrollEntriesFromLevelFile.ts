import { ROOM_AUTOSCROLL_POINTERS } from './constants';

type LevelAutoScrollEntry = {
	toX: number;
	toY: number;
	speed: number;
};

function parseAutoScrollEntries(
	data: Uint8Array,
	startIndex: number
): LevelAutoScrollEntry[] {
	const entries: LevelAutoScrollEntry[] = [];

	while (startIndex < data.byteLength && data[startIndex] !== 0xff) {
		const toX = data[startIndex];
		const toY = data[startIndex + 1];
		const speed = data[startIndex + 2];

		entries.push({ toX, toY, speed });
		startIndex += 3;
	}

	return entries;
}

function parseAutoScrollEntriesFromLevelFile(
	levelData: Uint8Array,
	roomIndex: 0 | 1 | 2 | 3 = 0
): LevelAutoScrollEntry[] {
	const view = new DataView(levelData.buffer);

	const pointer = ROOM_AUTOSCROLL_POINTERS[roomIndex];
	let autoScrollIndex = view.getUint16(pointer, true);

	return parseAutoScrollEntries(levelData, autoScrollIndex);
}

export { parseAutoScrollEntriesFromLevelFile, parseAutoScrollEntries };
export type { LevelAutoScrollEntry };
