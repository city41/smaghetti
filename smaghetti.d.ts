type Point = {
	x: number;
	y: number;
};

type Bounds = {
	upperLeft: Point;
	lowerRight: Point;
};

type EntityType = import('./src/entities/entityMap').EntityType;

type IDable = { id: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EditorEntitySettings = Record<string, any>;

type NewEditorEntity = {
	x: number;
	y: number;
	type: EntityType;
	disableDrag?: boolean;
	settings?: EditorEntitySettings;
};

type EditorEntity = NewEditorEntity & IDable;

type EditorTransport = {
	x: number;
	y: number;
	room: number;
	destX: number;
	destY: number;
	destRoom: number;
	exitType:
		| 'door'
		| 'up-from-pipe'
		| 'down-from-pipe'
		| 'horizontal-travel-left-pipe'
		| 'horizontal-travel-right-pipe';
};

type EditorEntityRow = Array<EditorEntity | null | undefined>;
type EditorEntityMatrix = Array<EditorEntityRow | null | undefined>;

// the string is the short id for the entity type, ie "Brick" -> "Br"
type SerializedEditorEntityMatrix = Array<string | Array<string>>;

type BackgroundGraphic =
	| 'blank'
	| 'underground'
	| 'underground-cave'
	| 'fortress'
	| 'plains'
	| 'desert'
	| 'ghost-house'
	| 'basic-ghost-house'
	| 'basic-castle'
	| 'tall-hills'
	| 'tall-hills-but-shorter'
	| 'tetris-room'
	| 'underground-double-cave'
	| 'metal-brick'
	| 'underwater-more-terrain'
	| 'winter'
	| 'underwater'
	| 'long-clouds'
	| 'crystal-underground'
	| 'hills-at-night'
	| 'night-sky'
	| 'bonus-room'
	| 'stormy-clouds'
	| 'stone-wall'
	| 'large-pulsating-bricks'
	| 'basement-dungeon'
	| 'pyramids'
	| 'inside-airship'
	| 'mountains'
	| 'high-up-in-the-clouds'
	| 'waterfalls'
	| 'bowser-castle'
	| 'pipes'
	| 'green-mountains'
	| 'hills-in-clouds'
	| 'far-away-hills-in-clouds'
	| 'jungle'
	| 'jungle-no-sky'
	| 'toad-house'
	| 'pyramid-split-inside-and-out'
	| 'desert-brick-wall'
	| 'colorful-brick-wall'
	| 'blue-and-green-stars';

type BackgroundExtraColorAndEffect =
	| 'none'
	| 'fortress-parallax'
	| 'underwater-ripple-purple'
	| 'stormy-clouds-lightning'
	| 'lava-shimmer';

type RoomBackgroundSettings = {
	bgGraphic: number;
	bgColor: number;
	bgExtraColorAndEffect: number;
	unknownThirdHeaderByte?: number;
};

type RoomSettings = RoomBackgroundSettings & {
	music: number;
	wrapAround?: boolean;
};

type RoomLayer = {
	entities: EditorEntity[];
	matrix: EditorEntityMatrix;
};

type RoomData = {
	settings: RoomSettings;
	actors: RoomLayer;
	stage: RoomLayer;
	roomTileWidth: number;
	roomTileHeight: number;
	// not really room data, but these need to be persisted
	paletteEntries: EntityType[];
};

type SerializedMatrixEntitySettings = {
	x: number;
	y: number;
	s: EditorEntitySettings;
};

type SerializedRoomLayer = {
	entities: EditorEntity[];
	matrix: SerializedEditorEntityMatrix;
	matrixSettings: SerializedMatrixEntitySettings[];
};

type SerializedRoomData = Omit<RoomData, 'actors' | 'stage'> & {
	actors: SerializedRoomLayer;
	stage: SerializedRoomLayer;
};

type LevelSettings = {
	timer: number;
	tag0?: string;
	tag1?: string;
	description?: string;
};

type LevelData = {
	settings: LevelSettings;
	rooms: RoomData[];
};

type NewLevel = {
	name: string;
	data: LevelData;
	created_at: string;
	updated_at?: string;
	published?: boolean;
	user?: {
		username: string;
		role?: string;
	};
};

type SerializedLevelData = {
	settings: LevelSettings;
	rooms: SerializedRoomData[];
};

type Level = NewLevel & { id: string };

type SerializedLevel = Omit<Level, 'data'> & {
	data: SerializedLevelData;
	version: string;
};

type LevelVote = {
	userId: string;
	levelId: string;
};

type LocalStorageSerializedLevel = Omit<
	SerializedLevel,
	'created_at' | 'updated_at'
>;
type LevelToLoadInGBA = Omit<NewLevel, 'created_at' | 'updated_at'>;

type User = { id: string; username: string; role?: string };

// TODO: these types don't fully work, for example when used as the return type of a function
type Tuple<T, N extends number> = N extends N ? T[] : _TupleOf<T, N, []>;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
	? R
	: _TupleOf<T, N, [T, ...R]>;

type PlayAsCharacter = 'mario' | 'luigi';
