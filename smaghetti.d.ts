type Bounds = {
	upperLeft: Point;
	lowerRight: Point;
};

type GoalStartCorner =
	| 'upper-left'
	| 'upper-right'
	| 'lower-left'
	| 'lower-right';

type IDable = { id: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EntitySettings = Record<string, any>;

type NewEntity = {
	x: number;
	y: number;
	type: import('../entities/entityMap_generated').EntityType;
	disableDrag?: boolean;
	settings?: EntitySettings;
};

type Entity = NewEntity & IDable;

type NewTile = {
	x: number;
	y: number;
	tileType: import('../tiles/constants').TileType;
	tileIndex: number;
	entityGroupId?: number;
	entitySettings?: EntitySettings;
};

type Tile = NewTile & IDable;

type TileEntity = Entity & { tileIndices: number[] };

type Point = {
	x: number;
	y: number;
};

type TileMatrix = Array<null | Array<null | Tile>>;

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
	entities: Entity[];
	tileLayer: TileLayer;
	startCorner: GoalStartCorner;
	goalCorner: GoalStartCorner;
};

type SerializedTileEntity = {
	x: number;
	y: number;
	s: EntitySettings;
};

type SerializedLevelData = Omit<LevelData, 'tileLayer'> & {
	tileLayer: SerializedTileLayer;
	tileEntities: SerializedTileEntity[];
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
