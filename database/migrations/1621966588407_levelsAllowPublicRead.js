/* eslint-disable camelcase */
const POLICY_NAME_PUBLIC_READ_LEVELS = 'allow public read of levels';

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_PUBLIC_READ_LEVELS,
		{
			command: 'SELECT',
			using: 'true',
		}
	);
};

exports.down = (pgm) => {
	pgm.dropPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_PUBLIC_READ_LEVELS,
		{
			ifExists: true,
		}
	);
};
