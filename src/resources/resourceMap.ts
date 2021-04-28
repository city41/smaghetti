import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';
import { CoinSnake } from './CoinSnake';
import { DoorLock } from './DoorLock';
import { FortressBackground } from './FortressBackground';
import { FrogSuit } from './FrogSuit';
import { GiantVegetable } from './GiantVegetable';
import { KoopaShell } from './KoopaShell';
import { OneNumberBlock } from './OneNumberBlock';
import { ParaWing } from './ParaWing';
import { PoisonMushroom } from './PoisonMushroom';
import { PWing } from './PWing';
import { RegularVegetable } from './RegularVegetable';
import { Shoe } from './Shoe';
import { SmallVegetable } from './SmallVegetable';
import { TanookiSuit } from './TanookiSuit';
import { ThreeNumberBlock } from './ThreeNumberBlock';
import { TwoNumberBlock } from './TwoNumberBlock';
import { UndergroundBackground } from './UndergroundBackground';

const resourceMap = {
	ClimbingVineHead,
	CoinCache,
	CoinSnake,
	DoorLock,
	FortressBackground,
	FrogSuit,
	GiantVegetable,
	KoopaShell,
	OneNumberBlock,
	ParaWing,
	PoisonMushroom,
	PWing,
	RegularVegetable,
	Shoe,
	SmallVegetable,
	TanookiSuit,
	ThreeNumberBlock,
	TwoNumberBlock,
	UndergroundBackground,
};

type ResourceType = keyof typeof resourceMap;

export { resourceMap };
export type { ResourceType };
