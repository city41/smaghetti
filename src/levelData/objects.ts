type ParsedObject = {
	id: number;
	bank: 0 | 1;
	width: number;
	height: number;
	x: number;
	y: number;
};

function getObjectCount(data: Uint8Array, startAddr: number): number {
	let count = 0;

	while (startAddr < data.length && data[startAddr] != 0xff) {
		count += 1;
		startAddr += 5;
	}

	return count;
}

function parseObject(data: Uint8Array, addr: number): ParsedObject {
	return {
		bank: ((data[addr] >> 6) & 0x3) as 0 | 1,
		width: (data[addr] & 0x3f) + 1,
		height: data[addr + 4] + 1,
		x: data[addr + 2],
		y: data[addr + 1],
		id: data[addr + 3],
	};
}

export { parseObject, getObjectCount };
