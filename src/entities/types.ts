import { LevelObject } from '../levelData/parseObjectsFromLevelFile';
import { StaticResource } from '../resources/types';

type Entity = StaticResource & {
	editorType: 'entity' | 'tile' | 'transport';
	gameType: 'sprite' | 'object' | 'transport';
	dimensions: 'none' | 'x' | 'y' | 'xy';
	// TODO: I think group settings is coming, but if not, switch to boolean
	settingsType?: 'single';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaultSettings?: Record<string, any>;
	toBinary: (
		x: number,
		y: number,
		w: number,
		h: number,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		settings: Record<string, any>
	) => number[];

	// only need to implement this if parsing is different from the basic
	// parsing provided in parseObjectsFromLevelFile
	parseBinary?: (bytes: number[]) => LevelObject;
};

export type { Entity };
