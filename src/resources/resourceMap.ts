import { BigBooArm } from './BigBooArm';
import { BigBooBody } from './BigBooBody';
import { BigBooFace } from './BigBooFace';
import { BigBooTail } from './BigBooTail';
import { ChargingChuckBody } from './ChargingChuckBody';
import { ChargingChuckHead } from './ChargingChuckHead';
import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';
import { CoinSnake } from './CoinSnake';
import { DoorLock } from './DoorLock';
import { FortressBackground } from './FortressBackground';
import { FrogSuit } from './FrogSuit';
import { GiantVegetable } from './GiantVegetable';
import { KoopalingWand } from './KoopalingWand';
import { KoopaShell } from './KoopaShell';
import { OneNumberBlock } from './OneNumberBlock';
import { ParaWing } from './ParaWing';
import { PoisonMushroom } from './PoisonMushroom';
import { PWing } from './PWing';
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

const resourceMap = {
	BigBooArm,
	BigBooBody,
	BigBooFace,
	BigBooTail,
	ChargingChuckBody,
	ChargingChuckHead,
	ClimbingVineHead,
	CoinCache,
	CoinSnake,
	DoorLock,
	FortressBackground,
	FrogSuit,
	GiantVegetable,
	KoopalingWand,
	KoopaShell,
	OneNumberBlock,
	ParaWing,
	PoisonMushroom,
	PWing,
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
};

type ResourceType = keyof typeof resourceMap;

export { resourceMap };
export type { ResourceType };
