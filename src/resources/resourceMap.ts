import { BigBooArm } from './BigBooArm';
import { BigBooBody } from './BigBooBody';
import { BigBooFace } from './BigBooFace';
import { BigBooTail } from './BigBooTail';
import { BowserFireStatueBody } from './BowserFireStatueBody';
import { BowserFireStatueHead } from './BowserFireStatueHead';
import { ChargingChuckBody } from './ChargingChuckBody';
import { ChargingChuckHead } from './ChargingChuckHead';
import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';
import { CoinSnake } from './CoinSnake';
import { DoorLock } from './DoorLock';
import { FlutterBody } from './FlutterBody';
import { FlutterFlower } from './FlutterFlower';
import { FlutterHead } from './FlutterHead';
import { FlutterWing } from './FlutterWing';
import { FortressBackground } from './FortressBackground';
import { FrogSuit } from './FrogSuit';
import { GiantVegetable } from './GiantVegetable';
import { GreenCheepCheep } from './GreenCheepCheep';
import { GreenSpinyEgg } from './GreenSpinyEgg';
import { HoppingBowserStatueBody } from './HoppingBowserStatueBody';
import { HoppingBowserStatueHead } from './HoppingBowserStatueHead';
import { HorizontalDolphin } from './HorizontalDolphin';
import { HotHeadEyes } from './HotHeadEyes';
import { KoopalingWand } from './KoopalingWand';
import { KoopaShell } from './KoopaShell';
import { OneNumberBlock } from './OneNumberBlock';
import { OneWayDoorHorizontalFlipper } from './OneWayDoorHorizontalFlipper';
import { OneWayDoorVerticalFlipper } from './OneWayDoorVerticalFlipper';
import { OrangeSpinyEgg } from './OrangeSpinyEgg';
import { ParaWing } from './ParaWing';
import { PoisonMushroom } from './PoisonMushroom';
import { PWing } from './PWing';
import { RedCheepCheep } from './RedCheepCheep';
import { RegularVegetable } from './RegularVegetable';
import { SeeSawPivotPoint } from './SeeSawPivotPoint';
import { Shoe } from './Shoe';
import { SmallVegetable } from './SmallVegetable';
import { TanookiSuit } from './TanookiSuit';
import { ThreeNumberBlock } from './ThreeNumberBlock';
import { TiltPlatformBall } from './TiltPlatformBall';
import { TiltPlatformPivot } from './TiltPlatformPivot';
import { TwoNumberBlock } from './TwoNumberBlock';
import { UndergroundBackground } from './UndergroundBackground';
import { WingedPlatformBlock } from './WingedPlatformBlock';
import { WingedPlatformWing } from './WingedPlatformWing';

const resourceMap = {
	BigBooArm,
	BigBooBody,
	BigBooFace,
	BigBooTail,
	BowserFireStatueBody,
	BowserFireStatueHead,
	ChargingChuckBody,
	ChargingChuckHead,
	ClimbingVineHead,
	CoinCache,
	CoinSnake,
	DoorLock,
	FlutterBody,
	FlutterFlower,
	FlutterHead,
	FlutterWing,
	FortressBackground,
	FrogSuit,
	HotHeadEyes,
	HorizontalDolphin,
	GiantVegetable,
	GreenCheepCheep,
	GreenSpinyEgg,
	HoppingBowserStatueBody,
	HoppingBowserStatueHead,
	KoopalingWand,
	KoopaShell,
	OneNumberBlock,
	OneWayDoorHorizontalFlipper,
	OneWayDoorVerticalFlipper,
	OrangeSpinyEgg,
	ParaWing,
	PoisonMushroom,
	PWing,
	RedCheepCheep,
	RegularVegetable,
	SeeSawPivotPoint,
	Shoe,
	SmallVegetable,
	TanookiSuit,
	ThreeNumberBlock,
	TiltPlatformBall,
	TiltPlatformPivot,
	TwoNumberBlock,
	UndergroundBackground,
	WingedPlatformBlock,
	WingedPlatformWing,
};

type ResourceType = keyof typeof resourceMap;

export { resourceMap };
export type { ResourceType };
