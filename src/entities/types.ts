import { ReactElement, ReactNode } from 'react';
import { Resource } from '../resources/types';
import { EntityType } from './entityMap';
import { ResourceType } from '../resources/resourceMap';

type toObjectBinaryProps = {
	x: number;
	y: number;
	w: number;
	h: number;
	settings: EditorEntitySettings;
	entity?: EditorEntity;
	room?: RoomData;
};

type toSpriteBinaryProps = {
	x: number;
	y: number;
	w: number;
	h: number;
	settings: EditorEntitySettings;
	entity?: EditorEntity;
	room?: RoomData;
};

type getTransportProps = {
	room: number;
	allRooms: RoomData[];
	x: number;
	y: number;
	settings: EditorEntitySettings;
};

type renderProps = {
	showDetails: boolean;
	settings: EditorEntitySettings;
	onSettingsChange: (newSettings: EditorEntitySettings) => void;
	entity?: EditorEntity;
	room?: RoomData;
	allRooms?: RoomData[];
};

type getProblemProps = {
	settings: EditorEntitySettings | undefined;
	entity: EditorEntity;
	room: RoomData;
	allRooms: RoomData[];
};

type EntityProblem = {
	severity: 'warning' | 'error';
	message: string;
	tipId?: string;
};

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
	| 'unfinished'
	| 'hextree';

type PaletteSubcategory =
	| 'terrain-basic'
	| 'terrain-water'
	| 'terrain-sky'
	| 'terrain-damaging'
	| 'terrain-winter'
	| 'terrain-large'
	| 'terrain-checkered'
	| 'terrain-bowsers-army'
	| 'terrain-giant'
	| 'terrain-desert'
	| 'enemy-common'
	| 'enemy-piranha'
	| 'enemy-fortress'
	| 'enemy-airship'
	| 'enemy-desert'
	| 'enemy-water'
	| 'enemy-winter'
	| 'enemy-bro'
	| 'enemy-giant'
	| 'enemy-generator'
	| 'enemy-boss'
	| 'gizmo-platform';

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
	objectPriority?: number;

	/**
	 * which sprite graphic set values does this entity need? If not specified,
	 * it doesn't care (mushroom, objects) otherwise it will specify the value(s)
	 * at the indices it needs. for example [-1, -1, -1, 2, -1, -1] means it only cares
	 * about index 3, and it must be set to 2. [-1, -1, -1, [1, 2], -1, -1] means it
	 * only cares about index 3, and it can be 1 or 2. Note that 0 is a valid graphic set value, so
	 * if an entity declares zero, it means that slot must be zero.
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
	editorType: 'entity' | 'cell' | 'double-cell';

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
		helpId?: string;
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

	defaultSettings?: EditorEntitySettings;

	/**
	 * a single graphic to extract and be usable for rendering the entity
	 */
	resource?: Resource;

	/**
	 * A map of multiple resources to extract, useful for more complex
	 * entities that need multiple graphics to render
	 */
	resources?: Record<string, Resource>;

	toObjectBinary?: (arg: toObjectBinaryProps) => number[];
	toSpriteBinary?: (arg: toSpriteBinaryProps) => number[];
	getTransports?: (args: getTransportProps) => EditorTransport[];
	simpleRender: (size: number) => ReactElement;
	render: (arg: renderProps) => ReactElement | null;
	getECoinData?: (entity: EditorEntity) => number[] | undefined;

	/**
	 * Used to take SMA4 object bytes as found in a level
	 * and parse out Smaghetti entities from it.
	 *
	 * NOTE: the return result is using the assumption that the Entity
	 * being called parse() on is compatible with the room's object set
	 * and object graphic set. That is the responsibility of the caller
	 *
	 * @param data Uint8Array the stream of binary SMA4 data that is being parsed
	 * @param offset number the current offset into the stream
	 * @return void if this entity can't parse at the current offset, or
	 * any entities it can parse out plus the new offset pushed out by
	 * how many bytes this parsing consumed. Multiple entities can be returned
	 * mostly to support objects, such as a single SMA4 Brick object likely
	 * maps to many Smaghetti bricks
	 */
	parseObject?: (
		data: Uint8Array,
		offset: number
	) => void | { entities: NewEditorEntity[]; offset: number };

	/**
	 * Just like parseObject but for sprites. A difference is sprites
	 * can only ever return one entity, so no array here
	 */
	parseSprite?: (
		data: Uint8Array,
		offset: number
	) => void | { entity: NewEditorEntity; offset: number };

	/**
	 * Entities can implement this to emit warnings.
	 * If they have a warning, they will get rendered with a warning
	 * icon and a red border, clicking the icon shows the warning.
	 */
	getProblem?: (arg: getProblemProps) => string | EntityProblem | null | void;
};

export type {
	Entity,
	SpriteGraphicSet,
	SpriteGraphicSets,
	PaletteCategory,
	PaletteSubcategory,
	EntityProblem,
};
