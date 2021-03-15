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
};

function convertASCIIToNumber(c: string): number {
	const converted = asciiToNumberMap[c];

	if (typeof converted === 'number') {
		return converted;
	}

	const charCode = c.charCodeAt(0);

	// A-Z
	if (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) {
		return charCode - 0x41;
	}

	// TODO: the rest of the characters

	return 0xff;
}

export function convertLevelNameToASCII(levelName: Uint8Array): string {
	return levelName.reduce<string>((building, letter) => {
		return building + convertCharacterToASCII(letter);
	}, '');
}

export function convertASCIIToLevelName(ascii: string): number[] {
	return ascii.split('').map((c) => {
		return convertASCIIToNumber(c);
	});
}
