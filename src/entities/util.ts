export function getBankParam1(bank: 0 | 1, length: number): number {
	return (bank << 6) | length;
}

export function simpleSpriteBinary(
	x: number,
	y: number,
	objectId: number
): [number, number, number, number] {
	return [0, objectId, x, y];
}
