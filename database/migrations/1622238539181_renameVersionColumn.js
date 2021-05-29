/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.renameColumn(
		{ schema: 'public', name: 'levels' },
		'version',
		'save_version'
	);
};

exports.down = (pgm) => {
	pgm.renameColumn(
		{ schema: 'public', name: 'levels' },
		'save_version',
		'version'
	);
};
