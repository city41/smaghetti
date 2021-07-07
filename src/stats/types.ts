type EntityCount = {
	type: EntityType;
	count: number;
};

type LevelStats = {
	entitiesByCount: EntityCount[];
};

export type { EntityCount, LevelStats };
