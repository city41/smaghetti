type EntityCount = {
	type: EntityType;
	count: number;
};

type LevelStats = {
	lastUpdated: string;
	entitiesByCount: EntityCount[];
	roomsPerLevelPercentages: Record<1 | 2 | 3 | 4, number>;
};

export type { EntityCount, LevelStats };
