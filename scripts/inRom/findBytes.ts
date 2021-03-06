import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';

function isBytes(
	data: Uint8Array,
	offset: number,
	spriteBytes: Array<[number, number]>
): boolean {
	return spriteBytes.every((sb, i) => {
		const val = data[offset + i];

		return sb[0] <= val && sb[1] >= val;
	});
}

function main() {
	const romPath = process.argv[2];
	const byteString = process.argv[3];

	if (!romPath || !byteString) {
		console.error(
			`usage: ${path.basename(process.argv[0])} ${path.basename(
				process.argv[1]
			)} <path-to-rom> <byte-string>`
		);
		process.exit(1);
	}

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);
	const bytes: Array<[number, number]> = byteString.split(' ').map((bs) => {
		if (bs === '?') {
			return [0, 256];
		} else if (bs.includes('-')) {
			const splits = bs.split('-');
			return [parseInt(splits[0], 16), parseInt(splits[1], 16)];
		} else {
			return [parseInt(bs, 16), parseInt(bs, 16)];
		}
	});

	for (let i = 0; i < romData.length; ++i) {
		if (isBytes(romData, i, bytes)) {
			const slice = romData.slice(i, i + bytes.length);
			const foundBytes = Array.from(slice)
				.map((b) => b.toString(16))
				.join(',');

			console.log('match at', i.toString(16), foundBytes);
		}
	}
}

main();
