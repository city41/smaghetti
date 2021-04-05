import { SpriteType, entityMap } from './entityMap';

const bank1SpriteIdToSpriteType: Record<number, SpriteType> = (function () {
	return Object.keys(entityMap).reduce<Record<number, SpriteType>>(
		(building, key) => {
			if (key === 'Player') {
				return building;
			}

			const s = entityMap[key as SpriteType];

			if (s.gameType !== 'sprite') {
				return building;
			}

			const bytes = s.toBinary(0, 0, 1, 1, {});

			// bank
			if (bytes[0] !== 1) {
				return building;
			}

			building[bytes[1]] = key as SpriteType;
			return building;
		},
		{}
	);
})();

const bank0SpriteIdToSpriteType: Record<number, SpriteType> = (function () {
	return Object.keys(entityMap).reduce<Record<number, SpriteType>>(
		(building, key) => {
			if (key === 'Player') {
				return building;
			}

			const s = entityMap[key as SpriteType];

			if (s.gameType !== 'sprite') {
				return building;
			}

			const bytes = s.toBinary(0, 0, 1, 1, {});

			// bank
			if (bytes[0] !== 0) {
				return building;
			}

			building[bytes[1]] = key as SpriteType;
			return building;
		},
		{}
	);
})();

const bank1SpriteTypeToSpriteId: Record<SpriteType, number> = (function () {
	return Object.entries(bank1SpriteIdToSpriteType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<SpriteType, number>;
})();

const bank0SpriteTypeToSpriteId: Record<SpriteType, number> = (function () {
	return Object.entries(bank0SpriteIdToSpriteType).reduce((building, entry) => {
		// @ts-ignore
		building[entry[1]] = parseInt(entry[0], 16);
		return building;
	}, {}) as Record<SpriteType, number>;
})();

export {
	bank0SpriteTypeToSpriteId,
	bank0SpriteIdToSpriteType,
	bank1SpriteTypeToSpriteId,
	bank1SpriteIdToSpriteType,
};
