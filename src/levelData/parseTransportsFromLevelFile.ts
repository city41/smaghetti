import { ROOM_TRANSPORT_POINTERS } from '../levelData/constants';

type LevelTransport = {
	sx: number;
	sy: number;
	destRoom: number;
	dx: number;
	dy: number;
	cx: number;
	cy: number;
	exitType: number;
	rawBytes: number[];
};

function parseTransport(
	levelData: Uint8Array | number[],
	transportIndex: number
): LevelTransport {
	return {
		sy: levelData[transportIndex + 0],
		sx: levelData[transportIndex + 1],
		destRoom: levelData[transportIndex + 2],
		dy: levelData[transportIndex + 4],
		dx: levelData[transportIndex + 5],
		cx: levelData[transportIndex + 6],
		cy: levelData[transportIndex + 7],
		exitType: levelData[transportIndex + 9],
		rawBytes: Array.from(levelData.slice(transportIndex, transportIndex + 10)),
	};
}

function parseTransportsFromLevelFile(
	levelData: Uint8Array,
	roomIndex: 0 | 1 | 2 | 3 = 0
): LevelTransport[] {
	const view = new DataView(levelData.buffer);

	const pointer = ROOM_TRANSPORT_POINTERS[roomIndex];
	const transportIndex = view.getUint16(pointer, true);

	if (transportIndex >= levelData.length - 1) {
		return [];
	}

	const numTransports = view.getUint16(transportIndex, true);

	const transports: LevelTransport[] = [];

	for (let i = 0; i < numTransports; ++i) {
		const transport = parseTransport(levelData, transportIndex + 2 + i * 10);
		transports.push(transport);
	}

	return transports;
}
export { parseTransportsFromLevelFile, parseTransport };
export type { LevelTransport };
