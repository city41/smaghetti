import { LevelObject } from '../levelData/parseObjectsFromLevelFile';
import { StaticResource } from '../resources/types';
import { EntityType } from './entityMap';

type Entity = StaticResource & {
	editorType: 'entity' | 'tile' | 'transport';
	gameType: 'sprite' | 'object' | 'transport';
	dimensions: 'none' | 'x' | 'y' | 'xy';
	/**
	 * For entities that have parameters, mostly objects, this metadata
	 * indicates what the parameters are for. Mostly used by HexTree.
	 */
	param1?: 'height' | 'width' | 'other';
	param2?: 'height' | 'width' | 'other';
	/**
	 * If an entity has a single objectId or a "base" objectId
	 * (for example, a payloadable object in its empty state)
	 * it should be put here. Mostly used by HexTree.
	 */
	objectId?: number;
	/**
	 * If an entity has payloads, the payloads should be described here.
	 * Mostly used by HexTree
	 */
	payloadToObjectId?: Record<EntityType, number>;
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
