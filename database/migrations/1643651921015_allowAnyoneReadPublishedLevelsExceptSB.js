/* eslint-disable camelcase */

exports.shorthands = undefined;

const POLICY_NAME_ANYONE_READ_PUBLISHED_LEVELS =
	'allow anyone to read a published level';

exports.up = (pgm) => {
	pgm.dropPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_ANYONE_READ_PUBLISHED_LEVELS
	);

	pgm.createPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_ANYONE_READ_PUBLISHED_LEVELS,
		{
			command: 'SELECT',
			using: `published = true and ((select users.role from users where users.id = user_id) is null or (select users.role from users where users.id = user_id) <> 'sb' or (user_id = auth.uid()))`,
		}
	);
};

exports.down = (pgm) => {};
