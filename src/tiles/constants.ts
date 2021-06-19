import { EntityType } from '../entities/entityMap';

const TILE_SIZE = 16;

// TODO: really need this to go away
// or at the least, flip these so we know the ids are unique
// ie Mu: "Muncher" instead of Muncher: "Mu"
const TILE_TYPE_TO_SERIALIZE_ID_MAP: Partial<Record<EntityType, string>> = {
	ArrowFloor: 'Af',
	BlueCoin: 'B$',
	BoltLeft: 'Bl',
	BowserBrick: 'Bbr',
	BuriedVegetable: 'Bu',
	Brick: 'Br',
	Cactus: 'Ca',
	CementBlock: 'Cmb',
	CheckeredFloor: 'Chf',
	CheckeredFloorPerspective: 'Chfp',
	ChoppyWater: 'Cw',
	Coin: '$',
	CoralDonutBlock: 'Cdb',
	DiggableSand: 'Ds',
	DonutBlock: 'Db',
	DownFortressSpike: 'DFs',
	EyeBallBlock: 'eye',
	FallAwaySpike: 'Fas',
	FireBarBase: 'Fbb',
	FlowerBush: 'Flw',
	FortressBrick: 'Fb',
	FullerFlowerBush: 'Fflw',
	GlassBlock: 'Gb',
	GrassHorizontal: 'Gh',
	GrassUpperLeftCorner: 'Gulc',
	GrassUpperRightCorner: 'Gurc',
	GrassVerticalLeft: 'Gvl',
	GrassVerticalRight: 'Gvr',
	Herbert: 'Herb',
	HiddenBlock: 'Hb',
	IceBlockCoin: 'Ibc',
	IceBlockMuncher: 'Ibm',
	IceBlockSmall: 'Ibs',
	IndestructibleBrick: 'In',
	LakituCloud: 'Lc',
	Lava: 'Lv',
	LogBridge: 'Lbg',
	MagicBrick: 'Mgb',
	MetalBrick: 'Mtb',
	MetalDonutFloor: 'Mdf',
	MetalMushroom: 'Mm',
	Muncher: 'Mu',
	MusicBlock: 'Mb',
	MusicBlockThreeWay: 'Mb3',
	NumberBlock: 'Nb',
	POWBlock: 'POW',
	PoolOfWater: 'Pw',
	PSwitch: 'Ps',
	QuestionBlock: '?',
	RopeRailing: 'Rr',
	Stalactite: 'St',
	StretchBooPlatform: 'Sbp',
	TanookiBlock: 'Tkb',
	TerracottaBrick: 'Tcb',
	TriangularBlock: 'Tb',
	UpFortressSpike: 'UFs',
	Vine: 'Vn',
	Waterfall: 'Wf',
	WoodBlock: 'Wo',
	WoodPlatform: 'Wdp',
	WoodWalkway: 'Wwy',
	YellowSwitchBrick: 'ysb',
};

const TILE_SERIALIZED_ID_TO_TYPE_MAP: Record<
	string,
	EntityType
> = (function () {
	return Object.keys(TILE_TYPE_TO_SERIALIZE_ID_MAP).reduce<
		Record<string, EntityType>
	>((building, key) => {
		const val = TILE_TYPE_TO_SERIALIZE_ID_MAP[key as EntityType]!;
		building[val] = key as EntityType;
		return building;
	}, {});
})();

export {
	TILE_SIZE,
	TILE_TYPE_TO_SERIALIZE_ID_MAP,
	TILE_SERIALIZED_ID_TO_TYPE_MAP,
};
