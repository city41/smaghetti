import { Resource } from './types';
import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';
import { GiantVegetable } from './GiantVegetable';
import { KoopaShell } from './KoopaShell';
import { PoisonMushroom } from './PoisonMushroom';
import { RegularVegetable } from './RegularVegetable';
import { SmallVegetable } from './SmallVegetable';
import { UndergroundBackground } from './UndergroundBackground';

const resourceMap: Record<string, Resource> = {
	ClimbingVineHead,
	CoinCache,
	GiantVegetable,
	KoopaShell,
	PoisonMushroom,
	RegularVegetable,
	SmallVegetable,
	UndergroundBackground,
};

export { resourceMap };
