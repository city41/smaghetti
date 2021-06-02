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
	exitCategory: 'door' | 'pipe';
	exitType:
		| 'door'
		| 'up-from-pipe'
		| 'down-from-pipe'
		| 'horizontal-travel-left-pipe'
		| 'horizontal-travel-right-pipe';
};

type EditorEntityRow = Array<EditorEntity | null>;
type EditorEntityMatrix = Array<EditorEntityRow | null>;

// the string is the short id for the entity type, ie "Brick" -> "Br"
type SerializedEditorEntityMatrix = Array<string | Array<string>>;

type RoomBackgroundSettings = {
	bgGraphic: number;
	bgColor: number;
	bgExtraColorAndEffect: number;
};

type RoomSettings = RoomBackgroundSettings & {
	music: number;
};

type RoomLayer = {
	entities: EditorEntity[];
	matrix: EditorEntityMatrix;
	// giantMatrix: EditorEntityMatrix;
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
};

type LevelData = {
	settings: LevelSettings;
	rooms: RoomData[];
};

type NewLevel = {
	name: string;
	data: LevelData;
	created_at: string;
};

type SerializedLevelData = {
	settings: LevelSettings;
	rooms: SerializedRoomData[];
};

type Level = NewLevel & { id: string };
type BrokenLevel = {
	id: string;
	name: string;
	created_at: string;
	broken: true;
};

type SerializedLevel = Omit<Level, 'data'> & {
	data: SerializedLevelData;
	version: string;
};

type LocalStorageSerializedLevel = Omit<SerializedLevel, 'id' | 'created_at'>;
type LevelToLoadInGBA = Omit<NewLevel, 'created_at'>;

type User = { id: string; username: string };

// TODO: these types don't fully work, for example when used as the return type of a function
type Tuple<T, N extends number> = N extends N ? T[] : _TupleOf<T, N, []>;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
	? R
	: _TupleOf<T, N, [T, ...R]>;
