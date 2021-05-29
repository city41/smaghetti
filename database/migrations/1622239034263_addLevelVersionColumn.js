/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.addColumns(
		{ schema: 'public', name: 'levels' },
		{ version: 'string' },
		{ ifNotExists: true }
	);
};

exports.down = (pgm) => {
	pgm.dropColumns(
		{ schema: 'public', name: 'levels' },
		{ version: 'string' },
		{ ifExists: true }
	);
};
