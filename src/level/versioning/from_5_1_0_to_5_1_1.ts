import { Versioned } from './convertLevelToLatestVersion';
import { Version_5_1_0 } from './from_5_0_0_to_5_1_0';

type Version_5_1_1 = SerializedLevel;

function is510(level: Versioned): level is Version_5_1_0 {
	return level.version === '5.1.0';
}

// this is needed since server levels won't have any settings
// due to the mistake in 5.1.0
const DEFAULT_SETTINGS: LevelSettings = {
	timer: 900,
};

export function from_5_1_0_to_5_1_1(level: Versioned): Version_5_1_1 | null {
	if (is510(level)) {
		return {
			version: '5.1.1',
			id: level.id,
			name: level.name,
			created_at: level.created_at,
			updated_at: level.updated_at ?? '',
			data: {
				settings: level.settings ?? DEFAULT_SETTINGS,
				rooms: level.data.rooms,
			},
		};
	} else {
		return null;
	}
}
