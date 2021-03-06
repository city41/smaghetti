import { EntityType } from '../entities/entityMap';

const TILE_SIZE = 16;

// TODO: really need this to go away
// or at the least, flip these so we know the ids are unique
// ie Mu: "Muncher" instead of Muncher: "Mu"
const TILE_TYPE_TO_SERIALIZE_ID_MAP: Partial<Record<EntityType, string>> = {
	AirshipWindow: 'Asw',
	ArrowFloor: 'Af',
	BlueCoin: 'B$',
	BoltDown: 'Bltd',
	BoltHead: 'Blh',
	BoltLeft: 'Bl',
	BoltRight: 'Bltr',
	BoltUp: 'Bltu',
	BowserBrick: 'Bbr',
	BuriedVegetable: 'Bu',
	Burner: 'Brn',
	Brick: 'Br',
	Brick2: 'Br2',
	Cactus: 'Ca',
	CementBlock: 'Cmb',
	CheckeredBlock: 'Chb',
	CheckeredCeiling: 'Chc',
	CheckeredFloor: 'Chf',
	CheckeredFloorPerspective: 'Chfp',
	CheckeredPlatformCenter: 'Chpc',
	CheckeredPlatformLeftCap: 'Chplc',
	CheckeredPlatformRightCap: 'Chprc',
	CheckeredInnerCornerLowerLeft: 'Chicll',
	CheckeredInnerCornerLowerRight: 'Chiclr',
	CheckeredInnerCornerUpperLeft: 'Chicul',
	CheckeredInnerCornerUpperRight: 'Chicur',
	CheckeredInterior: 'Chi',
	CheckeredOuterCornerLowerLeft: 'Chocll',
	CheckeredOuterCornerLowerRight: 'Choclr',
	CheckeredOuterCornerUpperLeft: 'Chocul',
	CheckeredOuterCornerUpperRight: 'Chocur',
	CheckeredWallLeft: 'Chwl',
	CheckeredWallRight: 'Chwr',
	CloudFloor: 'Clf',
	CloudPlatformAero: 'Cpa',
	CloudPlatformThin: 'Cpth',
	Coin: '$',
	Coin2: '$2',
	CoralDonutBlock: 'Cdb',
	DeleteBlock: 'Del',
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
	LakituCloudAlternate: 'Lc*',
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
	Porthole: 'Ph',
	PSwitch: 'Ps',
	QuestionBlock: '?',
	Rope: 'Ro',
	RopeRailing: 'Rr',
	Seaweed: 'Sea',
	Stalactite: 'St',
	StalactiteSingle: 'Stas',
	StoneSupport: 'Sts',
	StretchBooPlatform: 'Sbp',
	TanookiBlock: 'Tkb',
	TerracottaBrick: 'Tcb',
	TriangularBlock: 'Tb',
	UpFortressSpike: 'UFs',
	WoodFloorSnowCovered: 'Wfsc',
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
