import { from_5_0_0_to_5_1_0 } from './from_5_0_0_to_5_1_0';
import { from_5_1_0_to_5_1_1 } from './from_5_1_0_to_5_1_1';
import { from_5_1_1_to_5_2_0 } from './from_5_1_1_to_5_2_0';

type Versioned = { version: string };
type Converter = {
	from: string;
	to: string;
	fn: (level: Versioned) => Versioned | null;
};

// 5.0.0 - first version with actor/stage
// 5.1.0 - first consolidated server/local version, adds settings.timer
// 5.1.1 - duh, settings has to be down under data to save on the server...
// 5.2.0 - PoolOfWater, ChoppyWater, Lava and Waterfall all stopped being cell entities

const converters: Converter[] = [
	{ from: '5.0.0', to: '5.1.0', fn: from_5_0_0_to_5_1_0 },
	{ from: '5.1.0', to: '5.1.1', fn: from_5_1_0_to_5_1_1 },
	{ from: '5.1.1', to: '5.2.0', fn: from_5_1_1_to_5_2_0 },
];

const CURRENT_VERSION = converters[converters.length - 1].to;

function convertLevelToLatestVersion(level: unknown): SerializedLevel | null {
	if (
		!level ||
		(typeof level === 'object' && level !== null && !('version' in level))
	) {
		// this is either something totally unknown, or an ancient level before
		// versioning existed. Either way, nothing can be done
		return null;
	}

	let versionedLevel = level as Versioned;
	const version = versionedLevel.version;

	if (version === CURRENT_VERSION) {
		return level as SerializedLevel;
	}

	let converter = converters.find((c) => c.from === version);

	while (converter) {
		const conversionResult = converter.fn(versionedLevel);

		if (conversionResult === null) {
			return null;
		} else {
			versionedLevel = conversionResult;
		}

		converter = converters.find((c) => c.from === versionedLevel.version);
	}

	if (versionedLevel.version === converters[converters.length - 1].to) {
		return versionedLevel as SerializedLevel;
	} else {
		// hmm, somehow didn't arrive at the latest version,
		// unfortunately need to just bail
		return null;
	}
}

export { convertLevelToLatestVersion, CURRENT_VERSION };
export type { Versioned };
