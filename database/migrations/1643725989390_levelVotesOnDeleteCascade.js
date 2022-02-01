const { LEVEL_TABLE } = require('./1614821962755_levels');
/* eslint-disable camelcase */

exports.shorthands = undefined;

const TABLE_NAME = { schema: 'public', name: 'level_votes' };
const CONSTRAINT_NAME = 'level_votes_level_id_fkey';

exports.up = (pgm) => {
	pgm.dropConstraint(TABLE_NAME, CONSTRAINT_NAME, {
		ifExists: true,
	});

	pgm.addConstraint(TABLE_NAME, CONSTRAINT_NAME, {
		foreignKeys: {
			columns: 'level_id',
			references: `public.${LEVEL_TABLE}(id)`,
			onDelete: 'cascade',
		},
	});
};

exports.down = (pgm) => {
	pgm.dropConstraint(TABLE_NAME, CONSTRAINT_NAME, {
		ifExists: true,
	});

	pgm.addConstraint(TABLE_NAME, CONSTRAINT_NAME, {
		foreignKeys: {
			columns: 'level_id',
			references: `public.${LEVEL_TABLE}(id)`,
			onDelete: 'set null',
		},
	});
};
