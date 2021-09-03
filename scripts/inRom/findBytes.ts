import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';

function isBytes(
	data: Uint8Array,
	offset: number,
	spriteBytes: number[]
): boolean {
	return spriteBytes.every((sb, i) => data[offset + i] === sb);
}

function main() {
	const romPath = process.argv[2];
	const byteString = process.argv[3];

	if (!romPath || !byteString) {
		console.error('usage: node findBytes <path-to-rom> <byte-string>');
		process.exit(1);
	}

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);
	const bytes = byteString.split(' ').map((bs) => parseInt(bs, 16));

	for (let i = 0; i < romData.length; ++i) {
		if (isBytes(romData, i, bytes)) {
			const slice = romData.slice(i, i + 4);
			const bytes = Array.from(slice)
				.map((b) => b.toString(16))
				.join(',');

			console.log('match at', i.toString(16), bytes);
		}
	}
}

main();
