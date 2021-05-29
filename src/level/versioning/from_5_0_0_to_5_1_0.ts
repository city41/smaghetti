// this is just the old LocalstorageDate type from editorSlice
// except with a hardcoded version
import { Versioned } from './convertLevelToLatestVersion';

type Version_5_0_0_Local = {
	version: '5.0.0';
	metadata: {
		name: string;
	};
	levelData: SerializedLevelData;
};

type Version_5_0_0_Server = {
	version: '5.0.0';
	name: string;
	data: SerializedLevelData;
	created_at: string;
	id: string;
};

type Version_5_1_0 = {
	version: '5.1.0';
	name: string;
	settings: LevelSettings;
	created_at: string;
	data: SerializedLevelData;
	id: string;
};

function isLocal(level: Versioned): level is Version_5_0_0_Local {
	return 'levelData' in level;
}

function isServer(level: Versioned): level is Version_5_0_0_Server {
	return 'data' in level && 'id' in level && 'version' in level;
}

export function from_5_0_0_to_5_1_0(level: Versioned): Version_5_1_0 | null {
	if (level.version !== '5.0.0') {
		return null;
	}

	if (isLocal(level)) {
		return {
			version: '5.1.0',
			name: level.metadata.name,
			settings: {
				timer: 900,
			},
			data: level.levelData,
			created_at: '',
			id: '',
		};
	} else if (isServer(level)) {
		return {
			version: '5.1.0',
			name: level.name,
			settings: {
				timer: 900,
			},
			data: level.data,
			created_at: level.created_at,
			id: level.id,
		};
	} else {
		return null;
	}
}

export type { Version_5_1_0 };
