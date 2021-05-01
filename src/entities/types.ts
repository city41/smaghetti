import { ReactElement, ReactNode } from 'react';
import { Resource } from '../resources/types';
import { EntityType } from './entityMap';
import { ResourceType } from '../resources/resourceMap';

type Entity = {
	/**
	 * which object sets are this entity compatible with?
	 * not specified means all object sets (ie question block)
	 */
	objectSets?: number[];
	/**
	 * which graphic sets are this entity compatible with?
	 * not specified means all graphic sets (ie goomba)
	 */
	graphicSets?: number[];
	editorType: 'entity' | 'cell';
	/**
	 * When placing this entity in the palette choice modal, which category should it go under.
	 * If this is absent, the entity will be placed in "unfinished"
	 */
	paletteCategory?:
		| 'enemy'
		| 'terrain'
		| 'object'
		| 'gizmo'
		| 'power-up'
		| 'boss'
		| 'transport'
		| 'unfinished';
	paletteInfo: {
		title: string;
		description?: ReactNode;
	};

	dimensions: 'none' | 'x' | 'y' | 'xy';

	width?: number;
	height?: number;
	/**
	 * For entities that have parameters, mostly objects, this metadata
	 * indicates what the parameters are for. Mostly used by HexTree.
	 */
	param1?: 'height' | 'width' | 'other';
	param2?: 'height' | 'width' | 'other';
	emptyBank?: number;
	payloadBank?: number;
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
	payloadToObjectId?: Partial<Record<EntityType | ResourceType, number>>;
	// TODO: I think group settings is coming, but if not, switch to boolean
	settingsType?: 'single';
	defaultSettings?: EditorEntitySettings;
	resource?: Resource;

	toObjectBinary?: (
		x: number,
		y: number,
		w: number,
		h: number,
		settings: EditorEntitySettings
	) => number[];

	toSpriteBinary?: (
		x: number,
		y: number,
		w: number,
		h: number,
		settings: EditorEntitySettings
	) => number[];

	getTransports?: (
		room: number,
		x: number,
		y: number,
		settings: EditorEntitySettings
	) => EditorTransport[];

	simpleRender: (maxWidth: number, maxHeight: number) => ReactElement;

	render: (
		showDetails: boolean,
		settings: EditorEntitySettings,
		onSettingsChange: (newSettings: EditorEntitySettings) => void,
		entity?: EditorEntity,
		matrix?: EditorEntityMatrix
	) => ReactElement | null;
};

export type { Entity };
