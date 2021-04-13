import { Resource } from './types';
import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';
import { CoinSnake } from './CoinSnake';
import { GiantVegetable } from './GiantVegetable';
import { KoopaShell } from './KoopaShell';
import { PoisonMushroom } from './PoisonMushroom';
import { PWing } from './PWing';
import { RegularVegetable } from './RegularVegetable';
import { Shoe } from './Shoe';
import { SmallVegetable } from './SmallVegetable';
import { UndergroundBackground } from './UndergroundBackground';

const resourceMap: Record<string, Resource> = {
	ClimbingVineHead,
	CoinCache,
	CoinSnake,
	GiantVegetable,
	KoopaShell,
	PoisonMushroom,
	PWing,
	RegularVegetable,
	Shoe,
	SmallVegetable,
	UndergroundBackground,
};

export { resourceMap };
