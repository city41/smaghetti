import { BaseEntity } from '../entities/types';
import { ClimbingVineHead } from './ClimbingVineHead';
import { CoinCache } from './CoinCache';

// TODO: BaseEntity is really resource, these roles should flip
type Resource =
	| BaseEntity
	| {
			type: string;
			extract?: (rom: Uint8Array) => string;
	  };

const resourceMap: Record<string, Resource> = { ClimbingVineHead, CoinCache };

export { resourceMap };
export type { Resource };
