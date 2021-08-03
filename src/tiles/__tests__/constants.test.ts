import { entityMap } from '../../entities/entityMap';
import { TILE_TYPE_TO_SERIALIZE_ID_MAP } from '../constants';

describe('tile/constants', function () {
	describe('TILE_TYPE_TO_SERIALIZE_ID_MAP', function () {
		it('should have an entry for all cell entity types', function () {
			const cellEntities = Object.entries(entityMap).filter(
				([_, entityDef]) => entityDef.editorType === 'cell'
			);

			const cellEntityTypes = cellEntities.map(([type]) => type).sort();

			const tileConstantEntityTypes = Object.keys(
				TILE_TYPE_TO_SERIALIZE_ID_MAP
			).sort();

			expect(cellEntityTypes).toEqual(tileConstantEntityTypes);
		});

		it('should have all unique entries', function () {
			const entries = Object.entries(TILE_TYPE_TO_SERIALIZE_ID_MAP);

			entries.forEach(([_entityType, id]) => {
				const matchingIds = entries.filter(([_, eid]) => eid === id);

				if (matchingIds.length > 1) {
					throw new Error(
						`${id} found in TILE_TYPE_TO_SERIALIZE_ID_MAP more than once`
					);
				}
			});
		});
	});
});
