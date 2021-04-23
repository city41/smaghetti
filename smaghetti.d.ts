type Bounds = {
	upperLeft: Point;
	lowerRight: Point;
};

type IDable = { id: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EditorEntitySettings = Record<string, any>;

type NewEditorEntity = {
	x: number;
	y: number;
	type: import('./src/entities/entityMap').EntityType;
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
	exitType: number;
};

type Point = {
	x: number;
	y: number;
};

type EditorEntityRow = Array<EditorEntity | null>;
type EditorEntityMatrix = Array<EditorEntityRow | null>;

type MatrixLayer = {
	width: number;
	height: number;
	data: EditorEntityMatrix;
};

// the string is the short id for the entity type, ie "Brick" -> "Br"
type SerializedEditorEntityMatrix = Array<string | Array<string>>;

type SerializedMatrixLayer = {
	width: number;
	height: number;
	data: SerializedEditorEntityMatrix;
};

type RoomSettings = {
	objectSet: number;
	objectGraphicSet: number;
	music: number;
	bgGraphic: number;
	bgColor: number;
	spriteGraphicSet: [number, number, number, number, number, number];
};

type RoomData = {
	settings: RoomSettings;
	paletteEntries: EntityType[];
	entities: EditorEntity[];
	matrixLayer: MatrixLayer;
};

type SerializedMatrixEntitySettings = {
	x: number;
	y: number;
	s: EditorEntitySettings;
};

type SerializedRoomData = Omit<RoomData, 'matrixLayer'> & {
	matrixLayer: SerializedMatrixLayer;
	matrixEntitySettings: SerializedMatrixEntitySettings[];
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
