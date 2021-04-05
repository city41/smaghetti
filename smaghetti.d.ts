type Bounds = {
	upperLeft: Point;
	lowerRight: Point;
};

type IDable = { id: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EntitySettings = Record<string, any>;

type NewEntity = {
	x: number;
	y: number;
	type: import('./src/entities/entityMap').EntityType;
	disableDrag?: boolean;
	settings?: EntitySettings;
};

type EditorEntity = NewEntity & IDable;

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

type LevelData = {
	entities: EditorEntity[];
	tileLayer: TileLayer;
};

type SerializedTileSettings = {
	x: number;
	y: number;
	s: EntitySettings;
};

type SerializedLevelData = Omit<LevelData, 'tileLayer'> & {
	tileLayer: SerializedTileLayer;
	tileSettings: SerializedTileSettings[];
};

type LevelPlaySession = {
	user: User;
	duration: number;
	cleared: boolean;
	deaths: number;
	created_at: string;
};

type NewLevel = {
	name: string;
	data: LevelData;
	created_at: string;
	level_play_sessions: LevelPlaySession[];
};

type Level = NewLevel & { id: string };

type SerializedLevel = Omit<Level, 'data'> & { data: SerializedLevelData };

type User = { id: string; username: string };

// TODO: these types don't fully work, for example when used as the return type of a function
type Tuple<T, N extends number> = N extends N ? T[] : _TupleOf<T, N, []>;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
	? R
	: _TupleOf<T, N, [T, ...R]>;
