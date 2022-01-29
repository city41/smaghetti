import { entityMap } from '../../../../entities/entityMap';

/**
 * these are problems just about any entity can have. Rather than look for these
 * problems in a whole bunch of entities, they are easier served here
 */
function getGenericProblem(entity: EditorEntity) {
	const entityDef = entityMap[entity.type];

	// trying to place an object where x < 0 always corrupts it
	if (
		!!entityDef.toObjectBinary &&
		entityDef.editorType !== 'cell' &&
		entity.x < 0
	) {
		return {
			severity: 'error',
			message: "Can't extend beyond the start of the level",
		};
	}
}

export { getGenericProblem };
