import { Resource } from './types';
import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';
import { UndergroundBackground } from './UndergroundBackground';

const resourceMap: Record<string, Resource> = {
	ClimbingVineHead,
	CoinCache,
	UndergroundBackground,
};

export { resourceMap };
