import { AceCoin } from './AceCoin';
import { ArrowFloor } from './ArrowFloor';
import { ArrowSign } from './ArrowSign';
import { Bobomb } from './Bobomb';
import { BonyBeetle } from './BonyBeetle';
import { Boo } from './Boo';
import { BoomBoom } from './BoomBoom';
import { Boomerang } from './Boomerang';
import { BoomerangBro } from './BoomerangBro';
import { BowserDoor } from './BowserDoor';
import { BowserLaserStatue } from './BowserLaserStatue';
import { Brick } from './Brick';
import { Bubble } from './Bubble';
import { BuriedVegetable } from './BuriedVegetable';
import { BuzzyBeetle } from './BuzzyBeetle';
import { Cactus } from './Cactus';
import { CapeFeather } from './CapeFeather';
import { CardSlotMachine } from './CardSlotMachine';
import { ChainChomp } from './ChainChomp';
import { ChargingChuck } from './ChargingChuck';
import { Clock } from './Clock';
import { Chest } from './Chest';
import { Coin } from './Coin';
import { CoinChallenge } from './CoinChallenge';
import { ConveyorBelt } from './ConveyorBelt';
import { DiggableSand } from './DiggableSand';
import { DonutBlock } from './DonutBlock';
import { DownFortressSpike } from './DownFortressSpike';
import { DryBones } from './DryBones';
import { FallAwayPlatform } from './FallAwayPlatform';
import { FireBar } from './FireBar';
import { FireBro } from './FireBro';
import { FireBarBase } from './FireBarBase';
import { FireFlower } from './FireFlower';
import { FlyingPiranhaPlant } from './FlyingPiranhaPlant';
import { FortressBrick } from './FortressBrick';
import { UpFortressSpike } from './UpFortressSpike';
import { GrandGoomba } from './GrandGoomba';
import { GiantGreenKoopa } from './GiantGreenKoopa';
import { GiantGreenParaKoopa } from './GiantGreenParaKoopa';
import { GiantRedKoopa } from './GiantRedKoopa';
import { GlassBlock } from './GlassBlock';
import { Goomba } from './Goomba';
import { GreenKoopaTroopa } from './GreenKoopaTroopa';
import { GreenParaTroopa } from './GreenParaTroopa';
import { HammerBro } from './HammerBro';
import { HiddenBlock } from './HiddenBlock';
import { HorizontalRedPiranhaPlant } from './HorizontalRedPiranhaPlant';
import { IndestructibleBrick } from './IndestructibleBrick';
import { Key } from './Key';
import { Lakitu } from './Lakitu';
import { LakituCloud } from './LakituCloud';
import { Lava } from './Lava';
import { Leaf } from './Leaf';
import { LogBridge } from './LogBridge';
import { MagicBrick } from './MagicBrick';
import { MetalDonutFloor } from './MetalDonutFloor';
import { MetalMushroom } from './MetalMushroom';
import { Muncher } from './Muncher';
import { Mushroom } from './Mushroom';
import { MusicBlock } from './MusicBlock';
import { NumberBlock } from './NumberBlock';
import { OneUpMushroom } from './OneUpMushroom';
import { ParaBomberGoomba } from './ParaBomberGoomba';
import { ParaGoomba } from './ParaGoomba';
import { PileDriverMiniGoomba } from './PileDriverMiniGoomba';
import { Player } from './Player';
import { PoisonMushroom } from './PoisonMushroom';
import { POWBlock } from './POWBlock';
import { PowerUpSlotMachine } from './PowerUpSlotMachine';
import { PSwitch } from './PSwitch';
import { QuestionBlock } from './QuestionBlock';
import { QuestionMark } from './QuestionMark';
import { RedKoopaTroopa } from './RedKoopaTroopa';
import { RedParaTroopa } from './RedParaTroopa';
import { SeeSawPlatform } from './SeeSawPlatform';
import { ShoeGoomba } from './ShoeGoomba';
import { SilverPSwitch } from './SilverPSwitch';
import { SimpleBlackDoor } from './SimpleBlackDoor';
import { SledgeBro } from './SledgeBro';
import { SpikeBall } from './SpikeBall';
import { Spiny } from './Spiny';
import { SpringBoard } from './SpringBoard';
import { Stalactite } from './Stalactite';
import { StarMan } from './StarMan';
import { StretchBlock } from './StretchBlock';
import { TerracottaBrick } from './TerracottaBrick';
import { TexturedDoor } from './TexturedDoor';
import { ThreeUpMoon } from './ThreeUpMoon';
import { Thwimp } from './Thwimp';
import { Thwomp } from './Thwomp';
import { TiltPlatform } from './TiltPlatform';
import { Tornado } from './Tornado';
import { TriangularBlock } from './TriangularBlock';
import { UndergroundFlatTerrain_HorizontalTop } from './UndergroundFlatTerrain_HorizontalTop';
import { UndergroundFlatTerrain_UpperLeftCorner } from './UndergroundFlatTerrain_UpperLeftCorner';
import { UndergroundFlatTerrain_UpperRightCorner } from './UndergroundFlatTerrain_UpperRightCorner';
import { UndergroundFlatTerrain_VerticalLeft } from './UndergroundFlatTerrain_VerticalLeft';
import { UndergroundFlatTerrain_VerticalRight } from './UndergroundFlatTerrain_VerticalRight';
import { WoodBlock } from './WoodBlock';
import { WoodDoor } from './WoodDoor';
import { WoodWalkway } from './WoodWalkway';
import { YellowSwitch } from './YellowSwitch';
import { YellowSwitchBrick } from './YellowSwitchBrick';

const entityMap = {
	AceCoin,
	ArrowFloor,
	ArrowSign,
	Bobomb,
	BonyBeetle,
	Boo,
	BoomBoom,
	Boomerang,
	BoomerangBro,
	BowserDoor,
	BowserLaserStatue,
	Brick,
	Bubble,
	BuriedVegetable,
	BuzzyBeetle,
	Cactus,
	CapeFeather,
	CardSlotMachine,
	ChainChomp,
	ChargingChuck,
	Clock,
	Chest,
	Coin,
	CoinChallenge,
	ConveyorBelt,
	DiggableSand,
	DonutBlock,
	DownFortressSpike,
	DryBones,
	FallAwayPlatform,
	FireBar,
	FireBro,
	FireBarBase,
	FireFlower,
	FlyingPiranhaPlant,
	FortressBrick,
	UpFortressSpike,
	GrandGoomba,
	GiantGreenKoopa,
	GiantGreenParaKoopa,
	GiantRedKoopa,
	GlassBlock,
	Goomba,
	GreenKoopaTroopa,
	GreenParaTroopa,
	HammerBro,
	HiddenBlock,
	HorizontalRedPiranhaPlant,
	IndestructibleBrick,
	Key,
	Lakitu,
	LakituCloud,
	Lava,
	Leaf,
	LogBridge,
	MagicBrick,
	MetalDonutFloor,
	MetalMushroom,
	Muncher,
	Mushroom,
	MusicBlock,
	NumberBlock,
	OneUpMushroom,
	PSwitch,
	ParaBomberGoomba,
	ParaGoomba,
	PileDriverMiniGoomba,
	Player,
	PoisonMushroom,
	POWBlock,
	PowerUpSlotMachine,
	QuestionBlock,
	QuestionMark,
	RedKoopaTroopa,
	RedParaTroopa,
	SeeSawPlatform,
	ShoeGoomba,
	SilverPSwitch,
	SimpleBlackDoor,
	SledgeBro,
	SpikeBall,
	Spiny,
	SpringBoard,
	Stalactite,
	StarMan,
	StretchBlock,
	TerracottaBrick,
	TexturedDoor,
	ThreeUpMoon,
	Thwimp,
	Thwomp,
	TiltPlatform,
	Tornado,
	TriangularBlock,
	UndergroundFlatTerrain_HorizontalTop,
	UndergroundFlatTerrain_UpperLeftCorner,
	UndergroundFlatTerrain_UpperRightCorner,
	UndergroundFlatTerrain_VerticalLeft,
	UndergroundFlatTerrain_VerticalRight,
	WoodBlock,
	WoodDoor,
	WoodWalkway,
	YellowSwitch,
	YellowSwitchBrick,
};

type EntityType = keyof typeof entityMap;

export { entityMap };
export type { EntityType };
