import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';
import { CoinSnake } from './CoinSnake';
import { FortressBackground } from './FortressBackground';
import { FrogSuit } from './FrogSuit';
import { GiantVegetable } from './GiantVegetable';
import { KoopaShell } from './KoopaShell';
import { PoisonMushroom } from './PoisonMushroom';
import { PWing } from './PWing';
import { RegularVegetable } from './RegularVegetable';
import { Shoe } from './Shoe';
import { SmallVegetable } from './SmallVegetable';
import { TanookiSuit } from './TanookiSuit';
import { UndergroundBackground } from './UndergroundBackground';

const resourceMap = {
	ClimbingVineHead,
	CoinCache,
	CoinSnake,
	FortressBackground,
	FrogSuit,
	GiantVegetable,
	KoopaShell,
	PoisonMushroom,
	PWing,
	RegularVegetable,
	Shoe,
	SmallVegetable,
	TanookiSuit,
	UndergroundBackground,
};

type ResourceType = keyof typeof resourceMap;

export { resourceMap };
export type { ResourceType };
