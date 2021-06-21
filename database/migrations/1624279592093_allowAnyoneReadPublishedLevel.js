/* eslint-disable camelcase */

exports.shorthands = undefined;

const POLICY_NAME_ANYONE_READ_PUBLISHED_LEVELS =
	'allow anyone to read a published level';

exports.up = (pgm) => {
	pgm.createPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_ANYONE_READ_PUBLISHED_LEVELS,
		{
			command: 'SELECT',
			using: 'published = true',
		}
	);
};

exports.down = (pgm) => {};
