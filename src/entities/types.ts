import { ReactElement, ReactNode } from 'react';
import { Resource } from '../resources/types';
import { EntityType } from './entityMap';
import { ResourceType } from '../resources/resourceMap';

type SpriteGraphicSet = number | number[];
type SpriteGraphicSets = [
	SpriteGraphicSet,
	SpriteGraphicSet,
	SpriteGraphicSet,
	SpriteGraphicSet,
	SpriteGraphicSet,
	SpriteGraphicSet
];

type PaletteCategory =
	| 'enemy'
	| 'terrain'
	| 'object'
	| 'gizmo'
	| 'power-up'
	| 'transport'
	| 'decoration'
	| 'meta'
	| 'unfinished';

type PaletteSubcategory =
	| 'terrain-basic'
	| 'terrain-water'
	| 'terrain-sky'
	| 'terrain-damaging'
	| 'terrain-statues'
	| 'terrain-winter'
	| 'terrain-large'
	| 'enemy-common'
	| 'enemy-piranha'
	| 'enemy-fortress'
	| 'enemy-desert'
	| 'enemy-water'
	| 'enemy-winter'
	| 'enemy-bro'
	| 'enemy-giant'
	| 'enemy-generator'
	| 'enemy-boss';

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

	/**
	 * Entities that rotate (beach ball, arrow lift, etc) need to load a specific rotation graphic set.
	 * This is where they specify it, and compatibility will check to make sure all entities
	 * in a room either don't care or want the same value
	 */
	rotationGraphicSet?: number;

	/**
	 * The koopaling bosses are not compatible with each other, even when it seems like they should be.
	 * For example, Larry and Morton seem fully compatible, but if you add both to a level, you will
	 * either get two Larrys or two Mortons, depending on which gets loaded first. So to help not disappoint
	 * users, this id forces koopalings to not be compatible with each other
	 */
	koopalingId?: number;

	layer: 'actor' | 'stage';
	editorType: 'entity' | 'cell';
	/**
	 * When placing this entity in the palette choice modal, which category should it go under.
	 * If this is absent, the entity will be placed in "unfinished"
	 */
	paletteCategory?: PaletteCategory;

	paletteInfo: {
		title: string;
		description?: ReactNode;
		warning?: ReactNode;
		subCategory?: PaletteSubcategory;
	};

	dimensions: 'none' | 'x' | 'y' | 'xy';

	width?: number;
	height?: number;
	/**
	 * For entities that have parameters, mostly objects, this metadata
	 * indicates what the parameters are for. Mostly used by HexTree.
	 */
	param1?: 'height' | 'width' | 'other' | 'ignored';
	param2?: 'height' | 'width' | 'other' | 'ignored';
	emptyBank?: number;
	payloadBank?: number;
	/**
	 * If an entity has a single objectId or a "base" objectId
	 * (for example, a payloadable object in its empty state)
	 * it should be put here. Mostly used by HexTree.
	 */
	objectId: number;

	/**
	 * If an entity has alternate ids, like OneWayDoor has different
	 * ids depending on if it is vertical or horizontal, they can
	 * be placed here. This helps hex-tree figure out entities
	 */
	alternateObjectIds?: number[];

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
		settings: EditorEntitySettings,
		entity?: EditorEntity,
		room?: RoomData
	) => number[];

	toSpriteBinary?: (
		x: number,
		y: number,
		w: number,
		h: number,
		settings: EditorEntitySettings,
		entity?: EditorEntity,
		room?: RoomData
	) => number[];

	getTransports?: (
		room: number,
		rooms: RoomData[],
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
		room?: RoomData,
		allRooms?: RoomData[]
	) => ReactElement | null;

	/**
	 * Entities can implement this to emit warnings.
	 * If they have a warning, they will get rendered with a warning
	 * icon and a red border, clicking the icon shows the warning.
	 */
	getWarning?: (
		settings: EditorEntitySettings,
		entity: EditorEntity,
		room: RoomData,
		allRooms: RoomData[]
	) => string | null | void;
};

export type {
	Entity,
	SpriteGraphicSet,
	SpriteGraphicSets,
	PaletteCategory,
	PaletteSubcategory,
};
