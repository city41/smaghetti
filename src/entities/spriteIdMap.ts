import { EntityType, entityMap } from './entityMap';

// TODO: why do these still exist? are they needed? they need to go
const bank1SpriteIdToEntityType: Record<number, EntityType> = (function () {
	return Object.keys(entityMap).reduce<Record<number, EntityType>>(
		(building, key) => {
			const s = entityMap[key as EntityType];

			if (!s.toSpriteBinary) {
				return building;
			}

			const bytes = s.toSpriteBinary({ x: 0, y: 0, w: 1, h: 1, settings: {} });

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
			const s = entityMap[key as EntityType];

			if (!s.toSpriteBinary) {
				return building;
			}

			const bytes = s.toSpriteBinary({ x: 0, y: 0, w: 1, h: 1, settings: {} });

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
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {} as Record<EntityType, number>);
})();

const bank0EntityTypeToSpriteId: Record<EntityType, number> = (function () {
	return Object.entries(bank0SpriteIdToEntityType).reduce((building, entry) => {
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {} as Record<EntityType, number>);
})();

export {
	bank0EntityTypeToSpriteId,
	bank0SpriteIdToEntityType,
	bank1EntityTypeToSpriteId,
	bank1SpriteIdToEntityType,
};
