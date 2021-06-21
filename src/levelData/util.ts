import { MAX_NAME_SIZE } from './typesAndConstants';
import { asciiToEReader } from './asciiToEReader';

export function getLevelDataAddress(dataID: number): number {
	const isEven = dataID % 2 === 0;
	const offset = isEven ? 1 : 0;
	if (dataID < 20) {
		return 0x6000 + offset * 0x10 + dataID * 0x800;
	} else if (dataID < 32) {
		return 0x16000 + offset * 0x10 + (dataID - 20) * 0x800;
	}
	return 0x800;
}

export function convertCharacterToASCII(c: number): string {
	// Null
	if (c == 0xff) {
		return '';
	}

	// A-Z
	if (c <= 0x19) {
		return String.fromCharCode(0x41 + c);
	}

	// a-z
	if (c >= 0x20 && c <= 0x39) {
		return String.fromCharCode(0x61 + (c - 0x20));
	}

	// 0-9
	if (c >= 0x76 && c <= 0x7f) {
		return String.fromCharCode(0x30 + (c - 0x76));
	}

	if (c == 0x1c) return "'"; // '
	if (c == 0x1d) return ','; // ,
	if (c == 0x1e) return '.'; // .
	if (c == 0xe0) return '?'; // ?
	if (c == 0xe1) return '!'; // !
	if (c == 0xe2) return '-'; // -

	return ' ';
}

const asciiToNumberMap: Record<string, number> = {
	"'": 0x1c,
	',': 0x1d,
	'.': 0x1e,
	'?': 0xe0,
	'!': 0xe1,
	'-': 0xe2,
	' ': 0xe3,
};

function convertASCIIToNumber(c: string): number {
	const converted = asciiToNumberMap[c];

	if (typeof converted === 'number') {
		return converted;
	}

	const charCode = c.charCodeAt(0);

	// A-Z
	if (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) {
		// A is zero
		return charCode - 'A'.charCodeAt(0);
	}

	// a-z
	if (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) {
		// a is 0x20
		return charCode - ('a'.charCodeAt(0) - 0x20);
	}

	// 0-9
	if (charCode >= '0'.charCodeAt(0) && charCode <= '9'.charCodeAt(0)) {
		// 0 is 0x76
		return charCode - ('0'.charCodeAt(0) - 0x76);
	}

	// TODO: the rest of the characters

	// unknown character? show a question mark, which should clue the user
	// the character they chose is currently unsupported
	return asciiToNumberMap['?'];
}

export function convertLevelNameToASCII(levelName: Uint8Array): string {
	return levelName.reduce<string>((building, letter) => {
		return building + convertCharacterToASCII(letter);
	}, '');
}

export function convertASCIIToLevelName(ascii: string): number[] {
	return ascii
		.substr(0, 21)
		.split('')
		.map((c) => {
			return convertASCIIToNumber(c);
		});
}

export function extractName(
	inputData: Uint8Array,
	eCoinID: number
): Uint8Array {
	const nameStart = eCoinID === 0 ? 0x40 : 0x180;
	let name: number[] = [];

	for (let i = 0; i < MAX_NAME_SIZE; ++i) {
		name.push(inputData[nameStart + i]);

		if (name[name.length - 1] === 0xff) {
			break;
		}
	}

	// ended up with no name, inject a generic one
	if (name.length === 0 || (name.length === 1 && name[0] === 0xff)) {
		name = asciiToEReader('unnamed level').concat(0xff);
	}

	return Uint8Array.from(name);
}

export function flattenCells(matrix: EditorEntityMatrix): EditorEntity[] {
	return matrix.reduce<EditorEntity[]>((building, row) => {
		if (!row) {
			return building;
		}
		const rowTiles = row.reduce<EditorEntity[]>((buildingRow, tile) => {
			if (!tile) {
				return buildingRow;
			}

			return buildingRow.concat(tile);
		}, []);

		return building.concat(rowTiles);
	}, []);
}
