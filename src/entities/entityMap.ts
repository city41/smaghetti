import { AceCoin } from './AceCoin';
import { ArrowSign } from './ArrowSign';
import { Bobomb } from './Bobomb';
import { BonyBeetle } from './BonyBeetle';
import { Boo } from './Boo';
import { BoomBoom } from './BoomBoom';
import { Brick } from './Brick';
import { Bubble } from './Bubble';
import { BuriedVegetable } from './BuriedVegetable';
import { BuzzyBeetle } from './BuzzyBeetle';
import { CapeFeather } from './CapeFeather';
import { CardSlotMachine } from './CardSlotMachine';
import { Chest } from './Chest';
import { Coin } from './Coin';
import { CoinChallenge } from './CoinChallenge';
import { ConveyorBelt } from './ConveyorBelt';
import { DoorLock } from './DoorLock';
import { DownFortressSpike } from './DownFortressSpike';
import { DryBones } from './DryBones';
import { FireBar } from './FireBar';
import { FireBarBase } from './FireBarBase';
import { FireFlower } from './FireFlower';
import { FortressBrick } from './FortressBrick';
import { UpFortressSpike } from './UpFortressSpike';
import { GiantGoomba } from './GiantGoomba';
import { GiantGreenKoopa } from './GiantGreenKoopa';
import { GlassBlock } from './GlassBlock';
import { Goomba } from './Goomba';
import { GreenKoopaTroopa } from './GreenKoopaTroopa';
import { GreenParaTroopa } from './GreenParaTroopa';
import { HiddenBlock } from './HiddenBlock';
import { HorizontalRedPirannaPlant } from './HorizontalRedPirannaPlant';
import { IndestructibleBrick } from './IndestructibleBrick';
import { Key } from './Key';
import { Lakitu } from './Lakitu';
import { Lava } from './Lava';
import { Leaf } from './Leaf';
import { LogBridge } from './LogBridge';
import { MagicBrick } from './MagicBrick';
import { MetalDonutFloor } from './MetalDonutFloor';
import { Muncher } from './Muncher';
import { Mushroom } from './Mushroom';
import { MusicBlock } from './MusicBlock';
import { OneUpMushroom } from './OneUpMushroom';
import { Player } from './Player';
import { PSwitch } from './PSwitch';
import { QuestionBlock } from './QuestionBlock';
import { QuestionMark } from './QuestionMark';
import { RedKoopaTroopa } from './RedKoopaTroopa';
import { RedParaTroopa } from './RedParaTroopa';
import { ShoeGoomba } from './ShoeGoomba';
import { Spiny } from './Spiny';
import { SpringBoard } from './SpringBoard';
import { Stalactite } from './Stalactite';
import { StarMan } from './StarMan';
import { TerracottaBrick } from './TerracottaBrick';
import { TexturedDoor } from './TexturedDoor';
import { ThreeUpMoon } from './ThreeUpMoon';
import { Thwimp } from './Thwimp';
import { Thwomp } from './Thwomp';
import { Transport } from './Transport';
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
	ArrowSign,
	Bobomb,
	BonyBeetle,
	Boo,
	BoomBoom,
	Brick,
	Bubble,
	BuriedVegetable,
	BuzzyBeetle,
	CapeFeather,
	CardSlotMachine,
	Chest,
	Coin,
	CoinChallenge,
	ConveyorBelt,
	DoorLock,
	DownFortressSpike,
	DryBones,
	FireBar,
	FireBarBase,
	FireFlower,
	FortressBrick,
	UpFortressSpike,
	GiantGoomba,
	GiantGreenKoopa,
	GlassBlock,
	Goomba,
	GreenKoopaTroopa,
	GreenParaTroopa,
	HiddenBlock,
	HorizontalRedPirannaPlant,
	IndestructibleBrick,
	Key,
	Lakitu,
	Lava,
	Leaf,
	LogBridge,
	MagicBrick,
	MetalDonutFloor,
	Muncher,
	Mushroom,
	MusicBlock,
	OneUpMushroom,
	PSwitch,
	Player,
	QuestionBlock,
	QuestionMark,
	RedKoopaTroopa,
	RedParaTroopa,
	ShoeGoomba,
	Spiny,
	SpringBoard,
	Stalactite,
	StarMan,
	TerracottaBrick,
	TexturedDoor,
	ThreeUpMoon,
	Thwimp,
	Thwomp,
	Transport,
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
