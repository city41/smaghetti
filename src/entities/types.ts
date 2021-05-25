import { ReactElement, ReactNode } from 'react';
import { Resource } from '../resources/types';
import { EntityType } from './entityMap';
import { ResourceType } from '../resources/resourceMap';
import { RoomState } from '../components/make/editorSlice';

type SpriteGraphicSet = number | number[];
type SpriteGraphicSets = [
	SpriteGraphicSet,
	SpriteGraphicSet,
	SpriteGraphicSet,
	SpriteGraphicSet,
	SpriteGraphicSet,
	SpriteGraphicSet
];

type Entity = {
	/**
	 * which object set/object graphic set pairs are this entity compatible with?
	 * [-1] means all object sets (ie question block)
	 *
	 * The objectSet and objectGraphicSet are packed into the same number, see
	 * util/encodeObjectSet
	 *
	 * This is because intersectionWith() is significantly slower than intersection(),
	 * to the point the editor chugged every time an entity was drawn or erased
	 */
	objectSets: Array<number>;

	/**
	 * which sprite graphic set values does this entity need? If not specified,
	 * it doesn't care (mushroom, objects) otherwise it will specify the value(s)
	 * at the indices it needs. for example [0, 0, 0, 2, 0, 0] means it only cares
	 * about index 3, and it must be set to 2. [0, 0, 0, [1, 2], 0, 0] means it
	 * only cares about index 3, and it can be 1 or 2
	 */
	spriteGraphicSets: SpriteGraphicSets;

	layer: 'actor' | 'stage';
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
		| 'decoration'
		| 'unfinished';
	paletteInfo: {
		title: string;
		description?: ReactNode;
		warning?: ReactNode;
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
	objectId: number;
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

	simpleRender: (size: number) => ReactElement;

	render: (
		showDetails: boolean,
		settings: EditorEntitySettings,
		onSettingsChange: (newSettings: EditorEntitySettings) => void,
		entity?: EditorEntity,
		room?: RoomState
	) => ReactElement | null;
};

export type { Entity, SpriteGraphicSet, SpriteGraphicSets };
