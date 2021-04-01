import { CoinCache } from './CoinCache';

type Resource = {
	type: string;
	extract: (rom: Uint8Array) => string;
};

const resourceMap: Record<string, Resource> = { CoinCache };

export { resourceMap };
export type { Resource };
