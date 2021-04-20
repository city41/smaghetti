import { Resource } from './types';
import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';
import { CoinSnake } from './CoinSnake';
import { FortressBackground } from './FortressBackground';
import { FrogSuitInChest } from './FrogSuitInChest';
import { GiantVegetable } from './GiantVegetable';
import { KoopaShell } from './KoopaShell';
import { PoisonMushroom } from './PoisonMushroom';
import { PWing } from './PWing';
import { RegularVegetable } from './RegularVegetable';
import { Shoe } from './Shoe';
import { SmallVegetable } from './SmallVegetable';
import { TanookiSuitInChest } from './TanookiSuitInChest';
import { UndergroundBackground } from './UndergroundBackground';

const resourceMap = {
	ClimbingVineHead,
	CoinCache,
	CoinSnake,
	FortressBackground,
	FrogSuitInChest,
	GiantVegetable,
	KoopaShell,
	PoisonMushroom,
	PWing,
	RegularVegetable,
	Shoe,
	SmallVegetable,
	TanookiSuitInChest,
	UndergroundBackground,
};

type ResourceType = keyof typeof resourceMap;

export { resourceMap };
export type { ResourceType };
