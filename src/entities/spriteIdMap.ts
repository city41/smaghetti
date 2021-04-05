import { EntityType, entityMap } from './entityMap';

const bank1SpriteIdToEntityType: Record<number, EntityType> = (function () {
	return Object.keys(entityMap).reduce<Record<number, EntityType>>(
		(building, key) => {
			if (key === 'Player') {
				return building;
			}

			const s = entityMap[key as EntityType];

			if (s.gameType !== 'sprite') {
				return building;
			}

			const bytes = s.toBinary(0, 0, 1, 1, {});

			// bank
			if (bytes[0] !== 1) {
				return building;
			}

			building[bytes[1]] = key as EntityType;
			return building;
		},
		{}
	);
})();

const bank0SpriteIdToEntityType: Record<number, EntityType> = (function () {
	return Object.keys(entityMap).reduce<Record<number, EntityType>>(
		(building, key) => {
			if (key === 'Player') {
				return building;
			}

			const s = entityMap[key as EntityType];

			if (s.gameType !== 'sprite') {
				return building;
			}

			const bytes = s.toBinary(0, 0, 1, 1, {});

			// bank
			if (bytes[0] !== 0) {
				return building;
			}

			building[bytes[1]] = key as EntityType;
			return building;
		},
		{}
	);
})();

const bank1EntityTypeToSpriteId: Record<EntityType, number> = (function () {
	return Object.entries(bank1SpriteIdToEntityType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<EntityType, number>;
})();

const bank0EntityTypeToSpriteId: Record<EntityType, number> = (function () {
	return Object.entries(bank0SpriteIdToEntityType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<EntityType, number>;
})();

export {
	bank0EntityTypeToSpriteId,
	bank0SpriteIdToEntityType,
	bank1EntityTypeToSpriteId,
	bank1SpriteIdToEntityType,
};
