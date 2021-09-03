import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';

function isTransport(data: Uint8Array, offset: number): boolean {
	const SOURCE_Y = 7;
	const SOURCE_X = 141;

	if (
		Math.abs(SOURCE_Y - data[offset]) < 2 &&
		Math.abs(SOURCE_X - data[offset + 1]) < 2
	) {
		const destRoom = data[offset + 2];

		return destRoom >= 0 && destRoom < 4;
	}

	return false;
}

// const OBJECT_START = 0x1408d6;
// const SPRITE_START = 0x157811;

function main() {
	const romPath = process.argv[2];

	if (!romPath) {
		console.error('usage: node find1_1Transport <path-to-rom>');
		process.exit(1);
	}

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);

	for (let i = 0; i < romData.length; ++i) {
		if (isTransport(romData, i)) {
			const slice = romData.slice(i, i + 10);
			const bytes = Array.from(slice)
				.map((b) => b.toString(16))
				.join(',');

			console.log('possible transport at', i.toString(16), bytes);
		}
	}
}

main();
