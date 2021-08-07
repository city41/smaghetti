import { entityMap } from '../entityMap';

describe('confirm transports', function () {
	/**
	 * In several places in Smaghetti, it is assumed cells never have transports.
	 * This test is a safety check to confirm that is the case. If this test fails,
	 * then need to reconsider allowing cells to have transports
	 */
	it('should not have any cell type entities with transports', function () {
		const cellEntities = Object.values(entityMap).filter(
			(entityDef) => entityDef.editorType === 'cell'
		);

		const cellEntitiesWithTransports = cellEntities.filter((c) => {
			return !!c.getTransports;
		});

		expect(cellEntitiesWithTransports.length).toEqual(0);
	});

	/**
	 * Similarly, all transport owning entities should be on the stage, not actors
	 */
	it('should not have any actor type entities with transports', function () {
		const actorEntities = Object.values(entityMap).filter(
			(entityDef) => entityDef.layer === 'actor'
		);

		const actorEntitiesWithTransports = actorEntities.filter((c) => {
			return !!c.getTransports;
		});

		expect(actorEntitiesWithTransports.length).toEqual(0);
	});
});
