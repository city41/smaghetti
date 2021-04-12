type Bounds = {
	upperLeft: Point;
	lowerRight: Point;
};

type IDable = { id: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EntitySettings = Record<string, any>;

type NewEditorEntity = {
	x: number;
	y: number;
	type: import('./src/entities/entityMap').EntityType;
	disableDrag?: boolean;
	settings?: EntitySettings;
};

type EditorEntity = NewEditorEntity & IDable;

type NewEditorTransport = {
	x: number;
	y: number;
	room: number;
	destX: number;
	destY: number;
	destRoom: number;
	exitType: number;
};

type EditorTransport = NewEditorTransport & IDable;

type NewTile = {
	x: number;
	y: number;
	tileType: import('./src/entities/entityMap').EntityType;
	tileIndex: number;
	settings?: EntitySettings;
};

type Tile = NewTile & IDable;

type Point = {
	x: number;
	y: number;
};

type TileRow = Array<Tile | null>;
type TileMatrix = Array<TileRow | null>;

type TileLayer = {
	width: number;
	height: number;
	data: TileMatrix;
};

// the string is the short id for the tile type, ie "metal" -> "me"
type SerializedTileMatrix = Array<string | Array<string>>;

type SerializedTileLayer = {
	width: number;
	height: number;
	data: SerializedTileMatrix;
};

type RoomData = {
	entities: EditorEntity[];
	transports: EditorTransport[];
	tileLayer: TileLayer;
};

type SerializedTileSettings = {
	x: number;
	y: number;
	s: EntitySettings;
};

type SerializedRoomData = Omit<RoomData, 'tileLayer'> & {
	tileLayer: SerializedTileLayer;
	tileSettings: SerializedTileSettings[];
};

type LevelData = {
	rooms: RoomData[];
};

type NewLevel = {
	name: string;
	data: LevelData;
	created_at: string;
};

type SerializedLevelData = {
	rooms: SerializedRoomData[];
};

type Level = NewLevel & { id: string };

type SerializedLevel = Omit<Level, 'data'> & { data: SerializedLevelData };

type User = { id: string; username: string };

// TODO: these types don't fully work, for example when used as the return type of a function
type Tuple<T, N extends number> = N extends N ? T[] : _TupleOf<T, N, []>;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
	? R
	: _TupleOf<T, N, [T, ...R]>;
