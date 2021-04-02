import { BaseEntity } from '../entities/types';
import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';
import { UndergroundBackground } from './UndergroundBackground';

// TODO: BaseEntity is really resource, these roles should flip
type Resource =
	| BaseEntity
	| {
			type: string;
			extract?: (rom: Uint8Array) => string;
	  };

const resourceMap: Record<string, Resource> = {
	ClimbingVineHead,
	CoinCache,
	UndergroundBackground,
};

export { resourceMap };
export type { Resource };
