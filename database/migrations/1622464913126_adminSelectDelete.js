/* eslint-disable camelcase */
const {
	POLICY_NAME_PUBLIC_READ_LEVELS,
} = require('./1621966588407_levelsAllowPublicRead');

const POLICY_NAME_ADMIN_READ_LEVELS = 'allow admin read of levels';
const POLICY_NAME_ADMIN_DELETE_LEVELS = 'allow admin delete of levels';

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.addColumns(
		{ schema: 'public', name: 'users' },
		{ role: 'string' },
		{ ifNotExists: true }
	);

	pgm.dropPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_PUBLIC_READ_LEVELS,
		{
			ifExists: true,
		}
	);

	pgm.createPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_ADMIN_READ_LEVELS,
		{
			command: 'SELECT',
			using: "(select role from public.users where id = auth.uid()) = 'admin'",
		}
	);

	pgm.createPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_ADMIN_DELETE_LEVELS,
		{
			command: 'DELETE',
			using: "(select role from public.users where id = auth.uid()) = 'admin'",
		}
	);
};

exports.down = (pgm) => {
	pgm.dropPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_ADMIN_READ_LEVELS,
		{
			ifExists: true,
		}
	);

	pgm.dropPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_ADMIN_DELETE_LEVELS,
		{
			ifExists: true,
		}
	);

	pgm.dropColumns(
		{ schema: 'public', name: 'users' },
		{ role: 'string' },
		{ ifExists: true }
	);

	pgm.createPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_PUBLIC_READ_LEVELS,
		{
			command: 'SELECT',
			using: 'true',
		}
	);
};
