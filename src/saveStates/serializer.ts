// https://gist.github.com/jonathanlurie/04fa6343e64f750d03072ac92584b5df

const FLAG_TYPED_ARRAY = 'FLAG_TYPED_ARRAY';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serialize(data: any): string {
	return JSON.stringify(data, function (key, value) {
		if (
			value instanceof ArrayBuffer ||
			value instanceof Int8Array ||
			value instanceof Uint8Array ||
			value instanceof Uint8ClampedArray ||
			value instanceof Int16Array ||
			value instanceof Uint16Array ||
			value instanceof Int32Array ||
			value instanceof Uint32Array ||
			value instanceof Float32Array ||
			value instanceof Float64Array
		) {
			const replacement = {
				constructor: value.constructor.name,
				data: Array.from(
					value instanceof ArrayBuffer ? new Uint8Array(value) : value
				),
				flag: FLAG_TYPED_ARRAY,
			};
			return replacement;
		}
		return value;
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deserialize(str: string): any {
	return JSON.parse(str, function (key, value) {
		if (
			value &&
			typeof value === 'object' &&
			'flag' in value &&
			value.flag === FLAG_TYPED_ARRAY
		) {
			try {
				if (value.constructor === 'ArrayBuffer') {
					return new Uint8Array(value.data).buffer;
				} else {
					return new window[value.constructor as keyof Window](value.data);
				}
			} catch (e) {
				console.error('deserialize, conversion of typed array failed', e);
			}
		}

		return value;
	});
}

export { serialize, deserialize };
