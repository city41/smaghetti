type EntityCount = {
	type: EntityType;
	count: number;
};

type LevelStats = {
	lastUpdated: string;
	entitiesByCount: EntityCount[];
};

export type { EntityCount, LevelStats };
