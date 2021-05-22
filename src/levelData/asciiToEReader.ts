const ACode = 'A'.charCodeAt(0);
const ZCode = 'Z'.charCodeAt(0);
const aCode = 'a'.charCodeAt(0);
const zCode = 'z'.charCodeAt(0);
const zeroCode = '0'.charCodeAt(0);
const nineCode = '9'.charCodeAt(0);

function asciiToEReader(str: string): number[] {
	return str.split('').map((c) => {
		if (c === ' ') {
			return 0xe3;
		}

		if (c === '-') {
			return 0xe2;
		}

		const code = c.charCodeAt(0);

		if (code >= ACode && code <= ZCode) {
			return code - ACode;
		}

		if (code >= aCode && code <= zCode) {
			return code - aCode + 0x20;
		}

		if (code >= zeroCode && code <= nineCode) {
			return code - zeroCode + 0x76;
		}
	}) as number[];
}

export { asciiToEReader };
