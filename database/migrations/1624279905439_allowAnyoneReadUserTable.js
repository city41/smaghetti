/* eslint-disable camelcase */
const { POLICY_NAME_READ_USERS } = require('./1614821764814_users');

exports.shorthands = undefined;

const NEW_POLICY_NAME_READ_USERS = 'allow anyone to read users table';

exports.up = (pgm) => {
	pgm.dropPolicy({ schema: 'public', name: 'users' }, POLICY_NAME_READ_USERS, {
		ifExists: true,
	});

	pgm.createPolicy(
		{ schema: 'public', name: 'users' },
		NEW_POLICY_NAME_READ_USERS,
		{
			command: 'SELECT',
			using: 'true',
		}
	);
};

exports.down = (pgm) => {
	pgm.dropPolicy(
		{ schema: 'public', name: 'users' },
		NEW_POLICY_NAME_READ_USERS,
		{
			ifExists: true,
		}
	);

	pgm.createPolicy(
		{ schema: 'public', name: 'users' },
		POLICY_NAME_READ_USERS,
		{
			command: 'SELECT',
			using: 'auth.uid() = id',
		}
	);
};
