import { BigBooArm } from './BigBooArm';
import { BigBooBody } from './BigBooBody';
import { BigBooFace } from './BigBooFace';
import { BigBooTail } from './BigBooTail';
import { BlooperBaby } from './BlooperBaby';
import { BoltNut } from './BoltNut';
import { BoltShaft } from './BoltShaft';
import { BombFuse } from './BombFuse';
import { BonusRoomBackground } from './BonusRoomBackground';
import { BowserFireStatueBody } from './BowserFireStatueBody';
import { BowserFireStatueHead } from './BowserFireStatueHead';
import { ChargingChuckBody } from './ChargingChuckBody';
import { ChargingChuckHead } from './ChargingChuckHead';
import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';
import { CoinSnake } from './CoinSnake';
import { DesertBackground } from './DesertBackground';
import { DoorLock } from './DoorLock';
import { FlagPoleBall } from './FlagPoleBall';
import { FlagPoleShaft } from './FlagPoleShaft';
import { FlutterBody } from './FlutterBody';
import { FlutterFlower } from './FlutterFlower';
import { FlutterHead } from './FlutterHead';
import { FlutterWing } from './FlutterWing';
import { FortressBackground } from './FortressBackground';
import { FrogSuit } from './FrogSuit';
import { GhostHouseBackground } from './GhostHouseBackground';
import { GiantVegetable } from './GiantVegetable';
import { GreenCheepCheep } from './GreenCheepCheep';
import { GreenSpinyEgg } from './GreenSpinyEgg';
import { GrassHorizontalDirt } from './GrassHorizontalDirt';
import { HoppingBowserStatueBody } from './HoppingBowserStatueBody';
import { HoppingBowserStatueHead } from './HoppingBowserStatueHead';
import { HorizontalDolphin } from './HorizontalDolphin';
import { HotHeadEyes } from './HotHeadEyes';
import { KoopalingWand } from './KoopalingWand';
import { KoopaShell } from './KoopaShell';
import { MontyMoleJumpingOut } from './MontyMoleJumpingOut';
import { OneNumberBlock } from './OneNumberBlock';
import { OneWayDoorHorizontalFlipper } from './OneWayDoorHorizontalFlipper';
import { OneWayDoorVerticalFlipper } from './OneWayDoorVerticalFlipper';
import { OrangeSpinyEgg } from './OrangeSpinyEgg';
import { ParaWing } from './ParaWing';
import { PipeAirshipVerticalBody } from './PipeAirshipVerticalBody';
import { PipeAirshipVerticalLip } from './PipeAirshipVerticalLip';
import { PipeHorizontalBody } from './PipeHorizontalBody';
import { PipeHorizontalLip } from './PipeHorizontalLip';
import { PipeVerticalBody } from './PipeVerticalBody';
import { PipeVerticalLip } from './PipeVerticalLip';
import { PlainsBackground } from './PlainsBackground';
import { PoisonMushroom } from './PoisonMushroom';
import { PWing } from './PWing';
import { RedCheepCheep } from './RedCheepCheep';
import { RegularVegetable } from './RegularVegetable';
import { SeeSawPivotPoint } from './SeeSawPivotPoint';
import { Shoe } from './Shoe';
import { SmallVegetable } from './SmallVegetable';
import { StretchBooPlatformLeft } from './StretchBooPlatformLeft';
import { StretchBooPlatformRight } from './StretchBooPlatformRight';
import { TanookiSuit } from './TanookiSuit';
import { TetrisRoomBackground } from './TetrisRoomBackground';
import { ThreeNumberBlock } from './ThreeNumberBlock';
import { TiltPlatformBall } from './TiltPlatformBall';
import { TiltPlatformPivot } from './TiltPlatformPivot';
import { TwoNumberBlock } from './TwoNumberBlock';
import { UndergroundBackground } from './UndergroundBackground';
import { UnderwaterFloorBottom } from './UnderwaterFloorBottom';
import { UnderwaterFloorLeft } from './UnderwaterFloorLeft';
import { UnderwaterFloorLowerLeft } from './UnderwaterFloorLowerLeft';
import { UnderwaterFloorLowerRight } from './UnderwaterFloorLowerRight';
import { UnderwaterFloorRight } from './UnderwaterFloorRight';
import { UnderwaterFloorTop } from './UnderwaterFloorTop';
import { UnderwaterFloorUpperLeft } from './UnderwaterFloorUpperLeft';
import { UnderwaterFloorUpperRight } from './UnderwaterFloorUpperRight';
import { WaterfallTop } from './WaterfallTop';
import { WingedPlatformBlock } from './WingedPlatformBlock';
import { WingedPlatformWing } from './WingedPlatformWing';
import { WoodFloorTop } from './WoodFloorTop';
import { WoodPlatformLeft } from './WoodPlatformLeft';
import { WoodPlatformRight } from './WoodPlatformRight';

const resourceMap = {
	BigBooArm,
	BigBooBody,
	BigBooFace,
	BigBooTail,
	BlooperBaby,
	BoltNut,
	BoltShaft,
	BombFuse,
	BonusRoomBackground,
	BowserFireStatueBody,
	BowserFireStatueHead,
	ChargingChuckBody,
	ChargingChuckHead,
	ClimbingVineHead,
	CoinCache,
	CoinSnake,
	DesertBackground,
	DoorLock,
	FlagPoleBall,
	FlagPoleShaft,
	FlutterBody,
	FlutterFlower,
	FlutterHead,
	FlutterWing,
	FortressBackground,
	FrogSuit,
	GhostHouseBackground,
	GrassHorizontalDirt,
	GiantVegetable,
	GreenCheepCheep,
	GreenSpinyEgg,
	HoppingBowserStatueBody,
	HoppingBowserStatueHead,
	HotHeadEyes,
	HorizontalDolphin,
	KoopalingWand,
	KoopaShell,
	MontyMoleJumpingOut,
	OneNumberBlock,
	OneWayDoorHorizontalFlipper,
	OneWayDoorVerticalFlipper,
	OrangeSpinyEgg,
	ParaWing,
	PipeAirshipVerticalBody,
	PipeAirshipVerticalLip,
	PipeHorizontalBody,
	PipeHorizontalLip,
	PipeVerticalBody,
	PipeVerticalLip,
	PlainsBackground,
	PoisonMushroom,
	PWing,
	RedCheepCheep,
	RegularVegetable,
	SeeSawPivotPoint,
	Shoe,
	SmallVegetable,
	StretchBooPlatformLeft,
	StretchBooPlatformRight,
	TanookiSuit,
	TetrisRoomBackground,
	ThreeNumberBlock,
	TiltPlatformBall,
	TiltPlatformPivot,
	TwoNumberBlock,
	UndergroundBackground,
	UnderwaterFloorBottom,
	UnderwaterFloorLeft,
	UnderwaterFloorLowerLeft,
	UnderwaterFloorLowerRight,
	UnderwaterFloorRight,
	UnderwaterFloorTop,
	UnderwaterFloorUpperLeft,
	UnderwaterFloorUpperRight,
	WaterfallTop,
	WingedPlatformBlock,
	WingedPlatformWing,
	WoodFloorTop,
	WoodPlatformLeft,
	WoodPlatformRight,
};

type ResourceType = keyof typeof resourceMap;

export { resourceMap };
export type { ResourceType };
