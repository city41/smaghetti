import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';

const SPRITES_1_1_OFFSET = 0x157811;

function main() {
	const romPath = process.argv[2];

	if (!romPath) {
		console.error('usage: node find1_1Pointers <path-to-rom>');
		process.exit(1);
	}

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);
	const view = new DataView(romData.buffer);

	let offset = SPRITES_1_1_OFFSET - 1;

	let candidatePointer = 0;

	while (offset > 0) {
		const data = view.getUint16(offset, true);

		// since the offset is larger than 16 bytes, going on the hope
		// the pointer is using a relative pointer
		if (data + offset === SPRITES_1_1_OFFSET) {
			candidatePointer = offset;
			console.log(
				'possible pointer is at',
				offset.toString(16),
				'value:',
				data
			);
		}

		offset -= 1;
	}

	const possibleObjectPointer = candidatePointer - 6;
	const possibleObjectPointerValue = view.getUint16(
		possibleObjectPointer,
		true
	);

	console.log(
		'at',
		possibleObjectPointer.toString(16),
		'value is:',
		possibleObjectPointerValue
	);
}

main();
